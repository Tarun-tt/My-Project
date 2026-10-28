import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Chip,
  Stack,
  Card,
  IconButton,
} from '@mui/material';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ProjectLayout from '../../components/common/ProjectLayout.jsx';
import { playSuccessSound, playCelebrationSound } from '../../utils/soundEffects.js';
import { fireConfetti } from '../../utils/confettiHelper.js';

const COMPLIMENTS = {
  friend: [
    "You're the human equivalent of finding money in a jacket you haven't worn in months.",
    "If you were a Wi-Fi signal, you'd be 5 full bars with zero buffering.",
    "Your laugh is genuinely so contagious that it should be classified as a public health hazard.",
    "You are the exact person everyone hopes shows up to the party.",
    "If being a loyal friend was an Olympic sport, you would have already retired with 12 gold medals.",
  ],
  partner: [
    "You have the kind of smile that makes people forget what they were stressed about 10 seconds ago.",
    "Even when your hair is messy and you're in oversized pajamas, you look like a walking rom-com poster.",
    "Being around you feels like drinking warm hot chocolate while wrapped in a fuzzy blanket by a fireplace.",
    "If I had a nickel for every time you made my heart skip a beat, I could buy us private island boba.",
  ],
  self: [
    "You have survived 100% of your hardest days so far, which means your life track record is literally undefeated.",
    "Your inner resilience is quietly legendary. Give yourself some credit today.",
    "You are allowed to take up space, speak your mind, and eat dessert whenever you want.",
    "You are doing much better than your overthinking brain tells you.",
  ],
  work: [
    "You handle workplace chaos with the grace of a monk who secretly drinks 4 double espressos.",
    "Your ability to smile through pointless corporate meetings is an inspiration to mankind.",
    "You bring 90% of the positive energy to your workplace team.",
    "You deserve an award just for keeping your patience today.",
  ],
  unhinged: [
    "I bet you could look cool while tripping over an imaginary bump on the sidewalk.",
    "If aliens landed on Earth and demanded to speak to our leader, I'd send you and we'd be best friends with Mars in 20 minutes.",
    "You give off the radiant aura of a golden retriever that just discovered tennis balls.",
    "You have main character energy, but like the cool protagonist in season 3 who finally knows what they're doing.",
  ],
};

const CATEGORIES = [
  { id: 'friend', label: 'Best Friend 👯' },
  { id: 'partner', label: 'Partner 💕' },
  { id: 'self', label: 'Self-Love 🧘' },
  { id: 'work', label: 'Workday Boost ☕' },
  { id: 'unhinged', label: 'Unhinged Random 🦄' },
];

export default function ComplimentMachineApp() {
  const [selectedCategory, setSelectedCategory] = useState('friend');
  const [currentCompliment, setCurrentCompliment] = useState(COMPLIMENTS.friend[0]);
  const [dailyCount, setDailyCount] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const [isDispensing, setIsDispensing] = useState(false);

  useEffect(() => {
    try {
      const savedCount = localStorage.getItem('pranklab-compliment-count');
      if (savedCount) setDailyCount(parseInt(savedCount, 10));

      const savedFavs = localStorage.getItem('pranklab-favorite-compliments');
      if (savedFavs) setFavorites(JSON.parse(savedFavs));
    } catch (e) {
      // ignore
    }
  }, []);

  const dispenseCompliment = (cat = selectedCategory) => {
    setIsDispensing(true);
    playSuccessSound();

    setTimeout(() => {
      const list = COMPLIMENTS[cat] || COMPLIMENTS.friend;
      const random = list[Math.floor(Math.random() * list.length)];
      setCurrentCompliment(random);
      setIsDispensing(false);
      fireConfetti();

      const newCount = dailyCount + 1;
      setDailyCount(newCount);
      try {
        localStorage.setItem('pranklab-compliment-count', newCount.toString());
      } catch (e) {
        // ignore
      }
    }, 450);
  };

  const toggleFavorite = () => {
    let updated;
    if (favorites.includes(currentCompliment)) {
      updated = favorites.filter((c) => c !== currentCompliment);
    } else {
      updated = [currentCompliment, ...favorites];
    }
    setFavorites(updated);
    try {
      localStorage.setItem('pranklab-favorite-compliments', JSON.stringify(updated));
    } catch (e) {
      // ignore
    }
  };

  return (
    <ProjectLayout
      title="Compliment Machine"
      emoji="✨"
      category="Wholesome Chaos"
      accentColor="#14b8a6"
      onReset={() => {
        setSelectedCategory('friend');
        dispenseCompliment('friend');
      }}
    >
      <Box sx={{ maxWidth: 720, mx: 'auto', mt: 1 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, sm: 4 },
            borderRadius: '26px',
            border: '1.5px solid #99f6e4',
            bgcolor: 'background.paper',
            boxShadow: '0 12px 40px rgba(20, 184, 166, 0.08)',
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Box sx={{ fontSize: 54, mb: 1 }}>✨</Box>
            <Typography variant="h4" fontWeight={900} sx={{ mb: 1 }}>
              Automated Wholesome Compliment Dispenser
            </Typography>
            <Typography variant="body2" color="text.secondary">
              A suspicious little machine that provides the compliments your inner critic forgot to deliver today.
            </Typography>
          </Box>

          <Stack spacing={3}>
            {/* Category Filter */}
            <Box>
              <Typography fontWeight={800} fontSize={14.5} sx={{ mb: 1.2 }}>
                Who Needs a Boost Right Now?
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <Chip
                      key={cat.id}
                      label={cat.label}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        dispenseCompliment(cat.id);
                      }}
                      sx={{
                        fontWeight: 700,
                        bgcolor: isSelected ? '#14b8a6' : '#f0fdfa',
                        color: isSelected ? '#ffffff' : '#0f766e',
                        border: isSelected ? '2px solid #14b8a6' : '1px solid #99f6e4',
                        cursor: 'pointer',
                      }}
                    />
                  );
                })}
              </Stack>
            </Box>

            {/* Compliment Card */}
            <Card
              sx={{
                p: { xs: 3, sm: 4 },
                borderRadius: '24px',
                border: '2px solid #14b8a6',
                background: 'linear-gradient(180deg, #f0fdfa 0%, #ccfbf1 100%)',
                textAlign: 'center',
                position: 'relative',
                transform: isDispensing ? 'scale(0.97)' : 'scale(1)',
                transition: 'all 0.3s ease',
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Chip
                  label={`Compliment #${dailyCount} Dispensed`}
                  size="small"
                  sx={{ bgcolor: '#ffffff', color: '#0f766e', fontWeight: 800 }}
                />
                <IconButton onClick={toggleFavorite} color="error" size="small">
                  {favorites.includes(currentCompliment) ? (
                    <FavoriteRoundedIcon sx={{ color: '#ef4444' }} />
                  ) : (
                    <FavoriteBorderRoundedIcon sx={{ color: '#0f766e' }} />
                  )}
                </IconButton>
              </Stack>

              <Typography
                variant="h5"
                fontWeight={800}
                fontStyle="italic"
                sx={{
                  my: 3,
                  color: '#134e4a',
                  lineHeight: 1.5,
                  px: { xs: 0, sm: 2 },
                }}
              >
                “{currentCompliment}”
              </Typography>

              {/* Dispense CTA */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} justifyContent="center" sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<AutoAwesomeRoundedIcon />}
                  onClick={() => dispenseCompliment()}
                  sx={{
                    background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
                    fontWeight: 900,
                    px: 3,
                  }}
                >
                  Pull Lever for Another ✨
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<ContentCopyRoundedIcon />}
                  onClick={() => {
                    navigator.clipboard.writeText(`✨ ${currentCompliment} — Delivered by PrankLab Compliment Machine 💖`);
                    alert("Compliment copied to clipboard! Send it to brighten someone's day! 📋");
                  }}
                  sx={{ borderColor: '#0d9488', color: '#0f766e', fontWeight: 800 }}
                >
                  Copy & Send
                </Button>

                <Button
                  variant="contained"
                  startIcon={<WhatsAppIcon />}
                  onClick={() => {
                    const text = `✨ ${currentCompliment} — Sent with love via PrankLab 💖`;
                    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
                  }}
                  sx={{ background: 'linear-gradient(100deg, #25D366, #128C7E)', color: '#ffffff', fontWeight: 800 }}
                >
                  WhatsApp
                </Button>
              </Stack>
            </Card>

            {/* Saved Vault */}
            {favorites.length > 0 && (
              <Box sx={{ mt: 2, pt: 2, borderTop: '1px dashed #99f6e4' }}>
                <Typography fontWeight={800} fontSize={14} sx={{ mb: 1 }}>
                  ❤️ Your Compliment Vault ({favorites.length}):
                </Typography>
                <Stack spacing={1}>
                  {favorites.slice(0, 3).map((fav, i) => (
                    <Paper key={i} sx={{ p: 1.2, bgcolor: '#f0fdfa', borderRadius: '12px' }}>
                      <Typography variant="caption" fontWeight={600} color="#115e59">
                        • “{fav}”
                      </Typography>
                    </Paper>
                  ))}
                </Stack>
              </Box>
            )}
          </Stack>
        </Paper>
      </Box>
    </ProjectLayout>
  );
}
