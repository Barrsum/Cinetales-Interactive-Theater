import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronRight, ChevronLeft } from 'lucide-react';

export default function Theater({ movie, onExit }) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const frame = movie.frames[currentFrame];

  const nextFrame = () => {
    if (currentFrame < movie.frames.length - 1) setCurrentFrame(prev => prev + 1);
  };

  const prevFrame = () => {
    if (currentFrame > 0) setCurrentFrame(prev => prev - 1);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className={`min-h-screen w-full flex flex-col justify-center items-center relative transition-colors duration-1000 ${movie.themeClass}`}
    >
      {/* Top Navigation */}
      <div className="absolute top-0 left-0 w-full p-8 flex justify-between items-center z-50">
        <button 
          onClick={onExit}
          className="flex items-center gap-2 font-display uppercase tracking-widest text-xs opacity-70 hover:opacity-100 transition-opacity"
        >
          <ArrowLeft size={16} /> Exit Theater
        </button>
        <div className="font-story tracking-widest text-sm opacity-50">
          {movie.index} — {movie.title}
        </div>
      </div>

      {/* Main Screen */}
      <div className="w-full max-w-6xl px-4 flex flex-col md:flex-row items-center gap-12 z-20">
        
        {/* Image Container */}
        <div className="w-full md:w-2/3 relative group">
          <AnimatePresence mode="wait">
            <motion.img
              key={frame.id}
              src={frame.image}
              alt={`Frame ${frame.id}`}
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="w-full aspect-video object-cover shadow-2xl rounded-sm"
            />
          </AnimatePresence>
        </div>

        {/* Text Container */}
        <div className="w-full md:w-1/3 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={frame.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-story text-xl md:text-2xl leading-relaxed"
            >
              {frame.text}
            </motion.p>
          </AnimatePresence>

          {/* Controls */}
          <div className="mt-12 flex items-center gap-6">
            <button 
              onClick={prevFrame} 
              disabled={currentFrame === 0}
              className="p-3 border border-current rounded-full opacity-50 hover:opacity-100 disabled:opacity-20 transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="font-display font-bold text-lg">
              {currentFrame + 1} / {movie.frames.length}
            </div>
            <button 
              onClick={nextFrame} 
              disabled={currentFrame === movie.frames.length - 1}
              className={`p-3 rounded-full text-cinema-900 transition-all disabled:opacity-20 ${movie.accentClass}`}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20">
        <motion.div 
          className={`h-full ${movie.accentClass}`}
          initial={{ width: 0 }}
          animate={{ width: `${((currentFrame + 1) / movie.frames.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.div>
  );
}