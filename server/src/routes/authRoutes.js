const express = require('express');
const router = express.Router();
const { verifyToken } = require('../config/firebase');

// POST /api/auth/me - Verify current user session
router.post('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'No authorization token provided' });
    }

    const token = authHeader.split(' ')[1];
    const user = await verifyToken(token);

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid or expired session' });
    }

    res.json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/auth/demo-users - Quick demo logins for easy evaluation
router.get('/demo-users', (req, res) => {
  res.json({
    success: true,
    users: [
      {
        role: 'customer',
        name: 'Elena Rostova (Customer Demo)',
        email: 'client@petalandpromise.com',
        token: 'mock_customer_client_demo_1',
        description: 'Has existing luxury wedding booking and consultation'
      },
      {
        role: 'admin',
        name: 'Petal & Promise Director (Admin Demo)',
        email: 'admin@petalandpromise.com',
        token: 'mock_admin_token',
        description: 'Full access to Admin Portal, Status updates, and Pabbly Outbox'
      }
    ]
  });
});

module.exports = router;
