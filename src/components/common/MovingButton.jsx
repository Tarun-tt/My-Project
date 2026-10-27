import React from 'react';
import { Button, Badge } from '@mui/material';

/**
 * Reusable moving button component that evades cursor / touch
 */
export function MovingButton({
  label,
  dodges = [],
  dodgeCount = 0,
  position = { top: 0, left: 0 },
  isMoved = false,
  onDodge,
  variant = "outlined",
  color = "secondary",
  size = "large",
  className = "no-button",
  sx = {},
  disabled = false,
}) {
  const currentLabel = React.useMemo(() => {
    if (!isMoved || dodgeCount === 0) return label;
    if (!dodges || dodges.length === 0) return `Dodged! (${dodgeCount}) 😜`;
    return dodges[(dodgeCount - 1) % dodges.length];
  }, [isMoved, dodgeCount, label, dodges]);

  const handleEvasion = (e) => {
    if (disabled) return;
    if (e.type === 'touchstart') {
      // Prevent immediate click simulation on mobile touch
      e.preventDefault();
    }
    onDodge();
  };

  const dynamicStyles = isMoved
    ? {
        position: 'fixed',
        left: `${position.left}px`,
        top: `${position.top}px`,
        zIndex: 9999,
        transition: 'all 0.16s cubic-bezier(0.34, 1.56, 0.64, 1)',
        boxShadow: '0 8px 24px rgba(232, 74, 114, 0.25)',
        ...sx,
      }
    : sx;

  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      className={className}
      onMouseEnter={handleEvasion}
      onTouchStart={handleEvasion}
      onFocus={handleEvasion}
      onClick={handleEvasion}
      disabled={disabled}
      style={dynamicStyles}
    >
      {currentLabel}
    </Button>
  );
}

export default MovingButton;
