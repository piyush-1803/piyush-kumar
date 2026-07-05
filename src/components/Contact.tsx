import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { GymDetails } from '../types';

interface ContactProps {
  details: GymDetails;
  selectedPlan: string;
  onFormSubmit: (data: { name: string; email: string; phone: string; message: string }) => Promise<boolean>;
}

export default function Contact({ details, selectedPlan, onFormSubmit }: ContactProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto pre-fill message if user selects a plan from the plans list
  useEffect(() => {
    if (selectedPlan) {
      setMessage(`Hi Coach! I'm interested in joining the "${selectedPlan}". Please let me know how I can get started with my first session.`);
      
      // Scroll to the contact form smoothly
      const element = document.querySelector('#contact');
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
    }
  }, [selectedPlan]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      setError('Please fill in Name, Phone, and your Message.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await onFormSubmit({ name, email, phone, message });
      if (res) {
        setSuccess(true);
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
      } else {
        setError('Failed to submit. Please try calling us directly or try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-zinc-950 text-white relative border-b border-white/10">
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-red-500 font-display font-black text-xs tracking-widest uppercase block mb-2">
            LOCATE & CONTACT US
          </span>
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 italic uppercase leading-none">
            START YOUR TRANSFORMATION
          </h2>
          <p className="mt-4 text-zinc-400 font-sans text-sm leading-relaxed">
            Drop by for a 1-day free trial session. Send us an online message or dial Coach Vikash directly to lock in your membership slot today.
          </p>
        </div>

        {/* Form and Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          
          {/* Details & Map Column */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact cards */}
            <div className="bg-black border border-white/10 rounded-none p-6 space-y-5">
              
              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="bg-white/5 p-2.5 rounded-none border border-white/10 text-red-600 shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display font-black text-xs text-white tracking-wider uppercase">Gym Location</h4>
                  <p className="text-zinc-400 font-sans text-xs leading-relaxed mt-1">{details.address}</p>
                  <span className="block text-[10px] font-black text-zinc-500 font-mono mt-1 uppercase tracking-wider">
                    Google Plus Code: {details.mapsPlusCode}
                  </span>
                </div>
              </div>

              {/* Call */}
              <div className="flex items-start space-x-4">
                <div className="bg-white/5 p-2.5 rounded-none border border-white/10 text-red-600 shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display font-black text-xs text-white tracking-wider uppercase">Direct Phone Line</h4>
                  <a
                    href={`tel:${details.phone.replace(/\s+/g, '')}`}
                    className="block font-display font-black text-lg text-red-500 mt-1 hover:underline tracking-widest"
                  >
                    {details.phone}
                  </a>
                  <p className="text-zinc-500 text-[10px] font-sans uppercase">Tap to dial from mobile</p>
                </div>
              </div>

              {/* Timing */}
              <div className="flex items-start space-x-4">
                <div className="bg-white/5 p-2.5 rounded-none border border-white/10 text-red-600 shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display font-black text-xs text-white tracking-wider uppercase">Gym Hours</h4>
                  <p className="text-zinc-400 font-sans text-xs leading-relaxed mt-1">{details.hours}</p>
                </div>
              </div>

            </div>

            {/* Embedded map */}
            <div className="rounded-none overflow-hidden border border-white/10 h-64 bg-black relative shadow-none">
              <iframe
                title="National Gym Bhurkunda Location Map"
                src={details.mapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="filter invert contrast-125 brightness-75 hover:brightness-100 transition-all duration-500"
              />
            </div>

          </div>

          {/* Form Column */}
          <div className="lg:col-span-7 bg-black border border-white/10 p-8 rounded-none relative">
            <h3 className="font-display font-black text-xl text-white uppercase tracking-wider mb-2">
              SEND DIRECT INQUIRY
            </h3>
            <p className="text-xs text-zinc-400 font-sans mb-6">
              Our floor manager will contact you via WhatsApp or mobile phone to schedule your free tour.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="e.g., Rajesh Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-zinc-950 border border-white/10 rounded-none px-4 py-3 text-sm text-white focus:outline-none focus:border-red-600 font-sans"
                />
              </div>

              {/* Phone & Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                    WhatsApp/Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    placeholder="e.g., +91 87097 92657"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-zinc-950 border border-white/10 rounded-none px-4 py-3 text-sm text-white focus:outline-none focus:border-red-600 font-sans"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                    Email Address (Optional)
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="e.g., name@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-zinc-950 border border-white/10 rounded-none px-4 py-3 text-sm text-white focus:outline-none focus:border-red-600 font-sans"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                  Your Workout Slogan or Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  placeholder="Tell us about your fitness targets, previous training experience, or physical injuries..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-zinc-950 border border-white/10 rounded-none px-4 py-3 text-sm text-white focus:outline-none focus:border-red-600 font-sans resize-none"
                />
              </div>

              {/* Notifications feedback panel */}
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-red-600/5 border border-red-600/30 p-4 rounded-none flex items-start space-x-3 text-red-500 text-xs"
                  >
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}

                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-green-500/5 border border-green-500/30 p-4 rounded-none flex items-start space-x-3 text-green-400 text-xs"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0" />
                    <div>
                      <strong className="block font-bold">Inquiry Sent Successfully!</strong>
                      <span className="font-sans leading-normal">Our team will verify your trial details and notify you on WhatsApp shortly. See you at the iron rack!</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 font-sans font-black text-xs tracking-widest text-white py-4 rounded-none active:scale-98 transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer"
              >
                {loading ? (
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>SUBMIT RECRUITMENT FORM</span>
                    <Send className="h-3.5 w-3.5" />
                  </>
                )}
              </button>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
