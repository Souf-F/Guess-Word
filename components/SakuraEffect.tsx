
import React, { useMemo } from 'react';

export const SakuraEffect: React.FC = () => {
  const petals = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 10}s`,
      duration: `${10 + Math.random() * 20}s`,
      size: `${10 + Math.random() * 15}px`,
      opacity: 0.4 + Math.random() * 0.5
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((p) => (
        <div
          key={p.id}
          className="sakura sakura-anim"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
            opacity: p.opacity,
            top: '-5%',
          }}
        />
      ))}
    </div>
  );
};
