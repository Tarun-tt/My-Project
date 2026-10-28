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
  LinearProgress,
} from '@mui/material';
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import ProjectLayout from '../../components/common/ProjectLayout.jsx';
import { playSuccessSound, playCelebrationSound } from '../../utils/soundEffects.js';
import { fireCannons, fireConfetti } from '../../utils/confettiHelper.js';

const HR_STEPS = [
  {
    step: 1,
    title: "Applicant Identity & Designation",
    subtitle: "Who is applying, and which prestigious corporate friendship role are they seeking?",
    emoji: "📋",
  },
  {
    step: 2,
    title: "Mandatory French Fry Clause",
    subtitle: "We order food. You explicitly said 'I'm not hungry'. The fries arrive. What is your legal action?",
    emoji: "🍟",
    options: [
      { label: "Look away and not touch a single fry", trait: "liar", desc: "Obvious perjury. Nobody has this level of self-control." },
      { label: "Politely tax 2-3 fries with prior verbal consent", trait: "civilized", desc: "Respectful snack diplomacy. Highly rated." },
      { label: "Eat 70% of the fries & say 'Why didn't you get large?'", trait: "bandit", desc: "High audacity, classic best friend behavior." },
      { label: "Secretly pre-ordered my own large fries anyway", trait: "visionary", desc: "Executive visionary. Instant leadership material." },
    ],
  },
  {
    step: 3,
    title: "3:00 AM Crisis & Breakdown Protocol",
    subtitle: "I send a 23-line panicked text at 3:14 AM about my life choices. How do you respond?",
    emoji: "🚨",
    options: [
      { label: "Call instantly: 'Pack your bags, we are moving to Iceland'", trait: "ride_or_die", desc: "Full tactical emergency support." },
      { label: "Reply: 'Go to sleep, we will overthink this together at 10 AM'", trait: "rational", desc: "Mature emotional triage." },
      { label: "Send 16 TikTok reels to distract from reality", trait: "distractor", desc: "Weaponized dopamine deployment." },
      { label: "Leave on read until 1:30 PM next afternoon", trait: "hibernator", desc: "HR Warning: Candidate is prone to coma." },
    ],
  },
  {
    step: 4,
    title: "Speed-to-Screenshot & Gossip Dispatch",
    subtitle: "You discover shocking news about mutual acquaintances. What is your transmission speed?",
    emoji: "⚡",
    options: [
      { label: "Call screaming: 'ARE YOU SITTING DOWN RIGHT NOW?!'", trait: "hyper_courier", desc: "Priority 1 Siren Alert." },
      { label: "Take 9 screenshots, circle clues in red, send in 30 secs", trait: "fbi_agent", desc: "Forensic evidence compiler." },
      { label: "Send an 11-minute unedited rambling voice note", trait: "podcaster", desc: "Full cinematic audio documentary." },
      { label: "Keep it to myself like a boring monk", trait: "disqualified", desc: "Instant Disqualification. Gossip hoarding is illegal." },
    ],
  },
  {
    step: 5,
    title: "Wardrobe & Hoodie Custody Policy",
    subtitle: "You borrow my favorite oversized hoodie. What is the mathematical probability of its return?",
    emoji: "🧥",
    options: [
      { label: "100% returned washed & smelling like fresh flowers", trait: "saint", desc: "Fictional scenario. Statistically impossible." },
      { label: "35% chance. It has joined my emotional support rotation", trait: "honest_thief", desc: "Acceptable collateral damage." },
      { label: "0%. What hoodie? I have owned this since 2017", trait: "gaslighter", desc: "Bold gaslighting. We respect the hustle." },
      { label: "I will exchange it for an even softer designer sweater", trait: "investor", desc: "High ROI friendship trade." },
    ],
  },
  {
    step: 6,
    title: "Aux Cord & Road Trip Sonic Standard",
    subtitle: "You are entrusted with the car Aux cord on a 2-hour drive. What acoustic warfare do you inflict?",
    emoji: "🎵",
    options: [
      { label: "2000s nostalgic pop bangers that we scream at top volume", trait: "anthem_queen", desc: "Vocal cords will be permanently damaged." },
      { label: "Depressing indie breakup tracks that make us cry on the highway", trait: "sad_boi", desc: "Scenic melancholic contemplation." },
      { label: "Obscure underground bass with aggressive drops", trait: "raver", desc: "Suspension and eardrums tested to maximum." },
      { label: "True crime unsolved murder podcasts", trait: "detective", desc: "Paranoia keeps the driver awake." },
    ],
  },
  {
    step: 7,
    title: "Harmless Public Chaos & Alibi Reliability",
    subtitle: "We accidentally cause mild, harmless mischief in public. The authorities ask questions. Your statement?",
    emoji: "⚖️",
    options: [
      { label: "'Officer, we were both at a charity gala in Geneva'", trait: "diplomat", desc: "Flawless international alibi." },
      { label: "Point at me and yell: 'I HAVE NEVER SEEN THIS PERSON BEFORE!'", trait: "traitor", desc: "Savage betrayal. Deducting 20 loyalty points." },
      { label: "Pretend we only speak Ancient Latin and wander off", trait: "linguist", desc: "Confusion is the ultimate defense." },
      { label: "'We did it together, and honestly, it was hilarious'", trait: "legend", desc: "Unshakable solidarity under oath." },
    ],
  },
  {
    step: 8,
    title: "Ghosting & Group Chat Inactivity Sanction",
    subtitle: "What is your mandatory penalty if you leave the best friend on read for >48 hours?",
    emoji: "📜",
    options: [
      { label: "Must buy Boba / Coffee / Shawarma for the next 7 days", trait: "boba_fine", desc: "Fair economic compensation." },
      { label: "Must submit a formal 500-word handwritten apology letter", trait: "scribe", desc: "Humiliation via vintage ink." },
      { label: "Allow bestie to post 1 cursed photo on Instagram story", trait: "roast_hostage", desc: "Nuclear mutually assured destruction." },
      { label: "Mandatory duty as designated driver for 2 weekends", trait: "chauffeur", desc: "Practical community service." },
    ],
  },
];

const ROLES = [
  "Chief Gossip Officer (CGO) 🗞️",
  "3:00 AM Crisis & Meltdown Counselor 🚨",
  "Emergency French Fry Tax Collector 🍟",
  "Unlicensed Relationship Detective 🕵️‍♀️",
  "Passenger Seat DJ & Snack Dispenser 🎶",
];

export default function BestFriendApp() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [applicantName, setApplicantName] = useState('');
  const [selectedRole, setSelectedRole] = useState(ROLES[0]);
  const [answers, setAnswers] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('');
  const [contractReport, setContractReport] = useState(null);

  const currentStep = HR_STEPS[currentStepIndex];
  const totalSteps = HR_STEPS.length;
  const progressPercent = Math.round(((currentStepIndex + 1) / totalSteps) * 100);

  const handleSelectOption = (trait) => {
    playSuccessSound();
    setAnswers({
      ...answers,
      [currentStep.step]: trait,
    });
  };

  const handleNext = () => {
    if (currentStepIndex === 0) {
      if (!applicantName.trim()) {
        alert("Please enter the applicant's name before proceeding with HR screening!");
        return;
      }
    } else {
      if (!answers[currentStep.step]) {
        alert("Please select an answer to fulfill this mandatory HR clause!");
        return;
      }
    }

    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      finalizeApplication();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const finalizeApplication = () => {
    setIsProcessing(true);
    setContractReport(null);

    const stages = [
      "Submitting application to Department of Friendship & Human Resources...",
      "Cross-referencing snack sharing reliability index with local restaurants...",
      "Conducting background check on previous 3:00 AM panic text history...",
      "Calculating gossip transmission speed and screenshot efficiency...",
      "Board of Unqualified Friendship Executives convening for final verdict...",
    ];

    let stageIdx = 0;
    setProcessingStatus(stages[0]);

    const timer = setInterval(() => {
      stageIdx++;
      if (stageIdx < stages.length) {
        setProcessingStatus(stages[stageIdx]);
      } else {
        clearInterval(timer);
        setIsProcessing(false);

        const score = Math.floor(88 + Math.random() * 11);
        const dateStr = new Date().toLocaleDateString(undefined, {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        });

        const report = {
          name: applicantName.trim(),
          role: selectedRole,
          score,
          date: dateStr,
          clauses: [
            "French Fry Sharing: All unattended fries are subject to federal best-friend taxation.",
            "Gossip Latency: Shocking discoveries must be transmitted within 60 seconds with proof.",
            "Crisis Protocol: Late-night existential breakdowns must be attended with snacks.",
            "Alibi Clause: Both parties agree to maintain consistent stories before authority figures.",
          ],
        };

        playCelebrationSound();
        fireCannons();
        setContractReport(report);
      }
    }, 850);
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setApplicantName('');
    setAnswers({});
    setContractReport(null);
    setIsProcessing(false);
  };

  const copyContract = () => {
    if (!contractReport) return;
    const text = `📜 OFFICIAL BEST FRIEND APPOINTMENT CONTRACT 📜\n\n` +
      `Candidate: ${contractReport.name}\n` +
      `Designation: ${contractReport.role}\n` +
      `HR Aptitude Rating: ${contractReport.score}% (OFFICIALLY HIRED)\n` +
      `Date Certified: ${contractReport.date}\n\n` +
      `Key Employment Clauses:\n` +
      `• ${contractReport.clauses[0]}\n` +
      `• ${contractReport.clauses[1]}\n` +
      `• ${contractReport.clauses[2]}\n` +
      `• ${contractReport.clauses[3]}\n\n` +
      `Certified by PrankLab HR Department & Tarun Tiwari 😂💖`;
    navigator.clipboard.writeText(text);
    alert("Official Friendship Contract copied to clipboard! Send to your best friend! 😂");
  };

  return (
    <ProjectLayout
      title="Apply to Be My Best Friend"
      emoji="😂"
      category="Friendship Prank"
      accentColor="#10b981"
      onReset={handleReset}
    >
      <Box sx={{ maxWidth: 760, mx: 'auto', mt: 1 }}>
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
            <Box sx={{ fontSize: 52, mb: 1 }}>🏢🤝</Box>
            <Typography variant="h4" fontWeight={900} sx={{ mb: 0.5, letterSpacing: -0.5 }}>
              Friendship HR Recruitment Portal
            </Typography>
            <Typography variant="body2" color="text.secondary">
              9-Step Corporate Evaluation by the Unqualified HR Department of Friendship.
            </Typography>
          </Box>

          {/* Stepper Progress */}
          {!contractReport && !isProcessing && (
            <Box sx={{ mb: 4 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                <Chip
                  label={`Step ${currentStepIndex + 1} of ${totalSteps}`}
                  size="small"
                  sx={{ bgcolor: '#d1fae5', color: '#065f46', fontWeight: 800 }}
                />
                <Typography variant="caption" color="text.secondary" fontWeight={700}>
                  {progressPercent}% Evaluated
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={progressPercent}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  bgcolor: '#e5e7eb',
                  '& .MuiLinearProgress-bar': {
                    background: 'linear-gradient(90deg, #10b981, #059669)',
                    borderRadius: 5,
                  },
                }}
              />
            </Box>
          )}

          {/* Processing Loading Screen */}
          {isProcessing && (
            <Box sx={{ py: 6, textAlign: 'center' }}>
              <Box sx={{ fontSize: 60, mb: 2, animation: 'spin 2s infinite linear' }}>⚖️</Box>
              <Typography variant="h5" fontWeight={900} color="#059669" sx={{ mb: 1.5 }}>
                HR Board Review in Progress...
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontStyle: 'italic', mb: 4, minHeight: 48 }}>
                "{processingStatus}"
              </Typography>
              <LinearProgress
                sx={{
                  maxWidth: 420,
                  mx: 'auto',
                  height: 8,
                  borderRadius: 4,
                  bgcolor: '#d1fae5',
                  '& .MuiLinearProgress-bar': { bgcolor: '#10b981' },
                }}
              />
            </Box>
          )}

          {/* Questionnaire Steps */}
          {!contractReport && !isProcessing && (
            <Box>
              {/* Step Header */}
              <Box sx={{ mb: 3 }}>
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
                  <Typography fontSize={28}>{currentStep.emoji}</Typography>
                  <Typography variant="h6" fontWeight={800}>
                    {currentStep.title}
                  </Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  {currentStep.subtitle}
                </Typography>
              </Box>

              {/* Step 1: Input details */}
              {currentStepIndex === 0 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 4 }}>
                  <TextField
                    fullWidth
                    label="Applicant Full Legal or Street Name"
                    placeholder="e.g., Rohan, Simran, Bunty, Priya"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '16px',
                        '&:hover fieldset': { borderColor: '#10b981' },
                        '&.Mui-focused fieldset': { borderColor: '#10b981' },
                      },
                    }}
                  />

                  <Box>
                    <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 1.5, color: '#065f46' }}>
                      Select Target Friendship Role:
                    </Typography>
                    <Stack spacing={1}>
                      {ROLES.map((role) => (
                        <Card
                          key={role}
                          onClick={() => {
                            playSuccessSound();
                            setSelectedRole(role);
                          }}
                          sx={{
                            p: 1.8,
                            borderRadius: '14px',
                            cursor: 'pointer',
                            border: '1.5px solid',
                            borderColor: selectedRole === role ? '#10b981' : 'transparent',
                            bgcolor: selectedRole === role ? '#ecfdf5' : 'background.paper',
                            boxShadow: selectedRole === role ? '0 4px 14px rgba(16, 185, 129, 0.15)' : 'none',
                            transition: 'all 0.2s ease',
                            '&:hover': { bgcolor: '#f0fdf4', borderColor: '#a7f3d0' },
                          }}
                        >
                          <Typography fontWeight={700} fontSize={14.5}>
                            {role}
                          </Typography>
                        </Card>
                      ))}
                    </Stack>
                  </Box>
                </Box>
              )}

              {/* Steps 2 to 8: Multiple Choice Cards */}
              {currentStepIndex > 0 && currentStep.options && (
                <Stack spacing={1.5} sx={{ mb: 4 }}>
                  {currentStep.options.map((option) => {
                    const isSelected = answers[currentStep.step] === option.trait;
                    return (
                      <Card
                        key={option.trait}
                        onClick={() => handleSelectOption(option.trait)}
                        sx={{
                          p: 2,
                          borderRadius: '16px',
                          cursor: 'pointer',
                          border: '2px solid',
                          borderColor: isSelected ? '#10b981' : '#f3f4f6',
                          bgcolor: isSelected ? '#ecfdf5' : 'background.paper',
                          boxShadow: isSelected ? '0 6px 18px rgba(16, 185, 129, 0.18)' : 'none',
                          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                          '&:hover': {
                            borderColor: '#10b981',
                            transform: 'translateY(-2px)',
                          },
                        }}
                      >
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Box>
                            <Typography fontWeight={800} fontSize={15} color={isSelected ? '#065f46' : 'text.primary'}>
                              {option.label}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontSize: 13 }}>
                              {option.desc}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              width: 24,
                              height: 24,
                              borderRadius: '50%',
                              border: '2px solid',
                              borderColor: isSelected ? '#10b981' : '#d1d5db',
                              bgcolor: isSelected ? '#10b981' : 'transparent',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'white',
                              fontSize: 14,
                              flexShrink: 0,
                              ml: 2,
                            }}
                          >
                            {isSelected ? '✓' : ''}
                          </Box>
                        </Stack>
                      </Card>
                    );
                  })}
                </Stack>
              )}

              {/* Navigation Controls */}
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ pt: 2, borderTop: '1px solid #f3f4f6' }}>
                <Button
                  variant="outlined"
                  onClick={handlePrev}
                  disabled={currentStepIndex === 0}
                  startIcon={<ArrowBackRoundedIcon />}
                  sx={{ borderRadius: '12px', textTransform: 'none', fontWeight: 700 }}
                >
                  Previous
                </Button>

                <Button
                  variant="contained"
                  onClick={handleNext}
                  endIcon={currentStepIndex === totalSteps - 1 ? <AssignmentTurnedInRoundedIcon /> : <ArrowForwardRoundedIcon />}
                  sx={{
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontWeight: 800,
                    px: 3.5,
                    bgcolor: '#10b981',
                    '&:hover': { bgcolor: '#059669' },
                  }}
                >
                  {currentStepIndex === totalSteps - 1 ? "Submit to HR Board 🏛️" : "Continue to Next Clause"}
                </Button>
              </Stack>
            </Box>
          )}

          {/* Final Certificate & Contract */}
          {contractReport && (
            <Box>
              <Card
                sx={{
                  p: { xs: 2.5, sm: 4 },
                  borderRadius: '24px',
                  background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
                  border: '2px dashed #059669',
                  boxShadow: '0 12px 36px rgba(16, 185, 129, 0.12)',
                  mb: 3,
                  position: 'relative',
                  overflow: 'visible',
                }}
              >
                {/* Official Stamp */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: -14,
                    right: 20,
                    bgcolor: '#059669',
                    color: 'white',
                    px: 2,
                    py: 0.6,
                    borderRadius: '20px',
                    fontSize: 12,
                    fontWeight: 900,
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                    boxShadow: '0 4px 12px rgba(5, 150, 105, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                  }}
                >
                  <VerifiedRoundedIcon sx={{ fontSize: 16 }} /> OFFICIALLY APPROVED
                </Box>

                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <Typography variant="overline" color="#059669" fontWeight={900} letterSpacing={2}>
                    OFFICIAL CERTIFICATE OF FRIENDSHIP APPOINTMENT
                  </Typography>
                  <Typography variant="h4" fontWeight={900} sx={{ mt: 1, mb: 0.5 }}>
                    {contractReport.name}
                  </Typography>
                  <Chip
                    label={contractReport.role}
                    sx={{
                      bgcolor: '#d1fae5',
                      color: '#065f46',
                      fontWeight: 800,
                      fontSize: 14,
                      py: 2,
                      px: 1,
                      borderRadius: '12px',
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    bgcolor: 'background.paper',
                    p: 2.5,
                    borderRadius: '18px',
                    mb: 3,
                    border: '1px solid #a7f3d0',
                  }}
                >
                  <Typography variant="subtitle2" fontWeight={900} color="#065f46" sx={{ mb: 1.5 }}>
                    BINDING EMPLOYMENT CLAUSES:
                  </Typography>
                  <Stack spacing={1}>
                    {contractReport.clauses.map((clause, idx) => (
                      <Typography key={idx} variant="body2" sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                        <span style={{ color: '#10b981', fontWeight: 900 }}>•</span>
                        {clause}
                      </Typography>
                    ))}
                  </Stack>
                </Box>

                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ pt: 1, borderTop: '1px solid #d1fae5', gap: 1 }}
                >
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Date Issued: <strong>{contractReport.date}</strong>
                    </Typography>
                    <Typography variant="caption" display="block" color="text.secondary">
                      HR Clearance: <strong>Aptitude Score {contractReport.score}%</strong>
                    </Typography>
                  </Box>
                  <Typography variant="caption" sx={{ fontStyle: 'italic', color: '#047857', fontWeight: 700 }}>
                    Certified by PrankLab & Tarun Tiwari ✍️
                  </Typography>
                </Stack>
              </Card>

              {/* Actions */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<ContentCopyRoundedIcon />}
                  onClick={copyContract}
                  sx={{
                    borderRadius: '14px',
                    fontWeight: 800,
                    py: 1.5,
                    bgcolor: '#10b981',
                    '&:hover': { bgcolor: '#059669' },
                  }}
                >
                  Copy Official Contract
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<RestartAltRoundedIcon />}
                  onClick={handleReset}
                  sx={{
                    borderRadius: '14px',
                    fontWeight: 800,
                    py: 1.5,
                    borderColor: '#10b981',
                    color: '#059669',
                    '&:hover': { borderColor: '#059669', bgcolor: '#f0fdf4' },
                  }}
                >
                  Screen Another Candidate 🤝
                </Button>
              </Stack>
            </Box>
          )}
        </Paper>
      </Box>
    </ProjectLayout>
  );
}
