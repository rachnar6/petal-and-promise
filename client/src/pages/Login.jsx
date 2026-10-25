import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Flower2, Sparkles, Shield, Mail, Lock, ArrowRight, User } from 'lucide-react';

export default function Login() {
  const { loginWithGoogle, loginWithDemo, loginWithEmail, signupWithEmail, isConfigured } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/portal';

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      await loginWithGoogle();
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Google sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (role) => {
    loginWithDemo(role);
    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/portal');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isRegistering) {
        await signupWithEmail(email, password, name);
      } else {
        await loginWithEmail(email, password);
      }
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-16 px-4 bg-heavenly-gradient relative">
      
      {/* Decorative ambient spots */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blush/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-sage/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-blush/30 shadow-luxe relative z-10">
        
        {/* Brand Icon Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-blush to-sand flex items-center justify-center mx-auto mb-3 shadow-romantic">
            <Flower2 className="w-7 h-7 text-berry-700" />
          </div>
          <span className="font-script text-3xl text-blush-500 block mb-0.5">Welcome to</span>
          <h2 className="font-serif text-3xl font-bold text-berry-700">Petal & Promise</h2>
          <p className="text-xs text-berry-500 mt-1">
            {isRegistering ? 'Create your celebration planning account' : 'Sign in to access your celebration dashboard'}
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs">
            {error}
          </div>
        )}

        {/* 1-Click Instant Demo Testing Options */}
        <div className="mb-6 p-3.5 rounded-2xl bg-sand-100/80 border border-sand-300">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-berry-500 mb-2 flex items-center justify-between">
            <span>Instant Demo Logins</span>
            <span className="text-[10px] text-sage-700 font-bold">1-Click Test</span>
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDemoLogin('customer')}
              className="py-2 px-3 rounded-xl bg-white text-xs font-semibold text-berry-700 border border-blush/40 hover:bg-blush-50 shadow-soft flex items-center justify-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-blush-500" />
              <span>Bride Portal</span>
            </button>

            <button
              type="button"
              onClick={() => handleDemoLogin('admin')}
              className="py-2 px-3 rounded-xl bg-berry-600 text-xs font-semibold text-ivory hover:bg-berry-700 shadow-soft flex items-center justify-center gap-1.5 transition-colors"
            >
              <Shield className="w-3.5 h-3.5 text-blush" />
              <span>Admin Director</span>
            </button>
          </div>
        </div>

        {/* Google Authentication Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-3 px-4 rounded-full border border-sand-300 bg-white hover:bg-sand-50 text-xs font-semibold uppercase tracking-wider text-berry-700 shadow-soft transition-all duration-200 flex items-center justify-center gap-2.5 mb-5"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <div className="relative flex py-2 items-center mb-5">
          <div className="flex-grow border-t border-sand-300"></div>
          <span className="flex-shrink mx-3 text-[10px] uppercase font-semibold text-berry-400">or with email</span>
          <div className="flex-grow border-t border-sand-300"></div>
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegistering && (
            <div>
              <label className="block text-xs font-medium text-berry-600 mb-1">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Genevieve Thorne"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-sand-300 text-xs text-berry-700 focus:outline-none focus:border-blush transition-colors"
                />
                <User className="w-4 h-4 text-berry-400 absolute left-3.5 top-3" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-berry-600 mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="bride@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-sand-300 text-xs text-berry-700 focus:outline-none focus:border-blush transition-colors"
              />
              <Mail className="w-4 h-4 text-berry-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-berry-600 mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-sand-300 text-xs text-berry-700 focus:outline-none focus:border-blush transition-colors"
              />
              <Lock className="w-4 h-4 text-berry-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-6 rounded-full text-xs font-semibold uppercase tracking-wider text-ivory bg-berry-600 hover:bg-berry-700 shadow-romantic hover:shadow-luxe transition-all duration-300 flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <Sparkles className="w-4 h-4 animate-spin text-blush" />
            ) : (
              <>
                <span>{isRegistering ? 'Create Account' : 'Sign In'}</span>
                <ArrowRight className="w-3.5 h-3.5 text-blush" />
              </>
            )}
          </button>
        </form>

        {/* Toggle Register/Login */}
        <div className="text-center mt-6 pt-4 border-t border-sand-200">
          <button
            type="button"
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-xs text-berry-600 hover:text-blush-600 transition-colors"
          >
            {isRegistering ? 'Already have an account? Sign in' : "Don't have an account yet? Register here"}
          </button>
        </div>

      </div>
    </div>
  );
}
