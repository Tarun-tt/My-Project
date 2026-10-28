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
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import ProjectLayout from '../../components/common/ProjectLayout.jsx';
import { playSuccessSound, playCelebrationSound } from '../../utils/soundEffects.js';
import { fireCannons, fireConfetti } from '../../utils/confettiHelper.js';

const APOLOGY_STEPS = [
  {
    step: 1,
    title: "Who Did You Wrong?",
    subtitle: "Identify the aggrieved party who deserves this software-assisted apology.",
    emoji: "🎯",
  },
  {
    step: 2,
    title: "The Crime / Sin Committed",
    subtitle: "What catastrophic felony have you committed against them?",
    emoji: "💥",
    options: [
      { label: "Forgot to reply to their text for 3 business weeks", trait: "reply", desc: "Texting latency exceeded human acceptable standards." },
      { label: "Ate their designated leftover food in the fridge", trait: "food", desc: "Grand culinary larceny in the first degree." },
      { label: "Cancelled plans 15 minutes before meeting", trait: "cancel", desc: "Sudden bedtime gravitational paralysis struck." },
      { label: "Stubbornly argued and was proven 100% wrong", trait: "argument", desc: "Ego crashed and burned before evidence." },
      { label: "Arrived 45 minutes late claiming 'traffic'", trait: "late", desc: "Was actually sitting on the bed staring at the wall." },
    ],
  },
  {
    step: 3,
    title: "Damage Severity Assessment",
    subtitle: "What is the emotional climate of the offended party?",
    emoji: "🌡️",
    options: [
      { label: "Mild Pouting & Lower Lip Quiver 🥺", trait: "mild", desc: "Can easily be solved with dessert and affectionate attention." },
      { label: "Chilling Silence & One-Word Texts ❄️", trait: "silent", desc: "Entering dangerous sub-zero emotional permafrost." },
      { label: "Full Volcanic Meltdown & Threat of Block 🌋", trait: "nuclear", desc: "All tactical emergency peace systems required." },
      { label: "Sarcastic 'It's fine, really' with death stare 💀", trait: "passive", desc: "It is definitely, unequivocally NOT fine." },
    ],
  },
  {
    step: 4,
    title: "Alibi & Excuse Formulation",
    subtitle: "Which creative defense argument shall we deploy?",
    emoji: "🛡️",
    options: [
      { label: "My phone fell between sofa cushions and enter airplane mode", trait: "sofa", desc: "Technical anomaly beyond mortal control." },
      { label: "Brain experienced unexpected memory overflow & restarted", trait: "reboot", desc: "Cognitive buffering issue." },
      { label: "My blanket detained me as an emotional hostage", trait: "blanket", desc: "Hostage negotiation was impossible." },
      { label: "Zero excuses. I am a potato who made a foolish error", trait: "potato", desc: "Disarming humility and total surrender." },
    ],
  },
  {
    step: 5,
    title: "Select Apology Flavor",
    subtitle: "Which tone will penetrate their hardened emotional defenses?",
    emoji: "🎭",
    options: [
      { label: "Puppy Eyes & Maximum Cuteness 🥺", trait: "cute", desc: "Irresistible sweetness designed to disarm anger." },
      { label: "Oscar-Winning Dramatic Melodrama 🎬", trait: "dramatic", desc: "Shakespearean tragedy with tears and violin music." },
      { label: "Corporate Legal Settlement Notice 👔", trait: "formal", desc: "Strict corporate liability and settlement protocol." },
      { label: "Bollywood Filmy Emotional Monologue 🎥", trait: "filmy", desc: "Kasam, taqdeer, and slow-motion heartbreak." },
    ],
  },
  {
    step: 6,
    title: "The Extravagant Bribe Offer",
    subtitle: "Words are cheap. What material offering seals the treaty?",
    emoji: "🎁",
    options: [
      { label: "Unlimited Boba / Coffee for the next 7 days", trait: "boba", desc: "The sweet liquid currency of forgiveness." },
      { label: "Ordering large pizza with garlic bread immediately", trait: "pizza", desc: "Carbohydrates heal all emotional wounds." },
      { label: "Immunity pass: You get to win the next 3 arguments", trait: "immunity", desc: "High emotional sacrifice on your part." },
      { label: "Personal chauffeur & bag carrier for the weekend", trait: "butler", desc: "Physical community service." },
    ],
  },
  {
    step: 7,
    title: "Guarantee of Behavioral Reform",
    subtitle: "What unrealistic promise will you make to maintain peace?",
    emoji: "📜",
    options: [
      { label: "I will set 17 alarms and tattoo our schedule on my arm", trait: "alarms", desc: "Extreme scheduling vigilance." },
      { label: "I surrender all my snack rights for 1 month", trait: "starve", desc: "Famine as penance." },
      { label: "I will wear a tracker so you always know where I am", trait: "tracker", desc: "Voluntary surveillance state." },
      { label: "I will reply to all future texts within 4.2 seconds", trait: "speed", desc: "Unrealistic digital devotion." },
    ],
  },
];

const TARGETS = [
  "My Love / Partner 💖",
  "My Best Friend 🤝",
  "My Mom / Family 🏡",
  "My Boss / Manager 💼",
  "My Roommate 🛋️",
];

export default function SorryGeneratorApp() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [recipientName, setRecipientName] = useState('');
  const [selectedTarget, setSelectedTarget] = useState(TARGETS[0]);
  const [answers, setAnswers] = useState({});
  const [generatedApology, setGeneratedApology] = useState(null);

  const currentStep = APOLOGY_STEPS[currentStepIndex];
  const totalSteps = APOLOGY_STEPS.length;
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
      if (!recipientName.trim()) {
        alert("Please enter the name of the person you need to apologize to!");
        return;
      }
    } else {
      if (!answers[currentStep.step]) {
        alert("Please select an apology component for this step!");
        return;
      }
    }

    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      constructApology();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const constructApology = () => {
    playCelebrationSound();
    fireCannons();

    const name = recipientName.trim();
    const flavor = answers[5] || 'cute';
    const bribe = answers[6] || 'pizza';

    let messageBody = "";

    if (flavor === 'filmy') {
      messageBody = `Meri jaan ${name}! Tum kya samjhte ho main jaan-bujh kar galti kiya? Kasam Ganga maiya ki, taqdeer ne mere dimaag par parda daal diya tha! Tumhare bina meri zindagi bina cheese wale pizza jaisi hai! Ek aakhri mauka de do huzoor, warna main Bollywood ke sad background song mein slow-motion mein ro padunga!`;
    } else if (flavor === 'formal') {
      messageBody = `Dear ${name}, Please accept this formal notification of sincere contrition. A thorough internal audit reveals the subscriber committed an egregious operational lapse. As part of our comprehensive remediation package, full restitution including immediate refreshments has been authorized. We respectfully request the withdrawal of all sanctions.`;
    } else if (flavor === 'dramatic') {
      messageBody = `Dearest ${name}, let history record that on this sorrowful day, my foolishness brought darkness upon our sacred bond! The universe itself weeps at the tragedy of my mistake. I fall upon the sword of repentance! Grant me thy pardon, for without thy smile, the sun rises in vain!`;
    } else {
      // Cute default
      messageBody = `Dearest ${name}! 🥺 I am so, so, so sorry! My tiny potato brain had a temporary power outage and made a silly mistake. Look at my sad little remorseful eyes! Can we please erase this from our memories and let me buy you food? You are my absolute favorite human in the whole world! 💖`;
    }

    setGeneratedApology({
      recipient: name,
      targetType: selectedTarget,
      flavor: flavor.toUpperCase(),
      message: messageBody,
      bribeText: bribe === 'boba' ? "Free Boba / Coffee for 7 Days" : "Extra Large Pizza Delivery",
      date: new Date().toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' }),
    });
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setRecipientName('');
    setAnswers({});
    setGeneratedApology(null);
  };

  const copyApology = () => {
    if (!generatedApology) return;
    navigator.clipboard.writeText(generatedApology.message);
    alert("Masterpiece Apology copied to clipboard! Send it immediately! 🥺💖");
  };

  const shareWhatsApp = () => {
    if (!generatedApology) return;
    const url = `https://wa.me/?text=${encodeURIComponent(generatedApology.message)}`;
    window.open(url, '_blank');
  };

  return (
    <ProjectLayout
      title="Sorry Generator"
      emoji="🥹"
      category="Messages & Mischief"
      accentColor="#8b5cf6"
      onReset={handleReset}
    >
      <Box sx={{ maxWidth: 760, mx: 'auto', mt: 1 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, sm: 4 },
            borderRadius: '26px',
            border: '1.5px solid #ddd6fe',
            bgcolor: 'background.paper',
            boxShadow: '0 12px 40px rgba(139, 92, 246, 0.08)',
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Box sx={{ fontSize: 52, mb: 1 }}>🥹🕊️</Box>
            <Typography variant="h4" fontWeight={900} sx={{ mb: 0.5, letterSpacing: -0.5 }}>
              Strategic Apology Architecture Lab
            </Typography>
            <Typography variant="body2" color="text.secondary">
              8-Step Precision Apology: De-escalate conflicts with software-calculated remorse and extravagant bribes.
            </Typography>
          </Box>

          {/* Stepper Progress */}
          {!generatedApology && (
            <Box sx={{ mb: 4 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                <Chip
                  label={`Step ${currentStepIndex + 1} of ${totalSteps}`}
                  size="small"
                  sx={{ bgcolor: '#ede9fe', color: '#5b21b6', fontWeight: 800 }}
                />
                <Typography variant="caption" color="text.secondary" fontWeight={700}>
                  {progressPercent}% Assembled
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={progressPercent}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  bgcolor: '#ede9fe',
                  '& .MuiLinearProgress-bar': {
                    background: 'linear-gradient(90deg, #8b5cf6, #7c3aed)',
                    borderRadius: 5,
                  },
                }}
              />
            </Box>
          )}

          {/* Steps */}
          {!generatedApology && (
            <Box>
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

              {/* Step 1: Recipient Name & Target */}
              {currentStepIndex === 0 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 4 }}>
                  <TextField
                    fullWidth
                    label="Name of Aggrieved Person"
                    placeholder="e.g. Ananya, Rahul, Mom, Boss, Sarah"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '16px',
                        '&:hover fieldset': { borderColor: '#8b5cf6' },
                        '&.Mui-focused fieldset': { borderColor: '#8b5cf6' },
                      },
                    }}
                  />

                  <Box>
                    <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 1.5, color: '#5b21b6' }}>
                      Select Target Relationship:
                    </Typography>
                    <Stack spacing={1}>
                      {TARGETS.map((t) => (
                        <Card
                          key={t}
                          onClick={() => {
                            playSuccessSound();
                            setSelectedTarget(t);
                          }}
                          sx={{
                            p: 1.8,
                            borderRadius: '14px',
                            cursor: 'pointer',
                            border: '1.5px solid',
                            borderColor: selectedTarget === t ? '#8b5cf6' : 'transparent',
                            bgcolor: selectedTarget === t ? '#f5f3ff' : 'background.paper',
                            boxShadow: selectedTarget === t ? '0 4px 14px rgba(139, 92, 246, 0.15)' : 'none',
                            transition: 'all 0.2s ease',
                            '&:hover': { bgcolor: '#f5f3ff', borderColor: '#c4b5fd' },
                          }}
                        >
                          <Typography fontWeight={700} fontSize={14.5}>
                            {t}
                          </Typography>
                        </Card>
                      ))}
                    </Stack>
                  </Box>
                </Box>
              )}

              {/* Steps 2-7: Option Selection */}
              {currentStepIndex > 0 && currentStep.options && (
                <Stack spacing={1.5} sx={{ mb: 4 }}>
                  {currentStep.options.map((opt) => {
                    const isSelected = answers[currentStep.step] === opt.trait;
                    return (
                      <Card
                        key={opt.trait}
                        onClick={() => handleSelectOption(opt.trait)}
                        sx={{
                          p: 2,
                          borderRadius: '16px',
                          cursor: 'pointer',
                          border: '2px solid',
                          borderColor: isSelected ? '#8b5cf6' : '#f3f4f6',
                          bgcolor: isSelected ? '#f5f3ff' : 'background.paper',
                          boxShadow: isSelected ? '0 6px 18px rgba(139, 92, 246, 0.16)' : 'none',
                          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                          '&:hover': {
                            borderColor: '#8b5cf6',
                            transform: 'translateY(-2px)',
                          },
                        }}
                      >
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Box>
                            <Typography fontWeight={800} fontSize={15} color={isSelected ? '#5b21b6' : 'text.primary'}>
                              {opt.label}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontSize: 13 }}>
                              {opt.desc}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              width: 24,
                              height: 24,
                              borderRadius: '50%',
                              border: '2px solid',
                              borderColor: isSelected ? '#8b5cf6' : '#d1d5db',
                              bgcolor: isSelected ? '#8b5cf6' : 'transparent',
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
                  endIcon={currentStepIndex === totalSteps - 1 ? <VerifiedRoundedIcon /> : <ArrowForwardRoundedIcon />}
                  sx={{
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontWeight: 800,
                    px: 3.5,
                    bgcolor: '#8b5cf6',
                    '&:hover': { bgcolor: '#7c3aed' },
                  }}
                >
                  {currentStepIndex === totalSteps - 1 ? "Generate Masterpiece Apology 🥹" : "Next Apology Layer"}
                </Button>
              </Stack>
            </Box>
          )}

          {/* Final Apology Result */}
          {generatedApology && (
            <Box>
              <Card
                sx={{
                  p: { xs: 2.5, sm: 4 },
                  borderRadius: '24px',
                  background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)',
                  border: '2px solid #8b5cf6',
                  boxShadow: '0 12px 36px rgba(139, 92, 246, 0.15)',
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
                    bgcolor: '#7c3aed',
                    color: 'white',
                    px: 2,
                    py: 0.6,
                    borderRadius: '20px',
                    fontSize: 12,
                    fontWeight: 900,
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                    boxShadow: '0 4px 12px rgba(124, 58, 237, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                  }}
                >
                  <VerifiedRoundedIcon sx={{ fontSize: 16 }} /> CERTIFIED CONTEMPORARY REMORSE
                </Box>

                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <Typography variant="overline" color="#5b21b6" fontWeight={900} letterSpacing={2}>
                    OFFICIAL DIPLOMATIC APOLOGY DISPATCH
                  </Typography>
                  <Typography variant="h4" fontWeight={900} sx={{ mt: 1, mb: 0.5 }}>
                    For: {generatedApology.recipient} 🥺
                  </Typography>
                  <Chip
                    label={generatedApology.targetType}
                    sx={{
                      bgcolor: '#fff',
                      color: '#5b21b6',
                      fontWeight: 800,
                      fontSize: 13,
                      border: '1px solid #ddd6fe',
                    }}
                  />
                </Box>

                {/* Message Textbox */}
                <Box
                  sx={{
                    bgcolor: 'background.paper',
                    p: 3,
                    borderRadius: '18px',
                    mb: 2.5,
                    border: '1.5px solid #c4b5fd',
                  }}
                >
                  <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: 16, color: 'text.primary' }}>
                    {generatedApology.message}
                  </Typography>
                </Box>

                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ pt: 1, borderTop: '1px solid #ddd6fe', gap: 1 }}
                >
                  <Typography variant="caption" color="text.secondary">
                    Issued: <strong>{generatedApology.date}</strong>
                  </Typography>
                  <Typography variant="caption" sx={{ fontStyle: 'italic', color: '#6d28d9', fontWeight: 700 }}>
                    Constructed by PrankLab & Tarun Tiwari 🥹
                  </Typography>
                </Stack>
              </Card>

              {/* Action Buttons */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<ContentCopyRoundedIcon />}
                  onClick={copyApology}
                  sx={{
                    borderRadius: '14px',
                    fontWeight: 800,
                    py: 1.5,
                    bgcolor: '#8b5cf6',
                    '&:hover': { bgcolor: '#7c3aed' },
                  }}
                >
                  Copy Apology
                </Button>

                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<WhatsAppIcon />}
                  onClick={shareWhatsApp}
                  sx={{
                    borderRadius: '14px',
                    fontWeight: 800,
                    py: 1.5,
                    bgcolor: '#25D366',
                    color: 'white',
                    '&:hover': { bgcolor: '#128C7E' },
                  }}
                >
                  Send via WhatsApp
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
                    borderColor: '#8b5cf6',
                    color: '#7c3aed',
                    '&:hover': { borderColor: '#7c3aed', bgcolor: '#f5f3ff' },
                  }}
                >
                  Build Another 🥹
                </Button>
              </Stack>
            </Box>
          )}
        </Paper>
      </Box>
    </ProjectLayout>
  );
}
