import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Chip,
  Stack,
  Card,
  Grid,
} from '@mui/material';
import CasinoRoundedIcon from '@mui/icons-material/CasinoRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import ProjectLayout from '../../components/common/ProjectLayout.jsx';
import { playSuccessSound } from '../../utils/soundEffects.js';

const SITUATIONS = [
  { id: 'work', label: 'Late for Work / Meeting 🏃‍♂️' },
  { id: 'call', label: 'Missed Important Call 📴' },
  { id: 'task', label: 'Forgot a Major Task 📝' },
  { id: 'plans', label: 'Cancelling Tonight’s Plans 🛋️' },
  { id: 'family', label: 'Skipping Family Gathering 🏃‍♀️' },
];

const STYLES = [
  { id: 'believable', label: 'Believable-ish 🤏' },
  { id: 'dramatic', label: 'Overly Dramatic 🎭' },
  { id: 'scifi', label: 'Sci-Fi & Time Warp 🛸' },
  { id: 'filmy', label: 'Bollywood Filmy 🎬' },
  { id: 'absurd', label: 'Pure Absurdity 👽' },
];

const EXCUSES = {
  work: {
    believable: [
      "There was unexpected road construction on the main bypass that turned a 10-minute commute into an expedition.",
      "My internet router experienced a firmware panic attack right as the morning alarms went off.",
      "A neighbor was double-parked behind my car and had to be summoned by security.",
    ],
    dramatic: [
      "I was physically ready, but the cosmic alignments were hostile to punctual arrival this morning.",
      "The elevator doors opened on my floor, looked at me, and closed out of pure spite. I was spiritually detained.",
    ],
    scifi: [
      "A localized quantum gravitational pocket formed over my bed, dilating time so 5 minutes equaled 45 earthly minutes.",
      "My smart clock synchronized with a Martian satellite operating on a 25-hour rotational cycle.",
    ],
    filmy: [
      "Babuji kehte the samay par aana chahiye, par kismat kehti hai hero ki entry hamesha der se hoti hai!",
      "Traffic mein fasa nahi tha main, bas zindagi ke imtihan de raha tha!",
    ],
    absurd: [
      "A stray cat fell asleep on my lap, and international law strictly prohibits disturbing a sleeping feline.",
      "My left shoe and right shoe had a disagreement and refused to walk in the same directional vector.",
    ],
  },
  call: {
    believable: [
      "My phone was on 'Do Not Disturb' mode from a prior conference meeting and never notified me.",
      "I had zero reception in the underground basement parking area.",
    ],
    dramatic: [
      "Your call echoed into the silence of my chamber, but my fingers were unable to breach the emotional barrier in time!",
    ],
    scifi: [
      "Solar flare activity caused atmospheric signal refraction right as your transmission pinged my device.",
    ],
    filmy: [
      "Main aawaz sun kar dauda tha, par raste mein network ne dam tod diya!",
    ],
    absurd: [
      "My phone decided it was an ancient landline and demanded I insert quarters to answer.",
    ],
  },
  task: {
    believable: [
      "I was waiting on dependency inputs from the external team before finalizing the deliverable.",
      "It was queued immediately behind the urgent server reconciliation issue from yesterday.",
    ],
    dramatic: [
      "The deadline approached like a thunderstorm, yet my creative soul was imprisoned in existential turmoil!",
    ],
    scifi: [
      "The file was uploaded successfully, but into an alternate dimension where Monday happens after Thursday.",
    ],
    filmy: [
      "Yeh task meri kismat mein tha hi nahi! Jo hota hai ache ke liye hota hai!",
    ],
    absurd: [
      "I delegated the task to my houseplant, but its quarterly performance was profoundly disappointing.",
    ],
  },
  plans: {
    believable: [
      "I caught a sudden migraine and need to lie in a dark room with an ice pack.",
      "Work handed me an unexpected critical fire drill that I have to babysit tonight.",
    ],
    dramatic: [
      "My social battery has withered into dust. If I step outside, I will dissolve into the evening mist!",
    ],
    scifi: [
      "My temporal clone from the year 2045 arrived and specifically warned me against attending dinner tonight.",
    ],
    filmy: [
      "Dosti apni jagah hai, par meri neend meri pehli mohabbat hai! Agle hafte milte hain!",
    ],
    absurd: [
      "My bed and I recently signed an exclusivity agreement that prohibits outside liaisons after 7 PM.",
    ],
  },
  family: {
    believable: [
      "I have an upset stomach from questionable takeout food and cannot leave the vicinity of the bathroom.",
      "I have an early morning professional certification exam tomorrow that requires intense cramming.",
    ],
    dramatic: [
      "My heart yearns to be among kin, yet destiny has burdened me with heavy quarantine protocols!",
    ],
    scifi: [
      "I am currently in quarantine after being tested positive for chronal radiation.",
    ],
    filmy: [
      "Khandan ki izzat bachane ke liye mera wahan na hona hi behtar tha!",
    ],
    absurd: [
      "My astrologer said meeting more than 3 blood relatives this week would trigger a volcanic eruption.",
    ],
  },
};

export default function ExcuseGeneratorApp() {
  const [situation, setSituation] = useState('work');
  const [style, setStyle] = useState('believable');
  const [excuse, setExcuse] = useState('');
  const [rating, setRating] = useState('85% Believable 🤝');
  const [favorites, setFavorites] = useState([]);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    generateExcuse(situation, style);
    try {
      const saved = localStorage.getItem('pranklab-favorite-excuses');
      if (saved) setFavorites(JSON.parse(saved));
    } catch (e) {
      // ignore
    }
  }, []);

  const generateExcuse = (sit = situation, st = style) => {
    playSuccessSound();
    const list = EXCUSES[sit]?.[st] || EXCUSES.work.believable;
    const random = list[Math.floor(Math.random() * list.length)];
    setExcuse(random);
    setIsSaved(false);

    const ratings = {
      believable: '85% Believable 🤝 (Safe to use)',
      dramatic: '34% Believable 🎭 (May require tearful delivery)',
      scifi: '4% Believable 🛸 (Only works on nerds)',
      filmy: '12% Believable 🎬 (Will cause dramatic arguments)',
      absurd: '1% Believable 👽 (Guaranteed to make them laugh)',
    };
    setRating(ratings[st] || '50% Believable');
  };

  const toggleFavorite = () => {
    let updated;
    if (favorites.includes(excuse)) {
      updated = favorites.filter((e) => e !== excuse);
      setIsSaved(false);
    } else {
      updated = [excuse, ...favorites];
      setIsSaved(true);
    }
    setFavorites(updated);
    try {
      localStorage.setItem('pranklab-favorite-excuses', JSON.stringify(updated));
    } catch (e) {
      // ignore
    }
  };

  return (
    <ProjectLayout
      title="Excuse Generator"
      emoji="🤥"
      category="Everyday Pranks"
      accentColor="#6366f1"
      onReset={() => {
        setSituation('work');
        setStyle('believable');
        generateExcuse('work', 'believable');
      }}
    >
      <Box sx={{ maxWidth: 720, mx: 'auto', mt: 1 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, sm: 4 },
            borderRadius: '26px',
            border: '1.5px solid #c7d2fe',
            bgcolor: 'background.paper',
            boxShadow: '0 12px 40px rgba(99, 102, 241, 0.08)',
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Box sx={{ fontSize: 54, mb: 1 }}>🤥</Box>
            <Typography variant="h4" fontWeight={900} sx={{ mb: 1 }}>
              Emergency Excuse Generator
            </Typography>
            <Typography variant="body2" color="text.secondary">
              For every awkward social or professional situation your imagination wasn't prepared for.
            </Typography>
          </Box>

          <Stack spacing={3}>
            {/* Situation */}
            <Box>
              <Typography fontWeight={800} fontSize={14.5} sx={{ mb: 1.2 }}>
                1. What is the Emergency Situation?
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
                {SITUATIONS.map((sit) => (
                  <Chip
                    key={sit.id}
                    label={sit.label}
                    onClick={() => {
                      setSituation(sit.id);
                      generateExcuse(sit.id, style);
                    }}
                    sx={{
                      fontWeight: 700,
                      bgcolor: situation === sit.id ? '#6366f1' : '#eef2ff',
                      color: situation === sit.id ? '#ffffff' : '#3730a3',
                      border: situation === sit.id ? '2px solid #6366f1' : '1px solid #c7d2fe',
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </Stack>
            </Box>

            {/* Style */}
            <Box>
              <Typography fontWeight={800} fontSize={14.5} sx={{ mb: 1.2 }}>
                2. Choose Excuse Fiction Style:
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
                {STYLES.map((st) => (
                  <Chip
                    key={st.id}
                    label={st.label}
                    onClick={() => {
                      setStyle(st.id);
                      generateExcuse(situation, st.id);
                    }}
                    sx={{
                      fontWeight: 700,
                      bgcolor: style === st.id ? '#4f46e5' : '#e0e7ff',
                      color: style === st.id ? '#ffffff' : '#312e81',
                      border: style === st.id ? '2px solid #4f46e5' : '1px solid #a5b4fc',
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </Stack>
            </Box>

            {/* Excuse Card */}
            <Card
              sx={{
                p: { xs: 2.5, sm: 3.5 },
                borderRadius: '22px',
                border: '2px solid #6366f1',
                background: 'linear-gradient(180deg, #f5f7ff 0%, #eef2ff 100%)',
                textAlign: 'center',
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Chip label={rating} size="small" sx={{ fontWeight: 800, bgcolor: '#e0e7ff', color: '#3730a3' }} />
                <Button
                  size="small"
                  startIcon={isSaved ? <BookmarkRoundedIcon /> : <BookmarkBorderRoundedIcon />}
                  onClick={toggleFavorite}
                  sx={{ color: '#4f46e5', fontWeight: 700 }}
                >
                  {isSaved ? 'Saved in Vault' : 'Save Excuse'}
                </Button>
              </Stack>

              <Typography
                variant="h5"
                fontWeight={800}
                fontStyle="italic"
                sx={{
                  my: 2,
                  color: '#1e1b4b',
                  lineHeight: 1.5,
                  px: { xs: 0, sm: 2 },
                }}
              >
                “{excuse}”
              </Typography>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} justifyContent="center" sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  startIcon={<ContentCopyRoundedIcon />}
                  onClick={() => {
                    navigator.clipboard.writeText(excuse);
                    alert("Excuse copied to clipboard! 📋");
                  }}
                  sx={{ bgcolor: '#4f46e5', color: '#ffffff', fontWeight: 800, '&:hover': { bgcolor: '#4338ca' } }}
                >
                  Copy Excuse 📋
                </Button>

                <Button
                  variant="contained"
                  startIcon={<WhatsAppIcon />}
                  onClick={() => {
                    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(excuse)}`, '_blank');
                  }}
                  sx={{ background: 'linear-gradient(100deg, #25D366, #128C7E)', color: '#ffffff', fontWeight: 800 }}
                >
                  Send via WhatsApp
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<CasinoRoundedIcon />}
                  onClick={() => generateExcuse()}
                  sx={{ borderColor: '#4f46e5', color: '#4f46e5', fontWeight: 800 }}
                >
                  Another Excuse 🎲
                </Button>
              </Stack>
            </Card>

            {/* Saved Vault */}
            {favorites.length > 0 && (
              <Box sx={{ mt: 2, pt: 2, borderTop: '1px dashed #c7d2fe' }}>
                <Typography fontWeight={800} fontSize={14} sx={{ mb: 1 }}>
                  Saved Favorites ({favorites.length}):
                </Typography>
                <Stack spacing={1}>
                  {favorites.slice(0, 3).map((fav, i) => (
                    <Paper key={i} sx={{ p: 1.2, bgcolor: '#f8fafc', borderRadius: '12px' }}>
                      <Typography variant="caption" fontWeight={600} color="text.secondary">
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
