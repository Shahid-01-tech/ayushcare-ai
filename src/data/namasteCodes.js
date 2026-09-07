// Standardized NAMASTE (National AYUSH Morbidity & Standardized Terminologies Electronic Portal)
// & WHO ICD-11 TM2 (Traditional Medicine Module 2) Ayush Diagnostic Codes

export const NAMASTE_CODES = [
  {
    code: "AYU-KA-001",
    icd11: "TM2-SD-01",
    sanskritName: "Amavata",
    englishName: "Rheumatoid Arthritis / Inflammatory Polyarthritis",
    dosha: "Vata and Kapha imbalance with buildup affecting the joints",
    typicalSymptoms: ["Joint pain", "Morning stiffness", "Swelling", "Body ache", "Loss of appetite"],
    suggestedAushadhi: ["Simhanada Guggulu (2 tabs BD)", "Maharasnadi Kwath (20ml BD)", "Castor oil (Eranda taila) with Shunthi"],
    pathya: ["Warm water", "Barley", "Garlic", "Ginger"],
    apathya: ["Curd", "Jaggery with curd", "Cold bath", "Sleeping during the day"],
  },
  {
    code: "AYU-KA-002",
    icd11: "TM2-SD-02",
    sanskritName: "Sandhigata Vata",
    englishName: "Osteoarthritis / Degenerative Joint Disorder",
    dosha: "Increased Vata with gradual wear of body tissues",
    typicalSymptoms: ["Crackling or grinding sound in the joint", "Knee pain on weight-bearing", "Restricted mobility"],
    suggestedAushadhi: ["Yogaraja Guggulu (2 tabs BD)", "Shallaki (1 cap BD)", "Janu Basti with Mahanarayana Taila"],
    pathya: ["Warm nourishing foods", "Ghee", "Milk with Ashwagandha"],
    apathya: ["Dry/cold foods", "Excessive walking/fasting", "Staying awake late at night"],
  },
  {
    code: "AYU-AN-003",
    icd11: "TM2-GI-01",
    sanskritName: "Amlapitta",
    englishName: "Acid Peptic Disorder / GERD / Hyperacidity",
    dosha: "Increased Pitta causing excess heat and irritation in digestion",
    typicalSymptoms: ["Heartburn", "Sour burping", "Nausea", "Headache"],
    suggestedAushadhi: ["Avipattikara Churna (3g before food)", "Kamadudha Rasa (Moti yukta)", "Sutashekhara Rasa"],
    pathya: ["Pomegranate", "Old rice", "Coconut water", "Indian gooseberry (Amla)"],
    apathya: ["Chili, vinegar, deep-fried snacks", "Skipping meals", "Excessive tea/coffee", "Anger/stress"],
  },
  {
    code: "AYU-PR-004",
    icd11: "TM2-EN-01",
    sanskritName: "Madhumeha (Kaphaja Prameha)",
    englishName: "Diabetes Mellitus Type 2",
    dosha: "Imbalance of all three doshas, mainly Kapha and excess body fat",
    typicalSymptoms: ["Frequent urination", "Excessive thirst", "Tiredness", "Sweetish urine"],
    suggestedAushadhi: ["Nisha-Amalaki Churna (3g BD)", "Chandraprabha Vati (2 tabs BD)", "Vasantakusumakara Rasa"],
    pathya: ["Bitter gourd", "Fenugreek", "Barley", "Regular brisk walking"],
    apathya: ["Sweets, refined flour (Maida)", "Day sleeping", "Sedentary lifestyle"],
  },
  {
    code: "AYU-SH-005",
    icd11: "TM2-NE-01",
    sanskritName: "Ardhavabhedaka / Shirahshula",
    englishName: "Migraine / Tension Headache",
    dosha: "Vata combined with Pitta or Kapha imbalance",
    typicalSymptoms: ["Throbbing unilateral headache", "Photophobia", "Nausea", "Neck tightness"],
    suggestedAushadhi: ["Pathyadi Kwath (20ml BD)", "Shirashuladivajra Rasa (1 tab BD)", "Nasya with Shadbindu Taila"],
    pathya: ["Cow's milk", "Ghee", "Warm foot soak before bed", "Timely meals"],
    apathya: ["Skipping breakfast", "Direct sunlight", "Loud noise", "Holding in natural body urges"],
  },
  {
    code: "AYU-PR-006",
    icd11: "TM2-RS-01",
    sanskritName: "Tamaka Shwasa / Kasa",
    englishName: "Bronchial Asthma / Chronic Bronchitis",
    dosha: "Vata and Kapha imbalance affecting the breathing system",
    typicalSymptoms: ["Wheezing", "Breathlessness aggravated at night/cloudy weather", "Chronic dry or productive cough"],
    suggestedAushadhi: ["Sitopaladi Churna with honey & ghee", "Shwaskasa Chintamani Rasa", "Kanakasava (15ml BD)"],
    pathya: ["Warm water", "Kulittha yusha (horsegram soup)", "Pippali", "Steam inhalation with Ajwain"],
    apathya: ["Refrigerated drinks", "Curd, banana at night", "Exposure to dust/pollen"],
  },
];

export function matchNamasteCode(complaint = "", symptoms = []) {
  const query = `${complaint} ${symptoms.join(" ")}`.toLowerCase();
  
  if (query.includes("joint") || query.includes("stiff") || query.includes("amavata") || query.includes("rheumat")) {
    return NAMASTE_CODES[0]; // Amavata
  }
  if (query.includes("knee") || query.includes("osteo") || query.includes("crepitus") || query.includes("back pain")) {
    return NAMASTE_CODES[1]; // Sandhigata Vata
  }
  if (query.includes("acidity") || query.includes("heartburn") || query.includes("reflux") || query.includes("gas") || query.includes("stomach burn")) {
    return NAMASTE_CODES[2]; // Amlapitta
  }
  if (query.includes("sugar") || query.includes("diabet") || query.includes("urine") || query.includes("madhumeha")) {
    return NAMASTE_CODES[3]; // Madhumeha
  }
  if (query.includes("headache") || query.includes("migraine") || query.includes("head")) {
    return NAMASTE_CODES[4]; // Ardhavabhedaka / Shirahshula
  }
  if (query.includes("cough") || query.includes("breath") || query.includes("asthma") || query.includes("wheez")) {
    return NAMASTE_CODES[5]; // Tamaka Shwasa
  }

  // Default fallback
  return NAMASTE_CODES[0];
}

