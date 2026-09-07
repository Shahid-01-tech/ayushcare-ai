// Clinical Red-Flag Detection and Emergency Triage Engine for Ayush Hospital Intake

const RED_FLAG_KEYWORDS = [
  { pattern: /chest pain|heart attack|angina|squeezing.*chest|left arm pain/i, reason: "Suspected Acute Coronary Syndrome (Cardiac emergency)", level: "red" },
  { pattern: /breathless|severe.*shortness of breath|can't breathe|wheezing.*severe|blue lips/i, reason: "Severe Respiratory Distress (Asthma exacerbation / COPD)", level: "red" },
  { pattern: /unconscious|fainting|blackout|seizure|convulsion|slurred speech|facial drooping/i, reason: "Neurological Alert (Stroke / Seizure episode)", level: "red" },
  { pattern: /vomiting blood|coughing blood|hemoptysis|black stool|rectal bleeding.*heavy/i, reason: "Active Hemorrhage / Acute GI Bleed", level: "red" },
  { pattern: /severe abdominal pain.*rigid|sudden unbearable.*belly|rebound tenderness/i, reason: "Acute Surgical Abdomen (Perforation / Appendicitis / Obstruction)", level: "red" },
  { pattern: /suicide|kill myself|harm myself|severe depression.*hopeless/i, reason: "Psychiatric Crisis / Self-harm Risk", level: "red" },
];

const AMBER_PRIORITY_KEYWORDS = [
  { pattern: /high fever|fever.*chills|temperature.*103|fever > 3 days/i, reason: "High Grade Pyrexia / Suspected acute systemic infection", level: "amber" },
  { pattern: /severe headache.*worst of life|stiff neck.*fever/i, reason: "Meningeal irritation / Acute intractable headache", level: "amber" },
  { pattern: /inability to pass urine|urinary retention|severe flank pain|renal colic/i, reason: "Acute Renal / Urinary retention", level: "amber" },
  { pattern: /persistent vomiting.*cannot keep water|severe dehydration/i, reason: "Dehydration / Electrolyte imbalance", level: "amber" },
  { pattern: /fracture|dislocation|fall.*unable to walk/i, reason: "Orthopedic trauma / Suspected fracture", level: "amber" },
];

export function evaluateTriage(chiefComplaint = "", symptoms = [], severity = 5) {
  const combinedText = `${chiefComplaint} ${symptoms.join(" ")}`;

  // 1. Check Red Flags (Immediate ER referral)
  for (const item of RED_FLAG_KEYWORDS) {
    if (item.pattern.test(combinedText)) {
      return {
        level: "red",
        badge: "EMERGENCY ALERT (RED)",
        title: "Immediate Emergency Triage",
        reason: item.reason,
        action: "Direct patient immediately to Ayush Emergency / Nearest Trauma Center. Halt routine intake.",
      };
    }
  }

  // 2. High severity score alone (e.g. 9 or 10 on pain scale)
  if (severity >= 9) {
    return {
      level: "amber",
      badge: "PRIORITY OPD (AMBER)",
      title: "Urgent Priority Assessment",
      reason: "Patient reports incapacitating pain severity (9-10/10).",
      action: "Fast-track in OPD queue for immediate physician evaluation.",
    };
  }

  // 3. Check Amber Priority
  for (const item of AMBER_PRIORITY_KEYWORDS) {
    if (item.pattern.test(combinedText)) {
      return {
        level: "amber",
        badge: "PRIORITY OPD (AMBER)",
        title: "Priority OPD Consultation",
        reason: item.reason,
        action: "Assign fast-track consultation token.",
      };
    }
  }

  // 4. Routine Green OPD
  return {
    level: "green",
    badge: "ROUTINE OPD (GREEN)",
    title: "Standard Ayush Intake",
    reason: "Sub-acute or chronic complaints suitable for classical Ayush evaluation.",
    action: "Normal OPD queue with full 10-part health assessment.",
  };
}

