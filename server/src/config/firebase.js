const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

let firebaseInitialized = false;

function initFirebase() {
  const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH;
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

  try {
    if (serviceAccountJson) {
      const creds = JSON.parse(serviceAccountJson);
      admin.initializeApp({
        credential: admin.credential.cert(creds),
      });
      firebaseInitialized = true;
      console.log('[Firebase Admin] Initialized with inline JSON credentials');
    } else if (serviceAccountPath && fs.existsSync(serviceAccountPath)) {
      const creds = require(path.resolve(serviceAccountPath));
      admin.initializeApp({
        credential: admin.credential.cert(creds),
      });
      firebaseInitialized = true;
      console.log('[Firebase Admin] Initialized with service account file:', serviceAccountPath);
    } else {
      console.log('[Firebase Admin] No service account provided. Running in hybrid/dev token verification mode.');
    }
  } catch (err) {
    console.warn('[Firebase Admin] Initialization failed:', err.message);
  }
}

async function verifyToken(token) {
  if (!token) return null;

  // 1. If real Firebase Admin is initialized, verify with it
  if (firebaseInitialized) {
    try {
      const decoded = await admin.auth().verifyIdToken(token);
      return {
        uid: decoded.uid,
        email: decoded.email,
        name: decoded.name || decoded.email?.split('@')[0] || 'Celebration Guest',
        role: decoded.admin ? 'admin' : (decoded.email === process.env.ADMIN_EMAIL ? 'admin' : 'customer')
      };
    } catch (err) {
      console.warn('[Firebase] Token verification error:', err.message);
    }
  }

  // 2. Dev / Mock mode support for testing without immediate Firebase setup
  // Tokens formatted like "mock_admin_token" or "mock_customer_<id>" or base64
  if (token.startsWith('mock_') || token.startsWith('dev_')) {
    const isAdmin = token.includes('admin') || token.includes('owner');
    return {
      uid: token.replace(/^(mock_|dev_)/, ''),
      email: isAdmin ? (process.env.ADMIN_EMAIL || 'admin@petalandpromise.com') : 'client@petalandpromise.com',
      name: isAdmin ? 'Petal & Promise Director' : 'Elena Rostova',
      role: isAdmin ? 'admin' : 'customer'
    };
  }

  // Fallback for decoded client JWT payload inspection in local development
  try {
    const parts = token.split('.');
    if (parts.length === 3) {
      const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf8'));
      if (payload && (payload.user_id || payload.sub || payload.uid || payload.email)) {
        const email = payload.email || 'user@example.com';
        const isAdmin = email === (process.env.ADMIN_EMAIL || 'admin@petalandpromise.com') || payload.admin === true;
        return {
          uid: payload.user_id || payload.sub || payload.uid,
          email: email,
          name: payload.name || email.split('@')[0],
          role: isAdmin ? 'admin' : 'customer'
        };
      }
    }
  } catch (e) {
    // ignore
  }

  return null;
}

module.exports = { initFirebase, verifyToken, getIsInitialized: () => firebaseInitialized };
