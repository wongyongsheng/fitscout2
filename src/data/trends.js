/**
 * trends.js
 *
 * Mock trend database inspired by fashion sources:
 * Vogue, GQ, Highsnobiety, Hypebeast, The Cut, Who What Wear,
 * Elle, Harper's Bazaar, Refinery29, Nylon, Fashionista,
 * Lyst, Depop, eBay, Etsy, and Reddit fashion communities.
 *
 * Each trend tag maps to vibes, events, and component keywords
 * used later when generating outfit themes and search links.
 */

// ─── Trend Tags ──────────────────────────────────────────────────────────────
// Each entry:
//   vibes    – which "vibe" answers it pairs well with
//   events   – which event types it suits
//   keywords – clothing keywords used in Google search links
//   price    – '$' | '$$' | '$$$'

export const trendTags = {
  "sheer layers": {
    vibes: ["sexy", "femme", "experimental", "bold"],
    events: ["party", "dinner", "gallery/art event", "date", "concert"],
    keywords: ["sheer overlay top", "mesh long sleeve", "sheer blouse"],
    price: "$$",
  },
  "oversized tailoring": {
    vibes: ["polished", "masc", "understated", "casual"],
    events: ["work event", "dinner", "gallery/art event", "wedding"],
    keywords: ["oversized blazer", "wide leg trousers", "boxy suit jacket"],
    price: "$$",
  },
  "leather accents": {
    vibes: ["bold", "sexy", "masc", "experimental"],
    events: ["concert", "party", "date", "festival"],
    keywords: ["leather moto jacket", "faux leather pants", "leather mini skirt"],
    price: "$$",
  },
  "metallic accessories": {
    vibes: ["bold", "femme", "sexy", "experimental"],
    events: ["party", "concert", "wedding", "dinner"],
    keywords: ["silver chain belt", "gold cuff bracelet", "metallic clutch bag"],
    price: "$",
  },
  "relaxed luxury": {
    vibes: ["casual", "understated", "polished"],
    events: ["dinner", "gallery/art event", "date", "work event"],
    keywords: ["cashmere sweater", "silk wide leg pants", "linen blazer"],
    price: "$$$",
  },
  "dark romantic": {
    vibes: ["femme", "bold", "experimental", "sexy"],
    events: ["dinner", "date", "gallery/art event", "concert"],
    keywords: ["velvet midi dress", "lace bodysuit", "dark floral wrap dress"],
    price: "$$",
  },
  "sporty-prep": {
    vibes: ["casual", "masc", "understated"],
    events: ["work event", "concert", "festival", "other"],
    keywords: ["polo shirt", "pleated chino pants", "track jacket"],
    price: "$",
  },
  "Y2K clubwear": {
    vibes: ["bold", "femme", "sexy", "experimental"],
    events: ["party", "concert", "festival"],
    keywords: ["low rise flare jeans", "halter crop top", "butterfly print mini"],
    price: "$",
  },
  "utilitywear": {
    vibes: ["casual", "masc", "understated", "experimental"],
    events: ["festival", "concert", "other"],
    keywords: ["cargo pants", "utility vest", "technical bomber jacket"],
    price: "$",
  },
  "monochrome minimalism": {
    vibes: ["understated", "polished", "masc"],
    events: ["work event", "dinner", "gallery/art event", "date"],
    keywords: ["all black outfit", "tonal grey set", "cream minimalist look"],
    price: "$$",
  },
  "statement boots": {
    vibes: ["bold", "experimental", "femme", "masc"],
    events: ["concert", "party", "date", "gallery/art event"],
    keywords: ["square toe boots", "platform chelsea boots", "knee high boots"],
    price: "$$",
  },
  "soft tailoring": {
    vibes: ["polished", "femme", "understated"],
    events: ["work event", "wedding", "dinner", "gallery/art event"],
    keywords: ["soft suit blazer", "wide leg dress pants", "oversized button shirt"],
    price: "$$",
  },
  "vintage denim": {
    vibes: ["casual", "masc", "understated", "experimental"],
    events: ["date", "concert", "festival", "other"],
    keywords: ["vintage wash jeans", "denim jacket", "raw hem denim"],
    price: "$",
  },
  "cropped outerwear": {
    vibes: ["bold", "femme", "experimental", "sexy"],
    events: ["party", "dinner", "concert", "date"],
    keywords: ["cropped leather jacket", "cropped blazer", "cropped trench coat"],
    price: "$$",
  },
};

// ─── Outfit Theme Templates ───────────────────────────────────────────────────
// Pre-written themes that are scored and ranked against user inputs.
// Each theme contains:
//   name        – display name
//   description – 2-sentence editorial description
//   vibeTags    – trend tags this theme uses
//   vibes       – vibe answers it resonates with
//   events      – event types it suits
//   price       – '$' | '$$' | '$$$'
//   components  – outfit components with item labels and search queries

export const outfitThemes = [
  {
    id: "dark-gallery-romantic",
    name: "Dark Gallery Romantic",
    description:
      "Rich textures meet moody palette in a look that feels both intellectual and alluring. Think velvet, lace, and deep jewel tones that command a room without trying.",
    vibeTags: ["dark romantic", "sheer layers", "statement boots"],
    vibes: ["femme", "bold", "experimental", "sexy"],
    events: ["dinner", "date", "gallery/art event", "concert"],
    price: "$$",
    components: {
      top: { label: "Velvet or lace bodysuit", query: "black lace bodysuit" },
      bottom: { label: "Velvet midi skirt", query: "velvet midi skirt dark" },
      outerwear: { label: "Oversized blazer in black", query: "oversized black blazer women" },
      accessories: { label: "Gold statement earrings", query: "gold statement drop earrings" },
      shoes: { label: "Square-toe ankle boots", query: "square toe ankle boots black" },
    },
  },
  {
    id: "relaxed-luxe-dinner",
    name: "Relaxed Luxe Dinner Fit",
    description:
      "Elevated basics in luxurious fabrics—silk, cashmere, or satin—styled with quiet confidence. This look says effort without looking like you tried.",
    vibeTags: ["relaxed luxury", "monochrome minimalism", "soft tailoring"],
    vibes: ["polished", "understated", "casual"],
    events: ["dinner", "work event", "gallery/art event", "date"],
    price: "$$$",
    components: {
      top: { label: "Silk or satin blouse", query: "silk satin blouse women" },
      bottom: { label: "Wide-leg dress pants", query: "wide leg dress pants women" },
      outerwear: { label: "Cashmere or wool coat", query: "cashmere coat women" },
      accessories: { label: "Minimalist watch or cuff", query: "minimalist gold cuff bracelet" },
      shoes: { label: "Pointed-toe heels or loafers", query: "pointed toe leather loafer women" },
    },
  },
  {
    id: "masc-club-uniform",
    name: "Masc Club Uniform",
    description:
      "Clean lines, dark tones, and just enough edge to turn heads on the dancefloor. Masculine silhouettes with a sleek, put-together energy.",
    vibeTags: ["oversized tailoring", "leather accents", "monochrome minimalism"],
    vibes: ["masc", "bold", "understated", "polished"],
    events: ["party", "concert", "dinner", "date"],
    price: "$$",
    components: {
      top: { label: "Black fitted crewneck or turtleneck", query: "black fitted turtleneck men" },
      bottom: { label: "Slim tailored trousers", query: "slim tailored trousers men black" },
      outerwear: { label: "Leather or faux-leather jacket", query: "black leather jacket men slim" },
      accessories: { label: "Silver chain necklace", query: "silver chain necklace men" },
      shoes: { label: "Chelsea boots or clean sneakers", query: "black chelsea boots men" },
    },
  },
  {
    id: "soft-tailoring-edge",
    name: "Soft Tailoring with Edge",
    description:
      "Structured shapes softened by unexpected details—a sheer insert, an asymmetric hem, or a bold accessory. Perfect when you want to look sharp but not stiff.",
    vibeTags: ["soft tailoring", "sheer layers", "metallic accessories"],
    vibes: ["polished", "femme", "experimental", "bold"],
    events: ["work event", "wedding", "dinner", "gallery/art event"],
    price: "$$",
    components: {
      top: { label: "Sheer button-down or structured blouse", query: "sheer button down blouse women" },
      bottom: { label: "High-waist wide-leg trousers", query: "high waist wide leg trousers women" },
      outerwear: { label: "Cropped structured blazer", query: "cropped structured blazer women" },
      accessories: { label: "Statement belt or metallic clip", query: "silver statement belt women" },
      shoes: { label: "Block heels or mules", query: "block heel mules women" },
    },
  },
  {
    id: "y2k-club-fever",
    name: "Y2K Club Fever",
    description:
      "Low-rise denim, crop tops, and butterfly clips are back and they mean business. This look leans into nostalgia with a modern, elevated twist.",
    vibeTags: ["Y2K clubwear", "metallic accessories", "cropped outerwear"],
    vibes: ["bold", "femme", "sexy", "experimental"],
    events: ["party", "concert", "festival"],
    price: "$",
    components: {
      top: { label: "Strappy crop top or halter", query: "strappy halter crop top women" },
      bottom: { label: "Low-rise flare jeans or mini skirt", query: "low rise flare jeans women y2k" },
      outerwear: { label: "Cropped faux-fur or leather jacket", query: "cropped faux fur jacket women" },
      accessories: { label: "Butterfly clips and layered necklaces", query: "butterfly hair clips y2k jewelry set" },
      shoes: { label: "Platform sneakers or chunky sandals", query: "platform sneakers women chunky" },
    },
  },
  {
    id: "festival-utility",
    name: "Festival Utility Fit",
    description:
      "Functional meets fashionable in this layered, pockets-first look that keeps you moving all day. Think cargo, tech fabrics, and statement footwear.",
    vibeTags: ["utilitywear", "vintage denim", "statement boots"],
    vibes: ["casual", "masc", "experimental", "understated"],
    events: ["festival", "concert", "other"],
    price: "$",
    components: {
      top: { label: "Graphic tee or tank", query: "vintage graphic tee oversized" },
      bottom: { label: "Cargo or utility pants", query: "cargo pants women utility" },
      outerwear: { label: "Denim or tech bomber jacket", query: "denim bomber jacket" },
      accessories: { label: "Crossbody bag or bum bag", query: "crossbody bum bag festival" },
      shoes: { label: "Chunky boots or platform sneakers", query: "chunky combat boots women" },
    },
  },
  {
    id: "sporty-prep-event",
    name: "Sporty-Prep Daytime",
    description:
      "Clean, collegiate energy with polo shirts, pleated trousers, and just enough swagger. Casual enough to breathe, polished enough to impress.",
    vibeTags: ["sporty-prep", "vintage denim", "oversized tailoring"],
    vibes: ["casual", "masc", "understated"],
    events: ["work event", "concert", "other", "festival"],
    price: "$",
    components: {
      top: { label: "Polo shirt or ribbed knit", query: "polo shirt men cotton" },
      bottom: { label: "Pleated chinos or straight-leg jeans", query: "pleated chino pants men" },
      outerwear: { label: "Track jacket or light windbreaker", query: "track jacket men bomber" },
      accessories: { label: "Cap or minimal bag", query: "baseball cap men structured" },
      shoes: { label: "White leather sneakers or loafers", query: "white leather sneakers men clean" },
    },
  },
  {
    id: "wedding-guest-glam",
    name: "Wedding Guest Glam",
    description:
      "Elegant but not overdressed, this look nails the wedding guest brief with flowing fabrics, soft color, and refined accessories. You'll look great in photos.",
    vibeTags: ["soft tailoring", "metallic accessories", "relaxed luxury"],
    vibes: ["polished", "femme", "understated"],
    events: ["wedding", "dinner", "work event"],
    price: "$$$",
    components: {
      top: { label: "Floral or solid midi dress", query: "midi dress wedding guest floral" },
      bottom: { label: "(included in dress)", query: "elegant midi dress women" },
      outerwear: { label: "Light wrap or pashmina", query: "silk wrap shawl women evening" },
      accessories: { label: "Delicate pearl or gold jewelry", query: "pearl earrings women elegant" },
      shoes: { label: "Strappy heels or block heels", query: "strappy heels women elegant wedding" },
    },
  },
];

// ─── Constraint Modifiers ─────────────────────────────────────────────────────
// Maps constraint answers to score adjustments and price filters.
export const constraintModifiers = {
  "low budget": { maxPrice: "$", priceBoost: { $: 2, $$: -1, $$$: -3 } },
  "comfortable shoes": { shoeNote: "flat or low-heel", shoeBoost: 1 },
  "cold weather": { layerBoost: ["oversized tailoring", "cropped outerwear", "relaxed luxury"] },
  "warm weather": { layerPenalty: ["oversized tailoring", "cropped outerwear"] },
  "use items I own": { diyNote: true },
  "no constraints": {},
};

// ─── Refinement Modifiers ─────────────────────────────────────────────────────
// Maps refinement button labels to vibe adjustments used when re-scoring themes.
export const refinements = {
  "Make it sexier": { addVibes: ["sexy", "femme", "bold"] },
  "Make it more casual": { addVibes: ["casual", "understated"] },
  "Make it less expensive": { maxPrice: "$" },
  "Make it more masc": { addVibes: ["masc", "understated"] },
  "Make it more femme": { addVibes: ["femme", "bold", "experimental"] },
  "Use items I own": { diyNote: true },
};
