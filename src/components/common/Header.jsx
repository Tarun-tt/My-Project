import React from 'react';
import { Box, Stack, Avatar, Typography, Chip, Tooltip, IconButton } from '@mui/material';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';

export function Header({ onReset, screen }) {
  return (
    <Box className="topbar">
      <Stack direction="row" spacing={1.2} alignItems="center">
        <Avatar className="brand-avatar">
          <FavoriteRoundedIcon fontSize="small" />
        </Avatar>
        <Box>
          <Typography fontWeight={800} letterSpacing="-.03em" lineHeight={1.2} fontSize={17}>
            Tarun’s Date Planner
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' } }}>
            A little romance, fully customized
          </Typography>
        </Box>
      </Stack>

      <Stack direction="row" spacing={1} alignItems="center">
        <Chip
          icon={<AutoAwesomeRoundedIcon sx={{ fontSize: '14px !important' }} />}
          label="Tarun Tiwari Special ✨"
          size="small"
          className="top-chip"
        />
        {screen !== 'invite' && (
          <Tooltip title="Start over">
            <IconButton
              size="small"
              onClick={onReset}
              sx={{
                bgcolor: 'rgba(255,255,255,0.7)',
                border: '1px solid #f4dce3',
                '&:hover': { bgcolor: '#ffe8ef' },
              }}
            >
              <RestartAltRoundedIcon fontSize="small" color="primary" />
            </IconButton>
          </Tooltip>
        )}
      </Stack>
    </Box>
  );
}

export default Header;
