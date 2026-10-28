import React from 'react';
import { Box, Container, Stack, Typography, Link, Chip } from '@mui/material';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { useThemeMode } from '../../context/ThemeContext.jsx';

export function Footer() {
  const { mode } = useThemeMode();

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
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={3}
        >
          {/* Logo & Disclaimer */}
          <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
            <Stack direction="row" spacing={1} alignItems="center" justifyContent={{ xs: 'center', sm: 'flex-start' }} sx={{ mb: 0.8 }}>
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

          {/* Credits */}
          <Box sx={{ textAlign: { xs: 'center', sm: 'right' } }}>
            <Typography variant="body2" fontWeight={700} sx={{ mb: 0.5 }}>
              Crafted with <span style={{ color: '#f43f5e' }}>♥</span> by <strong>Tarun Tiwari</strong>
            </Typography>
            <Typography variant="caption" color="text.secondary">
              All rights reserved © {new Date().getFullYear()} • Safe for friends & dates
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;
