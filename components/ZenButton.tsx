
import React from 'react';

interface ZenButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'danger';
}

export const ZenButton: React.FC<ZenButtonProps> = ({ 
  onClick, 
  children, 
  className = "", 
  variant = 'primary' 
}) => {
  const styles = {
    primary: 'bg-gray-900 text-white hover:bg-black shadow-xl shadow-gray-200',
    secondary: 'bg-[#ffb7c5] text-white hover:bg-[#ff9aa2] shadow-xl shadow-rose-100',
    danger: 'bg-[#bc002d] text-white hover:bg-red-800 shadow-xl shadow-red-100'
  };

  return (
    <button
      onClick={onClick}
      className={`
        relative px-10 py-4 font-black uppercase tracking-[0.2em] rounded-full transition-all duration-300 
        active:scale-95 hover:translate-y-[-2px] overflow-hidden group ${styles[variant]} ${className}
      `}
    >
      <span className="relative z-10 text-lg">{children}</span>
      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
    </button>
  );
};
