import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Chip,
  Paper,
  Grid,
} from '@mui/material';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import CasinoRoundedIcon from '@mui/icons-material/CasinoRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { useNavigate } from 'react-router-dom';
import { useThemeMode } from '../../context/ThemeContext.jsx';
import { PROJECTS } from '../../data/projectsData.js';
import { playSuccessSound } from '../../utils/soundEffects.js';

export function HeroSection({ onExploreClick }) {
  const navigate = useNavigate();
  const { mode } = useThemeMode();

  const handleSurpriseMe = () => {
    playSuccessSound();
    const randomIndex = Math.floor(Math.random() * PROJECTS.length);
    navigate(PROJECTS[randomIndex].route);
  };

  const featured = PROJECTS.find((p) => p.id === 'impossible-no') || PROJECTS[0];

  return (
    <Box
      sx={{
        pt: { xs: 5, md: 8 },
        pb: { xs: 6, md: 9 },
        position: 'relative',
        overflow: 'hidden',
        background:
          mode === 'dark'
            ? 'radial-gradient(ellipse at 50% 20%, #1e1b4b 0%, #0f172a 70%)'
            : 'radial-gradient(ellipse at 50% 20%, #ffeef2 0%, #fff7f8 50%, #ffffff 100%)',
      }}
    >
      {/* Decorative floating emojis */}
      <Box sx={{ position: 'absolute', top: 30, left: '8%', fontSize: 32, opacity: 0.35, animation: 'floatSlow 4s ease-in-out infinite' }}>
        😂
      </Box>
      <Box sx={{ position: 'absolute', top: 90, right: '10%', fontSize: 36, opacity: 0.35, animation: 'floatSlow 5s ease-in-out infinite' }}>
        💘
      </Box>
      <Box sx={{ position: 'absolute', bottom: 40, left: '15%', fontSize: 28, opacity: 0.35, animation: 'floatSlow 4.5s ease-in-out infinite' }}>
        🔥
      </Box>
      <Box sx={{ position: 'absolute', bottom: 60, right: '18%', fontSize: 30, opacity: 0.35, animation: 'floatSlow 6s ease-in-out infinite' }}>
        🎡
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Grid container spacing={4} alignItems="center">
          {/* Left Column: Hero Text & CTAs */}
          <Grid item xs={12} md={7}>
            <Chip
              icon={<AutoAwesomeRoundedIcon sx={{ fontSize: '15px !important' }} />}
              label="WELCOME TO PRANKLAB · 12 INTERACTIVE EXPERIMENTS"
              size="small"
              sx={{
                bgcolor: mode === 'dark' ? 'rgba(244,63,94,0.15)' : '#ffe4e6',
                color: mode === 'dark' ? '#fb7185' : '#e11d48',
                fontWeight: 800,
                fontSize: 11,
                letterSpacing: '0.08em',
                mb: 2.5,
                border: '1px solid',
                borderColor: mode === 'dark' ? 'rgba(244,63,94,0.3)' : '#fecdd3',
              }}
            />

            <Typography
              variant="h2"
              component="h1"
              fontWeight={900}
              letterSpacing="-0.04em"
              sx={{
                fontSize: { xs: 36, sm: 48, md: 56 },
                lineHeight: 1.1,
                mb: 2,
                color: mode === 'dark' ? '#f8fafc' : '#1e1b4b',
              }}
            >
              Bored? Let’s Make It Worse.{' '}
              <span style={{ display: 'inline-block' }}>🤡</span>
            </Typography>

            <Typography
              variant="h6"
              fontWeight={700}
              sx={{
                color: mode === 'dark' ? '#a5b4fc' : '#4f46e5',
                mb: 1.5,
                fontSize: { xs: 18, sm: 20 },
              }}
            >
              Tiny websites. Big chaos. Zero productivity.
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                maxWidth: 520,
                mb: 4,
                lineHeight: 1.7,
                fontSize: { xs: 15, sm: 16 },
              }}
            >
              A collection of ridiculous web experiments, romantic pranks with evasive buttons, savage friend roasters, fake HR departments, and things you definitely shouldn’t take seriously.
            </Typography>

            {/* CTAs */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowDownwardRoundedIcon />}
                onClick={onExploreClick}
                sx={{
                  background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
                  boxShadow: '0 10px 28px rgba(244, 63, 94, 0.4)',
                  fontSize: 16,
                  fontWeight: 900,
                  py: 1.4,
                  px: 3.5,
                }}
              >
                Explore the Madness
              </Button>

              <Button
                variant="outlined"
                size="large"
                startIcon={<CasinoRoundedIcon />}
                onClick={handleSurpriseMe}
                sx={{
                  borderColor: mode === 'dark' ? '#6366f1' : '#cbd5e1',
                  color: mode === 'dark' ? '#a5b4fc' : '#475569',
                  fontWeight: 800,
                  fontSize: 16,
                  py: 1.4,
                  px: 3,
                  '&:hover': {
                    borderColor: '#f43f5e',
                    bgcolor: mode === 'dark' ? 'rgba(244,63,94,0.1)' : '#fff1f2',
                  },
                }}
              >
                Surprise Me 🎲
              </Button>
            </Stack>
          </Grid>

          {/* Right Column: Featured Project Highlight Card */}
          <Grid item xs={12} md={5}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: '26px',
                border: '1.5px solid',
                borderColor: mode === 'dark' ? 'rgba(244,63,94,0.3)' : '#fecdd3',
                background:
                  mode === 'dark'
                    ? 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)'
                    : 'linear-gradient(135deg, #ffffff 0%, #fff5f7 100%)',
                boxShadow: '0 20px 60px rgba(244, 63, 94, 0.15)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Chip
                label="⭐ FEATURED EXPERIENCE"
                size="small"
                sx={{
                  bgcolor: '#ffe4e6',
                  color: '#e11d48',
                  fontWeight: 900,
                  fontSize: 10.5,
                  mb: 2,
                }}
              />

              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
                <Box sx={{ fontSize: 40 }}>{featured.emoji}</Box>
                <Box>
                  <Typography fontWeight={900} fontSize={18}>
                    {featured.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" fontWeight={700}>
                    {featured.category} • {featured.duration}
                  </Typography>
                </Box>
              </Stack>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, lineHeight: 1.6 }}>
                {featured.description}
              </Typography>

              <Box sx={{ p: 1.8, bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : '#ffffff', borderRadius: '16px', border: '1px dashed #fecdd3', mb: 3 }}>
                <Typography variant="caption" fontStyle="italic" color="#e11d48" fontWeight={700}>
                  “{featured.example}”
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                endIcon={<ArrowForwardRoundedIcon />}
                onClick={() => navigate(featured.route)}
                sx={{
                  background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
                  fontWeight: 900,
                  fontSize: 14.5,
                  py: 1.2,
                }}
              >
                Launch Experience
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default HeroSection;
