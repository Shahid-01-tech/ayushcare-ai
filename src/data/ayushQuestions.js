// Ayush Clinical Knowledge Base for 10-Point Health & Body Assessment

export const PRAKRITI_QUESTIONS = [
  {
    id: "body_frame",
    category: "Body Build & Bone Structure",
    question: "How would you describe your natural physical build and body frame?",
    options: [
      { text: "Lean, slender, prominent joints, difficulty gaining weight", dosha: "vata", points: 2 },
      { text: "Medium build, well-proportioned, moderate muscle tone", dosha: "pitta", points: 2 },
      { text: "Broad, sturdy, well-developed frame, gains weight easily", dosha: "kapha", points: 2 },
    ],
  },
  {
    id: "skin_complexion",
    category: "Skin Texture & Moisture",
    question: "What is your typical skin type and texture?",
    options: [
      { text: "Dry, rough, thin, prone to cracked lips, cool to touch", dosha: "vata", points: 2 },
      { text: "Warm, reddish/fair, prone to rashes, freckles, or acne", dosha: "pitta", points: 2 },
      { text: "Smooth, soft, naturally oily, thick, clear and cool", dosha: "kapha", points: 2 },
    ],
  },
  {
    id: "weather_tolerance",
    category: "Weather & Temperature Tolerance",
    question: "Which type of weather is most uncomfortable for you?",
    options: [
      { text: "Cold, windy, and dry weather makes me feel stiff and uncomfortable", dosha: "vata", points: 2 },
      { text: "Hot weather and direct sun cause quick sweating and irritability", dosha: "pitta", points: 2 },
      { text: "Cold and damp/rainy weather causes lethargy, congestion, and heaviness", dosha: "kapha", points: 2 },
    ],
  },
  {
    id: "sleep_pattern",
    category: "Daily Sleep Routine",
    question: "How is your typical sleep quality and duration?",
    options: [
      { text: "Light, easily disturbed, frequent waking, feels tired in the morning", dosha: "vata", points: 2 },
      { text: "Moderate (6-7 hrs), sound sleep, wake up if thirsty or too warm", dosha: "pitta", points: 2 },
      { text: "Deep, heavy (8+ hrs), takes time to wake up, feels groggy", dosha: "kapha", points: 2 },
    ],
  },
  {
    id: "temperament",
    category: "Stress & Emotional Response",
    question: "How do you naturally respond to high-stress situations?",
    options: [
      { text: "Quick to worry, anxious, overthinking, rapid mood changes", dosha: "vata", points: 2 },
      { text: "Intense, impatient, irritable, determined to resolve it right away", dosha: "pitta", points: 2 },
      { text: "Calm, steady, patient, avoids conflict, takes time to react", dosha: "kapha", points: 2 },
    ],
  },
];

export const AGNI_QUESTIONS = [
  {
    id: "appetite_nature",
    question: "How is your hunger and appetite pattern on a daily basis?",
    options: [
      { text: "Irregular: very hungry some days, low appetite on others (Gas / Bloating)", type: "Irregular (Gas/Bloating)", dosha: "Vata Type" },
      { text: "Sharp & intense: cannot tolerate meal delay, causes heartburn or headache", type: "Sharp / High Acidity", dosha: "Pitta Type" },
      { text: "Slow & sluggish: low appetite, feels full for hours after a small meal", type: "Slow / Heavy Digestion", dosha: "Kapha Type" },
      { text: "Balanced & steady: digests normal meals comfortably on time", type: "Balanced & Healthy", dosha: "Balanced Type" },
    ],
  },
  {
    id: "post_meal",
    question: "How do you feel 1-2 hours after having a regular meal?",
    options: [
      { text: "Bloating, gas, stomach rumbling, or sudden fatigue", type: "Irregular Digestion" },
      { text: "Acid reflux, heartburn, burning in chest, or excessive thirst", type: "Acidic Digestion" },
      { text: "Heaviness in stomach, dullness, excessive salivation, drowsiness", type: "Sluggish Digestion" },
      { text: "Comfortable, energized, light and active feeling", type: "Balanced Digestion" },
    ],
  },
];

export const KOSTHA_QUESTIONS = [
  {
    id: "bowel_habit",
    question: "What best describes your daily bowel habits?",
    options: [
      {
        type: "Hard / Constipated",
        desc: "Prone to dry, hard stools, irregular timing, requires warm water or effort.",
        dosha: "Vata dominance in lower gut",
      },
      {
        type: "Soft / Frequent",
        desc: "Frequent stools (2-3 times/day), soft or loose, sensitive to milk or fruits.",
        dosha: "Pitta dominance",
      },
      {
        type: "Regular / Normal",
        desc: "Smooth, formed stool once daily every morning without discomfort.",
        dosha: "Balanced digestive tract",
      },
    ],
  },
];

export const ASHTAVIDHA_PARIKSHA_ITEMS = [
  { name: "Pulse Check", key: "nadi", placeholder: "e.g., Fast, steady, irregular" },
  { name: "Urine Color & Frequency", key: "mutra", placeholder: "e.g., Pale yellow, clear, normal" },
  { name: "Stool Consistency", key: "mala", placeholder: "e.g., Formed, once daily, no mucus" },
  { name: "Tongue Appearance", key: "jihwa", placeholder: "e.g., Coated with white layer, clear pink" },
  { name: "Voice & Speech", key: "shabda", placeholder: "e.g., Clear, hoarse, weak" },
  { name: "Skin Touch", key: "sparsha", placeholder: "e.g., Dry, warm, cold extremities" },
  { name: "Eyes", key: "druk", placeholder: "e.g., Clear, red, tired" },
  { name: "Posture & Walk", key: "akruti", placeholder: "e.g., Normal gait, slight limp, stiff posture" },
];

export function calculatePrakriti(answers) {
  let vata = 0;
  let pitta = 0;
  let kapha = 0;

  Object.values(answers).forEach((ans) => {
    if (ans?.dosha === "vata") vata += ans.points || 1;
    if (ans?.dosha === "pitta") pitta += ans.points || 1;
    if (ans?.dosha === "kapha") kapha += ans.points || 1;
  });

  const total = (vata + pitta + kapha) || 1;
  const vataPct = Math.round((vata / total) * 100);
  const pittaPct = Math.round((pitta / total) * 100);
  const kaphaPct = 100 - (vataPct + pittaPct);

  let dominant;
  const scores = [
    { name: "Vata", score: vataPct },
    { name: "Pitta", score: pittaPct },
    { name: "Kapha", score: kaphaPct },
  ].sort((a, b) => b.score - a.score);

  if (scores[0].score - scores[1].score > 20) {
    dominant = `${scores[0].name} Dominant Type`;
  } else {
    dominant = `${scores[0].name}-${scores[1].name} Dual Type`;
  }

  return {
    vata: vataPct,
    pitta: pittaPct,
    kapha: kaphaPct,
    dominant,
  };
}
