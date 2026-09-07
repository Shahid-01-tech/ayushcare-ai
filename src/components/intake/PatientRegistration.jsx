import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  HeartPulse,
  ShieldCheck,
  Sparkles,
  UserRound,
  CreditCard,
} from "lucide-react";

export default function PatientRegistration({ onBack, onContinue, initialData }) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    age: initialData?.age || "",
    gender: initialData?.gender || "",
    mobile: initialData?.mobile || "",
    language: initialData?.language || "English",
    abhaId: initialData?.abhaId || "",
    consent: initialData?.consent || false,
  });

  const [isAbhaVerified, setIsAbhaVerified] = useState(!!initialData?.abhaId);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setError("");
  };

  // Demo ABHA autofill helper
  const handleAutofillAbha = () => {
    setFormData({
      ...formData,
      name: "Ramesh Sharma",
      age: "48",
      gender: "Male",
      mobile: "9876543210",
      language: "Hindi",
      abhaId: "91-4523-8891-2304",
      consent: true,
    });
    setIsAbhaVerified(true);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError("Please enter the patient's full name.");
      return;
    }

    if (!formData.age) {
      setError("Please enter the patient's age.");
      return;
    }

    const age = Number(formData.age);
    if (age < 1 || age > 120) {
      setError("Please enter a valid age between 1 and 120.");
      return;
    }

    if (!formData.gender) {
      setError("Please select the patient's gender.");
      return;
    }

    if (formData.mobile && !/^[0-9]{10}$/.test(formData.mobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!formData.consent) {
      setError("Please provide your consent before proceeding with the assessment.");
      return;
    }

    setError("");
    onContinue(formData);
  };

  return (
    <div className="registration-page">
      <div className="registration-background"></div>

      <header className="registration-header">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={18} />
          Back to Home
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
          ABDM Secure
        </div>
      </header>

      <main className="registration-main">
        {/* Progress Tracker */}
        <div className="registration-progress">
          <div className="progress-step active">
            <span>1</span>
            <p>Registration</p>
          </div>
          <div className="progress-line"></div>
          <div className="progress-step">
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

        <div className="registration-layout">
          {/* Left info column */}
          <div className="registration-intro">
            <div className="registration-icon">
              <UserRound size={30} />
            </div>

            <div className="eyebrow">
              <Sparkles size={16} />
              Hospital Pre-OPD Intake
            </div>

            <h1>
              Welcome to AyushCare
              <span> Case Intake.</span>
            </h1>

            <p>
              Please enter your details or link your Ayushman Bharat Health Account (ABHA)
              to retrieve your health records.
            </p>

            <div className="registration-benefits">
              <div>
                <CheckCircle2 size={18} />
                <span>One-tap ABHA ID integration</span>
              </div>
              <div>
                <CheckCircle2 size={18} />
                <span>Multilingual conversational intake</span>
              </div>
              <div>
                <CheckCircle2 size={18} />
                <span>Direct handoff to Ayurvedic physician</span>
              </div>
            </div>

            {/* Quick Demo ABHA Fill Button */}
            <div style={{
              marginTop: "24px",
              padding: "16px",
              background: "#f0fdf4",
              border: "1px dashed #22c55e",
              borderRadius: "12px",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#15803d", fontWeight: "600", fontSize: "13px" }}>
                <Sparkles size={16} />
                Hackathon Jury / Quick Demo
              </div>
              <p style={{ fontSize: "12px", color: "#166534", marginTop: "4px", marginBottom: "10px" }}>
                Test with a pre-configured ABHA-verified chronic arthritis patient:
              </p>
              <button
                type="button"
                onClick={handleAutofillAbha}
                style={{
                  background: "#16a34a",
                  color: "#fff",
                  fontSize: "12px",
                  fontWeight: "600",
                  padding: "8px 14px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px"
                }}
              >
                <CreditCard size={14} />
                Simulate ABHA Quick Link (Ramesh Sharma)
              </button>
            </div>
          </div>

          {/* Registration Form Card */}
          <div className="registration-card">
            <div className="registration-card-header">
              <div>
                <span>STEP 01</span>
                <h2>Patient details</h2>
              </div>
              <div className="registration-card-icon">
                <UserRound size={20} />
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* ABHA ID Section */}
              <div className="form-group">
                <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>ABHA Number / Health ID (Optional)</span>
                  {isAbhaVerified && (
                    <span style={{ fontSize: "11px", color: "#16a34a", fontWeight: "600", display: "flex", alignItems: "center", gap: "4px" }}>
                      <CheckCircle2 size={12} /> ABDM Verified
                    </span>
                  )}
                </label>
                <div className="input-wrapper">
                  <CreditCard size={17} />
                  <input
                    type="text"
                    name="abhaId"
                    placeholder="e.g. 91-4523-8891-2304"
                    value={formData.abhaId}
                    onChange={(e) => {
                      handleChange(e);
                      setIsAbhaVerified(e.target.value.length >= 14);
                    }}
                  />
                </div>
              </div>

              {/* Name */}
              <div className="form-group">
                <label>
                  Full name <span>*</span>
                </label>
                <div className="input-wrapper">
                  <UserRound size={17} />
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter patient full name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Age + Gender */}
              <div className="form-row">
                <div className="form-group">
                  <label>
                    Age <span>*</span>
                  </label>
                  <input
                    className="normal-input"
                    type="number"
                    name="age"
                    placeholder="e.g. 48"
                    min="1"
                    max="120"
                    value={formData.age}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>
                    Gender <span>*</span>
                  </label>
                  <select name="gender" value={formData.gender} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Mobile + Language */}
              <div className="form-row">
                <div className="form-group">
                  <label>Mobile number</label>
                  <div className="input-wrapper">
                    <span className="phone-prefix">+91</span>
                    <input
                      type="tel"
                      name="mobile"
                      placeholder="10-digit mobile"
                      maxLength="10"
                      value={formData.mobile}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Preferred Language</label>
                  <select name="language" value={formData.language} onChange={handleChange}>
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Gujarati">ગુજરાતી (Gujarati)</option>
                    <option value="Marathi">Marathi</option>
                    <option value="Tamil">தமிழ் (Tamil)</option>
                  </select>
                </div>
              </div>

              {/* Consent */}
              <label className="consent-box" style={{ marginTop: "16px" }}>
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                />
                <span className="consent-check"></span>
                <span className="consent-text">
                  I consent to AyushCare AI recording and structuring my clinical history
                  for the hospital Ayurvedic consultation under ABDM guidelines.
                </span>
              </label>

              {error && <div className="form-error">{error}</div>}

              <div className="privacy-note">
                <ShieldCheck size={18} />
                <p>
                  Data is processed securely and directly transmitted to the All India Institute of Ayurveda OPD system.
                </p>
              </div>

              <button type="submit" className="continue-button">
                Continue to Consent & Intake
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
