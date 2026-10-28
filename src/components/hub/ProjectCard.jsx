import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  Button,
  Stack,
} from '@mui/material';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import { useNavigate } from 'react-router-dom';
import { useThemeMode } from '../../context/ThemeContext.jsx';

export function ProjectCard({ project }) {
  const navigate = useNavigate();
  const { mode } = useThemeMode();

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: '24px',
        border: '1.5px solid',
        borderColor: mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
        bgcolor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        transition: 'all 0.28s cubic-bezier(0.34, 1.56, 0.64, 1)',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: `0 18px 45px ${project.accentColor}25`,
          borderColor: project.accentColor,
        },
      }}
    >
      {/* Top Header Banner with Gradient */}
      <Box
        sx={{
          height: 110,
          background: project.gradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 3,
          position: 'relative',
        }}
      >
        <Box
          sx={{
            fontSize: 48,
            filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.15))',
            transition: 'transform 0.2s ease',
            '&:hover': { transform: 'scale(1.15) rotate(5deg)' },
          }}
        >
          {project.emoji}
        </Box>

        {project.tag && (
          <Chip
            label={project.tag}
            size="small"
            sx={{
              bgcolor: 'rgba(255,255,255,0.92)',
              color: '#1e293b',
              fontWeight: 900,
              fontSize: 11,
              boxShadow: '0 3px 8px rgba(0,0,0,0.12)',
            }}
          />
        )}
      </Box>

      {/* Card Content */}
      <CardContent sx={{ p: 2.8, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Category & Duration */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.2 }}>
          <Chip
            label={project.category}
            size="small"
            sx={{
              height: 22,
              fontSize: 11,
              fontWeight: 800,
              bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.08)' : `${project.accentColor}15`,
              color: project.accentColor,
            }}
          />

          <Stack direction="row" spacing={0.5} alignItems="center">
            <AccessTimeRoundedIcon sx={{ fontSize: 13, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary" fontWeight={700}>
              {project.duration}
            </Typography>
          </Stack>
        </Stack>

        {/* Title */}
        <Typography variant="h6" fontWeight={900} sx={{ mb: 1, fontSize: 18, lineHeight: 1.25 }}>
          {project.name}
        </Typography>

        {/* Description */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6, flexGrow: 1 }}>
          {project.description}
        </Typography>

        {/* Example quote box */}
        <Box
          sx={{
            p: 1.4,
            borderRadius: '14px',
            bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.04)' : '#f8fafc',
            border: '1px dashed',
            borderColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : '#e2e8f0',
            mb: 2.5,
          }}
        >
          <Typography variant="caption" fontStyle="italic" color="text.secondary" sx={{ display: 'block', lineHeight: 1.4 }}>
            “{project.example}”
          </Typography>
        </Box>

        {/* Chaos Level Meter */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2.5 }}>
          <Typography variant="caption" fontWeight={700} color="text.secondary">
            CHAOS RATING:
          </Typography>
          <Typography variant="caption" fontWeight={800} color={project.accentColor}>
            {project.chaosLevel}
          </Typography>
        </Stack>

        {/* Open Project CTA */}
        <Button
          fullWidth
          variant="contained"
          endIcon={<ArrowForwardRoundedIcon />}
          onClick={() => navigate(project.route)}
          sx={{
            background: project.gradient,
            color: '#ffffff',
            fontWeight: 800,
            fontSize: 14,
            py: 1.1,
            boxShadow: `0 4px 14px ${project.accentColor}35`,
            '&:hover': {
              boxShadow: `0 8px 22px ${project.accentColor}50`,
            },
          }}
        >
          Open Project
        </Button>
      </CardContent>
    </Card>
  );
}

export default ProjectCard;
