import React from 'react';
import ParkRoundedIcon from '@mui/icons-material/ParkRounded';
import LocalFloristRoundedIcon from '@mui/icons-material/LocalFloristRounded';
import MovieRoundedIcon from '@mui/icons-material/MovieRounded';
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded';
import SportsEsportsRoundedIcon from '@mui/icons-material/SportsEsportsRounded';
import NightsStayRoundedIcon from '@mui/icons-material/NightsStayRounded';

export const activities = [
  {
    label: "A walk together",
    icon: <ParkRoundedIcon />,
    detail: "Golden-hour stroll & chats",
  },
  {
    label: "Dessert date",
    icon: <LocalFloristRoundedIcon />,
    detail: "Waffles, ice cream & sweets",
  },
  {
    label: "Movie night",
    icon: <MovieRoundedIcon />,
    detail: "One film, two seats & popcorn",
  },
  {
    label: "Live music",
    icon: <MusicNoteRoundedIcon />,
    detail: "Acoustic vibes & gentle tunes",
  },
  {
    label: "Arcade games",
    icon: <SportsEsportsRoundedIcon />,
    detail: "Playful challenges & fun",
  },
  {
    label: "Stargazing drive",
    icon: <NightsStayRoundedIcon />,
    detail: "Night sky & deep talks",
  },
];

export default activities;
