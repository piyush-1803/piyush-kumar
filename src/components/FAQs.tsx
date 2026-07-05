import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { FAQItem } from '../types';

interface FAQsProps {
  faqs: FAQItem[];
}

export default function FAQs({ faqs }: FAQsProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { value: 'all', label: 'All Questions' },
    { value: 'general', label: 'Hours & Access' },
    { value: 'membership', label: 'Plans & Price' },
    { value: 'facilities', label: 'Machines & Amenity' },
    { value: 'trainers', label: 'Coaching Guide' },
  ];

  const filteredFaqs = activeCategory === 'all'
    ? faqs
    : faqs.filter(faq => faq.category === activeCategory);

  const toggleFAQ = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section id="faqs" className="py-24 bg-zinc-900 text-white relative border-b border-white/10">
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-red-500 font-display font-black text-xs tracking-widest uppercase block mb-2">
            GOT QUESTIONS?
          </span>
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 italic uppercase leading-none">
            FREQUENTLY ASKED INQUIRIES
          </h2>
          <p className="mt-4 text-zinc-400 font-sans text-sm leading-relaxed">
            Everything you need to know about starting your fitness journey at National Gym. Browse categorized answers regarding membership, lockers, coaching, and rules.
          </p>
        </div>

        {/* Categories Tab selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 max-w-3xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                setActiveCategory(cat.value);
                setActiveId(null);
              }}
              className={`font-sans text-xs font-bold tracking-wider px-4 py-2 rounded-none border transition-all duration-200 uppercase ${
                activeCategory === cat.value
                  ? 'bg-red-600 border-red-600 text-white shadow-none'
                  : 'bg-black border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion Layout */}
        <div className="max-w-3xl mx-auto space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = activeId === faq.id;
            return (
              <div
                key={faq.id}
                className={`bg-black border rounded-none overflow-hidden transition-colors duration-200 ${
                  isOpen ? 'border-red-600/30' : 'border-white/10 hover:border-white/20'
                }`}
              >
                {/* Trigger */}
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start space-x-3 pr-4">
                    <HelpCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                    <span className="font-display font-black text-xs md:text-sm text-white uppercase tracking-wider">
                      {faq.question}
                    </span>
                  </div>
                  <div>
                    {isOpen ? (
                      <ChevronUp className="h-5 w-5 text-red-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-zinc-500" />
                    )}
                  </div>
                </button>

                {/* Content Panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-white/5 text-zinc-400 text-xs font-sans leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
