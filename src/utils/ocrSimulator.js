// Smart Medical Document OCR Simulator & Medical Timeline Extractor

export const PRESET_DOCUMENTS = [
  {
    id: "sample-rx-1",
    name: "Prescription_Cardiology_AIIA.pdf",
    type: "Allopathic / Ayush Integrated Prescription",
    hospital: "All India Institute of Ayurveda OPD",
    date: "2026-01-15",
    extractedData: {
      diagnosis: "Essential Hypertension (Stage 1), Dyslipidemia",
      medications: [
        { drug: "Telmisartan", dose: "40 mg", frequency: "OD (Morning)", purpose: "Hypertension" },
        { drug: "Atorvastatin", dose: "10 mg", frequency: "HS (Night)", purpose: "Cholesterol" },
        { drug: "Sarpagandha Ghan Vati", dose: "1 tab", frequency: "BD", purpose: "Ayush blood pressure support" },
      ],
      vitals: { bp: "138/88 mmHg", pulse: "74 bpm", weight: "72 kg" },
      allergies: ["Penicillin (Skin rash)"],
    },
    rawSnippet: "Diagnosis: HTN, Dyslipidemia. Rx: Telmisartan 40mg od, Atorva 10mg hs, Sarpagandha Ghan Vati 1 tab bd. BP 138/88. Allergy: Penicillin.",
  },
  {
    id: "sample-lab-2",
    name: "Complete_Metabolic_Panel.pdf",
    type: "Biochemical Lab Report",
    hospital: "Dr. Lal PathLabs",
    date: "2026-02-02",
    extractedData: {
      diagnosis: "Impaired Fasting Glucose, Elevated Uric Acid",
      medications: [],
      vitals: {
        fbs: "118 mg/dL (Elevated)",
        hba1c: "6.2% (Pre-diabetic)",
        uricAcid: "7.8 mg/dL (High - Vatarakta marker)",
        serumCreatinine: "0.9 mg/dL (Normal)",
      },
      allergies: [],
    },
    rawSnippet: "FBS: 118 mg/dL. HbA1c: 6.2%. Serum Uric Acid: 7.8 mg/dL (High). S. Creatinine: 0.9 mg/dL.",
  },
];

export function parseUploadedDocument(file) {
  return new Promise((resolve) => {
    // Simulate OCR processing delay
    setTimeout(() => {
      const isLab = file.name.toLowerCase().includes("lab") || file.name.toLowerCase().includes("report");
      const preset = isLab ? PRESET_DOCUMENTS[1] : PRESET_DOCUMENTS[0];
      
      resolve({
        id: `doc-${Date.now()}`,
        name: file.name,
        type: preset.type,
        hospital: preset.hospital,
        date: new Date().toISOString().split("T")[0],
        extractedData: preset.extractedData,
        rawSnippet: preset.rawSnippet,
      });
    }, 1200);
  });
}

