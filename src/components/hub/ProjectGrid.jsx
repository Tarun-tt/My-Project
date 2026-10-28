import React, { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Stack,
  TextField,
  Chip,
  Grid,
  InputAdornment,
  Button,
} from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import SentimentDissatisfiedRoundedIcon from '@mui/icons-material/SentimentDissatisfiedRounded';
import ProjectCard from './ProjectCard.jsx';
import { PROJECTS, CATEGORIES } from '../../data/projectsData.js';
import { useThemeMode } from '../../context/ThemeContext.jsx';

export function ProjectGrid({ gridRef }) {
  const { mode } = useThemeMode();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((proj) => {
      const matchesSearch =
        searchTerm === '' ||
        proj.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        proj.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        proj.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCat =
        selectedCategory === 'All' || proj.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <Box ref={gridRef} id="projects-grid" sx={{ py: 6 }}>
      <Container maxWidth="lg">
        {/* Section Heading */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Chip
            label="EXPLORE THE CATALOG"
            size="small"
            sx={{
              fontWeight: 800,
              bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.08)' : '#f1f5f9',
              color: 'text.secondary',
              mb: 1.5,
              fontSize: 10.5,
            }}
          />
          <Typography variant="h3" fontWeight={900} sx={{ mb: 1, fontSize: { xs: 28, sm: 38 } }}>
            All Interactive Experiences 🎪
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Pick a weapon of mass amusement. Click any card to launch immediately.
          </Typography>
        </Box>

        {/* Search Bar & Filter Controls */}
        <Box sx={{ maxWidth: 640, mx: 'auto', mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Search experiments by keyword, category, or chaos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
              endAdornment: searchTerm ? (
                <InputAdornment position="end">
                  <Button
                    size="small"
                    onClick={() => setSearchTerm('')}
                    sx={{ minWidth: 'auto', p: 0.5, color: 'text.secondary' }}
                  >
                    <ClearRoundedIcon fontSize="small" />
                  </Button>
                </InputAdornment>
              ) : null,
              sx: {
                borderRadius: '999px',
                bgcolor: mode === 'dark' ? '#1e293b' : '#ffffff',
                border: '1px solid',
                borderColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : '#e2e8f0',
              },
            }}
          />
        </Box>

        {/* Category Filter Chips */}
        <Stack
          direction="row"
          spacing={1}
          flexWrap="wrap"
          justifyContent="center"
          sx={{ mb: 4, gap: 1 }}
        >
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <Chip
                key={cat}
                label={cat}
                onClick={() => setSelectedCategory(cat)}
                sx={{
                  fontWeight: 800,
                  fontSize: 12.5,
                  borderRadius: '12px',
                  cursor: 'pointer',
                  bgcolor: isSelected
                    ? '#f43f5e'
                    : mode === 'dark'
                    ? '#1e293b'
                    : '#f1f5f9',
                  color: isSelected ? '#ffffff' : 'text.primary',
                  border: isSelected
                    ? '2px solid #f43f5e'
                    : '1px solid',
                  borderColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : '#e2e8f0',
                  '&:hover': {
                    bgcolor: isSelected ? '#e11d48' : mode === 'dark' ? '#334155' : '#e2e8f0',
                  },
                }}
              />
            );
          })}
        </Stack>

        {/* Results Counter */}
        <Typography variant="body2" color="text.secondary" fontWeight={700} sx={{ mb: 3 }}>
          Showing {filteredProjects.length} of {PROJECTS.length} experiences
        </Typography>

        {/* Project Grid: 3 cols desktop, 2 cols tablet, 1 col mobile */}
        {filteredProjects.length > 0 ? (
          <Grid container spacing={3.5}>
            {filteredProjects.map((project) => (
              <Grid item xs={12} sm={6} md={4} key={project.id}>
                <ProjectCard project={project} />
              </Grid>
            ))}
          </Grid>
        ) : (
          /* Empty Search State */
          <Paper
            elevation={0}
            sx={{
              p: 6,
              textAlign: 'center',
              borderRadius: '24px',
              border: '1.5px dashed #cbd5e1',
              bgcolor: 'background.paper',
            }}
          >
            <SentimentDissatisfiedRoundedIcon sx={{ fontSize: 56, color: 'text.secondary', mb: 1 }} />
            <Typography variant="h6" fontWeight={800} sx={{ mb: 1 }}>
              No Chaos Found Matching "{searchTerm}"
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Try searching for something else or clear your filters to view all projects.
            </Typography>
            <Button
              variant="outlined"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              sx={{ fontWeight: 800 }}
            >
              Reset Filters
            </Button>
          </Paper>
        )}
      </Container>
    </Box>
  );
}

export default ProjectGrid;
