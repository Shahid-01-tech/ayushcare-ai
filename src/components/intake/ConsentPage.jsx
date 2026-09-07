import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileText,
  HeartPulse,
  Mic,
  ShieldCheck,
  Sparkles,
  Lock,
} from "lucide-react";

export default function ConsentPage({ onBack, onContinue, patientName }) {
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");

  const handleContinue = () => {
    if (!consent) {
      setError("Please check the consent box to proceed with the AI case intake.");
      return;
    }
    setError("");
    onContinue();
  };

  return (
    <div className="consent-page">
      <div className="consent-background"></div>

      <header className="registration-header">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="logo">
          <div className="logo-icon">
            <HeartPulse size={22} />
          </div>
          <span>
            AyushCare <strong>AI</strong>
          </span>
        </div>

        <div className="secure-badge">
          <ShieldCheck size={16} />
          ABDM Certified
        </div>
      </header>

      <main className="consent-main">
        {/* Progress */}
        <div className="registration-progress">
          <div className="progress-step completed">
            <span>
              <CheckCircle2 size={16} />
            </span>
            <p>Registration</p>
          </div>
          <div className="progress-line active-line"></div>
          <div className="progress-step active">
            <span>2</span>
            <p>Consent</p>
          </div>
          <div className="progress-line"></div>
          <div className="progress-step">
            <span>3</span>
            <p>Symptom Intake</p>
          </div>
          <div className="progress-line"></div>
          <div className="progress-step">
            <span>4</span>
            <p>Body & Health</p>
          </div>
        </div>

        {/* Main card */}
        <div className="consent-card">
          <div className="consent-icon">
            <ShieldCheck size={32} />
          </div>

          <div className="eyebrow">
            <Sparkles size={16} />
            Informed Digital Health Consent
          </div>

          <h1>
            Your privacy comes
            <span> first.</span>
          </h1>

          <p className="consent-intro">
            {patientName ? `Hello ${patientName}. ` : ""}Before starting your AI-assisted case intake,
            please review how your health information is processed and transferred to your consulting doctor.
          </p>

          <div className="consent-info-grid">
            <div className="consent-info">
              <div className="info-icon">
                <FileText size={19} />
              </div>
              <div>
                <h3>What we collect</h3>
                <p>
                  Health concerns, symptom duration, appetite & digestion patterns, daily bowel habits, and optional past records.
                </p>
              </div>
            </div>

            <div className="consent-info">
              <div className="info-icon">
                <HeartPulse size={19} />
              </div>
              <div>
                <h3>Physician Decision Support</h3>
                <p>
                  All captured data is synthesized into a standardized NAMASTE-coded Ayush case sheet for your doctor. AI does not replace doctor diagnosis.
                </p>
              </div>
            </div>

            <div className="consent-info">
              <div className="info-icon">
                <Mic size={19} />
              </div>
              <div>
                <h3>Vernacular Voice Input</h3>
                <p>
                  Voice dictation (Hindi/English) is processed locally in your browser to transcribe your symptoms accurately.
                </p>
              </div>
            </div>

            <div className="consent-info">
              <div className="info-icon">
                <Lock size={19} />
              </div>
              <div>
                <h3>ABDM Data Protection</h3>
                <p>
                  Your information complies with Ayushman Bharat Digital Mission (ABDM) standards and is shared only with your consulting physician.
                </p>
              </div>
            </div>
          </div>

          {/* Consent checkbox */}
          <label className="main-consent" style={{ marginTop: "24px" }}>
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => {
                setConsent(e.target.checked);
                setError("");
              }}
            />
            <span className="main-consent-check">
              {consent && <CheckCircle2 size={15} />}
            </span>
            <span>
              I understand how my clinical information will be used, and I consent to AyushCare AI
              recording my case history for the hospital Ayurvedic consultation.
            </span>
          </label>

          {error && <div className="form-error" style={{ marginTop: "12px" }}>{error}</div>}

          {/* Buttons */}
          <div className="consent-actions">
            <button className="consent-back-button" onClick={onBack}>
              <ArrowLeft size={17} />
              Back
            </button>

            <button className="consent-continue-button" onClick={handleContinue}>
              Agree & Start Intake
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="consent-footer">
            <ShieldCheck size={15} />
            Verified ABDM Consent Artifact • Ministry of Ayush Compliant
          </div>
        </div>
      </main>
    </div>
  );
}
