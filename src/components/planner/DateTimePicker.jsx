import React from 'react';
import {
  Box,
  Stack,
  Avatar,
  Typography,
  Paper,
  Chip,
} from '@mui/material';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import RomanticCalendar from './RomanticCalendar.jsx';
import { timeSlots } from '../../constants/dressCodes.js';

export function DateTimePicker({ date, setDate, time, setTime, minDate }) {
  return (
    <Box>
      {/* Date Section Header */}
      <Stack direction="row" spacing={1.2} alignItems="center" className="field-heading">
        <Avatar className="section-icon">
          <CalendarMonthRoundedIcon />
        </Avatar>
        <Box>
          <Typography fontWeight={800} fontSize={17}>
            When are you free? 💌
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Pick a date on the calendar. We’ll mark it with a heart for Tarun!
          </Typography>
        </Box>
      </Stack>

      {/* Romantic Interactive Calendar */}
      <RomanticCalendar
        date={date}
        setDate={setDate}
        minDate={minDate}
      />

      {/* Romantic Time Selection Section */}
      <Box sx={{ mt: 3.5 }}>
        <Stack direction="row" spacing={1.2} alignItems="center" sx={{ mb: 1.6 }}>
          <Avatar className="section-icon" sx={{ width: 36, height: 36 }}>
            <AccessTimeRoundedIcon fontSize="small" />
          </Avatar>
          <Box>
            <Typography fontWeight={800} fontSize={15}>
              Pick the Perfect Time Vibe ⏰
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Select what hour feels most magical for our date.
            </Typography>
          </Box>
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(3, 1fr)' },
            gap: 1.2,
          }}
        >
          {timeSlots.map((slot) => {
            const isSelected = time === slot.value;
            return (
              <Paper
                key={slot.value}
                elevation={0}
                onClick={() => setTime(slot.value)}
                sx={{
                  p: 1.4,
                  borderRadius: '16px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.2s ease',
                  border: isSelected ? '1.5px solid #e84a72' : '1px solid #f2e2e7',
                  bgcolor: isSelected ? '#fff5f7' : '#ffffff',
                  boxShadow: isSelected
                    ? '0 6px 18px rgba(232, 74, 114, 0.16)'
                    : 'none',
                  transform: isSelected ? 'translateY(-2px)' : 'none',
                  '&:hover': {
                    borderColor: '#e9a7b9',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={0.6}>
                  {isSelected && (
                    <FavoriteRoundedIcon sx={{ fontSize: 13, color: '#e84a72' }} />
                  )}
                  <Typography
                    fontWeight={isSelected ? 800 : 700}
                    fontSize={13}
                    color={isSelected ? '#c72e57' : '#38252c'}
                  >
                    {slot.label.split('·')[0].trim()}
                  </Typography>
                </Stack>
                <Typography
                  variant="caption"
                  color={isSelected ? '#c72e57' : 'text.secondary'}
                  sx={{ display: 'block', mt: 0.3, fontSize: 11, fontWeight: 500 }}
                >
                  {slot.label.split('·')[1] || ''}
                </Typography>
              </Paper>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}

export default DateTimePicker;
