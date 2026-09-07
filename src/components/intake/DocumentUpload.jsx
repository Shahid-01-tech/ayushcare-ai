import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  UploadCloud,
  FileText,
  Sparkles,
  HeartPulse,
  Pill,
  FileCheck,
} from "lucide-react";
import { PRESET_DOCUMENTS, parseUploadedDocument } from "../../utils/ocrSimulator";

export default function DocumentUpload({ patientData, onBack, onComplete }) {
  const [documents, setDocuments] = useState(patientData?.documents || []);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSelectSample = (sample) => {
    setIsProcessing(true);
    setTimeout(() => {
      setDocuments((prev) => [
        ...prev.filter((d) => d.id !== sample.id),
        sample,
      ]);
      setIsProcessing(false);
    }, 800);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    parseUploadedDocument(file).then((parsedDoc) => {
      setDocuments((prev) => [...prev, parsedDoc]);
      setIsProcessing(false);
    });
  };

  const handleContinue = () => {
    onComplete(documents);
  };

  return (
    <div className="registration-page" style={{ minHeight: "100vh", background: "#f8fafc" }}>
      {/* Header */}
      <header className="registration-header">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={18} />
          Back to Body Assessment
        </button>

        <div className="logo">
          <div className="logo-icon">
            <HeartPulse size={22} />
          </div>
          <span>
            AyushCare <strong>AI</strong>
          </span>
          <span style={{
            fontSize: "11px",
            background: "#eff6ff",
            color: "#1d4ed8",
            padding: "3px 8px",
            borderRadius: "8px",
            border: "1px solid #bfdbfe",
            fontWeight: "600",
            marginLeft: "8px"
          }}>
            Medical Records Scanner
          </span>
        </div>

        <button
          onClick={handleContinue}
          style={{
            background: "linear-gradient(135deg, #1677ff, #0050b3)",
            color: "#fff",
            padding: "8px 18px",
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "6px"
          }}
        >
          Skip / Finish Intake
          <ArrowRight size={15} />
        </button>
      </header>

      <main className="registration-main" style={{ maxWidth: "1100px" }}>
        {/* Progress */}
        <div className="registration-progress">
          <div className="progress-step completed">
            <span>✓</span>
            <p>Registration</p>
          </div>
          <div className="progress-line active-line"></div>
          <div className="progress-step completed">
            <span>✓</span>
            <p>Consent</p>
          </div>
          <div className="progress-line active-line"></div>
          <div className="progress-step completed">
            <span>✓</span>
            <p>Symptom Intake</p>
          </div>
          <div className="progress-line active-line"></div>
          <div className="progress-step completed">
            <span>✓</span>
            <p>Body & Health</p>
          </div>
          <div className="progress-line active-line"></div>
          <div className="progress-step active">
            <span>5</span>
            <p>Medical Records</p>
          </div>
        </div>

        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div className="eyebrow" style={{ display: "inline-flex" }}>
            <Sparkles size={16} />
            EHR / EMR Integration Module
          </div>
          <h1 style={{ fontSize: "30px", color: "#0f172a", marginTop: "8px" }}>
            Prior Medical Records & Prescriptions
          </h1>
          <p style={{ color: "#64748b", maxWidth: "600px", margin: "6px auto 0" }}>
            Upload existing allopathic prescriptions or lab tests. AyushCare AI extracts previous medications
            and clinical history to form a chronological timeline.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "28px", alignItems: "start" }}>
          {/* Left Column: Upload or Pick Presets */}
          <div>
            <div style={{ background: "#ffffff", padding: "24px", borderRadius: "16px", border: "1px solid #e2e8f0", marginBottom: "20px" }}>
              <h3 style={{ fontSize: "16px", color: "#0f172a", marginBottom: "14px" }}>
                Upload Document (Prescription / Lab Report)
              </h3>

              {/* Upload Dropzone */}
              <label
                style={{
                  border: "2px dashed #93c5fd",
                  borderRadius: "12px",
                  background: "#f0f9ff",
                  padding: "32px 20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "0.2s",
                }}
              >
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                />
                <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#dbeafe", color: "#1d4ed8", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px" }}>
                  <UploadCloud size={26} />
                </div>
                <strong style={{ fontSize: "15px", color: "#1e3a8a" }}>
                  Click to browse or drop files here
                </strong>
                <span style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>
                  Supports PDF, PNG, JPG (Prescriptions, Discharge summaries, Lab tests)
                </span>
              </label>

              {/* Quick Preset Selector */}
              <div style={{ marginTop: "24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: "600", color: "#334155", marginBottom: "10px" }}>
                  <Sparkles size={16} color="#0284c7" />
                  Or select sample records for demonstration:
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {PRESET_DOCUMENTS.map((preset) => (
                    <div
                      key={preset.id}
                      onClick={() => handleSelectSample(preset)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "12px 16px",
                        background: "#f8fafc",
                        border: "1px solid #cbd5e1",
                        borderRadius: "10px",
                        cursor: "pointer",
                        transition: "0.2s",
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.borderColor = "#2563eb")}
                      onMouseOut={(e) => (e.currentTarget.style.borderColor = "#cbd5e1")}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <FileText size={20} color="#2563eb" />
                        <div>
                          <strong style={{ fontSize: "13px", color: "#0f172a", display: "block" }}>
                            {preset.name}
                          </strong>
                          <span style={{ fontSize: "11px", color: "#64748b" }}>
                            {preset.type} • {preset.hospital}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        style={{
                          background: "#e0f2fe",
                          color: "#0369a1",
                          fontSize: "12px",
                          fontWeight: "600",
                          padding: "6px 12px",
                          borderRadius: "6px",
                        }}
                      >
                        + Auto-Read Record
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: OCR Extraction Results & Medical Timeline */}
          <div>
            <div style={{ background: "#ffffff", padding: "24px", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 4px 16px rgba(0,0,0,0.03)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <FileCheck size={20} color="#16a34a" />
                  <h3 style={{ fontSize: "16px", color: "#0f172a" }}>Extracted Clinical Timeline</h3>
                </div>
                {isProcessing && (
                  <span style={{ fontSize: "12px", color: "#2563eb", fontWeight: "600", display: "flex", alignItems: "center", gap: "4px" }}>
                    <span className="spinner"></span> Processing OCR...
                  </span>
                )}
              </div>

              {documents.length === 0 ? (
                <div style={{ padding: "32px 20px", textAlign: "center", color: "#94a3b8" }}>
                  <FileText size={36} style={{ margin: "0 auto 8px", opacity: 0.5 }} />
                  <p style={{ fontSize: "13px" }}>No past documents scanned yet.</p>
                  <p style={{ fontSize: "12px", color: "#cbd5e1", marginTop: "2px" }}>
                    Select a sample record or click Continue to complete case intake.
                  </p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {documents.map((doc, idx) => (
                    <div key={idx} style={{ background: "#f8fafc", padding: "16px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                        <div>
                          <strong style={{ fontSize: "14px", color: "#1e293b" }}>{doc.name}</strong>
                          <span style={{ fontSize: "11px", color: "#64748b", display: "block" }}>
                            {doc.type} • {doc.date}
                          </span>
                        </div>
                        <span style={{ fontSize: "11px", background: "#dcfce7", color: "#15803d", fontWeight: "600", padding: "2px 8px", borderRadius: "10px" }}>
                          ✓ Digitized
                        </span>
                      </div>

                      {doc.extractedData?.diagnosis && (
                        <div style={{ fontSize: "12px", color: "#334155", marginBottom: "8px" }}>
                          <strong>Extracted Diagnosis:</strong> {doc.extractedData.diagnosis}
                        </div>
                      )}

                      {doc.extractedData?.medications?.length > 0 && (
                        <div style={{ marginTop: "8px" }}>
                          <span style={{ fontSize: "11px", fontWeight: "700", color: "#475569", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "4px" }}>
                            <Pill size={12} /> Ongoing Medications:
                          </span>
                          <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginTop: "4px" }}>
                            {doc.extractedData.medications.map((m, mIdx) => (
                              <div key={mIdx} style={{ fontSize: "12px", background: "#ffffff", padding: "6px 10px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
                                <strong>{m.drug} {m.dose}</strong> - {m.frequency} ({m.purpose})
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {doc.extractedData?.vitals && (
                        <div style={{ marginTop: "10px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
                          {Object.entries(doc.extractedData.vitals).map(([k, v], vIdx) => (
                            <span key={vIdx} style={{ fontSize: "11px", padding: "2px 8px", background: "#eff6ff", color: "#1d4ed8", borderRadius: "6px", border: "1px solid #bfdbfe" }}>
                              {k.toUpperCase()}: {v}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Final Submit Button */}
              <button
                onClick={handleContinue}
                style={{
                  width: "100%",
                  marginTop: "20px",
                  padding: "14px",
                  background: "linear-gradient(135deg, #1677ff, #0050b3)",
                  color: "#ffffff",
                  borderRadius: "10px",
                  fontSize: "15px",
                  fontWeight: "700",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(22,119,255,0.35)",
                }}
              >
                Complete Intake & Generate Patient Token
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
