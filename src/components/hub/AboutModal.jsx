import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  Stack,
  Chip,
  IconButton,
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { useThemeMode } from '../../context/ThemeContext.jsx';

export function AboutModal({ open, onClose }) {
  const { mode } = useThemeMode();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '24px',
          p: { xs: 1, sm: 2 },
          bgcolor: mode === 'dark' ? '#1e293b' : '#ffffff',
          border: '1.5px solid',
          borderColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : '#f1f5f9',
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Box sx={{ fontSize: 26 }}>🤡</Box>
          <Typography variant="h6" fontWeight={900}>
            About PrankLab
          </Typography>
        </Stack>
        <IconButton onClick={onClose} size="small">
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2.5}>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
            <strong>PrankLab</strong> is a curated playground of harmless, lighthearted web experiments, comedic questionnaires, and romantic tools designed to bring smiles, laughter, and playful teasing to friends, partners, and coworkers.
          </Typography>

          <Box sx={{ p: 2, bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : '#f8fafc', borderRadius: '16px', border: '1px solid', borderColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : '#e2e8f0' }}>
            <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 1, color: '#f43f5e' }}>
              🛡️ The PrankLab Code of Conduct:
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              • <strong>100% Harmless:</strong> All experiences are lighthearted jokes, roasts, and romantic invitations.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              • <strong>Privacy First:</strong> Everything runs locally in your browser with zero data harvesting.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • <strong>Zero Real Malice:</strong> Made to make people laugh, not genuinely upset.
            </Typography>
          </Box>

          <Box sx={{ textAlign: 'center', pt: 1 }}>
            <Typography variant="caption" color="text.secondary" display="block">
              Designed & Crafted with ❤️ by <strong>Tarun Tiwari</strong>
            </Typography>
            <Typography variant="caption" color="text.secondary">
              PrankLab Enterprise Edition • V2.0
            </Typography>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          fullWidth
          variant="contained"
          onClick={onClose}
          sx={{
            background: 'linear-gradient(135deg, #f43f5e, #e11d48)',
            fontWeight: 800,
          }}
        >
          Got It, Let’s Play! 🚀
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AboutModal;
