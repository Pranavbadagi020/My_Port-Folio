import React, { useEffect, useRef } from 'react';

interface SpotlightBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

export const SpotlightBackground: React.FC<SpotlightBackgroundProps> = ({ children, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      containerRef.current.style.setProperty('--mouse-x', `${x}px`);
      containerRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden ${className}`}
      style={
        {
          '--mouse-x': '50%',
          '--mouse-y': '40%',
        } as React.CSSProperties
      }
    >
      {/* Background Dot Grid */}
      <div 
        className="absolute inset-0 pointer-events-none bg-grid-pattern opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]" 
      />

      {/* Dynamic Cursor Spotlight Radial Glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-70"
        style={{
          background: `radial-gradient(650px circle at var(--mouse-x) var(--mouse-y), rgba(34, 211, 238, 0.08), rgba(16, 185, 129, 0.03), transparent 70%)`,
        }}
      />

      {/* Secondary ambient ambient glows */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-[60%] -left-40 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Actual Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
