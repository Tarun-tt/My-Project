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
import PsychologyRoundedIcon from '@mui/icons-material/PsychologyRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import ProjectLayout from '../../components/common/ProjectLayout.jsx';
import { playSuccessSound, playCelebrationSound } from '../../utils/soundEffects.js';
import { fireCannons, fireConfetti } from '../../utils/confettiHelper.js';

const DECODER_STEPS = [
  {
    step: 1,
    title: "Evidence Submission",
    subtitle: "Paste the suspicious incoming text or select a classic crime preset.",
    emoji: "📩",
  },
  {
    step: 2,
    title: "Timestamp Forensic Analysis",
    subtitle: "At what psychological hour was this digital projectile launched?",
    emoji: "⏰",
    options: [
      { label: "1:47 AM to 3:30 AM (Vampire Hour)", trait: "vampire", desc: "Inhibitions dissolved. Nostalgic regret or liquid courage in play." },
      { label: "11:15 PM (Pre-Sleep Dissociation)", trait: "pre_sleep", desc: "Sent from under a blanket while staring at the ceiling." },
      { label: "2:15 PM on a Tuesday (Office Boredom)", trait: "boredom", desc: "Procrastinating on real work by disturbing your peace." },
      { label: "Friday at 9:00 PM (Weekend Commencing)", trait: "weekend", desc: "Testing the social perimeter for weekend plans." },
    ],
  },
  {
    step: 3,
    title: "Punctuation Ballistics",
    subtitle: "Examine the lethal emotional weight of punctuation marks.",
    emoji: "🎯",
    options: [
      { label: "Single cold full-stop '.' at the end", trait: "full_stop", desc: "A sniper bullet. Expresses frozen hostility and finality." },
      { label: "Suspicious trailing ellipsis '...'", trait: "ellipsis", desc: "Unspoken cliffhanger. Baiting you into asking 'What?'" },
      { label: "No punctuation whatsoever (pure lowercase)", trait: "naked", desc: "Pretending not to care while caring excessively." },
      { label: "Exclamation point with an emoji '!! 😊'", trait: "toxic_cheer", desc: "Aggressively polite. Dangerous passive-aggressive energy." },
    ],
  },
  {
    step: 4,
    title: "Typing Bubble Surveillance",
    subtitle: "Did the three typing bubbles appear and vanish beforehand?",
    emoji: "💬",
    options: [
      { label: "Bubbles flickered 5 times for 8 minutes then sent 2 words", trait: "backspace_war", desc: "A 400-word essay was drafted, edited, and deleted." },
      { label: "Instantaneous dispatch without delay", trait: "spontaneous", desc: "Zero filter. Unchecked impulse decision." },
      { label: "Voice note received that was 12 seconds long", trait: "voice_note", desc: "Audible sigh in background detected by audio forensics." },
      { label: "Marked as 'Seen' for 4 hours before any response", trait: "calculated_wait", desc: "Weaponized delay calculated to drive you insane." },
    ],
  },
  {
    step: 5,
    title: "Emoji & Reaction Pathology",
    subtitle: "What visual symbols accompanied the message?",
    emoji: "🔬",
    options: [
      { label: "The menacing thumbs up '👍'", trait: "thumbs_up", desc: "Digital murder. Condescending closure of discussion." },
      { label: "The dead skull '💀'", trait: "skull", desc: "Disguised laughter masking inner devastation." },
      { label: "Passive-aggressive standard smiley ':)'", trait: "smiley", desc: "A smile with teeth bared. Prepare for conflict." },
      { label: "Zero emoji. Barren textual desert.", trait: "no_emoji", desc: "Emotional Sahara desert. Hostile climate." },
    ],
  },
  {
    step: 6,
    title: "Dispatch Latency & Speed",
    subtitle: "How much calendar time elapsed since your previous text?",
    emoji: "⏳",
    options: [
      { label: "4 seconds (Active phone in hand)", trait: "lightning", desc: "Was already hovering over the chat screen." },
      { label: "3 to 4 business days", trait: "fossil", desc: "Archeological excavation required to find the context." },
      { label: "2 months out of the blue with 'Hey stranger'", trait: "zombie", desc: "Resurrected from the relationship graveyard." },
      { label: "Immediately after viewing my Instagram story", trait: "stalker_timing", desc: "Triggered by visual evidence of you having fun." },
    ],
  },
  {
    step: 7,
    title: "Select Interrogation Specialist",
    subtitle: "Choose the expert lens to dismantle this communication.",
    emoji: "🧠",
    options: [
      { label: "Overthinker Mode 🧠", trait: "overthinker", desc: "Analyzes every pixel and microscopic subtext." },
      { label: "Best Friend FBI Detective 🕵️‍♀️", trait: "fbi", desc: "Weaponized psychological profiling with zero sympathy." },
      { label: "Bollywood Melodrama Director 🎬", trait: "bollywood", desc: "Violin soundtrack, slow-motion rain, generational tragedy." },
      { label: "Brutally Honest Reality Check 💀", trait: "honest", desc: "The harsh reality your wounded ego refuses to accept." },
    ],
  },
];

const PRESET_MESSAGES = [
  "k",
  "we need to talk",
  "happy birthday! hope you're good",
  "hey stranger :)",
  "saw this and thought of you",
  "seen at 11:42 PM",
];

export default function ExTextDecoderApp() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [inputText, setInputText] = useState('k');
  const [answers, setAnswers] = useState({});
  const [decodedReport, setDecodedReport] = useState(null);

  const currentStep = DECODER_STEPS[currentStepIndex];
  const totalSteps = DECODER_STEPS.length;
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
      if (!inputText.trim()) {
        alert("Please enter a text message to decode!");
        return;
      }
    } else {
      if (!answers[currentStep.step]) {
        alert("Please select a forensic finding for this step!");
        return;
      }
    }

    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      runForensics();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const runForensics = () => {
    playCelebrationSound();
    fireCannons();

    const textClean = inputText.trim().toLowerCase();
    const mode = answers[7] || 'overthinker';

    let meaning = "";
    let threatLevel = "DEFCON 2: Elevated Heart Rate 💓";
    let prescription = "";

    if (mode === 'bollywood') {
      meaning = "This single message is the emotional climax of a 3-hour tragic romance! Notice the missing exclamation? That silence echoes across seven reincarnations. Violins are sobbing in the background. Rain is falling in slow motion upon their touch screen.";
      threatLevel = "DEFCON 1: Cinema Melodrama 🎬";
      prescription = "Do not text back. Look out the window dramatically while gripping a warm coffee mug.";
    } else if (mode === 'fbi') {
      meaning = "Our surveillance indicates subject was scrolling reels 12 minutes prior. They deployed this text as a perimeter probe to test your emotional vulnerability. The word choice suggests 74% likelihood of late-night nostalgic weakness.";
      threatLevel = "DEFCON 2: Tactical Reconnaissance 📡";
      prescription = "Wait exactly 3 hours and 24 minutes before replying with a single lowercase letter.";
    } else if (mode === 'honest') {
      meaning = "They were bored on the sofa, saw a notification, typed 2 words without thinking, and have already forgotten they sent it. It took 3 seconds of their day. You have now spent 45 minutes assembling a CSI forensic dossier on it.";
      threatLevel = "DEFCON 4: Zero Danger, You Are Just Bored 🥱";
      prescription = "Put the phone face down, drink a tall glass of water, and take a 20-minute walk.";
    } else {
      // Overthinker default
      if (textClean === 'k' || textClean === 'ok') {
        meaning = "A solitary 'k'. No uppercase 'K'. No period. No emoji. They took 0.18 seconds to dismiss your entire spiritual existence. The missing letter 'O' represents the eternal emptiness where your love once blossomed.";
        threatLevel = "DEFCON 1: Immediate Catastrophe 🚨";
        prescription = "Draft a 14-paragraph unsent response in your Notes app immediately.";
      } else if (textClean.includes('talk')) {
        meaning = "The four horsemen of the apocalypse have arrived in your DMs. 'We need to talk' translates to: 'I have prepared a 26-slide PowerPoint breakdown of all your behavioral anomalies.'";
        threatLevel = "DEFCON 0: Nuclear Emergency 💥";
        prescription = "Change your name, delete social media, and move to a remote yurt in Mongolia.";
      } else {
        meaning = "Subject deliberately crafted this ambiguous phrase to occupy rent-free cognitive real estate in your brain for the next 72 business hours. The structural syntax confirms premeditated psychological disruption.";
        threatLevel = "DEFCON 2: Chronic Overthinking 🧠";
        prescription = "Screenshot and dispatch to at least 3 group chats for independent panel review.";
      }
    }

    setDecodedReport({
      rawText: inputText,
      mode: mode.toUpperCase(),
      meaning,
      threatLevel,
      prescription,
      date: new Date().toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' }),
    });
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setInputText('k');
    setAnswers({});
    setDecodedReport(null);
  };

  const copyReport = () => {
    if (!decodedReport) return;
    const text = `🕵️‍♂️ CSI ROMANTIC TEXT FORENSICS AUTOPSY 🕵️‍♂️\n\n` +
      `Evidence Received: "${decodedReport.rawText}"\n` +
      `Threat Severity: ${decodedReport.threatLevel}\n\n` +
      `Forensic Translation:\n${decodedReport.meaning}\n\n` +
      `Prescribed Strategic Action:\n${decodedReport.prescription}\n\n` +
      `Investigated by PrankLab & Tarun Tiwari 📱🔎`;
    navigator.clipboard.writeText(text);
    alert("Forensic Autopsy Report copied to clipboard! Share with friends! 😂");
  };

  return (
    <ProjectLayout
      title="Ex Text Decoder"
      emoji="📱"
      category="Texting & Relationships"
      accentColor="#06b6d4"
      onReset={handleReset}
    >
      <Box sx={{ maxWidth: 760, mx: 'auto', mt: 1 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, sm: 4 },
            borderRadius: '26px',
            border: '1.5px solid #a5f3fc',
            bgcolor: 'background.paper',
            boxShadow: '0 12px 40px rgba(6, 182, 212, 0.08)',
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Box sx={{ fontSize: 52, mb: 1 }}>📱🔬</Box>
            <Typography variant="h4" fontWeight={900} sx={{ mb: 0.5, letterSpacing: -0.5 }}>
              CSI Romantic Text Forensics Lab
            </Typography>
            <Typography variant="body2" color="text.secondary">
              8-Step Interrogation: Dismantle incoming texts through ballistics, timestamps, and psychological decoding.
            </Typography>
          </Box>

          {/* Stepper Progress */}
          {!decodedReport && (
            <Box sx={{ mb: 4 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                <Chip
                  label={`Step ${currentStepIndex + 1} of ${totalSteps}`}
                  size="small"
                  sx={{ bgcolor: '#cffafe', color: '#155e75', fontWeight: 800 }}
                />
                <Typography variant="caption" color="text.secondary" fontWeight={700}>
                  {progressPercent}% Forensic Breakdown
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={progressPercent}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  bgcolor: '#cffafe',
                  '& .MuiLinearProgress-bar': {
                    background: 'linear-gradient(90deg, #06b6d4, #0891b2)',
                    borderRadius: 5,
                  },
                }}
              />
            </Box>
          )}

          {/* Question / Step Details */}
          {!decodedReport && (
            <Box>
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

              {/* Step 1: Input text & presets */}
              {currentStepIndex === 0 && (
                <Box sx={{ mb: 4 }}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="The Suspicious Text Message"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    sx={{
                      mb: 2.5,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '16px',
                        '&:hover fieldset': { borderColor: '#06b6d4' },
                        '&.Mui-focused fieldset': { borderColor: '#06b6d4' },
                      },
                    }}
                  />

                  <Typography variant="caption" fontWeight={800} color="#0891b2" display="block" sx={{ mb: 1 }}>
                    Or select a classic crime scene preset:
                  </Typography>
                  <Stack direction="row" flexWrap="wrap" gap={1}>
                    {PRESET_MESSAGES.map((msg) => (
                      <Chip
                        key={msg}
                        label={`"${msg}"`}
                        onClick={() => {
                          playSuccessSound();
                          setInputText(msg);
                        }}
                        sx={{
                          borderRadius: '10px',
                          cursor: 'pointer',
                          fontWeight: 700,
                          bgcolor: inputText === msg ? '#cffafe' : 'background.paper',
                          border: '1px solid',
                          borderColor: inputText === msg ? '#06b6d4' : '#e5e7eb',
                          '&:hover': { bgcolor: '#ecfeff', borderColor: '#a5f3fc' },
                        }}
                      />
                    ))}
                  </Stack>
                </Box>
              )}

              {/* Steps 2 to 7: Option Cards */}
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
                          borderColor: isSelected ? '#06b6d4' : '#f3f4f6',
                          bgcolor: isSelected ? '#ecfeff' : 'background.paper',
                          boxShadow: isSelected ? '0 6px 18px rgba(6, 182, 212, 0.16)' : 'none',
                          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                          '&:hover': {
                            borderColor: '#06b6d4',
                            transform: 'translateY(-2px)',
                          },
                        }}
                      >
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Box>
                            <Typography fontWeight={800} fontSize={15} color={isSelected ? '#0e7490' : 'text.primary'}>
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
                              borderColor: isSelected ? '#06b6d4' : '#d1d5db',
                              bgcolor: isSelected ? '#06b6d4' : 'transparent',
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
                  endIcon={currentStepIndex === totalSteps - 1 ? <PsychologyRoundedIcon /> : <ArrowForwardRoundedIcon />}
                  sx={{
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontWeight: 800,
                    px: 3.5,
                    bgcolor: '#06b6d4',
                    '&:hover': { bgcolor: '#0891b2' },
                  }}
                >
                  {currentStepIndex === totalSteps - 1 ? "Execute Forensic Autopsy 🔬" : "Next Forensic Step"}
                </Button>
              </Stack>
            </Box>
          )}

          {/* Final Forensic Autopsy Report */}
          {decodedReport && (
            <Box>
              <Card
                sx={{
                  p: { xs: 2.5, sm: 4 },
                  borderRadius: '24px',
                  background: 'linear-gradient(135deg, #ecfeff 0%, #cffafe 100%)',
                  border: '2px solid #06b6d4',
                  boxShadow: '0 12px 36px rgba(6, 182, 212, 0.15)',
                  mb: 3,
                  position: 'relative',
                  overflow: 'visible',
                }}
              >
                {/* Certified Badge */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: -14,
                    right: 20,
                    bgcolor: '#0891b2',
                    color: 'white',
                    px: 2,
                    py: 0.6,
                    borderRadius: '20px',
                    fontSize: 12,
                    fontWeight: 900,
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                    boxShadow: '0 4px 12px rgba(8, 145, 178, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                  }}
                >
                  <VerifiedRoundedIcon sx={{ fontSize: 16 }} /> FORENSICS CERTIFIED
                </Box>

                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <Typography variant="overline" color="#0e7490" fontWeight={900} letterSpacing={2}>
                    CSI FORENSIC AUTOPSY DOSSIER
                  </Typography>
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: 'background.paper',
                      borderRadius: '16px',
                      border: '1.5px solid #a5f3fc',
                      my: 1.5,
                      display: 'inline-block',
                      maxWidth: '90%',
                    }}
                  >
                    <Typography variant="h5" fontWeight={900} color="#0891b2">
                      "{decodedReport.rawText}"
                    </Typography>
                  </Box>
                  <Typography variant="subtitle2" color="#0e7490" fontWeight={800}>
                    {decodedReport.threatLevel}
                  </Typography>
                </Box>

                {/* Subtext Analysis */}
                <Box sx={{ bgcolor: 'background.paper', p: 2.5, borderRadius: '18px', mb: 2.5, border: '1px solid #a5f3fc' }}>
                  <Typography variant="subtitle2" fontWeight={900} color="#0891b2" sx={{ mb: 1 }}>
                    🔎 Forensic Translation & Subtext:
                  </Typography>
                  <Typography variant="body1" sx={{ lineHeight: 1.7, color: 'text.primary' }}>
                    {decodedReport.meaning}
                  </Typography>
                </Box>

                {/* Tactical Recommendation */}
                <Box sx={{ bgcolor: 'background.paper', p: 2.5, borderRadius: '18px', mb: 3, border: '1px solid #a5f3fc' }}>
                  <Typography variant="subtitle2" fontWeight={900} color="#059669" sx={{ mb: 1 }}>
                    🛡️ Prescribed Tactical Action:
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.secondary' }}>
                    {decodedReport.prescription}
                  </Typography>
                </Box>

                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ pt: 1, borderTop: '1px solid #a5f3fc', gap: 1 }}
                >
                  <Typography variant="caption" color="text.secondary">
                    Analysis Date: <strong>{decodedReport.date}</strong>
                  </Typography>
                  <Typography variant="caption" sx={{ fontStyle: 'italic', color: '#0891b2', fontWeight: 700 }}>
                    Investigated by PrankLab & Tarun Tiwari 🕵️
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
                    bgcolor: '#06b6d4',
                    '&:hover': { bgcolor: '#0891b2' },
                  }}
                >
                  Copy Forensic Dossier
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
                    borderColor: '#06b6d4',
                    color: '#0891b2',
                    '&:hover': { borderColor: '#0891b2', bgcolor: '#ecfeff' },
                  }}
                >
                  Analyze Another Message 📱
                </Button>
              </Stack>
            </Box>
          )}
        </Paper>
      </Box>
    </ProjectLayout>
  );
}
