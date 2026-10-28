import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Stack,
  Button,
  TextField,
  Chip,
  IconButton,
  Card,
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import { useThemeMode } from '../../context/ThemeContext.jsx';
import { playSuccessSound } from '../../utils/soundEffects.js';

export function AdvertiseModal({ open, onClose }) {
  const { mode } = useThemeMode();
  const [brandName, setBrandName] = useState('');
  const [inquiryType, setInquiryType] = useState('Sponsored Card');

  const options = [
    { label: "Sponsored Mini-Project Card 🃏", desc: "Feature your brand as an interactive prank or tool" },
    { label: "Banner / Display Sponsorship 📢", desc: "High-visibility banners across 12 viral tools" },
    { label: "Date Planner / Food Partner 🍕", desc: "Integrate your restaurant / delivery app into date itineraries" },
    { label: "Custom Branded Quiz or Campaign 🚀", desc: "Customized viral game built by Tarun Tiwari for your product" },
  ];

  const handleWhatsAppContact = () => {
    playSuccessSound();
    const message = `Hi Tarun! I am reaching out from ${brandName.trim() || 'my brand'} regarding Advertising / Sponsorship opportunities on PrankLab (${inquiryType}). Let's discuss partnership opportunities!`;
    const url = `https://wa.me/919999841038?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '26px',
          p: { xs: 1, sm: 1.5 },
          bgcolor: mode === 'dark' ? '#0f172a' : '#ffffff',
          border: '2px solid',
          borderColor: mode === 'dark' ? '#6366f1' : '#c7d2fe',
          boxShadow: '0 24px 60px rgba(99, 102, 241, 0.25)',
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
        <Stack direction="row" spacing={1.2} alignItems="center">
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: '12px',
              bgcolor: '#e0e7ff',
              color: '#4338ca',
              display: 'grid',
              placeItems: 'center',
              fontSize: 20,
            }}
          >
            📢
          </Box>
          <Box>
            <Typography variant="h6" fontWeight={900} lineHeight={1.2}>
              Advertise & Partner on PrankLab
            </Typography>
            <Typography variant="caption" color="text.secondary" fontWeight={700}>
              Reach thousands of young, engaged, viral consumers
            </Typography>
          </Box>
        </Stack>
        <IconButton onClick={onClose} size="small">
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 1 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
          PrankLab attracts high-retention traffic from viral social media, dating communities, and group chat shares. Partner with us to put your brand directly into the hands of an active, playful audience.
        </Typography>

        <Box sx={{ mb: 2.5 }}>
          <TextField
            fullWidth
            label="Your Company / Brand Name"
            placeholder="e.g. Acme App, Pizza Express, Glow Cosmetics"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '16px',
              },
            }}
          />
        </Box>

        <Typography variant="caption" fontWeight={800} color="#4338ca" display="block" sx={{ mb: 1 }}>
          Select Partnership Format:
        </Typography>
        <Stack spacing={1} sx={{ mb: 3 }}>
          {options.map((opt) => {
            const isSelected = inquiryType === opt.label;
            return (
              <Card
                key={opt.label}
                onClick={() => {
                  playSuccessSound();
                  setInquiryType(opt.label);
                }}
                sx={{
                  p: 1.5,
                  borderRadius: '14px',
                  cursor: 'pointer',
                  border: '1.5px solid',
                  borderColor: isSelected ? '#6366f1' : mode === 'dark' ? '#334155' : '#e2e8f0',
                  bgcolor: isSelected ? (mode === 'dark' ? '#312e8133' : '#eef2ff') : 'background.paper',
                  transition: 'all 0.15s ease',
                  '&:hover': { borderColor: '#6366f1' },
                }}
              >
                <Typography fontWeight={800} fontSize={14} color={isSelected ? '#4338ca' : 'text.primary'}>
                  {opt.label}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {opt.desc}
                </Typography>
              </Card>
            );
          })}
        </Stack>

        <Button
          fullWidth
          variant="contained"
          size="large"
          startIcon={<WhatsAppIcon />}
          onClick={handleWhatsAppContact}
          sx={{
            borderRadius: '16px',
            fontWeight: 900,
            py: 1.5,
            bgcolor: '#25D366',
            color: '#ffffff',
            boxShadow: '0 8px 24px rgba(37, 211, 102, 0.35)',
            '&:hover': { bgcolor: '#128C7E' },
          }}
        >
          Chat with Tarun on WhatsApp (9999841038) 💬
        </Button>

        <Typography variant="caption" display="block" textAlign="center" color="text.secondary" sx={{ mt: 2 }}>
          ⚡ Fast response within 2 hours • Customized campaigns & analytics reports available.
        </Typography>
      </DialogContent>
    </Dialog>
  );
}

export default AdvertiseModal;
