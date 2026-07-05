import { motion } from 'motion/react';
import { ShieldCheck, Dumbbell, Award, Flame } from 'lucide-react';
import { AboutSection } from '../types';

interface AboutProps {
  about: AboutSection;
}

export default function About({ about }: AboutProps) {
  const icons = [Award, Dumbbell, ShieldCheck, Flame];

  return (
    <section id="about" className="py-24 bg-zinc-950 text-white relative overflow-hidden border-b border-white/10">
      {/* Subtle glow background */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-red-600/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Collage Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-none overflow-hidden border border-white/10 bg-black">
              <img
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=700"
                alt="National Gym Iron weights"
                className="w-full object-cover aspect-[4/5] filter brightness-75 hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              
              {/* Overlaid Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-black/90 border border-white/10 p-5 rounded-none">
                <span className="text-red-500 text-[10px] font-black uppercase tracking-widest block mb-1.5">
                  NATIONAL GYM INTEGRITY
                </span>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  The most respected iron-pumping destination in Ramgarh/Bhurkunda district.
                </p>
              </div>
            </div>

            {/* Accent border floating background */}
            <div className="absolute -inset-2 border border-red-600/20 rounded-none -z-10 translate-x-4 translate-y-4" />
          </div>

          {/* Text Content Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-red-500 font-display font-black text-xs tracking-widest uppercase block mb-2">
                WHO WE ARE
              </span>
              <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 italic uppercase leading-none">
                {about.title}
              </h2>
              <p className="text-base font-bold text-zinc-300 mt-5 font-sans italic border-l-2 border-l-red-600 pl-4 leading-relaxed">
                "{about.headline}"
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 space-y-4 text-zinc-400 font-sans text-sm leading-relaxed"
            >
              <p>{about.mission}</p>
              <p>{about.description1}</p>
              <p>{about.description2}</p>
            </motion.div>

            {/* Stats Dashboard Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
              {about.stats.map((stat, idx) => {
                const IconComponent = icons[idx % icons.length];
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="bg-white/5 border border-white/10 p-4 rounded-none text-center flex flex-col items-center justify-center hover:border-white/20 transition-colors group"
                  >
                    <div className="bg-black p-2 rounded-none mb-3 border border-white/5 group-hover:bg-red-600/10 transition-colors">
                      <IconComponent className="h-4 w-4 text-red-600" />
                    </div>
                    <span className="block text-xl md:text-2xl font-display font-black text-white italic">
                      {stat.value}
                    </span>
                    <span className="block text-[9px] font-sans font-bold text-zinc-500 uppercase tracking-widest mt-1">
                      {stat.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
