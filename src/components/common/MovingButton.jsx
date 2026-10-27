import React from 'react';
import { createPortal } from 'react-dom';
import { Button, Box, Typography } from '@mui/material';

/**
 * Reusable evasive button component that dodges cursor / touch
 * Uses React Portal to document.body when moved so it is NEVER clipped
 * by parent cards, overflow properties, or CSS backdrop filters.
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
  disabled = false,
}) {
  const currentLabel = React.useMemo(() => {
    if (!isMoved || dodgeCount === 0) return label;
    if (!dodges || dodges.length === 0) return `Dodged! (${dodgeCount}) 😜`;
    return dodges[(dodgeCount - 1) % dodges.length];
  }, [isMoved, dodgeCount, label, dodges]);

  const handleEvasion = (e) => {
    if (disabled) return;
    if (e && e.cancelable && e.type === 'touchstart') {
      e.preventDefault();
    }
    onDodge();
  };

  const buttonElement = (
    <Button
      variant={variant}
      color={color}
      size={size}
      className={className}
      onMouseEnter={handleEvasion}
      onPointerDown={handleEvasion}
      onTouchStart={handleEvasion}
      onFocus={handleEvasion}
      onClick={handleEvasion}
      disabled={disabled}
      sx={
        isMoved
          ? {
              position: 'fixed !important',
              left: `${position.left}px !important`,
              top: `${position.top}px !important`,
              zIndex: 999999,
              maxWidth: 'calc(100vw - 32px)',
              background: '#ffffff !important',
              color: '#c72e57 !important',
              border: '2px solid #e84a72 !important',
              boxShadow: '0 10px 30px rgba(217, 54, 99, 0.45) !important',
              fontWeight: 800,
              fontSize: '14px',
              transition: 'all 0.14s cubic-bezier(0.34, 1.56, 0.64, 1)',
              pointerEvents: 'auto',
              cursor: 'pointer',
              userSelect: 'none',
              animation: 'wiggle 0.3s ease',
            }
          : {
              background: '#ffffff !important',
              color: '#805a66 !important',
              border: '1.5px solid #efcbd5 !important',
            }
      }
    >
      {currentLabel}
    </Button>
  );

  // If not moved yet, render normally in place
  if (!isMoved) {
    return buttonElement;
  }

  // When moved, render a placeholder in the original spot to keep layout stable,
  // and portal the active moving button directly to document.body so it NEVER disappears!
  return (
    <>
      <Box
        className="no-placeholder"
        sx={{
          minWidth: 120,
          height: 48,
          borderRadius: 999,
          border: '1.5px dashed #f1cbd5',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 2,
          opacity: 0.7,
        }}
      >
        <Typography variant="caption" color="text.secondary" fontWeight={600}>
          🏃 Escaped!
        </Typography>
      </Box>

      {typeof document !== 'undefined'
        ? createPortal(buttonElement, document.body)
        : buttonElement}
    </>
  );
}

export default MovingButton;
