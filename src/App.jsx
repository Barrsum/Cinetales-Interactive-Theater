import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { moviesData } from './data/movies';
import Stage from './components/Stage';
import MoviePlayer from './components/MoviePlayer';

const GithubIcon = ({ size = 24 }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>;
const LinkedinIcon = ({ size = 24 }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;

function App() {
  const [view, setView] = useState('home');
  const[activeMovie, setActiveMovie] = useState(null);

  const baseTheme = "bg-[#080505] text-[#e8d8c8] border-white/10"; 
  const currentTheme = activeMovie ? activeMovie.themeClass : baseTheme;

  return (
    <div className={`theme-transition h-[100dvh] w-[100vw] flex flex-col relative overflow-hidden ${currentTheme}`}>
      <div className="film-grain" />

      {/* HEADER WITH "MADE BY RAM BAPAT" */}
      <header className="theme-transition w-full py-3 px-4 md:py-4 md:px-8 flex justify-between items-center z-50 border-b border-current/10 relative flex-shrink-0">
        <div className="flex flex-col">
          <h1 className="font-display text-2xl md:text-2xl font-bold tracking-[0.2em] uppercase leading-none">
            CineTales
          </h1>
          <span className="font-story text-[16px] md:text-base opacity-60 tracking-widest uppercase mt-1"> Made by Ram Bapat</span>
        </div>

        {view === 'playing' && (
          <button onClick={() => { setActiveMovie(null); setView('marquee'); }} className="flex items-center gap-2 font-display uppercase tracking-widest text-[10px] md:text-xs opacity-70 hover:opacity-100 transition-opacity">
            <ArrowLeft size={16} /> <span className="hidden md:inline">Leave Theater</span>
          </button>
        )}
      </header>

      <main className="flex-1 min-h-0 relative flex items-center justify-center w-full">
        <AnimatePresence mode="wait">
          {view !== 'playing' ? (
            <Stage key="stage" view={view} setView={setView} movies={moviesData} onSelectMovie={(m) => { setActiveMovie(m); setView('playing'); }} />
          ) : (
            <MoviePlayer key="player" movie={activeMovie} onLeave={() => { setActiveMovie(null); setView('marquee'); }} />
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER WITH ENGINEERED CREDIT & OPEN SOURCE BADGE */}
      <footer className="theme-transition w-full py-3 px-4 md:py-4 md:px-8 flex justify-between items-center z-50 border-t border-current/10 relative flex-shrink-0">
        <span className="font-story text-[14px] md:text-sm tracking-wide opacity-70 max-w-[50%] md:max-w-none leading-snug">
          Engineered & designed by <span className="font-bold opacity-100">Ram Bapat</span>
        </span>
        
        <div className="flex items-center gap-3 md:gap-6 opacity-80">
          {/* Premium Open Source Capsule */}
          <div className="flex items-center gap-1.5 md:gap-2 px-2 py-1 md:px-3 md:py-1 border border-current/30 rounded-full text-[10px] md:text-[10px] tracking-widest uppercase whitespace-nowrap">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#22c55e] shadow-[0_0_8px_#22c55e]"></span>
            Open Source
          </div>
          <a href="https://github.com/Barrsum/Cinetales-Interactive-Theater.git" target="_blank" rel="noreferrer" className="hover:opacity-100 hover:scale-110 transition-all"><GithubIcon size={18} /></a>
          <a href="https://www.linkedin.com/in/ram-bapat-barrsum-diamos" target="_blank" rel="noreferrer" className="hover:opacity-100 hover:scale-110 transition-all"><LinkedinIcon size={18} /></a>
        </div>
      </footer>
    </div>
  );
}

export default App;