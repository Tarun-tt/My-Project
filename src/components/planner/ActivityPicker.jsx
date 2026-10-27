import React from 'react';
import { Box, Stack, Avatar, Typography, Paper } from '@mui/material';
import CelebrationRoundedIcon from '@mui/icons-material/CelebrationRounded';
import { activities } from '../../constants/activities.jsx';

export function ActivityPicker({ activity, setActivity }) {
  return (
    <Box>
      <Stack direction="row" spacing={1.2} alignItems="center" className="field-heading">
        <Avatar className="section-icon">
          <CelebrationRoundedIcon />
        </Avatar>
        <Box>
          <Typography fontWeight={800} fontSize={17}>
            What should we do together?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            The little shared moments make the best memories.
          </Typography>
        </Box>
      </Stack>

      <Box className="activity-grid">
        {activities.map((a) => (
          <Paper
            key={a.label}
            elevation={0}
            onClick={() => setActivity(a.label)}
            className={`activity-option ${activity === a.label ? "selected" : ""}`}
          >
            <Box className="activity-icon">{a.icon}</Box>
            <Typography fontWeight={750} fontSize={13}>
              {a.label}
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block">
              {a.detail}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}

export default ActivityPicker;
