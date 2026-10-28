import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Chip,
  Stack,
  LinearProgress,
  Card,
  Grid,
} from '@mui/material';
import LocalFireDepartmentRoundedIcon from '@mui/icons-material/LocalFireDepartmentRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import CasinoRoundedIcon from '@mui/icons-material/CasinoRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import ProjectLayout from '../../components/common/ProjectLayout.jsx';
import { playSuccessSound, playCelebrationSound } from '../../utils/soundEffects.js';
import { fireConfetti, fireCannons } from '../../utils/confettiHelper.js';

const ROAST_STEPS = [
  {
    step: 1,
    title: "Who is the Suspect?",
    subtitle: "Enter your friend's legal or street name so we can officially target them.",
    emoji: "🎯",
  },
  {
    step: 2,
    title: "Their Worst Sleep Crime",
    subtitle: "What is their natural biological sleeping catastrophe?",
    emoji: "🛌",
    options: [
      { label: "Snoozes 14 alarms every 5 mins", trait: "alarm_terrorist", desc: "Wakes up the entire neighborhood before themselves." },
      { label: "Sleeps at 4:30 AM scrolling reels", trait: "vampire", desc: "Photosynthetic, avoids daytime sunlight." },
      { label: "Can sleep through a category 5 hurricane", trait: "hibernator", desc: "Practically legally deceased on weekends." },
      { label: "Falls asleep 3 minutes into any movie", trait: "cinema_sleeper", desc: "Always asks 'Who is that?' during the climax." },
    ],
  },
  {
    step: 3,
    title: "Texting & Response Felony",
    subtitle: "How bad is their communication protocol?",
    emoji: "📱",
    options: [
      { label: "Replies 3 business weeks later with 'omg sorry'", trait: "ghost", desc: "Archeological excavation needed for their replies." },
      { label: "Sends 58 memes while ignoring my question", trait: "meme_distractor", desc: "Active on Instagram, declared missing in WhatsApp." },
      { label: "Leaves on read and replies in their head", trait: "telepathic", desc: "Thinks mental telepathy delivers text messages." },
      { label: "Answers an essay with 'k' or '👍'", trait: "cold_blooded", desc: "Single-letter replies causing emotional turmoil." },
    ],
  },
  {
    step: 4,
    title: "Food & Snacking Thievery",
    subtitle: "What is their criminal record when food arrives?",
    emoji: "🍟",
    options: [
      { label: "'I am not hungry' then eats 80% of my fries", trait: "fry_tax_evader", desc: "The French fry bandit of modern times." },
      { label: "Takes the biggest slice of pizza without remorse", trait: "pizza_pirate", desc: "Eyes the cheesy center like a hawk." },
      { label: "Spends 45 mins deciding then says 'Kuch bhi'", trait: "indecisive_menace", desc: "Rejecting 14 consecutive restaurant ideas." },
      { label: "Licks their fingers before offering you a chip", trait: "biohazard", desc: "Questionable dining hygiene practices." },
    ],
  },
  {
    step: 5,
    title: "Gym & Fitness Delusion",
    subtitle: "What is their relationship with physical exercise?",
    emoji: "🏋️‍♂️",
    options: [
      { label: "Buys $200 gym gear and goes once a month", trait: "aesthetic_athlete", desc: "Donates monthly gym fees as a non-profit charity." },
      { label: "Drinks protein powder like it's water", trait: "whey_monster", desc: "Checks reflection in every car window." },
      { label: "Their cardio is sprinting to the food delivery rider", trait: "snack_runner", desc: "Only runs when the doorbell rings." },
      { label: "Thinks stretching while yawning counts as yoga", trait: "couch_monk", desc: "Meditation through horizontal slumber." },
    ],
  },
  {
    step: 6,
    title: "Navigation & Direction Disability",
    subtitle: "How reliable are they when traveling?",
    emoji: "🗺️",
    options: [
      { label: "Argues aggressively with Google Maps", trait: "cartography_rebel", desc: "'The voice lady doesn't know my secret shortcut!'" },
      { label: "Doesn't know north from their left shoe", trait: "compass_deficient", desc: "Needs GPS to find the kitchen." },
      { label: "Falls asleep as passenger 4 minutes in", trait: "co_pilot_slumber", desc: "Zero navigation support, 100% snoring." },
      { label: "Says 'I am 5 mins away' while in the shower", trait: "time_traveler", desc: "Time is merely an illusion to them." },
    ],
  },
  {
    step: 7,
    title: "Drama & Inconvenience Handling",
    subtitle: "How do they handle minor daily inconveniences?",
    emoji: "🎭",
    options: [
      { label: "Sighs deeply like Shakespeare in rainy weather", trait: "tragedy_queen", desc: "Cold coffee is treated like an existential curse." },
      { label: "Stages a 3-act monologue in group chats", trait: "chat_thespian", desc: "Needs dramatic orchestral background music." },
      { label: "Immediately googles symptoms and plans funeral", trait: "webmd_victim", desc: "A mild sneeze means 48 hours left to live." },
      { label: "Says 'I don't care' but secretly plots revenge", trait: "stealth_grudger", desc: "Remembers something you did in July 2018." },
    ],
  },
  {
    step: 8,
    title: "Select Roast Severity",
    subtitle: "How cooked do you want them to be?",
    emoji: "🌋",
    options: [
      { label: "Mild & Playful 🌶️", trait: "mild", desc: "A gentle reality check with a loving hug." },
      { label: "Medium Spicy 🔥", trait: "medium", desc: "Moderate burns with temporary emotional damage." },
      { label: "Nuclear Savage 🌋", trait: "nuclear", desc: "Full thermal obliteration. Friendship at risk." },
    ],
  },
];

export default function RoastMyFriendApp() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [friendName, setFriendName] = useState('');
  const [answers, setAnswers] = useState({});
  const [roastReport, setRoastReport] = useState(null);

  const currentStep = ROAST_STEPS[currentStepIndex];

  const handleSelectOption = (trait) => {
    playSuccessSound();
    setAnswers({ ...answers, [currentStep.step]: trait });

    if (currentStepIndex < ROAST_STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      generateFinalRoast();
    }
  };

  const generateFinalRoast = () => {
    playCelebrationSound();
    fireCannons();

    const name = friendName.trim() || "My Friend";

    const customParagraphs = [
      `Let it be etched into public record that ${name} is a certified menace to society.`,
      `Their biological clock is in shambles—relying on 14 alarms while sleeping horizontally like an unbothered sloth.`,
      `Communication with ${name} requires historical patience; they will read your urgent message, mentally draft a reply in their dreams, and emerge 3 weeks later like an archeological discovery.`,
      `When it comes to dining, ${name}'s signature move is declaring 'I'm not hungry' and then inhaling 85% of your French fries without blinking.`,
      `Navigation? ${name} would argue with satellite telemetry while holding a map upside down.`,
      `Yet somehow, despite these catastrophic red flags, they remain your friend—mostly because finding someone else with this exact level of chaotic comedy is nearly impossible.`,
    ];

    setRoastReport({
      name,
      roastText: customParagraphs.join(' '),
      burnRating: (9.1 + Math.random() * 0.8).toFixed(1),
      survivability: "14%",
      recommendation: "Treat them to dinner, but keep your fries under strict surveillance.",
    });
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setFriendName('');
    setAnswers({});
    setRoastReport(null);
  };

  return (
    <ProjectLayout
      title="Roast My Friend"
      emoji="🔥"
      category="Comedy & Roasting"
      accentColor="#f95738"
      onReset={handleReset}
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
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Box sx={{ fontSize: 54, mb: 1 }}>🔥</Box>
            <Typography variant="h4" fontWeight={900} sx={{ mb: 1 }}>
              Roast Interrogation & Deep Scan
            </Typography>
            <Typography variant="body2" color="text.secondary">
              An 8-step forensic investigation to uncover your friend's worst traits and compile the ultimate burn.
            </Typography>
          </Box>

          {!roastReport ? (
            <Box>
              {/* Step indicator */}
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                <Typography variant="caption" fontWeight={800} color="#ea580c">
                  Step {currentStepIndex + 1} of {ROAST_STEPS.length}
                </Typography>
                <Typography variant="caption" color="text.secondary" fontWeight={700}>
                  {Math.round(((currentStepIndex + 1) / ROAST_STEPS.length) * 100)}% analyzed
                </Typography>
              </Stack>

              <LinearProgress
                variant="determinate"
                value={((currentStepIndex + 1) / ROAST_STEPS.length) * 100}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  mb: 3.5,
                  bgcolor: '#ffedd5',
                  '& .MuiLinearProgress-bar': {
                    background: 'linear-gradient(90deg, #fb923c, #ea580c)',
                  },
                }}
              />

              {/* Step Header */}
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Box sx={{ fontSize: 44, mb: 1 }}>{currentStep.emoji}</Box>
                <Typography variant="h5" fontWeight={900} sx={{ mb: 0.5 }}>
                  {currentStep.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {currentStep.subtitle}
                </Typography>
              </Box>

              {/* Step 1: Input Name */}
              {currentStep.step === 1 ? (
                <Stack spacing={2.5}>
                  <TextField
                    fullWidth
                    label="Victim's Full Name or Nickname"
                    value={friendName}
                    onChange={(e) => setFriendName(e.target.value)}
                    placeholder="e.g. Rahul, Sneha, Rohan..."
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '16px' } }}
                    autoFocus
                  />
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForwardRoundedIcon />}
                    disabled={!friendName.trim()}
                    onClick={() => setCurrentStepIndex(1)}
                    sx={{
                      background: 'linear-gradient(135deg, #ea580c, #c2410c)',
                      fontWeight: 800,
                      py: 1.3,
                    }}
                  >
                    Lock In Target → Next Step
                  </Button>
                </Stack>
              ) : (
                /* Steps 2-8: Option cards */
                <Stack spacing={1.5}>
                  {currentStep.options.map((opt, i) => (
                    <Paper
                      key={i}
                      elevation={0}
                      onClick={() => handleSelectOption(opt.trait)}
                      sx={{
                        p: 2,
                        borderRadius: '16px',
                        border: '1.5px solid #fed7aa',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          borderColor: '#ea580c',
                          bgcolor: '#fff7ed',
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      <Typography fontWeight={800} fontSize={14.5} color="#431407">
                        {opt.label}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.3 }}>
                        {opt.desc}
                      </Typography>
                    </Paper>
                  ))}
                </Stack>
              )}

              {/* Previous step button */}
              {currentStepIndex > 0 && (
                <Box sx={{ mt: 3, textAlign: 'left' }}>
                  <Button
                    size="small"
                    startIcon={<ArrowBackRoundedIcon />}
                    onClick={() => setCurrentStepIndex((prev) => prev - 1)}
                    sx={{ color: '#ea580c', fontWeight: 700 }}
                  >
                    Previous Step
                  </Button>
                </Box>
              )}
            </Box>
          ) : (
            /* Final Burn Scorecard */
            <Card
              sx={{
                p: { xs: 2.5, sm: 4 },
                borderRadius: '24px',
                border: '2px solid #ea580c',
                background: 'linear-gradient(180deg, #fffaf5 0%, #fff7ed 100%)',
                textAlign: 'center',
              }}
            >
              <Chip
                icon={<LocalFireDepartmentRoundedIcon sx={{ fontSize: 16 }} />}
                label={`FORENSIC COMEDY DOSSIER: ${roastReport.name.toUpperCase()}`}
                sx={{ bgcolor: '#ffedd5', color: '#c2410c', fontWeight: 900, mb: 2 }}
              />

              <Typography variant="h5" fontWeight={900} sx={{ mb: 2, color: '#431407' }}>
                The Complete Breakdown of {roastReport.name} 🔥
              </Typography>

              <Box sx={{ p: 2.5, bgcolor: '#ffffff', borderRadius: '18px', border: '1px solid #fed7aa', mb: 3, textAlign: 'left' }}>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.75 }}>
                  {roastReport.roastText}
                </Typography>
              </Box>

              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6} sm={4}>
                  <Box sx={{ p: 1.5, bgcolor: '#ffffff', borderRadius: '14px', border: '1px solid #fed7aa' }}>
                    <Typography variant="caption" fontWeight={700} color="text.secondary">
                      BURN RATING
                    </Typography>
                    <Typography fontWeight={900} fontSize={18} color="#ea580c">
                      {roastReport.burnRating} / 10
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Box sx={{ p: 1.5, bgcolor: '#ffffff', borderRadius: '14px', border: '1px solid #fed7aa' }}>
                    <Typography variant="caption" fontWeight={700} color="text.secondary">
                      SURVIVABILITY
                    </Typography>
                    <Typography fontWeight={900} fontSize={18} color="#ea580c">
                      {roastReport.survivability}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ p: 1.5, bgcolor: '#ffffff', borderRadius: '14px', border: '1px solid #fed7aa' }}>
                    <Typography variant="caption" fontWeight={700} color="text.secondary">
                      VERDICT
                    </Typography>
                    <Typography fontWeight={900} fontSize={14} color="#ea580c">
                      Cooked to Crisp 🍳
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} justifyContent="center">
                <Button
                  variant="contained"
                  startIcon={<ContentCopyRoundedIcon />}
                  onClick={() => {
                    const text = `🔥 OFFICIAL ROAST OF ${roastReport.name.toUpperCase()} 🔥\n\n${roastReport.roastText}\n\n• Burn Rating: ${roastReport.burnRating}/10\n• Generated on PrankLab by Tarun Tiwari 🤡`;
                    navigator.clipboard.writeText(text);
                    alert("Roast copied to clipboard! Send it to them! 📋");
                  }}
                  sx={{ bgcolor: '#ea580c', color: '#ffffff', fontWeight: 800, '&:hover': { bgcolor: '#c2410c' } }}
                >
                  Share Roast with {roastReport.name} 📋
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<CasinoRoundedIcon />}
                  onClick={handleReset}
                  sx={{ borderColor: '#ea580c', color: '#ea580c', fontWeight: 800 }}
                >
                  Roast Another Friend
                </Button>
              </Stack>
            </Card>
          )}
        </Paper>
      </Box>
    </ProjectLayout>
  );
}
