/**
 * OutputScreen.jsx
 *
 * The final screen shown after the user selects a theme.
 * Displays outfit components (top, bottom, outerwear, accessories, shoes)
 * each with:
 *  - Item label
 *  - Short reason it works
 *  - 5 search links (Google Shopping, Depop, ASOS, eBay, Etsy)
 */

export default function OutputScreen({ theme, components, onBack }) {
  // Map component key to a friendly display name and emoji
  const componentMeta = {
    top:         { label: "Top",        emoji: "👕" },
    bottom:      { label: "Bottom",     emoji: "👖" },
    outerwear:   { label: "Outerwear",  emoji: "🧥" },
    accessories: { label: "Accessories",emoji: "💍" },
    shoes:       { label: "Shoes",      emoji: "👟" },
  };

  return (
    <div className="output-screen">
      {/* Header */}
      <div className="output-header">
        <h2 className="section-heading">
          Shopping for: <span className="theme-title-inline">{theme.name}</span>
        </h2>
        <p className="output-sub">
          Tap any link to search across stores. All links open in a new tab.
        </p>
      </div>

      {/* Component cards */}
      <div className="component-cards">
        {components.map((comp) => {
          const meta = componentMeta[comp.key] || { label: comp.key, emoji: "✨" };
          return (
            <div key={comp.key} className="component-card">
              <div className="comp-header">
                <span className="comp-emoji">{meta.emoji}</span>
                <div>
                  <h4 className="comp-category">{meta.label}</h4>
                  <p className="comp-item-label">{comp.label}</p>
                </div>
              </div>
              <p className="comp-reason">{comp.reason}</p>

              {/* 5 store links */}
              <div className="store-links">
                {comp.links.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="store-link"
                  >
                    {link.name} →
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Start over */}
      <button className="back-btn" onClick={onBack}>
        ← Start over
      </button>
    </div>
  );
}
