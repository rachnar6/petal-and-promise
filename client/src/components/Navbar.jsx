import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Flower2,
  Calendar,
  Sparkles,
  User,
  LogOut,
  Shield,
  Menu,
  X,
  ChevronDown,
  Palette,
  Calculator,
  Heart
} from 'lucide-react';

export default function Navbar({ onOpenConsultation }) {
  const { user, logout, loginWithDemo, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Packages', path: '/#packages' },
    { name: 'Floral Studio', path: '/#studio' },
    { name: 'Budget Planner', path: '/#planner' },
    { name: 'Gallery', path: '/#gallery' },
    { name: 'About', path: '/#about' },
    { name: 'Contact', path: '/#contact' },
  ];

  const handleNavClick = (path) => {
    setMobileMenuOpen(false);
    if (path.startsWith('/#')) {
      const elementId = path.replace('/#', '');
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(elementId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const el = document.getElementById(elementId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-ivory/85 backdrop-blur-md border-b border-blush/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Identity */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-blush to-sand flex items-center justify-center shadow-romantic group-hover:scale-105 transition-transform duration-300">
              <Flower2 className="w-6 h-6 text-berry-700 transform group-hover:rotate-12 transition-transform duration-500" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-semibold tracking-wide text-berry-700 leading-tight">
                Petal <span className="font-script text-3xl text-blush-500 font-normal">&</span> Promise
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-berry-400 font-medium -mt-0.5">
                Atelier Floral & Events
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.path)}
                className="text-sm font-medium text-berry-600 hover:text-berry-700 relative py-1 transition-colors duration-200 group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blush-400 rounded-full transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Right Action Elements */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Quick Consultation CTA */}
            <button
              onClick={onOpenConsultation}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wide uppercase text-berry-600 bg-sand-100 hover:bg-sand-200 border border-sand-300/80 transition-all duration-200 shadow-soft"
            >
              <Calendar className="w-3.5 h-3.5 text-sage-600" />
              <span>Book Tasting</span>
            </button>

            {/* Plan Event CTA */}
            <Link
              to="/portal/new-event"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide uppercase text-ivory bg-berry-600 hover:bg-berry-700 shadow-romantic hover:shadow-luxe transition-all duration-300 hover:scale-[1.02]"
            >
              <Sparkles className="w-3.5 h-3.5 text-blush" />
              <span>Plan Event</span>
            </Link>

            {/* User Dropdown / Auth State */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-blush-50/70 border border-blush/40 hover:bg-blush-100/70 transition-colors"
                >
                  <img
                    src={user.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover border border-blush"
                  />
                  <span className="text-xs font-medium text-berry-700 max-w-[90px] truncate">
                    {user.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-berry-400" />
                </button>

                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 rounded-2xl bg-ivory shadow-luxe border border-blush/30 py-2 z-50 animate-fade-in"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-blush/20">
                      <p className="text-xs text-berry-400 uppercase tracking-wider font-semibold">Signed in as</p>
                      <p className="text-sm font-serif font-medium text-berry-700 truncate">{user.name}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blush/20 text-berry-600">
                        {user.role === 'admin' ? '🌸 Director / Admin' : '✨ Celebration Host'}
                      </span>
                    </div>

                    <Link
                      to="/portal"
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-berry-600 hover:bg-blush-50 transition-colors"
                    >
                      <Calendar className="w-4 h-4 text-blush-500" />
                      <span>My Celebration Portal</span>
                    </Link>

                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-berry-700 font-semibold hover:bg-blush-50 transition-colors"
                      >
                        <Shield className="w-4 h-4 text-berry-500" />
                        <span>Admin Director Dashboard</span>
                      </Link>
                    )}

                    <div className="border-t border-blush/20 my-1" />

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
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-berry-600 hover:text-berry-700 transition-colors"
                >
                  Log In
                </Link>
                {/* 1-Click Quick Demo Toggle Pill */}
                <button
                  onClick={() => loginWithDemo('customer')}
                  title="Test as Demo Client"
                  className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium text-berry-500 bg-blush/20 hover:bg-blush/40 transition-colors border border-blush/30"
                >
                  <Sparkles className="w-3 h-3 text-blush-500" />
                  <span>Demo Bride</span>
                </button>
                <button
                  onClick={() => loginWithDemo('admin')}
                  title="Test as Demo Admin"
                  className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium text-berry-700 bg-sand-200/80 hover:bg-sand-300 transition-colors border border-sand-400/40"
                >
                  <Shield className="w-3 h-3 text-berry-600" />
                  <span>Demo Admin</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-berry-600 hover:bg-blush-50 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-ivory border-b border-blush/20 px-6 py-6 space-y-4 shadow-luxe animate-fade-in">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.path)}
                className="text-left text-base font-serif font-medium text-berry-700 hover:text-blush-600 transition-colors"
              >
                {item.name}
              </button>
            ))}
          </nav>

          <div className="pt-4 border-t border-blush/20 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-sand-200 text-berry-700"
            >
              Book Tasting Consultation
            </button>
            <Link
              to="/portal/new-event"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-berry-600 text-ivory shadow-romantic"
            >
              Plan Your Event
            </Link>

            {user ? (
              <div className="pt-3 border-t border-blush/10 space-y-2">
                <Link
                  to="/portal"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm font-medium text-berry-600"
                >
                  My Celebration Portal
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-sm font-semibold text-berry-700"
                  >
                    Admin Director Portal
                  </Link>
                )}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="text-sm text-red-500 font-medium"
                >
                  Sign Out ({user.name})
                </button>
              </div>
            ) : (
              <div className="flex gap-2 pt-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2 text-xs font-semibold uppercase border border-blush/40 rounded-full text-berry-600"
                >
                  Log In
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    loginWithDemo('customer');
                  }}
                  className="flex-1 py-2 text-xs font-semibold bg-blush/20 rounded-full text-berry-700"
                >
                  Demo Bride
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
