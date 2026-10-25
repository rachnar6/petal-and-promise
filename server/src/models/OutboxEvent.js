const mongoose = require('mongoose');

const outboxEventSchema = new mongoose.Schema({
  eventId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  eventType: {
    type: String,
    required: true,
    enum: ['booking.created', 'consultation.scheduled', 'booking.status_updated', 'enquiry.created'],
    index: true,
  },
  idempotencyKey: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  payload: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'dispatched', 'failed', 'simulated_success'],
    default: 'pending',
    index: true,
  },
  attempts: {
    type: Number,
    default: 0,
  },
  lastAttemptAt: {
    type: Date,
  },
  webhookUrl: {
    type: String,
  },
  responseStatus: {
    type: Number,
  },
  responseBody: {
    type: String,
  },
  errorMessage: {
    type: String,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('OutboxEvent', outboxEventSchema);
