import { motion } from 'motion/react';
import { Star, MessageSquare } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialsProps {
  testimonials: Testimonial[];
  rating: number;
  reviewCount: number;
}

export default function Testimonials({ testimonials, rating, reviewCount }: TestimonialsProps) {
  return (
    <section id="testimonials" className="py-24 bg-zinc-950 text-white relative border-b border-white/10">
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-8">
            <span className="text-red-500 font-display font-black text-xs tracking-widest uppercase block mb-2">
              MEMBER VOICES
            </span>
            <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 italic uppercase leading-none">
              WHAT OUR GYM MEMBERS SAY
            </h2>
            <p className="mt-4 text-zinc-400 font-sans text-sm leading-relaxed max-w-2xl">
              Real feedback from real people in Bhurkunda. We take immense pride in helping our local fitness family transform their bodies, minds, and health habits.
            </p>
          </div>

          {/* Average Rating Scorecard */}
          <div className="lg:col-span-4 bg-black border border-white/10 p-6 rounded-none text-center flex flex-col items-center justify-center shadow-none hover:border-red-600/30 transition-all duration-300">
            <span className="text-[10px] font-black text-zinc-400 font-sans tracking-widest mb-1 uppercase">
              Google Maps Rating
            </span>
            
            <div className="flex items-baseline space-x-1">
              <span className="font-display font-black text-5xl text-white italic">
                {rating}
              </span>
              <span className="text-zinc-500 font-mono text-lg">/ 5</span>
            </div>

            {/* Stars */}
            <div className="flex items-center text-amber-500 my-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-amber-500 text-amber-500" />
              ))}
            </div>

            <p className="text-[10px] text-zinc-400 font-sans mt-1 uppercase tracking-wider">
              Based on <strong className="text-white">{reviewCount} Verified Reviews</strong>
            </p>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((test, idx) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-black border border-white/10 p-6 rounded-none flex flex-col justify-between hover:border-red-600/30 transition-all duration-200"
            >
              <div>
                {/* Quote Icon & Stars */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex text-amber-500">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                    ))}
                    {[...Array(5 - test.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-zinc-800" />
                    ))}
                  </div>
                  <MessageSquare className="h-5 w-5 text-red-600/20" />
                </div>

                {/* Comment Text */}
                <p className="text-zinc-300 font-sans text-xs md:text-sm italic leading-relaxed mb-6">
                  "{test.comment}"
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="pt-4 border-t border-white/5 flex items-center space-x-3">
                <img
                  src={test.image}
                  alt={test.name}
                  className="h-10 w-10 rounded-none object-cover border border-white/10"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-display font-black text-xs text-white uppercase tracking-wider">
                    {test.name}
                  </h4>
                  <div className="flex space-x-2 text-[9px] text-zinc-500 font-mono uppercase tracking-wider">
                    <span>{test.role}</span>
                    <span>•</span>
                    <span>{test.date}</span>
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
