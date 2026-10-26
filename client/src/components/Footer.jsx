import React, { useState } from 'react';
import { Flower2, Heart, Send, Sparkles } from 'lucide-react';

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
    <footer className="bg-berry-700 text-ivory-200/85 pt-20 pb-12 border-t border-berry-600/40">
      <div className="w-full mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-berry-600/40">

          {/* Brand */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blush-400 flex items-center justify-center text-berry-600 shadow-romantic">
                <Flower2 className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-bold text-ivory-100 tracking-wide">
                Petal <span className="font-script text-3xl text-blush-300 font-normal">&</span> Promise
              </span>
            </div>
            <p className="text-xs sm:text-sm text-ivory-200/70 leading-relaxed max-w-sm">
              Artisanal floral architecture and bespoke event curation. Transforming wedding vows, milestone birthdays, and candlelit proposals into living botanical masterpieces.
            </p>
            <div className="pt-2 text-xs text-blush-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sustainable, foam-free floral curation</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-sand-300">Celebrations</p>
            <ul className="space-y-2 text-xs">
              {['Weddings & Galas','Milestone Birthdays','Candlelight Proposals','Vow Renewals','Bespoke Atelier Design'].map(l => (
                <li key={l}><a href="#packages" className="hover:text-blush-300 transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Studio */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-sand-300">Studio</p>
            <ul className="space-y-2 text-xs">
              <li><a href="#studio"  className="hover:text-blush-300 transition-colors">Floral Theme Studio</a></li>
              <li><a href="#planner" className="hover:text-blush-300 transition-colors">Budget Calculator</a></li>
              <li><a href="#gallery" className="hover:text-blush-300 transition-colors">Mood Board Gallery</a></li>
              <li><button onClick={onOpenConsultation} className="hover:text-blush-300 transition-colors text-left">Book Floral Tasting</button></li>
              <li><a href="#contact" className="hover:text-blush-300 transition-colors">Private Concierge</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-4 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-sand-300">The Bloom Gazette</p>
            <p className="text-xs text-ivory-200/65">
              Receive seasonal floral harvest guides, wedding color trends, and private atelier invitations.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-2.5 rounded-full bg-berry-500/60 border border-berry-500/50 text-xs text-ivory-100 placeholder-ivory-200/40 focus:outline-none focus:border-blush-400"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full bg-blush-400 text-berry-600 text-xs font-semibold uppercase tracking-wider hover:bg-blush-300 transition-colors flex items-center gap-1.5"
              >
                <span>Join</span>
                <Send className="w-3 h-3" />
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-sand-300 font-medium">🌸 Merci! You are subscribed to our private harvest letters.</p>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-ivory-200/45 gap-4">
          <p>© {new Date().getFullYear()} Petal & Promise Atelier Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Powered by Pabbly Connect & Firebase</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              Crafted with <Heart className="w-3 h-3 text-blush-300 fill-current" /> for lovers of beauty
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
