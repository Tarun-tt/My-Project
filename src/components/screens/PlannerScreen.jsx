import React from 'react';
import { Box, Button, Chip, Typography, Paper, Stack, Divider } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import DateTimePicker from '../planner/DateTimePicker.jsx';
import RestaurantPicker from '../planner/RestaurantPicker.jsx';
import ActivityPicker from '../planner/ActivityPicker.jsx';
import FinalTouches from '../planner/FinalTouches.jsx';

export function PlannerScreen({
  date,
  setDate,
  time,
  setTime,
  restaurant,
  setRestaurant,
  activity,
  setActivity,
  budget,
  setBudget,
  dressCode,
  setDressCode,
  message,
  setMessage,
  dateName,
  setDateName,
  minDate,
  onConfirm,
  onBack,
}) {
  return (
    <Box className="planner-wrap">
      <Button
        startIcon={<ArrowBackRoundedIcon />}
        onClick={onBack}
        className="back-button"
      >
        Back to questions
      </Button>

      <Box className="section-heading">
        <Chip label="IT’S OFFICIALLY HAPPENING 💗" className="eyebrow-chip" />
        <Typography component="h1" className="page-title">
          Let’s plan our
          <br />
          <span>adventure with Tarun.</span>
        </Typography>
        <Typography color="text.secondary">
          Customize the details so our date feels personal, comfortable, and memorable.
        </Typography>
      </Box>

      <Paper elevation={0} className="planner-card">
        <Stack spacing={3.5}>
          <DateTimePicker
            date={date}
            setDate={setDate}
            time={time}
            setTime={setTime}
            minDate={minDate}
          />

          <Divider />

          <RestaurantPicker
            restaurant={restaurant}
            setRestaurant={setRestaurant}
          />

          <Divider />

          <ActivityPicker
            activity={activity}
            setActivity={setActivity}
          />

          <Divider />

          <FinalTouches
            dressCode={dressCode}
            setDressCode={setDressCode}
            budget={budget}
            setBudget={setBudget}
            message={message}
            setMessage={setMessage}
            dateName={dateName}
            setDateName={setDateName}
          />

          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={onConfirm}
            endIcon={<FavoriteRoundedIcon />}
            className="confirm-button"
          >
            Lock In Date with Tarun 🔒💖
          </Button>

          <Typography variant="caption" color="text.secondary" textAlign="center">
            Your customized date plan is generated instantly and ready to share!
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}

export default PlannerScreen;
