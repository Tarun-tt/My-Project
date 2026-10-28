import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Chip,
  Stack,
  Card,
  Grid,
} from '@mui/material';
import PsychologyRoundedIcon from '@mui/icons-material/PsychologyRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import ShieldMoonRoundedIcon from '@mui/icons-material/ShieldMoonRounded';
import ProjectLayout from '../../components/common/ProjectLayout.jsx';
import { playSuccessSound } from '../../utils/soundEffects.js';
import { fireConfetti } from '../../utils/confettiHelper.js';

const PRESET_TEXTS = [
  "k",
  "we need to talk",
  "happy birthday! hope you're good",
  "hey stranger :)",
  "saw this and thought of you",
  "seen at 11:42 PM",
];

const MODES = [
  { id: 'overthinker', label: 'Overthinker Mode 🧠', desc: 'Analyzes every pixel and missing punctuation mark.' },
  { id: 'fbi', label: 'Best Friend FBI Mode 🕵️‍♀️', desc: 'Weaponized investigation & psychological profiling.' },
  { id: 'bollywood', label: 'Bollywood Director 🎬', desc: 'Rain in the background, violin swell, dramatic zooms.' },
  { id: 'detective', label: 'Crime Detective 🔎', desc: 'Motives, alibis, and forensic text analysis.' },
  { id: 'honest', label: 'Brutally Honest 💀', desc: 'The boring truth your ego refuses to accept.' },
];

export default function ExTextDecoderApp() {
  const [inputText, setInputText] = useState('k');
  const [selectedMode, setSelectedMode] = useState('overthinker');
  const [decodedResult, setDecodedResult] = useState(null);

  const handleDecode = (dramaticMode = false) => {
    playSuccessSound();
    fireConfetti();

    const textClean = inputText.trim().toLowerCase();

    let meaning = "";
    let threatLevel = "DEFCON 2: Elevated Heart Rate 💓";
    let advice = "";

    if (dramaticMode || selectedMode === 'bollywood') {
      meaning = "This single message is the opening sequence of a 3-hour cinematic tragedy. Notice the absence of an exclamation point? That silence echoes across seven lifetimes. Violins are weeping. In the background, slow-motion rain begins to fall on your smartphone screen.";
      threatLevel = "DEFCON 1: Cinema Melodrama 🎬";
      advice = "Do not reply. Look out of the window dramatically while touching your chin.";
    } else if (selectedMode === 'overthinker') {
      if (textClean === 'k' || textClean === 'ok') {
        meaning = "A single letter 'k'. No uppercase 'K'. No period. No emoji. They took exactly 0.2 seconds to dismiss your entire existence. The missing letter 'O' represents the vacuum in your former shared universe.";
        threatLevel = "DEFCON 1: Immediate Panic 🚨";
        advice = "Draft a 14-paragraph unsent response in your notes app immediately.";
      } else if (textClean.includes('talk')) {
        meaning = "The 4 horsemen of the apocalypse have entered the conversation. 'We need to talk' translates to: 'I have compiled a 12-slide PowerPoint presentation detailing all your character flaws.'";
        threatLevel = "DEFCON 0: Catastrophic Emergency 💥";
        advice = "Change your legal name and flee to Iceland.";
      } else {
        meaning = "They crafted this message specifically to live rent-free in your hippocampus for the next 72 business hours. Notice the spacing? Deliberate psychological warfare.";
        threatLevel = "DEFCON 2: High Overthinking 🧠";
        advice = "Screenshot and send to at least 4 group chats for independent peer review.";
      }
    } else if (selectedMode === 'fbi') {
      meaning = "Our investigation reveals this text was sent at an hour when their social defenses were down. Cross-referencing their Spotify activity shows they were listening to melancholic indie pop 14 minutes prior. They are testing the perimeter.";
      threatLevel = "Tactical Reconnaissance 📡";
      advice = "Wait exactly 3 hours and 42 minutes before replying with a lower-case 'hey'.";
    } else if (selectedMode === 'detective') {
      meaning = "Subject displayed classic signs of premeditated contact. Motive: Boredom, nostalgic delusion, or their current romantic prospect fell through. Exhibit A indicates high probability of late-night regret.";
      threatLevel = "Active Crime Scene 🔎";
      advice = "Secure the evidence. Do not engage suspect without emotional backup.";
    } else {
      // Brutally honest
      meaning = "They were sitting on the couch, bored, scrolling social media, saw a random meme, and typed 4 words without thinking about it at all. It took 3 seconds of their day. You have now spent 45 minutes analyzing it.";
      threatLevel = "Zero Threat: You Are Just Bored 🥱";
      advice = "Put the phone face down, drink a glass of water, and go to sleep.";
    }

    setDecodedResult({
      text: inputText,
      mode: MODES.find((m) => m.id === (dramaticMode ? 'bollywood' : selectedMode)).label,
      meaning,
      threatLevel,
      advice,
    });
  };

  return (
    <ProjectLayout
      title="Ex Text Decoder"
      emoji="📱"
      category="Texting & Relationships"
      accentColor="#06b6d4"
      onReset={() => {
        setInputText('k');
        setDecodedResult(null);
      }}
    >
      <Box sx={{ maxWidth: 720, mx: 'auto', mt: 1 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, sm: 4 },
            borderRadius: '26px',
            border: '1.5px solid #cffafe',
            bgcolor: 'background.paper',
            boxShadow: '0 12px 40px rgba(6, 182, 212, 0.08)',
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Box sx={{ fontSize: 54, mb: 1 }}>📱</Box>
            <Typography variant="h4" fontWeight={900} sx={{ mb: 1 }}>
              Ex-Text Forensic Decoder
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Paste a harmless 1-word text and receive the most unnecessarily dramatic psychological analysis imaginable.
            </Typography>
          </Box>

          <Stack spacing={3}>
            {/* Quick text presets */}
            <Box>
              <Typography fontWeight={800} fontSize={14.5} sx={{ mb: 1 }}>
                Quick Presets (or type your own below):
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
                {PRESET_TEXTS.map((t) => (
                  <Chip
                    key={t}
                    label={`"${t}"`}
                    onClick={() => setInputText(t)}
                    sx={{
                      fontWeight: 700,
                      bgcolor: inputText === t ? '#06b6d4' : '#ecfeff',
                      color: inputText === t ? '#ffffff' : '#0e7490',
                      border: inputText === t ? '2px solid #06b6d4' : '1px solid #a5f3fc',
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </Stack>
            </Box>

            {/* Input message */}
            <TextField
              fullWidth
              label="Suspicious Text Message"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="e.g. 'k', 'hope all is well', 'hey :)'"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '16px' } }}
            />

            {/* Decoder Modes */}
            <Box>
              <Typography fontWeight={800} fontSize={14.5} sx={{ mb: 1.2 }}>
                Select Decoding Lens:
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
                  gap: 1.2,
                }}
              >
                {MODES.map((m) => {
                  const isSelected = selectedMode === m.id;
                  return (
                    <Paper
                      key={m.id}
                      elevation={0}
                      onClick={() => setSelectedMode(m.id)}
                      sx={{
                        p: 1.5,
                        borderRadius: '16px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s ease',
                        border: isSelected ? '2px solid #06b6d4' : '1px solid #cffafe',
                        bgcolor: isSelected ? '#ecfeff' : 'transparent',
                        boxShadow: isSelected ? '0 4px 14px rgba(6, 182, 212, 0.2)' : 'none',
                        '&:hover': { borderColor: '#0891b2' },
                      }}
                    >
                      <Typography fontWeight={800} fontSize={13} color={isSelected ? '#0e7490' : 'text.primary'}>
                        {m.label}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.3, fontSize: 11 }}>
                        {m.desc}
                      </Typography>
                    </Paper>
                  );
                })}
              </Box>
            </Box>

            {/* Action buttons */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} justifyContent="center">
              <Button
                variant="contained"
                size="large"
                startIcon={<PsychologyRoundedIcon />}
                onClick={() => handleDecode(false)}
                sx={{
                  background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
                  fontWeight: 900,
                  py: 1.2,
                  px: 3,
                }}
              >
                Decode Subtext 🕵️‍♂️
              </Button>

              <Button
                variant="outlined"
                size="large"
                color="info"
                onClick={() => handleDecode(true)}
                sx={{ fontWeight: 800 }}
              >
                Maximum Drama Mode 🎬
              </Button>
            </Stack>

            {/* Results card */}
            {decodedResult && (
              <Card
                sx={{
                  p: { xs: 2.5, sm: 3.5 },
                  borderRadius: '22px',
                  border: '2px solid #06b6d4',
                  bgcolor: '#f0fdfa',
                }}
              >
                <Chip
                  label={`DECODED VIA ${decodedResult.mode.toUpperCase()}`}
                  size="small"
                  sx={{ bgcolor: '#ccfbf1', color: '#0f766e', fontWeight: 800, mb: 2 }}
                />

                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Subject Received: <strong>"{decodedResult.text}"</strong>
                </Typography>

                <Box sx={{ p: 2, bgcolor: '#ffffff', borderRadius: '16px', border: '1px solid #99f6e4', mb: 2.5 }}>
                  <Typography fontWeight={800} color="#115e59" sx={{ mb: 0.8 }}>
                    🧠 Subconscious Subtext Interpretation:
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {decodedResult.meaning}
                  </Typography>
                </Box>

                <Grid container spacing={2} sx={{ mb: 2.5 }}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ p: 1.5, bgcolor: '#ffffff', borderRadius: '14px', border: '1px solid #99f6e4' }}>
                      <Typography variant="caption" color="text.secondary" fontWeight={700}>
                        THREAT LEVEL
                      </Typography>
                      <Typography fontWeight={800} fontSize={13} color="#0f766e">
                        {decodedResult.threatLevel}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ p: 1.5, bgcolor: '#ffffff', borderRadius: '14px', border: '1px solid #99f6e4' }}>
                      <Typography variant="caption" color="text.secondary" fontWeight={700}>
                        TACTICAL ADVICE
                      </Typography>
                      <Typography fontWeight={800} fontSize={13} color="#0f766e">
                        {decodedResult.advice}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<ContentCopyRoundedIcon />}
                  onClick={() => {
                    const text = `📱 EX TEXT FORENSIC ANALYSIS:\nText: "${decodedResult.text}"\nMeaning: ${decodedResult.meaning}\nThreat Level: ${decodedResult.threatLevel}\n— Decoded on PrankLab 🤡`;
                    navigator.clipboard.writeText(text);
                    alert("Analysis copied to clipboard! Share with friends! 📋");
                  }}
                  color="info"
                  sx={{ fontWeight: 800 }}
                >
                  Copy Forensic Analysis
                </Button>
              </Card>
            )}

            <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center', display: 'block' }}>
              🔒 Privacy Guarantee: All texts are processed in local memory only. Your ex remains blissfully unaware.
            </Typography>
          </Stack>
        </Paper>
      </Box>
    </ProjectLayout>
  );
}
