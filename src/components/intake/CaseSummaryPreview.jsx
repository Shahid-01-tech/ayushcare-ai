import {
  CheckCircle2,
  Stethoscope,
  Clock,
  Home,
  ShieldCheck,
} from "lucide-react";

export default function CaseSummaryPreview({ patientCase, onOpenDoctorView, onGoHome }) {
  const triage = patientCase.triage;

  return (
    <div className="registration-page" style={{ minHeight: "100vh", background: "#f8fafc", padding: "40px 20px" }}>
      <main style={{ maxWidth: "780px", margin: "0 auto" }}>
        {/* Success Card */}
        <div style={{ background: "#ffffff", borderRadius: "20px", border: "1px solid #e2e8f0", padding: "36px", boxShadow: "0 10px 30px rgba(0,0,0,0.06)", textAlign: "center" }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#dcfce7", color: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <CheckCircle2 size={36} />
          </div>

          <span style={{ fontSize: "12px", background: "#e0f2fe", color: "#0284c7", padding: "4px 12px", borderRadius: "12px", fontWeight: "700", textTransform: "uppercase" }}>
            Pre-Consultation Intake Completed
          </span>

          <h1 style={{ fontSize: "28px", color: "#0f172a", marginTop: "12px" }}>
            Case Summary Registered Successfully
          </h1>

          <p style={{ color: "#64748b", fontSize: "14px", maxWidth: "520px", margin: "8px auto 24px" }}>
            Your clinical history, health assessment, and previous medical documents have been organized
            and transmitted directly to the OPD Physician's console.
          </p>

          {/* OPD Token Box */}
          <div style={{
            background: "linear-gradient(135deg, #eff6ff, #dbeafe)",
            border: "2px dashed #3b82f6",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "28px",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px"
          }}>
            <div>
              <span style={{ fontSize: "12px", color: "#1e40af", textTransform: "uppercase", fontWeight: "700" }}>
                OPD Token Number
              </span>
              <div style={{ fontSize: "38px", fontWeight: "800", color: "#1e3a8a" }}>
                {patientCase.tokenNo || "104"}
              </div>
            </div>

            <div style={{ textAlign: "left", borderLeft: "2px solid #bfdbfe", paddingLeft: "20px" }}>
              <div style={{ fontSize: "13px", color: "#1e40af", display: "flex", alignItems: "center", gap: "6px" }}>
                <Clock size={16} /> Estimated Wait Time: <strong>~ 5 mins</strong>
              </div>
              <div style={{ fontSize: "13px", color: "#1e40af", marginTop: "4px" }}>
                Department: <strong>All India Institute of Ayurveda - General OPD</strong>
              </div>
              <div style={{ fontSize: "13px", color: "#1e40af", marginTop: "4px" }}>
                Consultation: <strong>Room 04 (Ayurvedic Physician)</strong>
              </div>
            </div>
          </div>

          {/* Quick Overview Badges */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px", textAlign: "left", marginBottom: "28px" }}>
            <div style={{ padding: "12px 16px", background: "#f8fafc", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
              <span style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase" }}>Patient</span>
              <strong style={{ display: "block", fontSize: "14px", color: "#1e293b", marginTop: "2px" }}>
                {patientCase.name} ({patientCase.age}y / {patientCase.gender})
              </strong>
            </div>

            <div style={{ padding: "12px 16px", background: "#f8fafc", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
              <span style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase" }}>Natural Body Type</span>
              <strong style={{ display: "block", fontSize: "14px", color: "#0284c7", marginTop: "2px" }}>
                {patientCase.prakriti?.dominant || "Vata-Kapha"}
              </strong>
            </div>

            <div style={{ padding: "12px 16px", background: "#f8fafc", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
              <span style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase" }}>OPD Priority Status</span>
              <strong style={{
                display: "block",
                fontSize: "14px",
                color: triage?.level === "red" ? "#dc2626" : triage?.level === "amber" ? "#d97706" : "#16a34a",
                marginTop: "2px"
              }}>
                {triage?.badge || "ROUTINE OPD (GREEN)"}
              </strong>
            </div>

            <div style={{ padding: "12px 16px", background: "#f8fafc", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
              <span style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase" }}>ABHA Account</span>
              <strong style={{ display: "block", fontSize: "13px", color: "#16a34a", marginTop: "2px" }}>
                {patientCase.abhaId || "91-4523-8891-2304 (Linked)"}
              </strong>
            </div>
          </div>

          {/* Action Buttons for Demo / OPD Hand-off */}
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={onOpenDoctorView}
              style={{
                background: "linear-gradient(135deg, #0d9488, #0f766e)",
                color: "#ffffff",
                padding: "12px 24px",
                borderRadius: "10px",
                fontSize: "15px",
                fontWeight: "700",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(13, 148, 136, 0.35)",
              }}
            >
              <Stethoscope size={18} />
              Open Doctor OPD Portal (Review this Case)
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                if (typeof onGoHome === "function") onGoHome();
              }}
              style={{
                background: "#f1f5f9",
                color: "#334155",
                padding: "12px 20px",
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                cursor: "pointer",
              }}
            >
              <Home size={16} />
              Back to Home / Next Patient
            </button>
          </div>

          <div style={{ marginTop: "24px", fontSize: "12px", color: "#94a3b8", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
            <ShieldCheck size={15} color="#16a34a" />
            Ministry of Ayush • All India Institute of Ayurveda Patient Intake System
          </div>
        </div>
      </main>
    </div>
  );
}
