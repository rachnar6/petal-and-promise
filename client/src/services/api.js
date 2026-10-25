import { fallbackPackages, fallbackThemes, fallbackTestimonials } from './fallbackData';

// If in production and VITE_API_URL was not set in Vercel settings, automatically fallback to Render
const DEFAULT_REMOTE_URL = 'https://petal-and-promise-api.onrender.com';
const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? DEFAULT_REMOTE_URL : '');
const API_BASE = API_URL ? `${API_URL.replace(/\/$/, '')}/api` : '/api';

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

/**
 * Safely fetches and parses JSON.
 * Gracefully handles 404, HTML error pages, and network failures without crashing.
 */
async function safeFetchJson(url, options = {}, fallbackData = null) {
  try {
    const res = await fetch(url, options);
    const contentType = res.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      const data = await res.json();
      return data;
    }

    // Server returned HTML or plain-text (e.g. 404 Not Found, 502 Bad Gateway while waking up)
    console.warn(`[API] Endpoint returned non-JSON response (${res.status}): ${url}`);
    if (fallbackData !== null) {
      return { success: true, data: fallbackData, isFallback: true };
    }
    return {
      success: false,
      message: `Server returned status ${res.status}. Please verify your backend server status.`
    };
  } catch (error) {
    console.warn(`[API] Network error reaching ${url}:`, error.message);
    if (fallbackData !== null) {
      return { success: true, data: fallbackData, isFallback: true };
    }
    return {
      success: false,
      message: error.message || 'Unable to connect to the backend server.'
    };
  }
}

export const api = {
  // Catalog
  async getPackages(category = 'All') {
    const filterFallback = (category && category !== 'All')
      ? fallbackPackages.filter(p => p.category === category)
      : fallbackPackages;

    const res = await safeFetchJson(`${API_BASE}/catalog/packages?category=${category}`, {}, filterFallback);
    if (res.success && Array.isArray(res.data) && res.data.length > 0) {
      return res;
    }
    return { success: true, data: filterFallback, isFallback: true };
  },

  async getThemes() {
    const res = await safeFetchJson(`${API_BASE}/catalog/themes`, {}, fallbackThemes);
    if (res.success && Array.isArray(res.data) && res.data.length > 0) {
      return res;
    }
    return { success: true, data: fallbackThemes, isFallback: true };
  },

  async getTestimonials() {
    const res = await safeFetchJson(`${API_BASE}/catalog/testimonials`, {}, fallbackTestimonials);
    if (res.success && Array.isArray(res.data) && res.data.length > 0) {
      return res;
    }
    return { success: true, data: fallbackTestimonials, isFallback: true };
  },

  async createPackage(data) {
    return safeFetchJson(`${API_BASE}/catalog/packages`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
  },

  async updatePackage(id, data) {
    return safeFetchJson(`${API_BASE}/catalog/packages/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
  },

  async deletePackage(id) {
    return safeFetchJson(`${API_BASE}/catalog/packages/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
  },

  // Bookings
  async getBookings(params = {}) {
    const query = new URLSearchParams(params).toString();
    return safeFetchJson(`${API_BASE}/bookings?${query}`, {
      headers: getAuthHeaders()
    }, []);
  },

  async getBookingById(id) {
    return safeFetchJson(`${API_BASE}/bookings/${id}`, {
      headers: getAuthHeaders()
    });
  },

  async createBooking(bookingData) {
    return safeFetchJson(`${API_BASE}/bookings`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(bookingData)
    });
  },

  async updateBookingStatus(id, status, adminNotes = '', previousStatus = '') {
    return safeFetchJson(`${API_BASE}/bookings/${id}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status, adminNotes, previousStatus })
    });
  },

  async cancelBooking(id, reason) {
    return safeFetchJson(`${API_BASE}/bookings/${id}/cancel`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ reason })
    });
  },

  // Enquiries
  async submitEnquiry(enquiryData) {
    return safeFetchJson(`${API_BASE}/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enquiryData)
    });
  },

  async getEnquiries(status = 'All') {
    return safeFetchJson(`${API_BASE}/enquiries?status=${status}`, {
      headers: getAuthHeaders()
    }, []);
  },

  async updateEnquiry(id, updates) {
    return safeFetchJson(`${API_BASE}/enquiries/${id}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates)
    });
  },

  // Consultations
  async scheduleConsultation(consultData) {
    return safeFetchJson(`${API_BASE}/consultations`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(consultData)
    });
  },

  async getConsultations() {
    return safeFetchJson(`${API_BASE}/consultations`, {
      headers: getAuthHeaders()
    }, []);
  },

  async updateConsultation(id, updates) {
    return safeFetchJson(`${API_BASE}/consultations/${id}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates)
    });
  },

  // Admin
  async getAdminOverview() {
    return safeFetchJson(`${API_BASE}/admin/overview`, {
      headers: getAuthHeaders()
    });
  },

  async getAdminAnalytics() {
    return safeFetchJson(`${API_BASE}/admin/analytics`, {
      headers: getAuthHeaders()
    });
  },

  async getOutboxEvents() {
    return safeFetchJson(`${API_BASE}/admin/outbox`, {
      headers: getAuthHeaders()
    }, []);
  },

  async testPabblyWebhook(eventType, testWebhookUrl) {
    return safeFetchJson(`${API_BASE}/admin/test-webhook`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ eventType, testWebhookUrl })
    });
  }
};
