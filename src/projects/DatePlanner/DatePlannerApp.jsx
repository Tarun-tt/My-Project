import React, { useMemo, useState } from "react";
import { Box, Container, Button, Stack } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useNavigate } from "react-router-dom";
import FloatingHearts from "../../components/common/FloatingHearts.jsx";
import Header from "../../components/common/Header.jsx";
import Footer from "../../components/common/Footer.jsx";
import NotificationSnackbar from "../../components/common/NotificationSnackbar.jsx";
import InviteScreen from "../../components/screens/InviteScreen.jsx";
import QuestionsScreen from "../../components/screens/QuestionsScreen.jsx";
import PlannerScreen from "../../components/screens/PlannerScreen.jsx";
import ConfirmedScreen from "../../components/screens/ConfirmedScreen.jsx";
import { playCelebrationSound } from "../../utils/soundEffects.js";

export default function DatePlannerApp() {
  const navigate = useNavigate();

  // Screens: 'invite' -> 'questions' -> 'planner' -> 'confirmed'
  const [screen, setScreen] = useState("invite");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("18:30");
  const [restaurant, setRestaurant] = useState("The Cozy Table");
  const [activity, setActivity] = useState("A walk together");
  const [budget, setBudget] = useState(1500);
  const [dressCode, setDressCode] = useState("Cute & casual");
  const [message, setMessage] = useState(
    "Really looking forward to spending time with you ❤️"
  );
  const [dateName, setDateName] = useState("");
  const [snackMessage, setSnackMessage] = useState("");

  const minDate = useMemo(() => {
    const d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 10);
  }, []);

  const handleStartQuestions = () => {
    setScreen("questions");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCompleteQuestions = () => {
    setScreen("planner");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleConfirmPlan = () => {
    if (!date) {
      setSnackMessage("Please pick a date first so Tarun can lock it in! 💌");
      return;
    }
    playCelebrationSound();
    setScreen("confirmed");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setScreen("invite");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const TARUN_WHATSAPP_NUMBER = "919999841038";

  const generateDateText = () => {
    const readableDate = date
      ? new Date(`${date}T12:00:00`).toLocaleDateString(undefined, {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : "Date to be decided";

    const senderText = dateName ? `\n👤 *From:* ${dateName}` : "";
    const noteText = message ? `\n💌 *Note for Tarun:* "${message}"` : "";

    return `💖 *OUR DATE IS CONFIRMED!* 💖\n\nHey Tarun! Here are the details for our date:\n\n📅 *When:* ${readableDate} at ${time}\n📍 *Where:* ${restaurant}\n✨ *Activity:* ${activity}\n👗 *Outfit Vibe:* ${dressCode}\n💰 *Budget:* ₹${budget.toLocaleString("en-IN")} for two${senderText}${noteText}\n\nCan't wait to see you, Tarun! 🥰✨`;
  };

  const handleShareToWhatsApp = () => {
    const text = generateDateText();
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${TARUN_WHATSAPP_NUMBER}?text=${encodedText}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setSnackMessage("Opening WhatsApp to send your date plan directly to Tarun (+91 9999841038)! 💬💖");
  };

  const handleCopyPlan = async () => {
    const text = generateDateText();
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        setSnackMessage("Date plan copied to clipboard! 📋💖");
      } else {
        setSnackMessage(text);
      }
    } catch {
      setSnackMessage("Date plan ready to copy 📋💖");
    }
  };

  return (
    <Box className="app-shell" sx={{ pb: 6 }}>
      <FloatingHearts />
      <Container maxWidth="md" className="main-container">
        {/* Navigation back to PrankLab Hub */}
        <Stack direction="row" alignItems="center" sx={{ pt: 2, pb: 1 }}>
          <Button
            startIcon={<ArrowBackRoundedIcon />}
            onClick={() => navigate('/')}
            sx={{
              color: '#9a6374',
              bgcolor: 'rgba(255,255,255,0.7)',
              border: '1px solid #f4dce3',
              '&:hover': { bgcolor: '#ffe8ef' },
              fontWeight: 700,
              fontSize: 13,
            }}
          >
            ← Back to PrankLab Hub
          </Button>
        </Stack>

        <Header onReset={handleReset} screen={screen} />

        {screen === "invite" && (
          <InviteScreen onAccept={handleStartQuestions} />
        )}

        {screen === "questions" && (
          <QuestionsScreen
            onComplete={handleCompleteQuestions}
            onBackToInvite={() => setScreen("invite")}
            onShowToast={(msg) => setSnackMessage(msg)}
          />
        )}

        {screen === "planner" && (
          <PlannerScreen
            date={date}
            setDate={setDate}
            time={time}
            setTime={setTime}
            restaurant={restaurant}
            setRestaurant={setRestaurant}
            activity={activity}
            setActivity={setActivity}
            budget={budget}
            setBudget={setBudget}
            dressCode={dressCode}
            setDressCode={setDressCode}
            message={message}
            setMessage={setMessage}
            dateName={dateName}
            setDateName={setDateName}
            minDate={minDate}
            onConfirm={handleConfirmPlan}
            onBack={() => setScreen("questions")}
          />
        )}

        {screen === "confirmed" && (
          <ConfirmedScreen
            date={date}
            time={time}
            restaurant={restaurant}
            activity={activity}
            budget={budget}
            dressCode={dressCode}
            message={message}
            dateName={dateName}
            onShareWhatsApp={handleShareToWhatsApp}
            onCopyPlan={handleCopyPlan}
            onEdit={() => setScreen("planner")}
          />
        )}

        <Footer />
      </Container>

      <NotificationSnackbar
        open={Boolean(snackMessage)}
        message={snackMessage}
        onClose={() => setSnackMessage("")}
      />
    </Box>
  );
}
