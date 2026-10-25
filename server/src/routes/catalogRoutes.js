const express = require('express');
const router = express.Router();
const { requireAuth, requireAdmin } = require('../middleware/auth');
const mockStore = require('../services/mockStore');
const { getIsConnected } = require('../config/db');
let Package, FloralTheme, Testimonial;
try {
  Package = require('../models/Package');
  FloralTheme = require('../models/FloralTheme');
  Testimonial = require('../models/Testimonial');
} catch (e) {}

// GET /api/catalog/packages
router.get('/packages', async (req, res) => {
  try {
    const { category } = req.query;
    if (getIsConnected() && Package) {
      const query = category && category !== 'All' ? { category } : {};
      const items = await Package.find(query);
      if (items.length > 0) return res.json({ success: true, data: items });
    }
    const items = mockStore.getPackages(category);
    res.json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/catalog/packages (Admin only)
router.post('/packages', requireAuth, requireAdmin, async (req, res) => {
  try {
    let pkg;
    if (getIsConnected() && Package) {
      pkg = await Package.create({
        ...req.body,
        slug: req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      });
    } else {
      pkg = mockStore.createPackage(req.body);
    }
    res.status(201).json({ success: true, data: pkg });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/catalog/packages/:id (Admin only)
router.put('/packages/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    let updated;
    if (getIsConnected() && Package) {
      updated = await Package.findByIdAndUpdate(id, req.body, { new: true });
    } else {
      updated = mockStore.updatePackage(id, req.body);
    }
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/catalog/packages/:id (Admin only)
router.delete('/packages/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    if (getIsConnected() && Package) {
      await Package.findByIdAndDelete(id);
    } else {
      mockStore.deletePackage(id);
    }
    res.json({ success: true, message: 'Package deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/catalog/themes
router.get('/themes', async (req, res) => {
  try {
    if (getIsConnected() && FloralTheme) {
      const items = await FloralTheme.find();
      if (items.length > 0) return res.json({ success: true, data: items });
    }
    const items = mockStore.getThemes();
    res.json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/catalog/themes (Admin only)
router.post('/themes', requireAuth, requireAdmin, async (req, res) => {
  try {
    let theme;
    if (getIsConnected() && FloralTheme) {
      theme = await FloralTheme.create({
        ...req.body,
        slug: req.body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      });
    } else {
      theme = mockStore.createTheme(req.body);
    }
    res.status(201).json({ success: true, data: theme });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/catalog/testimonials
router.get('/testimonials', async (req, res) => {
  try {
    if (getIsConnected() && Testimonial) {
      const items = await Testimonial.find();
      if (items.length > 0) return res.json({ success: true, data: items });
    }
    const items = mockStore.getTestimonials();
    res.json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
