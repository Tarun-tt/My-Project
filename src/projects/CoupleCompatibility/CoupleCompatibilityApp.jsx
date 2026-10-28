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
  LinearProgress,
} from '@mui/material';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import ProjectLayout from '../../components/common/ProjectLayout.jsx';
import { playSuccessSound, playCelebrationSound } from '../../utils/soundEffects.js';
import { fireCannons, fireConfetti } from '../../utils/confettiHelper.js';

const COUPLE_STEPS = [
  {
    step: 1,
    title: "The Contenders & Couple Codename",
    subtitle: "Enter both partner names and your official debate team codename.",
    emoji: "💑",
  },
  {
    step: 2,
    title: "The Bedroom AC Temperature Warfare",
    subtitle: "What is your biological climate policy when going to sleep?",
    emoji: "❄️",
    options: [
      { label: "Arctic Tundra (16°C with 2 heavy duvets like penguins)", trait: "arctic", desc: "One person shivers while the other thrives in ice." },
      { label: "Saharan Desert (26°C with fan on slowest setting)", trait: "desert", desc: "A tropical sauna experience every night." },
      { label: "Eternal Battle: One foot outside the blanket at 22°C", trait: "compromise", desc: "Delicate thermodynamic equilibrium." },
      { label: "Silent War: Sneaking to change thermostat every 2 hours", trait: "ninja", desc: "Covert nocturnal temperature espionage." },
    ],
  },
  {
    step: 3,
    title: "The 'I am 5 Minutes Away' Truth Translation",
    subtitle: "When one of you texts 'I'm 5 mins away', what is the physical reality?",
    emoji: "🚗",
    options: [
      { label: "Literally pulling into the driveway right now", trait: "honest", desc: "Statistically improbable, occurs in 0.04% of cases." },
      { label: "Just turned off the shower and still wrapped in a towel", trait: "towel_state", desc: "Standard human delay protocol." },
      { label: "Staring blankly into the closet having a fashion crisis", trait: "closet_spiral", desc: "No clothes to wear despite 400 hangers." },
      { label: "Haven't even found the car keys or wallet yet", trait: "chaos_runner", desc: "Turning the entire house upside down." },
    ],
  },
  {
    step: 4,
    title: "The 'Where Do You Want to Eat?' Infinite Loop",
    subtitle: "How does the daily dinner decision nightmare unfold?",
    emoji: "🍕",
    options: [
      { label: "'What do you want?' -> 'Anything' -> 'Pizza?' -> 'No'", trait: "infinite_rejection", desc: "90 minutes of systematic food rejection." },
      { label: "One person decisively orders without asking, works like magic", trait: "dictator", desc: "Benevolent culinary leadership." },
      { label: "Both starve quietly on the couch because neither will pick", trait: "starvation", desc: "Mutual stubborn paralysis." },
      { label: "Order from 2 completely separate restaurants to keep peace", trait: "double_delivery", desc: "Doubling delivery fees for marital harmony." },
    ],
  },
  {
    step: 5,
    title: "The French Fry & Plate Thievery Defense Treaty",
    subtitle: "Partner: 'I'm not hungry, don't get me anything'. Food arrives. What happens?",
    emoji: "🍟",
    options: [
      { label: "Immediately grabs the crispest golden fry with zero shame", trait: "fry_pirate", desc: "'It just smelled so good!' The classic heist." },
      { label: "Eats 65% of the food & asks 'Why didn't you get large?'", trait: "gaslight_eater", desc: "The audacity level exceeds maximum safety limits." },
      { label: "Strict food territorial boundaries strictly maintained", trait: "guarded", desc: "Fork hovering defensively over the plate." },
      { label: "I preemptively order extra knowing the inevitable ambush", trait: "tactician", desc: "5D chess relationship defense strategy." },
    ],
  },
  {
    step: 6,
    title: "The Netflix 90-Minute Browse Tragedy",
    subtitle: "What is your Friday night movie streaming success rate?",
    emoji: "📺",
    options: [
      { label: "Browse trailers for 80 minutes, then fall asleep at 10 PM", trait: "trailer_sleeper", desc: "The movie previews were the main event." },
      { label: "Rewatch the exact same sitcom for the 18th time", trait: "sitcom_loop", desc: "Emotional comfort over new plotlines." },
      { label: "Fight over 3-hour crime documentary vs light romantic comedy", trait: "genre_war", desc: "Murder mysteries vs cheesy meet-cutes." },
      { label: "One partner falls asleep 4 minutes after pressing Play", trait: "quick_nap", desc: "Then wakes up at the ending asking 'Who died?'" },
    ],
  },
  {
    step: 7,
    title: "Airport Arrival & Travel Anxiety Index",
    subtitle: "Your flight departs at 10:30 AM. What time do you arrive at the terminal?",
    emoji: "✈️",
    options: [
      { label: "6:15 AM: Sitting at the gate watching sunrise with cleaners", trait: "anxious_early", desc: "Father-level airport preparedness." },
      { label: "10:10 AM: Sprinting through security shoes-in-hand like Tom Cruise", trait: "terminal_sprinter", desc: "Adrenaline-fueled gate boarding." },
      { label: "Chill 2 hours early: Relaxed coffee and duty-free perfume testing", trait: "zen_traveler", desc: "Balanced vacation energy." },
      { label: "One partner having a panic attack while the other browses snacks", trait: "mismatched_pair", desc: "The ultimate couple travel dynamic." },
    ],
  },
  {
    step: 8,
    title: "Post-Disagreement Reconciliation Strategy",
    subtitle: "After an intense argument about something totally trivial, how do you make peace?",
    emoji: "🕊️",
    options: [
      { label: "Heavy silence followed by: 'Do you want tacos / boba?'", trait: "food_truce", desc: "Culinary ceasefire treaty." },
      { label: "Sending 12 funny Instagram reels without acknowledging the fight", trait: "meme_diplomacy", desc: "The meme peace agreement." },
      { label: "Both stubbornly wait until someone bursts out laughing", trait: "giggle_break", desc: "Laughter breaks the stubborn ice." },
      { label: "Drafting a PowerPoint presentation proving I was right all along", trait: "attorney", desc: "Legal representation required." },
    ],
  },
];

export default function CoupleCompatibilityApp() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [p1, setP1] = useState('');
  const [p2, setP2] = useState('');
  const [coupleCodename, setCoupleCodename] = useState('');
  const [answers, setAnswers] = useState({});
  const [report, setReport] = useState(null);

  const currentStep = COUPLE_STEPS[currentStepIndex];
  const totalSteps = COUPLE_STEPS.length;
  const progressPercent = Math.round(((currentStepIndex + 1) / totalSteps) * 100);

  const handleSelectOption = (trait) => {
    playSuccessSound();
    setAnswers({
      ...answers,
      [currentStep.step]: trait,
    });
  };

  const handleNext = () => {
    if (currentStepIndex === 0) {
      if (!p1.trim() || !p2.trim()) {
        alert("Please enter names for both partners!");
        return;
      }
    } else {
      if (!answers[currentStep.step]) {
        alert("Please pick an answer to calculate this compatibility dimension!");
        return;
      }
    }

    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      calculateCompatibility();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const calculateCompatibility = () => {
    playCelebrationSound();
    fireCannons();

    const score = Math.floor(86 + Math.random() * 12);

    const strengths = [
      "Both agree that food tastes 200% better when stolen directly from the other's plate.",
      "Synchronized talent for scrolling Netflix for an hour and watching nothing.",
      "Shared mutual hatred of early morning phone calls and morning alarms.",
      "Unspoken communication via eye contact in awkward social gatherings.",
    ];

    const hazards = [
      "High probability of thermodynamic civil war over the bedroom AC thermostat.",
      "Both partners stubbornly refuse to take responsibility for picking dinner.",
      "Severe window-seat jealousy on vacation flights.",
    ];

    const codename = coupleCodename.trim() || `${p1.trim().slice(0, 3)}${p2.trim().slice(-3)} Duo 💖`;

    setReport({
      p1: p1.trim(),
      p2: p2.trim(),
      codename,
      score,
      strengths,
      hazards,
      verdict: score >= 92 ? "Soulmates with High Bicker Capacity 💖" : "Certified Adorable Chaos Duo 💕",
      date: new Date().toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' }),
    });
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setP1('');
    setP2('');
    setCoupleCodename('');
    setAnswers({});
    setReport(null);
  };

  const copyReport = () => {
    if (!report) return;
    const text = `💑 OFFICIAL COUPLE COMPATIBILITY REPORT 💑\n\n` +
      `Partners: ${report.p1} & ${report.p2}\n` +
      `Couple Codename: ${report.codename}\n` +
      `Compatibility Score: ${report.score}%\n` +
      `Official Verdict: ${report.verdict}\n\n` +
      `Core Superpowers:\n` +
      `• ${report.strengths[0]}\n` +
      `• ${report.strengths[1]}\n\n` +
      `Relationship Hazard Alert:\n` +
      `• ${report.hazards[0]}\n` +
      `• ${report.hazards[1]}\n\n` +
      `Certified by PrankLab & Tarun Tiwari 😂💘`;
    navigator.clipboard.writeText(text);
    alert("Couple Compatibility Report copied to clipboard! Send to your partner! 😂💖");
  };

  return (
    <ProjectLayout
      title="Couple Compatibility Lab"
      emoji="💑"
      category="Couples & Romance"
      accentColor="#ec4899"
      onReset={handleReset}
    >
      <Box sx={{ maxWidth: 760, mx: 'auto', mt: 1 }}>
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
            <Box sx={{ fontSize: 52, mb: 1 }}>💑⚖️</Box>
            <Typography variant="h4" fontWeight={900} sx={{ mb: 0.5, letterSpacing: -0.5 }}>
              Couple Compatibility Lab
            </Typography>
            <Typography variant="body2" color="text.secondary">
              9-Step Scientific Battleground: Are you soulmates or two people fighting over pizza?
            </Typography>
          </Box>

          {/* Stepper Progress */}
          {!report && (
            <Box sx={{ mb: 4 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                <Chip
                  label={`Step ${currentStepIndex + 1} of ${totalSteps}`}
                  size="small"
                  sx={{ bgcolor: '#fce7f3', color: '#be185d', fontWeight: 800 }}
                />
                <Typography variant="caption" color="text.secondary" fontWeight={700}>
                  {progressPercent}% Tested
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={progressPercent}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  bgcolor: '#fce7f3',
                  '& .MuiLinearProgress-bar': {
                    background: 'linear-gradient(90deg, #ec4899, #db2777)',
                    borderRadius: 5,
                  },
                }}
              />
            </Box>
          )}

          {/* Steps Content */}
          {!report && (
            <Box>
              {/* Step Title */}
              <Box sx={{ mb: 3 }}>
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
                  <Typography fontSize={28}>{currentStep.emoji}</Typography>
                  <Typography variant="h6" fontWeight={800}>
                    {currentStep.title}
                  </Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  {currentStep.subtitle}
                </Typography>
              </Box>

              {/* Step 1: Partner Names */}
              {currentStepIndex === 0 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mb: 4 }}>
                  <TextField
                    fullWidth
                    label="Partner 1 Name / Nickname"
                    placeholder="e.g. Rahul, Alex, Kabir"
                    value={p1}
                    onChange={(e) => setP1(e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '16px',
                        '&:hover fieldset': { borderColor: '#ec4899' },
                        '&.Mui-focused fieldset': { borderColor: '#ec4899' },
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Partner 2 Name / Nickname"
                    placeholder="e.g. Ananya, Sam, Simran"
                    value={p2}
                    onChange={(e) => setP2(e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '16px',
                        '&:hover fieldset': { borderColor: '#ec4899' },
                        '&.Mui-focused fieldset': { borderColor: '#ec4899' },
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Couple Codename (Optional)"
                    placeholder="e.g. The Pizza Pirates, Chaos Duo, Rahananya"
                    value={coupleCodename}
                    onChange={(e) => setCoupleCodename(e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '16px',
                      },
                    }}
                  />
                </Box>
              )}

              {/* Steps 2-8: Options Selection */}
              {currentStepIndex > 0 && currentStep.options && (
                <Stack spacing={1.5} sx={{ mb: 4 }}>
                  {currentStep.options.map((opt) => {
                    const isSelected = answers[currentStep.step] === opt.trait;
                    return (
                      <Card
                        key={opt.trait}
                        onClick={() => handleSelectOption(opt.trait)}
                        sx={{
                          p: 2,
                          borderRadius: '16px',
                          cursor: 'pointer',
                          border: '2px solid',
                          borderColor: isSelected ? '#ec4899' : '#f3f4f6',
                          bgcolor: isSelected ? '#fdf2f8' : 'background.paper',
                          boxShadow: isSelected ? '0 6px 18px rgba(236, 72, 153, 0.16)' : 'none',
                          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                          '&:hover': {
                            borderColor: '#ec4899',
                            transform: 'translateY(-2px)',
                          },
                        }}
                      >
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Box>
                            <Typography fontWeight={800} fontSize={15} color={isSelected ? '#9d174d' : 'text.primary'}>
                              {opt.label}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontSize: 13 }}>
                              {opt.desc}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              width: 24,
                              height: 24,
                              borderRadius: '50%',
                              border: '2px solid',
                              borderColor: isSelected ? '#ec4899' : '#d1d5db',
                              bgcolor: isSelected ? '#ec4899' : 'transparent',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'white',
                              fontSize: 14,
                              flexShrink: 0,
                              ml: 2,
                            }}
                          >
                            {isSelected ? '✓' : ''}
                          </Box>
                        </Stack>
                      </Card>
                    );
                  })}
                </Stack>
              )}

              {/* Navigation Controls */}
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ pt: 2, borderTop: '1px solid #f3f4f6' }}>
                <Button
                  variant="outlined"
                  onClick={handlePrev}
                  disabled={currentStepIndex === 0}
                  startIcon={<ArrowBackRoundedIcon />}
                  sx={{ borderRadius: '12px', textTransform: 'none', fontWeight: 700 }}
                >
                  Previous
                </Button>

                <Button
                  variant="contained"
                  onClick={handleNext}
                  endIcon={currentStepIndex === totalSteps - 1 ? <FavoriteRoundedIcon /> : <ArrowForwardRoundedIcon />}
                  sx={{
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontWeight: 800,
                    px: 3.5,
                    bgcolor: '#ec4899',
                    '&:hover': { bgcolor: '#db2777' },
                  }}
                >
                  {currentStepIndex === totalSteps - 1 ? "Compute Compatibility 💘" : "Next Debate Arena"}
                </Button>
              </Stack>
            </Box>
          )}

          {/* Final Report Card */}
          {report && (
            <Box>
              <Card
                sx={{
                  p: { xs: 2.5, sm: 4 },
                  borderRadius: '24px',
                  background: 'linear-gradient(135deg, #fff1f2 0%, #fdf2f8 100%)',
                  border: '2px solid #f472b6',
                  boxShadow: '0 12px 36px rgba(236, 72, 153, 0.15)',
                  mb: 3,
                  position: 'relative',
                  overflow: 'visible',
                }}
              >
                {/* Official Certified Badge */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: -14,
                    right: 20,
                    bgcolor: '#db2777',
                    color: 'white',
                    px: 2,
                    py: 0.6,
                    borderRadius: '20px',
                    fontSize: 12,
                    fontWeight: 900,
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                    boxShadow: '0 4px 12px rgba(219, 39, 119, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                  }}
                >
                  <VerifiedRoundedIcon sx={{ fontSize: 16 }} /> CERTIFIED CHEMISTRY
                </Box>

                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <Typography variant="overline" color="#be185d" fontWeight={900} letterSpacing={2}>
                    OFFICIAL RELATIONSHIP WARRANTY REPORT
                  </Typography>
                  <Typography variant="h4" fontWeight={900} sx={{ mt: 1, mb: 0.5 }}>
                    {report.p1} ❤️ {report.p2}
                  </Typography>
                  <Typography variant="subtitle1" fontWeight={700} color="#db2777" sx={{ mb: 2 }}>
                    "{report.codename}"
                  </Typography>

                  {/* Score Gauge */}
                  <Box
                    sx={{
                      display: 'inline-flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      p: 2.5,
                      borderRadius: '20px',
                      bgcolor: 'background.paper',
                      boxShadow: '0 4px 20px rgba(236, 72, 153, 0.12)',
                      border: '1.5px solid #fbcfe8',
                      minWidth: 200,
                    }}
                  >
                    <Typography variant="caption" color="text.secondary" fontWeight={800}>
                      COMPATIBILITY INDEX
                    </Typography>
                    <Typography variant="h2" fontWeight={900} color="#db2777" sx={{ my: 0.5 }}>
                      {report.score}%
                    </Typography>
                    <Chip
                      label={report.verdict}
                      sx={{ bgcolor: '#fce7f3', color: '#9d174d', fontWeight: 800, fontSize: 13 }}
                    />
                  </Box>
                </Box>

                {/* Strengths & Hazards */}
                <Stack spacing={2} sx={{ mb: 2.5 }}>
                  <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: '16px', border: '1px solid #fbcfe8' }}>
                    <Typography variant="subtitle2" fontWeight={900} color="#059669" sx={{ mb: 1 }}>
                      ✨ Superpowers & Shared Habits:
                    </Typography>
                    {report.strengths.map((str, i) => (
                      <Typography key={i} variant="body2" color="text.secondary" sx={{ display: 'flex', gap: 1, mb: 0.5 }}>
                        <span>•</span> {str}
                      </Typography>
                    ))}
                  </Box>

                  <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: '16px', border: '1px solid #fbcfe8' }}>
                    <Typography variant="subtitle2" fontWeight={900} color="#dc2626" sx={{ mb: 1 }}>
                      ⚠️ High-Risk Relationship Hazards:
                    </Typography>
                    {report.hazards.map((haz, i) => (
                      <Typography key={i} variant="body2" color="text.secondary" sx={{ display: 'flex', gap: 1, mb: 0.5 }}>
                        <span>•</span> {haz}
                      </Typography>
                    ))}
                  </Box>
                </Stack>

                {/* Peace Offering & Romantic Treats Affiliate Box */}
                <Box
                  sx={{
                    bgcolor: '#fff0f3',
                    p: 2,
                    borderRadius: '16px',
                    border: '1.5px dashed #f472b6',
                    textAlign: 'center',
                    mb: 3,
                  }}
                >
                  <Typography variant="caption" fontWeight={900} color="#be185d" letterSpacing={1}>
                    🍨 RECOMMENDED PEACE OFFERING
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, mb: 1.5, fontSize: 13 }}>
                    Scientifically proven to resolve AC arguments and stolen french fries:
                  </Typography>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} justifyContent="center">
                    <Button
                      size="small"
                      variant="contained"
                      href="https://www.swiggy.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ bgcolor: '#fc8019', color: '#fff', fontWeight: 800, borderRadius: '10px', fontSize: 12, '&:hover': { bgcolor: '#e26903' } }}
                    >
                      🍕 Order Peace Pizza
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      href="https://www.amazon.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ bgcolor: '#232f3e', color: '#fff', fontWeight: 800, borderRadius: '10px', fontSize: 12, '&:hover': { bgcolor: '#131921' } }}
                    >
                      🎁 Browse Couple Gifts
                    </Button>
                  </Stack>
                </Box>

                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ pt: 1, borderTop: '1px solid #fbcfe8', gap: 1 }}
                >
                  <Typography variant="caption" color="text.secondary">
                    Calculated: <strong>{report.date}</strong>
                  </Typography>
                  <Typography variant="caption" sx={{ fontStyle: 'italic', color: '#be185d', fontWeight: 700 }}>
                    Certified by PrankLab & Tarun Tiwari 💘
                  </Typography>
                </Stack>
              </Card>

              {/* Actions */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<ContentCopyRoundedIcon />}
                  onClick={copyReport}
                  sx={{
                    borderRadius: '14px',
                    fontWeight: 800,
                    py: 1.5,
                    bgcolor: '#ec4899',
                    '&:hover': { bgcolor: '#db2777' },
                  }}
                >
                  Copy Compatibility Report
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<RestartAltRoundedIcon />}
                  onClick={handleReset}
                  sx={{
                    borderRadius: '14px',
                    fontWeight: 800,
                    py: 1.5,
                    borderColor: '#ec4899',
                    color: '#db2777',
                    '&:hover': { borderColor: '#db2777', bgcolor: '#fdf2f8' },
                  }}
                >
                  Test Another Couple 💑
                </Button>
              </Stack>
            </Box>
          )}
        </Paper>
      </Box>
    </ProjectLayout>
  );
}
