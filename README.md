# fitscout

**Your AI-powered outfit director.**

A fashion outfit recommender web app for event-based styling, built as a beginner-friendly React MVP.

## Features

- Describe your event (or paste an invite link) to get started
- Answer 3 quick style questions: event type, vibe, and constraints
- Get 3 curated outfit theme recommendations with editorial descriptions
- Refine results with one click: make it sexier, more casual, less expensive, and more
- Browse outfit components (top, bottom, outerwear, accessories, shoes) with 5 search links each across Google Shopping, Depop, ASOS, eBay, and Etsy

## Getting Started

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

## Tech Stack

- **React** (Vite scaffold)
- **No backend** – all matching logic runs client-side with mock data
- **No paid APIs** – search links use Google Shopping and open-web store URLs

## Project Structure

```
src/
  components/
    LandingScreen.jsx     # Event input screen
    InterviewScreen.jsx   # 3-question interview
    RecommendationScreen.jsx  # 3 outfit theme cards + refinement buttons
    OutputScreen.jsx      # Shopping links per outfit component
    LoadingScreen.jsx     # Animated loading state
  data/
    trends.js     # Mock trend database + outfit theme templates
    matcher.js    # Scoring/matching logic
  App.jsx         # Root component, screen routing, state management
  App.css         # All styles (editorial fashion aesthetic)
```
