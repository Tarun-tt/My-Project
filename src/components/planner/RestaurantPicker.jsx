import React from 'react';
import { Box, Stack, Avatar, Typography, Paper } from '@mui/material';
import RestaurantRoundedIcon from '@mui/icons-material/RestaurantRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { restaurants } from '../../constants/restaurants.js';

export function RestaurantPicker({ restaurant, setRestaurant }) {
  return (
    <Box>
      <Stack direction="row" spacing={1.2} alignItems="center" className="field-heading">
        <Avatar className="section-icon">
          <RestaurantRoundedIcon />
        </Avatar>
        <Box>
          <Typography fontWeight={800} fontSize={17}>
            Where should Tarun take you? 🍷🍝
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Choose the culinary vibe for your special date.
          </Typography>
        </Box>
      </Stack>

      <Box className="restaurant-grid">
        {restaurants.map((r) => {
          const isSelected = restaurant === r.name;
          return (
            <Paper
              key={r.name}
              elevation={0}
              onClick={() => setRestaurant(r.name)}
              className={`restaurant-option ${isSelected ? "selected" : ""}`}
            >
              <Box className="restaurant-emoji" sx={{ background: r.color }}>
                {r.emoji}
              </Box>
              <Box flex={1} minWidth={0}>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <Typography fontWeight={800} fontSize={14}>
                    {r.name}
                  </Typography>
                  {isSelected && (
                    <FavoriteRoundedIcon sx={{ fontSize: 14, color: '#e84a72' }} />
                  )}
                </Stack>
                <Typography variant="caption" color="text.secondary" display="block">
                  {r.cuisine}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {r.desc}
                </Typography>
              </Box>
              <Typography fontWeight={800} color="primary.main">
                {r.price}
              </Typography>
            </Paper>
          );
        })}
      </Box>

      <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1.4 }}>
        💡 Feel free to pick "Surprise Tarun" if you want to let Tarun choose a secret romantic spot!
      </Typography>
    </Box>
  );
}

export default RestaurantPicker;
