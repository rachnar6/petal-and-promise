const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: null,
  },
  clientName: {
    type: String,
    required: true,
  },
  clientEmail: {
    type: String,
    required: true,
    lowercase: true,
  },
  clientPhone: {
    type: String,
    required: true,
  },
  preferredDate: {
    type: String,
    required: true,
  },
  preferredTime: {
    type: String,
    required: true,
  },
  consultationType: {
    type: String,
    enum: ['Virtual Video Call', 'In-Studio Floral Tasting', 'Venue Walkthrough'],
    default: 'Virtual Video Call',
  },
  eventType: {
    type: String,
    default: 'Wedding',
  },
  notes: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['Scheduled', 'Completed', 'Rescheduled', 'Cancelled'],
    default: 'Scheduled',
  },
  meetingLink: {
    type: String,
    default: 'https://meet.google.com/pp-floral-design',
  },
  pabblySynced: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Consultation', consultationSchema);
