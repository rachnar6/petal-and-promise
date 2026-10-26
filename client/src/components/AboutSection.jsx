import React from 'react';
import { Flower2, Sparkles, HeartHandshake, ShieldCheck, Leaf, ArrowRight } from 'lucide-react';

export default function AboutSection({ onOpenConsultation }) {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-ivory-100">
      <div className="w-full mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Collage Images */}
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 rounded-3xl overflow-hidden aspect-[4/5] shadow-luxe border border-blush-300/40">
              <img
                src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1000&q=80"
                alt="Master floral arranging"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Overlapping small accent card */}
            <div className="absolute -bottom-8 -right-6 z-20 w-64 bg-ivory-50/90 backdrop-blur-md p-5 rounded-2xl shadow-romantic border border-blush-300/40 hidden sm:block animate-float-slow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blush-100 flex items-center justify-center text-blush-600">
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-serif font-bold text-berry-600">100% Sustainable</p>
                  <p className="text-[10px] text-berry-400">Foam-free, locally harvested stems</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Text Story */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blush-100/40 text-berry-600 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-blush-500" />
              <span>Our Atelier Philosophy</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-berry-600 leading-tight">
              Crafting Living Poetry for Eternal Promises
            </h2>

            <p className="text-sm sm:text-base text-berry-600 leading-relaxed">
              At <strong>Petal & Promise</strong>, we believe flowers are not mere decorations — they are living emotional conduits. From the initial whispered vow under a moon-gate arch of fragrant English peonies to the glowing candlelight of a milestone birthday banquet, our floral architecture is designed to stir the soul.
            </p>

            <p className="text-sm sm:text-base text-berry-600 leading-relaxed">
              Founded by master botanical designers, our studio combines haute couture floral curation with modern digital event tracking. With automated confirmations, real-time schedule tracking, and seamless consultation appointments, planning your dream celebration is an effortless romance.
            </p>

            {/* 3 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-sand-300/70">
              <div className="space-y-1">
                <span className="font-serif text-2xl font-bold text-blush-600">500+</span>
                <p className="text-xs font-semibold text-berry-600">Celebrations Styled</p>
                <p className="text-[11px] text-berry-400">Weddings, galas & proposals</p>
              </div>

              <div className="space-y-1">
                <span className="font-serif text-2xl font-bold text-sage-600">40+</span>
                <p className="text-xs font-semibold text-berry-600">Artisan Bloom Growers</p>
                <p className="text-[11px] text-berry-400">Direct regenerative farms</p>
              </div>

              <div className="space-y-1">
                <span className="font-serif text-2xl font-bold text-berry-600">100%</span>
                <p className="text-xs font-semibold text-berry-600">Bespoke Design</p>
                <p className="text-[11px] text-berry-400">Personalized mood boards</p>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onOpenConsultation}
                className="py-3 px-7 rounded-full text-xs font-semibold uppercase tracking-wider text-ivory bg-berry-500 hover:bg-berry-600 shadow-romantic transition-all duration-300 inline-flex items-center gap-2 group"
              >
                <span>Reserve a Design Session</span>
                <ArrowRight className="w-4 h-4 text-blush transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
