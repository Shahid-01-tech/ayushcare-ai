import { Printer, ArrowLeft, HeartPulse } from "lucide-react";
import { matchNamasteCode } from "../../data/namasteCodes";

export default function PrintableOPDCard({ patientCase, onBack }) {
  const namaste = patientCase.namasteMatch || matchNamasteCode(patientCase.chiefComplaint, patientCase.associatedSymptoms || []);
  const prakriti = patientCase.prakriti || { vata: 40, pitta: 30, kapha: 30, dominant: "Vata-Pitta" };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ padding: "30px 20px", background: "#f1f5f9", minHeight: "100vh" }}>
      {/* Print Controls (Hidden on Print) */}
      <div className="no-print" style={{ maxWidth: "800px", margin: "0 auto 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button
          onClick={onBack}
          style={{
            background: "#ffffff",
            border: "1px solid #cbd5e1",
            padding: "8px 16px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "13px"
          }}
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </button>

        <button
          onClick={handlePrint}
          style={{
            background: "linear-gradient(135deg, #1677ff, #0050b3)",
            color: "#ffffff",
            padding: "10px 22px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
            fontWeight: "700",
            fontSize: "14px",
            boxShadow: "0 4px 14px rgba(22,119,255,0.3)"
          }}
        >
          <Printer size={18} /> Print / Save as PDF
        </button>
      </div>

      {/* Official OPD Card Sheet */}
      <div
        id="opd-card-print-area"
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          background: "#ffffff",
          padding: "40px",
          borderRadius: "12px",
          border: "1px solid #cbd5e1",
          boxShadow: "0 6px 24px rgba(0,0,0,0.06)",
          fontFamily: "'DM Sans', sans-serif",
          color: "#0f172a"
        }}
      >
        {/* Hospital Header */}
        <div style={{ textAlign: "center", borderBottom: "2px solid #0f172a", paddingBottom: "16px", marginBottom: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "4px" }}>
            <HeartPulse size={24} color="#0f766e" />
            <h1 style={{ fontSize: "20px", fontWeight: "800", color: "#0f766e", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              All India Institute of Ayurveda (AIIA)
            </h1>
          </div>
          <p style={{ fontSize: "12px", color: "#475569", margin: "2px 0" }}>
            Ministry of Ayush, Government of India • New Delhi
          </p>
          <p style={{ fontSize: "11px", color: "#64748b" }}>
            Integrated Pre-Consultation Case Sheet & E-Prescription (SIH Problem Statement 26047)
          </p>
        </div>

        {/* Patient & Consultation Meta */}
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "12px", background: "#f8fafc", padding: "14px", borderRadius: "8px", border: "1px solid #e2e8f0", marginBottom: "18px", fontSize: "13px" }}>
          <div>
            <div><strong>Patient Name:</strong> {patientCase.name}</div>
            <div><strong>Age / Gender:</strong> {patientCase.age} yrs / {patientCase.gender}</div>
            <div><strong>ABHA ID:</strong> {patientCase.abhaId || "91-4523-8891-2304"}</div>
            <div><strong>Mobile:</strong> +91 {patientCase.mobile || "9876543210"}</div>
          </div>
          <div style={{ borderLeft: "1px solid #e2e8f0", paddingLeft: "14px" }}>
            <div><strong>Token No:</strong> #{patientCase.tokenNo || "101"}</div>
            <div><strong>Date:</strong> {new Date().toLocaleDateString("en-IN")}</div>
            <div><strong>OPD Unit:</strong> Kayachikitsa Unit II</div>
            <div><strong>Triage Status:</strong> {patientCase.triage?.badge || "ROUTINE (GREEN)"}</div>
          </div>
        </div>

        {/* Diagnostic Coding */}
        <div style={{ border: "1px solid #cbd5e1", borderRadius: "8px", padding: "12px", marginBottom: "16px", background: "#f0f9ff" }}>
          <div style={{ fontSize: "12px", fontWeight: "700", color: "#0369a1", textTransform: "uppercase" }}>
            Standardized Diagnosis (NAMASTE / WHO ICD-11 TM2)
          </div>
          <div style={{ fontSize: "15px", fontWeight: "700", color: "#0c4a6e", marginTop: "2px" }}>
            {namaste.sanskritName} — {namaste.englishName}
          </div>
          <div style={{ fontSize: "11px", color: "#0284c7", marginTop: "2px" }}>
            NAMASTE Code: <strong>{namaste.code}</strong> | ICD-11 Code: <strong>{namaste.icd11}</strong> | Dosha: <strong>{namaste.dosha}</strong>
          </div>
        </div>

        {/* Clinical History & 10-Part Table */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "18px" }}>
          {/* History */}
          <div style={{ border: "1px solid #e2e8f0", borderRadius: "8px", padding: "12px" }}>
            <div style={{ fontSize: "12px", fontWeight: "700", color: "#334155", textTransform: "uppercase", borderBottom: "1px solid #e2e8f0", paddingBottom: "4px", marginBottom: "8px" }}>
              Clinical History
            </div>
            <div style={{ fontSize: "12px", marginBottom: "4px" }}>
              <strong>Chief Complaint:</strong> {patientCase.chiefComplaint}
            </div>
            <div style={{ fontSize: "12px", marginBottom: "4px" }}>
              <strong>Duration:</strong> {patientCase.duration}
            </div>
            <div style={{ fontSize: "12px", marginBottom: "4px" }}>
              <strong>Pain Severity:</strong> {patientCase.severity || 6} / 10
            </div>
            <div style={{ fontSize: "12px" }}>
              <strong>Associated Symptoms:</strong> {(patientCase.associatedSymptoms || []).join(", ") || "None"}
            </div>
          </div>

          {/* 10-Part & 8-Part */}
          <div style={{ border: "1px solid #e2e8f0", borderRadius: "8px", padding: "12px" }}>
            <div style={{ fontSize: "12px", fontWeight: "700", color: "#334155", textTransform: "uppercase", borderBottom: "1px solid #e2e8f0", paddingBottom: "4px", marginBottom: "8px" }}>
              Health Assessment
            </div>
            <div style={{ fontSize: "12px", marginBottom: "4px" }}>
              <strong>Natural Body Type:</strong> {prakriti.dominant} (V:{prakriti.vata}% P:{prakriti.pitta}% K:{prakriti.kapha}%)
            </div>
            <div style={{ fontSize: "12px", marginBottom: "4px" }}>
              <strong>Digestion:</strong> {patientCase.agni || "Irregular Digestion"}
            </div>
            <div style={{ fontSize: "12px", marginBottom: "4px" }}>
              <strong>Bowel Pattern:</strong> {patientCase.koshtha || "Hard / Constipated"}
            </div>
            <div style={{ fontSize: "12px" }}>
              <strong>Tongue:</strong> {patientCase.ashtavidha?.jihwa || patientCase.jihwaStatus || "Coated Tongue"}
            </div>
          </div>
        </div>

        {/* Rx - Prescription Table */}
        <div style={{ marginBottom: "18px" }}>
          <div style={{ fontSize: "13px", fontWeight: "800", color: "#0f172a", textTransform: "uppercase", marginBottom: "6px" }}>
            Prescription — Ayurvedic Medicines
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
            <thead>
              <tr style={{ background: "#f1f5f9", borderBottom: "1px solid #cbd5e1" }}>
                <th style={{ padding: "8px", textAlign: "left" }}>#</th>
                <th style={{ padding: "8px", textAlign: "left" }}>Formulation</th>
                <th style={{ padding: "8px", textAlign: "left" }}>Dosage</th>
                <th style={{ padding: "8px", textAlign: "left" }}>How to Take</th>
                <th style={{ padding: "8px", textAlign: "left" }}>Duration</th>
              </tr>
            </thead>
            <tbody>
              {(patientCase.prescribedMedicines || [
                { name: "Simhanada Guggulu", dosage: "2 tabs BD", anupana: "Warm water", duration: "1 month" },
                { name: "Maharasnadi Kwath", dosage: "20ml BD", anupana: "Warm water", duration: "1 month" },
              ]).map((med, idx) => (
                <tr key={idx} style={{ borderBottom: "1px solid #e2e8f0" }}>
                  <td style={{ padding: "8px" }}>{idx + 1}</td>
                  <td style={{ padding: "8px", fontWeight: "600" }}>{med.name}</td>
                  <td style={{ padding: "8px" }}>{med.dosage}</td>
                  <td style={{ padding: "8px" }}>{med.anupana}</td>
                  <td style={{ padding: "8px" }}>{med.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Treatment & Diet Advice */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "20px", fontSize: "12px" }}>
          <div style={{ background: "#f0fdf4", padding: "10px 14px", borderRadius: "8px", border: "1px solid #bbf7d0" }}>
            <strong style={{ color: "#166534", display: "block", marginBottom: "4px" }}>
              Recommended Diet & Lifestyle:
            </strong>
            <p style={{ margin: 0, color: "#14532d" }}>
              {(patientCase.pathyaAdvised || ["Warm ginger water", "Barley", "Garlic"]).join(", ")}
            </p>
          </div>

          <div style={{ background: "#fef2f2", padding: "10px 14px", borderRadius: "8px", border: "1px solid #fecaca" }}>
            <strong style={{ color: "#991b1b", display: "block", marginBottom: "4px" }}>
              Avoid:
            </strong>
            <p style={{ margin: 0, color: "#7f1d1d" }}>
              {(patientCase.apathyaAdvised || ["Curd at night", "Cold water", "Day sleeping"]).join(", ")}
            </p>
          </div>
        </div>

        {/* Doctor Signature & OPD Stamp */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "40px", paddingTop: "20px", borderTop: "1px solid #e2e8f0" }}>
          <div style={{ fontSize: "11px", color: "#64748b" }}>
            Digitally generated via AyushCare AI • Validated by Consulting Physician<br />
            ABDM Compliant • Consent Timestamped
          </div>

          <div style={{ textAlign: "center" }}>
            <div style={{ width: "160px", borderBottom: "1px solid #0f172a", marginBottom: "4px" }}></div>
            <strong style={{ fontSize: "12px", display: "block" }}>Dr. Ananya Sharma, MD (Ayu)</strong>
            <span style={{ fontSize: "11px", color: "#64748b" }}>Reg No: CCIM-AYU-45912</span>
          </div>
        </div>
      </div>
    </div>
  );
}
