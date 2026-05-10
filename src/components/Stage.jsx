import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

// Custom Hand/Finger SVG for the swipe animation
const SwipeHandIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 13v-8.5a1.5 1.5 0 0 1 3 0v7.5" />
    <path d="M11 11.5v-2a1.5 1.5 0 0 1 3 0v2" />
    <path d="M14 10.5v-1.5a1.5 1.5 0 0 1 3 0v2.5" />
    <path d="M17 11.5v-1.5a1.5 1.5 0 0 1 3 0v4.5a6 6 0 0 1-6 6h-2c-2.54 0-4.9-1.29-6.32-3.41l-1.5-2.25a1.5 1.5 0 0 1 2.5-1.68l2.32 3.48v-11.14a1.5 1.5 0 0 1 3 0v7" />
  </svg>
);

export default function Stage({ view, setView, movies, onSelectMovie }) {
  const isHome = view === 'home';

  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden">
      
      {/* EPIC CURTAINS WITH STRICT UX TIMING */}
      <motion.div className="curtain-panel absolute top-0 left-0 w-[50vw] h-full z-30 origin-left"
        initial={{ scaleX: 1 }} animate={{ scaleX: isHome ? 1 : 0.05 }} 
        /* If going home (closing): wait 0.5s for posters to vanish. If leaving home (opening): wait 0.4s for plaque to vanish */
        transition={{ duration: 1.8, ease:[0.22, 1, 0.36, 1], delay: isHome ? 0.5 : 0.4 }} />
        
      <motion.div className="curtain-panel curtain-panel-right absolute top-0 right-0 w-[50vw] h-full z-30 origin-right"
        initial={{ scaleX: 1 }} animate={{ scaleX: isHome ? 1 : 0.05 }} 
        transition={{ duration: 1.8, ease:[0.22, 1, 0.36, 1], delay: isHome ? 0.5 : 0.4 }} />

      <div className="relative z-40 w-full max-w-6xl px-0 md:px-12 flex flex-col justify-center items-center h-full">
        <AnimatePresence mode="wait">
          
          {/* HOME SCREEN PLAQUE */}
          {isHome && (
            <motion.div key="home-plaque"
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} 
              /* Exit FAST when Admitting one. Enter LATE when returning to Box Office */
              exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)", transition: { duration: 0.4 } }} 
              transition={{ duration: 0.8, delay: 1.4 }}
              className="gold-trim-box p-6 md:p-16 max-w-2xl w-[90%] md:w-full text-center flex flex-col items-center mx-auto shadow-[0_0_80px_rgba(0,0,0,0.8)]"
            >
              <h2 className="font-story italic text-[#D4AF37] text-lg md:text-xl mb-1 md:mb-2">A Project By Ram Bapat</h2>
              <h1 className="font-display text-4xl md:text-7xl font-bold tracking-[0.15em] text-white uppercase mb-4 md:mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">CineTales</h1>
              <div className="w-16 md:w-24 h-[1px] bg-[#D4AF37]/50 mb-4 md:mb-8" />
              <p className="font-story text-base md:text-xl text-white/80 leading-relaxed mb-6 md:mb-10">
                Welcome to a premium interactive theater experience. We currently have three exclusive shows running tonight. Admission is absolutely free! take your seat.
              </p>
              <button onClick={() => setView('marquee')} className="px-8 py-3 md:px-12 md:py-4 bg-[#D4AF37]/10 border border-[#D4AF37] text-[#D4AF37] font-display uppercase text-sm md:text-base tracking-[0.2em] hover:bg-[#D4AF37] hover:text-black transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                Admit One
              </button>
            </motion.div>
          )}

          {/* NOW SHOWING MARQUEE */}
          {!isHome && (
            <motion.div key="movie-selection"
              className="w-full h-full flex flex-col items-center justify-center py-6 relative"
              /* Enters after curtains open, EXITS FAST when returning to Box Office */
              initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 1, delay: 0.8 } }} 
              exit={{ opacity: 0, transition: { duration: 0.4 } }} 
            >
              <div className="flex flex-col items-center mb-4 md:mb-10 shrink-0 mt-2 md:mt-0">
                <button onClick={() => setView('home')} className="flex items-center gap-2 font-display uppercase text-sm md:text-xs text-[#D4AF37]/70 hover:text-[#D4AF37] transition-all mb-2 md:mb-4">
                  <ArrowLeft size={14} /> Back to Box Office
                </button>
                <h2 className="font-display text-lg md:text-3xl text-white/50 tracking-[0.4em] uppercase flex items-center gap-2 md:gap-4">
                  <span className="w-6 md:w-12 h-[1px] bg-white/20" /> Now Showing <span className="w-6 md:w-12 h-[1px] bg-white/20" />
                </h2>
              </div>

              {/* POSTER CAROUSEL */}
              <div className="w-full flex-1 min-h-0 flex overflow-x-auto md:overflow-visible snap-x snap-mandatory px-12 md:px-0 gap-8 md:gap-10 md:justify-center items-center [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none' }}>
                {movies.map((movie, idx) => (
                    <motion.div key={movie.id}
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 + (idx * 0.15), duration: 0.8 }}
                    onClick={() => onSelectMovie(movie)}
                    /* FIX: Changed md:w-1/3 to md:w-[28%] so the 3 posters + gaps fit perfectly inside 100% width! */
                    className="group cursor-pointer flex flex-col items-center flex-shrink-0 w-[75vw] max-w-[320px] md:max-w-none md:w-[28%] snap-center"
                    >
                    <div className="w-full aspect-[2/3] border border-white/20 group-hover:border-[#d4af37] p-2 bg-black/40 transition-all duration-500 rounded-sm shadow-2xl overflow-hidden">
                        <img src={movie.posterImg} alt={movie.title} className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-700" />
                    </div>
                    <div className="flex flex-col text-center w-full">
                        <h3 className="mt-6 md:mt-8 font-display text-[20px] md:text-xl text-white/90 group-hover:text-[#d4af37] tracking-widest uppercase transition-colors">
                        {movie.title}
                        </h3>
                        <p className="font-story text-xs md:text-sm text-white/50 mt-2 italic md:hidden">
                        Tap to watch
                        </p>
                    </div>
                    </motion.div>
                ))}
                </div>

              {/* MOBILE SWIPE HINT ANIMATION (Only visible on small screens) */}
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}
                className="flex md:hidden flex-col items-center justify-center mt-2 text-[#D4AF37]/60 shrink-0"
              >
                <motion.div
                  animate={{ x:[10, -10, 10] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  <SwipeHandIcon />
                </motion.div>
                <span className="font-display text-[8px] tracking-[0.2em] uppercase mt-1">Swipe to explore</span>
              </motion.div>

            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
