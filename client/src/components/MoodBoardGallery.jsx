import React, { useState } from 'react';
import { Eye, Heart, Sparkles, X, Check } from 'lucide-react';

const galleryItems = [
  {
    id: 1,
    category: 'Ceremony Arches',
    title: 'Versailles Moon-Gate Floral Arch',
    venue: 'San Francisco Conservatory of Flowers',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
    tags: ['Peonies', 'Blush', 'Grand Romance']
  },
  {
    id: 2,
    category: 'Tablescapes',
    title: 'Monet Garden Banqueting Tablescape',
    venue: 'Napa Valley Vineyard Estate',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80',
    tags: ['Garden Roses', 'Sage', 'Candles']
  },
  {
    id: 3,
    category: 'Bridal Bouquets',
    title: 'French Silk-Tied Peony Cascade',
    venue: 'Private Chateau, Carmel-by-the-Sea',
    image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1000&q=80',
    tags: ['French Ranunculus', 'Sweet Pea', 'Ribbons']
  },
  {
    id: 4,
    category: 'Candlelight',
    title: '500-Candle Rooftop Proposal Labyrinth',
    venue: 'Malibu Ocean Terrace',
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1000&q=80',
    tags: ['Burgundy Roses', 'Pillar Candles', 'Luxe']
  },
  {
    id: 5,
    category: 'Ceremony Arches',
    title: 'Deconstructed Meadow Arch Pillars',
    venue: 'Ojai Valley Inn Meadow',
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1000&q=80',
    tags: ['Toffee Roses', 'Pampas', 'Bohemian']
  },
  {
    id: 6,
    category: 'Tablescapes',
    title: 'Parisian Cloud & Champagne Bar',
    venue: 'Tribeca Penthouse Loft',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1000&q=80',
    tags: ['Baby Breath Cloud', 'Pastels', 'Birthday']
  }
];

export default function MoodBoardGallery() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeModalItem, setActiveModalItem] = useState(null);
  const [savedFavorites, setSavedFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('pp_inspiration_favorites') || '[]');
    } catch {
      return [];
    }
  });

  const filters = ['All', 'Ceremony Arches', 'Tablescapes', 'Bridal Bouquets', 'Candlelight'];

  const filteredItems = activeFilter === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  const toggleFavorite = (item, e) => {
    e.stopPropagation();
    let updated;
    if (savedFavorites.includes(item.id)) {
      updated = savedFavorites.filter(id => id !== item.id);
    } else {
      updated = [...savedFavorites, item.id];
    }
    setSavedFavorites(updated);
    localStorage.setItem('pp_inspiration_favorites', JSON.stringify(updated));
  };

  return (
    <section id="gallery" className="py-24 relative bg-heavenly-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sand-200 text-berry-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blush-500" />
            <span>Living Inspiration Board</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-berry-700 leading-tight">
            Celebration Mood Gallery
          </h2>
          <p className="font-cormorant text-xl text-berry-500 mt-3 italic">
            "A visual tapestry of arches, candlelit corridors, and fragrant bouquets crafted for extraordinary moments."
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                activeFilter === f
                  ? 'bg-berry-600 text-ivory shadow-romantic'
                  : 'bg-white/80 text-berry-600 hover:bg-blush-50 border border-blush/20'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredItems.map((item) => {
            const isSaved = savedFavorites.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => setActiveModalItem(item)}
                className="group relative rounded-3xl overflow-hidden aspect-[4/5] bg-sand-200 cursor-pointer shadow-soft hover:shadow-luxe transition-all duration-500"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-berry-900/85 via-berry-900/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                {/* Top Favorite Toggle */}
                <button
                  onClick={(e) => toggleFavorite(item, e)}
                  title={isSaved ? 'Saved to inspiration board' : 'Save to inspiration board'}
                  className={`absolute top-4 right-4 w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${
                    isSaved
                      ? 'bg-blush text-ivory shadow-glow scale-110'
                      : 'bg-white/70 text-berry-600 hover:bg-white hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                </button>

                {/* Bottom Details */}
                <div className="absolute bottom-5 left-5 right-5 text-ivory">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-blush-light">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-xl font-semibold mt-0.5 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-sand-200 mt-1">{item.venue}</p>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {item.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 rounded-full text-[10px] bg-ivory/20 backdrop-blur-sm text-ivory"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Photo Modal */}
      {activeModalItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-berry-950/70 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveModalItem(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-ivory rounded-3xl overflow-hidden shadow-luxe border border-blush/30"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-berry-900/50 backdrop-blur-md text-ivory hover:bg-berry-900 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={activeModalItem.image}
              alt={activeModalItem.title}
              className="w-full max-h-[70vh] object-cover"
            />

            <div className="p-6 bg-ivory flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-blush-600">
                  {activeModalItem.category}
                </span>
                <h3 className="font-serif text-2xl font-semibold text-berry-700">
                  {activeModalItem.title}
                </h3>
                <p className="text-xs text-berry-500 mt-1">{activeModalItem.venue}</p>
              </div>

              <button
                onClick={(e) => toggleFavorite(activeModalItem, e)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all shadow-soft ${
                  savedFavorites.includes(activeModalItem.id)
                    ? 'bg-blush text-berry-800'
                    : 'bg-berry-600 text-ivory hover:bg-berry-700'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${savedFavorites.includes(activeModalItem.id) ? 'fill-current' : ''}`} />
                <span>{savedFavorites.includes(activeModalItem.id) ? 'Saved' : 'Save to Board'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
