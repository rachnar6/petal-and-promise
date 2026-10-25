import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Sparkles, Check, ArrowRight, Heart } from 'lucide-react';

export default function PackagesSection() {
  const [packages, setPackages] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const categories = ['All', 'Wedding', 'Birthday', 'Engagement', 'Anniversary', 'Bespoke Celebration'];

  useEffect(() => {
    fetchPackages(activeCategory);
  }, [activeCategory]);

  const fetchPackages = async (cat) => {
    try {
      setLoading(true);
      const res = await api.getPackages(cat);
      if (res.success) {
        setPackages(res.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleBookPackage = (pkg) => {
    navigate('/portal/new-event', {
      state: {
        presetPackageId: pkg._id,
        presetPackageName: pkg.title,
        presetEventType: pkg.category,
        presetBudget: pkg.startingPrice
      }
    });
  };

  return (
    <section id="packages" className="py-24 relative bg-ivory/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blush/20 text-berry-600 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blush-500" />
            <span>Curated Celebration Collections</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-berry-700 leading-tight">
            Floral Design Packages
          </h2>
          <p className="font-cormorant text-xl text-berry-500 mt-3 italic">
            "Artisanal botanical architecture thoughtfully tailored for weddings, milestone birthdays, and unforgettable romantic milestones."
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-berry-600 text-ivory shadow-romantic'
                  : 'bg-white/80 text-berry-600 hover:bg-blush-50 border border-sand-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Packages Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20 text-berry-400">
            <Sparkles className="w-6 h-6 animate-spin text-blush mr-2" />
            <span>Unveiling floral collections...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg._id || pkg.slug}
                className="group bg-white rounded-3xl overflow-hidden border border-blush/20 shadow-soft hover:shadow-luxe transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  {/* Image container */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={pkg.imageUrl}
                      alt={pkg.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-berry-900/60 to-transparent" />
                    
                    {pkg.badge && (
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-ivory/90 backdrop-blur-md text-berry-700 shadow-soft">
                        {pkg.badge}
                      </span>
                    )}

                    <div className="absolute bottom-3 left-4 right-4 text-ivory flex items-baseline justify-between">
                      <span className="text-xs uppercase tracking-widest text-sand-200 font-medium">
                        {pkg.category}
                      </span>
                      <span className="font-serif text-lg font-bold">
                        From ${pkg.startingPrice?.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-semibold text-berry-700 group-hover:text-blush-600 transition-colors">
                      {pkg.title}
                    </h3>
                    <p className="text-xs text-berry-500 mt-2 line-clamp-2">
                      {pkg.tagline || pkg.description}
                    </p>

                    {/* Inclusions */}
                    <div className="mt-5 pt-4 border-t border-sand-200">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-berry-400 mb-2.5">
                        Package Inclusions:
                      </p>
                      <ul className="space-y-2">
                        {(pkg.inclusions || []).slice(0, 4).map((inc, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-berry-600">
                            <Check className="w-3.5 h-3.5 text-sage-600 mt-0.5 flex-shrink-0" />
                            <span className="leading-tight">{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => handleBookPackage(pkg)}
                    className="w-full py-3 px-5 rounded-full text-xs font-semibold uppercase tracking-wider text-berry-700 bg-sand-100 hover:bg-berry-600 hover:text-ivory border border-sand-300 transition-all duration-300 flex items-center justify-center gap-2 group-hover:border-transparent shadow-soft"
                  >
                    <span>Reserve Package</span>
                    <ArrowRight className="w-3.5 h-3.5 text-blush" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
