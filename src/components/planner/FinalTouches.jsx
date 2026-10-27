import React from 'react';
import {
  Box,
  Stack,
  Avatar,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Chip,
  TextField,
} from '@mui/material';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
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
  return (
    <Box>
      <Stack direction="row" spacing={1.2} alignItems="center" className="field-heading">
        <Avatar className="section-icon">
          <AutoAwesomeRoundedIcon />
        </Avatar>
        <Box>
          <Typography fontWeight={800} fontSize={17}>
            The Finishing Touches
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Personalize the vibe, budget, and sweet notes.
          </Typography>
        </Box>
      </Stack>

      <Box className="two-col-fields">
        <FormControl fullWidth>
          <InputLabel id="dress-label">Outfit Vibe</InputLabel>
          <Select
            labelId="dress-label"
            value={dressCode}
            label="Outfit Vibe"
            onChange={(e) => setDressCode(e.target.value)}
          >
            {dressCodes.map((code) => (
              <MenuItem key={code.value} value={code.value}>
                {code.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box className="budget-box">
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography fontWeight={700} fontSize={14}>
              Budget for two
            </Typography>
            <Chip
              size="small"
              label={`₹${budget.toLocaleString("en-IN")}`}
              color="primary"
              variant="outlined"
              sx={{ fontWeight: 700 }}
            />
          </Stack>
          <Slider
            value={budget}
            onChange={(_, v) => setBudget(v)}
            min={500}
            max={7000}
            step={250}
            aria-label="Budget for two"
            sx={{ color: '#e84a72' }}
          />
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="caption" color="text.secondary">
              ₹500 (Cozy)
            </Typography>
            <Typography variant="caption" color="text.secondary">
              ₹7,000+ (Grand)
            </Typography>
          </Stack>
        </Box>
      </Box>

      <TextField
        fullWidth
        label="Your Name (Who is going with Tarun?)"
        value={dateName}
        onChange={(e) => setDateName(e.target.value)}
        sx={{ mt: 2.2 }}
        placeholder="Enter your name to put on the official invite pass"
      />

      <TextField
        fullWidth
        multiline
        minRows={2}
        label="A sweet note or message for Tarun (optional)"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        sx={{ mt: 2 }}
        placeholder="e.g. Can't wait for our date! Don't be late! ❤️"
      />
    </Box>
  );
}

export default FinalTouches;
