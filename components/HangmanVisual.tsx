
import React from 'react';

interface HangmanVisualProps {
  wrongCount: number;
}

export const HangmanVisual: React.FC<HangmanVisualProps> = ({ wrongCount }) => {
  const inkColor = "#1a1a2e";
  const accentRed = "#bc002d";

  return (
    <div className="relative w-80 h-[400px] flex items-center justify-center bg-white/40 rounded-3xl border border-rose-50 backdrop-blur-sm shadow-xl">
      <svg viewBox="0 0 200 250" className="w-full h-full p-6 drop-shadow-md">
        {/* Centered Gallows */}
        <path d="M 40 230 Q 100 220 160 230" fill="none" stroke={inkColor} strokeWidth="3" strokeLinecap="round" />
        <path d="M 50 230 L 50 30" fill="none" stroke={inkColor} strokeWidth="4" strokeLinecap="round" />
        <path d="M 50 30 L 120 30" fill="none" stroke={inkColor} strokeWidth="4" strokeLinecap="round" />
        <path d="M 120 30 L 120 50" fill="none" stroke={inkColor} strokeWidth="2" strokeDasharray="4 2" />
        
        {/* Samurai Head with Topknot (Wrong 1) */}
        {wrongCount >= 1 && (
          <g className="animate-in fade-in duration-500">
            {/* Face */}
            <circle cx="120" cy="75" r="18" stroke={inkColor} strokeWidth="2.5" fill="none" />
            {/* Topknot (Chonmage) */}
            <path d="M 120 57 Q 120 45 130 50" fill="none" stroke={inkColor} strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="130" cy="50" r="2" fill={inkColor} />
          </g>
        )}

        {/* Samurai Torso / Kimono (Wrong 2) */}
        {wrongCount >= 2 && (
          <path 
            d="M 120 93 L 100 150 L 140 150 Z" 
            fill="none" 
            stroke={inkColor} 
            strokeWidth="3" 
            strokeLinecap="round" 
            className="animate-in slide-in-from-top duration-500" 
          />
        )}

        {/* Wide Sleeves (Wrong 3 & 4) */}
        {wrongCount >= 3 && (
          <path 
            d="M 110 110 Q 90 115 85 140" 
            fill="none" 
            stroke={inkColor} 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            className="animate-in slide-in-from-right duration-500" 
          />
        )}
        {wrongCount >= 4 && (
          <path 
            d="M 130 110 Q 150 115 155 140" 
            fill="none" 
            stroke={inkColor} 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            className="animate-in slide-in-from-left duration-500" 
          />
        )}

        {/* Hakama Legs (Wrong 5 & 6) */}
        {wrongCount >= 5 && (
          <path 
            d="M 110 150 L 100 200" 
            fill="none" 
            stroke={inkColor} 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            className="animate-in slide-in-from-top duration-500" 
          />
        )}
        {wrongCount >= 6 && (
          <g className="animate-in slide-in-from-top duration-500">
            <path d="M 130 150 L 140 200" fill="none" stroke={inkColor} strokeWidth="2.5" strokeLinecap="round" />
            {/* Final mark - honor lost */}
            <circle cx="120" cy="75" r="4" fill={accentRed} className="animate-pulse" />
            {/* Fallen Katana */}
            <path d="M 70 210 L 170 215" fill="none" stroke={inkColor} strokeWidth="1" strokeDasharray="5 2" className="opacity-40" />
          </g>
        )}
      </svg>
    </div>
  );
};
