import React, { useState } from 'react';
import { Box, Container, Stack, Typography, Button, Chip } from '@mui/material';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';
import LocalCafeRoundedIcon from '@mui/icons-material/LocalCafeRounded';
import { useThemeMode } from '../../context/ThemeContext.jsx';
import TipModal from '../common/TipModal.jsx';
import AdvertiseModal from '../common/AdvertiseModal.jsx';

export function Footer() {
  const { mode } = useThemeMode();
  const [tipOpen, setTipOpen] = useState(false);
  const [adOpen, setAdOpen] = useState(false);

  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        borderTop: '1px solid',
        borderColor: mode === 'dark' ? 'rgba(255,255,255,0.08)' : '#e2e8f0',
        bgcolor: mode === 'dark' ? '#0b1120' : '#ffffff',
        transition: 'all 0.3s ease',
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={3}
        >
          {/* Logo & Disclaimer */}
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Stack direction="row" spacing={1} alignItems="center" justifyContent={{ xs: 'center', md: 'flex-start' }} sx={{ mb: 0.8 }}>
              <Box sx={{ fontSize: 22 }}>🤡</Box>
              <Typography fontWeight={900} fontSize={18} letterSpacing="-0.02em">
                PrankLab
              </Typography>
              <Chip label="Zero Seriousness" size="small" sx={{ height: 20, fontSize: 10, fontWeight: 700 }} />
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 420 }}>
              The internet's funniest playground for harmless pranks, romantic experiments, and comedic sanity checks.
            </Typography>
          </Box>

          {/* Quick Monetization Action Links */}
          <Stack direction="row" spacing={1.5} alignItems="center" justifyContent="center">
            <Button
              variant="outlined"
              size="small"
              startIcon={<LocalCafeRoundedIcon />}
              onClick={() => setTipOpen(true)}
              sx={{
                borderColor: '#f59e0b',
                color: '#d97706',
                fontWeight: 800,
                fontSize: 12,
                borderRadius: '12px',
                '&:hover': { borderColor: '#d97706', bgcolor: '#fffbeb22' },
              }}
            >
              Buy Me a Chai ☕
            </Button>

            <Button
              variant="outlined"
              size="small"
              startIcon={<CampaignRoundedIcon />}
              onClick={() => setAdOpen(true)}
              sx={{
                borderColor: '#6366f1',
                color: '#6366f1',
                fontWeight: 800,
                fontSize: 12,
                borderRadius: '12px',
                '&:hover': { borderColor: '#4f46e5', bgcolor: '#eef2ff22' },
              }}
            >
              Advertise with Us 📢
            </Button>
          </Stack>

          {/* Credits */}
          <Box sx={{ textAlign: { xs: 'center', md: 'right' } }}>
            <Typography variant="body2" fontWeight={700} sx={{ mb: 0.5 }}>
              Crafted with <span style={{ color: '#f43f5e' }}>♥</span> by <strong>Tarun Tiwari</strong>
            </Typography>
            <Typography variant="caption" color="text.secondary">
              All rights reserved © {new Date().getFullYear()} • Safe for friends & dates
            </Typography>
          </Box>
        </Stack>
      </Container>

      <TipModal open={tipOpen} onClose={() => setTipOpen(false)} />
      <AdvertiseModal open={adOpen} onClose={() => setAdOpen(false)} />
    </Box>
  );
}

export default Footer;
