import React from 'react';
import { Paper, Box, Chip, Typography, Stack, Avatar, Button } from '@mui/material';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import RestaurantRoundedIcon from '@mui/icons-material/RestaurantRounded';
import CelebrationRoundedIcon from '@mui/icons-material/CelebrationRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { restaurants } from '../../constants/restaurants.js';

export function ConfirmedScreen({
  date,
  time,
  restaurant,
  activity,
  budget,
  dressCode,
  message,
  dateName,
  onShare,
  onEdit,
}) {
  const chosenRestaurant =
    restaurants.find((r) => r.name === restaurant) || restaurants[0];

  const formattedDate = date
    ? new Date(`${date}T12:00:00`).toLocaleDateString(undefined, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Date to be decided';

  return (
    <Paper elevation={0} className="confirmed-card">
      <div className="confirmation-art">
        <span>💐</span>
        <span>💗</span>
        <span>🥂</span>
        <div className="big-heart">
          <FavoriteRoundedIcon sx={{ fontSize: 64 }} />
        </div>
      </div>

      <Chip
        icon={<CheckCircleRoundedIcon sx={{ fontSize: '15px !important' }} />}
        label="DATE RESERVED WITH TARUN TIWARI"
        className="eyebrow-chip"
      />

      <Typography component="h1" className="invite-title" sx={{ my: 1.5 }}>
        It’s a date{dateName ? `, ${dateName}` : ""}!
      </Typography>

      <Typography color="text.secondary" className="invite-subtitle">
        Tarun has received your confirmation! Here is your official date invitation summary.
      </Typography>

      <Paper elevation={0} className="summary-card">
        <Stack spacing={2.2}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar className="summary-icon">
              <CalendarMonthRoundedIcon />
            </Avatar>
            <Box>
              <Typography variant="caption" color="text.secondary" fontWeight={700}>
                WHEN
              </Typography>
              <Typography fontWeight={800} fontSize={15}>
                {formattedDate}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                At {time}
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar className="summary-icon">
              <RestaurantRoundedIcon />
            </Avatar>
            <Box>
              <Typography variant="caption" color="text.secondary" fontWeight={700}>
                WHERE
              </Typography>
              <Typography fontWeight={800} fontSize={15}>
                {chosenRestaurant.name} {chosenRestaurant.emoji}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {chosenRestaurant.cuisine} · Budget ₹{budget.toLocaleString("en-IN")} for two
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar className="summary-icon">
              <CelebrationRoundedIcon />
            </Avatar>
            <Box>
              <Typography variant="caption" color="text.secondary" fontWeight={700}>
                THE VIBE & ACTIVITY
              </Typography>
              <Typography fontWeight={800} fontSize={15}>
                {activity}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Dress code: {dressCode}
              </Typography>
            </Box>
          </Stack>

          {message && (
            <Box className="note-card">
              <Typography variant="caption" color="text.secondary" fontWeight={700}>
                NOTE FOR TARUN
              </Typography>
              <Typography fontStyle="italic" sx={{ mt: 0.5, fontSize: 14 }}>
                “{message}”
              </Typography>
            </Box>
          )}

          <Box sx={{ pt: 1, borderTop: '1px dashed #f1dce2', textAlign: 'center' }}>
            <Typography variant="caption" color="text.secondary">
              Host: <strong>Tarun Tiwari</strong> • Guest: <strong>{dateName || "Special Someone"}</strong>
            </Typography>
          </Box>
        </Stack>
      </Paper>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1.5}
        className="confirmation-actions"
      >
        <Button
          variant="contained"
          size="large"
          startIcon={<ContentCopyRoundedIcon />}
          onClick={onShare}
          sx={{ background: 'linear-gradient(100deg, #eb5479, #d93663)' }}
        >
          Share Our Date Plan
        </Button>

        <Button
          variant="outlined"
          size="large"
          startIcon={<RestartAltRoundedIcon />}
          onClick={onEdit}
        >
          Modify Plan
        </Button>
      </Stack>

      <Typography className="tiny-note">
        <FavoriteRoundedIcon sx={{ fontSize: 14 }} /> Tarun can’t wait to see you!
      </Typography>
    </Paper>
  );
}

export default ConfirmedScreen;
