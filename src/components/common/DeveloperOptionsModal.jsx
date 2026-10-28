import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  Stack,
  Switch,
  FormControlLabel,
  Slider,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Divider,
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import BuildCircleRoundedIcon from '@mui/icons-material/BuildCircleRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import BugReportRoundedIcon from '@mui/icons-material/BugReportRounded';
import { useNavigate, useLocation } from 'react-router-dom';
import { getInspectProtection, setInspectProtection } from '../../utils/antiInspect.js';
import { playBoingSound, playSuccessSound, playCelebrationSound } from '../../utils/soundEffects.js';
import { fireConfetti } from '../../utils/confettiHelper.js';
import { PROJECTS } from '../../data/projectsData.js';
import { useThemeMode } from '../../context/ThemeContext.jsx';

export function DeveloperOptionsModal({ open, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { mode } = useThemeMode();

  const currentValid =
    location.pathname === '/' || PROJECTS.some((p) => p.route === location.pathname)
      ? location.pathname
      : (PROJECTS.find((p) => location.pathname.startsWith(p.route))?.route || '/');
  const [shieldActive, setShieldActive] = useState(true);
  const [chaosMultiplier, setChaosMultiplier] = useState(100);
  const [godMode, setGodMode] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(currentValid);

  useEffect(() => {
    if (open) {
      setShieldActive(getInspectProtection());
      const valid =
        location.pathname === '/' || PROJECTS.some((p) => p.route === location.pathname)
          ? location.pathname
          : (PROJECTS.find((p) => location.pathname.startsWith(p.route))?.route || '/');
      setSelectedRoute(valid);
    }
  }, [open, location.pathname]);

  const handleToggleShield = (e) => {
    const val = e.target.checked;
    setShieldActive(val);
    setInspectProtection(val);
  };

  const handleJumpRoute = () => {
    if (selectedRoute) {
      navigate(selectedRoute);
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '26px',
          p: { xs: 1, sm: 2 },
          bgcolor: mode === 'dark' ? '#0f172a' : '#ffffff',
          border: '2px solid',
          borderColor: mode === 'dark' ? '#6366f1' : '#cbd5e1',
          boxShadow: '0 24px 60px rgba(99, 102, 241, 0.25)',
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Stack direction="row" spacing={1.2} alignItems="center">
          <BuildCircleRoundedIcon sx={{ color: '#6366f1', fontSize: 28 }} />
          <Box>
            <Typography variant="h6" fontWeight={900}>
              PrankLab Developer Options 🛠️
            </Typography>
            <Typography variant="caption" color="text.secondary" fontWeight={700}>
              Classified System Console • Certified by Tarun Tiwari
            </Typography>
          </Box>
        </Stack>
        <IconButton onClick={onClose} size="small">
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          {/* 1. Anti-Inspect & DevTools Protection */}
          <Box sx={{ p: 2, bgcolor: mode === 'dark' ? '#1e293b' : '#f8fafc', borderRadius: '18px', border: '1px solid', borderColor: mode === 'dark' ? '#334155' : '#e2e8f0' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Stack direction="row" spacing={1} alignItems="center">
                <SecurityRoundedIcon sx={{ color: shieldActive ? '#10b981' : '#ef4444' }} />
                <Box>
                  <Typography fontWeight={800} fontSize={14}>
                    Anti-Inspect & DevTools Shield
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Blocks Right-Click, F12, Ctrl+Shift+I & clears console.
                  </Typography>
                </Box>
              </Stack>
              <Switch checked={shieldActive} onChange={handleToggleShield} color="success" />
            </Stack>
            <Chip
              label={shieldActive ? "SHIELD STATUS: ACTIVE (Trolling anyone inspecting)" : "SHIELD STATUS: DISABLED"}
              size="small"
              sx={{
                mt: 1.5,
                fontWeight: 800,
                fontSize: 10.5,
                bgcolor: shieldActive ? '#dcfce7' : '#fee2e2',
                color: shieldActive ? '#15803d' : '#b91c1c',
              }}
            />
          </Box>

          {/* 2. Universal Warp Gate (Route navigation) */}
          <Box sx={{ p: 2, bgcolor: mode === 'dark' ? '#1e293b' : '#f8fafc', borderRadius: '18px', border: '1px solid', borderColor: mode === 'dark' ? '#334155' : '#e2e8f0' }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.2 }}>
              <RocketLaunchRoundedIcon sx={{ color: '#4361ee' }} />
              <Typography fontWeight={800} fontSize={14}>
                Universal Route Warp Gate (All 12 Apps):
              </Typography>
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
              <Select
                size="small"
                fullWidth
                value={selectedRoute}
                onChange={(e) => setSelectedRoute(e.target.value)}
                sx={{ borderRadius: '14px', bgcolor: mode === 'dark' ? '#0f172a' : '#ffffff' }}
              >
                <MenuItem value="/">🏠 Home Hub (All Projects)</MenuItem>
                {PROJECTS.map((p) => (
                  <MenuItem key={p.id} value={p.route}>
                    {p.emoji} {p.name} ({p.category})
                  </MenuItem>
                ))}
              </Select>
              <Button
                variant="contained"
                onClick={handleJumpRoute}
                sx={{ bgcolor: '#4361ee', fontWeight: 800, minWidth: 100 }}
              >
                Jump 🚀
              </Button>
            </Stack>
          </Box>

          {/* 3. Audio Synthesizer Test Bench */}
          <Box sx={{ p: 2, bgcolor: mode === 'dark' ? '#1e293b' : '#f8fafc', borderRadius: '18px', border: '1px solid', borderColor: mode === 'dark' ? '#334155' : '#e2e8f0' }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.2 }}>
              <VolumeUpRoundedIcon sx={{ color: '#f59e0b' }} />
              <Typography fontWeight={800} fontSize={14}>
                Web Audio Synthesizer Bench:
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
              <Button size="small" variant="outlined" onClick={() => playBoingSound()} sx={{ fontWeight: 700 }}>
                Dodge Boing 🏃
              </Button>
              <Button size="small" variant="outlined" onClick={() => playSuccessSound()} sx={{ fontWeight: 700 }}>
                Success Chime 🎶
              </Button>
              <Button size="small" variant="outlined" onClick={() => { playCelebrationSound(); fireConfetti(); }} sx={{ fontWeight: 700 }}>
                Fanfare 🎉
              </Button>
            </Stack>
          </Box>

          {/* 4. Chaos Multiplier Slider */}
          <Box sx={{ p: 2, bgcolor: mode === 'dark' ? '#1e293b' : '#f8fafc', borderRadius: '18px', border: '1px solid', borderColor: mode === 'dark' ? '#334155' : '#e2e8f0' }}>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
              <Typography fontWeight={800} fontSize={14}>
                Chaos Multiplier
              </Typography>
              <Chip label={`${chaosMultiplier}x Chaos`} size="small" color="secondary" sx={{ fontWeight: 800 }} />
            </Stack>
            <Slider
              value={chaosMultiplier}
              onChange={(_, v) => setChaosMultiplier(v)}
              min={1}
              max={9000}
              step={100}
              color="secondary"
            />
          </Box>

          {/* 5. System Info & Credits */}
          <Box sx={{ textAlign: 'center', pt: 1 }}>
            <Typography variant="caption" color="text.secondary" display="block">
              Engine: React 19 + Vite • Build: v2.1.0 • HashRouter Active
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Architect & Lead Developer: <strong>Tarun Tiwari</strong>
            </Typography>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button fullWidth variant="contained" onClick={onClose} sx={{ fontWeight: 800, bgcolor: '#6366f1' }}>
          Close Developer Options
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeveloperOptionsModal;
