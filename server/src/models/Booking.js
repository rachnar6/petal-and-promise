const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingReference: {
    type: String,
    unique: true,
    required: true,
    default: () => 'PP-' + Math.random().toString(36).substring(2, 8).toUpperCase()
  },
  userId: {
    type: String,
    required: true,
    index: true,
  },
  clientName: {
    type: String,
    required: [true, 'Client name is required'],
    trim: true,
  },
  clientEmail: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
  },
  clientPhone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
  },
  eventType: {
    type: String,
    required: true,
    enum: ['Wedding', 'Birthday', 'Engagement', 'Anniversary', 'Bespoke Celebration', 'Corporate Gala'],
    default: 'Wedding'
  },
  eventDate: {
    type: String,
    required: [true, 'Event date is required'],
  },
  eventTime: {
    type: String,
    default: '17:00'
  },
  venue: {
    name: { type: String, required: true },
    city: { type: String, default: '' },
    isOutdoor: { type: Boolean, default: false }
  },
  guestCount: {
    type: Number,
    required: true,
    min: 5,
    max: 2000,
    default: 100
  },
  budget: {
    total: { type: Number, required: true, default: 3500 },
    currency: { type: String, default: 'USD' },
    tier: { type: String, enum: ['Boutique', 'Elegance', 'Grand Luxe', 'Royal Custom'], default: 'Elegance' }
  },
  theme: {
    name: { type: String, default: 'Romantic Blush & Sage' },
    palette: [String],
    vibe: { type: String, default: 'Whimsical, intimate, organic luxury' }
  },
  packageId: {
    type: String,
    default: 'pkg_wedding_luxe'
  },
  packageName: {
    type: String,
    default: 'The Versailles Grand Romance'
  },
  flowerPreferences: {
    primaryFlowers: [String], // e.g. ["English Peonies", "Garden Roses", "Ranunculus"]
    scentLevel: { type: String, enum: ['Subtle', 'Moderate', 'Intoxicatingly Fragrant'], default: 'Moderate' },
    colorDominance: { type: String, default: 'Soft Blush, Ivory & Sage Greens' },
    foliageChoice: [String] // e.g. ["Silver Dollar Eucalyptus", "Italian Ruscus"]
  },
  arrangements: {
    ceremonyArch: { type: Boolean, default: true },
    aisleFlowers: { type: Boolean, default: true },
    bridalBouquet: { type: Boolean, default: true },
    bridesmaidsBouquets: { type: Number, default: 4 },
    centerpiecesCount: { type: Number, default: 10 },
    hangingFlorals: { type: Boolean, default: false },
    cakeFlowers: { type: Boolean, default: true }
  },
  inspirationImages: [{
    url: String,
    caption: String,
    uploadedAt: { type: Date, default: Date.now }
  }],
  specialNotes: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'In Progress', 'Completed', 'Cancelled'],
    default: 'Pending',
    index: true
  },
  adminNotes: {
    type: String,
    default: ''
  },
  timeline: [{
    stage: String,
    date: { type: Date, default: Date.now },
    note: String,
    completed: { type: Boolean, default: false }
  }],
  pabblySynced: {
    type: Boolean,
    default: false
  },
  lastPabblyEventId: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);
