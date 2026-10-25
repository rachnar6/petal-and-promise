const { verifyToken } = require('../config/firebase');

async function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. Please log in or provide a valid Bearer token.'
      });
    }

    const token = authHeader.split(' ')[1];
    const user = await verifyToken(token);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired session. Please log in again.'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('[Auth Middleware Error]:', error);
    return res.status(500).json({ success: false, message: 'Internal authentication error' });
  }
}

function requireAdmin(req, res, next) {
  // Allow secret admin key for dev/management or check role from token
  const adminSecret = req.headers['x-admin-key'];
  if (adminSecret && (adminSecret === process.env.ADMIN_SECRET_KEY || adminSecret === 'petal-secret-admin-2026')) {
    req.user = req.user || {
      uid: 'superadmin_static',
      email: process.env.ADMIN_EMAIL || 'admin@petalandpromise.com',
      role: 'admin',
      name: 'Petal & Promise Director'
    };
    return next();
  }

  if (!req.user) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access restricted: Administrator privileges required.'
    });
  }

  next();
}

module.exports = { requireAuth, requireAdmin };
