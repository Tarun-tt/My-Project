import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Stack,
  Button,
  Chip,
  IconButton,
  Tabs,
  Tab,
  Card,
  Tooltip,
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import LocalCafeRoundedIcon from '@mui/icons-material/LocalCafeRounded';
import QrCode2RoundedIcon from '@mui/icons-material/QrCode2Rounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import { useThemeMode } from '../../context/ThemeContext.jsx';
import { playCelebrationSound, playSuccessSound } from '../../utils/soundEffects.js';
import { fireConfetti } from '../../utils/confettiHelper.js';
import tarunUpiQr from '../../assets/tarun-upi-qr.png';

const TIP_TIERS = [
  { amount: 50, label: 'Cup of Chai ☕', desc: 'Fuel a quick joke' },
  { amount: 150, label: 'Coffee & Cookie 🍪', desc: 'Sponsors 1 new funny question' },
  { amount: 500, label: 'Server Booster 🚀', desc: 'Keeps the site running super fast' },
  { amount: 1000, label: 'Comedy VIP 👑', desc: 'Legendary PrankLab patron status' },
];

export function TipModal({ open, onClose }) {
  const { mode } = useThemeMode();
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedAmount, setSelectedAmount] = useState(150);
  const [copiedUpi, setCopiedUpi] = useState(false);

  // Tarun Tiwari's Official Verified UPI Details
  const upiId = "tarun-tiwari@ptyes";
  const payeeName = "Tarun Tiwari";

  const upiPayUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payeeName)}&am=${selectedAmount}&cu=INR&tn=PrankLab%20Chai%20Tip`;

  const handleCopyUpi = () => {
    playSuccessSound();
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleSelectTier = (amount) => {
    playSuccessSound();
    setSelectedAmount(amount);
  };

  const handleInternationalDonation = () => {
    playCelebrationSound();
    fireConfetti();
    window.open(`https://buymeacoffee.com/taruntiwari`, '_blank');
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '26px',
          p: { xs: 1, sm: 1.5 },
          bgcolor: mode === 'dark' ? '#0f172a' : '#ffffff',
          border: '2px solid',
          borderColor: mode === 'dark' ? '#f59e0b' : '#fde68a',
          boxShadow: '0 24px 60px rgba(245, 158, 11, 0.25)',
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
              bgcolor: '#fef3c7',
              color: '#d97706',
              display: 'grid',
              placeItems: 'center',
              fontSize: 20,
            }}
          >
            ☕
          </Box>
          <Box>
            <Typography variant="h6" fontWeight={900} lineHeight={1.2}>
              Support Tarun Tiwari
            </Typography>
            <Typography variant="caption" color="text.secondary" fontWeight={700}>
              Official UPI & Barcode Scanner ⚡
            </Typography>
          </Box>
        </Stack>
        <IconButton onClick={onClose} size="small">
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 1 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, textAlign: 'center' }}>
          If PrankLab made you laugh or helped you plan a fun date, buy Tarun a chai! Your support directly funds server costs and new chaotic features.
        </Typography>

        {/* Preset Amount Chips */}
        <Typography variant="caption" fontWeight={800} color="#b45309" display="block" sx={{ mb: 1 }}>
          Select support amount:
        </Typography>
        <Stack spacing={1} sx={{ mb: 2.5 }}>
          {TIP_TIERS.map((tier) => {
            const isSelected = selectedAmount === tier.amount;
            return (
              <Card
                key={tier.amount}
                onClick={() => handleSelectTier(tier.amount)}
                sx={{
                  p: 1.2,
                  px: 2,
                  borderRadius: '14px',
                  cursor: 'pointer',
                  border: '1.5px solid',
                  borderColor: isSelected ? '#f59e0b' : mode === 'dark' ? '#334155' : '#e2e8f0',
                  bgcolor: isSelected ? (mode === 'dark' ? '#78350f33' : '#fffbeb') : 'background.paper',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.15s ease',
                  '&:hover': { borderColor: '#f59e0b' },
                }}
              >
                <Box>
                  <Typography fontWeight={800} fontSize={14} color={isSelected ? '#d97706' : 'text.primary'}>
                    ₹{tier.amount} — {tier.label}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {tier.desc}
                  </Typography>
                </Box>
                {isSelected && (
                  <Chip label="Selected" size="small" sx={{ bgcolor: '#f59e0b', color: 'white', fontWeight: 800, height: 20 }} />
                )}
              </Card>
            );
          })}
        </Stack>

        {/* Payment Tabs: UPI vs International */}
        <Tabs
          value={tabIndex}
          onChange={(e, val) => setTabIndex(val)}
          variant="fullWidth"
          sx={{
            minHeight: 36,
            mb: 2,
            '& .MuiTab-root': { minHeight: 36, py: 0.8, fontWeight: 800, fontSize: 13, textTransform: 'none' },
            '& .Mui-selected': { color: '#d97706' },
            '& .MuiTabs-indicator': { bgcolor: '#d97706' },
          }}
        >
          <Tab icon={<QrCode2RoundedIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="UPI Barcode / QR" />
          <Tab icon={<OpenInNewRoundedIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="International" />
        </Tabs>

        {/* Tab 0: UPI Barcode Display */}
        {tabIndex === 0 && (
          <Box sx={{ textAlign: 'center' }}>
            <Box
              sx={{
                p: 1.5,
                borderRadius: '20px',
                bgcolor: '#1e293b',
                display: 'inline-block',
                border: '3px solid #0284c7',
                boxShadow: '0 12px 32px rgba(2, 132, 199, 0.3)',
                mb: 2,
              }}
            >
              <Box
                component="img"
                src={tarunUpiQr}
                alt="Tarun Tiwari UPI Barcode"
                sx={{
                  width: { xs: 190, sm: 210 },
                  height: { xs: 190, sm: 210 },
                  display: 'block',
                  borderRadius: '12px',
                  objectFit: 'contain',
                  bgcolor: '#ffffff',
                }}
              />
              <Typography variant="caption" color="#94a3b8" fontWeight={750} sx={{ mt: 1, display: 'block' }}>
                Scan with PhonePe, Paytm, GPay, or BHIM
              </Typography>
            </Box>

            {/* UPI ID Copy Card */}
            <Box
              sx={{
                p: 1.5,
                borderRadius: '14px',
                bgcolor: mode === 'dark' ? '#1e293b' : '#f8fafc',
                border: '1.5px solid',
                borderColor: mode === 'dark' ? '#334155' : '#e2e8f0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="caption" color="text.secondary" fontWeight={700}>
                  Verified UPI ID (Tarun Tiwari):
                </Typography>
                <Typography fontWeight={900} fontSize={14.5} color="#0284c7">
                  {upiId}
                </Typography>
              </Box>
              <Button
                size="small"
                variant="outlined"
                startIcon={copiedUpi ? <CheckRoundedIcon /> : <ContentCopyRoundedIcon />}
                onClick={handleCopyUpi}
                sx={{
                  borderRadius: '10px',
                  fontWeight: 800,
                  fontSize: 12,
                  borderColor: copiedUpi ? '#10b981' : '#0284c7',
                  color: copiedUpi ? '#10b981' : '#0284c7',
                }}
              >
                {copiedUpi ? "Copied!" : "Copy"}
              </Button>
            </Box>

            {/* Mobile Direct UPI Intent Link */}
            <Button
              fullWidth
              variant="contained"
              href={upiPayUrl}
              sx={{
                borderRadius: '14px',
                fontWeight: 900,
                py: 1.3,
                background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                color: '#ffffff',
                boxShadow: '0 6px 20px rgba(2, 132, 199, 0.4)',
                '&:hover': { bgcolor: '#0284c7' },
                display: { xs: 'flex', sm: 'none' },
              }}
            >
              Tap to Open UPI App & Pay ₹{selectedAmount} ⚡
            </Button>
          </Box>
        )}

        {/* Tab 1: International / Buy Me a Coffee */}
        {tabIndex === 1 && (
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <Box sx={{ fontSize: 50, mb: 1 }}>🌍☕</Box>
            <Typography variant="subtitle1" fontWeight={900} sx={{ mb: 0.5 }}>
              International Supporters
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Support via PayPal, Apple Pay, Google Pay, or Credit/Debit Card through Buy Me a Coffee.
            </Typography>

            <Button
              fullWidth
              variant="contained"
              startIcon={<LocalCafeRoundedIcon />}
              onClick={handleInternationalDonation}
              sx={{
                borderRadius: '16px',
                fontWeight: 900,
                fontSize: 15,
                py: 1.5,
                bgcolor: '#FFDD00',
                color: '#000000',
                boxShadow: '0 8px 24px rgba(255, 221, 0, 0.4)',
                '&:hover': { bgcolor: '#FFCC00' },
              }}
            >
              Buy Me a Coffee on BMC ☕
            </Button>
          </Box>
        )}

        {/* Thank You Note */}
        <Box sx={{ mt: 2.5, textAlign: 'center' }}>
          <Typography variant="caption" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
            ❤️ "Tips are sent directly to Tarun Tiwari ({upiId}) to keep PrankLab 100% ad-free & fun."
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default TipModal;
