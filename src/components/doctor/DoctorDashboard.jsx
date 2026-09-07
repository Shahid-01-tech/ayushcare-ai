import { useState } from "react";
import {
  Stethoscope,
  Users,
  AlertTriangle,
  Clock,
  Search,
  FileText,
  Pill,
  Printer,
  CheckCircle2,
} from "lucide-react";
import CaseSheetView from "./CaseSheetView";
import PrescriptionPad from "./PrescriptionPad";
import PrintableOPDCard from "./PrintableOPDCard";

export default function DoctorDashboard({ patientCases = [], onUpdateCase }) {
  const [selectedCaseId, setSelectedCaseId] = useState(patientCases[0]?.id || "");
  const [activeTab, setActiveTab] = useState("casesheet"); // 'casesheet' | 'prescription' | 'print'
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPriority, setFilterPriority] = useState("all"); // 'all' | 'red' | 'amber' | 'green'

  const selectedCase = patientCases.find((c) => c.id === selectedCaseId) || patientCases[0];

  // Count stats
  const redCount = patientCases.filter((c) => c.triage?.level === "red" || c.triageLevel === "red").length;
  const amberCount = patientCases.filter((c) => c.triage?.level === "amber" || c.triageLevel === "amber").length;
  const greenCount = patientCases.filter((c) => (!c.triage || c.triage?.level === "green") && c.triageLevel !== "red" && c.triageLevel !== "amber").length;

  const filteredPatients = patientCases.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tokenNo?.includes(searchQuery) ||
      p.chiefComplaint?.toLowerCase().includes(searchQuery.toLowerCase());

    const level = p.triage?.level || p.triageLevel || "green";
    const matchesPriority = filterPriority === "all" || level === filterPriority;

    return matchesSearch && matchesPriority;
  });

  if (activeTab === "print" && selectedCase) {
    return (
      <PrintableOPDCard
        patientCase={selectedCase}
        onBack={() => setActiveTab("casesheet")}
      />
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9", paddingBottom: "60px" }}>
      {/* Top OPD Header Bar */}
      <div style={{ background: "#ffffff", borderBottom: "1px solid #e2e8f0", padding: "16px 32px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "linear-gradient(135deg, #0d9488, #0f766e)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Stethoscope size={20} />
              </div>
              <div>
                <h1 style={{ fontSize: "18px", color: "#0f172a", margin: 0 }}>
                  Ayush Hospital Physician Console
                </h1>
                <span style={{ fontSize: "12px", color: "#64748b" }}>
                  All India Institute of Ayurveda • Kayachikitsa OPD • Room 04
                </span>
              </div>
            </div>
          </div>

          {/* Metric Badges */}
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "#f8fafc", padding: "6px 14px", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "13px" }}>
              <Users size={16} color="#64748b" />
              <span>Queue: <strong>{patientCases.length} waiting</strong></span>
            </div>

            {redCount > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "#fee2e2", color: "#b91c1c", padding: "6px 12px", borderRadius: "8px", fontSize: "12px", fontWeight: "700" }}>
                <AlertTriangle size={15} />
                <span>{redCount} Emergency</span>
              </div>
            )}

            {amberCount > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "#fef3c7", color: "#b45309", padding: "6px 12px", borderRadius: "8px", fontSize: "12px", fontWeight: "700" }}>
                <Clock size={15} />
                <span>{amberCount} Priority</span>
              </div>
            )}

            <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "#dcfce7", color: "#15803d", padding: "6px 12px", borderRadius: "8px", fontSize: "12px", fontWeight: "700" }}>
              <CheckCircle2 size={15} />
              <span>{greenCount} Routine</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div style={{ maxWidth: "1400px", margin: "24px auto 0", padding: "0 24px", display: "grid", gridTemplateColumns: "360px 1fr", gap: "24px", alignItems: "start" }}>
        {/* Left Column: OPD Queue */}
        <div style={{ background: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>
          <div style={{ padding: "16px", borderBottom: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <h3 style={{ fontSize: "15px", color: "#0f172a" }}>Patient OPD Queue</h3>
              <span style={{ fontSize: "12px", background: "#eff6ff", color: "#1d4ed8", padding: "2px 8px", borderRadius: "10px", fontWeight: "600" }}>
                Live Feed
              </span>
            </div>

            {/* Search Input */}
            <div style={{ position: "relative", marginBottom: "10px" }}>
              <Search size={15} style={{ position: "absolute", left: "10px", top: "10px", color: "#94a3b8" }} />
              <input
                type="text"
                placeholder="Search token, name, complaint..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: "100%", padding: "8px 12px 8px 32px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "12px" }}
              />
            </div>

            {/* Priority Filter Tabs */}
            <div style={{ display: "flex", gap: "6px" }}>
              {["all", "red", "amber", "green"].map((pri) => (
                <button
                  key={pri}
                  onClick={() => setFilterPriority(pri)}
                  style={{
                    flex: 1,
                    fontSize: "11px",
                    textTransform: "uppercase",
                    fontWeight: "700",
                    padding: "4px",
                    borderRadius: "6px",
                    background: filterPriority === pri ? "#0f172a" : "#f1f5f9",
                    color: filterPriority === pri ? "#ffffff" : "#64748b",
                    cursor: "pointer",
                  }}
                >
                  {pri}
                </button>
              ))}
            </div>
          </div>

          {/* Queue List */}
          <div style={{ maxHeight: "680px", overflowY: "auto", display: "flex", flexDirection: "column" }}>
            {filteredPatients.length === 0 ? (
              <div style={{ padding: "30px 16px", textAlign: "center", color: "#94a3b8", fontSize: "13px" }}>
                No patients match the filter.
              </div>
            ) : (
              filteredPatients.map((p) => {
                const isSelected = p.id === selectedCase?.id;
                const level = p.triage?.level || p.triageLevel || "green";

                return (
                  <div
                    key={p.id}
                    onClick={() => setSelectedCaseId(p.id)}
                    style={{
                      padding: "14px 16px",
                      borderBottom: "1px solid #f1f5f9",
                      background: isSelected ? "#f0fdfa" : "#ffffff",
                      borderLeft: isSelected ? "4px solid #0d9488" : "4px solid transparent",
                      cursor: "pointer",
                      transition: "0.15s",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <span style={{ fontSize: "12px", fontWeight: "800", color: "#0f766e" }}>
                          #{p.tokenNo || "101"}
                        </span>
                        <strong style={{ fontSize: "14px", color: "#0f172a" }}>
                          {p.name}
                        </strong>
                      </div>

                      <span style={{
                        fontSize: "10px",
                        padding: "2px 6px",
                        borderRadius: "8px",
                        fontWeight: "700",
                        textTransform: "uppercase",
                        background: level === "red" ? "#fee2e2" : level === "amber" ? "#fef3c7" : "#dcfce7",
                        color: level === "red" ? "#b91c1c" : level === "amber" ? "#b45309" : "#15803d",
                      }}>
                        {level === "red" ? "Emergency" : level === "amber" ? "Priority" : "Routine"}
                      </span>
                    </div>

                    <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "4px" }}>
                      {p.age}y / {p.gender} • {p.prakriti?.dominant || "Vata-Kapha"}
                    </div>

                    <p style={{
                      fontSize: "12px",
                      color: "#334155",
                      margin: 0,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}>
                      {p.chiefComplaint}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Selected Case Workspace */}
        {selectedCase ? (
          <div>
            {/* Action Bar Tabs */}
            <div style={{ background: "#ffffff", padding: "8px 16px", borderRadius: "12px", border: "1px solid #e2e8f0", marginBottom: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  onClick={() => setActiveTab("casesheet")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: "700",
                    background: activeTab === "casesheet" ? "#0d9488" : "transparent",
                    color: activeTab === "casesheet" ? "#ffffff" : "#475569",
                    cursor: "pointer",
                  }}
                >
                  <FileText size={16} />
                  Structured Ayush Case Sheet
                </button>

                <button
                  onClick={() => setActiveTab("prescription")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: "700",
                    background: activeTab === "prescription" ? "#0d9488" : "transparent",
                    color: activeTab === "prescription" ? "#ffffff" : "#475569",
                    cursor: "pointer",
                  }}
                >
                  <Pill size={16} />
                  E-Prescription & Chikitsa Plan
                </button>
              </div>

              <button
                onClick={() => setActiveTab("print")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: "700",
                  background: "#1677ff",
                  color: "#ffffff",
                  cursor: "pointer",
                }}
              >
                <Printer size={16} />
                Print OPD Card
              </button>
            </div>

            {/* Tab Views */}
            {activeTab === "casesheet" && <CaseSheetView patientCase={selectedCase} />}
            {activeTab === "prescription" && (
              <PrescriptionPad
                patientCase={selectedCase}
                onUpdateCase={onUpdateCase}
              />
            )}
          </div>
        ) : (
          <div style={{ background: "#ffffff", padding: "48px", borderRadius: "16px", textAlign: "center", color: "#94a3b8" }}>
            Select a patient from the queue to review their clinical case sheet.
          </div>
        )}
      </div>
    </div>
  );
}
