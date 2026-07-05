import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, ZoomIn } from 'lucide-react';
import { GalleryItem } from '../types';

interface WorkoutGalleryProps {
  gallery: GalleryItem[];
}

export default function WorkoutGallery({ gallery }: WorkoutGalleryProps) {
  const [filter, setFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const categories = [
    { value: 'all', label: 'ALL PHOTOS' },
    { value: 'equipment', label: 'MACHINES' },
    { value: 'cardio', label: 'CARDIO ZONE' },
    { value: 'workout', label: 'ATHLETES' },
    { value: 'general', label: 'INTERIORS' },
  ];

  const filteredItems = filter === 'all'
    ? gallery
    : gallery.filter(item => item.category === filter);

  // Keyboard close support for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="gallery" className="py-24 bg-zinc-900 text-white relative border-b border-white/10">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-red-500 font-display font-black text-xs tracking-widest uppercase block mb-2">
            VISUAL TOUR
          </span>
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 italic uppercase leading-none">
            WORKOUT GALLERY
          </h2>
          <p className="mt-4 text-zinc-400 font-sans text-sm leading-relaxed">
            Take a look inside National Gym. Inspect our heavy barbell stations, cardiovascular setups, functional training areas, and general gym hygiene.
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              className={`font-sans text-xs font-bold tracking-widest px-5 py-2.5 rounded-none border transition-all duration-200 uppercase ${
                filter === cat.value
                  ? 'bg-red-600 border-red-600 text-white shadow-none'
                  : 'bg-black border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative aspect-square rounded-none overflow-hidden border border-white/10 bg-black cursor-pointer shadow-none hover:border-red-600/30 transition-all duration-300"
                onClick={() => setSelectedImage(item)}
              >
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover filter brightness-75 group-hover:brightness-50 group-hover:scale-105 transition-all duration-500"
                  loading="lazy"
                />

                {/* Dark Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6" />

                {/* Zoom Icon indicator */}
                <div className="absolute top-4 right-4 bg-black border border-white/10 p-2.5 rounded-none opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <ZoomIn className="h-4 w-4 text-red-600" />
                </div>

                {/* Info Text */}
                <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-3 group-hover:translate-y-0">
                  <span className="text-[9px] font-black uppercase text-red-500 tracking-widest block mb-1">
                    {item.category}
                  </span>
                  <h4 className="font-display font-black text-sm text-white uppercase tracking-wider">
                    {item.title}
                  </h4>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/98 backdrop-blur-md flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
              aria-label="Image Lightbox Modal"
              role="dialog"
            >
              {/* Close Button */}
              <button
                className="absolute top-6 right-6 bg-black border border-white/10 text-zinc-400 hover:text-white p-3 rounded-none transition-colors z-50 hover:bg-zinc-900"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
                aria-label="Close Lightbox"
              >
                <X className="h-6 w-6" />
              </button>

              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                transition={{ duration: 0.3 }}
                className="relative max-w-4xl max-h-[80vh] w-full flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  className="max-w-full max-h-[70vh] object-contain rounded-none border border-white/10 shadow-2xl"
                />
                
                <div className="mt-4 text-center max-w-lg bg-black px-6 py-3 rounded-none border border-white/10 backdrop-blur">
                  <span className="text-[9px] font-black uppercase text-red-500 tracking-widest">
                    Category: {selectedImage.category}
                  </span>
                  <h3 className="font-display font-black text-base text-white mt-0.5 uppercase tracking-wider">
                    {selectedImage.title}
                  </h3>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
