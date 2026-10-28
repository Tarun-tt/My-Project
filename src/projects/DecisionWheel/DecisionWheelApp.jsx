import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Chip,
  Stack,
  TextField,
  IconButton,
  Card,
  Dialog,
  DialogContent,
} from '@mui/material';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import CasinoRoundedIcon from '@mui/icons-material/CasinoRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import ProjectLayout from '../../components/common/ProjectLayout.jsx';
import { playSuccessSound, playCelebrationSound } from '../../utils/soundEffects.js';
import { fireConfetti } from '../../utils/confettiHelper.js';

const PRESETS = {
  Food: ['Pizza 🍕', 'Biryani 🍛', 'Sushi 🍣', 'Tacos 🌮', 'Burgers 🍔', 'Cook at home 🍳', 'Chai & Snacks ☕'],
  Movies: ['Horror 👻', 'Sci-Fi Mindbender 🚀', 'Cheesy Rom-Com 💕', 'Bollywood Action 💥', 'Crime Doc 🕵️‍♂️', 'Rewatch favorite 🍿'],
  Weekend: ['Sleep 14 hours 🛌', 'Binge Netflix in bed 📺', 'Spontaneous road trip 🚗', 'Clean room 🧹', 'Try a new cafe ☕', 'Learn something new 📚'],
  Outfits: ['Comfy Hoodie & Sweatpants 🧸', 'All-Black Aesthetic 🕶️', 'Smart Casual Chic ✨', 'Overdressed on purpose 🥂', 'Pajamas forever 💤'],
  Challenges: ['Send a funny meme to your boss 📱', 'Do 20 pushups right now 💪', 'Drink a full glass of water 💧', 'Compliment a random stranger ✨', 'No phone for 1 hour 📵'],
};

const WHEEL_COLORS = [
  '#f87171', '#fb923c', '#facc15', '#4ade80', '#2dd4bf', '#38bdf8', '#818cf8', '#c084fc', '#f472b6',
];

export default function DecisionWheelApp() {
  const [selectedCategory, setSelectedCategory] = useState('Food');
  const [options, setOptions] = useState(PRESETS.Food);
  const [newOption, setNewOption] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const canvasRef = useRef(null);

  // Draw the wheel on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const radius = width / 2;

    ctx.clearRect(0, 0, width, height);

    if (options.length === 0) return;

    const sliceAngle = (2 * Math.PI) / options.length;

    options.forEach((opt, i) => {
      const angle = i * sliceAngle;
      ctx.beginPath();
      ctx.moveTo(radius, radius);
      ctx.arc(radius, radius, radius - 8, angle, angle + sliceAngle);
      ctx.closePath();

      ctx.fillStyle = WHEEL_COLORS[i % WHEEL_COLORS.length];
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Text label
      ctx.save();
      ctx.translate(radius, radius);
      ctx.rotate(angle + sliceAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#1e293b';
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText(opt, radius - 24, 5);
      ctx.restore();
    });

    // Center circle
    ctx.beginPath();
    ctx.arc(radius, radius, 22, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = '#4361ee';
    ctx.lineWidth = 4;
    ctx.stroke();
  }, [options]);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setOptions(PRESETS[cat] || []);
    setResult(null);
  };

  const handleAddOption = () => {
    if (!newOption.trim()) return;
    setOptions([...options, newOption.trim()]);
    setNewOption('');
  };

  const handleDeleteOption = (idx) => {
    if (options.length <= 2) {
      alert("You need at least 2 options to spin!");
      return;
    }
    setOptions(options.filter((_, i) => i !== idx));
  };

  const spinWheel = () => {
    if (isSpinning || options.length < 2) return;
    setIsSpinning(true);
    setResult(null);

    // Pick random index
    const randomIndex = Math.floor(Math.random() * options.length);
    const sliceAngle = 360 / options.length;

    // Additional spins (5-8 full rotations)
    const extraRotations = (5 + Math.floor(Math.random() * 4)) * 360;
    // Calculate final rotation to point to winner (pointer is at the top: 270 deg)
    const targetAngle = extraRotations + (360 - (randomIndex * sliceAngle + sliceAngle / 2) + 270);

    setRotation(targetAngle);

    setTimeout(() => {
      const chosen = options[randomIndex];
      setIsSpinning(false);
      setResult(chosen);
      playCelebrationSound();
      fireConfetti();
      setHistory((prev) => [chosen, ...prev.slice(0, 5)]);
    }, 4000);
  };

  return (
    <ProjectLayout
      title="Decide My Life for Me"
      emoji="🎡"
      category="Random Chaos"
      accentColor="#4361ee"
      onReset={() => {
        setOptions(PRESETS.Food);
        setSelectedCategory('Food');
        setResult(null);
      }}
    >
      <Box sx={{ maxWidth: 760, mx: 'auto', mt: 1 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, sm: 4 },
            borderRadius: '26px',
            border: '1.5px solid #dbeafe',
            bgcolor: 'background.paper',
            boxShadow: '0 12px 40px rgba(67, 97, 238, 0.08)',
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Box sx={{ fontSize: 54, mb: 1 }}>🎡</Box>
            <Typography variant="h4" fontWeight={900} sx={{ mb: 1 }}>
              Decide My Life Wheel
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Paralyzed by simple everyday choices? Let destiny choose. Appeals are strictly closed.
            </Typography>
          </Box>

          {/* Preset Chips */}
          <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center" sx={{ mb: 3, gap: 1 }}>
            {Object.keys(PRESETS).map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <Chip
                  key={cat}
                  label={cat}
                  onClick={() => handleCategoryChange(cat)}
                  sx={{
                    fontWeight: 800,
                    px: 1,
                    borderRadius: '12px',
                    bgcolor: isSelected ? '#4361ee' : '#eff6ff',
                    color: isSelected ? '#ffffff' : '#1e40af',
                    border: isSelected ? '2px solid #4361ee' : '1px solid #bfdbfe',
                    cursor: 'pointer',
                    '&:hover': { bgcolor: isSelected ? '#3730a3' : '#dbeafe' },
                  }}
                />
              );
            })}
          </Stack>

          {/* Wheel & Pointer Container */}
          <Box
            sx={{
              position: 'relative',
              width: 320,
              height: 320,
              mx: 'auto',
              mb: 3,
            }}
          >
            {/* Top Pointer Indicator */}
            <Box
              sx={{
                position: 'absolute',
                top: -12,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 0,
                height: 0,
                borderLeft: '14px solid transparent',
                borderRight: '14px solid transparent',
                borderTop: '26px solid #ef4444',
                zIndex: 20,
                filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.3))',
              }}
            />

            {/* Rotating Canvas Wheel */}
            <canvas
              ref={canvasRef}
              width={320}
              height={320}
              style={{
                borderRadius: '50%',
                boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                transform: `rotate(${rotation}deg)`,
                transition: isSpinning ? 'transform 4s cubic-bezier(0.15, 0.9, 0.25, 1)' : 'none',
              }}
            />
          </Box>

          {/* Spin CTA */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Button
              variant="contained"
              size="large"
              disabled={isSpinning}
              startIcon={<CasinoRoundedIcon />}
              onClick={spinWheel}
              sx={{
                background: 'linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%)',
                color: '#ffffff',
                px: 5,
                py: 1.5,
                fontSize: 16,
                fontWeight: 900,
                boxShadow: '0 8px 24px rgba(67, 97, 238, 0.35)',
              }}
            >
              {isSpinning ? 'Deciding Your Fate... 🌀' : 'Spin the Wheel! 🚀'}
            </Button>
          </Box>

          {/* Result Banner */}
          {result && (
            <Card
              sx={{
                p: 2.5,
                mb: 3,
                borderRadius: '20px',
                textAlign: 'center',
                border: '2px solid #4361ee',
                bgcolor: '#f0fdf4',
              }}
            >
              <Chip label="THE WHEEL HAS SPOKEN" size="small" sx={{ bgcolor: '#dcfce7', color: '#15803d', fontWeight: 800, mb: 1 }} />
              <Typography variant="h4" fontWeight={900} color="#166534" sx={{ my: 1 }}>
                {result}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                No refunds, no second thoughts, and no negotiation. Go do it! ✨
              </Typography>
            </Card>
          )}

          {/* Custom Options Manager */}
          <Box sx={{ mt: 3, pt: 2.5, borderTop: '1px dashed #bfdbfe' }}>
            <Typography fontWeight={800} fontSize={14.5} sx={{ mb: 1.5 }}>
              Customize Slices ({options.length} options):
            </Typography>

            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              <TextField
                size="small"
                fullWidth
                placeholder="Add custom choice (e.g. Sushi, Movie night)..."
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddOption()}
              />
              <Button
                variant="outlined"
                startIcon={<AddCircleOutlineRoundedIcon />}
                onClick={handleAddOption}
                sx={{ minWidth: 90, fontWeight: 700 }}
              >
                Add
              </Button>
            </Stack>

            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
              {options.map((opt, i) => (
                <Chip
                  key={i}
                  label={opt}
                  onDelete={() => handleDeleteOption(i)}
                  sx={{
                    fontWeight: 700,
                    bgcolor: '#f1f5f9',
                    border: '1px solid #cbd5e1',
                  }}
                />
              ))}
            </Stack>
          </Box>
        </Paper>
      </Box>
    </ProjectLayout>
  );
}
