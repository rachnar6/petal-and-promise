import React, { useState } from 'react';
import { X, Calendar, Clock, Sparkles, Video, Store, MapPin, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';
import confetti from 'canvas-confetti';

export default function ConsultationModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    preferredDate: '',
    preferredTime: '15:00',
    consultationType: 'Virtual Video Call',
    eventType: 'Wedding',
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [resultData, setResultData] = useState(null);

  if (!isOpen) return null;

  const consultationTypes = [
    {
      id: 'Virtual Video Call',
      title: 'Virtual Atelier Tasting',
      icon: Video,
      desc: '1-on-1 video call reviewing digital mood boards and flower varieties.'
    },
    {
      id: 'In-Studio Floral Tasting',
      title: 'In-Studio Scent & Stem Tasting',
      icon: Store,
      desc: 'Visit our flagship atelier for chilled champagne and seasonal bloom samples.'
    },
    {
      id: 'Venue Walkthrough',
      title: 'Architectural Venue Walkthrough',
      icon: MapPin,
      desc: 'Meet our lead floral architect at your venue for bespoke installation mapping.'
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.scheduleConsultation(formData);
      if (res.success) {
        setSubmitted(true);
        setResultData(res.data);
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            colors: ['#DDA6B2', '#A7B9A0', '#E8D9C5', '#F8F1EC']
          });
        } catch (e) {}
      } else {
        setError(res.message || 'Unable to schedule consultation');
      }
    } catch (err) {
      setError(err.message || 'Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setResultData(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-berry-900/40 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl bg-ivory rounded-3xl shadow-luxe border border-blush/30 p-6 sm:p-8 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 p-2 rounded-full text-berry-400 hover:text-berry-700 hover:bg-blush-50 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="text-center mb-6">
              <span className="font-script text-3xl text-blush-500 block mb-1">An Intimate Conversation</span>
              <h3 className="font-serif text-2xl font-semibold text-berry-700">
                Book Your Private Floral Consultation
              </h3>
              <p className="text-xs sm:text-sm text-berry-500 mt-1 max-w-md mx-auto">
                Discuss flower varieties, color palettes, and bespoke celebration installations with our master florists.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              {/* Consultation Type Selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-berry-600 mb-2">
                  Select Consultation Experience
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {consultationTypes.map((type) => {
                    const Icon = type.icon;
                    const isSelected = formData.consultationType === type.id;
                    return (
                      <button
                        type="button"
                        key={type.id}
                        onClick={() => setFormData({ ...formData, consultationType: type.id })}
                        className={`p-3 rounded-2xl border text-left transition-all ${
                          isSelected
                            ? 'border-blush-500 bg-blush-50/90 shadow-soft'
                            : 'border-sand-300 bg-white/70 hover:bg-sand-50'
                        }`}
                      >
                        <Icon className={`w-4 h-4 mb-1.5 ${isSelected ? 'text-blush-600' : 'text-berry-400'}`} />
                        <p className="text-xs font-serif font-semibold text-berry-700 leading-snug">{type.title}</p>
                        <p className="text-[10px] text-berry-400 mt-0.5 leading-tight">{type.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Client Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-berry-600 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    placeholder="e.g. Genevieve Rostova"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 bg-white/80 text-sm text-berry-700 focus:outline-none focus:border-blush-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-berry-600 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.clientEmail}
                    onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                    placeholder="e.g. genevieve@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 bg-white/80 text-sm text-berry-700 focus:outline-none focus:border-blush-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-berry-600 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.clientPhone}
                    onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 bg-white/80 text-sm text-berry-700 focus:outline-none focus:border-blush-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-berry-600 mb-1">Preferred Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 bg-white/80 text-sm text-berry-700 focus:outline-none focus:border-blush-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-berry-600 mb-1">Preferred Time *</label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 bg-white/80 text-sm text-berry-700 focus:outline-none focus:border-blush-500 transition-colors"
                  >
                    <option value="11:00">11:00 AM (Morning)</option>
                    <option value="13:30">01:30 PM (Afternoon)</option>
                    <option value="15:00">03:00 PM (Tea & Tasting)</option>
                    <option value="17:00">05:00 PM (Sunset Hours)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-berry-600 mb-1">Celebration Vision & Notes</label>
                <textarea
                  rows="2"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Tell us about your celebration, favorite flowers, venue, or aesthetic..."
                  className="w-full px-3.5 py-2 rounded-xl border border-sand-300 bg-white/80 text-sm text-berry-700 focus:outline-none focus:border-blush-500 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 rounded-full text-xs font-semibold uppercase tracking-wider text-ivory bg-berry-600 hover:bg-berry-700 transition-all duration-300 shadow-romantic hover:shadow-luxe flex items-center justify-center gap-2 mt-4"
              >
                {loading ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin text-blush" />
                    <span>Reserving Your Atelier Session...</span>
                  </>
                ) : (
                  <>
                    <Calendar className="w-4 h-4 text-blush" />
                    <span>Confirm Consultation Appointment</span>
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-sage-100 border border-sage-300 flex items-center justify-center mx-auto text-sage-600 shadow-soft">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <span className="font-script text-4xl text-blush-500 block">Magnifique!</span>
            <h3 className="font-serif text-2xl font-semibold text-berry-700">
              Your Consultation is Confirmed
            </h3>

            <p className="text-xs sm:text-sm text-berry-500 max-w-md mx-auto">
              We look forward to meeting with you on <strong>{formData.preferredDate}</strong> at <strong>{formData.preferredTime}</strong> for your {formData.consultationType}.
            </p>

            <div className="p-4 rounded-2xl bg-blush-50/80 border border-blush/30 text-xs text-berry-600 text-left space-y-1.5 max-w-md mx-auto">
              <p><strong>Appointment Details:</strong></p>
              <p>• Client: {formData.clientName} ({formData.clientEmail})</p>
              <p>• Meeting link: <a href="https://meet.google.com/pp-floral-design" target="_blank" rel="noreferrer" className="text-blush-600 underline">meet.google.com/pp-floral-design</a></p>
              <p className="text-[11px] text-sage-700 pt-1">🌿 Automated confirmation & Google Sheets calendar entry triggered via Pabbly Connect.</p>
            </div>

            <button
              onClick={handleReset}
              className="py-2.5 px-8 rounded-full text-xs font-semibold uppercase tracking-wider bg-berry-600 text-ivory shadow-soft hover:bg-berry-700 transition-colors"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
