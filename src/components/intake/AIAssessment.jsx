import { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  UserRound,
  Mic,
  MicOff,
  Volume2,
  FileText,
  ShieldCheck,
  AlertTriangle,
  Send,
} from "lucide-react";
import { createSpeechRecognizer, speakText, isSpeechRecognitionSupported } from "../../utils/speechUtils";
import { evaluateTriage } from "../../utils/triageEngine";

const QUICK_COMPLAINT_SUGGESTIONS = [
  "Joint pain with severe morning stiffness",
  "Severe heartburn, acidity & sour belching",
  "Throbbing unilateral headache / migraine",
  "Chronic dry cough with breathlessness",
  "High blood sugar & excessive thirst",
  "Lower back pain aggravated by cold weather",
];

const DURATION_SUGGESTIONS = [
  "Past 3 to 5 days (Acute)",
  "2 to 4 weeks (Sub-acute)",
  "3 to 6 months (Chronic)",
  "More than 1 year",
];

const AGGRAVATING_SUGGESTIONS = [
  "Aggravated in cold & cloudy weather",
  "Worse after spicy & fried food",
  "Worse in early morning upon waking",
  "Relieved by warm fomentation/foment",
  "Relieved after rest & fasting",
];

const ASSOCIATED_SYMPTOM_SUGGESTIONS = [
  "Morning stiffness",
  "Loss of appetite (Aruchi)",
  "Sour belching / Reflux",
  "Sleep disturbance (Anidra)",
  "Fatigue & body ache (Angamarda)",
  "Constipation",
];

export default function AIAssessment({ patientData, onBack, onComplete }) {
  const [messages, setMessages] = useState([
    {
      type: "ai",
      text: `Hello ${patientData.name || "there"}! I am your AyushCare AI case-taking assistant. What brings you to the OPD today? Describe your main problem or tap a common complaint below.`,
      step: "complaint",
    },
  ]);

  const [input, setInput] = useState("");
  const [currentStep, setCurrentStep] = useState("complaint"); // complaint -> duration -> severity -> factors -> associated -> complete
  const [isListening, setIsListening] = useState(false);
  const [speechSupported] = useState(() => isSpeechRecognitionSupported());

  // Extracted Clinical State
  const [clinicalState, setClinicalState] = useState({
    chiefComplaint: "",
    duration: "",
    severity: 6,
    aggravatingFactors: [],
    associatedSymptoms: [],
  });

  const speechRecognizerRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Derived triage evaluation
  const triage = evaluateTriage(
    clinicalState.chiefComplaint,
    [...clinicalState.associatedSymptoms, ...clinicalState.aggravatingFactors],
    clinicalState.severity
  );

  // Speech to Text handler
  const handleToggleListening = () => {
    if (isListening) {
      if (speechRecognizerRef.current) {
        speechRecognizerRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    const recognizer = createSpeechRecognizer({
      lang: patientData.language || "English",
      onResult: (transcript) => {
        setInput(transcript);
      },
      onError: () => {
        setIsListening(false);
      },
      onEnd: () => {
        setIsListening(false);
      },
    });

    if (recognizer) {
      speechRecognizerRef.current = recognizer;
      try {
        recognizer.start();
        setIsListening(true);
      } catch (err) {
        console.warn("Speech recognition could not start:", err);
      }
    }
  };

  const handleReadAloud = (text) => {
    speakText(text, patientData.language || "English");
  };

  const processResponse = (userText) => {
    if (!userText.trim()) return;

    // Add user message
    const updatedMessages = [
      ...messages,
      { type: "user", text: userText },
    ];
    setMessages(updatedMessages);
    setInput("");

    // Branch logic based on current step
    if (currentStep === "complaint") {
      setClinicalState((prev) => ({ ...prev, chiefComplaint: userText }));
      setCurrentStep("duration");

      setTimeout(() => {
        const nextAiText = "Thank you. How long have you been experiencing this? Select or tell me when it first started.";
        setMessages((prev) => [
          ...prev,
          { type: "ai", text: nextAiText, step: "duration" },
        ]);
        handleReadAloud(nextAiText);
      }, 600);

    } else if (currentStep === "duration") {
      setClinicalState((prev) => ({ ...prev, duration: userText }));
      setCurrentStep("severity");

      setTimeout(() => {
        const nextAiText = "Got it. On a scale of 1 to 10, how severe is your pain or discomfort right now? You can adjust the slider or type below.";
        setMessages((prev) => [
          ...prev,
          { type: "ai", text: nextAiText, step: "severity" },
        ]);
        handleReadAloud(nextAiText);
      }, 600);

    } else if (currentStep === "severity") {
      const num = parseInt(userText.replace(/\D/g, ""), 10);
      if (!isNaN(num) && num >= 1 && num <= 10) {
        setClinicalState((prev) => ({ ...prev, severity: num }));
      }
      setCurrentStep("factors");

      setTimeout(() => {
        const nextAiText = "What specific factors aggravate (worsen) your condition, or provide relief? (e.g. cold weather, spicy food, warmth, rest)";
        setMessages((prev) => [
          ...prev,
          { type: "ai", text: nextAiText, step: "factors" },
        ]);
        handleReadAloud(nextAiText);
      }, 600);

    } else if (currentStep === "factors") {
      setClinicalState((prev) => ({
        ...prev,
        aggravatingFactors: [...prev.aggravatingFactors, userText],
      }));
      setCurrentStep("associated");

      setTimeout(() => {
        const nextAiText = "Are you experiencing any other accompanying symptoms such as loss of appetite, morning stiffness, indigestion, or sleep disturbance?";
        setMessages((prev) => [
          ...prev,
          { type: "ai", text: nextAiText, step: "associated" },
        ]);
        handleReadAloud(nextAiText);
      }, 600);

    } else if (currentStep === "associated") {
      setClinicalState((prev) => ({
        ...prev,
        associatedSymptoms: [...prev.associatedSymptoms, userText],
      }));
      setCurrentStep("complete");

      setTimeout(() => {
        const nextAiText = "Your symptoms are recorded! Next, let's look at your body constitution, digestion, and daily habits so your doctor gets a complete picture.";
        setMessages((prev) => [
          ...prev,
          { type: "ai", text: nextAiText, step: "complete" },
        ]);
        handleReadAloud(nextAiText);
      }, 600);
    }
  };

  const handleChipClick = (chipText) => {
    processResponse(chipText);
  };

  const handleProceedToAyush = () => {
    onComplete({
      ...clinicalState,
      triage,
    });
  };

  return (
    <div className="assessment-page">
      <div className="assessment-background"></div>

      {/* Header */}
      <header className="assessment-header">
        <button className="assessment-back" onClick={onBack} title="Back">
          <ArrowLeft size={18} />
        </button>

        <div className="logo">
          <div className="logo-icon">
            <Sparkles size={21} />
          </div>
          <span>
            AyushCare <strong>AI</strong>
          </span>
          <span style={{ fontSize: "12px", color: "#64748b", marginLeft: "8px" }}>
            Patient: <strong>{patientData.name || "OPD Patient"}</strong> ({patientData.age}y / {patientData.gender})
          </span>
        </div>

        <div className="assessment-status">
          <span></span>
          Interactive History Intake
        </div>
      </header>

      <main className="assessment-main">
        {/* Top title & step tracker */}
        <div className="assessment-top">
          <div>
            <span className="assessment-label">SIH 26047 • PRE-CONSULTATION INTAKE</span>
            <h1>Conversational Case Taking</h1>
          </div>

          <div className="assessment-progress">
            <div className="assessment-progress-text">
              <span>Intake Progress</span>
              <strong>
                {currentStep === "complaint" && "Step 1 of 5"}
                {currentStep === "duration" && "Step 2 of 5"}
                {currentStep === "severity" && "Step 3 of 5"}
                {currentStep === "factors" && "Step 4 of 5"}
                {currentStep === "associated" && "Step 5 of 5"}
                {currentStep === "complete" && "Completed (5/5)"}
              </strong>
            </div>
            <div className="assessment-progress-bar">
              <div
                style={{
                  width:
                    currentStep === "complaint" ? "20%" :
                    currentStep === "duration" ? "40%" :
                    currentStep === "severity" ? "60%" :
                    currentStep === "factors" ? "80%" : "100%",
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Workspace */}
        <div className="assessment-workspace">
          {/* Left - Interactive Conversation Panel */}
          <section className="conversation-panel">
            <div className="conversation-panel-header">
              <div className="ai-title">
                <div className="ai-title-icon">
                  <Sparkles size={18} />
                </div>
                <div>
                  <strong>AyushCare AI History Engine</strong>
                  <span>Voice & Vernacular Touch Support</span>
                </div>
              </div>

              <div className="live-indicator">
                <span></span>
                Adaptive Dialogue
              </div>
            </div>

            {/* Chat Messages */}
            <div className="assessment-messages">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`assessment-message ${
                    msg.type === "user" ? "assessment-user-message" : "assessment-ai-message"
                  }`}
                >
                  {msg.type === "ai" && (
                    <div className="assessment-avatar ai">
                      <Sparkles size={16} />
                    </div>
                  )}

                  <div className="assessment-bubble">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                      <span>{msg.type === "ai" ? "AyushCare AI" : "You"}</span>
                      {msg.type === "ai" && (
                        <button
                          onClick={() => handleReadAloud(msg.text)}
                          title="Read question aloud (Audio TTS)"
                          style={{ background: "none", color: "#64748b", padding: "2px" }}
                        >
                          <Volume2 size={15} />
                        </button>
                      )}
                    </div>
                    <p>{msg.text}</p>
                  </div>

                  {msg.type === "user" && (
                    <div className="assessment-avatar user">
                      <UserRound size={16} />
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestion Chips based on current step */}
            <div style={{ padding: "8px 20px", background: "#f8fafc", borderTop: "1px solid #e2e8f0" }}>
              <span style={{ fontSize: "11px", fontWeight: "700", color: "#64748b", textTransform: "uppercase" }}>
                Tap to answer quickly:
              </span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "6px" }}>
                {currentStep === "complaint" &&
                  QUICK_COMPLAINT_SUGGESTIONS.map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleChipClick(chip)}
                      style={{
                        fontSize: "12px",
                        padding: "6px 12px",
                        borderRadius: "16px",
                        background: "#ffffff",
                        border: "1px solid #cbd5e1",
                        color: "#1e293b",
                        cursor: "pointer",
                        transition: "0.2s",
                      }}
                      onMouseOver={(e) => (e.target.style.background = "#eff6ff")}
                      onMouseOut={(e) => (e.target.style.background = "#ffffff")}
                    >
                      + {chip}
                    </button>
                  ))}

                {currentStep === "duration" &&
                  DURATION_SUGGESTIONS.map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleChipClick(chip)}
                      style={{
                        fontSize: "12px",
                        padding: "6px 12px",
                        borderRadius: "16px",
                        background: "#eff6ff",
                        border: "1px solid #93c5fd",
                        color: "#1d4ed8",
                        cursor: "pointer",
                      }}
                    >
                      ⏱ {chip}
                    </button>
                  ))}

                {currentStep === "severity" && (
                  <div style={{ width: "100%", padding: "10px 0" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", fontWeight: 600, color: "#1e293b", marginBottom: "6px" }}>
                      <span>Pain / Discomfort Severity:</span>
                      <span style={{ color: clinicalState.severity >= 8 ? "#dc2626" : clinicalState.severity >= 5 ? "#d97706" : "#16a34a" }}>
                        {clinicalState.severity} / 10
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={clinicalState.severity}
                      onChange={(e) => setClinicalState({ ...clinicalState, severity: Number(e.target.value) })}
                      style={{ width: "100%", cursor: "pointer" }}
                    />
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#64748b", marginTop: "2px" }}>
                      <span>1 (Mild)</span>
                      <span>5 (Moderate)</span>
                      <span>10 (Severe / Incapacitating)</span>
                    </div>
                    <button
                      onClick={() => processResponse(`Severity is ${clinicalState.severity} out of 10`)}
                      style={{
                        marginTop: "8px",
                        background: "#2563eb",
                        color: "#fff",
                        padding: "6px 14px",
                        borderRadius: "6px",
                        fontSize: "12px",
                        fontWeight: 600
                      }}
                    >
                      Confirm Severity ({clinicalState.severity}/10)
                    </button>
                  </div>
                )}

                {currentStep === "factors" &&
                  AGGRAVATING_SUGGESTIONS.map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleChipClick(chip)}
                      style={{
                        fontSize: "12px",
                        padding: "6px 12px",
                        borderRadius: "16px",
                        background: "#fef3c7",
                        border: "1px solid #fde68a",
                        color: "#92400e",
                        cursor: "pointer",
                      }}
                    >
                      • {chip}
                    </button>
                  ))}

                {currentStep === "associated" &&
                  ASSOCIATED_SYMPTOM_SUGGESTIONS.map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleChipClick(chip)}
                      style={{
                        fontSize: "12px",
                        padding: "6px 12px",
                        borderRadius: "16px",
                        background: "#f3e8ff",
                        border: "1px solid #e9d5ff",
                        color: "#6b21a8",
                        cursor: "pointer",
                      }}
                    >
                      + {chip}
                    </button>
                  ))}

                {currentStep === "complete" && (
                  <div style={{ width: "100%", textAlign: "center", padding: "10px 0" }}>
                    <button
                      onClick={handleProceedToAyush}
                      style={{
                        background: "linear-gradient(135deg, #0d9488, #0f766e)",
                        color: "#ffffff",
                        padding: "12px 24px",
                        borderRadius: "10px",
                        fontSize: "15px",
                        fontWeight: "700",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        boxShadow: "0 4px 14px rgba(13, 148, 136, 0.35)",
                      }}
                    >
                      Continue to Body Type & Health Profile
                      <ArrowRight size={18} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Voice and Text Input Area */}
            <div className="voice-area">
              <div className={`voice-record ${isListening ? "listening" : ""}`}>
                <button
                  type="button"
                  className="voice-button"
                  onClick={handleToggleListening}
                  title={isListening ? "Stop listening" : "Click to speak into microphone"}
                  style={{
                    background: isListening ? "#dc2626" : undefined,
                    color: isListening ? "#ffffff" : undefined,
                  }}
                >
                  {isListening ? <MicOff size={22} /> : <Mic size={22} />}
                </button>

                <div className="voice-info">
                  <strong>{isListening ? "Listening to your voice..." : "Voice Input (Speech-to-Text)"}</strong>
                  <span>
                    {isListening
                      ? "Speak your symptoms in Hindi or English..."
                      : speechSupported
                      ? "Tap microphone to speak naturally"
                      : "Voice input not supported in this browser (use text below)"}
                  </span>
                </div>
              </div>

              <div className="message-input">
                <input
                  type="text"
                  placeholder="Type your response or question..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      processResponse(input);
                    }
                  }}
                />
                <button onClick={() => processResponse(input)} disabled={!input.trim()}>
                  <Send size={18} />
                </button>
              </div>
            </div>
          </section>

          {/* Right - Real-time Clinical Extraction & Triage Panel */}
          <aside className="clinical-panel">
            <div className="clinical-header">
              <div>
                <span>LIVE CLINICAL EXTRACTION</span>
                <h2>Synthesized Intake</h2>
              </div>
              <FileText size={20} />
            </div>

            {/* Emergency Triage Status Widget */}
            {triage && (
              <div
                style={{
                  padding: "12px",
                  borderRadius: "10px",
                  marginBottom: "16px",
                  background:
                    triage.level === "red"
                      ? "#fef2f2"
                      : triage.level === "amber"
                      ? "#fffbeb"
                      : "#f0fdf4",
                  border: `1px solid ${
                    triage.level === "red"
                      ? "#f87171"
                      : triage.level === "amber"
                      ? "#fcd34d"
                      : "#86efac"
                  }`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "700", fontSize: "12px", color: triage.level === "red" ? "#b91c1c" : triage.level === "amber" ? "#b45309" : "#15803d" }}>
                  <AlertTriangle size={16} />
                  {triage.badge}
                </div>
                <div style={{ fontSize: "12px", marginTop: "4px", color: "#334155" }}>
                  <strong>{triage.reason}</strong>
                </div>
                <div style={{ fontSize: "11px", marginTop: "4px", color: "#64748b" }}>
                  {triage.action}
                </div>
              </div>
            )}

            {/* Chief Complaint */}
            <div className="clinical-section">
              <div className="clinical-section-title">
                <span>01</span>
                Chief Complaint
              </div>
              <div className={clinicalState.chiefComplaint ? "clinical-value" : "clinical-placeholder"}>
                {clinicalState.chiefComplaint || "Waiting for patient response..."}
              </div>
            </div>

            {/* Duration */}
            <div className="clinical-section">
              <div className="clinical-section-title">
                <span>02</span>
                Duration & Onset
              </div>
              <div className={clinicalState.duration ? "clinical-value" : "clinical-placeholder"}>
                {clinicalState.duration || "Waiting for response..."}
              </div>
            </div>

            {/* Severity */}
            <div className="clinical-section">
              <div className="clinical-section-title">
                <span>03</span>
                Severity Scale
              </div>
              <div className="clinical-value" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span>{clinicalState.severity} / 10</span>
                <span style={{
                  fontSize: "11px",
                  padding: "2px 8px",
                  borderRadius: "10px",
                  background: clinicalState.severity >= 8 ? "#fee2e2" : "#fef3c7",
                  color: clinicalState.severity >= 8 ? "#b91c1c" : "#92400e"
                }}>
                  {clinicalState.severity >= 8 ? "Severe" : clinicalState.severity >= 5 ? "Moderate" : "Mild"}
                </span>
              </div>
            </div>

            {/* Aggravating / Relieving Factors */}
            <div className="clinical-section">
              <div className="clinical-section-title">
                <span>04</span>
                Aggravating / Relieving Factors
              </div>
              {clinicalState.aggravatingFactors.length > 0 ? (
                <div className="clinical-tags">
                  {clinicalState.aggravatingFactors.map((f, i) => (
                    <span key={i}>{f}</span>
                  ))}
                </div>
              ) : (
                <div className="clinical-placeholder">Pending input...</div>
              )}
            </div>

            {/* Associated Symptoms */}
            <div className="clinical-section">
              <div className="clinical-section-title">
                <span>05</span>
                Associated Symptoms
              </div>
              {clinicalState.associatedSymptoms.length > 0 ? (
                <div className="clinical-tags">
                  {clinicalState.associatedSymptoms.map((s, i) => (
                    <span key={i}>{s}</span>
                  ))}
                </div>
              ) : (
                <div className="clinical-placeholder">Pending input...</div>
              )}
            </div>

            {/* Step 4 Preview */}
            <div className="ayush-section" style={{ marginTop: "16px" }}>
              <div className="ayush-section-header">
                <div className="ayush-icon">
                  <Sparkles size={17} />
                </div>
                <div>
                  <strong>Next: Body & Health Profile</strong>
                  <span>Personalized Assessment</span>
                </div>
              </div>
              <p style={{ fontSize: "12px", color: "#64748b", marginTop: "8px" }}>
                Body constitution (Vata, Pitta, Kapha), digestive strength, and bowel habits will be determined next.
              </p>
            </div>

            <div className="assessment-privacy">
              <ShieldCheck size={16} />
              <span>Encrypted ABDM Intake Session</span>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
