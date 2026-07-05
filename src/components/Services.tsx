import { motion } from 'motion/react';
import * as LucideIcons from 'lucide-react';
import { GymService } from '../types';

interface ServicesProps {
  services: GymService[];
}

// Helper to resolve dynamic icons from lucide-react safely
function GymIcon({ name, className }: { name: string; className?: string }) {
  // Safe lookup: fallback to Dumbbell if name is not found
  const IconComponent = (LucideIcons as any)[name] || LucideIcons.Dumbbell;
  return <IconComponent className={className} />;
}

export default function Services({ services }: ServicesProps) {
  return (
    <section id="services" className="py-24 bg-zinc-900 text-white relative border-b border-white/10">
      {/* Background design accents */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-red-500 font-display font-black text-xs tracking-widest uppercase block mb-2">
            OUR SPECIALTIES
          </span>
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 italic uppercase leading-none">
            EXPLORE OUR PROGRAMS
          </h2>
          <p className="mt-4 text-zinc-400 font-sans text-sm leading-relaxed">
            Engineered to challenge your limits. Select from our heavy strength programs, customized fat shredding schedules, or high-performance stamina circuits.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group bg-black border border-white/10 rounded-none overflow-hidden hover:border-red-600/30 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Service Header Image */}
              <div className="relative aspect-video w-full overflow-hidden border-b border-white/10">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover filter brightness-75 group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                
                {/* Floating Icon Indicator */}
                <div className="absolute bottom-4 left-4 bg-red-600 p-3 rounded-none shadow-none">
                  <GymIcon name={service.icon} className="h-5 w-5 text-white" />
                </div>
              </div>

              {/* Service Description Body */}
              <div className="p-6 flex-grow flex flex-col justify-between bg-gradient-to-br from-neutral-950 to-black">
                <div>
                  <h3 className="font-display font-black text-lg text-white uppercase tracking-wider mb-2 group-hover:text-red-500 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-zinc-400 font-sans text-xs leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-zinc-500 group-hover:text-red-500 transition-colors">
                  <span className="font-display">Includes Floor Guidance</span>
                  <LucideIcons.ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
