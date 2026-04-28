import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Play, Pause, Film } from 'lucide-react';

export default function MoviePlayer({ movie, onLeave }) {
  const[currentFrame, setCurrentFrame] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const[autoPlaySpeed, setAutoPlaySpeed] = useState(5); 
  
  const frame = movie.frames[currentFrame];
  const isLastFrame = currentFrame === movie.frames.length - 1;

  const nextFrame = () => {
    if (!isLastFrame) setCurrentFrame(prev => prev + 1);
    else setIsAutoPlaying(false);
  };
  const prevFrame = () => currentFrame > 0 && setCurrentFrame(prev => prev - 1);
  const handleManualNext = () => { setIsAutoPlaying(false); nextFrame(); };
  const handleManualPrev = () => { setIsAutoPlaying(false); prevFrame(); };

  useEffect(() => {
    let interval;
    if (isAutoPlaying && !isLastFrame) interval = setInterval(nextFrame, autoPlaySpeed * 1000);
    return () => clearInterval(interval);
  },[isAutoPlaying, currentFrame, autoPlaySpeed, isLastFrame]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}
      className="w-full h-full max-w-6xl mx-auto px-4 py-3 md:py-6 flex flex-col items-center justify-between z-50 relative"
    >
      
      {/* 1. IMAGE & TEXT CONTAINER */}
      <div className="w-full flex-1 min-h-0 flex flex-col justify-center items-center mt-2">
        
        {/* IMAGE */}
        <div className="w-full flex-1 min-h-0 relative flex items-end justify-center md:items-center">
          <AnimatePresence mode="wait">
            <motion.img key={frame.id}
              src={frame.image} alt={`Frame ${frame.id}`}
              initial={{ opacity: 0, filter: 'blur(5px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} exit={{ opacity: 0, filter: 'blur(5px)' }} transition={{ duration: 0.8 }}
              /* w-auto and h-auto force the border to tightly hug the image without empty vertical space! */
              className="max-w-full max-h-full w-auto h-auto object-contain shadow-2xl border-2 border-current/20 rounded-md"
            />
          </AnimatePresence>
        </div>

        {/* TEXT */}
        {/* 👇 MANUAL GAP CONTROL: Change mb-[30px] to mb-[10px] or mb-[50px] to adjust distance between Text and Controls on Mobile! 👇 */}
        <div className="w-full max-w-4xl text-center px-4 flex-shrink-0 mt-4 md:mt-6 mb-[180px] md:mb-6">
          <AnimatePresence mode="wait">
            <motion.p key={frame.id}
              initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.5 }}
              /* Increased Mobile Font Size to 16px */
              className="font-story text-[24px] md:text-2xl leading-snug md:leading-relaxed tracking-wide opacity-90"
            >
              {frame.text}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* 2. CONTROLS / END SCREEN */}
      <div className="w-full flex-shrink-0 flex flex-col items-center justify-end mt-2 md:mt-4">
        <AnimatePresence mode="wait">
          {isLastFrame ? (
            <motion.div key="end-screen" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-3 py-2">
              <h3 className="font-display tracking-[0.3em] uppercase text-sm md:text-base opacity-70">The End</h3>
              <button 
                onClick={onLeave} 
                className={`flex items-center gap-3 px-8 py-3 md:px-12 md:py-4 rounded-sm font-display uppercase tracking-widest text-xs md:text-sm font-bold border border-current text-current hover:bg-white hover:text-black transition-all shadow-[0_0_20px_currentColor]`}
              >
                <Film size={18} /> Return to Shows
              </button>
            </motion.div>
          ) : (
            <motion.div key="controls" className="flex flex-col items-center w-full max-w-xl">
              
              <AnimatePresence>
                {isAutoPlaying && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="flex items-center gap-4 mb-2 overflow-hidden">
                    <span className="text-[10px] md:text-xs font-display uppercase tracking-widest opacity-50">Fast</span>
                    <input type="range" min="2" max="8" step="1" value={autoPlaySpeed} onChange={(e) => setAutoPlaySpeed(Number(e.target.value))} className="w-24 md:w-32 h-1 rounded-lg appearance-none cursor-pointer bg-current/20 accent-current" />
                    <span className="text-[10px] md:text-xs font-display uppercase tracking-widest opacity-50">Slow ({autoPlaySpeed}s)</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center justify-center gap-4 md:gap-8">
                <button onClick={handleManualPrev} disabled={currentFrame === 0} className="p-2 opacity-50 hover:opacity-100 disabled:opacity-10 transition-all">
                  <ChevronLeft size={28} />
                </button>

                <button onClick={() => setIsAutoPlaying(!isAutoPlaying)} className={`flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 border rounded-full transition-all ${isAutoPlaying ? `border-transparent text-cinema-900 ${movie.accentClass}` : 'border-current/50 opacity-70 hover:opacity-100'}`}>
                  {isAutoPlaying ? <Pause size={16} /> : <Play size={16} />}
                  <span className="font-display tracking-widest uppercase text-xs md:text-sm font-bold">
                    {isAutoPlaying ? 'Playing' : 'Auto-Play'}
                  </span>
                </button>

                <button onClick={handleManualNext} className="p-2 opacity-50 hover:opacity-100 transition-all">
                  <ChevronRight size={28} />
                </button>
              </div>

              <div className="mt-2 font-display text-[10px] md:text-xs tracking-[0.3em] opacity-40 uppercase">
                Frame {currentFrame + 1} of {movie.frames.length}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </motion.div>
  );
}