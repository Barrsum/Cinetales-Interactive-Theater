import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Lobby({ movies, onSelectMovie }) {
  const [hoveredMovie, setHoveredMovie] = useState(movies[0]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="relative min-h-screen w-full flex flex-col justify-center px-8 md:px-24 py-20"
    >
      {/* Background Poster Reveal */}
      <AnimatePresence>
        <motion.div
          key={hoveredMovie.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.3, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${hoveredMovie.posterImg})` }}
        />
      </AnimatePresence>
      
      {/* Vignette Overlay to ensure text is readable */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-cinema-900 via-cinema-900/80 to-transparent" />

      <div className="relative z-20 max-w-5xl">
        <motion.p 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="font-story uppercase tracking-[0.3em] text-cinema-gold text-sm mb-12"
        >
          Select a feature presentation
        </motion.p>

        <ul className="flex flex-col gap-8 md:gap-12">
          {movies.map((movie, idx) => (
            <motion.li 
              key={movie.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.8, ease: "easeOut" }}
              onMouseEnter={() => setHoveredMovie(movie)}
              className="group flex items-baseline gap-6 cursor-pointer"
              onClick={() => onSelectMovie(movie)}
            >
              <span className="font-story text-xl md:text-2xl text-white/30 group-hover:text-cinema-gold transition-colors duration-500">
                {movie.index}
              </span>
              <h2 className="font-display font-bold text-5xl md:text-8xl tracking-tight text-white/60 group-hover:text-white transition-all duration-500 group-hover:translate-x-4">
                {movie.title}
              </h2>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}