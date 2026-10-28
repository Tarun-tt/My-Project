import React, { useEffect, useState } from 'react';
import { Snackbar, Alert, Typography, Box } from '@mui/material';
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded';
import { initAntiInspect, subscribeInspectAttempt } from '../../utils/antiInspect.js';

export function InspectBlocker() {
  const [toastOpen, setToastOpen] = useState(false);
  const [attemptType, setAttemptType] = useState('');

  useEffect(() => {
    initAntiInspect();

    const unsubscribe = subscribeInspectAttempt((type) => {
      setAttemptType(type);
      setToastOpen(true);
    });

    return () => unsubscribe();
  }, []);

  const getMessage = () => {
    if (attemptType === 'right_click') {
      return "Nice try! Right-click & Inspect are classified by Tarun Tiwari! 🛑🤡";
    }
    if (attemptType === 'f12') {
      return "F12 Detected! Developer tools are guarded by PrankLab security! 🛡️⚡";
    }
    if (attemptType === 'view_source') {
      return "View-Source Blocked! There are no secrets here, only pure comedy! 📜😂";
    }
    if (attemptType === 'devtools_open') {
      return "Inspect / DevTools Detected! Content hidden in Stealth Mode until closed! 🕶️🛡️";
    }
    return "Developer Tools Blocked! Put down the inspector and enjoy the pranks! 🤡✨";
  };

  return (
    <Snackbar
      open={toastOpen}
      autoHideDuration={4000}
      onClose={() => setToastOpen(false)}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      sx={{ zIndex: 9999999 }}
    >
      <Alert
        onClose={() => setToastOpen(false)}
        severity="error"
        variant="filled"
        icon={<ShieldRoundedIcon sx={{ fontSize: 24 }} />}
        sx={{
          borderRadius: '18px',
          bgcolor: '#e11d48',
          color: '#ffffff',
          fontWeight: 800,
          boxShadow: '0 12px 36px rgba(225, 29, 72, 0.45)',
          fontSize: 14.5,
          border: '1.5px solid #fda4af',
        }}
      >
        <Box>
          <Typography fontWeight={900} fontSize={14}>
            🛑 INSPECT BLOCKED BY TARUN TIWARI
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.95 }}>
            {getMessage()}
          </Typography>
        </Box>
      </Alert>
    </Snackbar>
  );
}

export default InspectBlocker;
