import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Activity,
  Mic,
  ScanLine,
  Stethoscope,
  HeartPulse,
  UserRound,
  FileCheck2,
  AlertTriangle,
  Database,
} from "lucide-react";

function FeatureCard({ icon: Icon, title, description, tag }) {
  return (
    <div className="feature-card">
      <div className="feature-icon">
        <Icon size={22} />
      </div>
      {tag && (
        <span style={{
          fontSize: "10px",
          textTransform: "uppercase",
          background: "#e0f2fe",
          color: "#0284c7",
          padding: "2px 8px",
          borderRadius: "12px",
          fontWeight: "700",
          letterSpacing: "0.5px",
          display: "inline-block",
          marginBottom: "6px"
        }}>
          {tag}
        </span>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="feature-arrow">
        <ArrowRight size={18} />
      </div>
    </div>
  );
}

function WorkflowStep({ number, title, description }) {
  return (
    <div className="workflow-step">
      <div className="workflow-number">{number}</div>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function LandingPage({ onStart, onDoctorLogin }) {
  return (
    <div className="app">
      <main>
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-container">
            <div className="hero-content">
              <div className="eyebrow">
                <Sparkles size={16} />
                Smart India Hackathon 2026 • Problem ID 26047
              </div>

              <h1>
                Pre-Consultation Case Taking.
                <span> Powered by Ayush AI.</span>
              </h1>

              <p className="hero-description">
                Bridging the hospital OPD bottleneck. AyushCare AI conducts conversational,
                multilingual history-taking, assesses <strong>10-point body constitution, digestion, and health habits</strong>,
                scans prior prescriptions, and delivers a structured, <strong>physician-ready</strong> case sheet to the doctor before the patient steps into the consultation room.
              </p>

              <div className="hero-buttons">
                <button className="primary-button" onClick={onStart}>
                  Start Patient Intake Kiosk
                  <ArrowRight size={18} />
                </button>

                <button className="secondary-button" onClick={onDoctorLogin}>
                  <Stethoscope size={18} />
                  Open Doctor OPD Portal
                </button>
              </div>

              <div className="trust-row">
                <div className="trust-item">
                  <CheckCircle2 size={17} />
                  <span>Ministry of Ayush Aligned</span>
                </div>

                <div className="trust-item">
                  <ShieldCheck size={17} />
                  <span>ABHA & ABDM Compliant</span>
                </div>

                <div className="trust-item">
                  <Activity size={17} />
                  <span>Red-Flag Triage Engine</span>
                </div>
              </div>
            </div>

            {/* Hero Visual Mockup */}
            <div className="hero-visual">
              <div className="glow glow-one"></div>
              <div className="glow glow-two"></div>

              <div className="assessment-card">
                <div className="assessment-header">
                  <div>
                    <span className="small-label">AI PRE-OPD INTAKE</span>
                    <h3>Patient Case History Engine</h3>
                  </div>

                  <div className="status">
                    <span></span>
                    Live Kiosk
                  </div>
                </div>

                <div className="conversation">
                  <div className="message ai-message">
                    <div className="avatar ai-avatar">
                      <Sparkles size={17} />
                    </div>
                    <div className="message-content">
                      <span>AyushCare AI</span>
                      <p>
                        Hello! What is your main health concern today? You can speak or tap.
                      </p>
                    </div>
                  </div>

                  <div className="message user-message">
                    <div className="message-content">
                      <span>You (Voice Input)</span>
                      <p>
                        Severe joint pain with morning stiffness and loss of appetite for 3 months.
                      </p>
                    </div>
                    <div className="avatar user-avatar">
                      <UserRound size={17} />
                    </div>
                  </div>

                  <div className="message ai-message">
                    <div className="avatar ai-avatar">
                      <Sparkles size={17} />
                    </div>
                    <div className="message-content">
                      <span>AyushCare AI (Health & Digestion Check)</span>
                      <p>
                        I understand. How is your daily appetite, digestion, and bowel routine? Do you experience heaviness after meals?
                      </p>
                    </div>
                  </div>
                </div>

                <div className="voice-panel">
                  <div className="voice-icon">
                    <Mic size={20} />
                  </div>
                  <div className="waveform">
                    {[18, 28, 42, 24, 36, 52, 32, 44, 26, 48, 35, 22, 40, 30].map(
                      (height, index) => (
                        <span key={index} style={{ height: `${height}px` }}></span>
                      )
                    )}
                  </div>
                  <span className="recording">Speech Recognition Active</span>
                </div>
              </div>

              <div className="floating-card history-card">
                <div className="floating-icon">
                  <Activity size={17} />
                </div>
                <div>
                  <span>Body Type & Digestion</span>
                  <strong>Vata-Kapha • Irregular Digestion</strong>
                </div>
                <CheckCircle2 size={18} className="check-icon" />
              </div>

              <div className="floating-card summary-card">
                <div className="summary-top">
                  <div className="floating-icon">
                    <FileCheck2 size={17} />
                  </div>
                  <span>NAMASTE CODE MATCH</span>
                </div>
                <div style={{ fontSize: "12px", color: "#0369a1", fontWeight: 700 }}>
                  AYU-KA-001 (Inflammatory Arthritis)
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats">
          <div className="stats-container">
            <div className="stat">
              <strong>2 - 5 min</strong>
              <span>Saved per OPD consultation</span>
            </div>

            <div className="stat">
              <strong>10-Point</strong>
              <span>Health & Body Profile Captured</span>
            </div>

            <div className="stat">
              <strong>5+</strong>
              <span>Indian languages supported</span>
            </div>

            <div className="stat">
              <strong>100%</strong>
              <span>ABDM & NAMASTE ready</span>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section" id="features">
          <div className="section-container">
            <div className="section-heading">
              <div className="eyebrow">
                <Sparkles size={16} />
                Engineered for Ministry of Ayush Requirements
              </div>

              <h2>
                Complete clinical intake.
                <span> Built for busy Ayush hospitals.</span>
              </h2>

              <p>
                Addressing every parameter specified in SIH Problem Statement 26047 — from voice interactions and red-flag triage to classical Ayurvedic diagnostic models.
              </p>
            </div>

            <div className="features-grid">
              <FeatureCard
                icon={Mic}
                tag="Voice-Enabled"
                title="Vernacular Voice & Touch Kiosk"
                description="Patients interact naturally using Speech-to-Text in Hindi or English, with audio read-aloud support for non-literate patients."
              />

              <FeatureCard
                icon={Stethoscope}
                tag="Ayurvedic Core"
                title="Body Constitution & Digestion Profile"
                description="Interactive assessment of body type (Vata/Pitta/Kapha), digestive fire, bowel habits, tongue appearance, and sleep."
              />

              <FeatureCard
                icon={AlertTriangle}
                tag="Clinical Safety"
                title="Automated Red-Flag Triage"
                description="Real-time screening detects cardiac, acute respiratory, or neurological emergencies, instantly tagging patients with Red/Amber priority."
              />

              <FeatureCard
                icon={ScanLine}
                tag="Smart OCR"
                title="Prescription & Report Timeline"
                description="Upload or photograph prior medical reports to auto-extract past allopathic drugs, chronic conditions, and lab values."
              />

              <FeatureCard
                icon={Database}
                tag="Interoperability"
                title="Standardized Medical Coding"
                description="Maps patient symptoms to standard National AYUSH Morbidity Codes (e.g., Joint arthritis, Acidity/GERD, Migraine)."
              />

              <FeatureCard
                icon={FileCheck2}
                tag="Physician Dashboard"
                title="Doctor OPD Portal & E-Prescription"
                description="Doctors review auto-synthesized case sheets, write treatment plans, recommend diet advice, and print OPD slips."
              />
            </div>
          </div>
        </section>

        {/* Workflow Section */}
        <section className="workflow-section" id="how-it-works">
          <div className="section-container">
            <div className="workflow-layout">
              <div className="workflow-intro">
                <div className="eyebrow">
                  <Activity size={16} />
                  Pre-Consultation Workflow
                </div>

                <h2>
                  From hospital waiting room
                  <span> to doctor consultation.</span>
                </h2>

                <p>
                  AyushCare AI handles the 15-minute case-taking conversation while the patient waits, so the Ayurvedic physician can dedicate 100% of their consultation to clinical examination and personalized healing.
                </p>

                <button className="primary-button" onClick={onStart} style={{ marginTop: "16px" }}>
                  Try Kiosk Experience
                  <ArrowRight size={17} />
                </button>
              </div>

              <div className="workflow-list">
                <WorkflowStep
                  number="01"
                  title="ABHA Verification & Consent"
                  description="Quick patient registration with 14-digit Ayushman Bharat Health Account linking and digital consent capture."
                />

                <WorkflowStep
                  number="02"
                  title="Conversational Symptom Intake"
                  description="Patient speaks or taps chief complaint, duration, pain severity, and aggravating/relieving factors."
                />

                <WorkflowStep
                  number="03"
                  title="10-Point Body & Digestion Check"
                  description="Interactive assessment of body type, digestion, bowel habits, and daily lifestyle."
                />

                <WorkflowStep
                  number="04"
                  title="Report OCR & Triage Generation"
                  description="Scans past prescriptions, detects emergency red flags, and issues an OPD token number."
                />

                <WorkflowStep
                  number="05"
                  title="Physician Review & E-Prescription"
                  description="Doctor views structured case sheet, validates disease diagnosis, prescribes medicines, and prints OPD card."
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="section-container">
            <div className="cta-card">
              <div className="cta-decoration decoration-one"></div>
              <div className="cta-decoration decoration-two"></div>

              <div className="cta-content">
                <div className="eyebrow light">
                  <Sparkles size={16} />
                  SIH 2026 Ready Solution
                </div>

                <h2>
                  Experience the Complete
                  <br />
                  Ayush Intake & OPD Platform
                </h2>

                <p>
                  Test both ends of the healthcare journey: the patient-facing intake kiosk and the physician-facing consultation dashboard.
                </p>

                <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                  <button className="cta-button" onClick={onStart}>
                    Launch Patient Kiosk
                    <ArrowRight size={18} />
                  </button>
                  <button
                    className="cta-button"
                    onClick={onDoctorLogin}
                    style={{ background: "#ffffff", color: "#0f766e" }}
                  >
                    Open Doctor Portal
                    <Stethoscope size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="logo">
            <div className="logo-icon">
              <HeartPulse size={20} />
            </div>
            <span>
              AyushCare <strong>AI</strong>
            </span>
          </div>

          <p>
            SIH Problem Statement 26047: Patient Case-Taking Software for Ministry of Ayush / All India Institute of Ayurveda.
          </p>

          <span className="footer-copy">
            © 2026 AyushCare AI • Transforming Ayush OPD Consultations.
          </span>
        </div>
      </footer>
    </div>
  );
}
