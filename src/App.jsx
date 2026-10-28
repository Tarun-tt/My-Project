import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';

// Lazy-loaded components for optimal performance & code-splitting
const HomePage = lazy(() => import('./components/hub/HomePage.jsx'));
const DatePlannerApp = lazy(() => import('./projects/DatePlanner/DatePlannerApp.jsx'));
const ImpossibleNoApp = lazy(() => import('./projects/ImpossibleNo/ImpossibleNoApp.jsx'));
const RoastMyFriendApp = lazy(() => import('./projects/RoastMyFriend/RoastMyFriendApp.jsx'));
const DecisionWheelApp = lazy(() => import('./projects/DecisionWheel/DecisionWheelApp.jsx'));
const BestFriendApp = lazy(() => import('./projects/BestFriendApp/BestFriendApp.jsx'));
const RedFlagQuizApp = lazy(() => import('./projects/RedFlagQuiz/RedFlagQuizApp.jsx'));
const SorryGeneratorApp = lazy(() => import('./projects/SorryGenerator/SorryGeneratorApp.jsx'));
const CoupleCompatibilityApp = lazy(() => import('./projects/CoupleCompatibility/CoupleCompatibilityApp.jsx'));
const ProductivityParodyApp = lazy(() => import('./projects/ProductivityParody/ProductivityParodyApp.jsx'));
const ExTextDecoderApp = lazy(() => import('./projects/ExTextDecoder/ExTextDecoderApp.jsx'));
const ExcuseGeneratorApp = lazy(() => import('./projects/ExcuseGenerator/ExcuseGeneratorApp.jsx'));
const ComplimentMachineApp = lazy(() => import('./projects/ComplimentMachine/ComplimentMachineApp.jsx'));

function LoadingFallback() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        color: 'text.primary',
        gap: 2,
      }}
    >
      <Box sx={{ fontSize: 48, animation: 'pulse 1.5s infinite' }}>🤡</Box>
      <CircularProgress sx={{ color: '#f43f5e' }} size={32} />
      <Typography variant="caption" fontWeight={700} color="text.secondary">
        Loading PrankLab experience...
      </Typography>
    </Box>
  );
}

export default function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Hub Homepage */}
          <Route path="/" element={<HomePage />} />

          {/* 12 Interactive Mini-Projects */}
          <Route path="/projects/date-planner" element={<DatePlannerApp />} />
          <Route path="/projects/impossible-no" element={<ImpossibleNoApp />} />
          <Route path="/projects/roast-my-friend" element={<RoastMyFriendApp />} />
          <Route path="/projects/decision-wheel" element={<DecisionWheelApp />} />
          <Route path="/projects/best-friend-application" element={<BestFriendApp />} />
          <Route path="/projects/red-flag-quiz" element={<RedFlagQuizApp />} />
          <Route path="/projects/sorry-generator" element={<SorryGeneratorApp />} />
          <Route path="/projects/couple-compatibility" element={<CoupleCompatibilityApp />} />
          <Route path="/projects/productivity-parody" element={<ProductivityParodyApp />} />
          <Route path="/projects/ex-text-decoder" element={<ExTextDecoderApp />} />
          <Route path="/projects/excuse-generator" element={<ExcuseGeneratorApp />} />
          <Route path="/projects/compliment-machine" element={<ComplimentMachineApp />} />

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
