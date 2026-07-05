import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Dumbbell, Lock, LogOut, Phone } from 'lucide-react';
import { GymDetails } from '../types';

interface NavbarProps {
  details: GymDetails;
  isAdmin: boolean;
  onAdminClick: () => void;
  onLogout: () => void;
  activeSection: string;
}

export default function Navbar({ details, isAdmin, onAdminClick, onLogout, activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Plans', href: '#plans' },
    { label: 'Trainers', href: '#trainers' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Calculators', href: '#calculators' },
    { label: 'Contact', href: '#contact' },
    { label: 'FAQs', href: '#faqs' },
    { label: 'Blog', href: '#blog' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <nav
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-black/95 backdrop-blur-md border-b border-white/10 py-3.5 shadow-2xl' 
            : 'bg-gradient-to-b from-black/90 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-red-600 flex items-center justify-center font-black text-xl italic text-white transition-transform group-hover:scale-105">
                N
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-xl tracking-tighter text-white uppercase leading-none">
                  NATIONAL <span className="text-red-600 italic">GYM</span>
                </span>
                <span className="block font-sans text-[10px] text-red-500 font-bold uppercase tracking-widest leading-none mt-1">
                  नेशनल जिम — Bhurkunda
                </span>
              </div>
            </a>

            {/* Desktop Nav Items */}
            <div className="hidden lg:flex items-center space-x-6 text-[11px] font-bold uppercase tracking-widest">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`transition-colors hover:text-red-500 ${
                      isActive ? 'text-red-500' : 'text-zinc-300/80'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>

            {/* Right Buttons */}
            <div className="hidden lg:flex items-center space-x-6 text-[11px] font-bold uppercase tracking-widest">
              <a
                href={`tel:${details.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-4 border border-white/10 px-4 py-2 font-mono tracking-normal text-white/70 hover:bg-white/5 hover:text-white transition-colors"
              >
                <Phone className="h-3 w-3 text-red-600" />
                <span>{details.phone}</span>
              </a>

              {isAdmin ? (
                <div className="flex items-center space-x-2 bg-red-600/10 border border-red-600/30 px-3 py-1.5 rounded-sm">
                  <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider">Admin</span>
                  <button
                    onClick={onLogout}
                    className="text-zinc-400 hover:text-white transition-colors"
                    title="Sign Out"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={onAdminClick}
                  className="p-2 text-zinc-500 hover:text-red-500 transition-colors"
                  title="Owner Access"
                >
                  <Lock className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Mobile Menu Trigger */}
            <div className="flex items-center space-x-3 lg:hidden">
              {isAdmin ? (
                <div className="flex items-center space-x-2 bg-red-600/10 border border-red-500/20 px-2.5 py-1 rounded-sm">
                  <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider">Admin</span>
                  <button onClick={onLogout} className="text-zinc-400 hover:text-white">
                    <LogOut className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <button onClick={onAdminClick} className="p-1.5 text-zinc-500 hover:text-red-500" title="Owner Access">
                  <Lock className="h-4 w-4" />
                </button>
              )}

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-zinc-300 hover:text-white focus:outline-none"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[60px] z-40 bg-black/98 backdrop-blur-lg lg:hidden px-8 py-10 overflow-y-auto flex flex-col justify-between"
          >
            <div className="flex flex-col space-y-5">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`font-display text-base font-black tracking-widest uppercase border-b border-white/5 pb-4 hover:text-red-500 transition-colors ${
                      isActive ? 'text-red-500 pl-3 border-l-2 border-l-red-600 border-b-white/10' : 'text-zinc-400'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>

            <div className="mt-8 pt-8 border-t border-white/10 flex flex-col space-y-4 pb-12">
              <a
                href={`tel:${details.phone.replace(/\s+/g, '')}`}
                className="flex items-center justify-center space-x-2 bg-red-600 text-white py-4 rounded-none font-black text-xs uppercase tracking-widest hover:bg-red-700 transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>CALL NOW: {details.phone}</span>
              </a>
              <p className="text-[10px] text-center text-zinc-500 uppercase tracking-wider font-bold">
                Opposite Old Airtel Tower, Bhurkunda, JH
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
