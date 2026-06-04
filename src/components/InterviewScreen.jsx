/**
 * InterviewScreen.jsx
 *
 * Asks the user exactly 3 follow-up questions:
 *  1. What kind of event is this?
 *  2. What vibe do you want?
 *  3. Any constraints?
 *
 * Each question shows a set of pill/chip options.
 * The user taps one to select it, then taps "Next".
 */

import { useState } from "react";

// ─── Question Definitions ─────────────────────────────────────────────────────
const QUESTIONS = [
  {
    id: "eventType",
    prompt: "What kind of event is this?",
    options: [
      "party",
      "dinner",
      "wedding",
      "work event",
      "date",
      "concert",
      "festival",
      "gallery/art event",
      "other",
    ],
  },
  {
    id: "vibe",
    prompt: "What vibe do you want?",
    options: [
      "sexy",
      "casual",
      "polished",
      "masc",
      "femme",
      "experimental",
      "understated",
      "bold",
    ],
  },
  {
    id: "constraint",
    prompt: "Any constraints?",
    options: [
      "low budget",
      "comfortable shoes",
      "cold weather",
      "warm weather",
      "use items I own",
      "no constraints",
    ],
  },
];

export default function InterviewScreen({ eventPrompt, onComplete }) {
  // currentStep tracks which question (0-2) we're on
  const [currentStep, setCurrentStep] = useState(0);
  // answers stores { eventType, vibe, constraint }
  const [answers, setAnswers] = useState({});
  // selectedOption tracks the highlighted choice for the current question
  const [selectedOption, setSelectedOption] = useState(null);

  const question = QUESTIONS[currentStep];

  function handleSelect(option) {
    setSelectedOption(option);
  }

  function handleNext() {
    if (!selectedOption) return;

    const newAnswers = { ...answers, [question.id]: selectedOption };
    setAnswers(newAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      // Move to next question
      setCurrentStep(currentStep + 1);
      setSelectedOption(null);
    } else {
      // All questions answered – call parent with results
      onComplete(newAnswers);
    }
  }

  // Progress indicator dots
  const progress = QUESTIONS.map((_, i) => (
    <span
      key={i}
      className={`progress-dot ${i < currentStep ? "done" : ""} ${i === currentStep ? "active" : ""}`}
    />
  ));

  return (
    <div className="interview-screen">
      <div className="interview-card">
        {/* Step counter */}
        <div className="step-meta">
          <span className="step-label">
            {currentStep + 1} / {QUESTIONS.length}
          </span>
          <div className="progress-dots">{progress}</div>
        </div>

        {/* The event prompt the user entered, shown as context */}
        <p className="event-context">
          <span className="event-context-label">Event:</span> {eventPrompt}
        </p>

        {/* Question */}
        <h2 className="question-text">{question.prompt}</h2>

        {/* Option chips */}
        <div className="option-chips">
          {question.options.map((opt) => (
            <button
              key={opt}
              className={`chip ${selectedOption === opt ? "chip-selected" : ""}`}
              onClick={() => handleSelect(opt)}
            >
              {opt}
            </button>
          ))}
        </div>

        <button
          className="cta-btn"
          onClick={handleNext}
          disabled={!selectedOption}
        >
          {currentStep < QUESTIONS.length - 1 ? "Next →" : "Find my look →"}
        </button>
      </div>
    </div>
  );
}
