import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Dumbbell, X, Lock, ShieldAlert, KeyRound } from 'lucide-react';
import { GymWebsiteData } from './types';

// Component Imports
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Plans from './components/Plans';
import Trainers from './components/Trainers';
import Facilities from './components/Facilities';
import WorkoutGallery from './components/WorkoutGallery';
import Testimonials from './components/Testimonials';
import Calculators from './components/Calculators';
import Contact from './components/Contact';
import FAQs from './components/FAQs';
import Blog from './components/Blog';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const [data, setData] = useState<GymWebsiteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'client' | 'admin'>('client');
  
  // Auth States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);

  // UX Conversion Helper
  const [selectedPlan, setSelectedPlan] = useState('');
  const [activeSection, setActiveSection] = useState('home');

  // Verify auth on mount
  useEffect(() => {
    const token = localStorage.getItem('nationalgym_token');
    if (token === 'nationalgym-admin-token-2026') {
      setIsLoggedIn(true);
    }
  }, []);

  // Fetch website data from server
  useEffect(() => {
    const fetchGymData = async () => {
      try {
        const res = await fetch('/api/gym-data');
        if (res.ok) {
          const json = await res.json();
          setData(json);
        } else {
          console.error('Failed to retrieve gym-data from server api');
        }
      } catch (err) {
        console.error('Network error loading database config:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGymData();
  }, []);

  // Scroll spy track for navigation highlights
  useEffect(() => {
    const sections = ['home', 'about', 'services', 'plans', 'trainers', 'gallery', 'calculators', 'contact', 'faqs', 'blog'];
    
    const handleScrollSpy = () => {
      const scrollPos = window.scrollY + 150;
      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sec);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy);
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  // Action: Submit Contact Form
  const handleContactSubmit = async (formData: { name: string; email: string; phone: string; message: string }): Promise<boolean> => {
    try {
      const res = await fetch('/api/contact-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const json = await res.json();
        // Insert submission directly into client memory if admin is viewing on-the-fly
        if (data) {
          setData({
            ...data,
            submissions: [json.submission, ...data.submissions]
          });
        }
        return true;
      }
    } catch (err) {
      console.error('Contact submission connection error:', err);
    }
    return false;
  };

  // Action: Attempt Admin Login
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError(null);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: loginPassword })
      });

      if (res.ok) {
        const json = await res.json();
        localStorage.setItem('nationalgym_token', json.token);
        setIsLoggedIn(true);
        setLoginPassword('');
        setShowLoginModal(false);
        setViewMode('admin');
      } else {
        const errJson = await res.json();
        setLoginError(errJson.error || 'Failed to authenticate admin session.');
      }
    } catch {
      setLoginError('Connection failed. Verify server response.');
    } finally {
      setLoginLoading(false);
    }
  };

  // Action: Sign out Admin
  const handleLogout = () => {
    localStorage.removeItem('nationalgym_token');
    setIsLoggedIn(false);
    setViewMode('client');
  };

  // Action: Commit changes from dashboard to file
  const handleAdminSave = async (newData: GymWebsiteData): Promise<boolean> => {
    try {
      const token = localStorage.getItem('nationalgym_token');
      const res = await fetch('/api/gym-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newData)
      });
      if (res.ok) {
        setData(newData);
        return true;
      }
    } catch (err) {
      console.error('Database write sync error:', err);
    }
    return false;
  };

  // Render Loader
  if (loading || !data) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
        <motion.div
          animate={{ scale: [1, 1.15, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="bg-gym-red p-4 rounded-2xl mb-4"
        >
          <Dumbbell className="h-10 w-10 text-white" />
        </motion.div>
        <span className="font-display font-bold text-sm tracking-widest text-zinc-400 animate-pulse uppercase">
          Loading National Gym...
        </span>
      </div>
    );
  }

  // Render Admin Dashboard mode
  if (viewMode === 'admin' && isLoggedIn) {
    return (
      <AdminDashboard
        data={data}
        onSave={handleAdminSave}
        onClose={() => setViewMode('client')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-gym-red selection:text-white">
      
      {/* Dynamic Header */}
      <Navbar
        details={data.details}
        isAdmin={isLoggedIn}
        onAdminClick={() => {
          if (isLoggedIn) {
            setViewMode('admin');
          } else {
            setShowLoginModal(true);
          }
        }}
        onLogout={handleLogout}
        activeSection={activeSection}
      />

      {/* Main Sections */}
      <Hero details={data.details} />
      <About about={data.about} />
      <Services services={data.services} />
      <Plans plans={data.plans} onSelectPlan={(name) => setSelectedPlan(name)} />
      <Trainers trainers={data.trainers} />
      <Facilities facilities={data.facilities} />
      <WorkoutGallery gallery={data.gallery} />
      <Testimonials testimonials={data.testimonials} rating={data.details.rating} reviewCount={data.details.reviewCount} />
      <Calculators />
      <Contact details={data.details} selectedPlan={selectedPlan} onFormSubmit={handleContactSubmit} />
      <FAQs faqs={data.faqs} />
      <Blog blogs={data.blogs} />
      
      {/* Footer widget */}
      <Footer details={data.details} />

      {/* Admin Login Dialog Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setShowLoginModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="bg-zinc-900 border border-zinc-800 max-w-sm w-full rounded-2xl p-6 relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Icon */}
              <button
                onClick={() => setShowLoginModal(false)}
                className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Icon & title */}
              <div className="flex flex-col items-center text-center mt-2 mb-6">
                <div className="bg-gym-red/15 p-3 rounded-2xl mb-3">
                  <KeyRound className="h-6 w-6 text-gym-red" />
                </div>
                <h3 className="font-display font-black text-xl text-white uppercase tracking-wider">
                  OWNER ACCESS PORTAL
                </h3>
                <p className="text-zinc-500 text-xs font-sans mt-1">
                  Authenticate using your administrative password to edit plans, pricing, staff and gallery configurations.
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label htmlFor="admin-pass" className="block text-[10px] font-black uppercase text-zinc-400 tracking-wider mb-1.5">
                    Enter Admin Password
                  </label>
                  <input
                    id="admin-pass"
                    type="password"
                    required
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-center text-white focus:outline-none focus:border-gym-red font-mono"
                    autoFocus
                  />
                </div>

                {/* Error Banner */}
                {loginError && (
                  <div className="bg-gym-red/10 border border-gym-red/35 p-3 rounded-lg flex items-start space-x-2 text-gym-red text-xs font-sans">
                    <ShieldAlert className="h-4.5 w-4.5 shrink-0" />
                    <span>{loginError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full bg-gym-red hover:bg-rose-700 font-sans font-bold text-white py-3 rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center space-x-2 text-xs uppercase tracking-wider"
                >
                  {loginLoading ? (
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Lock className="h-4 w-4" />
                      <span>LOG IN SECURELY</span>
                    </>
                  )}
                </button>
              </form>

              <span className="block text-center text-[10px] text-zinc-600 mt-4">
                Default Password is listed in .env.example
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
