import React from 'react';
import { Paper, Box, Chip, Typography, Stack, Avatar, Button } from '@mui/material';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import RestaurantRoundedIcon from '@mui/icons-material/RestaurantRounded';
import CelebrationRoundedIcon from '@mui/icons-material/CelebrationRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
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
  onShareWhatsApp,
  onCopyPlan,
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
        Tarun has received your confirmation! Here is your official date invitation pass.
      </Typography>

      {/* Date Pass Summary Card */}
      <Paper elevation={0} className="summary-card">
        <Stack spacing={2.2}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar className="summary-icon">
              <CalendarMonthRoundedIcon />
            </Avatar>
            <Box>
              <Typography variant="caption" color="text.secondary" fontWeight={750}>
                WHEN
              </Typography>
              <Typography fontWeight={800} fontSize={15.5}>
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
              <Typography variant="caption" color="text.secondary" fontWeight={750}>
                WHERE
              </Typography>
              <Typography fontWeight={800} fontSize={15.5}>
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
              <Typography variant="caption" color="text.secondary" fontWeight={750}>
                THE VIBE & ACTIVITY
              </Typography>
              <Typography fontWeight={800} fontSize={15.5}>
                {activity}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Outfit: {dressCode}
              </Typography>
            </Box>
          </Stack>

          {message && (
            <Box className="note-card">
              <Typography variant="caption" color="text.secondary" fontWeight={750}>
                NOTE FOR TARUN
              </Typography>
              <Typography fontStyle="italic" sx={{ mt: 0.5, fontSize: 14 }}>
                “{message}”
              </Typography>
            </Box>
          )}

          <Box sx={{ pt: 1.2, borderTop: '1px dashed #f1dce2', textAlign: 'center' }}>
            <Typography variant="caption" color="text.secondary" display="block">
              Host: <strong>Tarun Tiwari</strong> (WhatsApp: <strong>+91 9999841038</strong>)
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Guest of Honor: <strong>{dateName || "Special Someone"}</strong>
            </Typography>
          </Box>
        </Stack>
      </Paper>

      {/* Date Night Perks & Affiliate Recommendations */}
      <Box
        sx={{
          mt: 2.5,
          p: 2,
          borderRadius: '18px',
          bgcolor: '#fff0f3',
          border: '1.5px dashed #f472b6',
          textAlign: 'center',
        }}
      >
        <Typography variant="caption" fontWeight={900} color="#be185d" letterSpacing={1} sx={{ textTransform: 'uppercase' }}>
          ✨ DATE NIGHT ESSENTIALS & PARTNER PERKS
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, mb: 1.5, fontSize: 13 }}>
          Make tonight extra special with these instant reservations and gifts:
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} justifyContent="center">
          <Button
            size="small"
            variant="contained"
            href="https://www.zomato.com"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              bgcolor: '#cb202d',
              color: '#fff',
              fontWeight: 800,
              borderRadius: '10px',
              fontSize: 12,
              '&:hover': { bgcolor: '#9c141e' },
            }}
          >
            🍕 Reserve on Zomato
          </Button>
          <Button
            size="small"
            variant="contained"
            href="https://in.bookmyshow.com"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              bgcolor: '#e01e37',
              color: '#fff',
              fontWeight: 800,
              borderRadius: '10px',
              fontSize: 12,
              '&:hover': { bgcolor: '#bd1f36' },
            }}
          >
            🍿 Book Movies
          </Button>
          <Button
            size="small"
            variant="contained"
            href="https://www.fnp.com"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              bgcolor: '#7209b7',
              color: '#fff',
              fontWeight: 800,
              borderRadius: '10px',
              fontSize: 12,
              '&:hover': { bgcolor: '#560bad' },
            }}
          >
            💐 Send Flowers
          </Button>
        </Stack>
      </Box>

      {/* Sharing & Navigation Actions */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1.5}
        className="confirmation-actions"
        sx={{ mt: 2 }}
      >
        {/* Main WhatsApp Share Button */}
        <Button
          variant="contained"
          size="large"
          startIcon={<WhatsAppIcon sx={{ fontSize: '22px !important' }} />}
          onClick={onShareWhatsApp}
          sx={{
            background: 'linear-gradient(100deg, #25D366, #128C7E) !important',
            color: '#ffffff !important',
            boxShadow: '0 8px 24px rgba(37, 211, 102, 0.35) !important',
            fontWeight: 800,
            fontSize: '15px',
            '&:hover': {
              background: '#075E54 !important',
              transform: 'translateY(-1px)',
            },
          }}
        >
          Share Our Date Plan to WhatsApp
        </Button>

        {/* Copy to Clipboard Button */}
        <Button
          variant="outlined"
          size="large"
          startIcon={<ContentCopyRoundedIcon />}
          onClick={onCopyPlan}
          sx={{
            borderColor: '#f2ccd6',
            color: '#7b5364',
            '&:hover': {
              borderColor: '#e84a72',
              bgcolor: '#fff0f3',
            },
          }}
        >
          Copy Plan
        </Button>

        {/* Modify Plan Button */}
        <Button
          variant="outlined"
          size="large"
          startIcon={<RestartAltRoundedIcon />}
          onClick={onEdit}
          sx={{
            borderColor: '#f2ccd6',
            color: '#7b5364',
            '&:hover': {
              borderColor: '#e84a72',
              bgcolor: '#fff0f3',
            },
          }}
        >
          Modify Plan
        </Button>
      </Stack>

      <Typography className="tiny-note" sx={{ mt: 2.5 }}>
        <FavoriteRoundedIcon sx={{ fontSize: 14 }} /> Sending directly to Tarun (+91 9999841038) 💬💖
      </Typography>
    </Paper>
  );
}

export default ConfirmedScreen;
