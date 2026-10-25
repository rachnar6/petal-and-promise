const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    enum: ['Wedding', 'Birthday', 'Engagement', 'Anniversary', 'Bespoke Celebration'],
    required: true,
  },
  tagline: String,
  startingPrice: Number,
  currency: { type: String, default: 'USD' },
  description: String,
  inclusions: [String],
  bestFor: String,
  imageUrl: String,
  badge: String,
  isFeatured: { type: Boolean, default: false }
}, {
  timestamps: true
});

module.exports = mongoose.model('Package', packageSchema);
