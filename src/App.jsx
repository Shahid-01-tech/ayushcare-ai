import { useEffect, useState } from "react";
import Navbar from "./components/common/Navbar";
import LandingPage from "./components/landing/LandingPage";
import PatientRegistration from "./components/intake/PatientRegistration";
import ConsentPage from "./components/intake/ConsentPage";
import AIAssessment from "./components/intake/AIAssessment";
import AyushAssessment from "./components/intake/AyushAssessment";
import DocumentUpload from "./components/intake/DocumentUpload";
import CaseSummaryPreview from "./components/intake/CaseSummaryPreview";
import DoctorDashboard from "./components/doctor/DoctorDashboard";
import PatientDashboard from "./components/patient/PatientDashboard";
import PatientProfile from "./components/patient/PatientProfile";
import AssessmentHistory from "./components/patient/AssessmentHistory";
import DoctorAppointment from "./components/patient/DoctorAppointment";
import PatientTreatmentPlan from "./components/patient/PatientTreatmentPlan";
import { SAMPLE_PATIENTS } from "./data/sampleCases";
import { matchNamasteCode } from "./data/namasteCodes";

function App() {
  // Navigation states: 'home' | 'dashboard' | 'profile' | 'history' | 'registration' | 'consent' | 'assessment' | 'ayush' | 'documents' | 'summary' | 'doctor'
  const [page, setPage] = useState("home");
  const [appointment, setAppointment] = useState(null);

  // Keep navigation in one place so buttons and the navbar always switch the active view.
  const navigate = (targetPage) => {
    setPage(targetPage);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  // Always return to the real landing page and clear transient appointment UI state.
  const goHome = () => {
    setAppointment(null);
    setPage("home");
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  // Persistent OPD Patients Queue (Initialized with realistic SIH sample cases)
  const [patientCases, setPatientCases] = useState(SAMPLE_PATIENTS);

  // Active intake session data
  const emptyPatient = {
    name: "",
    age: "",
    gender: "",
    mobile: "",
    language: "English",
    abhaId: "",
    consent: false,
    chiefComplaint: "",
    duration: "",
    severity: 6,
    aggravatingFactors: [],
    associatedSymptoms: [],
    triage: null,
    prakriti: null,
    agni: "",
    koshtha: "",
    jihwaStatus: "",
    documents: [],
    tokenNo: "",
    appointment: null,
    profileId: "",
    profileCreatedAt: "",
    profileStatus: "new",
  };

  const [currentPatient, setCurrentPatient] = useState(() => {
    try {
      const saved = localStorage.getItem("ayushcare_active_patient");
      return saved ? { ...emptyPatient, ...JSON.parse(saved) } : emptyPatient;
    } catch {
      return emptyPatient;
    }
  });

  // Keep the active patient/profile available after navigation or a browser refresh.
  useEffect(() => {
    if (currentPatient.profileId) {
      localStorage.setItem("ayushcare_active_patient", JSON.stringify(currentPatient));
    }
  }, [currentPatient]);

  const createNewPatientProfile = () => {
    setAppointment(null);
    setCurrentPatient({
      ...emptyPatient,
      profileId: `PAT-${Date.now().toString().slice(-8)}`,
      profileCreatedAt: new Date().toISOString(),
      profileStatus: "new",
    });
    navigate("registration");
  };

  const startNewAssessment = () => {
    setCurrentPatient((prev) => ({
      ...prev,
      consent: false,
      chiefComplaint: "",
      duration: "",
      severity: 6,
      aggravatingFactors: [],
      associatedSymptoms: [],
      triage: null,
      prakriti: null,
      agni: "",
      koshtha: "",
      jihwaStatus: "",
      documents: [],
      tokenNo: "",
      appointment: prev.appointment || null,
      profileStatus: "active",
    }));
    navigate("registration");
  };

  // Step 1: Registration completed
  const handleRegistrationComplete = (formData) => {
    setCurrentPatient((prev) => ({
      ...prev,
      ...formData,
      profileId: prev.profileId || `PAT-${Date.now().toString().slice(-8)}`,
      profileCreatedAt: prev.profileCreatedAt || new Date().toISOString(),
      profileStatus: "active",
    }));
    navigate("consent");
  };

  // Step 2: Consent accepted
  const handleConsentComplete = () => {
    navigate("assessment");
  };

  // Step 3: Symptom Intake completed
  const handleSymptomComplete = (symptomData) => {
    setCurrentPatient((prev) => ({
      ...prev,
      ...symptomData,
    }));
    navigate("ayush");
  };

  // Step 4: Ayush 10-Part & 8-Part Assessment completed
  const handleAyushComplete = (ayushData) => {
    setCurrentPatient((prev) => ({
      ...prev,
      ...ayushData,
    }));
    navigate("documents");
  };

  // Step 5: Document Upload & Final Case Synthesis completed
  const handleDocumentsComplete = (documents) => {
    const nextTokenNumber = String(patientCases.length + 101);
    const namasteCode = matchNamasteCode(
      currentPatient.chiefComplaint,
      currentPatient.associatedSymptoms
    );

    const completedCase = {
      ...currentPatient,
      id: `AYUSH-OPD-${nextTokenNumber}`,
      tokenNo: nextTokenNumber,
      documents,
      registeredAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      department: "Kayachikitsa",
      namasteMatch: namasteCode,
      prescribedMedicines: (namasteCode.suggestedAushadhi || []).map((name) => ({
        name,
        dosage: "1 dose BD",
        anupana: "Warm water",
        duration: "1 month",
      })),
      pathyaAdvised: namasteCode.pathya || [],
      apathyaAdvised: namasteCode.apathya || [],
      doctorNotes: "",
    };

    setCurrentPatient(completedCase);
    // Add to doctor queue at top
    setPatientCases((prev) => [completedCase, ...prev]);
    navigate("summary");
  };

  // Doctor modifies or prescribes
  const handleUpdateCase = (updatedCase) => {
    setPatientCases((prev) =>
      prev.map((c) => (c.id === updatedCase.id ? updatedCase : c))
    );
    if (currentPatient.id === updatedCase.id) {
      setCurrentPatient(updatedCase);
    }
  };

  return (
    <div className="main-wrapper">
      {/* Universal Top Navigation */}
      <Navbar
        currentMode={page === "doctor" ? "doctor" : "kiosk"}
        onNavigate={navigate}
        onToggleDoctorMode={() => navigate(page === "doctor" ? "home" : "doctor")}
        selectedLanguage={currentPatient.language}
        onLanguageChange={(lang) =>
          setCurrentPatient((prev) => ({ ...prev, language: lang }))
        }
      />

      {/* View Router */}
      {page === "home" && (
        <LandingPage
          onStart={createNewPatientProfile}
          onDoctorLogin={() => setPage("doctor")}
        />
      )}

      {page === "registration" && (
        <PatientRegistration
          initialData={currentPatient}
          onBack={() => navigate("home")}
          onContinue={handleRegistrationComplete}
        />
      )}

      {page === "consent" && (
        <ConsentPage
          patientName={currentPatient.name}
          onBack={() => navigate("registration")}
          onContinue={handleConsentComplete}
        />
      )}

      {page === "assessment" && (
        <AIAssessment
          patientData={currentPatient}
          onBack={() => navigate("consent")}
          onComplete={handleSymptomComplete}
        />
      )}

      {page === "ayush" && (
        <AyushAssessment
          patientData={currentPatient}
          onBack={() => navigate("assessment")}
          onComplete={handleAyushComplete}
        />
      )}

      {page === "documents" && (
        <DocumentUpload
          patientData={currentPatient}
          onBack={() => navigate("ayush")}
          onComplete={handleDocumentsComplete}
        />
      )}

      {page === "summary" && (
        <CaseSummaryPreview
          patientCase={currentPatient}
          onOpenDoctorView={() => navigate("doctor")}
          onGoHome={goHome}
        />
      )}

      {page === "dashboard" && (
        <PatientDashboard
          patientCase={appointment ? { ...currentPatient, appointment } : currentPatient}
          patientCases={patientCases}
          onStartAssessment={startNewAssessment}
          onViewHistory={() => navigate("history")}
          onOpenDoctor={() => navigate("doctor")}
          onBookAppointment={() => navigate("appointment")}
          onOpenProfile={() => navigate("profile")}
          onOpenTreatment={() => navigate("treatment")}
        />
      )}

      {page === "profile" && (
        <PatientProfile
          patientCase={currentPatient}
          onBack={() => navigate("dashboard")}
          onStartAssessment={startNewAssessment}
          onUpdateProfile={(updatedProfile) => setCurrentPatient((prev) => ({ ...prev, ...updatedProfile }))}
        />
      )}

      {page === "appointment" && (
        <DoctorAppointment
          patientCase={currentPatient}
          onBack={() => navigate("dashboard")}
          onConfirmed={(newAppointment) => {
            setAppointment(newAppointment);
            setCurrentPatient((prev) => ({ ...prev, appointment: newAppointment }));
          }}
        />
      )}

      {page === "treatment" && (
        <PatientTreatmentPlan
          patientCase={currentPatient}
          onBack={() => navigate("dashboard")}
          onBookAppointment={() => navigate("appointment")}
        />
      )}

      {page === "history" && (
        <AssessmentHistory
          patientCase={currentPatient}
          patientCases={patientCases}
          onBack={() => navigate("dashboard")}
          onStartAssessment={startNewAssessment}
          onViewCase={() => setPage("summary")}
        />
      )}

      {page === "doctor" && (
        <DoctorDashboard
          patientCases={patientCases}
          onUpdateCase={handleUpdateCase}
          onNewIntakeClick={createNewPatientProfile}
        />
      )}
    </div>
  );
}

export default App;