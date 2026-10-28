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
  Select,
  MenuItem,
  Divider,
} from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import VolumeOffRoundedIcon from '@mui/icons-material/VolumeOffRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import BuildCircleRoundedIcon from '@mui/icons-material/BuildCircleRounded';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import { useNavigate, useLocation } from 'react-router-dom';
import { useThemeMode } from '../../context/ThemeContext.jsx';
import { PROJECTS } from '../../data/projectsData.js';
import DeveloperOptionsModal from './DeveloperOptionsModal.jsx';

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
  const location = useLocation();
  const { mode, toggleTheme } = useThemeMode();
  const [isMuted, setIsMuted] = useState(false);
  const [toast, setToast] = useState('');
  const [devModalOpen, setDevModalOpen] = useState(false);

  // Find index of current project for next/previous navigation
  const currentIndex = PROJECTS.findIndex(
    (p) => p.route === location.pathname || (p.route !== '/' && location.pathname.startsWith(p.route))
  );
  const activeRoute = currentIndex >= 0 ? PROJECTS[currentIndex].route : PROJECTS[0].route;
  const prevProject = currentIndex > 0 ? PROJECTS[currentIndex - 1] : PROJECTS[PROJECTS.length - 1];
  const nextProject = currentIndex >= 0 && currentIndex < PROJECTS.length - 1 ? PROJECTS[currentIndex + 1] : PROJECTS[0];

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
          backdropFilter: 'blur(12px)',
          bgcolor: mode === 'dark' ? 'rgba(15, 23, 42, 0.88)' : 'rgba(255, 255, 255, 0.9)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          py: 1.2,
        }}
      >
        <Container maxWidth={maxWidth}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            {/* Left: Back to Hub */}
            <Button
              startIcon={<ArrowBackRoundedIcon />}
              onClick={() => navigate('/')}
              size="small"
              sx={{
                fontWeight: 800,
                color: mode === 'dark' ? '#94a3b8' : '#7b626c',
                '&:hover': {
                  color: accentColor,
                  bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                },
              }}
            >
              Hub
            </Button>

            {/* Center: Title & Quick Warp Dropdown */}
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

              {/* Quick Project Switcher Dropdown */}
              <Select
                size="small"
                value={activeRoute}
                onChange={(e) => navigate(e.target.value)}
                sx={{
                  height: 32,
                  fontSize: 12,
                  fontWeight: 700,
                  borderRadius: '12px',
                  bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : '#f8fafc',
                  maxWidth: { xs: 150, sm: 200 },
                }}
              >
                {PROJECTS.map((p) => (
                  <MenuItem key={p.id} value={p.route} sx={{ fontSize: 13, fontWeight: 700 }}>
                    {p.emoji} {p.name}
                  </MenuItem>
                ))}
              </Select>
            </Stack>

            {/* Right: Reset, Dev Options, Sound, Theme */}
            <Stack direction="row" spacing={0.6} alignItems="center">
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

              {/* Developer Options Button */}
              <Tooltip title="Developer Options 🛠️">
                <IconButton
                  size="small"
                  onClick={() => setDevModalOpen(true)}
                  sx={{ color: '#6366f1' }}
                >
                  <BuildCircleRoundedIcon fontSize="small" />
                </IconButton>
              </Tooltip>

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

        {/* Footer Navigation: Previous Project & Next Project */}
        {currentIndex >= 0 && (
          <Box sx={{ mt: 5, pt: 3, borderTop: '1px dashed', borderColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : '#e2e8f0' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Button
                startIcon={<ArrowBackRoundedIcon />}
                onClick={() => navigate(prevProject.route)}
                size="small"
                sx={{ fontWeight: 750, color: 'text.secondary' }}
              >
                {prevProject.emoji} {prevProject.name}
              </Button>

              <Chip
                label={`App ${currentIndex + 1} of ${PROJECTS.length}`}
                size="small"
                sx={{ fontWeight: 800, fontSize: 11 }}
              />

              <Button
                endIcon={<ArrowForwardRoundedIcon />}
                onClick={() => navigate(nextProject.route)}
                size="small"
                sx={{ fontWeight: 750, color: 'text.secondary' }}
              >
                {nextProject.emoji} {nextProject.name}
              </Button>
            </Stack>
          </Box>
        )}
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

      {/* Developer Options Modal */}
      <DeveloperOptionsModal open={devModalOpen} onClose={() => setDevModalOpen(false)} />
    </Box>
  );
}

export default ProjectLayout;
