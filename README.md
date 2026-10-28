# PrankLab — The Internet's Funniest Little Playground 😂💘

**PrankLab** is a creative playground and interactive web hub showcasing **12 independent mini-websites**, featuring hilarious pranks, romantic experiments, savage roasts, and things you definitely shouldn't take seriously.

Created & Developed by **Tarun Tiwari**.

---

## 🎪 The 12 Interactive Mini-Projects

| # | Project Name | Route | Category | Description |
|---|---|---|---|---|
| **1** | **Date Planner 💕** | `/projects/date-planner` | Dating & Romance | The original classic with 9 compatibility challenges, romantic calendar, and instant WhatsApp booking with Tarun Tiwari (+91 9999841038). |
| **2** | **The Impossible No Website 💘** | `/projects/impossible-no` | Romantic Prank | A date invitation where the "No" button runs away and the "Yes" button grows bigger after every failed attempt. |
| **3** | **Roast My Friend 🔥** | `/projects/roast-my-friend` | Comedy & Roasting | Enter your friend's name, choose their fatal flaw (Lazy Legend, Gym Bro, etc.), and receive an algorithmic roast with a burn scorecard. |
| **4** | **Decide My Life for Me 🎡** | `/projects/decision-wheel` | Random Chaos | Animated canvas spinning wheel for food, movies, weekend plans, or custom choices. Appeals are strictly closed. |
| **5** | **Apply to Be My Best Friend 😂** | `/projects/best-friend-application` | Friendship Prank | Corporate HR friendship application with aptitude tests, fry tax policies, and official certified friendship passes or hilarious rejection letters. |
| **6** | **What Kind of Red Flag Are You? 🚩** | `/projects/red-flag-quiz` | Personality Quiz | 10 completely unscientific questions revealing your chaotic archetype (Professional Overthinker, Reply-Destroyer, etc.). |
| **7** | **Sorry Generator 🥹** | `/projects/sorry-generator` | Messages & Mischief | Multiple apology styles (Puppy Eyes, Oscar Dramatic, Corporate Legal, Bollywood Filmy, Brutally Honest) for every mess-up. |
| **8** | **Couple Compatibility Lab 💑** | `/projects/couple-compatibility` | Couples & Romance | Analyze couple dynamics (AC temperature cold war, dessert showdown, get-ready time) to calculate compatibility with fictional relationship stats. |
| **9** | **The World's Worst Productivity App 💻** | `/projects/productivity-parody` | Office Comedy | Track your procrastination by logging every creative way you avoid actual work, unlocking slacker achievements. |
| **10** | **Ex Text Decoder 📱** | `/projects/ex-text-decoder` | Texting & Relationships | Paste a 1-word text like "k" and receive a dramatic FBI/Bollywood forensic breakdown with threat level meters. |
| **11** | **Excuse Generator 🤥** | `/projects/excuse-generator` | Everyday Pranks | Creative excuses for being late, missing calls, or skipping family gatherings (Believable, Sci-Fi, Bollywood, Absurd) with a vault to save favorites. |
| **12** | **Compliment Machine ✨** | `/projects/compliment-machine` | Wholesome Chaos | An automated dispenser giving you the compliments your inner critic forgot to deliver, with daily tracking and sharing. |

---

## 🛠️ Technology Stack

- **Framework**: React 19 + Vite
- **Routing**: React Router DOM (HashRouter for 100% reliable GitHub Pages & static hosting deep-linking)
- **UI Components**: Material UI (MUI v7) & Emotion
- **Animations & Effects**: Canvas Confetti, Web Audio API sound synthesis, custom CSS keyframe animations
- **State & Storage**: LocalStorage for preferences, compliment counters, roast history, and light/dark theme persistence
- **Performance**: Code-split with `React.lazy()` and `Suspense` for lightning-fast loading

---

## 📁 Project Architecture & Folder Structure

```text
date-confirmation-app/
├── index.html                                 # PrankLab entry HTML
├── package.json                               # Dependencies & scripts
├── vite.config.js                             # Vite configuration with relative base './'
├── README.md                                  # Comprehensive documentation
├── .github/
│   └── workflows/
│       └── deploy.yml                         # Automated GitHub Pages CI/CD workflow
└── src/
    ├── main.jsx                               # App root with ThemeModeProvider
    ├── App.jsx                                # HashRouter & Suspense route definitions
    ├── styles.css                             # Global styling, keyframes & animations
    │
    ├── context/
    │   └── ThemeContext.jsx                   # Dark/Light theme mode provider & LocalStorage sync
    │
    ├── data/
    │   └── projectsData.js                    # Centralized project catalog & metadata
    │
    ├── utils/
    │   ├── confettiHelper.js                  # Particle celebration triggers
    │   └── soundEffects.js                    # Web Audio API synthesized sounds (boing, chimes, fanfare)
    │
    ├── hooks/
    │   └── useMovingButton.js                 # Reusable evasive button physics & bounds
    │
    ├── components/
    │   ├── common/
    │   │   ├── ProjectLayout.jsx              # Reusable project wrapper (top bar, reset, audio toggle)
    │   │   ├── MovingButton.jsx               # Portal-rendered evasive button
    │   │   ├── FloatingHearts.jsx             # Background particle animation
    │   │   ├── Header.jsx                     # Date planner branding
    │   │   ├── Footer.jsx                     # Date planner footer
    │   │   └── NotificationSnackbar.jsx       # Alert snackbars
    │   │
    │   └── hub/
    │       ├── HomePage.jsx                   # PrankLab main landing page
    │       ├── Navbar.jsx                     # Top navigation, random project button, mobile drawer
    │       ├── HeroSection.jsx                # Hero heading, CTAs, featured project card
    │       ├── ProjectGrid.jsx                # Filterable & searchable 3-column project grid
    │       ├── ProjectCard.jsx                # Individual visual card with badges & chaos meter
    │       ├── AboutModal.jsx                 # About & Code of Conduct modal
    │       └── Footer.jsx                     # Hub footer & credits
    │
    └── projects/
        ├── DatePlanner/                       # Project 1: Date Planner (Original Classic)
        ├── ImpossibleNo/                      # Project 2: The Impossible No Website
        ├── RoastMyFriend/                     # Project 3: Roast My Friend
        ├── DecisionWheel/                     # Project 4: Decide My Life for Me
        ├── BestFriendApp/                     # Project 5: Apply to Be My Best Friend
        ├── RedFlagQuiz/                       # Project 6: What Kind of Red Flag Are You?
        ├── SorryGenerator/                    # Project 7: Sorry Generator
        ├── CoupleCompatibility/               # Project 8: Couple Compatibility Lab
        ├── ProductivityParody/                # Project 9: The World's Worst Productivity App
        ├── ExTextDecoder/                     # Project 10: Ex Text Decoder
        ├── ExcuseGenerator/                   # Project 11: Excuse Generator
        └── ComplimentMachine/                 # Project 12: Compliment Machine
```

---

## 🚀 Running Locally

```bash
# 1. Open the project folder
cd "C:\Users\tarun.tiwari\Downloads\date-confirmation-app\date-confirmation-app"

# 2. Install dependencies (if needed)
npm install

# 3. Start local Vite development server
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 🌐 Deploying to a Live Public URL

### Option A: Vercel (Fastest & 1-Click)
1. Go to **[vercel.com](https://vercel.com)** and sign in with GitHub.
2. Click **"Add New Project"** and select **`My-Project`** (by `Tarun-tt`).
3. Click **"Deploy"**. Your app will be live in 25 seconds with a custom `.vercel.app` URL!

### Option B: GitHub Pages (Automatic on Push)
The repository is already configured with an automated GitHub Action workflow (`.github/workflows/deploy.yml`):
```bash
git add .
git commit -m "Upgrade to PrankLab Hub with 12 interactive projects"
git push origin main
```
In your GitHub repo:
1. Go to **Settings** → **Pages**.
2. Select **Source: GitHub Actions**.
3. It will publish automatically to `https://tarun-tt.github.io/My-Project/`!

---

## 👤 Author & Credits

**Tarun Tiwari**
- Creator & Lead Developer
- Project: PrankLab — The Internet's Funniest Little Playground 😂
