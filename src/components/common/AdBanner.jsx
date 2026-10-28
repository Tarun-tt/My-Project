import React, { useState } from 'react';
import { Box, Typography, Button, Stack, Chip } from '@mui/material';
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';
import { useThemeMode } from '../../context/ThemeContext.jsx';
import AdvertiseModal from './AdvertiseModal.jsx';

export function AdBanner({ slot = 'horizontal', onOpenAdvertise }) {
  const { mode } = useThemeMode();
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => {
    if (onOpenAdvertise) {
      onOpenAdvertise();
    } else {
      setModalOpen(true);
    }
  };

  return (
    <>
      <Box
        sx={{
          my: 3,
          p: { xs: 2, sm: 2.5 },
          borderRadius: '20px',
          background: mode === 'dark'
            ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.9) 100%)'
            : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
          border: '1.5px dashed',
          borderColor: mode === 'dark' ? '#334155' : '#cbd5e1',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.2s ease',
          '&:hover': {
            borderColor: '#6366f1',
          },
        }}
      >
        <Chip
          label="SPONSOR / PARTNER"
          size="small"
          sx={{
            position: 'absolute',
            top: 8,
            left: 12,
            height: 18,
            fontSize: 9,
            fontWeight: 800,
            bgcolor: mode === 'dark' ? '#1e293b' : '#e2e8f0',
            color: 'text.secondary',
          }}
        />

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
          sx={{ pt: { xs: 1.5, sm: 0 } }}
        >
          <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
            <Typography variant="subtitle2" fontWeight={800} color="#4338ca">
              Want to reach thousands of young, active visitors on PrankLab? 🚀
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Promote your product, dating app, restaurant, or brand across our 12 interactive tools.
            </Typography>
          </Box>

          <Button
            size="small"
            variant="contained"
            startIcon={<CampaignRoundedIcon />}
            onClick={handleOpen}
            sx={{
              bgcolor: '#6366f1',
              fontWeight: 800,
              fontSize: 12,
              borderRadius: '12px',
              px: 2.5,
              whiteSpace: 'nowrap',
              '&:hover': { bgcolor: '#4f46e5' },
            }}
          >
            Advertise with Us 📢
          </Button>
        </Stack>
      </Box>

      <AdvertiseModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

export default AdBanner;
