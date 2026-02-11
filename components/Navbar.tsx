
import React from 'react';
import { Logo } from './Logo';

interface NavbarProps {
  currentView: 'game' | 'rules' | 'about';
  setView: (view: 'game' | 'rules' | 'about') => void;
  score: number;
  onLogoClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setView, score, onLogoClick }) => {
  const navItems = [
    { id: 'game', label: 'Play' },
    { id: 'rules', label: 'Rules' },
    { id: 'about', label: 'About' },
  ] as const;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-rose-100 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
        <div 
          className="cursor-pointer group"
          onClick={onLogoClick}
        >
          <Logo />
        </div>
        
        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden sm:flex gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`
                  relative px-3 py-2 text-sm font-bold uppercase tracking-wider transition-all
                  ${currentView === item.id ? 'text-[#bc002d]' : 'text-gray-500 hover:text-gray-900'}
                `}
              >
                {item.label}
                {currentView === item.id && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#bc002d] rounded-full animate-in slide-in-from-left duration-300"></div>
                )}
              </button>
            ))}
          </div>

          <div className="bg-gray-900 text-white px-4 py-2 rounded-full font-black flex items-center gap-2 shadow-lg scale-90 sm:scale-100">
            <span className="text-[10px] text-gray-400 uppercase">Score</span>
            <span className="text-[#ffb7c5]">{score}</span>
          </div>
        </div>
      </div>
    </nav>
  );
};
