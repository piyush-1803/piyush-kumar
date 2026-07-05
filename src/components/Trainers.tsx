import { motion } from 'motion/react';
import { Award, Briefcase, Sparkles, CheckCircle2 } from 'lucide-react';
import { Trainer } from '../types';

interface TrainersProps {
  trainers: Trainer[];
}

export default function Trainers({ trainers }: TrainersProps) {
  return (
    <section id="trainers" className="py-24 bg-zinc-900 text-white relative border-b border-white/10">
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-red-500 font-display font-black text-xs tracking-widest uppercase block mb-2">
            EXPERTISE MATTERS
          </span>
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 italic uppercase leading-none">
            MEET OUR CERTIFIED COACHES
          </h2>
          <p className="mt-4 text-zinc-400 font-sans text-sm leading-relaxed">
            Train with highly knowledgeable strength and conditioning guides who correct your compound lift postures, craft customized diet plans, and hold you accountable.
          </p>
        </div>

        {/* Trainers grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {trainers.map((trainer, index) => (
            <motion.div
              key={trainer.id}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-black border border-white/10 rounded-none overflow-hidden hover:border-red-600/30 transition-all duration-300 grid grid-cols-1 sm:grid-cols-12"
            >
              
              {/* Photo Column */}
              <div className="sm:col-span-5 relative aspect-[4/5] sm:aspect-auto">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-full h-full object-cover filter brightness-90"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black via-transparent to-transparent" />
                
                {/* Float Experience Badge */}
                <div className="absolute top-4 left-4 bg-red-600 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-none shadow-none">
                  {trainer.experience} Exp
                </div>
              </div>

              {/* Bio Details Column */}
              <div className="sm:col-span-7 p-6 flex flex-col justify-between bg-gradient-to-br from-neutral-950 to-black">
                <div>
                  <span className="text-red-500 text-[10px] font-black uppercase tracking-widest block mb-1">
                    {trainer.role}
                  </span>
                  <h3 className="font-display font-black text-xl text-white uppercase tracking-wider">
                    {trainer.name}
                  </h3>

                  {/* Specialties Tag */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {trainer.specialties.map((spec) => (
                      <span
                        key={spec}
                        className="bg-white/5 border border-white/10 text-zinc-300 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-none flex items-center space-x-1"
                      >
                        <Sparkles className="h-2.5 w-2.5 text-red-600 fill-red-600" />
                        <span>{spec}</span>
                      </span>
                    ))}
                  </div>

                  {/* Certifications list */}
                  <div className="mt-6">
                    <span className="text-zinc-500 font-sans text-[10px] font-black uppercase tracking-wider block mb-2 flex items-center">
                      <Award className="h-3.5 w-3.5 mr-1 text-red-600" />
                      Certifications
                    </span>
                    <ul className="space-y-1.5">
                      {trainer.certifications.map((cert, idx) => (
                        <li key={idx} className="flex items-start text-[11px] text-zinc-400">
                          <CheckCircle2 className="h-3.5 w-3.5 text-red-600 mr-2 shrink-0 mt-0.5" />
                          <span className="font-sans leading-tight">{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-zinc-500 text-[10px] font-black uppercase tracking-wider">
                  <div className="flex items-center space-x-1.5">
                    <Briefcase className="h-3.5 w-3.5 text-red-600" />
                    <span>On-Floor Counseling Available</span>
                  </div>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
