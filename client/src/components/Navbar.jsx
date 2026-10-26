import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Flower2, Calendar, Sparkles, LogOut, Shield, Menu, X, ChevronDown
} from 'lucide-react';

export default function Navbar({ onOpenConsultation }) {
  const { user, logout, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: 'Home',          path: '/' },
    { name: 'Packages',      path: '/#packages' },
    { name: 'Floral Studio', path: '/#studio' },
    { name: 'Budget Planner',path: '/#planner' },
    { name: 'Gallery',       path: '/#gallery' },
    { name: 'About',         path: '/#about' },
    { name: 'Contact',       path: '/#contact' },
  ];

  const handleNavClick = (path) => {
    setMobileMenuOpen(false);
    if (path.startsWith('/#')) {
      const id = path.replace('/#', '');
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); }, 150);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-ivory-100/95 backdrop-blur-md border-b border-blush-300/30 shadow-sm transition-all duration-300">
      <div className="w-full mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="flex items-center justify-between h-20 gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-blush-400 to-sand-300 flex items-center justify-center shadow-romantic group-hover:scale-105 transition-transform duration-300">
              <Flower2 className="w-5 h-5 sm:w-6 sm:h-6 text-berry-600 group-hover:rotate-12 transition-transform duration-500" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-semibold tracking-wide text-berry-600 leading-tight whitespace-nowrap">
                Petal <span className="font-script text-2xl sm:text-3xl text-blush-500 font-normal">&</span> Promise
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-berry-400 font-medium -mt-0.5 whitespace-nowrap">
                Atelier Floral & Events
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-5 2xl:gap-7">
            {navLinks.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.path)}
                className="text-xs 2xl:text-sm font-medium text-berry-500 hover:text-berry-600 relative py-1 transition-colors duration-200 group whitespace-nowrap"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blush-400 rounded-full transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <button
              onClick={onOpenConsultation}
              className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold tracking-wide uppercase text-berry-600 bg-sand-100 hover:bg-sand-200 border border-sand-300/70/80 transition-all duration-200 shadow-soft whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5 text-sage-500" />
              <span>Book Tasting</span>
            </button>

            <Link
              to="/portal/new-event"
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-semibold tracking-wide uppercase text-ivory-100 bg-berry-500 hover:bg-berry-500 shadow-romantic hover:shadow-luxe transition-all duration-300 hover:scale-[1.02] whitespace-nowrap flex-shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-sand-200" />
              <span>Plan Event</span>
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-1.5 sm:gap-2 pl-2 pr-3 py-1.5 rounded-full bg-blush-50/80 border border-blush-300/40 hover:bg-blush-100/70 transition-colors"
                >
                  <img
                    src={user.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                    alt={user.name || 'User'}
                    className="w-7 h-7 rounded-full object-cover border border-blush-300"
                  />
                  <span className="text-xs font-medium text-berry-600 max-w-[80px] truncate hidden sm:inline">{user.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-berry-400" />
                </button>

                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 rounded-2xl bg-ivory-100 shadow-luxe border border-blush-200/40 py-2 z-50 animate-fade-in"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-blush-200/30">
                      <p className="text-[10px] text-berry-400 uppercase tracking-wider font-semibold">Signed in as</p>
                      <p className="text-sm font-serif font-medium text-berry-600 truncate">{user.name || user.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blush-100/60 text-berry-500">
                        {user.role === 'admin' ? '🌸 Director / Admin' : '✨ Celebration Host'}
                      </span>
                    </div>
                    <Link to="/portal" className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-berry-500 hover:bg-blush-50 transition-colors">
                      <Calendar className="w-4 h-4 text-blush-500" />
                      <span>My Celebration Portal</span>
                    </Link>
                    {isAdmin && (
                      <Link to="/admin" className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-berry-600 font-semibold hover:bg-blush-50 transition-colors">
                        <Shield className="w-4 h-4 text-berry-500" />
                        <span>Admin Director Dashboard</span>
                      </Link>
                    )}
                    <div className="border-t border-blush-200/30 my-1" />
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-3 sm:px-4 py-2 text-xs font-semibold uppercase tracking-wider text-berry-500 hover:text-berry-600 hover:bg-blush-50/50 rounded-full transition-colors whitespace-nowrap"
              >
                Sign In
              </Link>
            )}

            <div className="xl:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-berry-500 hover:bg-blush-50 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-ivory-100 border-b border-blush-200/30 px-6 py-6 space-y-4 shadow-luxe animate-fade-in">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.path)}
                className="text-left text-base font-serif font-medium text-berry-600 hover:text-sage-500 transition-colors"
              >
                {item.name}
              </button>
            ))}
          </nav>
          <div className="pt-4 border-t border-blush-200/30 flex flex-col gap-3">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenConsultation(); }}
              className="w-full py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-sand-200 text-berry-600 hover:bg-sand-300 transition-colors"
            >
              Book Tasting Consultation
            </button>
            <Link
              to="/portal/new-event"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-berry-500 text-ivory-100 shadow-romantic hover:bg-berry-500 transition-colors"
            >
              Plan Your Event
            </Link>
            {user ? (
              <div className="pt-3 border-t border-blush-100/30 space-y-2">
                <Link to="/portal" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium text-berry-500">
                  My Celebration Portal
                </Link>
                {isAdmin && (
                  <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-semibold text-berry-600">
                    Admin Director Portal
                  </Link>
                )}
                <button onClick={() => { setMobileMenuOpen(false); logout(); }} className="text-sm text-red-500 font-medium">
                  Sign Out ({user.name || user.email})
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center py-2.5 text-xs font-semibold uppercase border border-blush-300/40 rounded-full text-berry-500 hover:bg-blush-50 transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
