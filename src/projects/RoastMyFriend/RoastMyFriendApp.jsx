import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Chip,
  Stack,
  Card,
  CardContent,
  Slider,
  Grid,
} from '@mui/material';
import LocalFireDepartmentRoundedIcon from '@mui/icons-material/LocalFireDepartmentRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import CasinoRoundedIcon from '@mui/icons-material/CasinoRounded';
import ProjectLayout from '../../components/common/ProjectLayout.jsx';
import { playSuccessSound } from '../../utils/soundEffects.js';
import { fireConfetti } from '../../utils/confettiHelper.js';

const PERSONALITIES = [
  { id: 'lazy', label: 'Lazy Legend', emoji: '🦥', desc: 'Could win an Olympic medal in lying horizontally.' },
  { id: 'gym', label: 'Gym Bro', emoji: '🏋️‍♂️', desc: 'Drinks protein shakes before brushing their teeth.' },
  { id: 'overthinker', label: 'Overthinker', emoji: '🧠', desc: 'Analyzes why you used a period instead of an exclamation mark.' },
  { id: 'gamer', label: 'Gamer', emoji: '🎮', desc: 'Has 4000 hours in game but 0 hours in reality.' },
  { id: 'drama', label: 'Drama Specialist', emoji: '🎭', desc: 'Life is a daily Bollywood television serial.' },
  { id: 'late', label: 'Late Responder', emoji: '⏳', desc: 'Replies 3 business weeks later with "omg so sorry was busy".' },
  { id: 'food', label: 'Food Thief', emoji: '🍟', desc: 'Says "I am not hungry" and devours 85% of your meal.' },
  { id: 'office', label: 'Office Slacker', emoji: '☕', desc: 'Masters the sacred art of looking stressed while opening 54 empty tabs.' },
];

const ROAST_TEMPLATES = {
  lazy: [
    "{name}'s idea of heavy cardio is rolling over in bed to plug in the phone charger.",
    "{name} has been sitting on the couch for so long that the cushions have officially registered joint custody.",
    "If {name} ran as fast as they run away from physical responsibilities, they’d be Usain Bolt.",
    "{name}'s morning routine consists of snoozing 8 alarms and contemplating the meaning of existence.",
  ],
  gym: [
    "{name} talks about protein so much that even their saliva is 40% whey isolate.",
    "{name} will flex in the mirror for 35 minutes and then ask you if the lighting is optimal for their deltoids.",
    "If {name} put half as much effort into relationships as they put into re-racking someone else's weights, they’d be married by now.",
    "{name}'s favorite romantic date is explaining their creatine cycle to someone holding their breath.",
  ],
  overthinker: [
    "{name} will receive a text saying 'ok' and immediately hire a forensic linguistic team to decode the insult.",
    "{name}'s brain operates 47 simultaneous conspiracy theories about why the waiter didn't say goodbye.",
    "If overthinking burned calories, {name} would be invisible by now.",
    "{name} doesn't just worry about the future; they worry about alternate parallel universes where things went wrong.",
  ],
  gamer: [
    "{name} has saved the digital world 14 times this week but hasn't touched a bar of soap once.",
    "{name}'s posture looks like an overcooked shrimp clinging to a gaming chair for dear life.",
    "The only grass {name} has touched in the last six months is the high-res texture pack in Minecraft.",
    "{name} blames lag for literally everything in life, including why they forgot your birthday.",
  ],
  drama: [
    "{name} can turn a lukewarm cappuccino into a 3-act Shakespearean tragedy with musical interludes.",
    "If there was an Oscar for sighing dramatically at an inconvenience, {name} would have a shelf full.",
    "{name}'s diary doesn't have entries; it has official press releases of victimhood.",
    "Even Bollywood screenwriters call {name} for inspiration on unrealistic family drama.",
  ],
  late: [
    "{name} replies so late that their messages arrive with historical significance and archeological dust.",
    "You could send a message in a bottle across the Pacific Ocean and it would arrive faster than {name}'s 'Hey sorry just saw this'.",
    "{name}'s sense of punctuality is like the Loch Ness monster: rumored to exist, but never seen.",
    "{name}'s favorite lie is 'I’m 5 minutes away' when they are still standing under the shower.",
  ],
  food: [
    "{name} will look directly into your soul, claim they 'aren't hungry', and then inhale your entire plate.",
    "The French fry tax was literally drafted into international law specifically because of {name}.",
    "If you leave {name} alone with your snacks for 4 seconds, consider those snacks legally expropriated.",
    "{name} believes sharing is caring, but only when it is YOUR food being shared.",
  ],
  office: [
    "{name} spends 45 minutes finding the right Spotify playlist to begin a 3-minute Excel spreadsheet task.",
    "{name}'s contribution to group meetings is vigorously nodding while mentally planning lunch.",
    "Nobody looks busier than {name} when someone is about to assign an actual task.",
    "{name} has mastered the keyboard shortcut for Alt+Tab like an esports tournament finalist.",
  ],
};

export default function RoastMyFriendApp() {
  const [friendName, setFriendName] = useState('');
  const [selectedPersona, setSelectedPersona] = useState(PERSONALITIES[0].id);
  const [intensity, setIntensity] = useState('Savage');
  const [roastResult, setRoastResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('pranklab-roast-history');
      if (saved) setHistory(JSON.parse(saved));
    } catch (e) {
      // ignore
    }
  }, []);

  const handleRoast = () => {
    const targetName = friendName.trim() || 'My Friend';
    const templates = ROAST_TEMPLATES[selectedPersona] || ROAST_TEMPLATES.lazy;
    const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
    const roastText = randomTemplate.replace(/{name}/g, targetName);

    const burnRating = (8.5 + Math.random() * 1.4).toFixed(1);
    const emotionalDamage = intensity === 'Mild' ? 'Noticeable 🩹' : intensity === 'Savage' ? 'Severe 🔥' : 'Catastrophic 🌋';
    const personaObj = PERSONALITIES.find((p) => p.id === selectedPersona);

    const result = {
      name: targetName,
      roastText,
      burnRating,
      emotionalDamage,
      intensity,
      persona: personaObj.label,
      emoji: personaObj.emoji,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    playSuccessSound();
    fireConfetti();
    setRoastResult(result);

    const updated = [result, ...history.slice(0, 4)];
    setHistory(updated);
    try {
      localStorage.setItem('pranklab-roast-history', JSON.stringify(updated));
    } catch (e) {
      // ignore
    }
  };

  const handleCopy = () => {
    if (!roastResult) return;
    const text = `🔥 ROAST OF ${roastResult.name.toUpperCase()} 🔥\n\n"${roastResult.roastText}"\n\n• Burn Rating: ${roastResult.burnRating}/10\n• Emotional Damage: ${roastResult.emotionalDamage}\n— Generated by PrankLab 🤡`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <ProjectLayout
      title="Roast My Friend"
      emoji="🔥"
      category="Comedy & Roasting"
      accentColor="#f95738"
      onReset={() => {
        setFriendName('');
        setRoastResult(null);
      }}
    >
      <Box sx={{ maxWidth: 720, mx: 'auto', mt: 1 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, sm: 4 },
            borderRadius: '26px',
            border: '1.5px solid #ffedd5',
            bgcolor: 'background.paper',
            boxShadow: '0 12px 40px rgba(249, 87, 56, 0.08)',
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Box sx={{ fontSize: 56, mb: 1 }}>🔥</Box>
            <Typography variant="h4" fontWeight={900} sx={{ mb: 1 }}>
              Roast My Friend Generator
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Enter your victim's name, choose their fatal flaw, and let automated comedy deliver the truth.
            </Typography>
          </Box>

          <Stack spacing={3}>
            {/* Friend Name Field */}
            <TextField
              fullWidth
              label="Friend's Name or Nickname"
              placeholder="e.g. Rahul, Sneha, That One Guy..."
              value={friendName}
              onChange={(e) => setFriendName(e.target.value)}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '16px' } }}
            />

            {/* Personality Archetypes */}
            <Box>
              <Typography fontWeight={800} fontSize={14.5} sx={{ mb: 1.5 }}>
                Select Their Core Personality Flaw:
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(4, 1fr)' },
                  gap: 1.2,
                }}
              >
                {PERSONALITIES.map((p) => {
                  const isSelected = selectedPersona === p.id;
                  return (
                    <Paper
                      key={p.id}
                      elevation={0}
                      onClick={() => setSelectedPersona(p.id)}
                      sx={{
                        p: 1.5,
                        borderRadius: '16px',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.2s ease',
                        border: isSelected ? '2px solid #f95738' : '1px solid #fed7aa',
                        bgcolor: isSelected ? '#fff7ed' : 'transparent',
                        transform: isSelected ? 'translateY(-2px)' : 'none',
                        boxShadow: isSelected ? '0 4px 14px rgba(249, 87, 56, 0.2)' : 'none',
                        '&:hover': { borderColor: '#f97316' },
                      }}
                    >
                      <Box sx={{ fontSize: 26, mb: 0.5 }}>{p.emoji}</Box>
                      <Typography fontWeight={800} fontSize={12.5}>
                        {p.label}
                      </Typography>
                    </Paper>
                  );
                })}
              </Box>
            </Box>

            {/* Intensity Selector */}
            <Box>
              <Typography fontWeight={800} fontSize={14.5} sx={{ mb: 1 }}>
                Roast Intensity Level:
              </Typography>
              <Stack direction="row" spacing={1.5}>
                {['Mild 🌶️', 'Savage 🔥', 'Extra Dramatic 🌋'].map((level) => {
                  const cleanLevel = level.split(' ')[0];
                  const isSelected = intensity === cleanLevel;
                  return (
                    <Chip
                      key={level}
                      label={level}
                      onClick={() => setIntensity(cleanLevel)}
                      sx={{
                        fontWeight: 800,
                        px: 1,
                        py: 2,
                        borderRadius: '12px',
                        cursor: 'pointer',
                        bgcolor: isSelected ? '#ea580c' : '#ffedd5',
                        color: isSelected ? '#ffffff' : '#9a3412',
                        border: isSelected ? '2px solid #ea580c' : '1px solid #fdba74',
                        '&:hover': { bgcolor: isSelected ? '#c2410c' : '#fed7aa' },
                      }}
                    />
                  );
                })}
              </Stack>
            </Box>

            {/* Submit Button */}
            <Button
              variant="contained"
              size="large"
              startIcon={<LocalFireDepartmentRoundedIcon />}
              onClick={handleRoast}
              sx={{
                background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
                boxShadow: '0 8px 24px rgba(234, 88, 12, 0.35)',
                fontSize: 16,
                fontWeight: 900,
                py: 1.4,
              }}
            >
              Generate Brutal Roast 🔥
            </Button>
          </Stack>

          {/* Roast Result Scorecard */}
          {roastResult && (
            <Card
              sx={{
                mt: 4,
                borderRadius: '22px',
                border: '2px solid #f97316',
                background: 'linear-gradient(180deg, #fffaf5 0%, #fff7ed 100%)',
                boxShadow: '0 16px 40px rgba(234, 88, 12, 0.15)',
                p: { xs: 2.5, sm: 3.5 },
                textAlign: 'center',
              }}
            >
              <Chip
                label={`VERDICT FOR ${roastResult.name.toUpperCase()} ${roastResult.emoji}`}
                size="small"
                sx={{
                  bgcolor: '#ffedd5',
                  color: '#c2410c',
                  fontWeight: 900,
                  fontSize: 11,
                  mb: 2,
                }}
              />

              <Typography
                variant="h5"
                fontWeight={800}
                fontStyle="italic"
                sx={{
                  mb: 3,
                  color: '#431407',
                  lineHeight: 1.4,
                  px: { xs: 0, sm: 2 },
                }}
              >
                “{roastResult.roastText}”
              </Typography>

              {/* Scorecard Stats */}
              <Grid container spacing={1.5} sx={{ mb: 3 }}>
                <Grid item xs={4}>
                  <Box sx={{ p: 1.5, bgcolor: '#ffffff', borderRadius: '16px', border: '1px solid #fed7aa' }}>
                    <Typography variant="caption" color="text.secondary" fontWeight={700}>
                      BURN LEVEL
                    </Typography>
                    <Typography fontWeight={900} fontSize={18} color="#ea580c">
                      {roastResult.burnRating} / 10
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ p: 1.5, bgcolor: '#ffffff', borderRadius: '16px', border: '1px solid #fed7aa' }}>
                    <Typography variant="caption" color="text.secondary" fontWeight={700}>
                      DAMAGE
                    </Typography>
                    <Typography fontWeight={900} fontSize={14} color="#ea580c" sx={{ mt: 0.5 }}>
                      {roastResult.emotionalDamage}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ p: 1.5, bgcolor: '#ffffff', borderRadius: '16px', border: '1px solid #fed7aa' }}>
                    <Typography variant="caption" color="text.secondary" fontWeight={700}>
                      STATUS
                    </Typography>
                    <Typography fontWeight={900} fontSize={14} color="#ea580c" sx={{ mt: 0.5 }}>
                      Cooked 🍳
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              {/* Action Buttons */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} justifyContent="center">
                <Button
                  variant="contained"
                  startIcon={<ContentCopyRoundedIcon />}
                  onClick={handleCopy}
                  sx={{
                    bgcolor: '#ea580c',
                    color: '#ffffff',
                    fontWeight: 800,
                    '&:hover': { bgcolor: '#c2410c' },
                  }}
                >
                  {copied ? 'Copied to Clipboard! 📋' : 'Copy Roast'}
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<CasinoRoundedIcon />}
                  onClick={handleRoast}
                  sx={{ borderColor: '#ea580c', color: '#ea580c', fontWeight: 800 }}
                >
                  Roast Again 🎲
                </Button>
              </Stack>
            </Card>
          )}
        </Paper>
      </Box>
    </ProjectLayout>
  );
}
