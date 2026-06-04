/**
 * App.jsx
 *
 * Root component. Manages global state and routes between screens:
 *
 *  landing      → user types event description
 *  interview    → user answers 3 questions
 *  loading      → brief animated transition
 *  recommend    → shows 3 outfit themes; user can refine or select
 *  output       → shows shopping links for the selected theme
 *
 * State is kept simple—no external state library needed for this MVP.
 */

import { useState, useCallback } from "react";
import LandingScreen from "./components/LandingScreen";
import InterviewScreen from "./components/InterviewScreen";
import RecommendationScreen from "./components/RecommendationScreen";
import OutputScreen from "./components/OutputScreen";
import LoadingScreen from "./components/LoadingScreen";
import { getTopThemes, buildSearchLinks } from "./data/matcher";
import "./App.css";

// Possible app screens
const SCREENS = {
  LANDING: "landing",
  INTERVIEW: "interview",
  LOADING: "loading",
  RECOMMEND: "recommend",
  OUTPUT: "output",
};

export default function App() {
  // Which screen is visible
  const [screen, setScreen] = useState(SCREENS.LANDING);

  // The raw event text the user entered on the landing screen
  const [eventPrompt, setEventPrompt] = useState("");

  // Answers from the interview: { eventType, vibe, constraint }
  const [answers, setAnswers] = useState({});

  // Top 3 scored themes shown on the recommendation screen
  const [themes, setThemes] = useState([]);

  // The refinement label currently applied (or null)
  const [refinement, setRefinement] = useState(null);

  // The theme the user selected
  const [selectedTheme, setSelectedTheme] = useState(null);

  // Outfit component objects (with search links) for the output screen
  const [components, setComponents] = useState([]);

  // ─── Handlers ──────────────────────────────────────────────────────────────

  /** User submits the event prompt on the landing screen */
  function handleEventSubmit(prompt) {
    setEventPrompt(prompt);
    setScreen(SCREENS.INTERVIEW);
  }

  /** User finishes all 3 interview questions */
  function handleInterviewComplete(interviewAnswers) {
    setAnswers(interviewAnswers);
    runMatchingWithLoading(interviewAnswers, null);
  }

  /**
   * Shows a loading screen briefly, then runs the matching logic.
   * @param {object} interviewAnswers – { eventType, vibe, constraint }
   * @param {string|null} refine      – refinement label or null
   */
  const runMatchingWithLoading = useCallback((interviewAnswers, refine) => {
    setScreen(SCREENS.LOADING);
    // Simulate a brief "thinking" pause before showing results
    setTimeout(() => {
      const top3 = getTopThemes(
        interviewAnswers.eventType,
        interviewAnswers.vibe,
        interviewAnswers.constraint,
        refine
      );
      setThemes(top3);
      setRefinement(refine);
      setScreen(SCREENS.RECOMMEND);
    }, 1600);
  }, []);

  /** User clicks a refinement button */
  function handleRefine(label) {
    runMatchingWithLoading(answers, label);
  }

  /** User selects one of the 3 themes */
  function handleSelectTheme(theme) {
    const comps = buildSearchLinks(theme, answers.constraint);
    setSelectedTheme(theme);
    setComponents(comps);
    setScreen(SCREENS.OUTPUT);
  }

  /** User clicks "Start over" */
  function handleReset() {
    setScreen(SCREENS.LANDING);
    setEventPrompt("");
    setAnswers({});
    setThemes([]);
    setRefinement(null);
    setSelectedTheme(null);
    setComponents([]);
  }

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="app-wrapper">
      {screen === SCREENS.LANDING && (
        <LandingScreen onSubmit={handleEventSubmit} />
      )}

      {screen === SCREENS.INTERVIEW && (
        <InterviewScreen
          eventPrompt={eventPrompt}
          onComplete={handleInterviewComplete}
        />
      )}

      {screen === SCREENS.LOADING && <LoadingScreen />}

      {screen === SCREENS.RECOMMEND && (
        <RecommendationScreen
          themes={themes}
          answers={answers}
          onSelectTheme={handleSelectTheme}
          onRefine={handleRefine}
          refinement={refinement}
        />
      )}

      {screen === SCREENS.OUTPUT && selectedTheme && (
        <OutputScreen
          theme={selectedTheme}
          components={components}
          onBack={handleReset}
        />
      )}
    </div>
  );
}
