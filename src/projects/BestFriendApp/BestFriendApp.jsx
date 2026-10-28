import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Chip,
  Stack,
  RadioGroup,
  FormControlLabel,
  Radio,
  Slider,
  Card,
  LinearProgress,
} from '@mui/material';
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import ProjectLayout from '../../components/common/ProjectLayout.jsx';
import { playSuccessSound, playCelebrationSound } from '../../utils/soundEffects.js';
import { fireCannons } from '../../utils/confettiHelper.js';

export default function BestFriendApp() {
  const [applicantName, setApplicantName] = useState('');
  const [desiredRole, setDesiredRole] = useState('Emergency Contact & Gossip Partner');
  const [q1, setQ1] = useState('share');
  const [q2, setQ2] = useState('fbi');
  const [q3, setQ3] = useState('laugh');
  const [memeQuota, setMemeQuota] = useState(15);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('');
  const [decision, setDecision] = useState(null);

  const handleSubmit = () => {
    if (!applicantName.trim()) {
      alert("Please enter the applicant's name!");
      return;
    }

    setIsProcessing(true);
    setDecision(null);

    const stages = [
      "Submitting application to HR Department of Friendship...",
      "Running background check on previous best friends...",
      "Cross-referencing snack sharing reliability index...",
      "Calculating 2 AM reel response compatibility...",
      "Conducting final board review...",
    ];

    let currentStage = 0;
    setProcessingStatus(stages[0]);

    const interval = setInterval(() => {
      currentStage++;
      if (currentStage < stages.length) {
        setProcessingStatus(stages[currentStage]);
      } else {
        clearInterval(interval);
        setIsProcessing(false);

        // Decide acceptance based on answers
        const isAccepted = q1 !== 'steal' || Math.random() > 0.3;

        const outcome = {
          accepted: isAccepted,
          name: applicantName.trim(),
          role: desiredRole,
          date: new Date().toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' }),
          score: Math.floor(82 + Math.random() * 17),
        };

        if (isAccepted) {
          playCelebrationSound();
          fireCannons();
        } else {
          playSuccessSound();
        }
        setDecision(outcome);
      }
    }, 800);
  };

  const handleReset = () => {
    setApplicantName('');
    setDecision(null);
    setIsProcessing(false);
  };

  return (
    <ProjectLayout
      title="Apply to Be My Best Friend"
      emoji="😂"
      category="Friendship Prank"
      accentColor="#10b981"
      onReset={handleReset}
    >
      <Box sx={{ maxWidth: 720, mx: 'auto', mt: 1 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, sm: 4 },
            borderRadius: '26px',
            border: '1.5px solid #a7f3d0',
            bgcolor: 'background.paper',
            boxShadow: '0 12px 40px rgba(16, 185, 129, 0.08)',
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Box sx={{ fontSize: 56, mb: 1 }}>📋</Box>
            <Typography variant="h4" fontWeight={900} sx={{ mb: 1 }}>
              Official Best Friend Application
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Form BF-1099 • Office of Highly Unqualified Friendship Human Resources.
            </Typography>
          </Box>

          {!isProcessing && !decision && (
            <Stack spacing={3.5}>
              <TextField
                fullWidth
                label="Applicant Full Name"
                placeholder="Enter applicant's legal or street name"
                value={applicantName}
                onChange={(e) => setApplicantName(e.target.value)}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '16px' } }}
                required
              />

              {/* Role selection */}
              <Box>
                <Typography fontWeight={800} fontSize={14.5} sx={{ mb: 1.2 }}>
                  Desired Best Friend Position:
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
                  {[
                    'Emergency Contact & Gossip Partner 📞',
                    'Fry Sharing Accomplice 🍟',
                    '2 AM Meme Dispatcher 📱',
                    'Life Advice Ignorer 🤷‍♂️',
                  ].map((role) => (
                    <Chip
                      key={role}
                      label={role}
                      onClick={() => setDesiredRole(role)}
                      sx={{
                        fontWeight: 700,
                        bgcolor: desiredRole === role ? '#10b981' : '#ecfdf5',
                        color: desiredRole === role ? '#ffffff' : '#065f46',
                        border: desiredRole === role ? '2px solid #10b981' : '1px solid #a7f3d0',
                        cursor: 'pointer',
                      }}
                    />
                  ))}
                </Stack>
              </Box>

              {/* Question 1: Fry policy */}
              <Box>
                <Typography fontWeight={800} fontSize={14.5} sx={{ mb: 1 }}>
                  1. You order fries. I say "I'm not hungry". What happens when my hand reaches for your plate?
                </Typography>
                <RadioGroup value={q1} onChange={(e) => setQ1(e.target.value)}>
                  <FormControlLabel value="share" control={<Radio color="success" />} label="Gladly offer the best crispy fries like a true angel 🍟" />
                  <FormControlLabel value="slap" control={<Radio color="success" />} label="Slap my hand away playfully then push the plate towards me 😂" />
                  <FormControlLabel value="steal" control={<Radio color="success" />} label="Eat all of them at lightspeed and make eye contact 😈" />
                </RadioGroup>
              </Box>

              {/* Question 2: FBI stalker */}
              <Box>
                <Typography fontWeight={800} fontSize={14.5} sx={{ mb: 1 }}>
                  2. I need background intel on someone I met 10 minutes ago. Your response?
                </Typography>
                <RadioGroup value={q2} onChange={(e) => setQ2(e.target.value)}>
                  <FormControlLabel value="fbi" control={<Radio color="success" />} label="Find their 2nd grade report card and aunt's Facebook in 4 minutes 🕵️‍♀️" />
                  <FormControlLabel value="support" control={<Radio color="success" />} label="Provide tactical stalking support and screen recording 📱" />
                  <FormControlLabel value="moral" control={<Radio color="success" />} label="Tell me to be mature (boring answer) 🥱" />
                </RadioGroup>
              </Box>

              {/* Question 3: Public embarrassment */}
              <Box>
                <Typography fontWeight={800} fontSize={14.5} sx={{ mb: 1 }}>
                  3. I trip and fall in a crowded mall. What is your immediate protocol?
                </Typography>
                <RadioGroup value={q3} onChange={(e) => setQ3(e.target.value)}>
                  <FormControlLabel value="laugh" control={<Radio color="success" />} label="Laugh hysterically for 12 seconds, then help me up 😂" />
                  <FormControlLabel value="fall" control={<Radio color="success" />} label="Fall next to me so it looks like modern interpretive dance 👯" />
                  <FormControlLabel value="stranger" control={<Radio color="success" />} label="Pretend you've never seen me before in your life 🚶‍♂️" />
                </RadioGroup>
              </Box>

              {/* Meme quota slider */}
              <Box>
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                  <Typography fontWeight={800} fontSize={14.5}>
                    Daily Meme / Reel Delivery Commitment:
                  </Typography>
                  <Chip label={`${memeQuota} reels / day`} color="success" size="small" sx={{ fontWeight: 800 }} />
                </Stack>
                <Slider
                  value={memeQuota}
                  onChange={(_, val) => setMemeQuota(val)}
                  min={1}
                  max={50}
                  color="success"
                />
              </Box>

              <Button
                variant="contained"
                size="large"
                startIcon={<AssignmentTurnedInRoundedIcon />}
                onClick={handleSubmit}
                sx={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  fontWeight: 900,
                  fontSize: 16,
                  py: 1.4,
                  boxShadow: '0 8px 24px rgba(16, 185, 129, 0.35)',
                }}
              >
                Submit Application for Review 🚀
              </Button>
            </Stack>
          )}

          {/* Loading Animation State */}
          {isProcessing && (
            <Box sx={{ py: 6, textAlign: 'center' }}>
              <Box sx={{ fontSize: 64, mb: 2, animation: 'spin 2s linear infinite' }}>⚙️</Box>
              <Typography variant="h6" fontWeight={800} sx={{ mb: 2 }}>
                {processingStatus}
              </Typography>
              <LinearProgress color="success" sx={{ height: 8, borderRadius: 4, maxWidth: 360, mx: 'auto' }} />
            </Box>
          )}

          {/* Decision Outcome */}
          {decision && (
            <Card
              sx={{
                p: { xs: 3, sm: 4 },
                borderRadius: '24px',
                border: decision.accepted ? '2px solid #10b981' : '2px solid #ef4444',
                bgcolor: decision.accepted ? '#f0fdf4' : '#fef2f2',
                textAlign: 'center',
              }}
            >
              <Box sx={{ fontSize: 64, mb: 1 }}>{decision.accepted ? '🎓🏆🎉' : '❌🤦‍♂️'}</Box>

              <Chip
                label={decision.accepted ? 'APPLICATION OFFICIALLY APPROVED' : 'APPLICATION TEMPORARILY REJECTED'}
                sx={{
                  fontWeight: 900,
                  bgcolor: decision.accepted ? '#dcfce7' : '#fee2e2',
                  color: decision.accepted ? '#166534' : '#991b1b',
                  mb: 2,
                }}
              />

              <Typography variant="h4" fontWeight={900} sx={{ mb: 1 }}>
                {decision.accepted
                  ? `Congratulations, ${decision.name}!`
                  : `Regrets to ${decision.name}...`}
              </Typography>

              <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 500, mx: 'auto' }}>
                {decision.accepted
                  ? `After thorough examination by the Friendship Board, you have been selected for the role of ${decision.role} with a score of ${decision.score}%!`
                  : `Your application failed due to suspected French fry hoarding and insufficient emergency gossip reflexes. You may reapply after 1 business day.`}
              </Typography>

              {decision.accepted && (
                <Paper sx={{ p: 2.5, bgcolor: '#ffffff', border: '1.5px dashed #10b981', borderRadius: '18px', mb: 3, textAlign: 'left' }}>
                  <Typography fontWeight={900} color="#047857" sx={{ mb: 0.5 }}>
                    📜 CERTIFICATE OF ACCREDITED BEST FRIENDSHIP
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    • <strong>Designated Candidate:</strong> {decision.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    • <strong>Assigned Position:</strong> {decision.role}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    • <strong>Certification Date:</strong> {decision.date}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    • <strong>Contractual Clause:</strong> Must respond to hilarious reels within 4 hours.
                  </Typography>
                </Paper>
              )}

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} justifyContent="center">
                <Button
                  variant="contained"
                  startIcon={<ContentCopyRoundedIcon />}
                  onClick={() => {
                    const text = decision.accepted
                      ? `🎉 OFFICIAL NOTICE: ${decision.name} has been certified as a Best Friend! Role: ${decision.role}. Issued by PrankLab HR 🎓`
                      : `❌ NOTICE: ${decision.name}'s Best Friend Application was rejected by the Committee. Appeal pending 🍟`;
                    navigator.clipboard.writeText(text);
                    alert("Copied decision letter to clipboard! Send it to them! 📋");
                  }}
                  color="success"
                  sx={{ fontWeight: 800 }}
                >
                  Share Decision Letter 📋
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<RestartAltRoundedIcon />}
                  onClick={handleReset}
                  color="success"
                  sx={{ fontWeight: 800 }}
                >
                  New Application
                </Button>
              </Stack>
            </Card>
          )}
        </Paper>
      </Box>
    </ProjectLayout>
  );
}
