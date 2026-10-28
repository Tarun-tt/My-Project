import React, { useState } from 'react';
import {
  Box,
  Container,
  Stack,
  Typography,
  Button,
  IconButton,
  Tooltip,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Badge,
} from '@mui/material';
import CasinoRoundedIcon from '@mui/icons-material/CasinoRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import BuildCircleRoundedIcon from '@mui/icons-material/BuildCircleRounded';
import { useNavigate, Link } from 'react-router-dom';
import { useThemeMode } from '../../context/ThemeContext.jsx';
import { PROJECTS } from '../../data/projectsData.js';
import { playSuccessSound } from '../../utils/soundEffects.js';
import DeveloperOptionsModal from '../common/DeveloperOptionsModal.jsx';
import TipModal from '../common/TipModal.jsx';
import AdvertiseModal from '../common/AdvertiseModal.jsx';

export function Navbar({ onOpenAbout, onScrollToProjects }) {
  const navigate = useNavigate();
  const { mode, toggleTheme } = useThemeMode();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [devModalOpen, setDevModalOpen] = useState(false);
  const [tipModalOpen, setTipModalOpen] = useState(false);
  const [adModalOpen, setAdModalOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);

  const handleLogoClick = () => {
    const next = logoClicks + 1;
    setLogoClicks(next);
    if (next >= 5) {
      setDevModalOpen(true);
      setLogoClicks(0);
    }
  };

  const handleRandomProject = () => {
    playSuccessSound();
    const randomIndex = Math.floor(Math.random() * PROJECTS.length);
    const chosen = PROJECTS[randomIndex];
    navigate(chosen.route);
  };

  return (
    <Box
      component="header"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backdropFilter: 'blur(16px)',
        bgcolor: mode === 'dark' ? 'rgba(15, 23, 42, 0.85)' : 'rgba(255, 255, 255, 0.88)',
        borderBottom: '1px solid',
        borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
        transition: 'all 0.3s ease',
        py: 1.4,
      }}
    >
      <Container maxWidth="lg">
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          {/* Logo & Brand */}
          <Stack
            direction="row"
            spacing={1.2}
            alignItems="center"
            onClick={() => navigate('/')}
            sx={{ cursor: 'pointer', userSelect: 'none' }}
          >
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #f43f5e 0%, #8b5cf6 100%)',
                display: 'grid',
                placeItems: 'center',
                color: '#ffffff',
                fontSize: 22,
                boxShadow: '0 6px 18px rgba(244, 63, 94, 0.35)',
              }}
            >
              🤡
            </Box>
            <Box>
              <Typography
                fontWeight={900}
                fontSize={{ xs: 18, sm: 20 }}
                letterSpacing="-0.03em"
                lineHeight={1.1}
                sx={{
                  background: 'linear-gradient(90deg, #e11d48, #7c3aed)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                PrankLab
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: { xs: 'none', sm: 'block' }, fontSize: 11, fontWeight: 700 }}
              >
                The Internet’s Funniest Playground 😂
              </Typography>
            </Box>
          </Stack>

          {/* Desktop Navigation Links */}
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ display: { xs: 'none', md: 'flex' } }}
          >
            <Button
              onClick={() => navigate('/')}
              sx={{ color: 'text.primary', fontWeight: 700, fontSize: 14 }}
            >
              Home
            </Button>
            <Button
              onClick={onScrollToProjects}
              sx={{ color: 'text.primary', fontWeight: 700, fontSize: 14 }}
            >
              All 12 Mini-Apps
            </Button>
            <Button
              onClick={onOpenAbout}
              startIcon={<InfoOutlinedIcon fontSize="small" />}
              sx={{ color: 'text.primary', fontWeight: 700, fontSize: 14 }}
            >
              About
            </Button>
          </Stack>

          {/* Actions: Feeling Bored + Theme Toggle + Mobile Menu */}
          <Stack direction="row" spacing={1} alignItems="center">
            {/* Feeling Bored Random Project Button */}
            <Button
              variant="contained"
              size="small"
              startIcon={<CasinoRoundedIcon />}
              onClick={handleRandomProject}
              sx={{
                background: 'linear-gradient(135deg, #f43f5e 0%, #ec4899 100%)',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: 13,
                px: 2,
                py: 0.8,
                boxShadow: '0 4px 14px rgba(244, 63, 94, 0.3)',
                animation: 'pulse 2.5s infinite',
              }}
            >
              Feeling Bored? 🎲
            </Button>

            {/* Tip / Support Button */}
            <Button
              variant="outlined"
              size="small"
              onClick={() => setTipModalOpen(true)}
              sx={{
                display: { xs: 'none', sm: 'flex' },
                borderColor: '#f59e0b',
                color: '#d97706',
                fontWeight: 800,
                fontSize: 12.5,
                borderRadius: '12px',
                px: 1.5,
                '&:hover': {
                  borderColor: '#d97706',
                  bgcolor: mode === 'dark' ? 'rgba(245, 158, 11, 0.12)' : '#fffbeb',
                },
              }}
            >
              ☕ Tip Tarun
            </Button>

            {/* Developer Options Button */}
            <Tooltip title="Developer Options 🛠️">
              <IconButton
                onClick={() => setDevModalOpen(true)}
                sx={{
                  bgcolor: mode === 'dark' ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.08)',
                  color: '#6366f1',
                }}
              >
                <BuildCircleRoundedIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            {/* Dark/Light Mode Toggle */}
            <Tooltip title={mode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
              <IconButton
                onClick={toggleTheme}
                sx={{
                  bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
                  color: mode === 'dark' ? '#facc15' : '#475569',
                }}
              >
                {mode === 'dark' ? <LightModeRoundedIcon fontSize="small" /> : <DarkModeRoundedIcon fontSize="small" />}
              </IconButton>
            </Tooltip>

            {/* Mobile Menu Hamburger */}
            <IconButton
              onClick={() => setMobileOpen(true)}
              sx={{ display: { xs: 'flex', md: 'none' }, color: 'text.primary' }}
            >
              <MenuRoundedIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            p: 2,
            bgcolor: mode === 'dark' ? '#0f172a' : '#ffffff',
          },
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography fontWeight={900} fontSize={18}>
            🤡 PrankLab Menu
          </Typography>
          <IconButton onClick={() => setMobileOpen(false)} size="small">
            <CloseRoundedIcon />
          </IconButton>
        </Stack>

        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                navigate('/');
                setMobileOpen(false);
              }}
            >
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                setMobileOpen(false);
                onScrollToProjects();
              }}
            >
              <ListItemText primary="Explore All 12 Projects" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                setMobileOpen(false);
                onOpenAbout();
              }}
            >
              <ListItemText primary="About PrankLab" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                setMobileOpen(false);
                setTipModalOpen(true);
              }}
            >
              <ListItemText primary="☕ Tip Tarun (Buy a Chai)" primaryTypographyProps={{ fontWeight: 800, color: '#d97706' }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                setMobileOpen(false);
                setAdModalOpen(true);
              }}
            >
              <ListItemText primary="📢 Advertise with Us" primaryTypographyProps={{ fontWeight: 800, color: '#6366f1' }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                setMobileOpen(false);
                setDevModalOpen(true);
              }}
            >
              <ListItemText primary="🛠️ Developer Options" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ mt: 2 }}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<CasinoRoundedIcon />}
              onClick={() => {
                setMobileOpen(false);
                handleRandomProject();
              }}
              sx={{
                background: 'linear-gradient(135deg, #f43f5e 0%, #ec4899 100%)',
                fontWeight: 800,
              }}
            >
              Pick Random Prank 🎲
            </Button>
          </ListItem>
        </List>
      </Drawer>

      <DeveloperOptionsModal open={devModalOpen} onClose={() => setDevModalOpen(false)} />
      <TipModal open={tipModalOpen} onClose={() => setTipModalOpen(false)} />
      <AdvertiseModal open={adModalOpen} onClose={() => setAdModalOpen(false)} />
    </Box>
  );
}

export default Navbar;
