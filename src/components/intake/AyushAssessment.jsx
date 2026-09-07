import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  HeartPulse,
  Activity,
  Flame,
  Wind,
  Droplets,
  ShieldCheck,
} from "lucide-react";
import {
  PRAKRITI_QUESTIONS,
  AGNI_QUESTIONS,
  KOSTHA_QUESTIONS,
  calculatePrakriti,
} from "../../data/ayushQuestions";

export default function AyushAssessment({ onBack, onComplete }) {
  const [prakritiAnswers, setPrakritiAnswers] = useState({});
  const [selectedAgni, setSelectedAgni] = useState(null);
  const [selectedKostha, setSelectedKostha] = useState(null);
  const [jihwaAma, setJihwaAma] = useState("saama"); // saama (coated) or nirama (clear)

  const handlePrakritiSelect = (questionId, option) => {
    setPrakritiAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const prakritiResult = calculatePrakriti(prakritiAnswers);
  const answeredCount = Object.keys(prakritiAnswers).length;
  const isPrakritiComplete = answeredCount === PRAKRITI_QUESTIONS.length;
  const isAllComplete = isPrakritiComplete && selectedAgni && selectedKostha;

  const handleFinish = () => {
    onComplete({
      prakriti: prakritiResult,
      agni: selectedAgni?.type || "Irregular Digestion",
      agniDetail: selectedAgni?.text || "",
      koshtha: selectedKostha?.type || "Regular / Normal",
      koshthaDetail: selectedKostha?.desc || "",
      jihwaStatus: jihwaAma === "saama" ? "Coated Tongue (Possible buildup)" : "Clean Tongue (Normal)",
    });
  };

  return (
    <div className="registration-page" style={{ minHeight: "100vh", background: "#f8fafc" }}>
      {/* Header */}
      <header className="registration-header">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={18} />
          Back to Symptoms
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
            background: "#ecfdf5",
            color: "#065f46",
            padding: "3px 8px",
            borderRadius: "8px",
            border: "1px solid #a7f3d0",
            fontWeight: "600",
            marginLeft: "8px"
          }}>
            10-Point Health Profile
          </span>
        </div>

        <div className="secure-badge">
          <ShieldCheck size={16} />
          Ayush Ministry Aligned
        </div>
      </header>

      <main className="registration-main" style={{ maxWidth: "1200px" }}>
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
          <div className="progress-step active">
            <span>4</span>
            <p>Body & Health</p>
          </div>
        </div>

        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div className="eyebrow" style={{ display: "inline-flex" }}>
            <Sparkles size={16} />
            Personalized Health Profile
          </div>
          <h1 style={{ fontSize: "32px", color: "#0f172a", marginTop: "8px" }}>
            Body Type, Digestion & Lifestyle Profile
          </h1>
          <p style={{ color: "#64748b", maxWidth: "680px", margin: "8px auto 0" }}>
            Ayurvedic care works best when matched to your body type (Vata, Pitta, Kapha),
            digestive strength, and daily lifestyle patterns.
          </p>
        </div>

        {/* Layout: Left Quiz + Right Live Prakriti Meter */}
        <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr", gap: "28px", alignItems: "start" }}>
          {/* Left Column: Assessment Modules */}
          <div>
            {/* Section 1: Body Type Questions */}
            <div style={{ background: "#ffffff", padding: "28px", borderRadius: "16px", border: "1px solid #e2e8f0", marginBottom: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <div>
                  <span style={{ fontSize: "12px", color: "#0284c7", fontWeight: "700", textTransform: "uppercase" }}>
                    PART 1 OF 3 • NATURAL BODY TYPE
                  </span>
                  <h2 style={{ fontSize: "20px", color: "#0f172a", marginTop: "2px" }}>
                    What is Your Natural Body Type?
                  </h2>
                </div>
                <span style={{ fontSize: "13px", fontWeight: "600", color: isPrakritiComplete ? "#16a34a" : "#64748b" }}>
                  {answeredCount} / {PRAKRITI_QUESTIONS.length} Answered
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
                {PRAKRITI_QUESTIONS.map((q, qIndex) => {
                  const currentAnswer = prakritiAnswers[q.id];

                  return (
                    <div key={q.id} style={{ padding: "16px", background: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                      <div style={{ fontSize: "12px", color: "#64748b", fontWeight: "600", marginBottom: "4px" }}>
                        {q.category}
                      </div>
                      <h4 style={{ fontSize: "15px", color: "#1e293b", marginBottom: "12px" }}>
                        {qIndex + 1}. {q.question}
                      </h4>

                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        {q.options.map((opt, optIndex) => {
                          const isSelected = currentAnswer?.text === opt.text;
                          return (
                            <div
                              key={optIndex}
                              onClick={() => handlePrakritiSelect(q.id, opt)}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                padding: "10px 14px",
                                borderRadius: "8px",
                                background: isSelected ? "#eff6ff" : "#ffffff",
                                border: isSelected ? "2px solid #2563eb" : "1px solid #cbd5e1",
                                cursor: "pointer",
                                transition: "0.2s",
                              }}
                            >
                              <div
                                style={{
                                  width: "18px",
                                  height: "18px",
                                  borderRadius: "50%",
                                  border: isSelected ? "5px solid #2563eb" : "2px solid #94a3b8",
                                  background: "#fff",
                                  flexShrink: 0,
                                }}
                              />
                              <span style={{ fontSize: "13px", color: isSelected ? "#1e40af" : "#334155", fontWeight: isSelected ? "600" : "400" }}>
                                {opt.text}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Section 2: Digestion Speed (Agni) */}
            <div style={{ background: "#ffffff", padding: "28px", borderRadius: "16px", border: "1px solid #e2e8f0", marginBottom: "24px" }}>
              <div style={{ marginBottom: "16px" }}>
                <span style={{ fontSize: "12px", color: "#d97706", fontWeight: "700", textTransform: "uppercase" }}>
                  PART 2 OF 3 • DIGESTION & APPETITE
                </span>
                <h2 style={{ fontSize: "20px", color: "#0f172a", marginTop: "2px" }}>
                  How Strong is Your Digestion?
                </h2>
                <p style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>
                  Choose the description that best fits your daily hunger and digestion:
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "10px" }}>
                {AGNI_QUESTIONS[0].options.map((opt, idx) => {
                  const isSelected = selectedAgni?.type === opt.type;
                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedAgni(opt)}
                      style={{
                        padding: "14px",
                        borderRadius: "10px",
                        background: isSelected ? "#fef3c7" : "#f8fafc",
                        border: isSelected ? "2px solid #d97706" : "1px solid #e2e8f0",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <Flame size={20} color={isSelected ? "#b45309" : "#94a3b8"} />
                      <div>
                        <strong style={{ display: "block", fontSize: "14px", color: isSelected ? "#92400e" : "#1e293b" }}>
                          {opt.type}
                        </strong>
                        <span style={{ fontSize: "13px", color: "#475569" }}>{opt.text}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Section 3: Bowels & Tongue Check */}
            <div style={{ background: "#ffffff", padding: "28px", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
              <div style={{ marginBottom: "16px" }}>
                <span style={{ fontSize: "12px", color: "#059669", fontWeight: "700", textTransform: "uppercase" }}>
                  PART 3 OF 3 • BOWEL HABITS & TONGUE CHECK
                </span>
                <h2 style={{ fontSize: "20px", color: "#0f172a", marginTop: "2px" }}>
                  Daily Bowel Regularity & Tongue Signs
                </h2>
              </div>

              <h4 style={{ fontSize: "14px", color: "#1e293b", marginBottom: "10px" }}>
                How would you describe your daily bowel movements?
              </h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "10px", marginBottom: "20px" }}>
                {KOSTHA_QUESTIONS[0].options.map((opt, idx) => {
                  const isSelected = selectedKostha?.type === opt.type;
                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedKostha(opt)}
                      style={{
                        padding: "12px",
                        borderRadius: "10px",
                        background: isSelected ? "#ecfdf5" : "#f8fafc",
                        border: isSelected ? "2px solid #059669" : "1px solid #e2e8f0",
                        cursor: "pointer",
                      }}
                    >
                      <div style={{ fontWeight: "600", fontSize: "14px", color: isSelected ? "#065f46" : "#1e293b" }}>
                        {opt.type}
                      </div>
                      <div style={{ fontSize: "12px", color: "#475569", marginTop: "2px" }}>{opt.desc}</div>
                    </div>
                  );
                })}
              </div>

              <h4 style={{ fontSize: "14px", color: "#1e293b", marginBottom: "10px" }}>
                Tongue Appearance Check (Look in a mirror):
              </h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div
                  onClick={() => setJihwaAma("saama")}
                  style={{
                    padding: "12px",
                    borderRadius: "10px",
                    background: jihwaAma === "saama" ? "#fef3c7" : "#f8fafc",
                    border: jihwaAma === "saama" ? "2px solid #f59e0b" : "1px solid #e2e8f0",
                    cursor: "pointer",
                  }}
                >
                  <strong style={{ fontSize: "13px", color: "#92400e" }}>Coated Tongue (Layer Present)</strong>
                  <p style={{ fontSize: "12px", color: "#64748b", marginTop: "2px" }}>
                    White or yellow coating, which may suggest slow digestion or waste buildup.
                  </p>
                </div>

                <div
                  onClick={() => setJihwaAma("nirama")}
                  style={{
                    padding: "12px",
                    borderRadius: "10px",
                    background: jihwaAma === "nirama" ? "#f0fdf4" : "#f8fafc",
                    border: jihwaAma === "nirama" ? "2px solid #22c55e" : "1px solid #e2e8f0",
                    cursor: "pointer",
                  }}
                >
                  <strong style={{ fontSize: "13px", color: "#166534" }}>Clean Tongue (Healthy Pink)</strong>
                  <p style={{ fontSize: "12px", color: "#64748b", marginTop: "2px" }}>
                    Clean pink surface, normal moisture, indicating clean and active digestion.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Calculated Profile */}
          <div style={{ position: "sticky", top: "96px" }}>
            <div style={{ background: "#ffffff", padding: "24px", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#f0fdf4", color: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Activity size={18} />
                </div>
                <div>
                  <span style={{ fontSize: "11px", color: "#64748b", fontWeight: "700" }}>YOUR HEALTH PROFILE</span>
                  <h3 style={{ fontSize: "16px", color: "#0f172a" }}>Calculated Body Type</h3>
                </div>
              </div>

              {/* Breakdown Bars */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
                {/* Vata */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "4px" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: "600", color: "#0284c7" }}>
                      <Wind size={15} /> Vata (Movement & Air)
                    </span>
                    <strong style={{ color: "#0284c7" }}>{prakritiResult.vata}%</strong>
                  </div>
                  <div style={{ width: "100%", height: "8px", background: "#f1f5f9", borderRadius: "4px", overflow: "hidden" }}>
                    <div style={{ width: `${prakritiResult.vata}%`, height: "100%", background: "#0284c7", borderRadius: "4px", transition: "0.3s ease" }}></div>
                  </div>
                </div>

                {/* Pitta */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "4px" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: "600", color: "#ea580c" }}>
                      <Flame size={15} /> Pitta (Digestion & Fire)
                    </span>
                    <strong style={{ color: "#ea580c" }}>{prakritiResult.pitta}%</strong>
                  </div>
                  <div style={{ width: "100%", height: "8px", background: "#f1f5f9", borderRadius: "4px", overflow: "hidden" }}>
                    <div style={{ width: `${prakritiResult.pitta}%`, height: "100%", background: "#ea580c", borderRadius: "4px", transition: "0.3s ease" }}></div>
                  </div>
                </div>

                {/* Kapha */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "4px" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: "600", color: "#16a34a" }}>
                      <Droplets size={15} /> Kapha (Structure & Strength)
                    </span>
                    <strong style={{ color: "#16a34a" }}>{prakritiResult.kapha}%</strong>
                  </div>
                  <div style={{ width: "100%", height: "8px", background: "#f1f5f9", borderRadius: "4px", overflow: "hidden" }}>
                    <div style={{ width: `${prakritiResult.kapha}%`, height: "100%", background: "#16a34a", borderRadius: "4px", transition: "0.3s ease" }}></div>
                  </div>
                </div>
              </div>

              {/* Dominant Constitution Badge */}
              <div style={{ padding: "12px", background: "#f8fafc", borderRadius: "10px", border: "1px solid #e2e8f0", textAlign: "center", marginBottom: "16px" }}>
                <span style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", fontWeight: "600" }}>
                  Your Dominant Body Type:
                </span>
                <div style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a", marginTop: "2px" }}>
                  {prakritiResult.dominant}
                </div>
              </div>

              {/* Digestion & Bowel Summary */}
              <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "14px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                  <span style={{ color: "#64748b" }}>Digestion Strength:</span>
                  <strong style={{ color: selectedAgni ? "#d97706" : "#94a3b8" }}>
                    {selectedAgni ? selectedAgni.type : "Pending"}
                  </strong>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                  <span style={{ color: "#64748b" }}>Bowel Habits:</span>
                  <strong style={{ color: selectedKostha ? "#059669" : "#94a3b8" }}>
                    {selectedKostha ? selectedKostha.type : "Pending"}
                  </strong>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                  <span style={{ color: "#64748b" }}>Tongue Layer:</span>
                  <strong style={{ color: jihwaAma === "saama" ? "#b45309" : "#16a34a" }}>
                    {jihwaAma === "saama" ? "Coated (Possible buildup)" : "Clean (Normal)"}
                  </strong>
                </div>
              </div>

              {/* Continue Button */}
              <button
                onClick={handleFinish}
                style={{
                  width: "100%",
                  marginTop: "20px",
                  padding: "12px",
                  background: isAllComplete ? "linear-gradient(135deg, #1677ff, #0050b3)" : "#94a3b8",
                  color: "#ffffff",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  cursor: isAllComplete ? "pointer" : "default",
                  boxShadow: isAllComplete ? "0 4px 12px rgba(22,119,255,0.3)" : "none",
                }}
              >
                Continue to Prior Medical Records
                <ArrowRight size={16} />
              </button>

              {!isAllComplete && (
                <div style={{ fontSize: "11px", color: "#64748b", textAlign: "center", marginTop: "8px" }}>
                  Answer the questions above, or click Continue to use standard calculated values.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
