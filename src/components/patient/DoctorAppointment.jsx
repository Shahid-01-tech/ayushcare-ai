import { useMemo, useState } from "react";
import {
  ArrowLeft, ArrowRight, CalendarDays, CheckCircle2, Clock3,
  MapPin, Stethoscope, UserRound, Video, X
} from "lucide-react";

const doctors = [
  { id:"dr-ananya", name:"Dr. Ananya Sharma", role:"Ayurveda Physician", dept:"Kayachikitsa", mode:"In-person", room:"OPD Room 04" },
  { id:"dr-vivek", name:"Dr. Vivek Mehta", role:"AYUSH Consultant", dept:"General AYUSH OPD", mode:"Video consultation", room:"Online" },
];

const dates = [
  { label:"Today", date:"07 Sep", value:"2026-09-07" },
  { label:"Tomorrow", date:"08 Sep", value:"2026-09-08" },
  { label:"Wed", date:"09 Sep", value:"2026-09-09" },
  { label:"Thu", date:"10 Sep", value:"2026-09-10" },
];

const slots=["10:00 AM","10:30 AM","11:30 AM","12:00 PM","3:00 PM","4:30 PM"];

export default function DoctorAppointment({ patientCase, onBack, onConfirmed }) {
  const [doctorId,setDoctorId]=useState(doctors[0].id);
  const [date,setDate]=useState(dates[1].value);
  const [time,setTime]=useState("");
  const [mode,setMode]=useState("In-person");
  const [confirmed,setConfirmed]=useState(false);

  const doctor=useMemo(()=>doctors.find(d=>d.id===doctorId)||doctors[0],[doctorId]);
  const selectedDate=dates.find(d=>d.value===date);

  const confirmBooking=()=>{
    if(!time) return;
    const appointment={
      doctor:doctor.name,
      doctorRole:doctor.role,
      department:doctor.dept,
      date,
      displayDate:`${selectedDate?.label}, ${selectedDate?.date} 2026`,
      time,
      mode,
      location:mode==="In-person" ? doctor.room : "Secure video consultation",
      status:"Confirmed",
    };
    setConfirmed(true);
    onConfirmed?.(appointment);
  };

  if(confirmed){
    return <div className="appointment-page"><div className="appointment-shell appointment-confirmed">
      <div className="appointment-success-icon"><CheckCircle2 size={42}/></div>
      <span className="patient-section-kicker">APPOINTMENT CONFIRMED</span>
      <h1>Your consultation is booked</h1>
      <p className="appointment-confirm-text">Your appointment has been added to your patient dashboard.</p>
      <div className="appointment-ticket">
        <div><span>Doctor</span><strong>{doctor.name}</strong><small>{doctor.role} • {doctor.dept}</small></div>
        <div className="appointment-ticket-grid">
          <div><CalendarDays size={16}/><span>{selectedDate?.label}, {selectedDate?.date} 2026</span></div>
          <div><Clock3 size={16}/><span>{time}</span></div>
          <div>{mode==="In-person"?<MapPin size={16}/>:<Video size={16}/>}<span>{mode==="In-person"?doctor.room:"Video consultation"}</span></div>
        </div>
      </div>
      <div className="appointment-confirm-actions">
        <button className="appointment-primary" onClick={onBack}>Go to Dashboard <ArrowRight size={16}/></button>
        <button className="appointment-secondary" onClick={()=>{setConfirmed(false);setTime("");}}>Book another appointment</button>
      </div>
    </div></div>
  }

  return <div className="appointment-page"><div className="appointment-shell">
    <button className="appointment-back" onClick={onBack}><ArrowLeft size={16}/> Back to Dashboard</button>
    <section className="appointment-hero">
      <div><span className="patient-section-kicker">DOCTOR CONSULTATION</span><h1>Book an AYUSH consultation</h1><p>Choose a doctor, consultation mode, date and available time slot. Your confirmed appointment will appear on your dashboard.</p></div>
      <div className="appointment-hero-icon"><CalendarDays size={35}/></div>
    </section>

    <div className="appointment-grid">
      <main>
        <section className="appointment-card">
          <div className="appointment-card-title"><div><span>1</span><div><h2>Choose a doctor</h2><p>Select the available AYUSH physician.</p></div></div></div>
          <div className="doctor-choice-list">{doctors.map(d=><button key={d.id} className={`doctor-choice ${doctorId===d.id?"selected":""}`} onClick={()=>{setDoctorId(d.id);setMode(d.mode==="Video consultation"?"Video consultation":"In-person");}}>
            <div className="doctor-avatar"><Stethoscope size={19}/></div><div className="doctor-choice-info"><strong>{d.name}</strong><span>{d.role}</span><small>{d.dept}</small></div><CheckCircle2 size={18} className="doctor-selected-icon"/>
          </button>)}</div>
        </section>

        <section className="appointment-card">
          <div className="appointment-card-title"><div><span>2</span><div><h2>Consultation mode</h2><p>Choose how you want to meet the doctor.</p></div></div></div>
          <div className="mode-options">
            <button className={mode==="In-person"?"selected":""} onClick={()=>setMode("In-person")}><MapPin size={18}/><div><strong>In-person</strong><small>Visit the AYUSH OPD</small></div></button>
            <button className={mode==="Video consultation"?"selected":""} onClick={()=>setMode("Video consultation")}><Video size={18}/><div><strong>Video consultation</strong><small>Meet online</small></div></button>
          </div>
        </section>

        <section className="appointment-card">
          <div className="appointment-card-title"><div><span>3</span><div><h2>Select date</h2><p>Available consultation days.</p></div></div></div>
          <div className="appointment-date-list">{dates.map(d=><button key={d.value} className={date===d.value?"selected":""} onClick={()=>setDate(d.value)}><strong>{d.label}</strong><span>{d.date}</span></button>)}</div>
        </section>

        <section className="appointment-card">
          <div className="appointment-card-title"><div><span>4</span><div><h2>Select time</h2><p>Pick a convenient available slot.</p></div></div></div>
          <div className="appointment-slots">{slots.map(s=><button key={s} className={time===s?"selected":""} onClick={()=>setTime(s)}><Clock3 size={14}/>{s}</button>)}</div>
        </section>
      </main>

      <aside>
        <section className="appointment-summary">
          <span className="patient-section-kicker">BOOKING SUMMARY</span>
          <h2>Review appointment</h2>
          <div className="appointment-summary-doctor"><div className="doctor-avatar"><Stethoscope size={18}/></div><div><strong>{doctor.name}</strong><span>{doctor.role}</span></div></div>
          <div className="appointment-summary-row"><CalendarDays size={16}/><div><span>Date</span><strong>{selectedDate?.label}, {selectedDate?.date} 2026</strong></div></div>
          <div className="appointment-summary-row"><Clock3 size={16}/><div><span>Time</span><strong>{time||"Select a time"}</strong></div></div>
          <div className="appointment-summary-row">{mode==="In-person"?<MapPin size={16}/>:<Video size={16}/>}<div><span>Mode</span><strong>{mode}</strong><small>{mode==="In-person"?doctor.room:"Secure video consultation"}</small></div></div>
          <div className="appointment-patient"><UserRound size={15}/><span>Booking for <strong>{patientCase?.name||"Patient"}</strong></span></div>
          <button className="appointment-primary full" disabled={!time} onClick={confirmBooking}>Confirm appointment <ArrowRight size={16}/></button>
          {!time&&<p className="appointment-hint">Select a time slot to continue.</p>}
        </section>
        <div className="appointment-note"><CheckCircle2 size={17}/><span>Your assessment summary can be reviewed by the doctor during consultation.</span></div>
      </aside>
    </div>
  </div></div>;
}
