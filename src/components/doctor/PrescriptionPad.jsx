import { useState } from "react";
import {
  Pill,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
  Utensils,
  AlertCircle,
  Save,
  CalendarDays,
} from "lucide-react";
import { matchNamasteCode } from "../../data/namasteCodes";

export default function PrescriptionPad({ patientCase, onUpdateCase }) {
  const namasteMatch = patientCase.namasteMatch || matchNamasteCode(patientCase.chiefComplaint, patientCase.associatedSymptoms || []);

  const [medicines, setMedicines] = useState(
    patientCase.prescribedMedicines?.length > 0
      ? patientCase.prescribedMedicines
      : (namasteMatch.suggestedAushadhi || []).map((medStr) => ({
          name: medStr,
          dosage: "1 dose BD",
          anupana: "Warm water",
          duration: "1 month",
        }))
  );

  const [newMed, setNewMed] = useState({ name: "", dosage: "", anupana: "Warm water", duration: "1 month" });
  const [panchakarma, setPanchakarma] = useState("Janu Basti with Mahanarayana Taila (7 days)");
  const [pathya, setPathya] = useState(patientCase.pathyaAdvised?.join(", ") || namasteMatch.pathya?.join(", ") || "Warm water, light diet, barley");
  const [apathya, setApathya] = useState(patientCase.apathyaAdvised?.join(", ") || namasteMatch.apathya?.join(", ") || "Curd at night, cold drinks, deep fried items");
  const [doctorNotes, setDoctorNotes] = useState(patientCase.doctorNotes || "Patient advised strictly to avoid daytime sleeping and take medications with warm water.");
  const [followUpDate, setFollowUpDate] = useState(patientCase.followUpDate || "");
  const [isSaved, setIsSaved] = useState(false);

  const handleAddMed = () => {
    if (!newMed.name.trim()) return;
    setMedicines([...medicines, newMed]);
    setNewMed({ name: "", dosage: "", anupana: "Warm water", duration: "1 month" });
    setIsSaved(false);
  };

  const handleRemoveMed = (index) => {
    setMedicines(medicines.filter((_, i) => i !== index));
    setIsSaved(false);
  };

  const handleSave = () => {
    onUpdateCase({
      ...patientCase,
      prescribedMedicines: medicines,
      panchakarmaAdvised: panchakarma,
      pathyaAdvised: pathya.split(",").map((s) => s.trim()),
      apathyaAdvised: apathya.split(",").map((s) => s.trim()),
      doctorNotes,
      followUpDate,
      followUpStatus: followUpDate ? "Scheduled" : "Not scheduled",
      doctorName: patientCase.doctorName || "AYUSH Physician",
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div style={{ background: "#ffffff", padding: "28px", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div>
          <span style={{ fontSize: "11px", color: "#0d9488", fontWeight: "700", textTransform: "uppercase" }}>
            E-PRESCRIPTION & TREATMENT PLAN
          </span>
          <h2 style={{ fontSize: "20px", color: "#0f172a", marginTop: "2px" }}>
            Consultation Treatment Plan
          </h2>
        </div>

        <button
          onClick={handleSave}
          style={{
            background: isSaved ? "#16a34a" : "linear-gradient(135deg, #0d9488, #0f766e)",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(13,148,136,0.25)",
          }}
        >
          {isSaved ? <CheckCircle2 size={16} /> : <Save size={16} />}
          {isSaved ? "Saved to Case Sheet!" : "Save Treatment Plan"}
        </button>
      </div>

      {/* Suggested Formulations Quick Adder */}
      <div style={{ padding: "14px", background: "#f0fdfa", borderRadius: "10px", border: "1px solid #99f6e4", marginBottom: "20px" }}>
        <span style={{ fontSize: "12px", color: "#0f766e", fontWeight: "700", display: "flex", alignItems: "center", gap: "6px" }}>
          <Sparkles size={15} /> Recommended Ayurvedic Formulations for {namasteMatch.englishName}:
        </span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "8px" }}>
          {(namasteMatch.suggestedAushadhi || []).map((med, i) => (
            <button
              key={i}
              onClick={() => setMedicines([...medicines, { name: med, dosage: "1 dose BD", anupana: "Warm water", duration: "1 month" }])}
              style={{
                fontSize: "12px",
                background: "#ffffff",
                border: "1px solid #5eead4",
                color: "#0f766e",
                padding: "4px 10px",
                borderRadius: "14px",
                cursor: "pointer",
              }}
            >
              + Add {med}
            </button>
          ))}
        </div>
      </div>

      {/* Current Prescriptions Table */}
      <div style={{ marginBottom: "24px" }}>
        <h4 style={{ fontSize: "14px", color: "#1e293b", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
          <Pill size={16} color="#0d9488" /> Prescribed Ayurvedic Medicines
        </h4>

        {medicines.length === 0 ? (
          <p style={{ fontSize: "13px", color: "#94a3b8" }}>No medicines added yet.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {medicines.map((med, idx) => (
              <div
                key={idx}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.8fr 1.2fr 1fr 1fr 40px",
                  gap: "10px",
                  alignItems: "center",
                  padding: "10px 14px",
                  background: "#f8fafc",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <div>
                  <strong style={{ fontSize: "13px", color: "#0f172a" }}>{med.name}</strong>
                </div>
                <div style={{ fontSize: "12px", color: "#475569" }}>
                  Dosage: {med.dosage}
                </div>
                <div style={{ fontSize: "12px", color: "#475569" }}>
                  Take with: {med.anupana}
                </div>
                <div style={{ fontSize: "12px", color: "#475569" }}>
                  Duration: {med.duration}
                </div>
                <button
                  onClick={() => handleRemoveMed(idx)}
                  style={{ background: "none", color: "#ef4444", padding: "4px" }}
                  title="Remove"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Add Med Inline Form */}
        <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1.2fr 1fr 1fr auto", gap: "10px", marginTop: "12px" }}>
          <input
            type="text"
            placeholder="Medicine name (e.g. Triphala Churna)"
            value={newMed.name}
            onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
            style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "13px" }}
          />
          <input
            type="text"
            placeholder="Dosage (e.g. 3g at night)"
            value={newMed.dosage}
            onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })}
            style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "13px" }}
          />
          <input
            type="text"
            placeholder="Take with (e.g. Warm water)"
            value={newMed.anupana}
            onChange={(e) => setNewMed({ ...newMed, anupana: e.target.value })}
            style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "13px" }}
          />
          <input
            type="text"
            placeholder="Duration (e.g. 1 month)"
            value={newMed.duration}
            onChange={(e) => setNewMed({ ...newMed, duration: e.target.value })}
            style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "13px" }}
          />
          <button
            onClick={handleAddMed}
            style={{ background: "#2563eb", color: "#fff", padding: "8px 16px", borderRadius: "6px", fontSize: "13px", fontWeight: "600", display: "flex", alignItems: "center", gap: "4px" }}
          >
            <Plus size={16} /> Add
          </button>
        </div>
      </div>

      {/* Therapy Section */}
      <div style={{ marginBottom: "20px" }}>
        <h4 style={{ fontSize: "14px", color: "#1e293b", marginBottom: "8px" }}>
          Ayurvedic Treatments & Therapy Orders:
        </h4>
        <input
          type="text"
          value={panchakarma}
          onChange={(e) => setPanchakarma(e.target.value)}
          placeholder="e.g. Warm herbal compress, knee oil therapy, steam fomentation"
          style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px" }}
        />
      </div>

      {/* Diet & Lifestyle Dos & Don'ts */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
        <div style={{ background: "#f0fdf4", padding: "16px", borderRadius: "10px", border: "1px solid #bbf7d0" }}>
          <label style={{ fontSize: "13px", fontWeight: "700", color: "#15803d", display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
            <Utensils size={15} /> Recommended Diet & Healthy Habits (Do's)
          </label>
          <textarea
            rows="3"
            value={pathya}
            onChange={(e) => setPathya(e.target.value)}
            style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #86efac", fontSize: "12px", background: "#fff" }}
          />
        </div>

        <div style={{ background: "#fef2f2", padding: "16px", borderRadius: "10px", border: "1px solid #fecaca" }}>
          <label style={{ fontSize: "13px", fontWeight: "700", color: "#b91c1c", display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
            <AlertCircle size={15} /> Foods & Habits to Avoid (Don'ts)
          </label>
          <textarea
            rows="3"
            value={apathya}
            onChange={(e) => setApathya(e.target.value)}
            style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #fca5a5", fontSize: "12px", background: "#fff" }}
          />
        </div>
      </div>

      {/* Doctor Clinical Notes */}
      <div>
        <label style={{ fontSize: "13px", fontWeight: "700", color: "#334155", display: "block", marginBottom: "6px" }}>
          Physician Clinical Notes & Observations:
        </label>
        <textarea
          rows="3"
          value={doctorNotes}
          onChange={(e) => setDoctorNotes(e.target.value)}
          placeholder="Enter consultation notes, prognosis, or specific instructions..."
          style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px" }}
        />
      </div>
    </div>
  );
}
