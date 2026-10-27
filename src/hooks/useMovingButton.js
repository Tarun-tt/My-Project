import { useState, useCallback, useEffect } from 'react';

/**
 * Custom hook to create a playful evasive button that moves away
 * whenever hovered, focused, clicked, or tapped.
 */
export function useMovingButton(options = {}) {
  const {
    padding = 24,
    buttonWidth = 170,
    buttonHeight = 56,
  } = options;

  const [dodgeCount, setDodgeCount] = useState(0);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isMoved, setIsMoved] = useState(false);

  // Reset positioning when needed (e.g. question changes)
  const reset = useCallback(() => {
    setDodgeCount(0);
    setPosition({ top: 0, left: 0 });
    setIsMoved(false);
  }, []);

  const moveButton = useCallback(() => {
    if (typeof window === 'undefined') return;

    setDodgeCount((prev) => prev + 1);
    setIsMoved(true);

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Available bounds inside viewport
    const maxX = Math.max(padding, viewportWidth - buttonWidth - padding);
    const maxY = Math.max(padding, viewportHeight - buttonHeight - padding);

    // Random safe coordinate
    const randomLeft = Math.floor(padding + Math.random() * (maxX - padding));
    const randomTop = Math.floor(padding + Math.random() * (maxY - padding));

    setPosition({
      left: Math.max(padding, Math.min(randomLeft, viewportWidth - buttonWidth - padding)),
      top: Math.max(padding, Math.min(randomTop, viewportHeight - buttonHeight - padding)),
    });
  }, [padding, buttonWidth, buttonHeight]);

  // Adjust coordinates if viewport resizes while button is active
  useEffect(() => {
    const handleResize = () => {
      if (!isMoved) return;
      setPosition((prev) => {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        return {
          left: Math.min(prev.left, Math.max(padding, viewportWidth - buttonWidth - padding)),
          top: Math.min(prev.top, Math.max(padding, viewportHeight - buttonHeight - padding)),
        };
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMoved, padding, buttonWidth, buttonHeight]);

  const getDodgeLabel = useCallback(
    (initialLabel = "No", dodges = []) => {
      if (!isMoved || dodgeCount === 0) return initialLabel;
      if (!dodges || dodges.length === 0) return `Dodged! (${dodgeCount}) 😜`;
      const index = (dodgeCount - 1) % dodges.length;
      return dodges[index];
    },
    [isMoved, dodgeCount]
  );

  return {
    dodgeCount,
    position,
    isMoved,
    moveButton,
    reset,
    getDodgeLabel,
  };
}

export default useMovingButton;
