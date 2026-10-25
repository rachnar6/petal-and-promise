// In-memory fallback and seed store for Petal & Promise
// Used seamlessly when MongoDB Atlas is not yet connected or during local development

const mockPackages = [
  {
    _id: 'pkg_wedding_versailles',
    title: 'The Versailles Grand Romance',
    slug: 'the-versailles-grand-romance',
    category: 'Wedding',
    tagline: 'Opulent cascading blooms, bespoke ceremony arches, and gilded table runners',
    startingPrice: 6500,
    currency: 'USD',
    description: 'An ethereal celebration designed for grand ballroom or chateau weddings. Featuring lush garden roses, imported French ranunculus, cascading cascading hydrangeas, and scented white peonies with vintage brass candelabras.',
    inclusions: [
      'Monumental Moon-Gate Floral Arch for ceremony',
      'Grand Bridal Cascade Bouquet & 6 Bridesmaid Bouquets',
      '10-18 Luxe Elevated Floral Centerpieces',
      'Petal-strewn aisle runner with hurricane glass candles',
      'Head table floral garland with micro-fairy fairy lighting',
      'Full installation, strike, and post-event donation service'
    ],
    bestFor: 'Grand Weddings & Regal Ballroom Celebrations (150-300+ guests)',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    badge: 'Most Popular',
    isFeatured: true
  },
  {
    _id: 'pkg_wedding_provence',
    title: 'Provence Whispering Meadow',
    slug: 'provence-whispering-meadow',
    category: 'Wedding',
    tagline: 'Organic garden romance with wild eucalyptus, blush peonies, and terracotta accents',
    startingPrice: 4200,
    currency: 'USD',
    description: 'Soft, airy, and effortlessly graceful. Organic floral shapes that look freshly gathered from a French countryside manor. Pale blush, sage foliage, cream lisianthus, and delicate sweet peas.',
    inclusions: [
      'Deconstructed asymmetrical floral pillars',
      'Hand-tied organic bridal bouquet with silk ribbon',
      '8 Low lush compote centerpiece bowls',
      'Boutonnieres and corsages for close family',
      'Floral welcome sign & cake flower styling'
    ],
    bestFor: 'Vineyard, Garden, and Intimate Estate Weddings',
    imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    badge: 'Romantic Favorite',
    isFeatured: true
  },
  {
    _id: 'pkg_birthday_parisian',
    title: 'Parisian Salon Soirée',
    slug: 'parisian-salon-soiree',
    category: 'Birthday',
    tagline: 'Chic pastels, modern cloud arrangements, and champagne cart florals',
    startingPrice: 1850,
    currency: 'USD',
    description: 'A birthday designed like an haute couture celebration. Floating floral clouds, pastel garden roses, baby breath cascades, and a bespoke photo backdrop for unforgettable memories.',
    inclusions: [
      'Organic floral backdrop frame with custom neon name plaque',
      'Champagne bar floral garland',
      '4 Statement cocktail table arrangements',
      'Floral crown or birthday girl bouquet accent'
    ],
    bestFor: 'Milestone Birthdays (21st, 30th, 50th) & Chic Brunches',
    imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80',
    badge: 'Trending',
    isFeatured: true
  },
  {
    _id: 'pkg_engagement_candlelight',
    title: 'Starlit Candlelight Proposal & Soirée',
    slug: 'starlit-candlelight-proposal',
    category: 'Engagement',
    tagline: '500 flickering candles, a rose-petal labyrinth, and heart floral ring',
    startingPrice: 2400,
    currency: 'USD',
    description: 'Breathtaking romance crafted for that unforgettable "Yes". An opulent circle of deep burgundy and blush garden roses surrounded by illuminated pillar candles and bespoke champagne styling.',
    inclusions: [
      'Luxe circular floral nest with over 400 roses',
      'Hundreds of safe LED & glass hurricane candles',
      'Chilled champagne bucket floral ring',
      'Secret coordination with proposal photographer'
    ],
    bestFor: 'Proposals, Engagement Parties & Rooftop Soirées',
    imageUrl: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80',
    badge: 'Signature',
    isFeatured: true
  },
  {
    _id: 'pkg_anniversary_gilded',
    title: 'Gilded Golden Blossom Affair',
    slug: 'gilded-golden-blossom',
    category: 'Anniversary',
    tagline: 'Timeless floral grace honoring milestone years of enduring love',
    startingPrice: 3200,
    currency: 'USD',
    description: 'Honoring enduring vows with gilded foliage, ivory calla lilies, blush garden roses, and warm amber candlelight. Crafted for vow renewals and commemorative dinners.',
    inclusions: [
      'Intimate vow renewal floral altar or table focal point',
      'Signature anniversary floral centerpiece with gold leafing',
      'Commemorative dried botanical keepsake frame',
      'Lapel florals & commemorative bouquet'
    ],
    bestFor: 'Silver (25th), Golden (50th) & Milestone Anniversaries',
    imageUrl: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80',
    badge: 'Timeless',
    isFeatured: false
  },
  {
    _id: 'pkg_bespoke_couture',
    title: 'Bespoke Atelier Celebration',
    slug: 'bespoke-atelier-celebration',
    category: 'Bespoke Celebration',
    tagline: 'Custom botanical installations, suspended floral ceilings & runway florals',
    startingPrice: 8500,
    currency: 'USD',
    description: 'Your wildest floral dreams brought to life by master floral sculptors. From suspended ceiling hanging gardens to floral fountains and runway tablescapes.',
    inclusions: [
      'Dedicated lead floral architect & private consultation',
      'Full 3D mood boards and floral sample tasting',
      'Suspended installations or architectural botanical framing',
      'Unlimited bespoke customization and on-site floral team'
    ],
    bestFor: 'Luxury Galas, Fashion Shows & Couture Celebrations',
    imageUrl: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
    badge: 'Couture',
    isFeatured: true
  }
];

const mockFloralThemes = [
  {
    _id: 'theme_romantic_blush',
    name: 'Romantic Blush & Whisper Sage',
    slug: 'romantic-blush-whisper-sage',
    style: 'Parisian Elegance',
    palette: {
      primary: '#DDA6B2',
      secondary: '#A7B9A0',
      accent: '#F8F1EC',
      swatches: ['#F8F1EC', '#DDA6B2', '#A7B9A0', '#E8D9C5', '#754D58']
    },
    signatureFlowers: ['Sarah Bernhardt Peonies', 'David Austin Garden Roses', 'White Ranunculus', 'Silver Dollar Eucalyptus', 'Sweet Peas'],
    season: 'Spring / Summer',
    moodDescription: 'Soft, airy, poetically feminine. Evokes a stroll through Monet’s garden at Giverny at dawn with dewy blush petals and silvery sage greens.',
    heroImage: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80'
    ],
    recommendedEventTypes: ['Wedding', 'Engagement', 'Anniversary']
  },
  {
    _id: 'theme_berry_opulence',
    name: 'Midnight Berry & Velvet Dahlia',
    slug: 'midnight-berry-velvet-dahlia',
    style: 'Opulent Royalty',
    palette: {
      primary: '#754D58',
      secondary: '#E8D9C5',
      accent: '#CBB26B',
      swatches: ['#432630', '#754D58', '#955F6E', '#CBB26B', '#F8F1EC']
    },
    signatureFlowers: ['Black Baccara Roses', 'Burgundy Café au Lait Dahlias', 'Purple Calla Lilies', 'Dark Chocolate Cosmos', 'Italian Plum foliage'],
    season: 'Autumn / Winter',
    moodDescription: 'Dramatic, seductive, and regal. Rich berry hues meet deep wine velvets and brushed antique gold for atmospheric evening banquets.',
    heroImage: 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507290439931-a861b5a38200?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80'
    ],
    recommendedEventTypes: ['Wedding', 'Anniversary', 'Gala']
  },
  {
    _id: 'theme_tuscan_terracotta',
    name: 'Tuscan Sunset & Warm Sand',
    slug: 'tuscan-sunset-warm-sand',
    style: 'Romantic Rustic',
    palette: {
      primary: '#E8D9C5',
      secondary: '#A7B9A0',
      accent: '#DDA6B2',
      swatches: ['#E8D9C5', '#D8C3A8', '#C7AC8B', '#A7B9A0', '#F8F1EC']
    },
    signatureFlowers: ['Toffee Roses', 'Cappuccino Garden Roses', 'Dried Pampas Plumes', 'Bleached Ruscus', 'Olive Branches'],
    season: 'All Seasons',
    moodDescription: 'Earthy warmth and understated sun-drenched romance. Perfect for rustic barn weddings, al fresco courtyard dinners, and organic bohemian aesthetics.',
    heroImage: 'https://images.unsplash.com/photo-1545232979-fbf68fe9f10d?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80'
    ],
    recommendedEventTypes: ['Wedding', 'Engagement', 'Birthday']
  },
  {
    _id: 'theme_ivory_minimalist',
    name: 'Eternal Ivory & Architectural Greens',
    slug: 'eternal-ivory-architectural-greens',
    style: 'Modern Minimalist',
    palette: {
      primary: '#F8F1EC',
      secondary: '#6E8267',
      accent: '#A7B9A0',
      swatches: ['#FFFFFF', '#F8F1EC', '#CCDCC8', '#6E8267', '#2E382B']
    },
    signatureFlowers: ['White Phalaenopsis Orchids', 'Snow White Delphinium', 'Monstera & Monstera foliage', 'White Tulips', 'Asparagus Fern'],
    season: 'Year-Round',
    moodDescription: 'Crisp, contemporary, sculpted purity. Focuses on singular botanical shapes, transparent glass vessels, and sleek architectural elegance.',
    heroImage: 'https://images.unsplash.com/photo-1533616688419-b7a585564566?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80'
    ],
    recommendedEventTypes: ['Wedding', 'Milestone Birthday', 'Corporate Gala']
  }
];

const mockTestimonials = [
  {
    _id: 'test_1',
    author: 'Genevieve & Liam Thorne',
    celebration: 'Fairytale Chateau Wedding',
    eventDate: 'September 14, 2025',
    venue: 'The Biltmore Conservatory',
    quote: 'Petal & Promise turned our wedding into a living dream. When I stepped into the ceremony hall and saw the cascading blush peonies and whispering sage arch, I burst into happy tears. It was pure poetry.',
    rating: 5,
    featuredTheme: 'The Versailles Grand Romance',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    isFeatured: true
  },
  {
    _id: 'test_2',
    author: 'Clara Delacroix',
    celebration: '30th Milestone Birthday Soirée',
    eventDate: 'August 02, 2025',
    venue: 'Hôtel Particulier Garden',
    quote: 'The floral clouds and champagne cart arrangements left all my guests speechless! The team’s attention to fragrance, flower freshness, and color harmony is unrivaled.',
    rating: 5,
    featuredTheme: 'Parisian Salon Soirée',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    isFeatured: true
  },
  {
    _id: 'test_3',
    author: 'Julian & Marcus Vance',
    celebration: 'Candlelight Engagement',
    eventDate: 'October 19, 2025',
    venue: 'Cliffside Panorama Terrace',
    quote: 'The 500 candles and massive rose-petal ring created the most cinematic moment of our lives. He said yes before I even finished the question! Seamless planning and flawless execution.',
    rating: 5,
    featuredTheme: 'Starlit Candlelight Proposal',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
    isFeatured: true
  }
];

const mockBookings = [
  {
    _id: 'book_001',
    bookingReference: 'PP-782910',
    userId: 'client_demo_1',
    clientName: 'Elena Rostova',
    clientEmail: 'client@petalandpromise.com',
    clientPhone: '+1 (555) 392-8172',
    eventType: 'Wedding',
    eventDate: '2026-11-14',
    eventTime: '16:30',
    venue: {
      name: 'St. Regis Rose Ballroom',
      city: 'San Francisco, CA',
      isOutdoor: false
    },
    guestCount: 160,
    budget: {
      total: 7200,
      currency: 'USD',
      tier: 'Grand Luxe'
    },
    theme: {
      name: 'Romantic Blush & Whisper Sage',
      palette: ['#F8F1EC', '#DDA6B2', '#A7B9A0', '#E8D9C5', '#754D58'],
      vibe: 'Ethereal, candlelit, romantic elegance'
    },
    packageId: 'pkg_wedding_versailles',
    packageName: 'The Versailles Grand Romance',
    flowerPreferences: {
      primaryFlowers: ['Sarah Bernhardt Peonies', 'David Austin Garden Roses', 'White Ranunculus'],
      scentLevel: 'Moderate',
      colorDominance: 'Blush pink & Ivory with Sage greens',
      foliageChoice: ['Silver Dollar Eucalyptus', 'Italian Ruscus']
    },
    arrangements: {
      ceremonyArch: true,
      aisleFlowers: true,
      bridalBouquet: true,
      bridesmaidsBouquets: 5,
      centerpiecesCount: 16,
      hangingFlorals: true,
      cakeFlowers: true
    },
    inspirationImages: [
      {
        url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
        caption: 'Desired altar arch density'
      }
    ],
    specialNotes: 'Bride is fond of English peonies and wants candlelit lanterns on the aisle steps.',
    status: 'Confirmed',
    adminNotes: 'Initial deposit verified. Floral supplier reserved for November blooms.',
    timeline: [
      { stage: 'Booking Request Submitted', date: new Date('2026-10-10'), note: 'Booking received online', completed: true },
      { stage: 'Consultation & Mood Board Approved', date: new Date('2026-10-15'), note: 'Design palette locked', completed: true },
      { stage: 'Floral Sourcing & Artistry Prep', date: new Date('2026-11-01'), note: 'Seasonal flowers ordered', completed: false },
      { stage: 'On-Site Setup & Ceremony Perfection', date: new Date('2026-11-14'), note: 'Delivery & strike', completed: false }
    ],
    pabblySynced: true,
    lastPabblyEventId: 'evt_pabbly_init_001',
    createdAt: new Date('2026-10-10'),
    updatedAt: new Date('2026-10-15')
  },
  {
    _id: 'book_002',
    bookingReference: 'PP-943012',
    userId: 'client_demo_2',
    clientName: 'Chloe Bennett',
    clientEmail: 'chloe.bennett@example.com',
    clientPhone: '+1 (555) 829-1928',
    eventType: 'Birthday',
    eventDate: '2026-12-05',
    eventTime: '19:00',
    venue: {
      name: 'The Glass House Penthouse',
      city: 'New York, NY',
      isOutdoor: false
    },
    guestCount: 65,
    budget: {
      total: 2800,
      currency: 'USD',
      tier: 'Elegance'
    },
    theme: {
      name: 'Parisian Salon Soirée',
      palette: ['#F8F1EC', '#DDA6B2', '#754D58'],
      vibe: 'Modern chic birthday celebration'
    },
    packageId: 'pkg_birthday_parisian',
    packageName: 'Parisian Salon Soirée',
    flowerPreferences: {
      primaryFlowers: ['Blush Roses', 'Cotton candy hydrangeas', 'Baby breath clouds'],
      scentLevel: 'Subtle',
      colorDominance: 'Dusty rose and champagne gold',
      foliageChoice: ['Gold brushed ruscus']
    },
    arrangements: {
      ceremonyArch: false,
      aisleFlowers: false,
      bridalBouquet: false,
      bridesmaidsBouquets: 0,
      centerpiecesCount: 6,
      hangingFlorals: true,
      cakeFlowers: true
    },
    inspirationImages: [],
    specialNotes: 'Photo wall needs space for custom LED neon "Forever 30".',
    status: 'Pending',
    adminNotes: 'Awaiting customer response regarding champagne cart dimensions.',
    timeline: [
      { stage: 'Booking Request Submitted', date: new Date('2026-10-22'), note: 'Booking received', completed: true },
      { stage: 'Review & Deposit Approval', date: new Date('2026-10-23'), note: 'Under review by director', completed: false }
    ],
    pabblySynced: true,
    lastPabblyEventId: 'evt_pabbly_init_002',
    createdAt: new Date('2026-10-22'),
    updatedAt: new Date('2026-10-22')
  }
];

const mockEnquiries = [
  {
    _id: 'enq_001',
    name: 'Sophia Sterling',
    email: 'sophia.sterling@example.com',
    phone: '+1 (555) 234-5678',
    eventType: 'Wedding',
    estimatedDate: 'June 2027',
    estimatedGuests: '180',
    estimatedBudget: '$8,000 - $12,000',
    message: 'Hello! We are planning a 2-day wedding celebration in Napa Valley and would love to know if your team travels for destination floral design. We are obsessed with your blush peony installations!',
    status: 'New',
    adminNotes: '',
    pabblySynced: true,
    createdAt: new Date('2026-10-24T14:30:00Z')
  },
  {
    _id: 'enq_002',
    name: 'Harrison Reed',
    email: 'harrison.reed@example.com',
    phone: '+1 (555) 876-5432',
    eventType: 'Engagement',
    estimatedDate: 'December 2026',
    estimatedGuests: '2 (Surprise Proposal)',
    estimatedBudget: '$2,500 - $3,500',
    message: 'Looking to organize an unforgettable surprise proposal on a private cliffside overlooking the ocean. Need candlelight and hundreds of red and blush roses.',
    status: 'Contacted',
    adminNotes: 'Spoke on the phone; sent proposal options.',
    pabblySynced: true,
    createdAt: new Date('2026-10-20T10:15:00Z')
  }
];

const mockConsultations = [
  {
    _id: 'cons_001',
    userId: 'client_demo_1',
    clientName: 'Elena Rostova',
    clientEmail: 'client@petalandpromise.com',
    clientPhone: '+1 (555) 392-8172',
    preferredDate: '2026-10-28',
    preferredTime: '15:00',
    consultationType: 'Virtual Video Call',
    eventType: 'Wedding',
    notes: 'Reviewing flower palette swatches and centerpiece mockups.',
    status: 'Scheduled',
    meetingLink: 'https://meet.google.com/pp-rose-design',
    pabblySynced: true,
    createdAt: new Date('2026-10-18')
  }
];

const mockOutboxEvents = [
  {
    _id: 'evt_pabbly_demo_01',
    eventId: 'evt_b82a9f110c',
    eventType: 'booking.created',
    idempotencyKey: 'idemp_booking_book_001',
    payload: {
      bookingReference: 'PP-782910',
      clientName: 'Elena Rostova',
      clientEmail: 'client@petalandpromise.com',
      eventType: 'Wedding',
      eventDate: '2026-11-14',
      budget: 7200,
      status: 'Confirmed'
    },
    status: 'dispatched',
    attempts: 1,
    lastAttemptAt: new Date('2026-10-10T11:00:00Z'),
    webhookUrl: 'https://connect.pabbly.com/workflow/sendwebhookdata/demo_endpoint_1',
    responseStatus: 200,
    responseBody: '{"status":"success","message":"Pabbly received booking and appended to Google Sheets"}'
  },
  {
    _id: 'evt_pabbly_demo_02',
    eventId: 'evt_c93b1a221d',
    eventType: 'enquiry.created',
    idempotencyKey: 'idemp_enquiry_enq_001',
    payload: {
      name: 'Sophia Sterling',
      email: 'sophia.sterling@example.com',
      eventType: 'Wedding',
      estimatedBudget: '$8,000 - $12,000'
    },
    status: 'dispatched',
    attempts: 1,
    lastAttemptAt: new Date('2026-10-24T14:31:00Z'),
    webhookUrl: 'https://connect.pabbly.com/workflow/sendwebhookdata/demo_endpoint_2',
    responseStatus: 200,
    responseBody: '{"status":"success","message":"Pabbly triggered acknowledgement email via Gmail"}'
  }
];

class MemoryStore {
  constructor() {
    this.packages = [...mockPackages];
    this.themes = [...mockFloralThemes];
    this.testimonials = [...mockTestimonials];
    this.bookings = [...mockBookings];
    this.enquiries = [...mockEnquiries];
    this.consultations = [...mockConsultations];
    this.outboxEvents = [...mockOutboxEvents];
  }

  // Bookings
  getBookings(query = {}) {
    let list = [...this.bookings];
    if (query.userId) {
      list = list.filter(b => b.userId === query.userId);
    }
    if (query.status && query.status !== 'All') {
      list = list.filter(b => b.status.toLowerCase() === query.status.toLowerCase());
    }
    if (query.eventType && query.eventType !== 'All') {
      list = list.filter(b => b.eventType === query.eventType);
    }
    if (query.search) {
      const q = query.search.toLowerCase();
      list = list.filter(b => 
        (b.clientName && b.clientName.toLowerCase().includes(q)) ||
        (b.clientEmail && b.clientEmail.toLowerCase().includes(q)) ||
        (b.bookingReference && b.bookingReference.toLowerCase().includes(q)) ||
        (b.packageName && b.packageName.toLowerCase().includes(q))
      );
    }
    return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  getBookingById(id) {
    return this.bookings.find(b => b._id === id || b.bookingReference === id);
  }

  createBooking(data) {
    const newBooking = {
      _id: 'book_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 5),
      bookingReference: 'PP-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'Pending',
      timeline: [
        { stage: 'Booking Request Submitted', date: new Date(), note: 'Awaiting design team review', completed: true },
        { stage: 'Consultation & Mood Board', date: null, note: 'Schedule your custom floral tasting', completed: false },
        { stage: 'Floral Sourcing & Artistry Prep', date: null, note: 'Reserving seasonal harvest', completed: false },
        { stage: 'Delivery & Event Perfection', date: null, note: 'On-site installation and styling', completed: false }
      ],
      ...data
    };
    this.bookings.unshift(newBooking);
    return newBooking;
  }

  updateBooking(id, updates) {
    const index = this.bookings.findIndex(b => b._id === id || b.bookingReference === id);
    if (index === -1) return null;
    this.bookings[index] = {
      ...this.bookings[index],
      ...updates,
      updatedAt: new Date()
    };
    return this.bookings[index];
  }

  deleteBooking(id) {
    const index = this.bookings.findIndex(b => b._id === id);
    if (index === -1) return false;
    this.bookings.splice(index, 1);
    return true;
  }

  // Enquiries
  getEnquiries(status = null) {
    let list = [...this.enquiries];
    if (status && status !== 'All') {
      list = list.filter(e => e.status.toLowerCase() === status.toLowerCase());
    }
    return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  createEnquiry(data) {
    const newEnquiry = {
      _id: 'enq_' + Date.now().toString(36),
      status: 'New',
      createdAt: new Date(),
      ...data
    };
    this.enquiries.unshift(newEnquiry);
    return newEnquiry;
  }

  updateEnquiry(id, updates) {
    const item = this.enquiries.find(e => e._id === id);
    if (!item) return null;
    Object.assign(item, updates);
    return item;
  }

  // Consultations
  getConsultations(userId = null) {
    let list = [...this.consultations];
    if (userId) {
      list = list.filter(c => c.userId === userId);
    }
    return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  createConsultation(data) {
    const newConsultation = {
      _id: 'cons_' + Date.now().toString(36),
      status: 'Scheduled',
      createdAt: new Date(),
      meetingLink: 'https://meet.google.com/pp-rose-design',
      ...data
    };
    this.consultations.unshift(newConsultation);
    return newConsultation;
  }

  updateConsultation(id, updates) {
    const item = this.consultations.find(c => c._id === id);
    if (!item) return null;
    Object.assign(item, updates);
    return item;
  }

  // Packages & Themes
  getPackages(category = null) {
    if (category && category !== 'All') {
      return this.packages.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    return this.packages;
  }

  createPackage(data) {
    const pkg = {
      _id: 'pkg_' + Date.now().toString(36),
      slug: data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      ...data
    };
    this.packages.push(pkg);
    return pkg;
  }

  updatePackage(id, updates) {
    const item = this.packages.find(p => p._id === id || p.slug === id);
    if (!item) return null;
    Object.assign(item, updates);
    return item;
  }

  deletePackage(id) {
    const index = this.packages.findIndex(p => p._id === id);
    if (index === -1) return false;
    this.packages.splice(index, 1);
    return true;
  }

  getThemes() {
    return this.themes;
  }

  createTheme(data) {
    const theme = {
      _id: 'theme_' + Date.now().toString(36),
      slug: data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      ...data
    };
    this.themes.push(theme);
    return theme;
  }

  getTestimonials() {
    return this.testimonials;
  }

  createTestimonial(data) {
    const t = {
      _id: 'test_' + Date.now().toString(36),
      ...data
    };
    this.testimonials.unshift(t);
    return t;
  }

  // Outbox
  recordOutboxEvent(event) {
    const item = {
      _id: 'evt_' + Date.now().toString(36),
      createdAt: new Date(),
      attempts: 0,
      ...event
    };
    this.outboxEvents.unshift(item);
    return item;
  }

  getOutboxEvents(limit = 50) {
    return this.outboxEvents.slice(0, limit);
  }

  updateOutboxEvent(eventId, updates) {
    const item = this.outboxEvents.find(e => e.eventId === eventId);
    if (!item) return null;
    Object.assign(item, updates);
    return item;
  }
}

const mockStore = new MemoryStore();
module.exports = mockStore;
