import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Calendar, User, Clock, ArrowRight, X } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogProps {
  blogs: BlogPost[];
}

export default function Blog({ blogs }: BlogProps) {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section id="blog" className="py-24 bg-zinc-950 text-white relative border-b border-white/10">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-80 h-80 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-red-500 font-display font-black text-xs tracking-widest uppercase block mb-2">
            LATEST ARTICLES
          </span>
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 italic uppercase leading-none">
            HEALTH & FITNESS INSIGHTS
          </h2>
          <p className="mt-4 text-zinc-400 font-sans text-sm leading-relaxed">
            Boost your training knowledge. Read our certified coach diaries discussing local dietary targets, safety compound lifting mechanics, and general lifestyle adjustments.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {blogs.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-black border border-white/10 rounded-none overflow-hidden hover:border-red-600/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Banner */}
                <div className="relative aspect-video w-full overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover filter brightness-75 group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-red-600 text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded-none">
                    {post.category}
                  </div>
                </div>

                {/* Body */}
                <div className="p-6">
                  {/* Meta items */}
                  <div className="flex items-center space-x-3 text-zinc-500 text-[9px] font-mono uppercase tracking-wider mb-3">
                    <span className="flex items-center">
                      <Calendar className="h-3.5 w-3.5 text-red-600 mr-1 shrink-0" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center">
                      <Clock className="h-3.5 w-3.5 text-red-600 mr-1 shrink-0" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-display font-black text-sm text-white uppercase tracking-wider group-hover:text-red-500 transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                  
                  <p className="mt-2 text-zinc-400 font-sans text-xs line-clamp-3 leading-relaxed">
                    {post.summary}
                  </p>
                </div>
              </div>

              {/* Read trigger footer */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => setSelectedPost(post)}
                  className="w-full border border-white/10 text-zinc-300 hover:text-white hover:bg-zinc-900 py-3 rounded-none text-xs font-bold font-sans uppercase tracking-widest flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Detailed Post Lightbox Drawer */}
        <AnimatePresence>
          {selectedPost && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/98 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
              onClick={() => setSelectedPost(null)}
            >
              <motion.div
                initial={{ y: 50, scale: 0.95 }}
                animate={{ y: 0, scale: 1 }}
                exit={{ y: 50, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-black border border-white/10 max-w-3xl w-full rounded-none overflow-hidden my-8"
                onClick={(e) => e.stopPropagation()}
              >
                
                {/* Banner block */}
                <div className="relative h-64 md:h-80 w-full">
                  <img
                    src={selectedPost.image}
                    alt={selectedPost.title}
                    className="w-full h-full object-cover filter brightness-50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                  
                  {/* Category overlay */}
                  <span className="absolute top-6 left-6 bg-red-600 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-none">
                    {selectedPost.category}
                  </span>

                  {/* Close trigger overlay */}
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="absolute top-6 right-6 bg-black border border-white/10 text-zinc-400 hover:text-white p-2.5 rounded-none hover:bg-zinc-900 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Post body contents */}
                <div className="p-6 md:p-8 space-y-6">
                  <div>
                    {/* Meta labels */}
                    <div className="flex items-center space-x-4 text-zinc-500 text-[10px] font-mono uppercase tracking-wider mb-3">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 text-red-600 mr-1.5" />
                        {selectedPost.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 text-red-600 mr-1.5" />
                        {selectedPost.readTime}
                      </span>
                      <span>•</span>
                      <span className="flex items-center">
                        <User className="h-4 w-4 text-red-600 mr-1.5" />
                        By {selectedPost.author}
                      </span>
                    </div>

                    <h2 className="font-display font-black text-xl md:text-2xl text-white uppercase tracking-wider">
                      {selectedPost.title}
                    </h2>
                  </div>

                  {/* Body Content */}
                  <div className="text-zinc-300 font-sans text-xs md:text-sm leading-relaxed whitespace-pre-wrap max-h-[40vh] overflow-y-auto pr-2">
                    {selectedPost.content}
                  </div>

                  {/* Footer guide */}
                  <div className="pt-6 border-t border-white/5 flex items-center justify-between text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
                    <span>National Gym Fitness Journal</span>
                    <button
                      onClick={() => setSelectedPost(null)}
                      className="text-red-500 font-black tracking-widest hover:underline uppercase"
                    >
                      Close Article
                    </button>
                  </div>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
