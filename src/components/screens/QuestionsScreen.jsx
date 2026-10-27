import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Chip,
  Stack,
  LinearProgress,
  IconButton,
} from '@mui/material';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import MovingButton from '../common/MovingButton.jsx';
import useMovingButton from '../../hooks/useMovingButton.js';
import { questions } from '../../constants/questions.js';

export function QuestionsScreen({ onComplete, onBackToInvite, onShowToast }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQuestion = questions[currentIndex] || questions[0];

  const {
    dodgeCount,
    position,
    isMoved,
    moveButton,
    reset: resetMovingButton,
  } = useMovingButton();

  // Reset evasive button position when moving between questions
  useEffect(() => {
    resetMovingButton();
  }, [currentIndex, resetMovingButton]);

  const handleNext = () => {
    const reaction = currentQuestion.positiveOption.reaction;
    if (onShowToast && reaction) {
      onShowToast(reaction);
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Completed all questions!
      if (onShowToast) {
        onShowToast("Quiz completed! Tarun is thrilled! Let’s plan our date 💖");
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

  return (
    <Box className="planner-wrap">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Button
          startIcon={<ArrowBackRoundedIcon />}
          onClick={handlePrevious}
          className="back-button"
          sx={{ mb: '0 !important' }}
        >
          {currentIndex === 0 ? "Back to question" : "Previous"}
        </Button>

        <Button
          endIcon={<SkipNextRoundedIcon />}
          onClick={onComplete}
          size="small"
          sx={{ color: '#a06b7a', fontWeight: 600, fontSize: 13 }}
        >
          Skip to planner
        </Button>
      </Stack>

      <Box sx={{ width: '100%', mb: 3 }}>
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.8 }}>
          <Typography variant="caption" fontWeight={700} color="secondary">
            Question {currentIndex + 1} of {questions.length}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {Math.round(progressPercent)}% answered
          </Typography>
        </Stack>
        <LinearProgress
          variant="determinate"
          value={progressPercent}
          sx={{
            height: 8,
            borderRadius: 4,
            bgcolor: 'rgba(232, 74, 114, 0.12)',
            '& .MuiLinearProgress-bar': {
              borderRadius: 4,
              background: 'linear-gradient(90deg, #ff7a9c, #e84a72)',
            },
          }}
        />
      </Box>

      <Paper elevation={0} className="invite-card" sx={{ mt: '0 !important' }}>
        <div className="sparkle sparkle-one">✦</div>
        <div className="sparkle sparkle-two">✧</div>

        <Box className="invite-illustration" sx={{ height: 130, mb: 2 }}>
          <div className="sun-glow" style={{ width: 120, height: 120 }} />
          <div
            className="date-heart"
            style={{ width: 85, height: 85, fontSize: 40 }}
          >
            {currentQuestion.emoji}
          </div>
        </Box>

        <Chip label={currentQuestion.eyebrow} className="eyebrow-chip" />

        <Typography className="invite-title" component="h2" sx={{ fontSize: 'clamp(28px, 4.5vw, 40px) !important', my: 2 }}>
          {currentQuestion.question}
        </Typography>

        <Typography color="text.secondary" className="invite-subtitle" sx={{ mb: 3 }}>
          {currentQuestion.subtitle}
        </Typography>

        <Box className="invite-actions" sx={{ minHeight: 65, mt: 3 }}>
          <Button
            size="large"
            variant="contained"
            startIcon={<FavoriteRoundedIcon />}
            onClick={handleNext}
            className="yes-button"
          >
            {currentQuestion.positiveOption.label}
          </Button>

          <MovingButton
            label={currentQuestion.evasiveOption.initialLabel}
            dodges={currentQuestion.evasiveOption.dodges}
            dodgeCount={dodgeCount}
            position={position}
            isMoved={isMoved}
            onDodge={moveButton}
            className="no-button"
          />
        </Box>

        <Typography className="tiny-note" sx={{ mt: 3 }}>
          <AutoAwesomeRoundedIcon sx={{ fontSize: 14, color: '#e84a72' }} />
          {dodgeCount === 0
            ? currentQuestion.evasiveOption.hint
            : `Attempted dodges: ${dodgeCount} — Tarun's answer is destiny! ✨`}
        </Typography>
      </Paper>
    </Box>
  );
}

export default QuestionsScreen;
