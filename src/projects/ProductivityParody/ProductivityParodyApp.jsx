import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Chip,
  Stack,
  Card,
  Grid,
  LinearProgress,
} from '@mui/material';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import ProjectLayout from '../../components/common/ProjectLayout.jsx';
import { playSuccessSound } from '../../utils/soundEffects.js';
import { fireConfetti } from '../../utils/confettiHelper.js';

const PROCRASTINATIONS = [
  { label: 'Cleaned entire desk & rearranged pencils', time: 35, emoji: '🧹' },
  { label: 'Spent 40 mins curating "Work Focus" Spotify playlist', time: 40, emoji: '🎧' },
  { label: 'Opened refrigerator 6 times hoping new food spawned', time: 20, emoji: '🧀' },
  { label: 'Fell down Wikipedia rabbit hole about ancient Rome', time: 50, emoji: '🏛️' },
  { label: 'Opened spreadsheet and aggressively frowned at it', time: 25, emoji: '📊' },
  { label: 'Researched flights to Japan I have no money to take', time: 45, emoji: '✈️' },
  { label: 'Watched 18-minute video on restoring a 1920s rusty axe', time: 30, emoji: '🪓' },
];

export default function ProductivityParodyApp() {
  const [taskInput, setTaskInput] = useState('');
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Finish important quarterly report', done: false },
    { id: 2, text: 'Respond to urgent work emails', done: false },
  ]);
  const [loggedActivities, setLoggedActivities] = useState([]);
  const [procrastinatedMinutes, setProcrastinatedMinutes] = useState(0);

  const handleAddTask = () => {
    if (!taskInput.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: taskInput.trim(), done: false }]);
    setTaskInput('');
  };

  const handleLogProcrastination = (item) => {
    playSuccessSound();
    setLoggedActivities([item, ...loggedActivities]);
    setProcrastinatedMinutes((prev) => prev + item.time);

    if (procrastinatedMinutes + item.time > 100) {
      fireConfetti();
    }
  };

  const handleReset = () => {
    setTasks([]);
    setLoggedActivities([]);
    setProcrastinatedMinutes(0);
  };

  const achievements = [
    { title: "Olympic Slacker 🦥", unlocked: procrastinatedMinutes >= 30 },
    { title: "Tab Hoarder (47 Tabs) 📑", unlocked: procrastinatedMinutes >= 60 },
    { title: "Master of Delay 🏆", unlocked: procrastinatedMinutes >= 100 },
    { title: "CEO of Tomorrow 👑", unlocked: procrastinatedMinutes >= 150 },
  ];

  const generateReport = () => {
    const text = `📊 EXECUTIVE WORK PRODUCTIVITY REPORT 📊\n\n• Real Tasks Accomplished: 0\n• Minutes Diligently Wasted: ${procrastinatedMinutes} mins\n• Leading Procrastination: ${loggedActivities[0]?.label || "Staring into the void"}\n• Status: Legendary Office Slacker\n— Tracked by PrankLab 💻`;
    navigator.clipboard.writeText(text);
    alert("Manager Status Report copied to clipboard! Send to colleagues! 😂");
  };

  return (
    <ProjectLayout
      title="The World's Worst Productivity App"
      emoji="💻"
      category="Office Comedy"
      accentColor="#f59e0b"
      onReset={handleReset}
    >
      <Box sx={{ maxWidth: 760, mx: 'auto', mt: 1 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, sm: 4 },
            borderRadius: '26px',
            border: '1.5px solid #fde68a',
            bgcolor: 'background.paper',
            boxShadow: '0 12px 40px rgba(245, 158, 11, 0.08)',
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Box sx={{ fontSize: 54, mb: 1 }}>💻</Box>
            <Typography variant="h4" fontWeight={900} sx={{ mb: 1 }}>
              ProcrastinaTrack™ Enterprise
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Track your productivity by documenting every creative way you avoid actual work.
            </Typography>
          </Box>

          {/* Stats Bar */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={4}>
              <Box sx={{ p: 2, bgcolor: '#fef3c7', borderRadius: '18px', textAlign: 'center', border: '1px solid #fde68a' }}>
                <Typography variant="caption" fontWeight={800} color="#92400e">
                  MINUTES WASTED
                </Typography>
                <Typography variant="h4" fontWeight={900} color="#b45309">
                  {procrastinatedMinutes}m
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ p: 2, bgcolor: '#fef3c7', borderRadius: '18px', textAlign: 'center', border: '1px solid #fde68a' }}>
                <Typography variant="caption" fontWeight={800} color="#92400e">
                  REAL PRODUCTIVITY
                </Typography>
                <Typography variant="h4" fontWeight={900} color="#b45309">
                  0.0%
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ p: 2, bgcolor: '#fef3c7', borderRadius: '18px', textAlign: 'center', border: '1px solid #fde68a' }}>
                <Typography variant="caption" fontWeight={800} color="#92400e">
                  ENERGY EXERTED
                </Typography>
                <Typography variant="h4" fontWeight={900} color="#b45309">
                  Severe 🥵
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* Log procrastination section */}
          <Box sx={{ mb: 4 }}>
            <Typography fontWeight={800} fontSize={15} sx={{ mb: 1.5 }}>
              ⚡ Quick-Log Procrastination Activities:
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
              {PROCRASTINATIONS.map((item, idx) => (
                <Chip
                  key={idx}
                  label={`${item.emoji} ${item.label} (+${item.time}m)`}
                  onClick={() => handleLogProcrastination(item)}
                  sx={{
                    fontWeight: 700,
                    bgcolor: '#fffbeb',
                    border: '1.5px solid #fcd34d',
                    cursor: 'pointer',
                    '&:hover': { bgcolor: '#fef3c7', transform: 'translateY(-1px)' },
                  }}
                />
              ))}
            </Stack>
          </Box>

          {/* Tasks to Avoid */}
          <Box sx={{ mb: 4 }}>
            <Typography fontWeight={800} fontSize={15} sx={{ mb: 1 }}>
              Tasks I Am Actively Avoiding ({tasks.length}):
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
              <TextField
                size="small"
                fullWidth
                placeholder="Add another urgent task to ignore..."
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
              />
              <Button variant="contained" color="warning" onClick={handleAddTask} sx={{ fontWeight: 800 }}>
                Add
              </Button>
            </Stack>

            <Stack spacing={1}>
              {tasks.map((t) => (
                <Paper key={t.id} sx={{ p: 1.5, bgcolor: '#f8fafc', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" fontWeight={600}>
                    📌 {t.text}
                  </Typography>
                  <Chip label="Postponed to Tomorrow 😴" size="small" sx={{ bgcolor: '#fee2e2', color: '#991b1b', fontWeight: 700 }} />
                </Paper>
              ))}
            </Stack>
          </Box>

          {/* Achievement Badges */}
          <Box sx={{ mb: 4, p: 2, bgcolor: '#fafafa', borderRadius: '18px', border: '1px solid #f3f4f6' }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
              <EmojiEventsRoundedIcon sx={{ color: '#f59e0b' }} />
              <Typography fontWeight={800} fontSize={14.5}>
                Slacker Achievements Unlocked:
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
              {achievements.map((ach, i) => (
                <Chip
                  key={i}
                  label={ach.title}
                  sx={{
                    fontWeight: 800,
                    opacity: ach.unlocked ? 1 : 0.35,
                    bgcolor: ach.unlocked ? '#fef3c7' : '#e5e7eb',
                    color: ach.unlocked ? '#b45309' : '#6b7280',
                    border: ach.unlocked ? '1.5px solid #f59e0b' : 'none',
                  }}
                />
              ))}
            </Stack>
          </Box>

          {/* Action CTAs */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} justifyContent="center">
            <Button
              variant="contained"
              startIcon={<ContentCopyRoundedIcon />}
              onClick={generateReport}
              sx={{
                bgcolor: '#d97706',
                color: '#ffffff',
                fontWeight: 800,
                '&:hover': { bgcolor: '#b45309' },
              }}
            >
              Generate Fake Manager Report 📊
            </Button>

            <Button
              variant="outlined"
              startIcon={<RestartAltRoundedIcon />}
              onClick={handleReset}
              sx={{ borderColor: '#d97706', color: '#d97706', fontWeight: 800 }}
            >
              Reset Session
            </Button>
          </Stack>
        </Paper>
      </Box>
    </ProjectLayout>
  );
}
