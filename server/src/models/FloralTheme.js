const mongoose = require('mongoose');

const floralThemeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  style: {
    type: String,
    enum: ['Romantic Rustic', 'Parisian Elegance', 'Whimsical Garden', 'Modern Minimalist', 'Opulent Royalty', 'Bohemian Chic'],
    required: true,
  },
  palette: {
    primary: String,
    secondary: String,
    accent: String,
    swatches: [String]
  },
  signatureFlowers: [String],
  season: String,
  moodDescription: String,
  heroImage: String,
  gallery: [String],
  recommendedEventTypes: [String]
}, {
  timestamps: true
});

module.exports = mongoose.model('FloralTheme', floralThemeSchema);
