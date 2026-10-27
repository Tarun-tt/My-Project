import React from 'react';
import {
  Box,
  Stack,
  Avatar,
  Typography,
  Slider,
  Chip,
  TextField,
  Paper,
  InputAdornment,
} from '@mui/material';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { dressCodes } from '../../constants/dressCodes.js';

export function FinalTouches({
  dressCode,
  setDressCode,
  budget,
  setBudget,
  message,
  setMessage,
  dateName,
  setDateName,
}) {
  const budgetVibe = React.useMemo(() => {
    if (budget <= 1250) return "☕ Cozy Cafe & Chai Vibe";
    if (budget <= 2500) return "🍝 Romantic Bistro & Long Chats";
    if (budget <= 4500) return "🕯️ Candlelit Fine Dining Romance";
    return "👑 Royal VIP Romance Experience";
  }, [budget]);

  return (
    <Box>
      <Stack direction="row" spacing={1.2} alignItems="center" className="field-heading">
        <Avatar className="section-icon">
          <AutoAwesomeRoundedIcon />
        </Avatar>
        <Box>
          <Typography fontWeight={800} fontSize={17}>
            The Finishing Touches ✨
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Personalize your outfit vibe, budget preferences, and sweet messages for Tarun.
          </Typography>
        </Box>
      </Stack>

      {/* Romantic Outfit Vibe Grid */}
      <Box sx={{ mb: 3 }}>
        <Typography fontWeight={750} fontSize={14.5} sx={{ mb: 1.2 }}>
          What's your Outfit Vibe? 👗👔
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(3, 1fr)' },
            gap: 1.2,
          }}
        >
          {dressCodes.map((code) => {
            const isSelected = dressCode === code.value;
            return (
              <Paper
                key={code.value}
                elevation={0}
                onClick={() => setDressCode(code.value)}
                sx={{
                  p: 1.4,
                  borderRadius: '16px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                  border: isSelected ? '1.5px solid #e84a72' : '1px solid #f1e2e7',
                  bgcolor: isSelected ? '#fff5f7' : '#ffffff',
                  boxShadow: isSelected
                    ? '0 6px 16px rgba(232, 74, 114, 0.14)'
                    : 'none',
                  transform: isSelected ? 'translateY(-2px)' : 'none',
                  '&:hover': {
                    borderColor: '#e9a7b9',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography fontWeight={800} fontSize={13} color={isSelected ? '#c72e57' : '#38252c'}>
                    {code.label}
                  </Typography>
                  {isSelected && (
                    <FavoriteRoundedIcon sx={{ fontSize: 14, color: '#e84a72' }} />
                  )}
                </Stack>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.4, fontSize: 11 }}>
                  {code.desc}
                </Typography>
              </Paper>
            );
          })}
        </Box>
      </Box>

      {/* Romantic Budget Slider */}
      <Paper
        elevation={0}
        sx={{
          p: 2.2,
          mb: 3,
          borderRadius: '20px',
          bgcolor: '#fffbfb',
          border: '1px solid #f4dfe5',
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography fontWeight={800} fontSize={14.5}>
              Budget for Two 💸
            </Typography>
            <Chip
              size="small"
              label={budgetVibe}
              sx={{
                bgcolor: '#fff0f3',
                color: '#c72e57',
                fontWeight: 700,
                fontSize: 10.5,
              }}
            />
          </Stack>
          <Chip
            size="small"
            label={`₹${budget.toLocaleString("en-IN")}`}
            color="primary"
            sx={{ fontWeight: 800, fontSize: 12.5 }}
          />
        </Stack>

        <Slider
          value={budget}
          onChange={(_, v) => setBudget(v)}
          min={500}
          max={7000}
          step={250}
          aria-label="Budget for two"
          sx={{
            color: '#e84a72',
            height: 8,
            '& .MuiSlider-thumb': {
              width: 22,
              height: 22,
              boxShadow: '0 4px 12px rgba(232, 74, 114, 0.4)',
              '&:hover, &.Mui-focusVisible': {
                boxShadow: '0 0 0 8px rgba(232, 74, 114, 0.16)',
              },
            },
            '& .MuiSlider-rail': {
              bgcolor: '#fce2e8',
            },
          }}
        />

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="caption" color="text.secondary">
            ₹500 (Sweet & Simple)
          </Typography>
          <Typography variant="caption" color="text.secondary">
            ₹7,000+ (Grand Luxury)
          </Typography>
        </Stack>
      </Paper>

      {/* Personal Name Field */}
      <TextField
        fullWidth
        label="Your Name (Who is going with Tarun?)"
        value={dateName}
        onChange={(e) => setDateName(e.target.value)}
        sx={{
          mb: 2,
          '& .MuiOutlinedInput-root': {
            borderRadius: '16px',
            bgcolor: '#ffffff',
          },
        }}
        placeholder="Enter your name to put on the official date ticket"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonOutlineRoundedIcon sx={{ color: '#e84a72', fontSize: 20 }} />
            </InputAdornment>
          ),
          endAdornment: dateName ? (
            <InputAdornment position="end">
              <CheckCircleRoundedIcon sx={{ color: '#2e7d32', fontSize: 18 }} />
            </InputAdornment>
          ) : null,
        }}
      />

      {/* Personal Sweet Note Field */}
      <TextField
        fullWidth
        multiline
        minRows={2}
        label="A sweet note or message for Tarun (optional)"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '16px',
            bgcolor: '#ffffff',
          },
        }}
        placeholder="e.g. Can't wait for our date! Don't forget my favorite dessert! ❤️"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
              <ChatBubbleOutlineRoundedIcon sx={{ color: '#e84a72', fontSize: 20 }} />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}

export default FinalTouches;
