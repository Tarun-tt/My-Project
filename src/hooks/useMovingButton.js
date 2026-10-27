import { useState, useCallback, useEffect } from 'react';
import { playBoingSound } from '../utils/soundEffects.js';

/**
 * Custom hook to manage an evasive button that playfully jumps
 * within the visible browser viewport and never disappears.
 */
export function useMovingButton(options = {}) {
  const {
    padding = 20,
    buttonWidth = 180,
    buttonHeight = 52,
    playSound = true,
  } = options;

  const [dodgeCount, setDodgeCount] = useState(0);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isMoved, setIsMoved] = useState(false);

  // Reset positioning when question / task changes
  const reset = useCallback(() => {
    setDodgeCount(0);
    setPosition({ top: 0, left: 0 });
    setIsMoved(false);
  }, []);

  const moveButton = useCallback(() => {
    if (typeof window === 'undefined') return;

    if (playSound) {
      playBoingSound();
    }

    // Gentle haptic feedback on mobile if supported
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate(35);
      } catch (e) {
        // ignore
      }
    }

    setDodgeCount((prev) => prev + 1);
    setIsMoved(true);

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Safety margins
    const effectiveWidth = Math.min(buttonWidth, vw - padding * 2);
    const effectiveHeight = Math.min(buttonHeight, vh - padding * 2);

    const minX = padding;
    const maxX = Math.max(minX, vw - effectiveWidth - padding);

    // Keep top within safe visible screen area (leave room for mobile address bar & header)
    const minY = Math.max(padding, 60);
    const maxY = Math.max(minY, vh - effectiveHeight - padding);

    // Generate random coordinates inside safe boundaries
    const newLeft = Math.floor(minX + Math.random() * (maxX - minX));
    const newTop = Math.floor(minY + Math.random() * (maxY - minY));

    setPosition({
      left: Math.max(minX, Math.min(newLeft, maxX)),
      top: Math.max(minY, Math.min(newTop, maxY)),
    });
  }, [padding, buttonWidth, buttonHeight, playSound]);

  // Handle window resize dynamically to keep button in viewport
  useEffect(() => {
    const handleResize = () => {
      if (!isMoved) return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const effectiveWidth = Math.min(buttonWidth, vw - padding * 2);
      const effectiveHeight = Math.min(buttonHeight, vh - padding * 2);

      const minX = padding;
      const maxX = Math.max(minX, vw - effectiveWidth - padding);
      const minY = Math.max(padding, 60);
      const maxY = Math.max(minY, vh - effectiveHeight - padding);

      setPosition((prev) => ({
        left: Math.max(minX, Math.min(prev.left, maxX)),
        top: Math.max(minY, Math.min(prev.top, maxY)),
      }));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMoved, padding, buttonWidth, buttonHeight]);

  return {
    dodgeCount,
    position,
    isMoved,
    moveButton,
    reset,
  };
}

export default useMovingButton;
