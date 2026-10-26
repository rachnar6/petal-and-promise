import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Calendar, ArrowRight, Flower2, Heart, Award, Clock } from 'lucide-react';
import PackagesSection from '../components/PackagesSection';
import FloralThemeStudio from '../components/FloralThemeStudio';
import BudgetPlanner from '../components/BudgetPlanner';
import MoodBoardGallery from '../components/MoodBoardGallery';
import LoveLetters from '../components/LoveLetters';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import HeroBouquet from '../components/HeroBouquet';

export default function Home({ onOpenConsultation }) {
  return (
    <div className="relative">

      {/* HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-heavenly-gradient py-16 sm:py-24">

        {/* Soft ambient blobs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blush-300/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-sage-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-sand-300/25 rounded-full blur-2xl pointer-events-none" />

        {/* Bouquet decoration – bottom left */}
        <HeroBouquet className="absolute -bottom-8 -left-6 sm:-bottom-4 sm:left-0 w-48 sm:w-56 md:w-64 lg:w-72 opacity-40 pointer-events-none select-none" />

        <div className="w-full mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ivory-50/85 border border-blush-300/40 shadow-soft text-berry-600 text-xs font-semibold tracking-wider uppercase animate-fade-in">
                <Sparkles className="w-3.5 h-3.5 text-blush-400 animate-pulse" />
                <span>Bespoke Floral Event Architecture & Celebrations</span>
              </div>

              {/* Headline */}
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-berry-600 tracking-tight leading-[1.25] sm:leading-[1.2] animate-slide-up">
                Where Dreams{' '}
                <span className="font-script text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-blush-400 font-normal inline-block px-1 sm:px-2 align-baseline">
                  Blossom
                </span>{' '}
                into Eternal Promises
              </h1>

              {/* Subheading */}
              <p className="font-cormorant text-xl sm:text-2xl text-berry-500 max-w-2xl leading-relaxed italic mx-auto lg:mx-0">
                "Curating ethereal weddings, milestone birthdays, and candlelit proposals with organic garden roses, dewy blush peonies, and whispered promises."
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link
                  to="/portal/new-event"
                  className="w-full sm:w-auto px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-widest text-ivory-100 bg-berry-500 hover:bg-berry-500 shadow-romantic hover:shadow-luxe transition-all duration-300 hover:scale-[1.03] flex items-center justify-center gap-2.5 group"
                >
                  <Sparkles className="w-4 h-4 text-sand-200" />
                  <span>Start Planning Your Event</span>
                  <ArrowRight className="w-4 h-4 text-sand-200 group-hover:translate-x-1 transition-transform" />
                </Link>

                <button
                  onClick={onOpenConsultation}
                  className="w-full sm:w-auto px-7 py-4 rounded-full text-xs font-semibold uppercase tracking-widest text-berry-600 bg-ivory-50/85 hover:bg-sand-100 border border-sand-300/70 transition-all duration-300 shadow-soft flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-sage-500" />
                  <span>Book Private Tasting</span>
                </button>
              </div>

              {/* Stats */}
              <div className="pt-8 border-t border-blush-300/20 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-berry-500">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-blush-100 flex items-center justify-center text-blush-500">
                    <Heart className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <span><strong>500+</strong> Fairytale Celebrations</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-sand-100 flex items-center justify-center text-sage-500">
                    <Award className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>Vogue & Brides</strong> Featured</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-sand-200 flex items-center justify-center text-berry-500">
                    <Flower2 className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>Pabbly Powered</strong> Instant Flow</span>
                </div>
              </div>
            </div>

            {/* Right – Showcase card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">

                {/* Hero image */}
                <div className="rounded-3xl overflow-hidden aspect-[4/5] shadow-luxe border-2 border-blush-300/30 relative group">
                  <img
                    src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80"
                    alt="Petal & Promise Floral Wedding"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-berry-700/60 via-transparent to-transparent" />

                  {/* Overlay card */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-ivory-100/90 backdrop-blur-md border border-blush-200/30 shadow-romantic text-berry-600">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-semibold text-blush-500 uppercase tracking-widest text-[10px]">
                        Featured Showcase Celebration
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-sand-100 text-sage-600 font-semibold text-[10px]">
                        Confirmed
                      </span>
                    </div>
                    <p className="font-serif font-semibold text-base">The Versailles Grand Romance</p>
                    <p className="text-xs text-berry-400 flex items-center gap-1.5 mt-0.5">
                      <Clock className="w-3 h-3 text-blush-400" />
                      <span>Countdown: <strong>24 Days Until Celebration</strong></span>
                    </p>
                  </div>
                </div>

                {/* Floating top-left badge */}
                <div className="absolute -top-4 -left-2 sm:-top-5 sm:-left-4 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl border border-blush-200/30 shadow-romantic hidden md:flex items-center gap-3 animate-float-slow z-20">
                  <div className="w-10 h-10 rounded-full bg-blush-50 flex items-center justify-center text-blush-500">
                    <Flower2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-serif font-bold text-berry-600">Fresh Blossom Harvest</p>
                    <p className="text-[10px] text-berry-400">California & French Farms</p>
                  </div>
                </div>

                {/* Floating bottom-right badge */}
                <div className="absolute -bottom-4 -right-2 sm:-bottom-5 sm:-right-4 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl border border-sand-300/70/50 shadow-romantic hidden md:flex items-center gap-3 animate-float-medium z-20">
                  <div className="w-10 h-10 rounded-full bg-sand-50 flex items-center justify-center text-sage-500">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-serif font-bold text-berry-600">Real-Time Sync</p>
                    <p className="text-[10px] text-berry-400">Sheets & Gmail Integration</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <PackagesSection />

      {/* FLORAL THEME STUDIO */}
      <FloralThemeStudio />

      {/* BUDGET PLANNER */}
      <BudgetPlanner />

      {/* MOOD BOARD GALLERY */}
      <MoodBoardGallery />

      {/* TESTIMONIALS */}
      <LoveLetters />

      {/* ABOUT */}
      <AboutSection onOpenConsultation={onOpenConsultation} />

      {/* CONTACT */}
      <ContactSection />
    </div>
  );
}
