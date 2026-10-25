const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  partner: String,
  celebration: {
    type: String,
    required: true,
  },
  eventDate: String,
  venue: String,
  quote: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 5,
  },
  featuredTheme: String,
  avatarUrl: String,
  isFeatured: {
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Testimonial', testimonialSchema);
