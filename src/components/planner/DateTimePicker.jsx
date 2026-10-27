import React from 'react';
import {
  Box,
  Stack,
  Avatar,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
} from '@mui/material';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import { timeSlots } from '../../constants/dressCodes.js';

export function DateTimePicker({ date, setDate, time, setTime, minDate }) {
  return (
    <Box>
      <Stack direction="row" spacing={1.2} alignItems="center" className="field-heading">
        <Avatar className="section-icon">
          <CalendarMonthRoundedIcon />
        </Avatar>
        <Box>
          <Typography fontWeight={800} fontSize={17}>
            When are you free?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Pick a date and time that fits your schedule best.
          </Typography>
        </Box>
      </Stack>

      <Box className="two-col-fields">
        <TextField
          label="Select Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          inputProps={{ min: minDate }}
          InputLabelProps={{ shrink: true }}
          fullWidth
          required
        />

        <FormControl fullWidth>
          <InputLabel id="time-label">Preferred Time</InputLabel>
          <Select
            labelId="time-label"
            value={time}
            label="Preferred Time"
            onChange={(e) => setTime(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <AccessTimeRoundedIcon fontSize="small" />
              </InputAdornment>
            }
          >
            {timeSlots.map((slot) => (
              <MenuItem key={slot.value} value={slot.value}>
                {slot.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}

export default DateTimePicker;
