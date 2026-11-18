import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  download?: boolean | string;
  target?: string;
  rel?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  strength?: number;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  onClick,
  href,
  download,
  target,
  rel,
  variant = 'primary',
  strength = 0.25,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
    }
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics for crisp pullback
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = (clientX - centerX) * strength;
    const deltaY = (clientY - centerY) * strength;

    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseVariantStyles = {
    primary:
      'bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400/60 shadow-[0_0_20px_-3px_rgba(34,211,238,0.2)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]',
    secondary:
      'bg-zinc-900/80 hover:bg-zinc-800/90 text-zinc-200 border border-white/10 hover:border-white/20 hover:text-white',
    ghost:
      'bg-transparent hover:bg-white/5 text-zinc-300 hover:text-white border border-transparent hover:border-white/10',
  };

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: isTouchDevice ? 0 : smoothX, y: isTouchDevice ? 0 : smoothY }}
      className={`inline-flex items-center justify-center font-medium transition-colors duration-200 rounded-xl px-5 py-3 cursor-pointer select-none group text-sm ${baseVariantStyles[variant]} ${className}`}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a
        href={href}
        download={download}
        target={target}
        rel={rel}
        onClick={onClick}
        className="inline-block"
      >
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} type="button" className="inline-block bg-transparent p-0 border-0">
      {content}
    </button>
  );
};
