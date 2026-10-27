import React from 'react';

const HEARTS = ["♥", "♡", "💖", "✨", "♥", "🌸", "♡", "💕", "♥", "✧", "♡", "💌"];

export function FloatingHearts() {
  return (
    <div className="heart-field" aria-hidden="true">
      {HEARTS.map((h, i) => (
        <span
          key={i}
          style={{
            left: `${(i * 15 + 6) % 96}%`,
            animationDelay: `${(i % 7) * -1.6}s`,
            animationDuration: `${9 + (i % 5) * 2.5}s`,
            fontSize: `${18 + (i % 4) * 5}px`,
            opacity: 0.2 + (i % 3) * 0.15,
          }}
        >
          {h}
        </span>
      ))}
    </div>
  );
}

export default FloatingHearts;
