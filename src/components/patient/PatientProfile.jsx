import { useState } from "react";
import { Activity, ArrowLeft, CheckCircle2, FileText, HeartPulse, LockKeyhole, Pencil, Phone, ShieldCheck, UserRound } from "lucide-react";

const fallbackPatient = {
  name: "Rahul Patel", age: 32, gender: "Male", mobile: "98765 43210",
  language: "English", abhaId: "ABHA-XXXX-XXXX", chiefComplaint: "Digestive discomfort",
  prakriti: "Pitta", agni: "Variable", koshtha: "Regular", consent: true, documents: []
};

function InfoRow({ label, value }) {
  return <div className="profile-info-row"><span>{label}</span><strong>{value || "Not provided"}</strong></div>;
}

export default function PatientProfile({ patientCase, onBack, onStartAssessment, onUpdateProfile }) {
  const source = patientCase?.name ? patientCase : fallbackPatient;
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: source.name || "", age: source.age || "", gender: source.gender || "",
    mobile: source.mobile || "", language: source.language || "English", abhaId: source.abhaId || ""
  });

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  const save = () => { setEditing(false); onUpdateProfile?.({ ...patientCase, ...form }); setSaved(true); setTimeout(() => setSaved(false), 2200); };

  return (
    <div className="patient-profile-page">
      <div className="patient-profile-shell">
        <button className="profile-back-button" onClick={onBack}><ArrowLeft size={16} /> Back to dashboard</button>

        <section className="profile-hero">
          <div className="profile-avatar"><UserRound size={38} /></div>
          <div className="profile-hero-copy"><span className="patient-section-kicker">MY PROFILE</span><h1>{form.name || "Patient Profile"}</h1><p>Manage your personal details and review the health information connected to your AyushCare AI account.</p><div className="profile-badges"><span><ShieldCheck size={14} /> Profile verified</span><span><LockKeyhole size={14} /> Private health data</span>{patientCase?.profileId && <span><UserRound size={14} /> {patientCase.profileId}</span>}</div></div>
          <button className="profile-edit-button" onClick={() => setEditing((value) => !value)}><Pencil size={15} /> {editing ? "Cancel" : "Edit profile"}</button>
        </section>

        {saved && <div className="profile-save-message"><CheckCircle2 size={17} /> Profile changes saved for this session.</div>}

        <div className="profile-grid">
          <main>
            <section className="profile-panel">
              <div className="profile-panel-heading"><div><span className="patient-section-kicker">PERSONAL INFORMATION</span><h2>Basic details</h2></div><UserRound size={20} /></div>
              {editing ? <div className="profile-form-grid">
                <label>Full name<input value={form.name} onChange={(e) => update("name", e.target.value)} /></label>
                <label>Age<input type="number" value={form.age} onChange={(e) => update("age", e.target.value)} /></label>
                <label>Gender<select value={form.gender} onChange={(e) => update("gender", e.target.value)}><option>Male</option><option>Female</option><option>Other</option><option>Prefer not to say</option></select></label>
                <label>Preferred language<select value={form.language} onChange={(e) => update("language", e.target.value)}><option>English</option><option>Hindi</option><option>Gujarati</option><option>Marathi</option><option>Tamil</option></select></label>
                <label>Mobile number<input value={form.mobile} onChange={(e) => update("mobile", e.target.value)} /></label>
                <label>ABHA ID<input value={form.abhaId} onChange={(e) => update("abhaId", e.target.value)} /></label>
                <div className="profile-form-actions"><button className="profile-save-button" onClick={save}>Save changes</button></div>
              </div> : <div className="profile-info-grid"><InfoRow label="Full name" value={form.name} /><InfoRow label="Age" value={form.age ? `${form.age} years` : "Not provided"} /><InfoRow label="Gender" value={form.gender} /><InfoRow label="Mobile number" value={form.mobile} /><InfoRow label="Preferred language" value={form.language} /><InfoRow label="ABHA ID" value={form.abhaId} /></div>}
            </section>

            <section className="profile-panel"><div className="profile-panel-heading"><div><span className="patient-section-kicker">HEALTH PROFILE</span><h2>Your assessment snapshot</h2></div><HeartPulse size={20} /></div><div className="profile-health-grid"><div><span>Current concern</span><strong>{source.chiefComplaint || "No recent concern"}</strong></div><div><span>Body type</span><strong>{source.prakriti || "Not recorded"}</strong></div><div><span>Digestion</span><strong>{source.agni || "Not recorded"}</strong></div><div><span>Bowel pattern</span><strong>{source.koshtha || "Not recorded"}</strong></div></div><button className="profile-outline-button" onClick={onStartAssessment}><Activity size={16} /> Start a new assessment</button></section>

            <section className="profile-panel"><div className="profile-panel-heading"><div><span className="patient-section-kicker">DOCUMENTS</span><h2>Health documents</h2></div><FileText size={20} /></div>{source.documents?.length ? <div className="profile-doc-list">{source.documents.map((doc, i) => <div key={i}><FileText size={16} /><span>{typeof doc === "string" ? doc : doc.name || `Document ${i + 1}`}</span></div>)}</div> : <div className="profile-empty"><FileText size={25} /><p>No documents uploaded yet.</p><small>Documents added during an assessment will appear here.</small></div>}</section>
          </main>

          <aside>
            <section className="profile-panel profile-security"><div className="profile-security-icon"><ShieldCheck size={21} /></div><span className="patient-section-kicker">CONSENT & PRIVACY</span><h3>Your data is protected</h3><p>Your information is used to prepare your case for healthcare professionals and is shown only within the application workflow.</p><div className="profile-consent-status"><CheckCircle2 size={16} /> Consent active</div></section>
            <section className="profile-panel"><span className="patient-section-kicker">ACCOUNT STATUS</span><h3>Patient account</h3><div className="profile-account-row"><Phone size={17} /><div><span>Contact</span><strong>{form.mobile || "Not provided"}</strong></div></div><div className="profile-account-row"><Activity size={17} /><div><span>Assessments</span><strong>{source.id ? "1 completed" : "No completed assessment"}</strong></div></div><div className="profile-account-row"><FileText size={17} /><div><span>Documents</span><strong>{source.documents?.length || 0} uploaded</strong></div></div></section>
          </aside>
        </div>
      </div>
    </div>
  );
}
