import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import {
  Calendar,
  Clock,
  Sparkles,
  Heart,
  Flower2,
  MapPin,
  CheckCircle2,
  AlertCircle,
  X,
  Plus,
  ArrowRight,
  Video,
  FileText
} from 'lucide-react';

export default function CustomerPortal({ onOpenConsultation }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [cancelModalBooking, setCancelModalBooking] = useState(null);
  const [cancelReason, setCancelReason] = useState('');
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' | 'consultations' | 'favorites'

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: { pathname: '/portal' } } });
      return;
    }
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [bRes, cRes] = await Promise.all([
        api.getBookings(),
        api.getConsultations()
      ]);
      if (bRes.success) setBookings(bRes.data);
      if (cRes.success) setConsultations(cRes.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async () => {
    if (!cancelModalBooking) return;
    try {
      const res = await api.cancelBooking(cancelModalBooking._id || cancelModalBooking.bookingReference, cancelReason);
      if (res.success) {
        setCancelModalBooking(null);
        setCancelReason('');
        fetchData();
      }
    } catch (e) {
      alert(e.message || 'Unable to cancel booking');
    }
  };

  // Next upcoming booking for the live countdown
  const upcomingBooking = bookings.find(b => b.status !== 'Cancelled') || bookings[0];

  // Calculate days left
  const calculateDaysLeft = (targetDate) => {
    if (!targetDate) return 24;
    const diff = new Date(targetDate) - new Date();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-heavenly-gradient relative">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Welcome Header */}
        <div className="bg-white/85 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-blush/30 shadow-luxe flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={user?.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
              alt={user?.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-blush shadow-soft"
            />
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blush/20 text-[10px] font-semibold text-berry-700 uppercase tracking-wider mb-1">
                <Sparkles className="w-3 h-3 text-blush-500" />
                <span>Celebration Host Portal</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-berry-700">
                Bonjour, {user?.name || 'Celebration Host'}
              </h1>
              <p className="text-xs text-berry-500">
                Managing your bespoke floral timelines, private tastings, and celebration blueprints.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenConsultation}
              className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-sand-100 hover:bg-sand-200 border border-sand-300 text-berry-700 transition-all shadow-soft flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-sage-600" />
              <span>Book Tasting</span>
            </button>

            <Link
              to="/portal/new-event"
              className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-berry-600 hover:bg-berry-700 text-ivory transition-all shadow-romantic flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5 text-blush" />
              <span>New Celebration</span>
            </Link>
          </div>
        </div>

        {/* Live Countdown & Progress Showcase (If an active booking exists) */}
        {upcomingBooking && (
          <div className="bg-gradient-to-r from-berry-700 via-berry-600 to-berry-800 text-ivory rounded-3xl p-6 sm:p-8 shadow-luxe border border-berry-500/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blush/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Countdown left */}
              <div className="lg:col-span-5 space-y-3">
                <span className="text-[10px] uppercase font-semibold tracking-widest text-sand-300">
                  Next Milestone Celebration
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-ivory leading-tight">
                  {upcomingBooking.packageName}
                </h3>
                <p className="text-xs text-sand-200">
                  {upcomingBooking.eventType} at {upcomingBooking.venue?.name || 'TBD'} • {upcomingBooking.eventDate}
                </p>

                {/* Countdown pill */}
                <div className="inline-flex items-center gap-3 bg-berry-900/50 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-blush/20 text-xs mt-2">
                  <Clock className="w-4 h-4 text-blush" />
                  <span>
                    Countdown: <strong className="text-blush text-sm">{calculateDaysLeft(upcomingBooking.eventDate)} Days Left</strong> until vows & blooms!
                  </span>
                </div>
              </div>

              {/* Progress 5-stage tracker right */}
              <div className="lg:col-span-7 space-y-3">
                <span className="text-[10px] uppercase font-semibold tracking-widest text-sand-300">
                  Floral Preparation Stage
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { step: '1. Request', desc: 'Received & Logged', active: true },
                    { step: '2. Tasting', desc: 'Design Consultation', active: upcomingBooking.status !== 'Pending' },
                    { step: '3. Sourcing', desc: 'Stems Reserved', active: ['Confirmed', 'In Progress', 'Completed'].includes(upcomingBooking.status) },
                    { step: '4. Setup', desc: 'On-Site Delivery', active: ['In Progress', 'Completed'].includes(upcomingBooking.status) },
                  ].map((s, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-xl text-center border text-xs transition-colors ${
                        s.active
                          ? 'bg-ivory/15 border-blush text-ivory'
                          : 'bg-black/10 border-white/10 text-sand-300/60'
                      }`}
                    >
                      <p className="font-semibold">{s.step}</p>
                      <p className="text-[10px] text-sand-200 mt-0.5">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex border-b border-blush/20 gap-6">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`pb-3 text-sm font-serif font-semibold transition-all relative ${
              activeTab === 'bookings'
                ? 'text-berry-700 border-b-2 border-berry-700'
                : 'text-berry-400 hover:text-berry-600'
            }`}
          >
            My Celebrations ({bookings.length})
          </button>

          <button
            onClick={() => setActiveTab('consultations')}
            className={`pb-3 text-sm font-serif font-semibold transition-all relative ${
              activeTab === 'consultations'
                ? 'text-berry-700 border-b-2 border-berry-700'
                : 'text-berry-400 hover:text-berry-600'
            }`}
          >
            Private Consultations ({consultations.length})
          </button>
        </div>

        {/* TAB 1: Bookings List */}
        {activeTab === 'bookings' && (
          <div className="space-y-4">
            {loading ? (
              <div className="p-12 text-center text-berry-400">
                <Sparkles className="w-6 h-6 animate-spin text-blush mx-auto mb-2" />
                <span>Loading your celebration reservations...</span>
              </div>
            ) : bookings.length === 0 ? (
              <div className="bg-white/80 rounded-3xl p-12 text-center border border-sand-300 space-y-4">
                <Flower2 className="w-12 h-12 text-blush mx-auto" />
                <h3 className="font-serif text-xl font-semibold text-berry-700">No Celebrations Yet</h3>
                <p className="text-xs text-berry-500 max-w-sm mx-auto">
                  Begin designing your dream wedding, anniversary or milestone birthday with our bespoke floral architect.
                </p>
                <Link
                  to="/portal/new-event"
                  className="inline-block py-2.5 px-6 rounded-full text-xs font-semibold uppercase tracking-wider bg-berry-600 text-ivory shadow-soft"
                >
                  Create First Celebration
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {bookings.map((booking) => {
                  const statusColors = {
                    Pending: 'bg-sand-200 text-berry-700 border-sand-300',
                    Confirmed: 'bg-sage-100 text-sage-800 border-sage-300',
                    'In Progress': 'bg-blush-100 text-berry-700 border-blush-300',
                    Completed: 'bg-berry-100 text-berry-800 border-berry-300',
                    Cancelled: 'bg-gray-100 text-gray-500 border-gray-300'
                  };

                  return (
                    <div
                      key={booking._id || booking.bookingReference}
                      className="bg-white/90 rounded-3xl p-6 border border-blush/25 shadow-soft hover:shadow-luxe transition-all flex flex-col justify-between"
                    >
                      <div>
                        {/* Top reference and status */}
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-mono text-xs font-bold text-berry-500 bg-sand-100 px-2.5 py-1 rounded-md">
                            {booking.bookingReference}
                          </span>
                          <span className={`text-[10px] font-semibold uppercase tracking-wider px-3 py-0.5 rounded-full border ${statusColors[booking.status] || 'bg-gray-100'}`}>
                            {booking.status}
                          </span>
                        </div>

                        <h3 className="font-serif text-xl font-semibold text-berry-700">
                          {booking.packageName || 'Custom Floral Celebration'}
                        </h3>
                        <p className="text-xs text-berry-500 mt-0.5">
                          {booking.eventType} • {booking.guestCount} Guests
                        </p>

                        <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-sand-200 text-xs">
                          <div>
                            <span className="text-[10px] text-berry-400 uppercase font-semibold block">Date</span>
                            <span className="font-medium text-berry-700">{booking.eventDate} ({booking.eventTime || '17:00'})</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-berry-400 uppercase font-semibold block">Venue</span>
                            <span className="font-medium text-berry-700 truncate block">{booking.venue?.name || 'TBD'}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-berry-400 uppercase font-semibold block">Theme</span>
                            <span className="font-medium text-berry-700 truncate block">{booking.theme?.name || 'Blush & Sage'}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-berry-400 uppercase font-semibold block">Investment</span>
                            <span className="font-bold text-berry-700">${(booking.budget?.total || 0).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="pt-5 mt-4 border-t border-sand-200 flex items-center justify-between">
                        <button
                          onClick={() => setSelectedBooking(booking)}
                          className="text-xs font-semibold uppercase tracking-wider text-berry-700 hover:text-blush-600 transition-colors flex items-center gap-1"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>View Full Blueprint</span>
                        </button>

                        {booking.status !== 'Cancelled' && booking.status !== 'Completed' && (
                          <button
                            onClick={() => setCancelModalBooking(booking)}
                            className="text-xs text-red-500 hover:text-red-700 transition-colors"
                          >
                            Cancel Request
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Consultations List */}
        {activeTab === 'consultations' && (
          <div className="space-y-4">
            {consultations.length === 0 ? (
              <div className="bg-white/80 rounded-3xl p-12 text-center border border-sand-300 space-y-4">
                <Calendar className="w-12 h-12 text-sage-600 mx-auto" />
                <h3 className="font-serif text-xl font-semibold text-berry-700">No Scheduled Tastings</h3>
                <p className="text-xs text-berry-500 max-w-sm mx-auto">
                  Meet 1-on-1 with our master florists to smell garden blooms, test silk ribbons, and review stage mockups.
                </p>
                <button
                  onClick={onOpenConsultation}
                  className="py-2.5 px-6 rounded-full text-xs font-semibold uppercase tracking-wider bg-berry-600 text-ivory shadow-soft"
                >
                  Schedule Private Tasting
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {consultations.map((c) => (
                  <div key={c._id} className="bg-white rounded-3xl p-6 border border-blush/20 shadow-soft space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold uppercase px-2.5 py-0.5 rounded-full bg-sage-100 text-sage-700">
                        {c.status}
                      </span>
                      <span className="text-xs text-berry-400">{c.preferredDate}</span>
                    </div>

                    <h4 className="font-serif text-lg font-semibold text-berry-700">{c.consultationType}</h4>
                    <p className="text-xs text-berry-500">{c.notes || 'No special notes provided'}</p>

                    <div className="pt-3 border-t border-sand-200 flex items-center justify-between">
                      <span className="text-xs font-medium text-berry-600">Time: {c.preferredTime}</span>
                      {c.meetingLink && (
                        <a
                          href={c.meetingLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-blush-600 font-semibold hover:underline"
                        >
                          <Video className="w-3.5 h-3.5" />
                          <span>Google Meet Link</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-berry-950/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedBooking(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-ivory rounded-3xl p-6 sm:p-8 border border-blush/30 shadow-luxe max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedBooking(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-berry-400 hover:text-berry-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-blush-600">
                Reservation #{selectedBooking.bookingReference}
              </span>
              <h3 className="font-serif text-2xl font-semibold text-berry-700 mt-0.5">
                {selectedBooking.packageName}
              </h3>
              <p className="text-xs text-berry-500 mt-1">
                Status: <strong className="text-berry-700">{selectedBooking.status}</strong> • Created {new Date(selectedBooking.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="space-y-4 text-xs text-berry-700">
              <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-white border border-sand-300">
                <div>
                  <p className="text-[10px] uppercase font-semibold text-berry-400">Venue</p>
                  <p className="font-medium">{selectedBooking.venue?.name || 'TBD'} ({selectedBooking.venue?.city || 'Local'})</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-semibold text-berry-400">Date & Time</p>
                  <p className="font-medium">{selectedBooking.eventDate} at {selectedBooking.eventTime}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-semibold text-berry-400">Guests</p>
                  <p className="font-medium">{selectedBooking.guestCount} Guests</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-semibold text-berry-400">Budget</p>
                  <p className="font-bold text-sm text-berry-700">${(selectedBooking.budget?.total || 0).toLocaleString()}</p>
                </div>
              </div>

              {selectedBooking.flowerPreferences && (
                <div className="p-4 rounded-2xl bg-white border border-sand-300 space-y-1">
                  <p className="text-[10px] uppercase font-semibold text-berry-400">Flower Preferences</p>
                  <p className="font-medium">{(selectedBooking.flowerPreferences.primaryFlowers || []).join(', ')}</p>
                  <p className="text-[11px] text-berry-500">Fragrance: {selectedBooking.flowerPreferences.scentLevel}</p>
                </div>
              )}

              {selectedBooking.specialNotes && (
                <div className="p-4 rounded-2xl bg-white border border-sand-300">
                  <p className="text-[10px] uppercase font-semibold text-berry-400 mb-1">Celebration Notes</p>
                  <p className="italic text-berry-600">{selectedBooking.specialNotes}</p>
                </div>
              )}

              {/* Timeline History */}
              {selectedBooking.timeline && selectedBooking.timeline.length > 0 && (
                <div className="pt-2">
                  <p className="text-[10px] uppercase font-semibold text-berry-400 mb-2">History & Status Updates</p>
                  <div className="space-y-2">
                    {selectedBooking.timeline.map((t, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[11px] text-berry-600 bg-sand-100 p-2 rounded-xl">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sage-600 flex-shrink-0" />
                        <span className="font-semibold">{t.stage}</span>
                        {t.note && <span className="text-berry-400">— {t.note}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-sand-200 flex justify-end">
              <button
                onClick={() => setSelectedBooking(null)}
                className="py-2 px-6 rounded-full text-xs font-semibold uppercase tracking-wider bg-sand-200 text-berry-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancellation Confirmation Modal */}
      {cancelModalBooking && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-berry-950/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setCancelModalBooking(null)}
        >
          <div
            className="relative max-w-md w-full bg-ivory rounded-3xl p-6 sm:p-8 border border-blush/30 shadow-luxe"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-serif text-xl font-semibold text-berry-700">Cancel Reservation</h3>
            <p className="text-xs text-berry-500 mt-1">
              Are you sure you want to cancel reservation <strong>#{cancelModalBooking.bookingReference}</strong>?
            </p>

            <div className="mt-4">
              <label className="block text-xs font-medium text-berry-600 mb-1">Reason for cancellation</label>
              <textarea
                rows="3"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Change of venue, rescheduled date, etc."
                className="w-full px-3 py-2 rounded-xl border border-sand-300 text-xs text-berry-700 focus:outline-none focus:border-blush resize-none"
              />
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setCancelModalBooking(null)}
                className="py-2 px-4 rounded-full text-xs font-semibold text-berry-600 hover:bg-sand-100"
              >
                Never Mind
              </button>
              <button
                onClick={handleCancelBooking}
                className="py-2 px-5 rounded-full text-xs font-semibold bg-red-600 text-ivory hover:bg-red-700 shadow-soft"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
