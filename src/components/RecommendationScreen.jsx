/**
 * RecommendationScreen.jsx
 *
 * Shows the top 3 outfit theme recommendations returned by the matcher.
 * Each card displays:
 *  - Theme name
 *  - 2-sentence description
 *  - Vibe tags
 *  - Why it fits the event
 *  - Price level: $, $$, or $$$
 *
 * The user can:
 *  - Click a refinement button to re-run the matching with a new preference
 *  - Select a theme to proceed to the output/links screen
 */

// Refinement button labels (order matters for layout)
const REFINEMENT_BUTTONS = [
  "Make it sexier",
  "Make it more casual",
  "Make it less expensive",
  "Make it more masc",
  "Make it more femme",
  "Use items I own",
];

export default function RecommendationScreen({
  themes,          // array of 3 theme objects from matcher
  answers,         // { eventType, vibe, constraint }
  onSelectTheme,   // called with selected theme object
  onRefine,        // called with refinement label string
  refinement,      // currently active refinement label (or null)
}) {
  return (
    <div className="recommendation-screen">
      <h2 className="section-heading">Your looks.</h2>
      <p className="section-sub">
        Based on: <strong>{answers.eventType}</strong> · <strong>{answers.vibe}</strong> ·{" "}
        <strong>{answers.constraint}</strong>
      </p>

      {/* 3 Theme Cards */}
      <div className="theme-cards">
        {themes.map((theme) => (
          <ThemeCard
            key={theme.id}
            theme={theme}
            onSelect={() => onSelectTheme(theme)}
          />
        ))}
      </div>

      {/* Refinement buttons */}
      <div className="refinement-section">
        <p className="refinement-label">Not quite right? Adjust the direction:</p>
        <div className="refinement-buttons">
          {REFINEMENT_BUTTONS.map((label) => (
            <button
              key={label}
              className={`refinement-btn ${refinement === label ? "refinement-btn-active" : ""}`}
              onClick={() => onRefine(label)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ThemeCard ─────────────────────────────────────────────────────────────────
function ThemeCard({ theme, onSelect }) {
  return (
    <div className="theme-card">
      {/* Price badge */}
      <span className="price-badge">{theme.price}</span>

      <h3 className="theme-name">{theme.name}</h3>
      <p className="theme-description">{theme.description}</p>

      {/* Vibe tags */}
      <div className="theme-tags">
        {theme.vibeTags.map((tag) => (
          <span key={tag} className="vibe-tag">
            {tag}
          </span>
        ))}
      </div>

      {/* Why it fits */}
      <p className="theme-why">
        <span className="why-label">Why it works → </span>
        Scored for <em>{theme.vibes.slice(0, 2).join(" · ")}</em> vibes at a{" "}
        <em>{theme.events[0]}</em>.
      </p>

      <button className="select-theme-btn" onClick={onSelect}>
        Shop this look →
      </button>
    </div>
  );
}
