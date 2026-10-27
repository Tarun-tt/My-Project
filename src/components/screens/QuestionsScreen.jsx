import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Chip,
  Stack,
  LinearProgress,
} from '@mui/material';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import MovingButton from '../common/MovingButton.jsx';
import useMovingButton from '../../hooks/useMovingButton.js';
import { questions } from '../../constants/questions.js';
import { playSuccessSound, playCelebrationSound } from '../../utils/soundEffects.js';

export function QuestionsScreen({ onComplete, onBackToInvite, onShowToast }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalDodges, setTotalDodges] = useState(0);
  const currentQuestion = questions[currentIndex] || questions[0];

  const {
    dodgeCount,
    position,
    isMoved,
    moveButton,
    reset: resetMovingButton,
  } = useMovingButton({
    buttonWidth: 180,
    buttonHeight: 52,
    padding: 20,
    playSound: true,
  });

  // Track total dodges across all 9 tasks
  const handleDodge = () => {
    moveButton();
    setTotalDodges((prev) => prev + 1);
  };

  // Reset current question's evasive button position when step changes
  useEffect(() => {
    resetMovingButton();
  }, [currentIndex, resetMovingButton]);

  const handleNext = () => {
    playSuccessSound();
    const reaction = currentQuestion.positiveOption.reaction;
    if (onShowToast && reaction) {
      onShowToast(reaction);
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Completed all 9 hilarious tasks!
      playCelebrationSound();
      if (onShowToast) {
        onShowToast("🏆 CONGRATULATIONS! You passed all 9 Tarun Tiwari date challenges with 100%! 💖");
      }
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      onBackToInvite();
    }
  };

  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  // Funny milestone levels
  const funnyLevel = React.useMemo(() => {
    if (currentIndex < 3) return "Level: Innocent Beginner 🐣";
    if (currentIndex < 6) return "Level: Romantic Danger Zone 🔥";
    if (currentIndex < 8) return "Level: Certified Rom-Com Expert 🎬";
    return "Level: Ultimate Soulmate Status 💍";
  }, [currentIndex]);

  return (
    <Box className="planner-wrap">
      {/* Top navigation actions */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 1.5 }}
      >
        <Button
          startIcon={<ArrowBackRoundedIcon />}
          onClick={handlePrevious}
          className="back-button"
          sx={{ mb: '0 !important' }}
        >
          {currentIndex === 0 ? "Back to question" : "Previous Task"}
        </Button>

        <Button
          endIcon={<SkipNextRoundedIcon />}
          onClick={() => {
            playCelebrationSound();
            onComplete();
          }}
          size="small"
          sx={{ color: '#a06b7a', fontWeight: 700, fontSize: 13 }}
        >
          Skip directly to planner
        </Button>
      </Stack>

      {/* Progress bar & funny level chip */}
      <Box sx={{ width: '100%', mb: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.8 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="caption" fontWeight={800} color="primary.main">
              Task {currentIndex + 1} of {questions.length}
            </Typography>
            <Chip
              label={funnyLevel}
              size="small"
              sx={{
                height: 20,
                fontSize: 10,
                fontWeight: 700,
                bgcolor: '#fff0f3',
                color: '#c72e57',
                border: '1px solid #f8d0dc',
              }}
            />
          </Stack>
          <Typography variant="caption" color="text.secondary" fontWeight={600}>
            {Math.round(progressPercent)}% completed
          </Typography>
        </Stack>

        <LinearProgress
          variant="determinate"
          value={progressPercent}
          sx={{
            height: 9,
            borderRadius: 5,
            bgcolor: 'rgba(232, 74, 114, 0.12)',
            '& .MuiLinearProgress-bar': {
              borderRadius: 5,
              background: 'linear-gradient(90deg, #ff7a9c, #e84a72)',
            },
          }}
        />
      </Box>

      {/* Main Task Card */}
      <Paper elevation={0} className="invite-card" sx={{ mt: '0 !important' }}>
        <div className="sparkle sparkle-one">✦</div>
        <div className="sparkle sparkle-two">✧</div>

        {/* Animated Emoji Badge */}
        <Box className="invite-illustration" sx={{ height: 125, mb: 1.5 }}>
          <div className="sun-glow" style={{ width: 110, height: 110 }} />
          <div
            className="date-heart"
            style={{ width: 85, height: 85, fontSize: 42 }}
          >
            {currentQuestion.emoji}
          </div>
        </Box>

        <Chip label={currentQuestion.category} className="eyebrow-chip" />

        <Typography
          className="invite-title"
          component="h2"
          sx={{
            fontSize: 'clamp(26px, 4.2vw, 36px) !important',
            lineHeight: '1.25 !important',
            my: 2,
            px: { xs: 0, sm: 2 },
          }}
        >
          {currentQuestion.title}
        </Typography>

        <Typography
          color="text.secondary"
          className="invite-subtitle"
          sx={{ mb: 2.5, px: { xs: 1, sm: 3 } }}
        >
          {currentQuestion.subtitle}
        </Typography>

        {/* Interactive Buttons */}
        <Box className="invite-actions" sx={{ minHeight: 65, mt: 2 }}>
          <Button
            size="large"
            variant="contained"
            startIcon={<FavoriteRoundedIcon />}
            onClick={handleNext}
            className="yes-button"
            sx={{ px: 3, py: 1.4 }}
          >
            {currentQuestion.positiveOption.label}
          </Button>

          <MovingButton
            label={currentQuestion.evasiveOption.initialLabel}
            dodges={currentQuestion.evasiveOption.dodges}
            dodgeCount={dodgeCount}
            position={position}
            isMoved={isMoved}
            onDodge={handleDodge}
            className="no-button"
          />
        </Box>

        {/* Footer Hint & Dodge Counter */}
        <Typography className="tiny-note" sx={{ mt: 3, px: 1 }}>
          <AutoAwesomeRoundedIcon sx={{ fontSize: 14, color: '#e84a72' }} />
          {dodgeCount === 0
            ? currentQuestion.evasiveOption.hint
            : `Attempted dodges on this task: ${dodgeCount} (Total dodges: ${totalDodges}) — Tarun's answer is destiny! 💖`}
        </Typography>
      </Paper>
    </Box>
  );
}

export default QuestionsScreen;
