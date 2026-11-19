# Globio A1 ReadyCheck — Diagnostic Assessment MVP

> **Know where you stand before you book your German A1 exam.**

**Globio A1 ReadyCheck** is a production-quality, responsive diagnostic web application designed for German A1 learners who have completed or are finishing beginner coursework and are deciding whether to book an official proficiency examination (such as the **Goethe-Zertifikat A1: Start Deutsch 1** or the **ÖSD Zertifikat A1**).

---

## 🎯 Product Context & Educational Objective

Booking an official A1 language exam costs significant fees (typically €100–€180). Many learners overestimate their readiness based on general classroom comfort or course completion certificates, while concealing critical knowledge gaps in basic grammar, word gender, or everyday reading comprehension.

**Globio A1 ReadyCheck** provides a concise 5–7 minute formative learning diagnostic:
1. **12 authentic German A1 questions** across three core foundational skills:
   - **Vocabulary (Wortschatz)**: 4 questions (everyday food, workplaces, family relations, time expressions)
   - **Grammar (Grammatik)**: 4 questions (regular/irregular verb conjugations, nominative articles, accusative direct objects, modal verbs and sentence bracket *Satzklammer*)
   - **Reading (Leseverstehen)**: 4 questions with authentic short texts (invitations, clinic opening hours, train platform announcements, everyday SMS messages)
2. **Deterministic Diagnostic Scoring**:
   - Skill Score = $(\text{Correct} / 4) \times 100$
   - Overall Score = Arithmetic mean of the 3 skills rounded to the nearest integer
   - Diagnostic Bands:
     - `80–100`: **Strong Foundation**
     - `65–79`: **Getting Close**
     - `0–64`: **Needs More Practice**
   - **Skill Safeguard**: Any individual skill scoring $< 60\%$ (i.e. $\le 50\%$) immediately triggers a prominent critical gap alert, ensuring an overall decent average never hides a failing skill.
3. **Deterministic Prioritized Practice Recommendations**:
   - Ranks weak skills in ascending order with strict tie-breaking: **Grammar $\to$ Vocabulary $\to$ Reading**.
   - Directly maps incorrect questions to targeted A1 revision topics with German example sentences and drills.
4. **Transparent Question Review**:
   - Filterable by All, Missed, and Correct.
   - Complete grammatical explanations for every question.
5. **Clear Product Boundaries**:
   - Clearly discloses that listening (*Hören*), speaking (*Sprechen*), and writing (*Schreiben*) are **not assessed**.
   - Does not claim to guarantee an exam pass or predict official test results.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: React 18 + TypeScript + Vite 5
- **Styling**: Tailwind CSS with custom forest green design system (`#1B4332`), sage accents, warm stone surfaces, and accessible focus rings
- **Icons**: Lucide React
- **State Management**: React Context + `useReducer` managing pure state transitions (`NOT_STARTED` $\to$ `IN_PROGRESS` $\to$ `REVIEW` $\to$ `COMPLETED`)
- **Testing**: Vitest + React Testing Library + `@testing-library/jest-dom`
- **Deployment**: Vercel-ready with `vercel.json` SPA routing

```
src/
├── types/
│   ├── assessment.ts          # Core interfaces for questions, options, skills, and reducer actions
│   └── scoring.ts             # Result, SkillScore, DiagnosticBand, Recommendation interfaces
├── data/
│   └── questionBank.ts        # 12 vetted A1 questions separated cleanly from UI
├── services/
│   ├── scoringEngine.ts       # Pure functions for skill percentages, rounding, and score bands
│   └── recommendationEngine.ts# Deterministic rule-based priority engine with tie-breakers
├── context/
│   └── AssessmentContext.tsx  # Assessment state machine & reducer
├── components/
│   ├── common/                # Header, Footer, ProgressBar, Badge
│   ├── landing/               # HeroSection, SkillGrid, DisclaimerCard
│   ├── assessment/            # QuestionCard, OptionList, NavigationBar
│   ├── review/                # ReviewScreen (summary grid, answered status, confirm modal)
│   └── results/               # ScoreOverview, SkillBreakdown, RecommendationList, QuestionReview, NextStepsAdvice
├── tests/
│   ├── setup.ts               # Test environment configuration
│   ├── scoringEngine.test.ts  # 100%, 0%, mixed, rounding, and safeguard tests
│   ├── recommendationEngine.test.ts # Priority, tie-breaking, and topic mapping tests
│   └── assessmentFlow.test.tsx# Integration tests for answer preservation, review, and retake
├── App.tsx                    # Main flow orchestrator
└── main.tsx                   # React DOM entrypoint
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or later (v20+ recommended)
- **npm**: v9.0.0 or later

### Installation

```bash
# Clone or navigate to the repository
cd Readiness

# Install dependencies
npm install
```

### Running Locally

```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧪 Testing

The test suite validates scoring accuracy, diagnostic band boundaries, safeguard alerts, recommendation tie-break orders, and user interaction flows:

```bash
# Run tests once
npm run test

# Run tests in watch mode
npm run test:watch
```

Test coverage includes:
- ✅ **100% Correct**: Validates perfect scores, "Strong Foundation" band, and exam readiness recommendations.
- ✅ **0% Correct**: Validates zero scores, "Needs More Practice" band, and triggers safeguards across all 3 skills.
- ✅ **Mixed Scores & Rounding**: Verifies arithmetic mean rounding (e.g., 66.6% rounds to 67%) and weak skill isolation.
- ✅ **Skill Safeguard**: Confirms that any skill $< 60\%$ flags critical alerts regardless of overall score.
- ✅ **Tie-Breaking Order**: Proves Grammar $\to$ Vocabulary $\to$ Reading tie-breaker order when skill scores match.
- ✅ **Navigation & Persistence**: Verifies answers are preserved when navigating backward and forward.
- ✅ **Incomplete Submission Guard**: Enforces that assessments cannot be submitted until all 12 questions are answered.
- ✅ **Retake / Reset**: Ensures resetting generates a fresh session ID and clears old answers.

---

## 📦 Production Build

```bash
npm run build
```
Generates optimized, minified production assets in the `dist/` folder.

To preview the production build locally:
```bash
npm run preview
```

---

## 🌐 Deploying to Vercel

The application is pre-configured for Vercel deployment:
- `vercel.json` provides client-side SPA routing rewrites.
- The project can be deployed using the [Vercel CLI](https://vercel.com/cli) or by importing the repository into the Vercel dashboard:

```bash
# Deploy with Vercel CLI
npx vercel
```

---

## ⚖️ License & Disclaimers

**Educational Use Only**:
This product is an independent diagnostic learning aid created for German language learners. It is not affiliated with, endorsed by, or accredited by the Goethe-Institut, ÖSD, or telc GmbH.
