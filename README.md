# A Special Date with Tarun Tiwari ✨

A playful, interactive, romantic date invitation and confirmation web application built with **React**, **Vite**, and **Material UI**, authored and designed by **Tarun Tiwari**.

---

## 🌟 Key Features

### 1. The Interactive Invitation Screen
- **Personalized Proposal**: Romantic invitation specifically crafted by Tarun Tiwari.
- **The Evasive "No" Button**: When the user hovers, touches, focuses, or tries to click "No", the button playfully dodges away to random safe coordinates on the screen with hilarious escalating reactions (*"Wait, no! 😅"*, *"Catch me if you can! 🏃💨"*, *"Universe strictly says YES! 💘"*).
- **Floating Hearts**: Atmospheric CSS animation with floating hearts, blossoms, and romantic particles.

### 2. Multi-Step Playful Date Questionnaire
- When the user clicks **"Yes, I’d love to! 💖"**, they are taken to an interactive 4-step compatibility and tease quiz before the planner:
  - **Question 1**: *"Are you 100% sure about this date with Tarun?"*
  - **Question 2**: *"Will you let Tarun handle the playlist on the way?"*
  - **Question 3**: *"Who gets the very last bite of dessert?"*
  - **Question 4**: *"Do you promise to bring your sweetest smile?"*
- **Evasive Button on Every Question**: Every question features a playful moving button with unique contextual evasion quotes!
- **Progress Tracking**: Dynamic progress bar and step indicators, with the option to navigate between questions or skip directly to the planner.

### 3. Date Planner Wizard
- **Date & Time Selection**: Date picker (with past date protection) and time slot dropdown.
- **Curated Dining Venues**: Visual cards for dining options (Italian, Japanese, Brunch cafe, Modern Indian, Rooftop, or "Surprise Tarun").
- **Activity Suggestions**: Cards for sunset walks, dessert runs, movies, live music, arcade games, and stargazing drives.
- **Finishing Touches**: Outfit vibe selector, interactive budget slider (₹500 - ₹7,000+), personalized date recipient name, and sweet personal note for Tarun.

### 4. Official Confirmation & Share Screen
- **Date Pass Summary**: Elegant boarding pass-style summary of the confirmed date details.
- **One-Click Share**: Uses Web Share API on mobile/supported browsers, or copies the formatted romantic invitation to clipboard with instant toast notifications.
- **Edit & Reset**: Easily modify the plan or start over from the beginning.

---

## 📁 Professional Project Structure

```text
date-confirmation-app/
├── index.html                           # App entry HTML with Tarun Tiwari metadata & favicon
├── package.json                         # Dependencies, scripts, and author metadata
├── vite.config.js                       # Vite configuration with React plugin
├── README.md                            # Comprehensive documentation
├── src/
│   ├── main.jsx                         # React 19 entry point with ThemeProvider & CssBaseline
│   ├── App.jsx                          # Root orchestrator managing screens & state flow
│   ├── styles.css                       # Responsive CSS, animations & backdrop filters
│   │
│   ├── theme/
│   │   └── theme.js                     # Material UI theme palette, typography & overrides
│   │
│   ├── constants/
│   │   ├── restaurants.js               # Restaurant options and details
│   │   ├── activities.jsx               # Activities with Material UI icons
│   │   ├── dressCodes.js                # Outfit vibes and time slots
│   │   └── questions.js                 # Multi-step questionnaire questions and dodge texts
│   │
│   ├── hooks/
│   │   └── useMovingButton.js           # Reusable hook for dodging button logic & viewport bounds
│   │
│   └── components/
│       ├── common/
│       │   ├── FloatingHearts.jsx       # Floating background particle animation
│       │   ├── Header.jsx               # Brand header with Tarun's badge & reset action
│       │   ├── Footer.jsx               # Footer with author credits
│       │   ├── MovingButton.jsx         # Reusable evasive moving button component
│       │   └── NotificationSnackbar.jsx # Toast notifications for reactions & shares
│       │
│       ├── screens/
│       │   ├── InviteScreen.jsx         # First screen: "Will you go on a date with Tarun?"
│       │   ├── QuestionsScreen.jsx      # Multi-step questionnaire with moving buttons
│       │   ├── PlannerScreen.jsx        # Date customization form
│       │   └── ConfirmedScreen.jsx      # Final date summary pass & share buttons
│       │
│       └── planner/
│           ├── DateTimePicker.jsx       # Date & time selection controls
│           ├── RestaurantPicker.jsx     # Restaurant card picker
│           ├── ActivityPicker.jsx       # Activity option picker
│           └── FinalTouches.jsx         # Outfit, budget slider, notes & date's name
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (tested on Node 22)
- npm 9+

### Installation & Run
```bash
# 1. Navigate to the project directory
cd date-confirmation-app

# 2. Install dependencies (if not already installed)
npm install

# 3. Start local development server
npm run dev
```

Open the printed URL in your browser (typically `http://localhost:5173`).

### Production Build
```bash
npm run build
npm run preview
```

---

## 👤 Author

**Tarun Tiwari**
- Project: Date Confirmation & Planner Web App
- Crafted with ❤️ and playful creativity.
