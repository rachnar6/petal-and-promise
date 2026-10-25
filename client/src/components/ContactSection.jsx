import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';
import confetti from 'canvas-confetti';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: 'Wedding',
    estimatedDate: '',
    estimatedGuests: '100-150',
    estimatedBudget: '$4,000 - $7,000',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.submitEnquiry(formData);
      if (res.success) {
        setSubmitted(true);
        try {
          confetti({
            particleCount: 40,
            spread: 55,
            colors: ['#DDA6B2', '#A7B9A0', '#E8D9C5']
          });
        } catch (e) {}
      } else {
        setError(res.message || 'Failed to submit enquiry');
      }
    } catch (err) {
      setError(err.message || 'Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative bg-heavenly-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blush/20 text-berry-600 text-xs font-semibold uppercase tracking-wider mb-3">
            <Mail className="w-3.5 h-3.5 text-blush-500" />
            <span>Connect with our Florists</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-berry-700 leading-tight">
            Begin Your Celebration Journey
          </h2>
          <p className="font-cormorant text-xl text-berry-500 mt-3 italic">
            "Share your date, your venue, and your floral dreams. We will respond with an initial vision proposal within 24 hours."
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Contact Info & Atelier Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white/80 rounded-3xl p-8 border border-blush/30 shadow-soft space-y-6">
              <h3 className="font-serif text-2xl font-semibold text-berry-700">
                The Petal & Promise Atelier
              </h3>
              <p className="text-xs sm:text-sm text-berry-500">
                Available for luxury celebrations across California, New York, and bespoke destination weddings worldwide.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-blush/20 flex items-center justify-center text-blush-600 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-berry-700">Main Floral Studio</p>
                    <p className="text-xs text-berry-500">428 Maiden Lane, San Francisco, CA</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-sage-100 flex items-center justify-center text-sage-600 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-berry-700">Concierge Desk</p>
                    <p className="text-xs text-berry-500">+1 (415) 890-ROSE (7673)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-sand-200 flex items-center justify-center text-berry-600 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-berry-700">Curator Inquiries</p>
                    <p className="text-xs text-berry-500">concierge@petalandpromise.com</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-sand-100/70 border border-sand-300 text-xs text-berry-600">
                <p className="font-semibold mb-1">🌿 Automated Workflow Notice</p>
                <p className="text-[11px] text-berry-500">
                  Enquiries are securely logged to MongoDB and immediately trigger our Pabbly Connect webhook, recording details to Google Sheets and sending an instant personalized confirmation to your email.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Enquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-blush/30 shadow-luxe">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-berry-600 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Genevieve Thorne"
                      className="w-full px-4 py-2.5 rounded-xl border border-sand-300 text-sm text-berry-700 focus:outline-none focus:border-blush transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-berry-600 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. genevieve@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-sand-300 text-sm text-berry-700 focus:outline-none focus:border-blush transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-berry-600 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-2.5 rounded-xl border border-sand-300 text-sm text-berry-700 focus:outline-none focus:border-blush transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-berry-600 mb-1">Celebration Type</label>
                    <select
                      value={formData.eventType}
                      onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-sand-300 text-sm text-berry-700 focus:outline-none focus:border-blush transition-colors"
                    >
                      <option value="Wedding">Wedding</option>
                      <option value="Birthday">Milestone Birthday</option>
                      <option value="Engagement">Engagement / Proposal</option>
                      <option value="Anniversary">Anniversary</option>
                      <option value="Bespoke Celebration">Bespoke Gala / Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-berry-600 mb-1">Target Date / Season</label>
                    <input
                      type="text"
                      value={formData.estimatedDate}
                      onChange={(e) => setFormData({ ...formData, estimatedDate: e.target.value })}
                      placeholder="e.g. Fall 2026"
                      className="w-full px-4 py-2.5 rounded-xl border border-sand-300 text-sm text-berry-700 focus:outline-none focus:border-blush transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-berry-600 mb-1">Celebration Vision & Floral Needs *</label>
                  <textarea
                    rows="4"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your venue, colors, favorite flowers, guest count, or any inspiration images you love..."
                    className="w-full px-4 py-2.5 rounded-xl border border-sand-300 text-sm text-berry-700 focus:outline-none focus:border-blush transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-full text-xs font-semibold uppercase tracking-wider text-ivory bg-berry-600 hover:bg-berry-700 shadow-romantic hover:shadow-luxe transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin text-blush" />
                      <span>Sending Enquiry to Curators...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-blush" />
                      <span>Send Celebration Enquiry</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-sage-100 border border-sage-300 flex items-center justify-center mx-auto text-sage-600 shadow-soft">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-berry-700">
                  Enquiry Received with Gratitude
                </h3>
                <p className="text-xs sm:text-sm text-berry-500 max-w-md mx-auto">
                  Thank you, <strong>{formData.name}</strong>. Our lead floral architect has received your details and an automated confirmation has been dispatched to <strong>{formData.email}</strong>.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      eventType: 'Wedding',
                      estimatedDate: '',
                      estimatedGuests: '100-150',
                      estimatedBudget: '$4,000 - $7,000',
                      message: ''
                    });
                  }}
                  className="py-2.5 px-6 rounded-full text-xs font-semibold uppercase tracking-wider border border-blush text-berry-700 hover:bg-blush-50 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
