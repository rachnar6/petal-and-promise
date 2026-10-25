const express = require('express');
const router = express.Router();
const { requireAuth, requireAdmin } = require('../middleware/auth');
const mockStore = require('../services/mockStore');
const { triggerPabblyWorkflow } = require('../services/pabblyService');
const { getIsConnected } = require('../config/db');
let Booking;
try {
  Booking = require('../models/Booking');
} catch (e) {
  // fallback
}

// 1. GET /api/bookings - List bookings (User sees theirs, Admin sees all)
router.get('/', requireAuth, async (req, res) => {
  try {
    const { status, eventType, search } = req.query;
    const isAdmin = req.user.role === 'admin';
    const userId = isAdmin ? null : req.user.uid;

    if (getIsConnected() && Booking) {
      const query = {};
      if (!isAdmin) query.userId = userId;
      if (status && status !== 'All') query.status = status;
      if (eventType && eventType !== 'All') query.eventType = eventType;
      if (search) {
        query.$or = [
          { clientName: { $regex: search, $options: 'i' } },
          { clientEmail: { $regex: search, $options: 'i' } },
          { bookingReference: { $regex: search, $options: 'i' } }
        ];
      }
      const bookings = await Booking.find(query).sort({ createdAt: -1 });
      return res.json({ success: true, count: bookings.length, data: bookings });
    }

    // Mock store
    const bookings = mockStore.getBookings({ userId, status, eventType, search });
    return res.json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    console.error('[Get Bookings Error]:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// 2. GET /api/bookings/:id - Single booking details
router.get('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const isAdmin = req.user.role === 'admin';

    let booking;
    if (getIsConnected() && Booking) {
      booking = await Booking.findOne({
        $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { bookingReference: id }]
      });
    } else {
      booking = mockStore.getBookingById(id);
    }

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking reservation not found' });
    }

    // Authorization: User can only view their own booking unless Admin
    if (!isAdmin && booking.userId !== req.user.uid) {
      return res.status(403).json({ success: false, message: 'Access denied to this booking reservation' });
    }

    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 3. POST /api/bookings - Create new event booking
router.post('/', async (req, res) => {
  try {
    const {
      clientName,
      clientEmail,
      clientPhone,
      eventType,
      eventDate,
      eventTime,
      venue,
      guestCount,
      budget,
      theme,
      packageId,
      packageName,
      flowerPreferences,
      arrangements,
      inspirationImages,
      specialNotes,
      userId
    } = req.body;

    if (!clientName || !clientEmail || !clientPhone || !eventDate) {
      return res.status(400).json({
        success: false,
        message: 'Missing required celebration details: Name, Email, Phone, and Event Date are mandatory.'
      });
    }

    const bookingData = {
      userId: userId || (req.user ? req.user.uid : 'guest_' + Date.now().toString(36)),
      clientName,
      clientEmail,
      clientPhone,
      eventType: eventType || 'Wedding',
      eventDate,
      eventTime: eventTime || '17:00',
      venue: typeof venue === 'string' ? { name: venue } : (venue || { name: 'To Be Decided' }),
      guestCount: Number(guestCount) || 100,
      budget: budget || { total: 3500, tier: 'Elegance', currency: 'USD' },
      theme: theme || { name: 'Romantic Blush & Whisper Sage' },
      packageId: packageId || 'pkg_wedding_versailles',
      packageName: packageName || 'The Versailles Grand Romance',
      flowerPreferences: flowerPreferences || {
        primaryFlowers: ['English Peonies', 'Garden Roses', 'White Ranunculus'],
        scentLevel: 'Moderate',
        colorDominance: 'Blush pink, ivory & sage greens'
      },
      arrangements: arrangements || {
        ceremonyArch: true,
        aisleFlowers: true,
        bridalBouquet: true,
        bridesmaidsBouquets: 3,
        centerpiecesCount: 10,
        hangingFlorals: false,
        cakeFlowers: true
      },
      inspirationImages: inspirationImages || [],
      specialNotes: specialNotes || '',
      status: 'Pending',
      timeline: [
        { stage: 'Booking Request Submitted', date: new Date(), note: 'Celebration received in portal', completed: true },
        { stage: 'Consultation & Mood Board', date: null, note: 'Schedule your private floral tasting', completed: false },
        { stage: 'Floral Sourcing & Artistry Prep', date: null, note: 'Reserving seasonal harvest', completed: false },
        { stage: 'Delivery & Event Perfection', date: null, note: 'On-site installation and styling', completed: false }
      ]
    };

    let newBooking;
    if (getIsConnected() && Booking) {
      newBooking = await Booking.create(bookingData);
    } else {
      newBooking = mockStore.createBooking(bookingData);
    }

    console.log(`[Booking] Created new reservation: ${newBooking.bookingReference} for ${clientName}`);

    // Trigger Pabbly Workflow 1: New Event Booking
    const pabblyResult = await triggerPabblyWorkflow('booking.created', {
      bookingReference: newBooking.bookingReference,
      clientName: newBooking.clientName,
      clientEmail: newBooking.clientEmail,
      clientPhone: newBooking.clientPhone,
      eventType: newBooking.eventType,
      eventDate: newBooking.eventDate,
      eventTime: newBooking.eventTime,
      venue: newBooking.venue?.name || 'TBD',
      guestCount: newBooking.guestCount,
      estimatedBudget: newBooking.budget?.total,
      packageName: newBooking.packageName,
      themeName: newBooking.theme?.name,
      specialNotes: newBooking.specialNotes,
      status: newBooking.status,
      portalLink: `${process.env.CLIENT_URL || 'http://localhost:5173'}/portal/bookings/${newBooking.bookingReference}`
    });

    res.status(201).json({
      success: true,
      message: 'Celebration booking submitted successfully! Our floral design team will review your request.',
      data: newBooking,
      automation: pabblyResult
    });
  } catch (error) {
    console.error('[Create Booking Error]:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// 4. PATCH /api/bookings/:id/status - Admin status update (Pending -> Confirmed -> In Progress -> Completed -> Cancelled)
router.patch('/:id/status', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;

    const validStatuses = ['Pending', 'Confirmed', 'In Progress', 'Completed', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
    }

    let updatedBooking;
    if (getIsConnected() && Booking) {
      const booking = await Booking.findOne({
        $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { bookingReference: id }]
      });
      if (!booking) return res.status(404).json({ success: false, message: 'Booking reservation not found' });

      booking.status = status;
      if (adminNotes) booking.adminNotes = adminNotes;
      booking.timeline.push({
        stage: `Status updated to ${status}`,
        date: new Date(),
        note: adminNotes || `Admin marked booking as ${status}`,
        completed: true
      });
      await booking.save();
      updatedBooking = booking;
    } else {
      const existing = mockStore.getBookingById(id);
      if (!existing) return res.status(404).json({ success: false, message: 'Booking reservation not found' });

      const timeline = [...(existing.timeline || []), {
        stage: `Status updated to ${status}`,
        date: new Date(),
        note: adminNotes || `Admin marked booking as ${status}`,
        completed: true
      }];

      updatedBooking = mockStore.updateBooking(existing._id, {
        status,
        adminNotes: adminNotes || existing.adminNotes,
        timeline
      });
    }

    // Trigger Pabbly Workflow 3: Booking Status Updates
    const pabblyResult = await triggerPabblyWorkflow('booking.status_updated', {
      bookingReference: updatedBooking.bookingReference,
      clientName: updatedBooking.clientName,
      clientEmail: updatedBooking.clientEmail,
      eventType: updatedBooking.eventType,
      eventDate: updatedBooking.eventDate,
      previousStatus: req.body.previousStatus || 'Previous',
      newStatus: status,
      adminNotes: adminNotes || '',
      updatedAt: new Date().toISOString()
    });

    res.json({
      success: true,
      message: `Booking reservation status updated to ${status}`,
      data: updatedBooking,
      automation: pabblyResult
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 5. PATCH /api/bookings/:id/cancel - Customer cancels own eligible booking
router.patch('/:id/cancel', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    let booking;
    if (getIsConnected() && Booking) {
      booking = await Booking.findOne({
        $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { bookingReference: id }]
      });
    } else {
      booking = mockStore.getBookingById(id);
    }

    if (!booking) return res.status(404).json({ success: false, message: 'Booking reservation not found' });

    // Authorization
    if (req.user.role !== 'admin' && booking.userId !== req.user.uid) {
      return res.status(403).json({ success: false, message: 'Unauthorized to cancel this booking' });
    }

    if (booking.status === 'Completed' || booking.status === 'Cancelled') {
      return res.status(400).json({ success: false, message: `Booking cannot be cancelled because it is already ${booking.status}` });
    }

    const note = `Cancellation requested by client. Reason: ${reason || 'Change of celebration plans'}`;

    let updated;
    if (getIsConnected() && Booking) {
      booking.status = 'Cancelled';
      booking.specialNotes = (booking.specialNotes ? booking.specialNotes + ' | ' : '') + note;
      booking.timeline.push({
        stage: 'Celebration Cancelled',
        date: new Date(),
        note: reason || 'Cancelled by client',
        completed: true
      });
      await booking.save();
      updated = booking;
    } else {
      updated = mockStore.updateBooking(booking._id, {
        status: 'Cancelled',
        specialNotes: (booking.specialNotes ? booking.specialNotes + ' | ' : '') + note
      });
    }

    // Trigger Pabbly Workflow 3 for cancellation email
    await triggerPabblyWorkflow('booking.status_updated', {
      bookingReference: updated.bookingReference,
      clientName: updated.clientName,
      clientEmail: updated.clientEmail,
      eventType: updated.eventType,
      newStatus: 'Cancelled',
      cancellationReason: reason || 'Client requested cancellation',
      updatedAt: new Date().toISOString()
    });

    res.json({
      success: true,
      message: 'Booking reservation has been cancelled.',
      data: updated
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
