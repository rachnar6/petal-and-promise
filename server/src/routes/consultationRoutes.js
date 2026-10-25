const express = require('express');
const router = express.Router();
const { requireAuth, requireAdmin } = require('../middleware/auth');
const mockStore = require('../services/mockStore');
const { triggerPabblyWorkflow } = require('../services/pabblyService');
const { getIsConnected } = require('../config/db');
let Consultation;
try {
  Consultation = require('../models/Consultation');
} catch (e) {}

// POST /api/consultations - Book a consultation
router.post('/', async (req, res) => {
  try {
    const {
      clientName,
      clientEmail,
      clientPhone,
      preferredDate,
      preferredTime,
      consultationType,
      eventType,
      notes,
      userId
    } = req.body;

    if (!clientName || !clientEmail || !clientPhone || !preferredDate || !preferredTime) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, phone, date, and preferred time are required for consultation scheduling.'
      });
    }

    const consultData = {
      userId: userId || (req.user ? req.user.uid : null),
      clientName,
      clientEmail,
      clientPhone,
      preferredDate,
      preferredTime,
      consultationType: consultationType || 'Virtual Video Call',
      eventType: eventType || 'Wedding',
      notes: notes || '',
      status: 'Scheduled',
      meetingLink: 'https://meet.google.com/pp-floral-design'
    };

    let newConsultation;
    if (getIsConnected() && Consultation) {
      newConsultation = await Consultation.create(consultData);
    } else {
      newConsultation = mockStore.createConsultation(consultData);
    }

    // Trigger Pabbly Workflow 2: Consultation Scheduling & Automated Reminders
    const pabblyResult = await triggerPabblyWorkflow('consultation.scheduled', {
      consultationId: newConsultation._id,
      clientName: newConsultation.clientName,
      clientEmail: newConsultation.clientEmail,
      clientPhone: newConsultation.clientPhone,
      preferredDate: newConsultation.preferredDate,
      preferredTime: newConsultation.preferredTime,
      consultationType: newConsultation.consultationType,
      eventType: newConsultation.eventType,
      meetingLink: newConsultation.meetingLink,
      notes: newConsultation.notes
    });

    res.status(201).json({
      success: true,
      message: 'Consultation appointment scheduled! Check your email for calendar invite and design tasting link.',
      data: newConsultation,
      automation: pabblyResult
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/consultations - List consultations
router.get('/', requireAuth, async (req, res) => {
  try {
    const isAdmin = req.user.role === 'admin';
    const userId = isAdmin ? null : req.user.uid;

    if (getIsConnected() && Consultation) {
      const query = isAdmin ? {} : { userId };
      const items = await Consultation.find(query).sort({ preferredDate: 1 });
      return res.json({ success: true, count: items.length, data: items });
    }

    const items = mockStore.getConsultations(userId);
    res.json({ success: true, count: items.length, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PATCH /api/consultations/:id - Update status (e.g. Completed, Rescheduled, Cancelled)
router.patch('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, preferredDate, preferredTime, meetingLink } = req.body;

    let updated;
    if (getIsConnected() && Consultation) {
      updated = await Consultation.findByIdAndUpdate(
        id,
        { status, preferredDate, preferredTime, meetingLink },
        { new: true }
      );
    } else {
      updated = mockStore.updateConsultation(id, { status, preferredDate, preferredTime, meetingLink });
    }

    if (!updated) return res.status(404).json({ success: false, message: 'Consultation not found' });
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
