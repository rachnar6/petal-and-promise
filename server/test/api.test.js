const http = require('http');

const PORT = 5000;
const BASE_URL = `http://localhost:${PORT}/api`;

function request(path, options = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(BASE_URL + path);
    const req = http.request(url, {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve({ status: res.statusCode, data: json });
        } catch (e) {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    });

    req.on('error', reject);
    if (options.body) {
      req.write(JSON.stringify(options.body));
    }
    req.end();
  });
}

async function runTests() {
  console.log('🌸 Starting Petal & Promise Automated API Tests...');
  let passed = 0;
  let failed = 0;

  function assert(condition, testName) {
    if (condition) {
      console.log(`  ✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${testName}`);
      failed++;
    }
  }

  try {
    // 1. Health check
    const health = await request('/health');
    assert(health.status === 200 && health.data.status === 'healthy', 'Healthcheck endpoint responds healthy');

    // 2. Catalog packages
    const pkgs = await request('/catalog/packages');
    assert(pkgs.status === 200 && Array.isArray(pkgs.data.data), 'Catalog packages endpoint returns list');

    // 3. Catalog themes
    const themes = await request('/catalog/themes');
    assert(themes.status === 200 && Array.isArray(themes.data.data), 'Catalog themes endpoint returns list');

    // 4. Create enquiry (triggers Pabbly Workflow 4)
    const enquiryRes = await request('/enquiries', {
      method: 'POST',
      body: {
        name: 'Automated Test Bride',
        email: 'test.bride@example.com',
        phone: '+1 555-0199',
        eventType: 'Wedding',
        estimatedDate: 'Spring 2027',
        message: 'Testing enquiry creation and automated outbox queueing.'
      }
    });
    assert(enquiryRes.status === 201 && enquiryRes.data.success, 'Public enquiry creation returns 201');

    // 5. Create consultation (triggers Pabbly Workflow 2)
    const consultRes = await request('/consultations', {
      method: 'POST',
      body: {
        clientName: 'Elena Rostova',
        clientEmail: 'client@petalandpromise.com',
        clientPhone: '+1 555-8291',
        preferredDate: '2026-11-28',
        preferredTime: '15:00',
        consultationType: 'Virtual Video Call',
        eventType: 'Wedding',
        notes: 'Reviewing flower tasting samples'
      }
    });
    assert(consultRes.status === 201 && consultRes.data.success, 'Consultation scheduling returns 201');

    // 6. Create booking (triggers Pabbly Workflow 1)
    const bookingRes = await request('/bookings', {
      method: 'POST',
      body: {
        clientName: 'Automated Test Host',
        clientEmail: 'client@petalandpromise.com',
        clientPhone: '+1 555-1234',
        eventType: 'Wedding',
        eventDate: '2026-12-18',
        eventTime: '17:00',
        venue: { name: 'Conservatory Hall' },
        guestCount: 150,
        budget: { total: 7500, tier: 'Grand Luxe' },
        theme: { name: 'Romantic Blush & Whisper Sage' },
        packageName: 'The Versailles Grand Romance'
      }
    });
    assert(bookingRes.status === 201 && bookingRes.data.success, 'Event plan booking returns 201 with reservation code');

    // 7. Admin Overview
    const adminOverview = await request('/admin/overview', {
      headers: { Authorization: 'Bearer mock_admin_token' }
    });
    assert(adminOverview.status === 200 && adminOverview.data.data.totalBookings > 0, 'Admin overview returns KPIs');

    // 8. Admin Outbox Logs (verify Pabbly events queued)
    const outboxRes = await request('/admin/outbox', {
      headers: { Authorization: 'Bearer mock_admin_token' }
    });
    assert(outboxRes.status === 200 && outboxRes.data.count > 0, 'Outbox logs endpoint returns recorded Pabbly events');

    console.log(`\n🌸 Test Suite Summary: ${passed} Passed, ${failed} Failed`);
    process.exit(failed > 0 ? 1 : 0);
  } catch (err) {
    console.error('Test execution error:', err);
    process.exit(1);
  }
}

runTests();
