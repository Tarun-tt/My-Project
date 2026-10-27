import React from 'react';
import { Paper, Box, Typography, Button, Chip } from '@mui/material';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import MovingButton from '../common/MovingButton.jsx';
import useMovingButton from '../../hooks/useMovingButton.js';
import { playSuccessSound } from '../../utils/soundEffects.js';

export function InviteScreen({ onAccept }) {
  const {
    dodgeCount,
    position,
    isMoved,
    moveButton,
  } = useMovingButton({
    buttonWidth: 160,
    buttonHeight: 56,
    playSound: true,
  });

  const noDodges = [
    "Wait, no! 😅",
    "Almost got me! 😳",
    "Are you sure? 🥺",
    "Tarun says nope! 😉",
    "Catch me! 🏃💨",
    "Nice try, cutie! 💖",
    "Universe says YES! 💘",
  ];

  const handleAccept = () => {
    playSuccessSound();
    onAccept();
  };

  return (
    <Paper elevation={0} className="invite-card">
      <div className="sparkle sparkle-one">✦</div>
      <div className="sparkle sparkle-two">✧</div>

      <Box className="invite-illustration">
        <div className="sun-glow" />
        <div className="date-heart">
          <FavoriteRoundedIcon sx={{ fontSize: 54 }} />
        </div>
        <span className="float-emoji e1">🌷</span>
        <span className="float-emoji e2">✨</span>
        <span className="float-emoji e3">💌</span>
      </Box>

      <Chip label="A VERY SPECIAL INVITATION FROM TARUN TIWARI" className="eyebrow-chip" />

      <Typography className="invite-title" component="h1">
        Will you go on a<br />
        <span>date with Tarun?</span>
      </Typography>

      <Typography color="text.secondary" className="invite-subtitle">
        I’ve planned something special, full of good food, cozy music, and great memories.
        It only needs one thing — you.
      </Typography>

      <Box className="invite-actions">
        <Button
          size="large"
          variant="contained"
          startIcon={<FavoriteRoundedIcon />}
          onClick={handleAccept}
          className="yes-button"
        >
          Yes, I’d love to! 💖
        </Button>

        <MovingButton
          label="No 🙈"
          dodges={noDodges}
          dodgeCount={dodgeCount}
          position={position}
          isMoved={isMoved}
          onDodge={moveButton}
          className="no-button"
        />
      </Box>

      <Typography className="tiny-note">
        <FavoriteBorderRoundedIcon sx={{ fontSize: 14 }} />{" "}
        {dodgeCount === 0
          ? "P.S. Choose wisely, there's only one right answer 😉"
          : `That’s attempt ${dodgeCount}… you know you want to say YES to Tarun! 💘`}
      </Typography>
    </Paper>
  );
}

export default InviteScreen;
