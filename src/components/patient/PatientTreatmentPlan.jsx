import { ArrowLeft, ArrowRight, CalendarDays, CheckCircle2, Clock3, FileText, Pill, Stethoscope, Utensils, AlertCircle } from "lucide-react";

const fallback = {
  name: "Rahul Patel",
  chiefComplaint: "Digestive discomfort",
  prescribedMedicines: [
    { name: "Sample AYUSH formulation", dosage: "1 dose BD", anupana: "Warm water", duration: "1 month" },
  ],
  pathyaAdvised: ["Warm water", "Light diet", "Barley"],
  apathyaAdvised: ["Curd at night", "Cold drinks", "Deep fried items"],
  panchakarmaAdvised: "As advised by the physician",
  doctorNotes: "Follow the prescribed routine and review symptoms during follow-up.",
};

function formatFollowUp(value) {
  if (!value) return "Not scheduled";
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default function PatientTreatmentPlan({ patientCase, onBack, onBookAppointment }) {
  const patient = patientCase?.name ? patientCase : fallback;
  const medicines = patient.prescribedMedicines || [];
  const pathya = patient.pathyaAdvised || [];
  const apathya = patient.apathyaAdvised || [];
  const followUpDate = patient.followUpDate;
  const followUpStatus = patient.followUpStatus || (followUpDate ? "Scheduled" : "Not scheduled");
  const doctorName = patient.doctorName || patient.appointment?.doctor || "AYUSH Physician";

  return (
    <div className="patient-treatment-page">
      <div className="patient-treatment-shell">
        <button className="treatment-back" onClick={onBack}><ArrowLeft size={16}/> Back to Dashboard</button>

        <section className="treatment-hero">
          <div>
            <span className="patient-section-kicker">MY CARE PLAN</span>
            <h1>Your prescription & treatment plan</h1>
            <p>Review the treatment instructions shared by your AYUSH healthcare professional and keep track of your next follow-up.</p>
            <div className="treatment-doctor-line"><Stethoscope size={15}/> {doctorName} <span>•</span> {patient.department || "AYUSH OPD"}</div>
          </div>
          <div className="treatment-hero-icon"><Pill size={37}/></div>
        </section>

        <div className="treatment-grid">
          <main>
            <section className="treatment-card">
              <div className="treatment-card-head"><div><span className="patient-section-kicker">PRESCRIPTION</span><h2>Medicines</h2></div><span className="treatment-count">{medicines.length} item{medicines.length === 1 ? "" : "s"}</span></div>
              {medicines.length ? medicines.map((med, i) => (
                <div className="treatment-medicine" key={`${med.name}-${i}`}>
                  <div className="treatment-pill-icon"><Pill size={18}/></div>
                  <div className="treatment-med-main"><strong>{med.name}</strong><div className="treatment-med-meta"><span>Dosage: <b>{med.dosage || "As advised"}</b></span><span>With: <b>{med.anupana || "As advised"}</b></span><span>Duration: <b>{med.duration || "As advised"}</b></span></div></div>
                </div>
              )) : <div className="treatment-empty"><Pill size={22}/><p>No prescription has been added yet.</p></div>}
            </section>

            <section className="treatment-card">
              <div className="treatment-card-head"><div><span className="patient-section-kicker">DIET & LIFESTYLE</span><h2>Daily guidance</h2></div><Utensils size={19}/></div>
              <div className="treatment-advice-grid">
                <div className="treatment-advice good"><h3><CheckCircle2 size={16}/> Recommended</h3>{pathya.length ? pathya.map((x,i)=><span key={i}>✓ {x}</span>) : <span>No specific advice recorded.</span>}</div>
                <div className="treatment-advice avoid"><h3><AlertCircle size={16}/> Avoid</h3>{apathya.length ? apathya.map((x,i)=><span key={i}>• {x}</span>) : <span>No restrictions recorded.</span>}</div>
              </div>
              {patient.panchakarmaAdvised && <div className="treatment-special"><strong>Additional treatment</strong><p>{patient.panchakarmaAdvised}</p></div>}
            </section>

            <section className="treatment-card">
              <div className="treatment-card-head"><div><span className="patient-section-kicker">DOCTOR NOTES</span><h2>Instructions for you</h2></div><FileText size={19}/></div>
              <div className="treatment-notes"><FileText size={17}/><p>{patient.doctorNotes || "No additional instructions have been added."}</p></div>
            </section>
          </main>

          <aside>
            <section className={`followup-status-card ${followUpDate ? "scheduled" : "pending"}`}>
              <div className="followup-status-top"><div className="followup-calendar"><CalendarDays size={20}/></div><span className="followup-status-badge">{followUpStatus}</span></div>
              <span className="patient-section-kicker">FOLLOW-UP</span>
              <h2>{followUpDate ? formatFollowUp(followUpDate) : "No follow-up date yet"}</h2>
              <p>{followUpDate ? "Your doctor has added a follow-up date to your care plan." : "Book a consultation or wait for your doctor to set a follow-up date."}</p>
              <div className="followup-mini-row"><Clock3 size={15}/><span>{followUpDate ? "Follow-up recommended" : "Status: pending"}</span></div>
              <button className="treatment-primary" onClick={onBookAppointment}>{followUpDate ? "Book follow-up consultation" : "Book consultation"} <ArrowRight size={15}/></button>
            </section>

            <section className="treatment-safety-card"><CheckCircle2 size={17}/><div><strong>Important</strong><p>Take medicines only as prescribed. This screen is a prototype and does not replace professional medical advice.</p></div></section>
          </aside>
        </div>
      </div>
    </div>
  );
}
