const API_BASE = '/api';

function getAuthHeaders() {
  const token = localStorage.getItem('pp_token');
  const headers = {
    'Content-Type': 'application/json'
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export const api = {
  // Catalog
  async getPackages(category = 'All') {
    const res = await fetch(`${API_BASE}/catalog/packages?category=${category}`);
    return res.json();
  },
  async getThemes() {
    const res = await fetch(`${API_BASE}/catalog/themes`);
    return res.json();
  },
  async getTestimonials() {
    const res = await fetch(`${API_BASE}/catalog/testimonials`);
    return res.json();
  },
  async createPackage(data) {
    const res = await fetch(`${API_BASE}/catalog/packages`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return res.json();
  },
  async updatePackage(id, data) {
    const res = await fetch(`${API_BASE}/catalog/packages/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return res.json();
  },
  async deletePackage(id) {
    const res = await fetch(`${API_BASE}/catalog/packages/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return res.json();
  },

  // Bookings
  async getBookings(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/bookings?${query}`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },
  async getBookingById(id) {
    const res = await fetch(`${API_BASE}/bookings/${id}`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },
  async createBooking(bookingData) {
    const res = await fetch(`${API_BASE}/bookings`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(bookingData)
    });
    return res.json();
  },
  async updateBookingStatus(id, status, adminNotes = '', previousStatus = '') {
    const res = await fetch(`${API_BASE}/bookings/${id}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status, adminNotes, previousStatus })
    });
    return res.json();
  },
  async cancelBooking(id, reason) {
    const res = await fetch(`${API_BASE}/bookings/${id}/cancel`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ reason })
    });
    return res.json();
  },

  // Enquiries
  async submitEnquiry(enquiryData) {
    const res = await fetch(`${API_BASE}/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enquiryData)
    });
    return res.json();
  },
  async getEnquiries(status = 'All') {
    const res = await fetch(`${API_BASE}/enquiries?status=${status}`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },
  async updateEnquiry(id, updates) {
    const res = await fetch(`${API_BASE}/enquiries/${id}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates)
    });
    return res.json();
  },

  // Consultations
  async scheduleConsultation(consultData) {
    const res = await fetch(`${API_BASE}/consultations`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(consultData)
    });
    return res.json();
  },
  async getConsultations() {
    const res = await fetch(`${API_BASE}/consultations`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },
  async updateConsultation(id, updates) {
    const res = await fetch(`${API_BASE}/consultations/${id}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates)
    });
    return res.json();
  },

  // Admin
  async getAdminOverview() {
    const res = await fetch(`${API_BASE}/admin/overview`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },
  async getAdminAnalytics() {
    const res = await fetch(`${API_BASE}/admin/analytics`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },
  async getOutboxEvents() {
    const res = await fetch(`${API_BASE}/admin/outbox`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },
  async testPabblyWebhook(eventType, testWebhookUrl) {
    const res = await fetch(`${API_BASE}/admin/test-webhook`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ eventType, testWebhookUrl })
    });
    return res.json();
  }
};
