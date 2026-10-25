const express = require('express');
const router = express.Router();
const { requireAuth, requireAdmin } = require('../middleware/auth');
const mockStore = require('../services/mockStore');
const { triggerPabblyWorkflow } = require('../services/pabblyService');
const { getIsConnected } = require('../config/db');
let Booking, Enquiry, Consultation, OutboxEvent;
try {
  Booking = require('../models/Booking');
  Enquiry = require('../models/Enquiry');
  Consultation = require('../models/Consultation');
  OutboxEvent = require('../models/OutboxEvent');
} catch (e) {}

// GET /api/admin/overview
router.get('/overview', requireAuth, requireAdmin, async (req, res) => {
  try {
    let bookings = [];
    let enquiries = [];
    let consultations = [];

    if (getIsConnected() && Booking) {
      bookings = await Booking.find();
      enquiries = await Enquiry.find();
      consultations = await Consultation.find();
    } else {
      bookings = mockStore.getBookings();
      enquiries = mockStore.getEnquiries();
      consultations = mockStore.getConsultations();
    }

    const totalBookings = bookings.length;
    const pendingBookings = bookings.filter(b => b.status === 'Pending').length;
    const confirmedBookings = bookings.filter(b => b.status === 'Confirmed' || b.status === 'In Progress').length;
    const newEnquiries = enquiries.filter(e => e.status === 'New').length;
    const scheduledConsultations = consultations.filter(c => c.status === 'Scheduled').length;

    const totalRevenue = bookings
      .filter(b => b.status !== 'Cancelled')
      .reduce((sum, b) => sum + (b.budget?.total || 0), 0);

    res.json({
      success: true,
      data: {
        totalBookings,
        pendingBookings,
        confirmedBookings,
        newEnquiries,
        scheduledConsultations,
        totalRevenue,
        recentBookings: bookings.slice(0, 5),
        recentEnquiries: enquiries.slice(0, 5)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/admin/analytics
router.get('/analytics', requireAuth, requireAdmin, async (req, res) => {
  try {
    let bookings = [];
    if (getIsConnected() && Booking) {
      bookings = await Booking.find();
    } else {
      bookings = mockStore.getBookings();
    }

    // Monthly bookings distribution
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyData = months.map(m => ({ month: m, count: 0, revenue: 0 }));

    bookings.forEach(b => {
      const d = new Date(b.createdAt || Date.now());
      const mIdx = d.getMonth();
      monthlyData[mIdx].count += 1;
      if (b.status !== 'Cancelled') {
        monthlyData[mIdx].revenue += (b.budget?.total || 0);
      }
    });

    // Popular event categories breakdown
    const categoriesMap = {
      Wedding: 0,
      Birthday: 0,
      Engagement: 0,
      Anniversary: 0,
      'Bespoke Celebration': 0
    };

    bookings.forEach(b => {
      if (categoriesMap[b.eventType] !== undefined) {
        categoriesMap[b.eventType] += 1;
      } else {
        categoriesMap['Bespoke Celebration'] += 1;
      }
    });

    const categoryBreakdown = Object.keys(categoriesMap).map(key => ({
      name: key,
      value: categoriesMap[key]
    }));

    res.json({
      success: true,
      data: {
        monthlyData,
        categoryBreakdown,
        conversionRate: '68.4%'
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/admin/outbox - Webhook dispatches and audit log
router.get('/outbox', requireAuth, requireAdmin, async (req, res) => {
  try {
    if (getIsConnected() && OutboxEvent) {
      const events = await OutboxEvent.find().sort({ createdAt: -1 }).limit(50);
      if (events.length > 0) return res.json({ success: true, count: events.length, data: events });
    }
    const events = mockStore.getOutboxEvents(50);
    res.json({ success: true, count: events.length, data: events });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/admin/test-webhook - Fire manual test event to verify Pabbly
router.post('/test-webhook', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { eventType, testWebhookUrl } = req.body;
    const targetType = eventType || 'booking.created';

    const testPayload = {
      test: true,
      bookingReference: 'TEST-PP-' + Math.random().toString(36).substring(2, 6).toUpperCase(),
      clientName: 'Antigravity Test Customer',
      clientEmail: 'test.bride@petalandpromise.com',
      eventType: 'Wedding',
      eventDate: '2026-12-25',
      budget: 5000,
      notes: 'This is a test event dispatched from the Petal & Promise Admin Portal.'
    };

    const result = await triggerPabblyWorkflow(targetType, testPayload, {
      webhookUrl: testWebhookUrl
    });

    res.json({
      success: true,
      message: `Test event for "${targetType}" dispatched to Pabbly.`,
      result
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
