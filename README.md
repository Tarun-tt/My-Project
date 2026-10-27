# A Special Date with Tarun Tiwari ✨

A playful, interactive, romantic date invitation and confirmation web application built with **React**, **Vite**, and **Material UI**, authored and designed by **Tarun Tiwari**.

---

## 🌟 Key Features

### 1. The Interactive Invitation Screen
- **Personalized Proposal**: Romantic invitation specifically crafted by Tarun Tiwari.
- **The Evasive "No" Button**: When the user hovers, touches, focuses, or tries to click "No", the button playfully dodges away to random safe coordinates on the screen with hilarious escalating reactions and spring sound effects (*"Wait, no! 😅"*, *"Catch me if you can! 🏃💨"*, *"Universe strictly says YES! 💘"*).
- **Floating Hearts**: Atmospheric CSS animation with floating hearts, blossoms, and romantic particles.

### 2. Multi-Step Comedic Date Challenge (9 Hilarious Tasks!)
When the user clicks **"Yes, I’d love to! 💖"**, they are taken through **9 hilarious compatibility and date tasks**:
1. **Task 1: Contractual Obligation** — *"Are you 100% sure about this date with Tarun Tiwari?"* (Evasive button: *"Let me consult my lawyer 👨‍⚖️"*).
2. **Task 2: The French Fry Tax** — *"When Tarun orders French fries, what is your strategy?"* (Evasive button: *"I will steal all your fries 😈"*).
3. **Task 3: The 'Kuch Bhi' Trap** — *"When Tarun asks 'Where do you want to eat?', what do you say?"* (Evasive button: *"Anything... but not that, or that, or that 🚫"*).
4. **Task 4: AUX Cord Privileges** — *"Will you allow DJ Tarun to control the music in the car?"* (Evasive button: *"Hand over the AUX or I jump out 🚗💨"*).
5. **Task 5: Instagram Boyfriend Duty** — *"Will you judge Tarun if he takes 47 photos from 6 weird squatting angles?"* (Evasive button: *"Take 100 photos and zero are usable 🤳"*).
6. **Task 6: The Movie Sleep Trap** — *"If we watch a movie, do you promise not to fall asleep in the first 12 minutes?"* (Evasive button: *"I'm already sleeping zzz 😴"*).
7. **Task 7: Dad Joke Insurance** — *"When Tarun drops a notoriously terrible dad joke, how do you react?"* (Evasive button: *"Stare at you in complete disappointment 😐"*).
8. **Task 8: Dessert Showdown** — *"There is one single piece of chocolate lava cake remaining. What happens?"* (Evasive button: *"I devour the whole thing before you blink 🎂"*).
9. **Task 9: The Grand Finale** — *"Are you ready for the most unforgettable date of your life with Tarun?"* (Evasive button: *"I need 3 to 5 business days to prepare 📅"*).

- **Evasive Button on Every Task**: Each task features its own unique evasive button with witty comebacks and audio sound effects!
- **Interactive Sound Effects**: Custom synthesized Web Audio API sound effects (cartoon dodge "boing", success chimes, and celebration fanfare) without external MP3 files.
- **Progress & Level Tracker**: Dynamic progress bar, total dodge counter across tasks, funny milestone badges, and skip options.

### 3. Date Planner Wizard
- **Date & Time Selection**: Date picker (with past date protection) and time slot dropdown.
- **Curated Dining Venues**: Visual cards for dining options (Italian, Japanese, Brunch cafe, Modern Indian, Rooftop, or "Surprise Tarun").
- **Activity Suggestions**: Cards for sunset walks, dessert runs, movies, live music, arcade games, and stargazing drives.
- **Finishing Touches**: Outfit vibe selector, interactive budget slider (₹500 - ₹7,000+), personalized date recipient name, and sweet personal note for Tarun.

### 4. Official Confirmation & WhatsApp Sharing
- **Date Pass Summary**: Elegant boarding pass-style summary of the confirmed date details.
- **One-Click WhatsApp Sharing to Tarun (+91 9999841038)**: Directly launches WhatsApp (on mobile app or WhatsApp Web) with all customized date plan details pre-formatted and addressed to Tarun Tiwari!
- **Copy & Modify**: Easily copy the formatted plan to the clipboard or go back to modify any detail.

---

## 📁 Professional Project Structure

```text
date-confirmation-app/
├── index.html                           # App entry HTML with Tarun Tiwari metadata & favicon
├── package.json                         # Dependencies, scripts, and author metadata
├── vite.config.js                       # Vite configuration with React plugin
├── README.md                            # Comprehensive documentation
├── .gitignore                             # Clean repository ignore rules
└── src/
    ├── main.jsx                         # React 19 entry point with ThemeProvider & CssBaseline
    ├── App.jsx                          # Root orchestrator managing screens & state flow
    ├── styles.css                       # Responsive CSS, animations & backdrop filters
    │
    ├── theme/
    │   └── theme.js                     # Material UI theme palette, typography & overrides
    │
    ├── constants/
    │   ├── restaurants.js               # Restaurant options and details
    │   ├── activities.jsx               # Activities with Material UI icons
    │   ├── dressCodes.js                # Outfit vibes and time slots
    │   └── questions.js                 # 9 hilarious comedic tasks and evasive responses
    │
    ├── hooks/
    │   └── useMovingButton.js           # Reusable hook for dodging button logic & viewport bounds
    │
    ├── utils/
    │   └── soundEffects.js              # Synthesized Web Audio API sound effects (boing, chimes, fanfare)
    │
    └── components/
        ├── common/
        │   ├── FloatingHearts.jsx       # Floating background particle animation
        │   ├── Header.jsx               # Brand header with Tarun's badge & reset action
        │   ├── Footer.jsx               # Footer with author credits
        │   ├── MovingButton.jsx         # Reusable evasive moving button component
        │   └── NotificationSnackbar.jsx # Toast notifications for reactions & shares
        │
        ├── screens/
        │   ├── InviteScreen.jsx         # First screen: "Will you go on a date with Tarun?"
        │   ├── QuestionsScreen.jsx      # 9-step comedy challenge with moving button
        │   ├── PlannerScreen.jsx        # Date customization form
        │   └── ConfirmedScreen.jsx      # Final date summary pass & share buttons
        │
        └── planner/
            ├── DateTimePicker.jsx       # Date & time selection controls
            ├── RestaurantPicker.jsx     # Restaurant card picker
            ├── ActivityPicker.jsx       # Activity option picker
            └── FinalTouches.jsx         # Outfit, budget slider, notes & date's name
```

---

## 🚀 Getting Started

```bash
# 1. Navigate to the project directory
cd date-confirmation-app

# 2. Install dependencies (if not already installed)
npm install

# 3. Start local development server
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 👤 Author

**Tarun Tiwari**
- Project: Date Confirmation & Planner Web App
- Crafted with ❤️ and comedic flair.
