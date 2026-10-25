import React, { useState, useEffect } from 'react';
import { Star, Heart, Quote, Sparkles } from 'lucide-react';
import { api } from '../services/api';

export default function LoveLetters() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    api.getTestimonials().then(res => {
      if (res.success) setTestimonials(res.data);
    }).catch(console.error);
  }, []);

  return (
    <section className="py-24 relative bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blush/20 text-berry-600 text-xs font-semibold uppercase tracking-wider mb-3">
            <Heart className="w-3.5 h-3.5 text-blush-500 fill-current" />
            <span>Love Letters & Kind Words</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-berry-700 leading-tight">
            Memories in Full Bloom
          </h2>
          <p className="font-cormorant text-xl text-berry-500 mt-3 italic">
            "Heartfelt words from couples and celebrants whose promises were framed in unforgettable botanicals."
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t._id}
              className="bg-white/80 rounded-3xl p-8 border border-blush/30 shadow-soft hover:shadow-luxe transition-all duration-300 flex flex-col justify-between relative group"
            >
              <Quote className="w-10 h-10 text-blush/30 absolute top-6 right-6 group-hover:text-blush/50 transition-colors" />

              <div>
                {/* 5 Stars */}
                <div className="flex gap-1 mb-4 text-gold">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="font-serif italic text-berry-700 text-base leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-sand-200 flex items-center gap-3">
                <img
                  src={t.avatarUrl}
                  alt={t.author}
                  className="w-12 h-12 rounded-full object-cover border border-blush/50 shadow-soft"
                />
                <div>
                  <h4 className="font-serif font-semibold text-sm text-berry-700">{t.author}</h4>
                  <p className="text-[11px] text-berry-400">{t.celebration} • {t.venue}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
