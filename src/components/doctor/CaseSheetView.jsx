import {
  FileText,
  Activity,
  AlertTriangle,
  Pill,
  Tag,
} from "lucide-react";
import { matchNamasteCode } from "../../data/namasteCodes";

export default function CaseSheetView({ patientCase }) {
  const prakriti = patientCase.prakriti || { vata: 40, pitta: 30, kapha: 30, dominant: "Vata-Pitta" };
  const namasteMatch = patientCase.namasteMatch || matchNamasteCode(patientCase.chiefComplaint, patientCase.associatedSymptoms || []);
  const triage = patientCase.triage;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Red Flag Alert Banner if Emergency or Amber */}
      {triage && triage.level !== "green" && (
        <div
          style={{
            padding: "16px",
            borderRadius: "12px",
            background: triage.level === "red" ? "#fef2f2" : "#fffbeb",
            border: `2px solid ${triage.level === "red" ? "#ef4444" : "#f59e0b"}`,
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <div style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: triage.level === "red" ? "#fee2e2" : "#fef3c7",
            color: triage.level === "red" ? "#dc2626" : "#d97706",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}>
            <AlertTriangle size={22} />
          </div>
          <div>
            <strong style={{ fontSize: "14px", color: triage.level === "red" ? "#991b1b" : "#92400e", display: "block" }}>
              {triage.badge} • Clinical Attention Required
            </strong>
            <p style={{ fontSize: "13px", color: "#334155", margin: "2px 0 0" }}>
              {triage.reason} — <em>{triage.action}</em>
            </p>
          </div>
        </div>
      )}

      {/* Top Patient Demographics Header */}
      <div style={{ background: "#f8fafc", padding: "18px 24px", borderRadius: "14px", border: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <span style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", fontWeight: "700" }}>
            OPD Case Record • Token #{patientCase.tokenNo || "101"}
          </span>
          <h2 style={{ fontSize: "22px", color: "#0f172a", marginTop: "2px" }}>
            {patientCase.name}
          </h2>
          <div style={{ fontSize: "13px", color: "#475569", marginTop: "4px", display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <span><strong>Age:</strong> {patientCase.age} yrs</span>
            <span><strong>Gender:</strong> {patientCase.gender}</span>
            <span><strong>Mobile:</strong> +91 {patientCase.mobile || "9876543210"}</span>
            <span><strong>Language:</strong> {patientCase.language || "English"}</span>
            <span style={{ color: "#0284c7" }}><strong>ABHA ID:</strong> {patientCase.abhaId || "91-4523-8891-2304"}</span>
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <span style={{
            fontSize: "12px",
            padding: "4px 12px",
            borderRadius: "14px",
            fontWeight: "700",
            background: triage?.level === "red" ? "#fee2e2" : triage?.level === "amber" ? "#fef3c7" : "#dcfce7",
            color: triage?.level === "red" ? "#b91c1c" : triage?.level === "amber" ? "#b45309" : "#15803d",
            display: "inline-block"
          }}>
            {triage?.badge || "ROUTINE OPD"}
          </span>
          <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "4px" }}>
            Intake: {patientCase.registeredAt || "Today"}
          </div>
        </div>
      </div>

      {/* Suggested NAMASTE / ICD-11 Coding Card */}
      {namasteMatch && (
        <div style={{ background: "#f0f9ff", border: "1px solid #bae6fd", borderRadius: "14px", padding: "18px 22px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#0369a1", marginBottom: "6px" }}>
            <Tag size={18} />
            <span style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase" }}>
              AI Suggested Standardized Ayush Morbidity Code (NAMASTE / ICD-11 TM2)
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <h3 style={{ fontSize: "18px", color: "#0c4a6e" }}>
                {namasteMatch.sanskritName} ({namasteMatch.englishName})
              </h3>
              <p style={{ fontSize: "13px", color: "#075985", marginTop: "2px" }}>
                <strong>Dosha Pathogenesis:</strong> {namasteMatch.dosha}
              </p>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <span style={{ background: "#ffffff", border: "1px solid #7dd3fc", color: "#0369a1", fontSize: "12px", fontWeight: "700", padding: "4px 10px", borderRadius: "6px" }}>
                NAMASTE: {namasteMatch.code}
              </span>
              <span style={{ background: "#ffffff", border: "1px solid #7dd3fc", color: "#0369a1", fontSize: "12px", fontWeight: "700", padding: "4px 10px", borderRadius: "6px" }}>
                ICD-11: {namasteMatch.icd11}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 2-Column Clinical Layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "20px" }}>
        {/* Left: Chief Complaints & HPI */}
        <div style={{ background: "#ffffff", padding: "22px", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
          <h3 style={{ fontSize: "16px", color: "#0f172a", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
            <FileText size={18} color="#2563eb" />
            Chief Complaints & HPI
          </h3>

          <div style={{ marginBottom: "14px" }}>
            <span style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", fontWeight: "600" }}>
              Primary Complaint:
            </span>
            <p style={{ fontSize: "14px", fontWeight: "600", color: "#1e293b", marginTop: "2px" }}>
              {patientCase.chiefComplaint || "Joint pain & morning stiffness"}
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "14px" }}>
            <div>
              <span style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", fontWeight: "600" }}>
                Duration / Onset:
              </span>
              <p style={{ fontSize: "13px", color: "#334155", marginTop: "2px" }}>
                {patientCase.duration || "3 months"}
              </p>
            </div>
            <div>
              <span style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", fontWeight: "600" }}>
                Severity (VAS Scale):
              </span>
              <p style={{ fontSize: "13px", fontWeight: "700", color: (patientCase.severity || 6) >= 8 ? "#dc2626" : "#d97706", marginTop: "2px" }}>
                {patientCase.severity || 6} / 10
              </p>
            </div>
          </div>

          {patientCase.hpi && (
            <div style={{ marginBottom: "14px" }}>
              <span style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", fontWeight: "600" }}>
                History of Present Illness (HPI):
              </span>
              <p style={{ fontSize: "13px", color: "#334155", marginTop: "4px", lineHeight: "1.5", background: "#f8fafc", padding: "10px", borderRadius: "8px" }}>
                {patientCase.hpi}
              </p>
            </div>
          )}

          {/* Associated Symptoms */}
          <div>
            <span style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", fontWeight: "600" }}>
              Associated Symptoms Reported:
            </span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "6px" }}>
              {(patientCase.associatedSymptoms || ["Morning stiffness", "Loss of appetite"]).map((s, i) => (
                <span key={i} style={{ fontSize: "12px", background: "#f1f5f9", color: "#334155", padding: "4px 10px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Body & Digestion Assessment */}
        <div style={{ background: "#ffffff", padding: "22px", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
          <h3 style={{ fontSize: "16px", color: "#0f172a", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
            <Activity size={18} color="#0d9488" />
            Body Constitution & Digestion
          </h3>

          {/* Prakriti Breakdown */}
          <div style={{ marginBottom: "16px", padding: "12px", background: "#f0fdf4", borderRadius: "10px", border: "1px solid #bbf7d0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <span style={{ fontSize: "12px", fontWeight: "700", color: "#166534" }}>
                Body Type: {prakriti.dominant}
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "6px", textAlign: "center" }}>
              <div style={{ background: "#fff", padding: "6px", borderRadius: "6px" }}>
                <span style={{ fontSize: "11px", color: "#0284c7" }}>Vata (Air)</span>
                <strong style={{ display: "block", fontSize: "13px", color: "#0284c7" }}>{prakriti.vata}%</strong>
              </div>
              <div style={{ background: "#fff", padding: "6px", borderRadius: "6px" }}>
                <span style={{ fontSize: "11px", color: "#ea580c" }}>Pitta (Fire)</span>
                <strong style={{ display: "block", fontSize: "13px", color: "#ea580c" }}>{prakriti.pitta}%</strong>
              </div>
              <div style={{ background: "#fff", padding: "6px", borderRadius: "6px" }}>
                <span style={{ fontSize: "11px", color: "#16a34a" }}>Kapha (Water)</span>
                <strong style={{ display: "block", fontSize: "13px", color: "#16a34a" }}>{prakriti.kapha}%</strong>
              </div>
            </div>
          </div>

          {/* Digestion & Bowels */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "14px" }}>
            <div style={{ padding: "10px", background: "#fef3c7", borderRadius: "8px", border: "1px solid #fde68a" }}>
              <span style={{ fontSize: "11px", color: "#92400e", textTransform: "uppercase", fontWeight: "700" }}>
                Digestion Strength
              </span>
              <div style={{ fontSize: "13px", fontWeight: "600", color: "#78350f", marginTop: "2px" }}>
                {patientCase.agni || "Irregular Digestion"}
              </div>
            </div>

            <div style={{ padding: "10px", background: "#ecfdf5", borderRadius: "8px", border: "1px solid #a7f3d0" }}>
              <span style={{ fontSize: "11px", color: "#065f46", textTransform: "uppercase", fontWeight: "700" }}>
                Bowel Regularity
              </span>
              <div style={{ fontSize: "13px", fontWeight: "600", color: "#064e3b", marginTop: "2px" }}>
                {patientCase.koshtha || "Hard / Constipated"}
              </div>
            </div>
          </div>

          {/* Physical Observations */}
          <div style={{ fontSize: "12px" }}>
            <span style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", fontWeight: "700", display: "block", marginBottom: "6px" }}>
              Physical & Body Observations:
            </span>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
              <div style={{ background: "#f8fafc", padding: "6px 10px", borderRadius: "6px" }}>
                <strong>Tongue Coating:</strong> {patientCase.ashtavidha?.jihwa || patientCase.jihwaStatus || "Coated Tongue"}
              </div>
              <div style={{ background: "#f8fafc", padding: "6px 10px", borderRadius: "6px" }}>
                <strong>Pulse Rhythm:</strong> {patientCase.ashtavidha?.nadi || "Vata-Kapha Steady Rhythm"}
              </div>
              <div style={{ background: "#f8fafc", padding: "6px 10px", borderRadius: "6px" }}>
                <strong>Stool Habit:</strong> {patientCase.ashtavidha?.mala || "Constipated, dry"}
              </div>
              <div style={{ background: "#f8fafc", padding: "6px 10px", borderRadius: "6px" }}>
                <strong>Skin Temperature:</strong> {patientCase.ashtavidha?.sparsha || "Cold, dry extremities"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prior Documents & Timeline */}
      {patientCase.documents?.length > 0 && (
        <div style={{ background: "#ffffff", padding: "22px", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
          <h3 style={{ fontSize: "16px", color: "#0f172a", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
            <Pill size={18} color="#9333ea" />
            Digitized Prior Records & Medication Timeline (OCR)
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {patientCase.documents.map((doc, idx) => (
              <div key={idx} style={{ padding: "12px 16px", background: "#faf5ff", borderRadius: "8px", border: "1px solid #f3e8ff" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <strong style={{ fontSize: "13px", color: "#581c87" }}>{doc.title || doc.name}</strong>
                  <span style={{ fontSize: "11px", color: "#7e22ce" }}>{doc.date}</span>
                </div>
                <p style={{ fontSize: "12px", color: "#3b0764", marginTop: "4px" }}>
                  {doc.extractedText || doc.rawSnippet}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
