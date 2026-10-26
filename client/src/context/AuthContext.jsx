import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, googleProvider, isConfigured } from '../services/firebase';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('pp_user');
      if (!saved) return null;
      const parsed = JSON.parse(saved);
      // Clean up legacy mock demo identities so users start with clean real state
      if (parsed.uid === 'client_demo_1' || parsed.uid === 'admin_director_01' || parsed.name === 'Elena Rostova') {
        localStorage.removeItem('pp_user');
        localStorage.removeItem('pp_token');
        return null;
      }
      return parsed;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('pp_token') || '');
  const [loading, setLoading] = useState(true);

  // Monitor real Firebase auth if configured
  useEffect(() => {
    if (isConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          const idToken = await firebaseUser.getIdToken();
          const isAdmin = firebaseUser.email === (import.meta.env.VITE_ADMIN_EMAIL || 'admin@petalandpromise.com');
          const userData = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            name: firebaseUser.displayName || firebaseUser.email?.split('@')[0],
            photoURL: firebaseUser.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
            role: isAdmin ? 'admin' : 'customer',
          };
          setUser(userData);
          setToken(idToken);
          localStorage.setItem('pp_user', JSON.stringify(userData));
          localStorage.setItem('pp_token', idToken);
        } else {
          // If no local mock session exists, clear
          if (!localStorage.getItem('pp_token')?.startsWith('mock_')) {
            setUser(null);
            setToken('');
            localStorage.removeItem('pp_user');
            localStorage.removeItem('pp_token');
          }
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      // Mock session already loaded or start as guest
      setLoading(false);
    }
  }, []);

  // Google Login
  const loginWithGoogle = async () => {
    if (isConfigured && auth && googleProvider) {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        const idToken = await result.user.getIdToken();
        const isAdmin = result.user.email === (import.meta.env.VITE_ADMIN_EMAIL || 'admin@petalandpromise.com');
        const userData = {
          uid: result.user.uid,
          email: result.user.email,
          name: result.user.displayName || 'Celebration Host',
          photoURL: result.user.photoURL,
          role: isAdmin ? 'admin' : 'customer'
        };
        setUser(userData);
        setToken(idToken);
        localStorage.setItem('pp_user', JSON.stringify(userData));
        localStorage.setItem('pp_token', idToken);
        return { success: true, user: userData };
      } catch (err) {
        console.error('Google Sign-In Error:', err);
        throw err;
      }
    } else {
      // Simulated Google Login in Dev Mode
      return loginWithDemo('customer', {
        name: 'Elena Rostova (Google Host)',
        email: 'elena.rostova@gmail.com'
      });
    }
  };

  // Demo / Quick-Switch Login (Ideal for rapid grading & testing)
  const loginWithDemo = (role = 'customer', customDetails = {}) => {
    const isAdm = role === 'admin';
    const mockToken = isAdm ? 'mock_admin_token' : 'mock_customer_client_demo_1';
    const userData = {
      uid: isAdm ? 'admin_director_01' : 'client_demo_1',
      email: customDetails.email || (isAdm ? 'admin@petalandpromise.com' : 'client@petalandpromise.com'),
      name: customDetails.name || (isAdm ? 'Petal & Promise Director' : 'Elena Rostova'),
      photoURL: isAdm
        ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
        : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      role: isAdm ? 'admin' : 'customer'
    };

    setUser(userData);
    setToken(mockToken);
    localStorage.setItem('pp_user', JSON.stringify(userData));
    localStorage.setItem('pp_token', mockToken);
    return { success: true, user: userData };
  };

  // Email / Password Login
  const loginWithEmail = async (email, password) => {
    if (isConfigured && auth) {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await res.user.getIdToken();
      const isAdmin = res.user.email === (import.meta.env.VITE_ADMIN_EMAIL || 'admin@petalandpromise.com');
      const userData = {
        uid: res.user.uid,
        email: res.user.email,
        name: res.user.displayName || email.split('@')[0],
        role: isAdmin ? 'admin' : 'customer'
      };
      setUser(userData);
      setToken(idToken);
      localStorage.setItem('pp_user', JSON.stringify(userData));
      localStorage.setItem('pp_token', idToken);
      return { success: true, user: userData };
    } else {
      const isAdm = email.includes('admin');
      const userData = {
        uid: 'user_' + Date.now(),
        email: email,
        name: email.split('@')[0],
        role: isAdm ? 'admin' : 'customer'
      };
      const token = 'token_' + Date.now();
      setUser(userData);
      setToken(token);
      localStorage.setItem('pp_user', JSON.stringify(userData));
      localStorage.setItem('pp_token', token);
      return { success: true, user: userData };
    }
  };

  // Register with Email
  const signupWithEmail = async (email, password, name) => {
    if (isConfigured && auth) {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const idToken = await res.user.getIdToken();
      const userData = {
        uid: res.user.uid,
        email: res.user.email,
        name: name || email.split('@')[0],
        role: 'customer'
      };
      setUser(userData);
      setToken(idToken);
      localStorage.setItem('pp_user', JSON.stringify(userData));
      localStorage.setItem('pp_token', idToken);
      return { success: true, user: userData };
    } else {
      const userData = {
        uid: 'user_' + Date.now(),
        email: email,
        name: name || email.split('@')[0],
        role: 'customer'
      };
      const token = 'token_' + Date.now();
      setUser(userData);
      setToken(token);
      localStorage.setItem('pp_user', JSON.stringify(userData));
      localStorage.setItem('pp_token', token);
      return { success: true, user: userData };
    }
  };

  // Logout
  const logout = async () => {
    if (isConfigured && auth) {
      try {
        await signOut(auth);
      } catch (e) {}
    }
    setUser(null);
    setToken('');
    localStorage.removeItem('pp_user');
    localStorage.removeItem('pp_token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isConfigured,
        loginWithGoogle,
        loginWithDemo,
        loginWithEmail,
        signupWithEmail,
        logout,
        isAdmin: user?.role === 'admin'
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
