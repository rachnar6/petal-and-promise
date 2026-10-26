import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import {
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Users,
  DollarSign,
  Palette,
  Flower2,
  Check,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Image,
  Wind
} from 'lucide-react';
import confetti from 'canvas-confetti';

const availableThemes = [
  {
    name: 'Romantic Blush & Whisper Sage',
    palette: ['#F8F1EC', '#DDA6B2', '#A7B9A0', '#E8D9C5', '#754D58'],
    vibe: 'Soft, airy, dewy French garden romance'
  },
  {
    name: 'Midnight Berry & Velvet Dahlia',
    palette: ['#432630', '#754D58', '#CBB26B', '#E8D9C5', '#F8F1EC'],
    vibe: 'Dramatic, candlelit, regal evening banqueting'
  },
  {
    name: 'Tuscan Sunset & Warm Sand',
    palette: ['#E8D9C5', '#D8C3A8', '#C7AC8B', '#A7B9A0', '#F8F1EC'],
    vibe: 'Warm terracotta, sun-drenched courtyard feasts'
  },
  {
    name: 'Eternal Ivory & Architectural Greens',
    palette: ['#FFFFFF', '#F8F1EC', '#CCDCC8', '#6E8267', '#2E382B'],
    vibe: 'Crisp purity, modern sculptural minimalist chic'
  }
];

const flowerOptions = [
  'English Garden Roses',
  'Sarah Bernhardt Peonies',
  'White French Ranunculus',
  'Silver Dollar Eucalyptus',
  'Café au Lait Dahlias',
  'Sweet Peas',
  'White Phalaenopsis Orchids',
  'Italian Ruscus',
  'Hydrangeas',
  'Delphiniums'
];

export default function NewEventBooking() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Pre-filled values from studio or budget planner if passed
  const preset = location.state || {};

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submittedBooking, setSubmittedBooking] = useState(null);

  const [formData, setFormData] = useState({
    // Client Info (Empty by default; populated only if real user is signed in)
    clientName: user?.name || '',
    clientEmail: user?.email || '',
    clientPhone: '',
    // Event Details
    eventType: preset.presetEventType || 'Wedding',
    eventDate: '',
    eventTime: '',
    venueName: '',
    venueCity: '',
    isOutdoor: false,
    guestCount: preset.presetGuests || 100,
    // Theme & Package
    themeName: preset.presetTheme || availableThemes[0].name,
    themePalette: preset.presetPalette || availableThemes[0].palette,
    packageName: preset.presetPackageName || '',
    packageId: preset.presetPackageId || '',
    // Budget
    budgetTotal: preset.presetBudget || 5000,
    budgetTier: preset.presetTier || 'Elegance',
    // Flowers
    primaryFlowers: [],
    scentLevel: 'Moderate',
    colorDominance: '',
    // Arrangements
    ceremonyArch: false,
    aisleFlowers: false,
    bridalBouquet: false,
    bridesmaidsBouquets: 0,
    centerpiecesCount: 0,
    hangingFlorals: false,
    cakeFlowers: false,
    // Inspiration & Notes
    inspirationUrl: '',
    specialNotes: ''
  });

  const toggleFlower = (flower) => {
    let list = [...formData.primaryFlowers];
    if (list.includes(flower)) {
      list = list.filter((f) => f !== flower);
    } else {
      list.push(flower);
    }
    setFormData({ ...formData, primaryFlowers: list });
  };

  const handleNext = () => {
    setError('');
    if (step === 1) {
      if (!formData.clientName || !formData.clientEmail || !formData.clientPhone || !formData.eventDate) {
        setError('Please complete all contact and celebration date details.');
        return;
      }
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    setError('');
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        userId: user?.uid || 'guest_' + Date.now().toString(36),
        clientName: formData.clientName,
        clientEmail: formData.clientEmail,
        clientPhone: formData.clientPhone,
        eventType: formData.eventType,
        eventDate: formData.eventDate,
        eventTime: formData.eventTime,
        venue: {
          name: formData.venueName,
          city: formData.venueCity,
          isOutdoor: formData.isOutdoor
        },
        guestCount: Number(formData.guestCount),
        budget: {
          total: Number(formData.budgetTotal),
          tier: formData.budgetTier,
          currency: 'USD'
        },
        theme: {
          name: formData.themeName,
          palette: formData.themePalette,
          vibe: availableThemes.find((t) => t.name === formData.themeName)?.vibe || ''
        },
        packageId: formData.packageId,
        packageName: formData.packageName,
        flowerPreferences: {
          primaryFlowers: formData.primaryFlowers,
          scentLevel: formData.scentLevel,
          colorDominance: formData.colorDominance
        },
        arrangements: {
          ceremonyArch: formData.ceremonyArch,
          aisleFlowers: formData.aisleFlowers,
          bridalBouquet: formData.bridalBouquet,
          bridesmaidsBouquets: Number(formData.bridesmaidsBouquets),
          centerpiecesCount: Number(formData.centerpiecesCount),
          hangingFlorals: formData.hangingFlorals,
          cakeFlowers: formData.cakeFlowers
        },
        inspirationImages: formData.inspirationUrl
          ? [{ url: formData.inspirationUrl, caption: 'Primary Celebration Inspiration' }]
          : [],
        specialNotes: formData.specialNotes
      };

      const res = await api.createBooking(payload);
      if (res.success) {
        setSubmittedBooking(res.data);
        try {
          confetti({
            particleCount: 80,
            spread: 75,
            origin: { y: 0.6 },
            colors: ['#DDA6B2', '#A7B9A0', '#E8D9C5', '#F8F1EC', '#754D58']
          });
        } catch (e) {}
      } else {
        setError(res.message || 'Booking submission failed');
      }
    } catch (err) {
      setError(err.message || 'Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-heavenly-gradient relative">
      
      {/* Ambient glow backgrounds */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-blush/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-sage/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-berry-600 hover:text-berry-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Atelier</span>
          </Link>
        </div>

        {!submittedBooking ? (
          <div className="bg-ivory-50/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-blush-300/40 shadow-luxe">
            
            {/* Header */}
            <div className="text-center mb-8">
              <span className="font-script text-3xl text-blush-500 block">Personalized Celebration Blueprint</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-berry-600">
                Design Your Event Plan
              </h2>
              <p className="text-xs sm:text-sm text-berry-500 mt-1 max-w-lg mx-auto">
                Step-by-step bespoke curation for florals, stage framing, themes, and automated booking tracking.
              </p>
            </div>

            {/* Stepper Progress Header */}
            <div className="flex items-center justify-between max-w-md mx-auto mb-10 relative">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-sand-200 -translate-y-1/2 z-0" />
              {[
                { num: 1, label: 'Basics' },
                { num: 2, label: 'Theme' },
                { num: 3, label: 'Botanicals' },
                { num: 4, label: 'Arrangements' },
                { num: 5, label: 'Summary' }
              ].map((s) => {
                const isPassed = step >= s.num;
                const isCurrent = step === s.num;
                return (
                  <div key={s.num} className="relative z-10 flex flex-col items-center">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-soft ${
                        isCurrent
                          ? 'bg-berry-500 text-ivory ring-4 ring-blush/40 scale-110'
                          : isPassed
                          ? 'bg-blush text-berry-600'
                          : 'bg-white border border-sand-300/70 text-berry-400'
                      }`}
                    >
                      {isPassed && !isCurrent ? <Check className="w-4 h-4" /> : s.num}
                    </div>
                    <span className="text-[10px] font-semibold text-berry-600 mt-1.5 uppercase tracking-wider">
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {error && (
              <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              
              {/* STEP 1: Celebration Basics */}
              {step === 1 && (
                <div className="space-y-5 animate-fade-in">
                  <h3 className="font-serif text-xl font-semibold text-berry-600 pb-2 border-b border-sand-200">
                    1. Celebration & Contact Details
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-berry-600 mb-1">Celebrant / Host Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.clientName}
                        onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                        placeholder="Enter your full name"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300/70 text-xs text-berry-600 focus:outline-none focus:border-blush"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-berry-600 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.clientEmail}
                        onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                        placeholder="Enter your email address"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300/70 text-xs text-berry-600 focus:outline-none focus:border-blush"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-berry-600 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.clientPhone}
                        onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                        placeholder="Enter your phone number"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300/70 text-xs text-berry-600 focus:outline-none focus:border-blush"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-berry-600 mb-1">Celebration Category</label>
                      <select
                        value={formData.eventType}
                        onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300/70 text-xs text-berry-600 focus:outline-none focus:border-blush"
                      >
                        <option value="Wedding">Wedding</option>
                        <option value="Birthday">Milestone Birthday</option>
                        <option value="Engagement">Engagement / Proposal</option>
                        <option value="Anniversary">Anniversary</option>
                        <option value="Bespoke Celebration">Bespoke Gala / Soirée</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-berry-600 mb-1">Celebration Date *</label>
                      <input
                        type="date"
                        required
                        value={formData.eventDate}
                        onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300/70 text-xs text-berry-600 focus:outline-none focus:border-blush"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-berry-600 mb-1">Commencement Time</label>
                      <input
                        type="time"
                        value={formData.eventTime}
                        onChange={(e) => setFormData({ ...formData, eventTime: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300/70 text-xs text-berry-600 focus:outline-none focus:border-blush"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-berry-600 mb-1">Venue Name / Location</label>
                      <input
                        type="text"
                        value={formData.venueName}
                        onChange={(e) => setFormData({ ...formData, venueName: e.target.value })}
                        placeholder="Venue name (e.g. City Hall, Conservatory Manor)"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300/70 text-xs text-berry-600 focus:outline-none focus:border-blush"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-berry-600 mb-1">Estimated Guests</label>
                      <input
                        type="number"
                        min="5"
                        max="1000"
                        value={formData.guestCount}
                        onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                        placeholder="e.g. 100"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300/70 text-xs text-berry-600 focus:outline-none focus:border-blush"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Theme & Palette */}
              {step === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="font-serif text-xl font-semibold text-berry-600 pb-2 border-b border-sand-200">
                    2. Select Your Floral Theme & Palette
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {availableThemes.map((theme) => {
                      const isSelected = formData.themeName === theme.name;
                      return (
                        <div
                          key={theme.name}
                          onClick={() => setFormData({
                            ...formData,
                            themeName: theme.name,
                            themePalette: theme.palette
                          })}
                          className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                            isSelected
                              ? 'border-blush-500 bg-blush-50/80 shadow-soft scale-[1.01]'
                              : 'border-sand-300/70 bg-white hover:bg-sand-50'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-serif font-semibold text-sm text-berry-600">{theme.name}</h4>
                            {isSelected && <Check className="w-4 h-4 text-blush-600" />}
                          </div>
                          <p className="text-[11px] text-berry-500 mb-3">{theme.vibe}</p>

                          <div className="flex gap-1.5">
                            {theme.palette.map((color, i) => (
                              <div
                                key={i}
                                className="w-6 h-6 rounded-full border border-black/10 shadow-inner"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-berry-600 mb-2">
                      Package Collection Focus
                    </label>
                    <input
                      type="text"
                      value={formData.packageName}
                      onChange={(e) => setFormData({ ...formData, packageName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300/70 text-xs text-berry-600 focus:outline-none focus:border-blush"
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: Botanicals & Fragrance */}
              {step === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="font-serif text-xl font-semibold text-berry-600 pb-2 border-b border-sand-200">
                    3. Flower Varieties & Fragrance Profiles
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-berry-600 mb-3">
                      Select Preferred Stems (Click to toggle)
                    </label>
                    <div className="flex flex-wrap gap-2.5">
                      {flowerOptions.map((flower) => {
                        const isChosen = formData.primaryFlowers.includes(flower);
                        return (
                          <button
                            type="button"
                            key={flower}
                            onClick={() => toggleFlower(flower)}
                            className={`px-3.5 py-2 rounded-full text-xs font-medium transition-all ${
                              isChosen
                                ? 'bg-berry-500 text-ivory shadow-soft'
                                : 'bg-sand-100 text-berry-600 hover:bg-sand-200 border border-sand-300/70'
                            }`}
                          >
                            {isChosen ? '✓ ' : '+ '} {flower}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-berry-600 mb-1">Sensory Fragrance Intensity</label>
                      <select
                        value={formData.scentLevel}
                        onChange={(e) => setFormData({ ...formData, scentLevel: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300/70 text-xs text-berry-600 focus:outline-none focus:border-blush"
                      >
                        <option value="Subtle">Subtle & Gentle (Sensory friendly)</option>
                        <option value="Moderate">Moderate (Classic garden rose & eucalyptus aroma)</option>
                        <option value="Intoxicatingly Fragrant">Intoxicatingly Fragrant (French sweet peas, tuberose & gardenias)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-berry-600 mb-1">Color Dominance</label>
                      <input
                        type="text"
                        value={formData.colorDominance}
                        onChange={(e) => setFormData({ ...formData, colorDominance: e.target.value })}
                        placeholder="e.g. 70% Ivory, 20% Blush, 10% Gold accents"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300/70 text-xs text-berry-600 focus:outline-none focus:border-blush"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Arrangements & Budget */}
              {step === 4 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="font-serif text-xl font-semibold text-berry-600 pb-2 border-b border-sand-200">
                    4. Required Arrangements & Budget Allocation
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { key: 'ceremonyArch', label: 'Ceremony Altar Arch' },
                      { key: 'aisleFlowers', label: 'Petal Runway & Aisle Florals' },
                      { key: 'bridalBouquet', label: 'Bridal Bouquet' },
                      { key: 'hangingFlorals', label: 'Suspended Ceiling Installations' },
                      { key: 'cakeFlowers', label: 'Cake Floral Styling' },
                    ].map((item) => {
                      const active = formData[item.key];
                      return (
                        <div
                          key={item.key}
                          onClick={() => setFormData({ ...formData, [item.key]: !active })}
                          className={`p-3 rounded-xl border cursor-pointer text-xs flex items-center justify-between transition-colors ${
                            active ? 'bg-blush-50 border-blush-400 font-semibold text-berry-600' : 'bg-white border-sand-200 text-berry-500'
                          }`}
                        >
                          <span>{item.label}</span>
                          <span className={active ? 'text-berry-600 font-bold' : 'text-gray-300'}>
                            {active ? '✓' : '—'}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-berry-600 mb-1">Target Floral Budget ($ USD)</label>
                      <input
                        type="number"
                        step="250"
                        value={formData.budgetTotal}
                        onChange={(e) => setFormData({ ...formData, budgetTotal: Number(e.target.value) })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300/70 text-xs text-berry-600 focus:outline-none focus:border-blush"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-berry-600 mb-1">Inspiration Photo URL</label>
                      <input
                        type="url"
                        value={formData.inspirationUrl}
                        onChange={(e) => setFormData({ ...formData, inspirationUrl: e.target.value })}
                        placeholder="https://..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300/70 text-xs text-berry-600 focus:outline-none focus:border-blush"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-berry-600 mb-1">Special Notes & Vision</label>
                    <textarea
                      rows="3"
                      value={formData.specialNotes}
                      onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                      placeholder="Add any specific requests, candle preferences, setup time windows, etc."
                      className="w-full px-3.5 py-2 rounded-xl border border-sand-300/70 text-xs text-berry-600 focus:outline-none focus:border-blush resize-none"
                    />
                  </div>
                </div>
              )}

              {/* STEP 5: Summary Review */}
              {step === 5 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="font-serif text-xl font-semibold text-berry-600 pb-2 border-b border-sand-200">
                    5. Review Celebration Blueprint
                  </h3>

                  <div className="bg-sand-100/70 rounded-2xl p-6 border border-sand-300/70 space-y-4 text-xs text-berry-600">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-4 border-b border-sand-300/70">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-berry-400 block">Host Name</span>
                        <strong className="text-sm">{formData.clientName}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-berry-400 block">Event Type</span>
                        <strong className="text-sm">{formData.eventType}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-berry-400 block">Date & Time</span>
                        <strong className="text-sm">{formData.eventDate} ({formData.eventTime})</strong>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-berry-400 block">Guests</span>
                        <strong className="text-sm">{formData.guestCount} Guests</strong>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-sand-300/70">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-berry-400 block">Floral Theme</span>
                        <strong className="text-sm">{formData.themeName}</strong>
                        <div className="flex gap-1.5 mt-1.5">
                          {formData.themePalette.map((c, i) => (
                            <div key={i} className="w-5 h-5 rounded-full border border-black/10" style={{ backgroundColor: c }} />
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-berry-400 block">Investment</span>
                        <strong className="text-xl text-berry-600">${Number(formData.budgetTotal).toLocaleString()} USD</strong>
                        <p className="text-[11px] text-berry-500 mt-0.5">Package: {formData.packageName}</p>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-berry-400 block mb-1">Selected Flowers</span>
                      <p className="text-berry-600 font-medium">{formData.primaryFlowers.join(', ')}</p>
                    </div>

                    <div className="p-3 bg-blush-50 rounded-xl border border-blush-300/40 text-[11px] text-sage-800 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-blush-500 flex-shrink-0" />
                      <span>Upon submission, details are recorded to the database and will trigger the automated Pabbly Connect workflow to notify our florists and sync to Google Sheets.</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-8 border-t border-sand-200 mt-8">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="py-2.5 px-5 rounded-full text-xs font-semibold uppercase tracking-wider border border-sand-300/70 text-berry-600 hover:bg-sand-100 transition-colors flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                ) : <div />}

                {step < 5 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="py-3 px-7 rounded-full text-xs font-semibold uppercase tracking-wider bg-berry-500 text-ivory hover:bg-berry-600 shadow-romantic transition-all flex items-center gap-2"
                  >
                    <span>Proceed to Next Step</span>
                    <ArrowRight className="w-3.5 h-3.5 text-blush" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className="py-3 px-8 rounded-full text-xs font-semibold uppercase tracking-wider bg-berry-500 text-ivory hover:bg-berry-600 shadow-romantic hover:shadow-luxe transition-all flex items-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Sparkles className="w-4 h-4 animate-spin text-blush" />
                        <span>Submitting Celebration Blueprint...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4 text-blush" />
                        <span>Confirm Celebration Booking</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation Success Screen */
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-blush-300/40 shadow-luxe text-center space-y-6 animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-sage-100 border border-sage-300 flex items-center justify-center mx-auto text-sage-600 shadow-romantic">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <span className="font-script text-5xl text-blush-500 block">Félicitations!</span>
            <h2 className="font-serif text-3xl font-semibold text-berry-600">
              Your Celebration Blueprint is Confirmed
            </h2>

            <p className="text-sm text-berry-600 max-w-lg mx-auto">
              Your reservation reference is <span className="font-mono font-bold text-berry-600 bg-blush-50 px-2 py-0.5 rounded border border-blush-300/40">{submittedBooking.bookingReference}</span>.
              Our floral architects will begin reviewing your vision and stem availability.
            </p>

            <div className="p-4 rounded-2xl bg-sand-100/80 border border-sand-300/70 max-w-md mx-auto text-left text-xs text-berry-600 space-y-2">
              <p><strong>Automation Status:</strong></p>
              <p>• Pabbly Workflow Trigger: <span className="text-sage-600 font-semibold">Active & Emitted</span></p>
              <p>• Sheets Logging: <span className="text-sage-600 font-semibold">Logged to Google Sheets</span></p>
              <p>• Client Confirmation Email: <span className="text-sage-600 font-semibold">Dispatched to {submittedBooking.clientEmail}</span></p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
              <Link
                to="/portal"
                className="py-3 px-8 rounded-full text-xs font-semibold uppercase tracking-wider bg-berry-500 text-ivory hover:bg-berry-600 shadow-romantic transition-all"
              >
                Track in My Portal
              </Link>
              <Link
                to="/"
                className="py-3 px-8 rounded-full text-xs font-semibold uppercase tracking-wider border border-sand-300/70 text-berry-600 hover:bg-sand-100 transition-all"
              >
                Return to Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
