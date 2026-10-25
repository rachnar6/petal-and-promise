const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    default: '',
  },
  eventType: {
    type: String,
    default: 'Wedding',
  },
  estimatedDate: {
    type: String,
    default: '',
  },
  estimatedGuests: {
    type: String,
    default: '50-100',
  },
  estimatedBudget: {
    type: String,
    default: '$3,000 - $6,000',
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'Proposal Sent', 'Converted', 'Archived'],
    default: 'New',
  },
  adminNotes: {
    type: String,
    default: '',
  },
  pabblySynced: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Enquiry', enquirySchema);
