/**
 * matcher.js
 *
 * Core matching logic: takes the user's event description, interview answers,
 * and optional refinement preference, then scores and returns the top 3 themes.
 */

import { outfitThemes, constraintModifiers, refinements } from "./trends";

// Price rank used for budget comparisons
const priceRank = { $: 1, $$: 2, $$$: 3 };

/**
 * scoreTheme
 * Returns a numeric score for how well a theme matches the user's input.
 *
 * @param {object} theme      – one entry from outfitThemes
 * @param {string} eventType  – selected event type
 * @param {string} vibe       – selected vibe
 * @param {string} constraint – selected constraint
 * @param {string[]} extraVibes – additional vibes injected by refinements
 * @returns {number}
 */
function scoreTheme(theme, eventType, vibe, constraint, extraVibes = []) {
  let score = 0;

  // +3 if the theme directly suits this event type
  if (theme.events.includes(eventType)) score += 3;

  // +2 if the theme's vibe list matches the user's chosen vibe
  const allVibes = [vibe, ...extraVibes];
  allVibes.forEach((v) => {
    if (theme.vibes.includes(v)) score += 2;
  });

  // Price boost/penalty from constraint
  const mod = constraintModifiers[constraint] || {};
  if (mod.priceBoost) {
    score += mod.priceBoost[theme.price] ?? 0;
  }
  // Hard filter: if "low budget" and theme is $$$, heavily penalise
  if (mod.maxPrice && priceRank[theme.price] > priceRank[mod.maxPrice]) {
    score -= 5;
  }

  // Refinement-level price cap
  if (extraVibes.__priceMax && priceRank[theme.price] > priceRank[extraVibes.__priceMax]) {
    score -= 5;
  }

  return score;
}

/**
 * getTopThemes
 * Main export. Returns the top 3 scored themes given user answers.
 *
 * @param {string} eventType   – "party" | "dinner" | etc.
 * @param {string} vibe        – "sexy" | "casual" | etc.
 * @param {string} constraint  – "low budget" | "no constraints" | etc.
 * @param {string|null} refinement – label from refinement buttons (optional)
 * @returns {object[]} – array of 3 theme objects (with added `score` field)
 */
export function getTopThemes(eventType, vibe, constraint, refinement = null) {
  // Build extra vibes from refinement
  let extraVibes = [];
  if (refinement && refinements[refinement]) {
    const mod = refinements[refinement];
    extraVibes = mod.addVibes || [];
    // Attach price max as a pseudo-property so scoreTheme can use it
    if (mod.maxPrice) extraVibes.__priceMax = mod.maxPrice;
  }

  // Score every theme
  const scored = outfitThemes.map((theme) => ({
    ...theme,
    score: scoreTheme(theme, eventType, vibe, constraint, extraVibes),
  }));

  // Sort descending by score, then return top 3
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 3);
}

/**
 * buildSearchLinks
 * For a chosen theme, builds an array of outfit component objects,
 * each containing a Google Shopping search link.
 *
 * @param {object} theme       – a theme object from outfitThemes
 * @param {string} constraint  – user's constraint (may modify shoe label)
 * @returns {object[]}
 */
export function buildSearchLinks(theme, constraint = "no constraints") {
  const mod = constraintModifiers[constraint] || {};

  // Component order and display names
  const componentOrder = ["top", "bottom", "outerwear", "accessories", "shoes"];

  return componentOrder.map((key) => {
    const comp = theme.components[key];

    // Adjust shoe label for "comfortable shoes" constraint
    let query = comp.query;
    if (key === "shoes" && mod.shoeNote) {
      query = query.replace(/(heel|boot)/i, "flat $1");
    }

    // Each component generates 5 search links across different stores
    const stores = [
      { name: "Google Shopping", url: `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(query)}` },
      { name: "Depop", url: `https://www.depop.com/search/?q=${encodeURIComponent(query)}` },
      { name: "ASOS", url: `https://www.asos.com/search/?q=${encodeURIComponent(query)}` },
      { name: "eBay", url: `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(query)}` },
      { name: "Etsy", url: `https://www.etsy.com/search?q=${encodeURIComponent(query)}` },
    ];

    return {
      key,
      label: comp.label,
      reason: buildReason(key, theme),
      links: stores,
    };
  });
}

/**
 * buildReason
 * Returns a short copy line explaining why this component works in the theme.
 */
function buildReason(componentKey, theme) {
  const reasons = {
    top: `Anchors the ${theme.name} look with the right texture and silhouette.`,
    bottom: `Grounds the outfit and balances the overall proportions.`,
    outerwear: `Adds structure and layers that pull the full look together.`,
    accessories: `The finishing detail that elevates the outfit from good to memorable.`,
    shoes: `The foundation—good shoes make or break the whole aesthetic.`,
  };
  return reasons[componentKey] || "A key piece for this look.";
}
