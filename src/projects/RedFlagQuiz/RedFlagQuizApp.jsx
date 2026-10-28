import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Chip,
  Stack,
  LinearProgress,
  Card,
} from '@mui/material';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import ProjectLayout from '../../components/common/ProjectLayout.jsx';
import { playSuccessSound, playCelebrationSound } from '../../utils/soundEffects.js';
import { fireConfetti } from '../../utils/confettiHelper.js';

const RED_FLAG_QUESTIONS = [
  {
    q: "How do you respond when someone asks 'Are you mad at me?'",
    options: [
      { text: "Say 'I'm fine' with chilling emotional subtext.", flag: 'fine' },
      { text: "Send a 47-page essay analyzing their life choices.", flag: 'overthinker' },
      { text: "Leave on read for 4 days then reply 'Haha nah why?'.", flag: 'reply' },
      { text: "Stage a full theatrical scene with background music.", flag: 'drama' },
    ],
  },
  {
    q: "You send a risky text. What is your immediate follow-up ritual?",
    options: [
      { text: "Throw phone across the room, put in airplane mode.", flag: 'overthinker' },
      { text: "Delete message for everyone after 8 seconds.", flag: 'plot' },
      { text: "Screenshot and dissect in 3 group chats simultaneously.", flag: 'drama' },
      { text: "Turn off read receipts and pretend I am in a coma.", flag: 'reply' },
    ],
  },
  {
    q: "Your friend arrives 15 minutes late to meet you. You:",
    options: [
      { text: "Arrive 30 minutes late on purpose as strategic revenge.", flag: 'drama' },
      { text: "Say 'No worries!' while calculating the friendship expiration date.", flag: 'fine' },
      { text: "Was already running 45 minutes late anyway.", flag: 'plot' },
      { text: "Convinced myself they got into a tragic accident.", flag: 'overthinker' },
    ],
  },
  {
    q: "What is your relationship with unread messages and notifications?",
    options: [
      { text: "3,482 unread badges. I read them in notifications and never reply.", flag: 'reply' },
      { text: "Zero inbox policy. If I don't reply in 4 seconds I feel guilt.", flag: 'overthinker' },
      { text: "I open them, reply mentally, and forget for 3 months.", flag: 'fine' },
      { text: "I post Instagram stories while ignoring your urgent text.", flag: 'drama' },
    ],
  },
  {
    q: "When someone says 'We need to talk', what do you think?",
    options: [
      { text: "Review my life actions from 2014 to present for hidden crimes.", flag: 'overthinker' },
      { text: "Prepare an aggressive counter-defense opening statement.", flag: 'drama' },
      { text: "Pack a suitcase and move to another state under an alias.", flag: 'plot' },
      { text: "Say 'K' and mentally dissociate.", flag: 'fine' },
    ],
  },
  {
    q: "How do you handle social battery depletion at a gathering?",
    options: [
      { text: "The Irish Exit: Disappear silently without telling a soul.", flag: 'plot' },
      { text: "Hide in the bathroom scrolling reels for 35 minutes.", flag: 'reply' },
      { text: "Smile rigidly while calculating the earliest socially polite exit.", flag: 'fine' },
      { text: "Suddenly announce a dramatic fictional emergency.", flag: 'drama' },
    ],
  },
  {
    q: "What is your retail therapy coping mechanism?",
    options: [
      { text: "Add 85 items to cart, stare at total, buy nothing.", flag: 'overthinker' },
      { text: "Buy something wildly expensive because 'I survived Monday'.", flag: 'plot' },
      { text: "Buy cute stuff to fix my emotional instability.", flag: 'fine' },
      { text: "Order food for 4 people and eat it alone in bed.", flag: 'drama' },
    ],
  },
  {
    q: "Your music listening habits when mildly sad:",
    options: [
      { text: "Play gut-wrenching acoustic songs to intensify depression by 300%.", flag: 'drama' },
      { text: "Listen to the same melancholy song on loop for 6 hours.", flag: 'overthinker' },
      { text: "Aggressive upbeat phonk while dead inside.", flag: 'fine' },
      { text: "Stare at the ceiling pretending I'm in a rainy coming-of-age movie.", flag: 'plot' },
    ],
  },
  {
    q: "Someone compliments your outfit. Your response:",
    options: [
      { text: "'Thanks, it was $4 on sale and it has pockets!'", flag: 'fine' },
      { text: "'Really? Are you sure? The lighting is deceiving...'", flag: 'overthinker' },
      { text: "'I know, right? I am an icon.' (Deep insecurity internally).", flag: 'drama' },
      { text: "Look behind me to check if they were talking to someone else.", flag: 'plot' },
    ],
  },
  {
    q: "Final diagnostic: What is your primary superpower?",
    options: [
      { text: "Finding non-existent hidden meanings in 1-word texts.", flag: 'overthinker' },
      { text: "Ghosting people I genuinely adore because replying is hard.", flag: 'reply' },
      { text: "Making impulsive 3 AM life decisions.", flag: 'plot' },
      { text: "Writing fictional Oscar acceptance speeches in the shower.", flag: 'drama' },
    ],
  },
];

const FLAG_ARCHETYPES = {
  overthinker: {
    title: "Professional Overthinker 🧠",
    subtitle: "You analyze punctuation marks like crime scene evidence.",
    desc: "Your brain runs 47 simultaneous Google Chrome tabs with video playing in the background. If someone replies 'Sure' instead of 'Sure!', you immediately call an emergency forensic summit. Survival tip for friends: Just send voice notes so they can't obsess over commas.",
    score: 89,
    color: '#8b5cf6',
  },
  reply: {
    title: "Reply-Destroyer & Ghost Apprentice ⏳",
    subtitle: "Reads in notification preview. Replies in the next fiscal quarter.",
    desc: "You have 4,000 unread messages, but you are currently active on Instagram posting stories. When you finally reply after 3 weeks with 'omg so sorry was in the shower', nobody even questions it anymore. You love your friends deeply, but keyboards are exhausting.",
    score: 94,
    color: '#f59e0b',
  },
  drama: {
    title: "Dramatic Main Character Syndrome 🎭",
    subtitle: "Your life isn't reality; it's a 9-season high-budget Netflix serial.",
    desc: "Minor inconveniences are met with deep existential sighs and rainy-window staring. When you tell a story, it involves 14 prologue chapters, background character development, and emotional soundtrack cues. Absolutely hilarious to hang out with.",
    score: 86,
    color: '#ef4444',
  },
  plot: {
    title: "Walking Plot Twist 🌪️",
    subtitle: "Nobody knows your next move, including your own nervous system.",
    desc: "You make life-altering decisions at 3:15 AM on a Tuesday. You will randomly decide to learn Brazilian Jiu-Jitsu or adopt a potted plant you name Fernando. People around you live on the edge of their seats wondering what spontaneous chaos is next.",
    score: 92,
    color: '#ec4899',
  },
  fine: {
    title: "Chronic 'I'm Fine' Connoisseur 📄",
    subtitle: "Says 'I am totally fine' then issues a 47-page internal audit.",
    desc: "You are the master of polite smiles while internally burning down the emotional city. You will bottle up grievances until you write a Nobel prize-winning monologue in your head. Please just tell people what you want to eat for dinner.",
    score: 84,
    color: '#06b6d4',
  },
};

export default function RedFlagQuizApp() {
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState({ overthinker: 0, reply: 0, drama: 0, plot: 0, fine: 0 });
  const [result, setResult] = useState(null);

  const handleSelectOption = (flagType) => {
    playSuccessSound();
    const updated = { ...scores, [flagType]: (scores[flagType] || 0) + 1 };
    setScores(updated);

    if (currentStep < RED_FLAG_QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Calculate winner
      let highestFlag = 'overthinker';
      let highestCount = -1;
      Object.keys(updated).forEach((key) => {
        if (updated[key] > highestCount) {
          highestCount = updated[key];
          highestFlag = key;
        }
      });

      playCelebrationSound();
      fireConfetti();
      setResult(FLAG_ARCHETYPES[highestFlag] || FLAG_ARCHETYPES.overthinker);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setScores({ overthinker: 0, reply: 0, drama: 0, plot: 0, fine: 0 });
    setResult(null);
  };

  const currentQ = RED_FLAG_QUESTIONS[currentStep];
  const progressPercent = ((currentStep + 1) / RED_FLAG_QUESTIONS.length) * 100;

  return (
    <ProjectLayout
      title="What Kind of Red Flag Are You?"
      emoji="🚩"
      category="Personality Quiz"
      accentColor="#ef4444"
      onReset={handleReset}
    >
      <Box sx={{ maxWidth: 700, mx: 'auto', mt: 1 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, sm: 4 },
            borderRadius: '26px',
            border: '1.5px solid #fecaca',
            bgcolor: 'background.paper',
            boxShadow: '0 12px 40px rgba(239, 68, 68, 0.08)',
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Box sx={{ fontSize: 54, mb: 1 }}>🚩</Box>
            <Typography variant="h4" fontWeight={900} sx={{ mb: 1 }}>
              Red Flag Personality Quiz
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Discover your most questionable personality flaw in 10 completely unscientific questions.
            </Typography>
          </Box>

          {!result ? (
            <Box>
              {/* Progress */}
              <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                <Typography variant="caption" fontWeight={800} color="#dc2626">
                  Question {currentStep + 1} of {RED_FLAG_QUESTIONS.length}
                </Typography>
                <Typography variant="caption" color="text.secondary" fontWeight={700}>
                  {Math.round(progressPercent)}% completed
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={progressPercent}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  mb: 4,
                  bgcolor: '#fee2e2',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: '#ef4444',
                  },
                }}
              />

              {/* Question */}
              <Typography variant="h6" fontWeight={800} sx={{ mb: 3, lineHeight: 1.4 }}>
                {currentQ.q}
              </Typography>

              {/* Options */}
              <Stack spacing={1.5}>
                {currentQ.options.map((opt, i) => (
                  <Paper
                    key={i}
                    elevation={0}
                    onClick={() => handleSelectOption(opt.flag)}
                    sx={{
                      p: 2,
                      borderRadius: '16px',
                      border: '1.5px solid #fed7aa',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        borderColor: '#ef4444',
                        bgcolor: '#fff5f5',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    <Typography fontWeight={700} fontSize={14.5}>
                      {opt.text}
                    </Typography>
                  </Paper>
                ))}
              </Stack>
            </Box>
          ) : (
            /* Result View */
            <Card
              sx={{
                p: { xs: 3, sm: 4 },
                borderRadius: '24px',
                border: `2px solid ${result.color}`,
                bgcolor: '#fffbfb',
                textAlign: 'center',
              }}
            >
              <Chip
                label="OFFICIAL UNPROVEN DIAGNOSIS"
                sx={{
                  fontWeight: 900,
                  bgcolor: '#fee2e2',
                  color: '#b91c1c',
                  mb: 2,
                }}
              />

              <Typography variant="h4" fontWeight={900} sx={{ mb: 1, color: result.color }}>
                {result.title}
              </Typography>

              <Typography variant="subtitle1" fontWeight={750} sx={{ mb: 2, color: 'text.secondary' }}>
                “{result.subtitle}”
              </Typography>

              <Box sx={{ p: 2, bgcolor: '#ffffff', borderRadius: '18px', border: '1px solid #fee2e2', mb: 3, textAlign: 'left' }}>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {result.desc}
                </Typography>
              </Box>

              <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" sx={{ mb: 3 }}>
                <Typography variant="caption" fontWeight={800} color="text.secondary">
                  CHAOTIC ENERGY SCORE:
                </Typography>
                <Chip label={`${result.score}% RED FLAG`} color="error" size="small" sx={{ fontWeight: 900 }} />
              </Stack>

              <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 3, fontStyle: 'italic' }}>
                ⚠️ Disclaimer: For entertainment only. You are an absolute delight (mostly).
              </Typography>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} justifyContent="center">
                <Button
                  variant="contained"
                  startIcon={<ContentCopyRoundedIcon />}
                  onClick={() => {
                    const text = `🚩 I took the Red Flag Quiz on PrankLab and my diagnosis is:\n\n"${result.title}"\n${result.subtitle}\n\nChaotic Score: ${result.score}% 🤡`;
                    navigator.clipboard.writeText(text);
                    alert("Copied diagnosis to clipboard! Share it with friends! 📋");
                  }}
                  sx={{ bgcolor: result.color, fontWeight: 800, '&:hover': { opacity: 0.9 } }}
                >
                  Share My Red Flag 🚩
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<RestartAltRoundedIcon />}
                  onClick={handleReset}
                  sx={{ borderColor: result.color, color: result.color, fontWeight: 800 }}
                >
                  Retake Quiz
                </Button>
              </Stack>
            </Card>
          )}
        </Paper>
      </Box>
    </ProjectLayout>
  );
}
