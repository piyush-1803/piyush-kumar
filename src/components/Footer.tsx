import React from 'react';
import { Dumbbell, Phone, MapPin, Clock, Facebook, Instagram, Youtube, ArrowUp } from 'lucide-react';
import { GymDetails } from '../types';

interface FooterProps {
  details: GymDetails;
}

export default function Footer({ details }: FooterProps) {
  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
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

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white border-t border-white/10 relative">
      
      {/* Decorative accent border */}
      <div className="h-[2px] bg-red-600" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-6">
            <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center space-x-2.5">
              <div className="bg-red-600 p-2.5 rounded-none flex items-center justify-center">
                <Dumbbell className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="font-display font-black text-xl tracking-wider text-white">
                  NATIONAL <span className="text-red-500">GYM</span>
                </span>
                <span className="block font-sans text-[10px] text-zinc-500 font-bold tracking-widest text-right">
                  {details.hindiName}
                </span>
              </div>
            </a>

            <p className="text-zinc-400 font-sans text-xs md:text-sm leading-relaxed max-w-sm">
              The premium, high-energy strength, conditioning and bodybuilding center in Bhurkunda, Jharkhand. Equipped with elite heavy machinery, dumbbells up to 40kg, and personal nutrition guides to unlock your ultimate form.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-3.5">
              <a
                href={details.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black border border-white/10 p-2.5 rounded-none text-zinc-400 hover:text-white hover:border-red-600 hover:bg-red-600/10 transition-colors"
                aria-label="Facebook Link"
              >
                <Facebook className="h-4.5 w-4.5" />
              </a>
              <a
                href={details.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black border border-white/10 p-2.5 rounded-none text-zinc-400 hover:text-white hover:border-red-600 hover:bg-red-600/10 transition-colors"
                aria-label="Instagram Link"
              >
                <Instagram className="h-4.5 w-4.5" />
              </a>
              <a
                href={details.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black border border-white/10 p-2.5 rounded-none text-zinc-400 hover:text-white hover:border-red-600 hover:bg-red-600/10 transition-colors"
                aria-label="YouTube Link"
              >
                <Youtube className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3">
            <h3 className="font-display font-black text-xs uppercase tracking-widest text-zinc-400 mb-6 border-l-2 border-l-red-600 pl-2.5">
              QUICK SECTIONS
            </h3>
            <ul className="space-y-3.5 font-sans text-xs md:text-sm font-semibold">
              <li>
                <a href="#about" onClick={(e) => handleNavClick(e, '#about')} className="text-zinc-400 hover:text-red-500 transition-colors block">
                  About National Gym
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleNavClick(e, '#services')} className="text-zinc-400 hover:text-red-500 transition-colors block">
                  Workout Services
                </a>
              </li>
              <li>
                <a href="#plans" onClick={(e) => handleNavClick(e, '#plans')} className="text-zinc-400 hover:text-red-500 transition-colors block">
                  Membership Prices
                </a>
              </li>
              <li>
                <a href="#trainers" onClick={(e) => handleNavClick(e, '#trainers')} className="text-zinc-400 hover:text-red-500 transition-colors block">
                  Certified Trainers
                </a>
              </li>
              <li>
                <a href="#calculators" onClick={(e) => handleNavClick(e, '#calculators')} className="text-zinc-400 hover:text-red-500 transition-colors block">
                  BMI & Calorie Calc
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="text-zinc-400 hover:text-red-500 transition-colors block">
                  Contact & Map Location
                </a>
              </li>
            </ul>
          </div>

          {/* Location details */}
          <div className="md:col-span-4 space-y-6">
            <h3 className="font-display font-black text-xs uppercase tracking-widest text-zinc-400 mb-6 border-l-2 border-l-red-600 pl-2.5">
              VISIT THE STATION
            </h3>
            
            <div className="space-y-4 font-sans text-xs md:text-sm text-zinc-400">
              
              <div className="flex items-start space-x-3.5">
                <MapPin className="h-4.5 w-4.5 text-red-500 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Near Bank of Baroda, Main Road, Bhurkunda, Ramgarh District, Jharkhand - 829106
                </p>
              </div>

              <div className="flex items-start space-x-3.5">
                <Phone className="h-4.5 w-4.5 text-red-500 shrink-0 mt-0.5" />
                <a href={`tel:${details.phone.replace(/\s+/g, '')}`} className="hover:text-red-500 transition-colors font-bold tracking-wider">
                  {details.phone}
                </a>
              </div>

              <div className="flex items-start space-x-3.5">
                <Clock className="h-4.5 w-4.5 text-red-500 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  {details.hours}
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="h-px bg-white/5 my-12" />

        {/* Bottom Panel */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-zinc-500 font-sans text-[10px] font-bold text-center sm:text-left">
            © {currentYear} National Gym (नेशनल जिम) Bhurkunda. All Rights Reserved.
            <span className="block sm:inline sm:ml-2 text-[9px] text-zinc-600 font-medium">
              Designed with full offline persistence support.
            </span>
          </p>

          <button
            onClick={handleScrollTop}
            className="bg-black border border-white/10 p-3 rounded-none hover:bg-red-600 hover:border-red-600 hover:text-white text-zinc-400 transition-all shadow-none hover:-translate-y-1 active:scale-95 group cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-4.5 w-4.5 transform group-hover:animate-bounce" />
          </button>
        </div>

      </div>

    </footer>
  );
}
