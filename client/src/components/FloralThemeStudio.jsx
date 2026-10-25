import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Palette, Sparkles, Flower2, Heart, Check, ArrowRight, Eye, Wind } from 'lucide-react';

const studioThemes = [
  {
    id: 'paris-elegance',
    name: 'Romantic Blush & Whisper Sage',
    style: 'Parisian Elegance',
    vibe: 'Dewy morning blooms, soft petal ruffles, and airy silver foliage',
    palette: [
      { name: 'Ivory Pearl', hex: '#F8F1EC' },
      { name: 'Ballet Blush', hex: '#DDA6B2' },
      { name: 'Eucalyptus Sage', hex: '#A7B9A0' },
      { name: 'Rosewood Berry', hex: '#754D58' },
      { name: 'Warm Sand', hex: '#E8D9C5' }
    ],
    flowers: [
      { name: 'Sarah Bernhardt Peonies', scent: 'Subtle Rose & Powder', season: 'Spring / Summer', image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80' },
      { name: 'David Austin Garden Roses', scent: 'Rich Fruity Floral', season: 'Year-Round', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80' },
      { name: 'White French Ranunculus', scent: 'Delicate Green', season: 'Autumn / Spring', image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=80' },
      { name: 'Silver Dollar Eucalyptus', scent: 'Crisp Herbal Pine', season: 'Year-Round', image: 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&w=600&q=80' }
    ],
    previewImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
    bestFor: 'Grand Weddings, Garden Engagements, Vow Renewals'
  },
  {
    id: 'midnight-royalty',
    name: 'Midnight Berry & Velvet Dahlia',
    style: 'Opulent Royalty',
    vibe: 'Dramatic, seductive candlelit banquets draped in wine velvets and brushed gold',
    palette: [
      { name: 'Black Plum', hex: '#432630' },
      { name: 'Velvet Berry', hex: '#754D58' },
      { name: 'Antique Gold', hex: '#CBB26B' },
      { name: 'Warm Sand', hex: '#E8D9C5' },
      { name: 'Alabaster', hex: '#F8F1EC' }
    ],
    flowers: [
      { name: 'Burgundy Café au Lait Dahlia', scent: 'Earthy Sweetness', season: 'Late Summer / Autumn', image: 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&w=600&q=80' },
      { name: 'Black Baccara Roses', scent: 'Intense Velvet Scent', season: 'Year-Round', image: 'https://images.unsplash.com/photo-1507290439931-a861b5a38200?auto=format&fit=crop&w=600&q=80' },
      { name: 'Deep Wine Calla Lilies', scent: 'Subtle Spice', season: 'Year-Round', image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80' },
      { name: 'Italian Plum Foliage', scent: 'Woody Autumnal', season: 'Autumn', image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80' }
    ],
    previewImage: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1000&q=80',
    bestFor: 'Winter Galas, Evening Weddings, Milestone Anniversaries'
  },
  {
    id: 'tuscan-sunset',
    name: 'Tuscan Sunset & Sunlit Sand',
    style: 'Romantic Rustic',
    vibe: 'Sun-drenched courtyard feasts, bleached palms, toffee roses, and warm terracotta',
    palette: [
      { name: 'Tuscan Sand', hex: '#E8D9C5' },
      { name: 'Earthy Taupe', hex: '#C7AC8B' },
      { name: 'Olive Green', hex: '#8A9F82' },
      { name: 'Soft Peach Blush', hex: '#EEC2CC' },
      { name: 'Ivory Linen', hex: '#F8F1EC' }
    ],
    flowers: [
      { name: 'Toffee & Cappuccino Roses', scent: 'Warm Honeyed Bloom', season: 'Year-Round', image: 'https://images.unsplash.com/photo-1545232979-fbf68fe9f10d?auto=format&fit=crop&w=600&q=80' },
      { name: 'Feathery Pampas Plumes', scent: 'Natural Sun-dried Grass', season: 'Summer / Autumn', image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80' },
      { name: 'Mediterranean Olive Branches', scent: 'Fresh Mediterranean Breeze', season: 'Year-Round', image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=600&q=80' },
      { name: 'Bleached Italian Ruscus', scent: 'Dry Linen', season: 'Year-Round', image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=600&q=80' }
    ],
    previewImage: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1000&q=80',
    bestFor: 'Vineyard Weddings, Bohemian Celebrations, Intimate Soirées'
  },
  {
    id: 'eternal-ivory',
    name: 'Eternal Ivory & Architectural Greens',
    style: 'Modern Minimalist',
    vibe: 'Purity, sculptural botanical silhouettes, and crystalline candle reflections',
    palette: [
      { name: 'Crisp Cloud', hex: '#FFFFFF' },
      { name: 'Ivory Silk', hex: '#F8F1EC' },
      { name: 'Frosted Sage', hex: '#CCDCC8' },
      { name: 'Forest Shadow', hex: '#4A5B45' },
      { name: 'Brushed Brass', hex: '#CBB26B' }
    ],
    flowers: [
      { name: 'White Phalaenopsis Orchids', scent: 'Pure Clean Botanical', season: 'Year-Round', image: 'https://images.unsplash.com/photo-1533616688419-b7a585564566?auto=format&fit=crop&w=600&q=80' },
      { name: 'Snow White Delphinium', scent: 'Fresh Field Whisper', season: 'Summer', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80' },
      { name: 'Long-Stem White Calla', scent: 'Light Fresh Linen', season: 'Year-Round', image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=80' },
      { name: 'Emerald Monstera Foliage', scent: 'Rainforest Mist', season: 'Year-Round', image: 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&w=600&q=80' }
    ],
    previewImage: 'https://images.unsplash.com/photo-1533616688419-b7a585564566?auto=format&fit=crop&w=1000&q=80',
    bestFor: 'Art Gallery Receptions, Chic City Weddings, High-Fashion Galas'
  }
];

export default function FloralThemeStudio() {
  const [selectedTheme, setSelectedTheme] = useState(studioThemes[0]);
  const [activeFlower, setActiveFlower] = useState(studioThemes[0].flowers[0]);
  const [copiedHex, setCopiedHex] = useState('');
  const navigate = useNavigate();

  const handleCopyColor = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(''), 2000);
  };

  const handleUseTheme = () => {
    // Navigate to event booking wizard pre-populated with this theme
    navigate('/portal/new-event', {
      state: {
        presetTheme: selectedTheme.name,
        presetVibe: selectedTheme.vibe,
        presetPalette: selectedTheme.palette.map((p) => p.hex)
      }
    });
  };

  return (
    <section id="studio" className="py-24 relative overflow-hidden bg-heavenly-gradient">
      {/* Decorative background glow circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blush/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-sage/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blush/20 text-berry-600 text-xs font-semibold uppercase tracking-wider mb-3">
            <Palette className="w-3.5 h-3.5 text-blush-500" />
            <span>Interactive Floral Atelier</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-berry-700 leading-tight">
            Floral Theme Studio
          </h2>
          <p className="font-cormorant text-xl text-berry-500 mt-3 italic">
            "Every petal tells a whispered promise. Explore couture color palettes, signature botanicals, and bespoke celebration aesthetics."
          </p>
        </div>

        {/* Theme Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-10">
          {studioThemes.map((theme) => {
            const isActive = selectedTheme.id === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => {
                  setSelectedTheme(theme);
                  setActiveFlower(theme.flowers[0]);
                }}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-2 shadow-soft ${
                  isActive
                    ? 'bg-berry-600 text-ivory shadow-luxe scale-105'
                    : 'bg-white/80 text-berry-600 hover:bg-blush-50 border border-blush/20'
                }`}
              >
                <Sparkles className={`w-3.5 h-3.5 ${isActive ? 'text-blush' : 'text-berry-400'}`} />
                <span>{theme.style}</span>
              </button>
            );
          })}
        </div>

        {/* Main Interactive Studio Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-ivory/80 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-blush/30 shadow-luxe">
          
          {/* Left: Visual Atmosphere & Photo Preview */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-romantic group">
              <img
                src={selectedTheme.previewImage}
                alt={selectedTheme.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-berry-900/80 via-berry-900/20 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-ivory">
                <span className="text-xs font-semibold uppercase tracking-widest text-blush-light">
                  {selectedTheme.style}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold mt-1">
                  {selectedTheme.name}
                </h3>
                <p className="text-xs sm:text-sm text-sand-100 mt-1 line-clamp-2">
                  {selectedTheme.vibe}
                </p>
              </div>

              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-ivory/90 backdrop-blur-md text-[11px] font-semibold text-berry-600 shadow-soft">
                🌿 {selectedTheme.bestFor.split(',')[0]}
              </div>
            </div>

            {/* Interactive Color Swatch Bar */}
            <div className="bg-white/80 rounded-2xl p-4 border border-sand-300 shadow-soft">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-berry-600 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-blush-500" />
                  <span>Curated Harmonic Palette</span>
                </span>
                {copiedHex && (
                  <span className="text-[11px] text-sage-600 font-semibold animate-pulse">
                    Copied {copiedHex}!
                  </span>
                )}
              </div>

              <div className="grid grid-cols-5 gap-2">
                {selectedTheme.palette.map((swatch) => (
                  <button
                    key={swatch.hex}
                    onClick={() => handleCopyColor(swatch.hex)}
                    title={`Click to copy ${swatch.name} (${swatch.hex})`}
                    className="group flex flex-col items-center text-center p-2 rounded-xl hover:bg-sand-50 transition-colors"
                  >
                    <div
                      className="w-9 h-9 rounded-full shadow-inner border border-black/10 group-hover:scale-110 transition-transform mb-1.5"
                      style={{ backgroundColor: swatch.hex }}
                    />
                    <span className="text-[10px] font-medium text-berry-700 truncate w-full">{swatch.name}</span>
                    <span className="text-[9px] text-berry-400 font-mono">{swatch.hex}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Signature Botanicals & Sensory Profile */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-blush-600">
                Botanical Alchemy
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-berry-700 mt-1">
                Signature Harvest & Fragrance
              </h3>
              <p className="text-xs sm:text-sm text-berry-500 mt-2">
                Our florists handpick stems at peak bloom maturity from premier regenerative growers in California, France, and Ecuador.
              </p>
            </div>

            {/* Flower Stem Cards */}
            <div className="grid grid-cols-2 gap-3">
              {selectedTheme.flowers.map((fl) => {
                const isCurrent = activeFlower?.name === fl.name;
                return (
                  <button
                    key={fl.name}
                    onClick={() => setActiveFlower(fl)}
                    className={`flex items-center gap-3 p-3 rounded-2xl border text-left transition-all ${
                      isCurrent
                        ? 'border-blush-500 bg-blush-50/90 shadow-soft scale-[1.02]'
                        : 'border-sand-300 bg-white/70 hover:bg-sand-50'
                    }`}
                  >
                    <img
                      src={fl.image}
                      alt={fl.name}
                      className="w-12 h-12 rounded-xl object-cover shadow-inner flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-serif font-semibold text-berry-700 truncate">{fl.name}</p>
                      <p className="text-[10px] text-sage-600 flex items-center gap-1 mt-0.5">
                        <Wind className="w-2.5 h-2.5" />
                        <span className="truncate">{fl.scent}</span>
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Flower Spotlight Card */}
            {activeFlower && (
              <div className="p-4 rounded-2xl bg-sand-100/80 border border-sand-300 flex items-center justify-between text-xs">
                <div>
                  <p className="text-berry-400 text-[10px] uppercase tracking-wider font-semibold">Active Highlight</p>
                  <p className="font-serif text-sm font-semibold text-berry-700">{activeFlower.name}</p>
                  <p className="text-berry-600 text-[11px] mt-0.5">
                    🌸 Scent Profile: <span className="font-medium">{activeFlower.scent}</span> | Harvest: <span className="font-medium">{activeFlower.season}</span>
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-blush/20 text-blush-600 flex items-center justify-center">
                  <Flower2 className="w-4 h-4" />
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleUseTheme}
                className="flex-1 py-3 px-6 rounded-full text-xs font-semibold uppercase tracking-wider text-ivory bg-berry-600 hover:bg-berry-700 shadow-romantic hover:shadow-luxe transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <span>Select This Theme for My Event</span>
                <ArrowRight className="w-4 h-4 text-blush transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
