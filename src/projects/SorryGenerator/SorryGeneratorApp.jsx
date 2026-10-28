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
  IconButton,
  Tooltip,
} from '@mui/material';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import CasinoRoundedIcon from '@mui/icons-material/CasinoRounded';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ProjectLayout from '../../components/common/ProjectLayout.jsx';
import { playSuccessSound } from '../../utils/soundEffects.js';

const SITUATIONS = [
  { id: 'reply', label: 'Forgot to Reply 📱' },
  { id: 'food', label: 'Ate Your Food 🍕' },
  { id: 'cancel', label: 'Cancelled Plans 🛏️' },
  { id: 'argument', label: 'Lost an Argument 🤐' },
  { id: 'late', label: 'Arrived Super Late ⏰' },
  { id: 'birthday', label: 'Forgot Date / Event 🗓️' },
];

const TONES = [
  { id: 'cute', label: 'Puppy Eyes 🥺' },
  { id: 'dramatic', label: 'Oscar Dramatic 🎭' },
  { id: 'formal', label: 'Corporate Legal 👔' },
  { id: 'filmy', label: 'Bollywood Filmy 🎬' },
  { id: 'honest', label: 'Brutally Honest 💀' },
];

const APOLOGIES = {
  reply: {
    cute: "I am so sorry! 🥺 My phone was all the way on the nightstand and my arms were temporarily experiencing gravitational paralysis. Please forgive your tiny sleepy friend?",
    dramatic: "In the tragic chronicle of missed digital missives, none pierces my wounded soul more than my silence. Forgive me, for the silence was a dagger to my own heart!",
    formal: "Please accept this formal notification regarding delayed correspondence. The responsible party experienced temporary cognitive buffering. We apologize for the operational inconvenience.",
    filmy: "Tum kya samjhte ho, main jaan-bujh kar reply nahi kiya? Kasam Ganga maiya ki, network hi dhokebaaz nikla! Ek aakhri mauka de do!",
    honest: "I read your message in my notification bar, replied mentally with great affection, and then completely forgot keyboards require actual fingers. My bad.",
  },
  food: {
    cute: "I didn’t mean to eat the whole thing! 🥺 The snack looked lonely and cold. It practically begged me for warm shelter in my tummy! Forgive me?",
    dramatic: "I stand convicted before the high court of gastronomy! The aroma possessed me like a wicked spirit. Banish me to culinary exile, but grant me your pardon!",
    formal: "This letter serves to address the unauthorized consumption of edible assets previously under your stewardship. A full reimbursement in the form of dessert is proposed.",
    filmy: "Bhook buri cheez hai babu moshai! Vo pizza mera nahi tha, lekin meri kismat mein likha tha! Saza-e-maaf kijiye huzoor!",
    honest: "I looked at the food. I thought about saving you some. Then greed took the wheel. I have zero defense. I am a monster.",
  },
  cancel: {
    cute: "I really wanted to see you, but my bed opened up an investigation into my fatigue and detained me! 🥺 Can we reschedule and I buy you boba?",
    dramatic: "Alas, cruel fate has conspired against our grand rendezvous! My physical vessel has succumbed to the heavy burdens of modern existence. Do not weep for me!",
    formal: "Kindly be advised that our scheduled engagement must be deferred due to unforeseen exhaustion and capacity constraints. We regret any scheduling friction.",
    filmy: "Mera aana mushkil hi nahi, namumkin tha! Taqdeer ne hamare beech neend ki deewar khadi kar di! Maaf kar do na yaar!",
    honest: "I put on pants, stared into the abyss of socializing, and took my pants back off. I love you, but my couch won today.",
  },
  argument: {
    cute: "You were right and I was wrong! 🥺 Look at my sad little face admitting defeat. Does this earn me a forgiveness hug?",
    dramatic: "Let history record that on this solemn day, I fell upon the sword of truth. You were victorious; I am humbled in the dust of defeat!",
    formal: "Following a comprehensive post-mortem of our recent debate, the committee concedes full validity to your position. We formally retract all prior objections.",
    filmy: "Jeet tumhari hui, haar meri! Lekin pyaar mein haarne wale ko hi baazigar kehte hain! Ab gussa chhodo!",
    honest: "You were 100% correct. I only kept arguing because I was already 4 minutes in and pride is a very stupid emotion.",
  },
  late: {
    cute: "I'm on my way right now! 🥺 Well, putting my shoes on, which is basically the same spiritual state as arriving! Please don't be mad!",
    dramatic: "The streets were a tempest of mechanical beasts and red traffic lights! I fought valiant battles against gridlock to reach your presence!",
    formal: "Please accept this delay notice. ETA variance exceeded acceptable parameters due to transit anomalies. Sincere apologies for the delay.",
    filmy: "Der se aana meri aadat nahi, majboori thi! Lekin main aa gaya hoon, tumhare saamne khada hoon! Ab maar daalo ya maaf kar do!",
    honest: "I sat on the edge of my bed looking at one sock for 20 minutes completely dissociated from time. I am running now.",
  },
  birthday: {
    cute: "Happy Belated Everything! 🥺 I was so busy remembering how much I love you that the calendar numbers evaporated! Extra cake on me?",
    dramatic: "Let the celestial spheres rain meteors upon my unworthy head! I committed the ultimate sacrilege of calendar amnesia! Forgive this wretch!",
    formal: "We regret the operational lapse in dispatching milestone salutations in accordance with ISO anniversary standards. Corrective affection is being deployed.",
    filmy: "Tareekh bhool gaya, par tumhein kaise bhool sakta hoon? Har dhadkan mein tumhara naam hai! Belated Happy Birthday meri jaan!",
    honest: "My memory is running on 2MB of RAM. I didn't forget you; my brain simply forgot what month we are currently living in.",
  },
};

export default function SorryGeneratorApp() {
  const [situation, setSituation] = useState('reply');
  const [tone, setTone] = useState('cute');
  const [message, setMessage] = useState(APOLOGIES.reply.cute);
  const [copied, setCopied] = useState(false);

  const handleGenerate = (sit = situation, tn = tone) => {
    playSuccessSound();
    const text = APOLOGIES[sit]?.[tn] || "I am really sorry!";
    setMessage(text);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsApp = () => {
    const encoded = encodeURIComponent(message);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  return (
    <ProjectLayout
      title="Sorry Generator"
      emoji="🥹"
      category="Messages & Mischief"
      accentColor="#8b5cf6"
      onReset={() => {
        setSituation('reply');
        setTone('cute');
        setMessage(APOLOGIES.reply.cute);
      }}
    >
      <Box sx={{ maxWidth: 720, mx: 'auto', mt: 1 }}>
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
            <Box sx={{ fontSize: 54, mb: 1 }}>🥹</Box>
            <Typography variant="h4" fontWeight={900} sx={{ mb: 1 }}>
              The Ultimate Apology Generator
            </Typography>
            <Typography variant="body2" color="text.secondary">
              For when you messed up and need Shakespearean drama or puppy eyes to save your skin.
            </Typography>
          </Box>

          <Stack spacing={3}>
            {/* Situation Selection */}
            <Box>
              <Typography fontWeight={800} fontSize={14.5} sx={{ mb: 1.2 }}>
                1. What Did You Mess Up?
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
                {SITUATIONS.map((sit) => {
                  const isSelected = situation === sit.id;
                  return (
                    <Chip
                      key={sit.id}
                      label={sit.label}
                      onClick={() => {
                        setSituation(sit.id);
                        handleGenerate(sit.id, tone);
                      }}
                      sx={{
                        fontWeight: 700,
                        bgcolor: isSelected ? '#8b5cf6' : '#f5f3ff',
                        color: isSelected ? '#ffffff' : '#6d28d9',
                        border: isSelected ? '2px solid #8b5cf6' : '1px solid #ddd6fe',
                        cursor: 'pointer',
                      }}
                    />
                  );
                })}
              </Stack>
            </Box>

            {/* Tone Selection */}
            <Box>
              <Typography fontWeight={800} fontSize={14.5} sx={{ mb: 1.2 }}>
                2. Choose Your Apology Defense Tone:
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
                {TONES.map((tn) => {
                  const isSelected = tone === tn.id;
                  return (
                    <Chip
                      key={tn.id}
                      label={tn.label}
                      onClick={() => {
                        setTone(tn.id);
                        handleGenerate(situation, tn.id);
                      }}
                      sx={{
                        fontWeight: 700,
                        bgcolor: isSelected ? '#7c3aed' : '#ede9fe',
                        color: isSelected ? '#ffffff' : '#5b21b6',
                        border: isSelected ? '2px solid #7c3aed' : '1px solid #c4b5fd',
                        cursor: 'pointer',
                      }}
                    />
                  );
                })}
              </Stack>
            </Box>

            {/* Generated Output Area (Editable) */}
            <Box>
              <Typography fontWeight={800} fontSize={14.5} sx={{ mb: 1 }}>
                Generated Apology (Feel free to edit):
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '18px',
                    bgcolor: '#faf5ff',
                    fontSize: 15,
                    lineHeight: 1.6,
                  },
                }}
              />
            </Box>

            {/* Action Buttons */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} justifyContent="center">
              <Button
                variant="contained"
                startIcon={<ContentCopyRoundedIcon />}
                onClick={handleCopy}
                sx={{
                  bgcolor: '#7c3aed',
                  color: '#ffffff',
                  fontWeight: 800,
                  py: 1.2,
                  px: 3,
                  '&:hover': { bgcolor: '#6d28d9' },
                }}
              >
                {copied ? 'Copied to Clipboard! 📋' : 'Copy Apology'}
              </Button>

              <Button
                variant="contained"
                startIcon={<WhatsAppIcon />}
                onClick={handleWhatsApp}
                sx={{
                  background: 'linear-gradient(100deg, #25D366, #128C7E)',
                  color: '#ffffff',
                  fontWeight: 800,
                  py: 1.2,
                  px: 3,
                }}
              >
                Send via WhatsApp
              </Button>

              <Button
                variant="outlined"
                startIcon={<CasinoRoundedIcon />}
                onClick={() => handleGenerate()}
                sx={{ borderColor: '#7c3aed', color: '#7c3aed', fontWeight: 800 }}
              >
                Regenerate
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Box>
    </ProjectLayout>
  );
}
