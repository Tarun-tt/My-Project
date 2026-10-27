import React from 'react';
import { Snackbar, Alert } from '@mui/material';

export function NotificationSnackbar({ open, message, onClose, severity = 'info' }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3600}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{
          borderRadius: 4,
          bgcolor: '#d93663',
          color: '#ffffff',
          fontWeight: 600,
          boxShadow: '0 8px 24px rgba(217, 54, 99, 0.35)',
          '& .MuiAlert-icon': {
            color: '#ffffff',
          },
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default NotificationSnackbar;
