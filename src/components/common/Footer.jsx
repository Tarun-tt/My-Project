import React from 'react';
import { Box, Typography } from '@mui/material';

export function Footer() {
  return (
    <Box component="footer" className="footer">
      <Typography variant="caption">
        Crafted with <span>♥</span> by <strong>Tarun Tiwari</strong>
      </Typography>
      <Typography variant="caption">
        TARUN’S DATE PROPOSAL · V1.1
      </Typography>
    </Box>
  );
}

export default Footer;
