import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Clock3,
  FileText,
  HeartPulse,
  Search,
  Stethoscope,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";

const fallbackHistory = [
  {
    id: "demo-1",
    registeredAt: "09:15 AM",
    date: "14 Feb 2026",
    name: "Rahul Patel",
    chiefComplaint: "Digestive discomfort",
    duration: "5 days",
    severity: 6,
    triage: { level: "Moderate" },
    department: "Kayachikitsa",
    namasteMatch: { englishName: "Digestive / gastrointestinal complaint" },
    doctorNotes: "Review diet and hydration. Follow-up if symptoms continue.",
    prescribedMedicines: [{ name: "Sample prescription" }],
  },
];

function getTriage(item) {
  return item.triage?.level || item.triageLevel || (item.severity >= 8 ? "High" : item.severity >= 5 ? "Moderate" : "Low");
}

function getDate(item) {
  return item.assessmentDate || item.date || item.registeredAt || "Recent";
}

function statusClass(value) {
  return String(value || "review").toLowerCase().replace(/\s+/g, "-");
}

export default function AssessmentHistory({
  patientCase,
  patientCases = [],
  onBack,
  onStartAssessment,
  onViewCase,
}) {
  const patientName = patientCase?.name || "Patient";
  const records = useMemo(() => {
    const own = patientCases.filter((item) => item?.name && item?.id);
    return own.length ? own : fallbackHistory;
  }, [patientCases]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedId, setSelectedId] = useState(null);

  const filteredRecords = records.filter((item) => {
    const query = search.trim().toLowerCase();
    const triage = getTriage(item);
    const matchesSearch =
      !query ||
      [item.chiefComplaint, item.department, item.namasteMatch?.englishName, item.namasteMatch?.code]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query));

    const matchesFilter =
      filter === "All" ||
      (filter === "High priority" && triage === "High") ||
      (filter === "Moderate" && triage === "Moderate") ||
      (filter === "Low" && triage === "Low");

    return matchesSearch && matchesFilter;
  });

  const selected = records.find((item) => item.id === selectedId) || null;

  return (
    <div className="patient-history-page">
      <div className="patient-history-shell">
        <button className="history-back-button" onClick={onBack}>
          <ArrowLeft size={16} /> Back to Dashboard
        </button>

        <section className="history-hero">
          <div>
            <span className="patient-section-kicker">HEALTH RECORDS</span>
            <h1>{patientName}'s assessment history</h1>
            <p>Review your previous symptom assessments, AI triage results, and consultation details in one place.</p>
          </div>
          <div className="history-hero-icon"><ClipboardList size={38} /></div>
        </section>

        <section className="history-toolbar">
          <div className="history-search">
            <Search size={17} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search symptoms, department or diagnosis"
              aria-label="Search assessment history"
            />
          </div>
          <div className="history-filters">
            {["All", "High priority", "Moderate", "Low"].map((option) => (
              <button
                key={option}
                className={filter === option ? "active" : ""}
                onClick={() => setFilter(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </section>

        <div className="history-layout">
          <main className="history-list">
            <div className="history-list-heading">
              <div>
                <span className="patient-section-kicker">PREVIOUS ASSESSMENTS</span>
                <h2>{filteredRecords.length} record{filteredRecords.length === 1 ? "" : "s"}</h2>
              </div>
              <button className="history-new-button" onClick={onStartAssessment}>
                New assessment <ArrowRight size={15} />
              </button>
            </div>

            {filteredRecords.length ? (
              filteredRecords.map((item) => {
                const triage = getTriage(item);
                const diagnosis = item.namasteMatch?.englishName || "Assessment completed";
                return (
                  <button
                    className={`history-record ${selectedId === item.id ? "selected" : ""}`}
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                  >
                    <div className="history-record-icon"><HeartPulse size={19} /></div>
                    <div className="history-record-main">
                      <div className="history-record-top">
                        <strong>{item.chiefComplaint || "Health assessment"}</strong>
                        <span className={`history-priority ${statusClass(triage)}`}>{triage}</span>
                      </div>
                      <p>{diagnosis}</p>
                      <div className="history-record-meta">
                        <span><CalendarDays size={13} /> {getDate(item)}</span>
                        <span><Clock3 size={13} /> Severity {item.severity || "—"}/10</span>
                        <span><Stethoscope size={13} /> {item.department || "AYUSH OPD"}</span>
                      </div>
                    </div>
                    <ArrowRight size={17} className="history-record-arrow" />
                  </button>
                );
              })
            ) : (
              <div className="history-empty">
                <Search size={28} />
                <h3>No matching assessments</h3>
                <p>Try another search term or filter.</p>
              </div>
            )}
          </main>

          <aside>
            <section className="history-detail-panel">
              {selected ? (
                <>
                  <div className="history-detail-heading">
                    <div>
                      <span className="patient-section-kicker">CASE DETAILS</span>
                      <h2>{selected.chiefComplaint || "Health assessment"}</h2>
                    </div>
                    <button className="history-close" onClick={() => setSelectedId(null)}><XCircle size={18} /></button>
                  </div>

                  <div className="history-detail-status">
                    <span className={`history-priority ${statusClass(getTriage(selected))}`}>{getTriage(selected)} priority</span>
                    <span>{getDate(selected)}</span>
                  </div>

                  <div className="history-detail-grid">
                    <div><span>Severity</span><strong>{selected.severity || "—"}/10</strong></div>
                    <div><span>Duration</span><strong>{selected.duration || "—"}</strong></div>
                    <div><span>Body type</span><strong>{selected.prakriti?.dominant || selected.prakriti || "—"}</strong></div>
                    <div><span>Digestion</span><strong>{selected.agni || "—"}</strong></div>
                  </div>

                  <div className="history-detail-section">
                    <span className="history-detail-label">AI triage</span>
                    <p>{selected.triage?.reason || selected.triageReason || "Assessment reviewed for routine care."}</p>
                  </div>

                  <div className="history-detail-section">
                    <span className="history-detail-label">Assessment result</span>
                    <p>{selected.namasteMatch?.englishName || "No diagnosis mapping recorded."}</p>
                  </div>

                  <div className="history-detail-section">
                    <span className="history-detail-label">Doctor / prescription status</span>
                    <div className="history-check-row">
                      {selected.doctorNotes ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                      <span>{selected.doctorNotes ? "Doctor notes available" : "No doctor notes recorded"}</span>
                    </div>
                    <div className="history-check-row">
                      {selected.prescribedMedicines?.length ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                      <span>{selected.prescribedMedicines?.length ? "Prescription available" : "No prescription recorded"}</span>
                    </div>
                  </div>

                  <button className="history-view-case" onClick={() => onViewCase?.(selected)}>
                    <FileText size={16} /> View full case summary
                  </button>
                </>
              ) : (
                <div className="history-detail-empty">
                  <ClipboardList size={30} />
                  <h3>Select an assessment</h3>
                  <p>Choose a record to see its symptoms, triage, assessment and consultation status.</p>
                </div>
              )}
            </section>

            <section className="history-help-card">
              <CheckCircle2 size={18} />
              <div>
                <strong>Your records stay connected</strong>
                <p>New assessments are added to your history automatically after completion.</p>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
