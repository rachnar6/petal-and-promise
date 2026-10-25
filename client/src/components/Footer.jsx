import React, { useState } from 'react';
import { Flower2, Heart, Instagram, Facebook, Send, Sparkles } from 'lucide-react';

export default function Footer({ onOpenConsultation }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-berry-900 text-ivory/80 pt-20 pb-12 border-t border-berry-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-berry-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blush flex items-center justify-center text-berry-900 shadow-romantic">
                <Flower2 className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-bold text-ivory tracking-wide">
                Petal <span className="font-script text-3xl text-blush font-normal">&</span> Promise
              </span>
            </div>

            <p className="text-xs sm:text-sm text-sand-200 leading-relaxed max-w-sm">
              Artisanal floral architecture and bespoke event curation. Transforming wedding vows, milestone birthdays, and candlelit proposals into living botanical masterpieces.
            </p>

            <div className="pt-2 text-xs text-blush flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sustainable, foam-free floral curation</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-sand-300">Celebrations</p>
            <ul className="space-y-2 text-xs">
              <li><a href="#packages" className="hover:text-blush transition-colors">Weddings & Galas</a></li>
              <li><a href="#packages" className="hover:text-blush transition-colors">Milestone Birthdays</a></li>
              <li><a href="#packages" className="hover:text-blush transition-colors">Candlelight Proposals</a></li>
              <li><a href="#packages" className="hover:text-blush transition-colors">Vow Renewals</a></li>
              <li><a href="#packages" className="hover:text-blush transition-colors">Bespoke Atelier Design</a></li>
            </ul>
          </div>

          {/* Studio Experience */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-sand-300">Studio</p>
            <ul className="space-y-2 text-xs">
              <li><a href="#studio" className="hover:text-blush transition-colors">Floral Theme Studio</a></li>
              <li><a href="#planner" className="hover:text-blush transition-colors">Budget Calculator</a></li>
              <li><a href="#gallery" className="hover:text-blush transition-colors">Mood Board Gallery</a></li>
              <li><button onClick={onOpenConsultation} className="hover:text-blush transition-colors text-left">Book Floral Tasting</button></li>
              <li><a href="#contact" className="hover:text-blush transition-colors">Private Concierge</a></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-4 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-sand-300">The Bloom Gazette</p>
            <p className="text-xs text-sand-200">
              Receive seasonal floral harvest guides, wedding color trends, and private atelier invitations.
            </p>

            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-2.5 rounded-full bg-berry-800/80 border border-berry-700 text-xs text-ivory placeholder-sand-300/60 focus:outline-none focus:border-blush"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full bg-blush text-berry-900 text-xs font-semibold uppercase tracking-wider hover:bg-blush-light transition-colors flex items-center gap-1.5"
              >
                <span>Join</span>
                <Send className="w-3 h-3" />
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-sage-400 font-medium">
                🌸 Merci! You are subscribed to our private harvest letters.
              </p>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-sand-400 gap-4">
          <p>© {new Date().getFullYear()} Petal & Promise Atelier Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs">
            <span>Powered by Pabbly Connect & Firebase</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              Crafted with <Heart className="w-3 h-3 text-blush fill-current" /> for lovers of beauty
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
