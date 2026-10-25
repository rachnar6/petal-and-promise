const express = require('express');
const router = express.Router();
const { requireAuth, requireAdmin } = require('../middleware/auth');
const mockStore = require('../services/mockStore');
const { triggerPabblyWorkflow } = require('../services/pabblyService');
const { getIsConnected } = require('../config/db');
let Enquiry;
try {
  Enquiry = require('../models/Enquiry');
} catch (e) {}

// POST /api/enquiries - Public enquiry form submission
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, eventType, estimatedDate, estimatedGuests, estimatedBudget, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and your celebration vision message are required.'
      });
    }

    const enquiryData = {
      name,
      email,
      phone: phone || '',
      eventType: eventType || 'Wedding',
      estimatedDate: estimatedDate || '',
      estimatedGuests: estimatedGuests || '',
      estimatedBudget: estimatedBudget || '',
      message,
      status: 'New'
    };

    let newEnquiry;
    if (getIsConnected() && Enquiry) {
      newEnquiry = await Enquiry.create(enquiryData);
    } else {
      newEnquiry = mockStore.createEnquiry(enquiryData);
    }

    // Trigger Pabbly Workflow 4: Customer Enquiry Follow-Up
    const pabblyResult = await triggerPabblyWorkflow('enquiry.created', {
      enquiryId: newEnquiry._id,
      name: newEnquiry.name,
      email: newEnquiry.email,
      phone: newEnquiry.phone,
      eventType: newEnquiry.eventType,
      estimatedDate: newEnquiry.estimatedDate,
      estimatedGuests: newEnquiry.estimatedGuests,
      estimatedBudget: newEnquiry.estimatedBudget,
      message: newEnquiry.message,
      submittedAt: new Date().toISOString()
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for reaching out to Petal & Promise! A floral curator will reply within 24 hours.',
      data: newEnquiry,
      automation: pabblyResult
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/enquiries - Admin list
router.get('/', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { status } = req.query;

    if (getIsConnected() && Enquiry) {
      const query = status && status !== 'All' ? { status } : {};
      const enquiries = await Enquiry.find(query).sort({ createdAt: -1 });
      return res.json({ success: true, count: enquiries.length, data: enquiries });
    }

    const enquiries = mockStore.getEnquiries(status);
    res.json({ success: true, count: enquiries.length, data: enquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PATCH /api/enquiries/:id - Admin update status
router.patch('/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;

    let updated;
    if (getIsConnected() && Enquiry) {
      updated = await Enquiry.findByIdAndUpdate(id, { status, adminNotes }, { new: true });
    } else {
      updated = mockStore.updateEnquiry(id, { status, adminNotes });
    }

    if (!updated) return res.status(404).json({ success: false, message: 'Enquiry not found' });
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
