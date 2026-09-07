import { HeartPulse, Stethoscope, ArrowRight, Home, Globe } from "lucide-react";

export default function Navbar({ currentMode, onNavigate, onToggleDoctorMode, selectedLanguage, onLanguageChange }) {
  const isDoctorMode = currentMode === "doctor";

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo" onClick={() => onNavigate("home")} style={{ cursor: "pointer" }}>
          <div className="logo-icon">
            <HeartPulse size={22} />
          </div>
          <span>
            AyushCare <strong>AI</strong>
          </span>
          <span className="sih-badge" style={{
            fontSize: "11px",
            background: "linear-gradient(135deg, #e6f7ff, #bae7ff)",
            color: "#0050b3",
            padding: "2px 8px",
            borderRadius: "10px",
            fontWeight: "600",
            marginLeft: "6px",
            border: "1px solid #91d5ff"
          }}>
            SIH 26047
          </span>
        </div>

        {!isDoctorMode ? (
          <div className="nav-links">
            <a href="#how-it-works" onClick={() => onNavigate("home")}>How it works</a>
            <a href="#features" onClick={() => onNavigate("home")}>Features</a>
            <a href="#ayush" onClick={() => onNavigate("home")}>Health Assessment</a>
            <button className="nav-dashboard-link" onClick={() => onNavigate("dashboard")}>My Dashboard</button>
            <a href="#about" onClick={() => onNavigate("home")}>About</a>
          </div>
        ) : (
          <div className="doctor-nav-info" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{
              background: "#e6f4ea",
              color: "#137333",
              fontSize: "13px",
              padding: "4px 12px",
              borderRadius: "16px",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "6px"
            }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#137333", display: "inline-block" }}></span>
              All India Institute of Ayurveda OPD • Active Session
            </span>
          </div>
        )}

        <div className="nav-actions">
          {selectedLanguage && onLanguageChange && !isDoctorMode && (
            <div className="lang-select-wrapper" style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "13px", color: "#475569" }}>
              <Globe size={16} />
              <select
                value={selectedLanguage}
                onChange={(e) => onLanguageChange(e.target.value)}
                style={{
                  border: "1px solid #cbd5e1",
                  borderRadius: "6px",
                  padding: "4px 8px",
                  fontSize: "13px",
                  background: "#fff",
                  cursor: "pointer"
                }}
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Gujarati">ગુજરાતી (Gujarati)</option>
                <option value="Marathi">Marathi</option>
                <option value="Tamil">தமிழ் (Tamil)</option>
              </select>
            </div>
          )}

          {isDoctorMode ? (
            <button
              className="secondary-button"
              onClick={() => onNavigate("home")}
              style={{ padding: "8px 16px", fontSize: "13px", display: "flex", alignItems: "center", gap: "6px" }}
            >
              <Home size={15} />
              Exit to Patient Kiosk
            </button>
          ) : (
            <button
              className="doctor-login"
              onClick={onToggleDoctorMode}
              title="Switch to Doctor OPD View"
            >
              <Stethoscope size={16} />
              Doctor OPD Portal
              <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
