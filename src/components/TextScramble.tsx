import React, { useEffect, useState, useRef } from 'react';

interface TextScrambleProps {
  text: string;
  className?: string;
  autoStart?: boolean;
}

const GLYPHS = '0123456789ABCDEF!@#$%^&*<>[]{}~=+_/\\';

export const TextScramble: React.FC<TextScrambleProps> = ({
  text,
  className = '',
  autoStart = true,
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isScrambling, setIsScrambling] = useState(false);
  const frameRef = useRef<number | null>(null);

  const scramble = () => {
    let iteration = 0;
    const maxIterations = text.length * 3;
    setIsScrambling(true);

    if (frameRef.current) cancelAnimationFrame(frameRef.current);

    const step = () => {
      iteration++;
      const revealedCount = Math.floor((iteration / maxIterations) * text.length);

      const nextText = text
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          if (index < revealedCount) {
            return text[index];
          }
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join('');

      setDisplayText(nextText);

      if (revealedCount < text.length) {
        frameRef.current = requestAnimationFrame(step);
      } else {
        setDisplayText(text);
        setIsScrambling(false);
      }
    };

    frameRef.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    if (autoStart) {
      const timer = setTimeout(() => {
        scramble();
      }, 250);
      return () => {
        clearTimeout(timer);
        if (frameRef.current) cancelAnimationFrame(frameRef.current);
      };
    } else {
      setDisplayText(text);
    }
  }, [text, autoStart]);

  return (
    <span
      onClick={() => !isScrambling && scramble()}
      className={`font-mono cursor-pointer select-none transition-colors duration-200 ${className} ${
        isScrambling ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]' : ''
      }`}
      title="Click to re-scramble cryptographic signature"
    >
      {displayText || text}
    </span>
  );
};
