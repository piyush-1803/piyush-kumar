import React from 'react';
import { motion } from 'motion/react';
import { Phone, ArrowUpRight, Star, Calendar } from 'lucide-react';
import { GymDetails } from '../types';

interface HeroProps {
  details: GymDetails;
}

export default function Hero({ details }: HeroProps) {
  const handleScrollToPlans = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.querySelector('#plans');
    if (element) {
      const offset = 80;
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
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden pt-16">
      {/* Background Image with Dark Overlays */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1600')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
      
      {/* Glowing red background accents */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gym-red/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gym-red/5 rounded-full blur-3xl" />

      {/* Hero Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center z-10">
        
        {/* Rating Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center space-x-2 bg-black border border-white/10 px-5 py-2.5 rounded-none mb-8"
        >
          <span className="text-yellow-400 font-black tracking-normal text-xs">★ 4.5</span>
          <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
            / {details.reviewCount} Google Reviews
          </span>
        </motion.div>

        {/* Brand Name Headline */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-black text-6xl md:text-8xl lg:text-[110px] tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 italic uppercase"
        >
          NATIONAL <span className="text-red-600">GYM</span>
        </motion.h1>

        {/* Hindi Name */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-2xl font-black text-red-500 mt-3 tracking-widest uppercase font-sans"
        >
          नेशनल जिम — {details.hindiName}
        </motion.div>

        {/* Slogan */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 max-w-2xl mx-auto text-base md:text-lg text-zinc-400 font-sans leading-relaxed"
        >
          Transform your physique at Bhurkunda’s premier fitness destination. Science-backed training, elite equipment up to 40kg, and a culture of pure performance.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={handleScrollToPlans}
            className="w-full sm:w-auto px-10 py-4.5 bg-red-600 text-white font-black uppercase tracking-widest hover:bg-red-700 transition-colors text-xs rounded-none"
          >
            JOIN THE ELITE
          </button>

          <a
            href={`tel:${details.phone.replace(/\s+/g, '')}`}
            className="w-full sm:w-auto px-10 py-4.5 border border-white/20 text-white font-black uppercase tracking-widest hover:bg-white/10 transition-colors text-xs rounded-none flex items-center justify-center gap-2"
          >
            <Phone className="h-3.5 w-3.5 text-red-600" />
            <span>CALL COACH: {details.phone}</span>
          </a>
        </motion.div>

        {/* Hours and Location Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 pt-10 border-t border-white/10 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 text-zinc-400 text-xs uppercase tracking-widest font-bold"
        >
          <div className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 p-4 rounded-none">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-left font-mono tracking-normal text-white/70">
              Timings: <strong className="text-white">OPENS 5:00 AM DAILY (MON-SAT)</strong>
            </span>
          </div>
          <div className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 p-4 rounded-none">
            <span className="text-red-500 italic font-black font-mono">📍</span>
            <span className="text-left font-mono tracking-normal text-white/70">
              NEAR BANK OF BARODA, MAIN ROAD, BHURKUNDA
            </span>
          </div>
        </motion.div>

      </div>

      {/* Decorative slant bottom panel for visual rhythm */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
    </section>
  );
}
