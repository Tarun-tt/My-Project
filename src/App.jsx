import React, { useMemo, useState } from "react";
import { Box, Container } from "@mui/material";
import FloatingHearts from "./components/common/FloatingHearts.jsx";
import Header from "./components/common/Header.jsx";
import Footer from "./components/common/Footer.jsx";
import NotificationSnackbar from "./components/common/NotificationSnackbar.jsx";
import InviteScreen from "./components/screens/InviteScreen.jsx";
import QuestionsScreen from "./components/screens/QuestionsScreen.jsx";
import PlannerScreen from "./components/screens/PlannerScreen.jsx";
import ConfirmedScreen from "./components/screens/ConfirmedScreen.jsx";

export default function App() {
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
    setScreen("confirmed");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setScreen("invite");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSharePlan = async () => {
    const readableDate = date
      ? new Date(`${date}T12:00:00`).toLocaleDateString(undefined, {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : "Date to be decided";

    const guestText = dateName ? `with ${dateName}` : "";
    const text = `💗 Date with Tarun Tiwari ${guestText} 💗\n📅 ${readableDate} at ${time}\n📍 ${restaurant}\n✨ Activity: ${activity}\n👗 Outfit: ${dressCode}\n💌 Note: ${message}\n\nOfficial confirmation by Tarun Tiwari ✨`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Date with Tarun Tiwari 💗",
          text,
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        setSnackMessage("Date plan copied to clipboard! Ready to share with Tarun 💗");
      } else {
        setSnackMessage(text);
      }
    } catch {
      setSnackMessage("Date plan ready to share with Tarun 💗");
    }
  };

  return (
    <Box className="app-shell">
      <FloatingHearts />
      <Container maxWidth="md" className="main-container">
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
            onShare={handleSharePlan}
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
