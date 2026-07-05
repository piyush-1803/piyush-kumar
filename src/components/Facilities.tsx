import { motion } from 'motion/react';
import * as LucideIcons from 'lucide-react';
import { Facility } from '../types';

interface FacilitiesProps {
  facilities: Facility[];
}

// Safely resolve Lucide Icons
function FacilityIcon({ name, className }: { name: string; className?: string }) {
  const IconComponent = (LucideIcons as any)[name] || LucideIcons.Dumbbell;
  return <IconComponent className={className} />;
}

export default function Facilities({ facilities }: FacilitiesProps) {
  return (
    <section id="facilities" className="py-24 bg-zinc-950 text-white relative border-b border-white/10">
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-red-500 font-display font-black text-xs tracking-widest uppercase block mb-2">
            CONVENIENCE FIRST
          </span>
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 italic uppercase leading-none">
            PREMIUM GYM FACILITIES
          </h2>
          <p className="mt-4 text-zinc-400 font-sans text-sm leading-relaxed">
            Training is more than just lifting. We provide a hygienic, well-organized atmosphere equipped with supportive utilities to make your daily routine frictionless.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {facilities.map((facility, index) => (
            <motion.div
              key={facility.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group bg-black border border-white/10 hover:border-red-600/30 p-6 rounded-none transition-all duration-200 flex space-x-4 items-start"
            >
              {/* Icon Panel */}
              <div className="bg-white/5 border border-white/10 p-3 rounded-none shrink-0 group-hover:bg-red-600/10 group-hover:border-red-600/20 transition-all duration-300">
                <FacilityIcon name={facility.icon} className="h-5 w-5 text-red-600" />
              </div>

              {/* Text detail */}
              <div>
                <h3 className="font-display font-black text-sm text-white uppercase tracking-wider mb-1.5 group-hover:text-red-500 transition-colors">
                  {facility.title}
                </h3>
                <p className="text-zinc-400 font-sans text-xs leading-relaxed">
                  {facility.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
