/**
 * LoadingScreen.jsx
 *
 * A simple, fashionable loading state shown between screens.
 * Rotates through editorial-style copy lines.
 */

import { useEffect, useState } from "react";

// Copy lines that cycle while data is being "processed"
const LOADING_LINES = [
  "Reading the room…",
  "Pulling references…",
  "Checking the archives…",
  "Scanning the runways…",
  "Consulting the mood board…",
  "Almost dressed…",
];

export default function LoadingScreen() {
  const [lineIndex, setLineIndex] = useState(0);

  // Cycle through lines every 700ms
  useEffect(() => {
    const interval = setInterval(() => {
      setLineIndex((prev) => (prev + 1) % LOADING_LINES.length);
    }, 700);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-screen">
      <div className="loading-dot-row">
        <span className="loading-dot d1" />
        <span className="loading-dot d2" />
        <span className="loading-dot d3" />
      </div>
      <p className="loading-text">{LOADING_LINES[lineIndex]}</p>
    </div>
  );
}
