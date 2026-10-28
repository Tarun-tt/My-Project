import React, { useState } from 'react';
import {
  Box,
  Container,
  Stack,
  Button,
  Typography,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  Chip,
} from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import VolumeOffRoundedIcon from '@mui/icons-material/VolumeOffRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import { useNavigate } from 'react-router-dom';
import { useThemeMode } from '../../context/ThemeContext.jsx';

export function ProjectLayout({
  title,
  emoji = '🎉',
  category,
  onReset,
  children,
  maxWidth = 'md',
  accentColor = '#e84a72',
}) {
  const navigate = useNavigate();
  const { mode, toggleTheme } = useThemeMode();
  const [isMuted, setIsMuted] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
        transition: 'background-color 0.3s ease, color 0.3s ease',
        pb: 8,
      }}
    >
      {/* Top Project Navigation Bar */}
      <Box
        sx={{
          borderBottom: '1px solid',
          borderColor: mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
          backdropFilter: 'blur(10px)',
          bgcolor: mode === 'dark' ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          py: 1.2,
        }}
      >
        <Container maxWidth={maxWidth}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Button
              startIcon={<ArrowBackRoundedIcon />}
              onClick={() => navigate('/')}
              size="small"
              sx={{
                fontWeight: 700,
                color: mode === 'dark' ? '#94a3b8' : '#7b626c',
                '&:hover': {
                  color: accentColor,
                  bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                },
              }}
            >
              PrankLab Hub
            </Button>

            <Stack direction="row" spacing={1} alignItems="center">
              <Typography
                variant="subtitle2"
                fontWeight={800}
                sx={{
                  display: { xs: 'none', sm: 'flex' },
                  alignItems: 'center',
                  gap: 0.8,
                }}
              >
                <span>{emoji}</span> {title}
              </Typography>
              {category && (
                <Chip
                  label={category}
                  size="small"
                  sx={{
                    display: { xs: 'none', md: 'inline-flex' },
                    height: 22,
                    fontSize: 11,
                    fontWeight: 700,
                    bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(232, 74, 114, 0.1)',
                    color: mode === 'dark' ? '#f8fafc' : accentColor,
                  }}
                />
              )}
            </Stack>

            <Stack direction="row" spacing={0.8} alignItems="center">
              {onReset && (
                <Tooltip title="Reset project">
                  <IconButton
                    size="small"
                    onClick={onReset}
                    sx={{ color: mode === 'dark' ? '#94a3b8' : '#7b626c' }}
                  >
                    <RestartAltRoundedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}

              <Tooltip title={isMuted ? 'Unmute sounds' : 'Mute sounds'}>
                <IconButton
                  size="small"
                  onClick={() => {
                    setIsMuted(!isMuted);
                    showToast(isMuted ? 'Sound effects enabled 🔊' : 'Sound effects muted 🔇');
                  }}
                  sx={{ color: mode === 'dark' ? '#94a3b8' : '#7b626c' }}
                >
                  {isMuted ? (
                    <VolumeOffRoundedIcon fontSize="small" />
                  ) : (
                    <VolumeUpRoundedIcon fontSize="small" />
                  )}
                </IconButton>
              </Tooltip>

              <Tooltip title={mode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
                <IconButton
                  size="small"
                  onClick={toggleTheme}
                  sx={{ color: mode === 'dark' ? '#facc15' : '#7b626c' }}
                >
                  {mode === 'dark' ? (
                    <LightModeRoundedIcon fontSize="small" />
                  ) : (
                    <DarkModeRoundedIcon fontSize="small" />
                  )}
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Main Content Area */}
      <Container maxWidth={maxWidth} sx={{ pt: 3 }}>
        {children}
      </Container>

      {/* Toast Notification */}
      <Snackbar
        open={Boolean(toast)}
        autoHideDuration={3000}
        onClose={() => setToast('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setToast('')}
          severity="info"
          variant="filled"
          sx={{
            borderRadius: 4,
            fontWeight: 700,
            bgcolor: accentColor,
            color: '#ffffff',
          }}
        >
          {toast}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ProjectLayout;
