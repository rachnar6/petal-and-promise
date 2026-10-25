const crypto = require('crypto');
const mockStore = require('./mockStore');
const { getIsConnected } = require('../config/db');
let OutboxEvent;
try {
  OutboxEvent = require('../models/OutboxEvent');
} catch (e) {
  // handled
}

/**
 * Returns configured webhook URL for an event type or fallback
 */
function getWebhookUrlForEvent(eventType) {
  switch (eventType) {
    case 'booking.created':
      return process.env.PABBLY_WEBHOOK_BOOKING_CREATED || process.env.PABBLY_WEBHOOK_URL;
    case 'consultation.scheduled':
      return process.env.PABBLY_WEBHOOK_CONSULTATION_SCHEDULED || process.env.PABBLY_WEBHOOK_URL;
    case 'booking.status_updated':
      return process.env.PABBLY_WEBHOOK_STATUS_UPDATED || process.env.PABBLY_WEBHOOK_URL;
    case 'enquiry.created':
      return process.env.PABBLY_WEBHOOK_ENQUIRY_CREATED || process.env.PABBLY_WEBHOOK_URL;
    default:
      return process.env.PABBLY_WEBHOOK_URL;
  }
}

/**
 * Dispatches an event to Pabbly Connect with outbox recording and retry resilience
 */
async function triggerPabblyWorkflow(eventType, payload, options = {}) {
  const eventId = 'evt_' + crypto.randomBytes(8).toString('hex');
  const idempotencyKey = options.idempotencyKey || `idemp_${eventType}_${payload.bookingReference || payload._id || eventId}`;
  const webhookUrl = options.webhookUrl || getWebhookUrlForEvent(eventType);

  console.log(`[Pabbly Outbox] Enqueuing ${eventType} (Event ID: ${eventId})`);

  const eventRecord = {
    eventId,
    eventType,
    idempotencyKey,
    payload: {
      ...payload,
      _meta: {
        system: 'Petal & Promise Automation Engine',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
      }
    },
    status: 'pending',
    attempts: 0,
    webhookUrl: webhookUrl || 'NOT_CONFIGURED',
    createdAt: new Date()
  };

  // 1. Record event in Outbox (either Mongo or MockStore)
  let savedEvent;
  if (getIsConnected() && OutboxEvent) {
    try {
      savedEvent = await OutboxEvent.create(eventRecord);
    } catch (err) {
      console.warn('[Pabbly Outbox] Mongo record failed, using mock store:', err.message);
      savedEvent = mockStore.recordOutboxEvent(eventRecord);
    }
  } else {
    savedEvent = mockStore.recordOutboxEvent(eventRecord);
  }

  // 2. Dispatch to Pabbly if webhook URL is configured
  if (!webhookUrl || webhookUrl === 'NOT_CONFIGURED') {
    const simulationNote = `[Pabbly Webhook] No webhook URL configured for "${eventType}". Set PABBLY_WEBHOOK_${eventType.toUpperCase().replace('.', '_')} in .env. Event logged to outbox as simulated_success for local testing.`;
    console.log(simulationNote);

    const updates = {
      status: 'simulated_success',
      attempts: 1,
      lastAttemptAt: new Date(),
      responseStatus: 200,
      responseBody: JSON.stringify({
        message: 'Simulated dispatch successful. Provide a real Pabbly Connect Webhook URL in .env to send to your live Google Sheets / Gmail.',
        simulated: true,
        eventType,
        eventId
      })
    };

    if (getIsConnected() && OutboxEvent && savedEvent._id && typeof savedEvent.save === 'function') {
      await OutboxEvent.findByIdAndUpdate(savedEvent._id, updates);
    } else {
      mockStore.updateOutboxEvent(eventId, updates);
    }

    return {
      success: true,
      simulated: true,
      eventId,
      status: 'simulated_success',
      message: 'Workflow logged in outbox. Pabbly webhook pending configuration in .env.'
    };
  }

  // 3. Make real HTTP POST request to Pabbly Connect webhook
  try {
    const fetch = global.fetch || (await import('node-fetch')).default;
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Pabbly-Event-Id': eventId,
        'X-Pabbly-Idempotency-Key': idempotencyKey,
        'User-Agent': 'PetalAndPromise-Automation/1.0'
      },
      body: JSON.stringify(eventRecord.payload),
      timeout: 10000
    });

    const responseText = await response.text();
    const isSuccess = response.ok || response.status === 200;

    const updates = {
      status: isSuccess ? 'dispatched' : 'failed',
      attempts: 1,
      lastAttemptAt: new Date(),
      responseStatus: response.status,
      responseBody: responseText.slice(0, 500)
    };

    if (getIsConnected() && OutboxEvent && savedEvent._id && typeof savedEvent.save === 'function') {
      await OutboxEvent.findByIdAndUpdate(savedEvent._id, updates);
    } else {
      mockStore.updateOutboxEvent(eventId, updates);
    }

    console.log(`[Pabbly Outbox] Webhook dispatch for ${eventType} returned HTTP ${response.status}`);
    return {
      success: isSuccess,
      eventId,
      status: isSuccess ? 'dispatched' : 'failed',
      responseStatus: response.status
    };
  } catch (err) {
    console.error(`[Pabbly Outbox] Webhook network failure for ${eventType}:`, err.message);
    const updates = {
      status: 'failed',
      attempts: 1,
      lastAttemptAt: new Date(),
      errorMessage: err.message
    };

    if (getIsConnected() && OutboxEvent && savedEvent._id && typeof savedEvent.save === 'function') {
      await OutboxEvent.findByIdAndUpdate(savedEvent._id, updates);
    } else {
      mockStore.updateOutboxEvent(eventId, updates);
    }

    return {
      success: false,
      eventId,
      status: 'failed',
      error: err.message
    };
  }
}

module.exports = {
  triggerPabblyWorkflow,
  getWebhookUrlForEvent
};
