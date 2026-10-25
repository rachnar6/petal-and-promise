// Client fallback data used when the remote backend is waking up or temporarily unreachable
export const fallbackPackages = [
  {
    _id: 'pkg_wedding_versailles',
    title: 'The Versailles Grand Romance',
    slug: 'the-versailles-grand-romance',
    category: 'Wedding',
    tagline: 'Opulent cascading blooms, bespoke ceremony arches, and gilded table runners',
    startingPrice: 6500,
    currency: 'USD',
    description: 'An ethereal celebration designed for grand ballroom or chateau weddings. Featuring lush garden roses, imported French ranunculus, cascading hydrangeas, and scented white peonies with vintage brass candelabras.',
    inclusions: [
      'Monumental Moon-Gate Floral Arch for ceremony',
      'Grand Bridal Cascade Bouquet & 6 Bridesmaid Bouquets',
      '10-18 Luxe Elevated Floral Centerpieces',
      'Petal-strewn aisle runner with hurricane glass candles',
      'Head table floral garland with micro-fairy lighting',
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
      'Floral crown for the celebrant',
      'Petal-confetti celebration cones'
    ],
    bestFor: 'Milestone 21st, 30th & 50th Birthdays & Garden Parties',
    imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80',
    badge: 'Trending',
    isFeatured: true
  },
  {
    _id: 'pkg_engagement_candlelight',
    title: 'Starlit Candlelight Proposal',
    slug: 'starlit-candlelight-proposal',
    category: 'Engagement',
    tagline: '500 pillar candles, heart-shaped rose petal sanctuary, and secret planning',
    startingPrice: 1450,
    currency: 'USD',
    description: 'An intimate proposal experience engineered to take their breath away. A secluded sanctuary bathed in warm candlelight, scented velvety red and ivory garden roses, and bespoke champagne styling.',
    inclusions: [
      '500 Safe LED & Hurricane glass pillar candles',
      'Oversized heart or circular rose petal pathway',
      'Bespoke hand-tied proposal bouquet (50 long-stem garden roses)',
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

export const fallbackThemes = [
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
    signatureFlowers: ['Garden O’Hara Roses', 'Blush Peonies', 'Silver Dollar Eucalyptus', 'French Ranunculus', 'Sweet Peas'],
    season: 'Spring / Summer',
    moodDescription: 'Soft morning light through French chateau curtains. Gentle whispers of velvety pinks grounded in dusty botanical sages.',
    heroImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
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
    signatureFlowers: ['White Phalaenopsis Orchids', 'Snow White Delphinium', 'Monstera foliage', 'White Tulips', 'Asparagus Fern'],
    season: 'Year-Round',
    moodDescription: 'Crisp, contemporary, sculpted purity. Focuses on singular botanical shapes, transparent glass vessels, and sleek architectural elegance.',
    heroImage: 'https://images.unsplash.com/photo-1533616688419-b7a585564566?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80'
    ],
    recommendedEventTypes: ['Wedding', 'Milestone Birthday', 'Corporate Gala']
  }
];

export const fallbackTestimonials = [
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
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    isFeatured: true
  }
];
