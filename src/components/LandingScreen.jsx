/**
 * LandingScreen.jsx
 *
 * The first screen the user sees.
 * Contains a large text input and a "Style me." button.
 * Accepts either a plain-text event description or a URL
 * (URL is treated as plain text in v1 – no scraping).
 */

import { useState } from "react";

export default function LandingScreen({ onSubmit }) {
  const [value, setValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
  }

  return (
    <div className="landing-screen">
      {/* Wordmark / logo */}
      <div className="wordmark">fitscout</div>
      <p className="tagline">Your AI-powered outfit director.</p>

      <form onSubmit={handleSubmit} className="landing-form">
        <input
          className="event-input"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="What are you going to? Paste an invite link or describe the event."
          autoFocus
        />
        <button className="cta-btn" type="submit" disabled={!value.trim()}>
          Style me.
        </button>
      </form>

      <p className="landing-hint">
        Try: "rooftop birthday party in July" · "formal gallery opening Friday night" · "work happy hour"
      </p>
    </div>
  );
}
