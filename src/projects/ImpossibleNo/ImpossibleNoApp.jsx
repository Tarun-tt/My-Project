import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Chip,
  Stack,
  Card,
  CardContent,
  LinearProgress,
} from '@mui/material';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import CelebrationRoundedIcon from '@mui/icons-material/CelebrationRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import ProjectLayout from '../../components/common/ProjectLayout.jsx';
import MovingButton from '../../components/common/MovingButton.jsx';
import useMovingButton from '../../hooks/useMovingButton.js';
import { playSuccessSound, playCelebrationSound } from '../../utils/soundEffects.js';
import { fireConfetti, fireCannons } from '../../utils/confettiHelper.js';

const QUESTIONS = [
  {
    q: "Will you go on a date with me?",
    sub: "There is literally no pressure... except this button has feelings.",
    emoji: "💌",
  },
  {
    q: "Are you really, really sure you don't want to reconsider?",
    sub: "My imaginary legal counsel says you're violating emotional safety regulations.",
    emoji: "🥺",
  },
  {
    q: "What if I promised free food & zero bad jokes?",
    sub: "(Okay, maybe like 2 bad jokes maximum, but they're cute).",
    emoji: "🍕",
  },
  {
    q: "Look how tiny the 'No' button is getting! Don't you pity it?",
    sub: "The 'Yes' button is thriving. It hit the gym. It's ready.",
    emoji: "💪",
  },
  {
    q: "Did you know saying 'Yes' releases 400% more dopamine?",
    sub: "This is a peer-reviewed scientific fact (source: trust me bro).",
    emoji: "🧪",
  },
  {
    q: "At this point, you've tried clicking 'No' multiple times. That's true dedication.",
    sub: "Channel that energy into having dinner with me!",
    emoji: "🏃‍♂️",
  },
  {
    q: "Resistance is mathematically futile now. Look at the screen!",
    sub: "The universe is screaming YES in all caps.",
    emoji: "🌌",
  },
  {
    q: "Final boss question: Will you just say YES already?!",
    sub: "The No button has officially retired and moved to the Bahamas.",
    emoji: "👑",
  },
];

const DODGES = [
  "Nice try! The No button has left the chat. 🏃💨",
  "Are you sure? My imaginary lawyer says try again. 😂",
  "That button has serious commitment issues! 🏃‍♀️",
  "The universe is strongly suggesting Yes. 💖",
  "Error 404: Rejection protocol deleted! 🚀",
  "Aha! Too slow! ⚡",
  "You cannot escape your destiny! 🌟",
  "Just look at how huge the Yes button is! 🥳",
];

export default function ImpossibleNoApp() {
  const [step, setStep] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [yesScale, setYesScale] = useState(1);
  const [toast, setToast] = useState('');

  const {
    dodgeCount,
    position,
    isMoved,
    moveButton,
    reset: resetMoving,
  } = useMovingButton({
    buttonWidth: 190,
    buttonHeight: 52,
    padding: 24,
    playSound: true,
  });

  const handleDodge = () => {
    moveButton();
    // Yes button grows larger every time!
    setYesScale((prev) => Math.min(prev + 0.16, 2.2));
    if (step < QUESTIONS.length - 1 && dodgeCount % 2 === 1) {
      setStep((prev) => prev + 1);
    }
  };

  const handleYes = () => {
    playCelebrationSound();
    fireCannons();
    setAccepted(true);
  };

  const handleReset = () => {
    setStep(0);
    setAccepted(false);
    setYesScale(1);
    resetMoving();
  };

  const currentQ = QUESTIONS[step] || QUESTIONS[0];

  return (
    <ProjectLayout
      title="The Impossible No Website"
      emoji="💘"
      category="Romantic Prank"
      accentColor="#d93663"
      onReset={handleReset}
    >
      <Box sx={{ maxWidth: 680, mx: 'auto', mt: 2, textAlign: 'center' }}>
        {!accepted ? (
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, sm: 5 },
              borderRadius: '28px',
              border: '1.5px solid #fecdd3',
              background: 'linear-gradient(180deg, #ffffff 0%, #fff5f7 100%)',
              boxShadow: '0 20px 60px rgba(217, 54, 99, 0.12)',
              position: 'relative',
              overflow: 'visible',
            }}
          >
            {/* Step progress */}
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
              <Typography variant="caption" fontWeight={800} color="#d93663">
                Question {step + 1} of {QUESTIONS.length}
              </Typography>
              <Typography variant="caption" color="text.secondary" fontWeight={700}>
                Dodges: {dodgeCount} 🏃
              </Typography>
            </Stack>

            <LinearProgress
              variant="determinate"
              value={((step + 1) / QUESTIONS.length) * 100}
              sx={{
                height: 8,
                borderRadius: 4,
                mb: 4,
                bgcolor: '#ffe4e6',
                '& .MuiLinearProgress-bar': {
                  background: 'linear-gradient(90deg, #fb7185, #e11d48)',
                },
              }}
            />

            <Box sx={{ fontSize: 64, mb: 1.5 }}>{currentQ.emoji}</Box>

            <Chip
              label="ROMANTIC PERSISTENCE PROTOCOL"
              size="small"
              sx={{
                bgcolor: '#ffe4e6',
                color: '#e11d48',
                fontWeight: 800,
                fontSize: 11,
                letterSpacing: '0.08em',
                mb: 2,
              }}
            />

            <Typography
              variant="h4"
              fontWeight={900}
              fontFamily="'Playfair Display', Georgia, serif"
              sx={{ mb: 1.5, color: '#4c0519', fontSize: { xs: 26, sm: 34 } }}
            >
              {currentQ.q}
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 480, mx: 'auto' }}>
              {currentQ.sub}
            </Typography>

            {/* Action Buttons */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2.5,
                flexWrap: 'wrap',
                minHeight: 80,
                position: 'relative',
              }}
            >
              {/* Expanding Yes Button */}
              <Button
                variant="contained"
                size="large"
                startIcon={<FavoriteRoundedIcon />}
                onClick={handleYes}
                sx={{
                  background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
                  boxShadow: '0 8px 24px rgba(225, 29, 72, 0.4)',
                  color: '#ffffff',
                  fontWeight: 900,
                  transform: `scale(${yesScale})`,
                  transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  zIndex: 10,
                }}
              >
                Yes, Absolutely! 💖
              </Button>

              {/* Dodging No Button */}
              <MovingButton
                label="No 🙈"
                dodges={DODGES}
                dodgeCount={dodgeCount}
                position={position}
                isMoved={isMoved}
                onDodge={handleDodge}
              />
            </Box>

            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 4 }}>
              💡 Hint: The 'No' button is legally allergic to your cursor.
            </Typography>
          </Paper>
        ) : (
          /* Celebration View */
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, sm: 5 },
              borderRadius: '28px',
              border: '2px solid #fda4af',
              background: 'linear-gradient(180deg, #ffffff 0%, #fff1f2 100%)',
              boxShadow: '0 24px 70px rgba(225, 29, 72, 0.16)',
            }}
          >
            <Box sx={{ fontSize: 72, mb: 2 }}>🎉💐🥳</Box>

            <Chip
              icon={<CelebrationRoundedIcon sx={{ fontSize: 16 }} />}
              label="SUCCESSFULLY SECURED THE DATE"
              sx={{
                bgcolor: '#ffe4e6',
                color: '#be123c',
                fontWeight: 800,
                mb: 2,
              }}
            />

            <Typography
              variant="h3"
              fontWeight={900}
              fontFamily="'Playfair Display', Georgia, serif"
              sx={{ mb: 2, color: '#881337', fontSize: { xs: 28, sm: 40 } }}
            >
              IT’S A DATE! 💖
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 500, mx: 'auto' }}>
              After <strong>{dodgeCount} failed escape attempts</strong> by the No button, destiny prevailed! You are officially locked in.
            </Typography>

            <Card sx={{ bgcolor: '#ffffff', borderRadius: '20px', border: '1px solid #fecdd3', p: 3, mb: 4, textAlign: 'left' }}>
              <Typography fontWeight={800} color="#9f1239" sx={{ mb: 1 }}>
                📜 Official Date Guarantee Pass
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                • <strong>Perks included:</strong> Delicious food, zero awkward silences, aesthetic photos.
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                • <strong>Cancellation policy:</strong> Prohibited by the Supreme Council of Romance.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • <strong>Date status:</strong> 100% Confirmed.
              </Typography>
            </Card>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
              <Button
                variant="contained"
                size="large"
                startIcon={<ContentCopyRoundedIcon />}
                onClick={() => {
                  const text = "💖 I officially accepted the date! The No button had commitment issues anyway! 🥳✨";
                  navigator.clipboard.writeText(text);
                  alert("Copied declaration to clipboard! Share it with them! 💌");
                }}
                sx={{
                  background: 'linear-gradient(135deg, #f43f5e, #be123c)',
                  fontWeight: 800,
                }}
              >
                Copy Date Declaration
              </Button>

              <Button
                variant="outlined"
                size="large"
                startIcon={<RestartAltRoundedIcon />}
                onClick={handleReset}
                sx={{ borderColor: '#f43f5e', color: '#f43f5e', fontWeight: 700 }}
              >
                Try Again
              </Button>
            </Stack>
          </Paper>
        )}
      </Box>
    </ProjectLayout>
  );
}
