import { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import API from "../api";

const INTERESTS = ["Coding","Science","Math","Art","Innovation","English","Sports","Music","Chess","Robotics"];

export default function Profile() {
  const navigate = useNavigate();

  // Load from localStorage - user (from backend) + student (local profile)
  let user = null;
  try { user = JSON.parse(localStorage.getItem("user")); } catch {}
  let savedStudent = null;
  try { savedStudent = JSON.parse(localStorage.getItem("student")); } catch {}

  const [student, setStudent] = useState({
    name:     user?.name     || savedStudent?.name     || "",
    email:    user?.email    || savedStudent?.email    || "",
    class:    user?.class    || savedStudent?.class    || "",
    state:    user?.state    || savedStudent?.state    || "",
    marks:    user?.percentage !== undefined
                ? String(Math.round(user.percentage))
                : savedStudent?.marks || "",
    interest: savedStudent?.interest || "",
  });

  const [saved, setSaved]   = useState(false);
  const [editing, setEditing] = useState(false);

  function handleChange(e) {
    setStudent({ ...student, [e.target.name]: e.target.value });
    setSaved(false);
  }

  function toggleInterest(interest) {
    const list = student.interest ? student.interest.split(",").map(s=>s.trim()).filter(Boolean) : [];
    const exists = list.includes(interest);
    const next = exists ? list.filter(i=>i!==interest).join(", ") : [...list,interest].join(", ");
    setStudent({ ...student, interest: next });
    setSaved(false);
  }

  function saveProfile() {
    localStorage.setItem("student", JSON.stringify(student));
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 3000);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("student");
    window.location.href = "/login";
  }

  const selectedInterests = student.interest
    ? student.interest.split(",").map(s=>s.trim()).filter(Boolean)
    : [];

  const initials = student.name
    ? student.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase()
    : "?";

  const completionFields = ["name","email","class","state","marks","interest"];
  const filled = completionFields.filter(f => student[f] && String(student[f]).trim()).length;
  const completion = Math.round((filled / completionFields.length) * 100);

  return (
    <div className="page-wrap" style={{ paddingBottom:90 }}>
      <Navbar />

      {/* Hero */}
      <div style={{
        background:"linear-gradient(135deg,#fce4ef 0%,#e3f0ff 100%)",
        padding:"2rem 1.25rem 1.5rem",
        textAlign:"center",
        position:"relative",
      }}>
        {/* Avatar */}
        <div style={{
          width:72, height:72, borderRadius:"50%",
          background:"linear-gradient(135deg,#e91e8c,#1565c0)",
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:26, color:"white", fontWeight:900,
          boxShadow:"0 6px 20px rgba(233,30,140,0.30)",
          margin:"0 auto 10px",
          animation:"pulse-ring 2.5s ease-in-out infinite",
        }}>{initials}</div>

        <h1 style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:22, color:"#1a237e" }}>
          {student.name || "Your Name"}
        </h1>
        <p style={{ fontSize:13, color:"#7986cb", fontWeight:700, marginBottom:10 }}>
          {student.email || "your@email.com"}
        </p>

        {/* Role badge */}
        {user?.role === "admin" && (
          <span style={{
            display:"inline-block",
            background:"linear-gradient(135deg,#e91e8c,#1565c0)",
            color:"white", fontSize:11, fontWeight:900,
            padding:"3px 14px", borderRadius:10, marginBottom:8,
          }}>🛡️ ADMIN</span>
        )}

        {/* Completion bar */}
        <div style={{ maxWidth:280, margin:"10px auto 0" }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
            <span style={{ fontSize:11, fontWeight:800, color:"#7986cb" }}>Profile completion</span>
            <span style={{ fontSize:11, fontWeight:900, color:"#e91e8c" }}>{completion}%</span>
          </div>
          <div style={{ height:8, background:"#fce4ef", borderRadius:6, overflow:"hidden" }}>
            <div style={{
              height:"100%",
              width:`${completion}%`,
              background:"linear-gradient(90deg,#e91e8c,#1565c0)",
              borderRadius:6,
              transition:"width 0.5s ease",
            }}/>
          </div>
        </div>

        {/* Edit toggle */}
        <button
          onClick={() => setEditing(e => !e)}
          style={{
            marginTop:14,
            background: editing ? "white" : "linear-gradient(135deg,#e91e8c,#1565c0)",
            color: editing ? "#e91e8c" : "white",
            border: editing ? "2px solid #e91e8c" : "none",
            borderRadius:16, padding:"8px 22px",
            fontFamily:"'Nunito',sans-serif", fontWeight:800, fontSize:13,
            cursor:"pointer",
          }}
        >
          {editing ? "✕ Cancel" : "✏️ Edit Profile"}
        </button>
      </div>

      <div style={{ padding:"1.25rem", maxWidth:520, margin:"0 auto" }}>

        {/* Stats row */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginBottom:16 }}>
          {[
            { label:"Class",    value: student.class  || "—", emoji:"📚" },
            { label:"Marks",    value: student.marks ? `${student.marks}%` : "—", emoji:"🏆" },
            { label:"State",    value: student.state  || "—", emoji:"📍" },
          ].map(s => (
            <div key={s.label} style={{
              background:"white", borderRadius:18, padding:"14px 10px",
              border:"2px solid #fce4ef", textAlign:"center",
            }}>
              <div style={{ fontSize:22 }}>{s.emoji}</div>
              <div style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:15, color:"#1a237e", marginTop:2 }}>
                {s.value}
              </div>
              <div style={{ fontSize:11, fontWeight:700, color:"#7986cb" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Interests display (view mode) */}
        {!editing && selectedInterests.length > 0 && (
          <div style={{ background:"white", borderRadius:20, padding:"1.25rem", border:"2px solid #e3f0ff", marginBottom:14 }}>
            <p style={{ fontSize:12, fontWeight:800, color:"#7986cb", marginBottom:10 }}>🌟 Your Interests</p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
              {selectedInterests.map(i => (
                <span key={i} style={{
                  background:"linear-gradient(135deg,#fce4ef,#e3f0ff)",
                  color:"#1565c0", fontSize:12, fontWeight:800,
                  padding:"5px 14px", borderRadius:12,
                  border:"2px solid #e3f0ff",
                }}>{i}</span>
              ))}
            </div>
          </div>
        )}

        {/* Edit form */}
        {editing && (
          <div style={{
            background:"white", borderRadius:24, padding:"1.5rem",
            border:"2px solid #fce4ef",
            boxShadow:"0 4px 24px rgba(233,30,140,0.08)",
            animation:"fadeUp 0.3s ease both",
            marginBottom:14,
          }}>
            <h3 style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:16, color:"#1a237e", marginBottom:4 }}>
              ✏️ Edit Your Details
            </h3>

            {[
              { name:"name",  placeholder:"Full Name 😊",             type:"text" },
              { name:"email", placeholder:"Email Address 📧",          type:"email" },
              { name:"class", placeholder:"Your Class (e.g. 10) 📚",  type:"number" },
              { name:"state", placeholder:"Your State 📍",             type:"text" },
              { name:"marks", placeholder:"Your Marks % 🏆",           type:"number" },
            ].map(f => (
              <input
                key={f.name}
                className="input"
                name={f.name}
                type={f.type}
                placeholder={f.placeholder}
                value={student[f.name]}
                onChange={handleChange}
              />
            ))}

            {/* Interests */}
            <p style={{ fontSize:12, fontWeight:800, color:"#7986cb", margin:"14px 0 8px" }}>🌟 Pick your interests</p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
              {INTERESTS.map(interest => {
                const sel = selectedInterests.includes(interest);
                return (
                  <button key={interest} onClick={() => toggleInterest(interest)} style={{
                    padding:"6px 14px", borderRadius:14,
                    border: sel ? "2px solid #e91e8c" : "2px solid #e3f0ff",
                    background: sel ? "linear-gradient(135deg,#fce4ef,#e3f0ff)" : "white",
                    color: sel ? "#e91e8c" : "#7986cb",
                    fontFamily:"'Nunito',sans-serif", fontWeight:800, fontSize:12,
                    cursor:"pointer", transition:"all 0.18s",
                    transform: sel ? "scale(1.05)" : "scale(1)",
                  }}>{interest}</button>
                );
              })}
            </div>

            <button onClick={saveProfile} className="btn-primary" style={{ width:"100%", marginTop:18 }}>
              {saved ? "✅ Saved!" : "Save Profile 🚀"}
            </button>
          </div>
        )}

        {/* Success toast */}
        {saved && !editing && (
          <div style={{
            background:"#e8f5e9", border:"2px solid #43a047", borderRadius:14,
            padding:"10px 16px", marginBottom:14,
            fontSize:13, fontWeight:700, color:"#2e7d32",
            animation:"fadeUp 0.3s ease both",
          }}>
            ✅ Profile saved! Your matches are now updated.
          </div>
        )}

        {/* Quick links */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:14 }}>
          <button onClick={() => navigate("/dashboard")} style={{
            background:"white", border:"2px solid #e3f0ff", borderRadius:18,
            padding:"14px", fontFamily:"'Nunito',sans-serif", fontWeight:800,
            fontSize:13, color:"#1565c0", cursor:"pointer",
          }}>🔍 Find Scholarships</button>
          <button onClick={() => navigate("/recommendations")} style={{
            background:"white", border:"2px solid #fce4ef", borderRadius:18,
            padding:"14px", fontFamily:"'Nunito',sans-serif", fontWeight:800,
            fontSize:13, color:"#e91e8c", cursor:"pointer",
          }}>🚀 My Matches</button>
        </div>

        {/* Logout */}
        <button onClick={logout} style={{
          width:"100%", background:"white", color:"#c2185b",
          border:"2px solid #fce4ef", borderRadius:18,
          padding:"13px", fontFamily:"'Nunito',sans-serif",
          fontWeight:800, fontSize:14, cursor:"pointer",
          transition:"background 0.18s",
        }}
        onMouseEnter={e => e.currentTarget.style.background="#fce4ef"}
        onMouseLeave={e => e.currentTarget.style.background="white"}
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
}