
import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative w-12 h-12 flex items-center justify-center">
        <div className="absolute inset-0 bg-[#bc002d] rounded-lg rotate-45 shadow-lg"></div>
        <span className="relative z-10 text-white font-black text-xl">G</span>
      </div>
      <div className="flex flex-col leading-none">
        <span className="logo-font text-2xl font-black tracking-tight text-gray-900">GUESS</span>
        <span className="text-xs font-bold tracking-[0.3em] text-[#bc002d]">WORD</span>
      </div>
    </div>
  );
};
