import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Stack,
  IconButton,
  Chip,
  Paper,
  Button,
} from '@mui/material';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import { playSuccessSound } from '../../utils/soundEffects.js';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

/**
 * Format a Date object to YYYY-MM-DD in local time
 */
function toDateString(d) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function RomanticCalendar({ date, setDate, minDate }) {
  // Parse currently selected date or default to minDate / today
  const selectedDateObj = useMemo(() => {
    if (!date) return null;
    const [y, m, d] = date.split('-').map(Number);
    return new Date(y, m - 1, d);
  }, [date]);

  const initialDate = selectedDateObj || (minDate ? new Date(minDate + 'T00:00:00') : new Date());

  const [currentYear, setCurrentYear] = useState(initialDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(initialDate.getMonth());

  const minDateObj = useMemo(() => {
    if (!minDate) return new Date();
    const [y, m, d] = minDate.split('-').map(Number);
    const dt = new Date(y, m - 1, d);
    dt.setHours(0, 0, 0, 0);
    return dt;
  }, [minDate]);

  // Calendar matrix calculation
  const calendarDays = useMemo(() => {
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

    const days = [];

    // Leading padding days from previous month
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        month: currentMonth - 1,
        year: currentYear,
        isCurrentMonth: false,
      });
    }

    // Days in current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        month: currentMonth,
        year: currentYear,
        isCurrentMonth: true,
      });
    }

    // Trailing days to fill 5 or 6 weeks (multiples of 7)
    const remaining = 7 - (days.length % 7);
    if (remaining < 7) {
      for (let i = 1; i <= remaining; i++) {
        days.push({
          day: i,
          month: currentMonth + 1,
          year: currentYear,
          isCurrentMonth: false,
        });
      }
    }

    return days;
  }, [currentYear, currentMonth]);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const handleSelectDay = (item) => {
    const dt = new Date(item.year, item.month, item.day);
    dt.setHours(0, 0, 0, 0);
    if (dt < minDateObj) return; // Cannot pick past dates

    playSuccessSound();
    setDate(toDateString(dt));
  };

  // Quick Romantic presets
  const handlePreset = (daysAhead) => {
    playSuccessSound();
    const target = new Date();
    target.setDate(target.getDate() + daysAhead);
    setDate(toDateString(target));
    setCurrentYear(target.getFullYear());
    setCurrentMonth(target.getMonth());
  };

  // Human readable selected date
  const readableSelected = useMemo(() => {
    if (!date) return null;
    const [y, m, d] = date.split('-').map(Number);
    const dt = new Date(y, m - 1, d);
    return dt.toLocaleDateString(undefined, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }, [date]);

  return (
    <Paper
      elevation={0}
      className="romantic-calendar-card"
      sx={{
        p: { xs: 2, sm: 2.5 },
        borderRadius: '24px !important',
        background: 'linear-gradient(180deg, #ffffff 0%, #fffbfb 100%)',
        border: '1.5px solid #f8dce3',
        boxShadow: '0 8px 30px rgba(232, 74, 114, 0.07)',
      }}
    >
      {/* Calendar Header with Month, Year & Heart Navigation */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <CalendarTodayRoundedIcon sx={{ color: '#e84a72', fontSize: 20 }} />
          <Typography
            fontWeight={800}
            fontSize={{ xs: 17, sm: 19 }}
            color="#402630"
            fontFamily="'Playfair Display', Georgia, serif"
          >
            {MONTH_NAMES[currentMonth]} {currentYear}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={0.5}>
          <IconButton
            size="small"
            onClick={handlePrevMonth}
            sx={{
              bgcolor: '#fff0f3',
              color: '#d93663',
              '&:hover': { bgcolor: '#ffe1e8' },
            }}
          >
            <ChevronLeftRoundedIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={handleNextMonth}
            sx={{
              bgcolor: '#fff0f3',
              color: '#d93663',
              '&:hover': { bgcolor: '#ffe1e8' },
            }}
          >
            <ChevronRightRoundedIcon />
          </IconButton>
        </Stack>
      </Stack>

      {/* Weekday Labels */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          textAlign: 'center',
          mb: 1,
        }}
      >
        {WEEKDAYS.map((wd, i) => (
          <Typography
            key={wd}
            variant="caption"
            fontWeight={800}
            sx={{
              color: i === 0 || i === 6 ? '#e84a72' : '#997381',
              fontSize: 11,
              letterSpacing: '0.05em',
            }}
          >
            {wd}
          </Typography>
        ))}
      </Box>

      {/* Days Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: { xs: 0.5, sm: 0.8 },
          textAlign: 'center',
        }}
      >
        {calendarDays.map((item, index) => {
          const itemDate = new Date(item.year, item.month, item.day);
          itemDate.setHours(0, 0, 0, 0);
          const isPast = itemDate < minDateObj;
          const isSelected = date === toDateString(itemDate);
          const isToday = toDateString(new Date()) === toDateString(itemDate);

          return (
            <Box
              key={index}
              onClick={() => !isPast && handleSelectDay(item)}
              sx={{
                aspectRatio: '1',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                cursor: isPast ? 'not-allowed' : 'pointer',
                opacity: isPast ? 0.28 : item.isCurrentMonth ? 1 : 0.45,
                transition: 'all 0.18s ease-in-out',
                bgcolor: isSelected
                  ? 'transparent'
                  : isToday
                  ? '#fff2f5'
                  : 'transparent',
                border: isSelected
                  ? 'none'
                  : isToday
                  ? '1px dashed #e84a72'
                  : '1px solid transparent',
                background: isSelected
                  ? 'linear-gradient(135deg, #ff6584 0%, #e84a72 100%) !important'
                  : undefined,
                color: isSelected
                  ? '#ffffff !important'
                  : item.isCurrentMonth
                  ? '#38252c'
                  : '#a3848f',
                boxShadow: isSelected
                  ? '0 6px 18px rgba(232, 74, 114, 0.45)'
                  : 'none',
                transform: isSelected ? 'scale(1.05)' : 'none',
                '&:hover': {
                  bgcolor: isPast
                    ? undefined
                    : isSelected
                    ? undefined
                    : '#ffe8ef',
                  transform: isPast ? 'none' : 'translateY(-2px)',
                },
              }}
            >
              {/* Heart Sign on the Selected Date */}
              {isSelected && (
                <FavoriteRoundedIcon
                  sx={{
                    fontSize: 14,
                    color: '#ffffff',
                    position: 'absolute',
                    top: 4,
                    animation: 'heartbeat 1.8s infinite',
                  }}
                />
              )}

              <Typography
                fontWeight={isSelected ? 900 : 600}
                fontSize={{ xs: 13, sm: 14 }}
                sx={{ mt: isSelected ? 1.4 : 0 }}
              >
                {item.day}
              </Typography>
            </Box>
          );
        })}
      </Box>

      {/* Romantic Quick-Picks Presets */}
      <Stack
        direction="row"
        spacing={1}
        flexWrap="wrap"
        sx={{ mt: 2.2, pt: 1.8, borderTop: '1px dashed #f5d6df' }}
      >
        <Typography variant="caption" fontWeight={700} color="secondary" sx={{ alignSelf: 'center', mr: 0.5 }}>
          Quick picks:
        </Typography>
        <Chip
          label="This Friday 🥂"
          size="small"
          onClick={() => {
            const today = new Date();
            const dayOfWeek = today.getDay();
            const daysUntilFriday = (5 - dayOfWeek + 7) % 7 || 7;
            handlePreset(daysUntilFriday);
          }}
          sx={{
            bgcolor: '#fff0f3',
            color: '#c72e57',
            fontWeight: 700,
            fontSize: 11,
            cursor: 'pointer',
            '&:hover': { bgcolor: '#ffe0e8' },
          }}
        />
        <Chip
          label="This Saturday 🌹"
          size="small"
          onClick={() => {
            const today = new Date();
            const dayOfWeek = today.getDay();
            const daysUntilSaturday = (6 - dayOfWeek + 7) % 7 || 7;
            handlePreset(daysUntilSaturday);
          }}
          sx={{
            bgcolor: '#fff0f3',
            color: '#c72e57',
            fontWeight: 700,
            fontSize: 11,
            cursor: 'pointer',
            '&:hover': { bgcolor: '#ffe0e8' },
          }}
        />
        <Chip
          label="Next Weekend 💖"
          size="small"
          onClick={() => {
            const today = new Date();
            const dayOfWeek = today.getDay();
            const daysUntilNextSat = ((6 - dayOfWeek + 7) % 7 || 7) + 7;
            handlePreset(daysUntilNextSat);
          }}
          sx={{
            bgcolor: '#fff0f3',
            color: '#c72e57',
            fontWeight: 700,
            fontSize: 11,
            cursor: 'pointer',
            '&:hover': { bgcolor: '#ffe0e8' },
          }}
        />
      </Stack>

      {/* Selected Date Heart Confirmation Banner */}
      <Box
        sx={{
          mt: 2,
          p: 1.5,
          borderRadius: '16px',
          bgcolor: date ? '#fff0f3' : '#faf5f7',
          border: date ? '1.5px solid #f8b4c4' : '1px dashed #edd5dc',
          textAlign: 'center',
          transition: 'all 0.25s ease',
        }}
      >
        {date ? (
          <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
            <FavoriteRoundedIcon sx={{ color: '#e84a72', fontSize: 18 }} />
            <Typography fontWeight={800} fontSize={13.5} color="#c72e57">
              {readableSelected} 💖
            </Typography>
          </Stack>
        ) : (
          <Typography variant="caption" color="text.secondary" fontWeight={600}>
            💌 Tap any date on the calendar above to reserve our day with Tarun
          </Typography>
        )}
      </Box>
    </Paper>
  );
}

export default RomanticCalendar;
