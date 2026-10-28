import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Chip,
  Stack,
  RadioGroup,
  FormControlLabel,
  Radio,
  Card,
  Grid,
} from '@mui/material';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import ProjectLayout from '../../components/common/ProjectLayout.jsx';
import { playSuccessSound, playCelebrationSound } from '../../utils/soundEffects.js';
import { fireCannons } from '../../utils/confettiHelper.js';

export default function CoupleCompatibilityApp() {
  const [p1, setP1] = useState('');
  const [p2, setP2] = useState('');
  const [acTemp, setAcTemp] = useState('arctic');
  const [readyTime, setReadyTime] = useState('p1');
  const [apology, setApology] = useState('stubborn');
  const [dessert, setDessert] = useState('split');
  const [report, setReport] = useState(null);

  const handleCalculate = () => {
    if (!p1.trim() || !p2.trim()) {
      alert("Please enter names for both partners!");
      return;
    }

    playCelebrationSound();
    fireCannons();

    const baseScore = Math.floor(84 + Math.random() * 15);

    const strengths = [
      "Both agree that food tastes 200% better when stolen from each other's plate.",
      "Shared talent for opening Netflix and scrolling for 45 minutes without watching anything.",
      "Synchronized yawning and mutual hatred of morning alarms.",
    ];

    const risks = [
      "Catastrophic disagreement on optimal AC temperature (18°C vs 26°C with blanket).",
      "Both partners stubbornly refuse to pick a restaurant when hungry.",
      "Both will fight over who gets the window seat on vacation flights.",
    ];

    setReport({
      p1: p1.trim(),
      p2: p2.trim(),
      score: baseScore,
      strengths,
      risks,
      verdict: baseScore > 90 ? "Soulmates with High Bicker Capacity 💖" : "Adorable Chaos Duo 💕",
    });
  };

  const handleReset = () => {
    setP1('');
    setP2('');
    setReport(null);
  };

  return (
    <ProjectLayout
      title="Couple Compatibility Lab"
      emoji="💑"
      category="Dating & Romance"
      accentColor="#ec4899"
      onReset={handleReset}
    >
      <Box sx={{ maxWidth: 720, mx: 'auto', mt: 1 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, sm: 4 },
            borderRadius: '26px',
            border: '1.5px solid #fbcfe8',
            bgcolor: 'background.paper',
            boxShadow: '0 12px 40px rgba(236, 72, 153, 0.08)',
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Box sx={{ fontSize: 54, mb: 1 }}>💑</Box>
            <Typography variant="h4" fontWeight={900} sx={{ mb: 1 }}>
              Couple Compatibility Lab
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Discover whether you are celestial soulmates or just two people arguing over the last slice of pizza.
            </Typography>
          </Box>

          {!report ? (
            <Stack spacing={3}>
              {/* Names input */}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Partner 1 Name"
                    value={p1}
                    onChange={(e) => setP1(e.target.value)}
                    placeholder="e.g. Tarun"
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '16px' } }}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Partner 2 Name"
                    value={p2}
                    onChange={(e) => setP2(e.target.value)}
                    placeholder="e.g. Sneha"
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '16px' } }}
                    required
                  />
                </Grid>
              </Grid>

              {/* Question 1: AC Temp */}
              <Box>
                <Typography fontWeight={800} fontSize={14.5} sx={{ mb: 1 }}>
                  1. The AC Temperature Cold War:
                </Typography>
                <RadioGroup value={acTemp} onChange={(e) => setAcTemp(e.target.value)}>
                  <FormControlLabel value="arctic" control={<Radio color="secondary" />} label="18°C Arctic Tundra (One person freezing under 3 blankets) 🥶" />
                  <FormControlLabel value="warm" control={<Radio color="secondary" />} label="25°C Tropical Sauna (Complaining it's too humid) 🥵" />
                  <FormControlLabel value="peace" control={<Radio color="secondary" />} label="22°C Compromise with ceiling fan on speed 3 🤝" />
                </RadioGroup>
              </Box>

              {/* Question 2: Getting Ready */}
              <Box>
                <Typography fontWeight={800} fontSize={14.5} sx={{ mb: 1 }}>
                  2. Who says "I'll be ready in 5 mins" and takes 45 minutes?
                </Typography>
                <RadioGroup value={readyTime} onChange={(e) => setReadyTime(e.target.value)}>
                  <FormControlLabel value="p1" control={<Radio color="secondary" />} label="Partner 1 takes their sweet aesthetic time 💄" />
                  <FormControlLabel value="p2" control={<Radio color="secondary" />} label="Partner 2 is chronically in the mirror 🪞" />
                  <FormControlLabel value="both" control={<Radio color="secondary" />} label="Both are hopelessly unpunctual together 🏃‍♀️🏃‍♂️" />
                </RadioGroup>
              </Box>

              {/* Question 3: Dessert */}
              <Box>
                <Typography fontWeight={800} fontSize={14.5} sx={{ mb: 1 }}>
                  3. One piece of chocolate cake remains. What is the protocol?
                </Typography>
                <RadioGroup value={dessert} onChange={(e) => setDessert(e.target.value)}>
                  <FormControlLabel value="split" control={<Radio color="secondary" />} label="Cut it cleanly in half with surgical millimeter precision 🍰" />
                  <FormControlLabel value="steal" control={<Radio color="secondary" />} label="Distract partner ('Look, a bird!') and inhale it 🦅" />
                  <FormControlLabel value="feed" control={<Radio color="secondary" />} label="Feed each other like a Bollywood romance musical 🎬" />
                </RadioGroup>
              </Box>

              <Button
                variant="contained"
                size="large"
                startIcon={<FavoriteRoundedIcon />}
                onClick={handleCalculate}
                sx={{
                  background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
                  fontWeight: 900,
                  fontSize: 16,
                  py: 1.4,
                  boxShadow: '0 8px 24px rgba(236, 72, 153, 0.35)',
                }}
              >
                Analyze Love Compatibility 💕
              </Button>
            </Stack>
          ) : (
            /* Result Card */
            <Card
              sx={{
                p: { xs: 2.5, sm: 4 },
                borderRadius: '24px',
                border: '2px solid #f472b6',
                background: 'linear-gradient(180deg, #fff5f8 0%, #fdf2f8 100%)',
                textAlign: 'center',
              }}
            >
              <Chip
                icon={<FavoriteRoundedIcon sx={{ fontSize: 16 }} />}
                label="OFFICIAL COMPATIBILITY CERTIFICATE"
                sx={{ bgcolor: '#fce7f3', color: '#be185d', fontWeight: 900, mb: 2 }}
              />

              <Typography variant="h4" fontWeight={900} sx={{ mb: 1, color: '#9d174d' }}>
                {report.p1} & {report.p2}
              </Typography>

              <Box sx={{ my: 3 }}>
                <Typography variant="h1" fontWeight={900} color="#db2777" sx={{ fontSize: { xs: 64, sm: 80 } }}>
                  {report.score}%
                </Typography>
                <Typography variant="h6" fontWeight={800} color="#be185d">
                  {report.verdict}
                </Typography>
              </Box>

              {/* Strengths & Risks */}
              <Grid container spacing={2} sx={{ mb: 3, textAlign: 'left' }}>
                <Grid item xs={12} sm={6}>
                  <Paper sx={{ p: 2, bgcolor: '#ffffff', borderRadius: '16px', border: '1px solid #fbcfe8', height: '100%' }}>
                    <Typography fontWeight={900} color="#059669" sx={{ mb: 1 }}>
                      ✨ Superpower Strengths:
                    </Typography>
                    {report.strengths.map((s, i) => (
                      <Typography key={i} variant="body2" color="text.secondary" sx={{ mb: 0.8 }}>
                        • {s}
                      </Typography>
                    ))}
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Paper sx={{ p: 2, bgcolor: '#ffffff', borderRadius: '16px', border: '1px solid #fbcfe8', height: '100%' }}>
                    <Typography fontWeight={900} color="#dc2626" sx={{ mb: 1 }}>
                      ⚠️ Relationship Hazards:
                    </Typography>
                    {report.risks.map((r, i) => (
                      <Typography key={i} variant="body2" color="text.secondary" sx={{ mb: 0.8 }}>
                        • {r}
                      </Typography>
                    ))}
                  </Paper>
                </Grid>
              </Grid>

              <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 3 }}>
                Verdict: Highly recommended for lifetime happiness, provided you order double fries.
              </Typography>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} justifyContent="center">
                <Button
                  variant="contained"
                  startIcon={<ContentCopyRoundedIcon />}
                  onClick={() => {
                    const text = `💑 COUPLE COMPATIBILITY REPORT: ${report.p1} + ${report.p2} = ${report.score}% Match! 💕\nVerdict: ${report.verdict}\nTested on PrankLab ✨`;
                    navigator.clipboard.writeText(text);
                    alert("Copied compatibility report to clipboard! 📋");
                  }}
                  sx={{
                    background: 'linear-gradient(135deg, #ec4899, #db2777)',
                    fontWeight: 800,
                  }}
                >
                  Share Love Score 💖
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<RestartAltRoundedIcon />}
                  onClick={handleReset}
                  sx={{ borderColor: '#ec4899', color: '#ec4899', fontWeight: 800 }}
                >
                  Test Another Couple
                </Button>
              </Stack>
            </Card>
          )}
        </Paper>
      </Box>
    </ProjectLayout>
  );
}
