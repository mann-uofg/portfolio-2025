import React, { useState, useEffect, useRef } from 'react';

interface Props {
  text: string;
  className?: string;
  trigger?: boolean; // Optional trigger to restart effect
}

const CHARS = "-_~`!@#$%^&*()+=[]{}|;:,.<>?/0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const TextScramble: React.FC<Props> = ({ text, className, trigger = true }) => {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scramble = () => {
    let iteration = 0;
    clearInterval(intervalRef.current as NodeJS.Timeout);

    intervalRef.current = setInterval(() => {
      setDisplayText(prev => 
        text.split("").map((letter, index) => {
          if (index < iteration) return text[index];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join("")
      );

      if (iteration >= text.length) {
        clearInterval(intervalRef.current as NodeJS.Timeout);
      }
      iteration += 1 / 3;
    }, 30);
  };

  // Scramble on mount or when trigger changes
  useEffect(() => {
    if (trigger) scramble();
  }, [trigger]);

  return (
    <span 
      className={className} 
      onMouseEnter={scramble}
    >
      {displayText}
    </span>
  );
};