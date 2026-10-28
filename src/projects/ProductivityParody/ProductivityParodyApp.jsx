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
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import KeyboardRoundedIcon from '@mui/icons-material/KeyboardRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import ProjectLayout from '../../components/common/ProjectLayout.jsx';
import { playSuccessSound, playCelebrationSound } from '../../utils/soundEffects.js';
import { fireCannons, fireConfetti } from '../../utils/confettiHelper.js';

const SLACKER_STEPS = [
  {
    step: 1,
    title: "Clock-In & Employee Persona",
    subtitle: "Identify yourself and select your prestigious corporate title.",
    emoji: "💼",
  },
  {
    step: 2,
    title: "Declare the 'Urgent' Task to Avoid",
    subtitle: "Which critical responsibility will you heroically procrastinate on today?",
    emoji: "📋",
    options: [
      { label: "Draft 24-page Q4 Strategic Vision Presentation", trait: "deck", time: 45, desc: "Slide 1 title is written. The rest is pure dread." },
      { label: "Reply to 184 unread emails marked 'URGENT'", trait: "inbox", time: 40, desc: "If you wait long enough, they solve themselves." },
      { label: "Fix catastrophic production software bug", trait: "code", time: 60, desc: "It only crashes when customers use it." },
      { label: "Fill out annual performance self-review evaluation", trait: "review", time: 50, desc: "Explaining why scrolling reels is synergy." },
    ],
  },
  {
    step: 3,
    title: "The 45-Minute Desk Reorganization Ritual",
    subtitle: "You cannot possibly do real work until your desk achieves zen alignment.",
    emoji: "🧹",
    options: [
      { label: "Color-code highlighters & test 12 dead pens", trait: "pens", time: 35, desc: "Testing blue pens on sticky notes for 20 mins." },
      { label: "Wipe laptop screen & keyboard with microfibre cloth", trait: "screen", time: 30, desc: "Inspecting dust particles under angle light." },
      { label: "Rearrange coffee mugs & emotional support water bottle", trait: "mug", time: 25, desc: "Hydration logistics are critical to workflow." },
      { label: "Fold cable clutter into origami shapes", trait: "cables", time: 40, desc: "Cable management is a spiritual journey." },
    ],
  },
  {
    step: 4,
    title: "The Spotify 'Focus Playlist' Dilemma",
    subtitle: "Can't work without the exact acoustic frequency matching your soul.",
    emoji: "🎧",
    options: [
      { label: "Lo-Fi Beats to Relax & Dissociate to (Skipping 28 songs)", trait: "lofi", time: 35, desc: "None of the rain sounds feel authentic." },
      { label: "Hans Zimmer 'Interstellar' soundtrack to write 1 email", trait: "hans", time: 30, desc: "Typing subject line with cinematic intensity." },
      { label: "Heavy Metal to aggressively ignore incoming Slack pings", trait: "metal", time: 25, desc: "Headbanging away from responsibilities." },
      { label: "Cafe sounds background noise so you feel like a scholar", trait: "cafe", time: 20, desc: "Imaginary baristas keeping you company." },
    ],
  },
  {
    step: 5,
    title: "The Fake Urgent Slack / Teams Status",
    subtitle: "Deploy defensive shielding to prevent coworkers from contacting you.",
    emoji: "🛡️",
    options: [
      { label: "🔴 'Deep Work — Brain Melting (Only emergency DMs)'", trait: "deep_work", time: 20, desc: "Coworkers now speak in whispers." },
      { label: "📅 'In Back-to-Back Syncs with Leadership all day'", trait: "syncs", time: 25, desc: "Calendar blocked off in solid grey blocks." },
      { label: "☕ 'Pantry Run / Coffee Break' (Permanent status)", trait: "coffee", time: 30, desc: "Never removed since Tuesday morning." },
      { label: "🧠 'Ideating Strategy' (Literally playing Wordle)", trait: "ideating", time: 35, desc: "Strategic vocabulary expansion." },
    ],
  },
  {
    step: 6,
    title: "The Aggressive Keyboard Clattering Minigame!",
    subtitle: "Smash keys rapidly to sound exceptionally busy when anyone walks past!",
    emoji: "⌨️",
  },
  {
    step: 7,
    title: "The Wikipedia Rabbit Hole Descent",
    subtitle: "Which totally unrelated academic rabbit hole did you fall into for an hour?",
    emoji: "🏛️",
    options: [
      { label: "Detailed history of medieval siege warfare in 1346", trait: "trebuchet", time: 55, desc: "Now an expert in catapult ballistics." },
      { label: "Why do pigeons bob their heads when walking?", trait: "pigeon", time: 45, desc: "Avian biology research during work hours." },
      { label: "Real estate prices of abandoned Scottish castles", trait: "castle", time: 50, desc: "Planning imaginary feudal estate relocation." },
      { label: "How string cheese is manufactured and stretched", trait: "cheese", time: 40, desc: "Industrial food chemistry fascinations." },
    ],
  },
  {
    step: 8,
    title: "Pantry & Refrigerator Reconnaissance Patrol",
    subtitle: "Visiting the kitchen 8 times hoping new gourmet snacks miraculously spawned.",
    emoji: "🧀",
    options: [
      { label: "Stare blankly into the open fridge for 3 full minutes", trait: "fridge_stare", time: 25, desc: "Waiting for snacks to spontaneously generate." },
      { label: "Make a 4th cup of green tea you won't actually finish", trait: "tea_hoard", time: 20, desc: "Mug graveyard assembling on desk." },
      { label: "Inspect expiration dates on office condiment packets", trait: "sauce_audit", time: 30, desc: "A ketchup packet from 2021 was found." },
      { label: "Linger awkwardly hoping someone brought birthday cake", trait: "cake_hunter", time: 35, desc: "Alerted by the sound of knife against cardboard." },
    ],
  },
];

const CORPORATE_TITLES = [
  "Senior Vice President of Moving the Mouse 🖱️",
  "Chief Procrastination Officer (CPO) 🦥",
  "Director of 47 Open Browser Tabs 📑",
  "Lead Tactical Pretender of Hard Work 💼",
  "Executive Head of Nodding in Meetings 👔",
];

export default function ProductivityParodyApp() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [employeeName, setEmployeeName] = useState('');
  const [selectedTitle, setSelectedTitle] = useState(CORPORATE_TITLES[0]);
  const [answers, setAnswers] = useState({});
  const [totalWastedMinutes, setTotalWastedMinutes] = useState(0);
  const [clatterCount, setClatterCount] = useState(0);
  const [report, setReport] = useState(null);

  const currentStep = SLACKER_STEPS[currentStepIndex];
  const totalSteps = SLACKER_STEPS.length;
  const progressPercent = Math.round(((currentStepIndex + 1) / totalSteps) * 100);

  const handleSelectOption = (trait, time) => {
    playSuccessSound();
    setAnswers({
      ...answers,
      [currentStep.step]: trait,
    });
    setTotalWastedMinutes((prev) => prev + time);
  };

  const handleClatterKey = () => {
    playSuccessSound();
    setClatterCount((prev) => prev + 1);
    if (clatterCount % 5 === 0) {
      fireConfetti();
    }
  };

  const handleNext = () => {
    if (currentStepIndex === 0) {
      if (!employeeName.trim()) {
        alert("Please enter your employee name to punch in!");
        return;
      }
    } else if (currentStepIndex === 5) {
      // Minigame
      if (clatterCount < 5) {
        alert("You must mash the keyboard at least 5 times to sound sufficiently hardworking! ⌨️😂");
        return;
      }
    } else {
      if (!answers[currentStep.step]) {
        alert("Please select a work-avoidance strategy for this step!");
        return;
      }
    }

    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      generateFinalReport();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const generateFinalReport = () => {
    playCelebrationSound();
    fireCannons();

    const grandMinutes = totalWastedMinutes + clatterCount * 4 + 45;

    setReport({
      name: employeeName.trim(),
      title: selectedTitle,
      minutesWasted: grandMinutes,
      tasksFinished: 0,
      clatterScore: clatterCount * 24,
      award: grandMinutes > 250 ? "Grand Master of Delay 🏆" : "Corporate Slacker of the Month 🦥",
      date: new Date().toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' }),
    });
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setEmployeeName('');
    setAnswers({});
    setTotalWastedMinutes(0);
    setClatterCount(0);
    setReport(null);
  };

  const copyReport = () => {
    if (!report) return;
    const text = `📊 EXECUTIVE WORK PRODUCTIVITY AUDIT 📊\n\n` +
      `Employee: ${report.name}\n` +
      `Designation: ${report.title}\n` +
      `Real Tasks Finished: ${report.tasksFinished}\n` +
      `Minutes Masterfully Avoided: ${report.minutesWasted} mins\n` +
      `Audible Keyboard Clattering Speed: ${report.clatterScore} WPM\n` +
      `Official Corporate Award: ${report.award}\n\n` +
      `Status: Legendary Office Slacker\n` +
      `Audited by PrankLab & Tarun Tiwari 💻😂`;
    navigator.clipboard.writeText(text);
    alert("Official Productivity Report copied to clipboard! Send to your team chat! 😂");
  };

  return (
    <ProjectLayout
      title="The World's Worst Productivity App"
      emoji="💻"
      category="Office Comedy"
      accentColor="#f59e0b"
      onReset={handleReset}
    >
      <Box sx={{ maxWidth: 760, mx: 'auto', mt: 1 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, sm: 4 },
            borderRadius: '26px',
            border: '1.5px solid #fde68a',
            bgcolor: 'background.paper',
            boxShadow: '0 12px 40px rgba(245, 158, 11, 0.08)',
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Box sx={{ fontSize: 52, mb: 1 }}>💻🦥</Box>
            <Typography variant="h4" fontWeight={900} sx={{ mb: 0.5, letterSpacing: -0.5 }}>
              ProcrastinaTrack™ Enterprise
            </Typography>
            <Typography variant="body2" color="text.secondary">
              9-Step Interactive Corporate Slacker Simulation: Avoid work like an elite executive.
            </Typography>
          </Box>

          {/* Stepper Progress */}
          {!report && (
            <Box sx={{ mb: 4 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                <Chip
                  label={`Step ${currentStepIndex + 1} of ${totalSteps}`}
                  size="small"
                  sx={{ bgcolor: '#fef3c7', color: '#92400e', fontWeight: 800 }}
                />
                <Typography variant="caption" color="text.secondary" fontWeight={700}>
                  {totalWastedMinutes} mins wasted so far
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={progressPercent}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  bgcolor: '#fef3c7',
                  '& .MuiLinearProgress-bar': {
                    background: 'linear-gradient(90deg, #f59e0b, #d97706)',
                    borderRadius: 5,
                  },
                }}
              />
            </Box>
          )}

          {/* Questionnaire Steps */}
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

              {/* Step 1: Clock-In & Title */}
              {currentStepIndex === 0 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 4 }}>
                  <TextField
                    fullWidth
                    label="Employee Full Name"
                    placeholder="e.g. John Doe, Priya Sharma, Alex"
                    value={employeeName}
                    onChange={(e) => setEmployeeName(e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '16px',
                        '&:hover fieldset': { borderColor: '#f59e0b' },
                        '&.Mui-focused fieldset': { borderColor: '#f59e0b' },
                      },
                    }}
                  />

                  <Box>
                    <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 1.5, color: '#92400e' }}>
                      Select Prestigious Corporate Title:
                    </Typography>
                    <Stack spacing={1}>
                      {CORPORATE_TITLES.map((title) => (
                        <Card
                          key={title}
                          onClick={() => {
                            playSuccessSound();
                            setSelectedTitle(title);
                          }}
                          sx={{
                            p: 1.8,
                            borderRadius: '14px',
                            cursor: 'pointer',
                            border: '1.5px solid',
                            borderColor: selectedTitle === title ? '#f59e0b' : 'transparent',
                            bgcolor: selectedTitle === title ? '#fffbeb' : 'background.paper',
                            boxShadow: selectedTitle === title ? '0 4px 14px rgba(245, 158, 11, 0.15)' : 'none',
                            transition: 'all 0.2s ease',
                            '&:hover': { bgcolor: '#fffbeb', borderColor: '#fde68a' },
                          }}
                        >
                          <Typography fontWeight={700} fontSize={14.5}>
                            {title}
                          </Typography>
                        </Card>
                      ))}
                    </Stack>
                  </Box>
                </Box>
              )}

              {/* Step 6: Minigame Keyboard Clattering */}
              {currentStepIndex === 5 && (
                <Box sx={{ textAlign: 'center', py: 3, mb: 3 }}>
                  <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
                    Rapidly click the button or mash your spacebar to generate intense keyboard sounds!
                  </Typography>

                  <Box
                    sx={{
                      width: 130,
                      height: 130,
                      borderRadius: '50%',
                      bgcolor: '#fffbeb',
                      border: '3px solid #f59e0b',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                      boxShadow: '0 8px 24px rgba(245, 158, 11, 0.25)',
                    }}
                  >
                    <Typography variant="h3" fontWeight={900} color="#b45309">
                      {clatterCount}
                    </Typography>
                    <Typography variant="caption" fontWeight={800} color="#92400e">
                      MASHPINTS
                    </Typography>
                  </Box>

                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<KeyboardRoundedIcon />}
                    onClick={handleClatterKey}
                    sx={{
                      borderRadius: '18px',
                      fontWeight: 900,
                      fontSize: 16,
                      px: 4,
                      py: 1.8,
                      bgcolor: '#f59e0b',
                      '&:hover': { bgcolor: '#d97706', transform: 'scale(1.03)' },
                      boxShadow: '0 8px 25px rgba(245, 158, 11, 0.35)',
                    }}
                  >
                    CLATTER KEYBOARD NOW! ⌨️⚡
                  </Button>

                  <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 2 }}>
                    {clatterCount < 5
                      ? `Mash at least ${5 - clatterCount} more times to proceed!`
                      : "Manager fooled! You sound furiously engaged in deep engineering work."}
                  </Typography>
                </Box>
              )}

              {/* Steps with Options: 1, 2, 3, 4, 6, 7 */}
              {currentStepIndex !== 0 && currentStepIndex !== 5 && currentStep.options && (
                <Stack spacing={1.5} sx={{ mb: 4 }}>
                  {currentStep.options.map((opt) => {
                    const isSelected = answers[currentStep.step] === opt.trait;
                    return (
                      <Card
                        key={opt.trait}
                        onClick={() => handleSelectOption(opt.trait, opt.time)}
                        sx={{
                          p: 2,
                          borderRadius: '16px',
                          cursor: 'pointer',
                          border: '2px solid',
                          borderColor: isSelected ? '#f59e0b' : '#f3f4f6',
                          bgcolor: isSelected ? '#fffbeb' : 'background.paper',
                          boxShadow: isSelected ? '0 6px 18px rgba(245, 158, 11, 0.16)' : 'none',
                          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                          '&:hover': {
                            borderColor: '#f59e0b',
                            transform: 'translateY(-2px)',
                          },
                        }}
                      >
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Box>
                            <Stack direction="row" spacing={1} alignItems="center">
                              <Typography fontWeight={800} fontSize={15} color={isSelected ? '#92400e' : 'text.primary'}>
                                {opt.label}
                              </Typography>
                              <Chip
                                label={`+${opt.time}m`}
                                size="small"
                                sx={{ bgcolor: '#fef3c7', color: '#92400e', fontWeight: 800, height: 20, fontSize: 11 }}
                              />
                            </Stack>
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
                              borderColor: isSelected ? '#f59e0b' : '#d1d5db',
                              bgcolor: isSelected ? '#f59e0b' : 'transparent',
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
                  endIcon={currentStepIndex === totalSteps - 1 ? <EmojiEventsRoundedIcon /> : <ArrowForwardRoundedIcon />}
                  sx={{
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontWeight: 800,
                    px: 3.5,
                    bgcolor: '#f59e0b',
                    '&:hover': { bgcolor: '#d97706' },
                  }}
                >
                  {currentStepIndex === totalSteps - 1 ? "Publish Manager Audit 📊" : "Next Avoidance Tactic"}
                </Button>
              </Stack>
            </Box>
          )}

          {/* Final Certificate & Performance Review */}
          {report && (
            <Box>
              <Card
                sx={{
                  p: { xs: 2.5, sm: 4 },
                  borderRadius: '24px',
                  background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
                  border: '2px solid #f59e0b',
                  boxShadow: '0 12px 36px rgba(245, 158, 11, 0.15)',
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
                    bgcolor: '#d97706',
                    color: 'white',
                    px: 2,
                    py: 0.6,
                    borderRadius: '20px',
                    fontSize: 12,
                    fontWeight: 900,
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                    boxShadow: '0 4px 12px rgba(217, 119, 6, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                  }}
                >
                  <VerifiedRoundedIcon sx={{ fontSize: 16 }} /> EMPLOYEE OF THE YEAR
                </Box>

                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <Typography variant="overline" color="#b45309" fontWeight={900} letterSpacing={2}>
                    OFFICIAL CORPORATE SLACKER PERFORMANCE REVIEW
                  </Typography>
                  <Typography variant="h4" fontWeight={900} sx={{ mt: 1, mb: 0.5 }}>
                    {report.name}
                  </Typography>
                  <Chip
                    label={report.title}
                    sx={{
                      bgcolor: '#fff',
                      color: '#92400e',
                      fontWeight: 800,
                      fontSize: 14,
                      py: 2,
                      px: 1,
                      borderRadius: '12px',
                      border: '1px solid #fde68a',
                    }}
                  />
                </Box>

                {/* Score Stats */}
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' },
                    gap: 2,
                    mb: 3,
                  }}
                >
                  <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: '16px', textAlign: 'center', border: '1px solid #fde68a' }}>
                    <Typography variant="caption" color="text.secondary" fontWeight={800}>
                      MINUTES WASTED
                    </Typography>
                    <Typography variant="h4" fontWeight={900} color="#d97706">
                      {report.minutesWasted}m
                    </Typography>
                  </Box>

                  <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: '16px', textAlign: 'center', border: '1px solid #fde68a' }}>
                    <Typography variant="caption" color="text.secondary" fontWeight={800}>
                      TASKS COMPLETED
                    </Typography>
                    <Typography variant="h4" fontWeight={900} color="#ef4444">
                      {report.tasksFinished}
                    </Typography>
                  </Box>

                  <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: '16px', textAlign: 'center', border: '1px solid #fde68a' }}>
                    <Typography variant="caption" color="text.secondary" fontWeight={800}>
                      KEYBOARD SOUNDS
                    </Typography>
                    <Typography variant="h4" fontWeight={900} color="#10b981">
                      {report.clatterScore} WPM
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    bgcolor: 'background.paper',
                    p: 2.5,
                    borderRadius: '18px',
                    mb: 3,
                    border: '1px solid #fde68a',
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="caption" color="text.secondary" fontWeight={800}>
                    HONORARY STATUS
                  </Typography>
                  <Typography variant="h5" fontWeight={900} color="#b45309" sx={{ mt: 0.5 }}>
                    {report.award}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    "Demonstrated extraordinary creativity in avoiding actual corporate obligations."
                  </Typography>
                </Box>

                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ pt: 1, borderTop: '1px solid #fde68a', gap: 1 }}
                >
                  <Typography variant="caption" color="text.secondary">
                    Review Date: <strong>{report.date}</strong>
                  </Typography>
                  <Typography variant="caption" sx={{ fontStyle: 'italic', color: '#92400e', fontWeight: 700 }}>
                    Audited by PrankLab & Tarun Tiwari 💻
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
                    bgcolor: '#f59e0b',
                    '&:hover': { bgcolor: '#d97706' },
                  }}
                >
                  Copy Manager Status Report
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
                    borderColor: '#f59e0b',
                    color: '#d97706',
                    '&:hover': { borderColor: '#d97706', bgcolor: '#fffbeb' },
                  }}
                >
                  Start New Slacker Day 🦥
                </Button>
              </Stack>
            </Box>
          )}
        </Paper>
      </Box>
    </ProjectLayout>
  );
}
