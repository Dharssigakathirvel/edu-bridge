import { useState, useEffect } from "react";
import API from "../api";
import Navbar from "../components/Navbar.jsx";
import { useNavigate } from "react-router-dom";

export default function AddScholarship() {
  const navigate = useNavigate();

  // Guard: only admins
  let user = null;
  try { user = JSON.parse(localStorage.getItem("user")); } catch {}
  if (!user || user.role !== "admin") {
    return (
      <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background:"#fdf4f8", gap:16 }}>
        <div style={{ fontSize:56 }}>🚫</div>
        <h2 style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, color:"#1a237e" }}>Admin Only</h2>
        <p style={{ color:"#7986cb", fontWeight:700 }}>You don't have permission to view this page.</p>
        <button className="btn-primary" onClick={() => navigate("/")}>Go Home</button>
      </div>
    );
  }

  const [tab, setTab]         = useState("add"); // "add" | "manage"
  const [form, setForm]       = useState({ title:"", description:"", type:"Scholarship", emoji:"🎓", class:"", minMarks:"", interest:"All", deadline:"", officialLink:"" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError]     = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); setSuccess("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true); setError(""); setSuccess("");
    
    // Parse class range from string input like "8-12" or "10"
    let classRange = [8, 9, 10, 11, 12];
    const rangeMatch = form.class.match(/(\d+)\s*[-–—]\s*(\d+)/);
    if (rangeMatch) {
      const start = parseInt(rangeMatch[1]);
      const end = parseInt(rangeMatch[2]);
      classRange = Array.from({ length: end - start + 1 }, (_, i) => start + i);
    } else {
      const single = parseInt(form.class.replace(/\D/g, ""));
      if (!isNaN(single)) {
        classRange = [single];
      }
    }

    try {
      const res = await API.post("/scholarships/add", {
        ...form,
        name: form.title,
        minPercentage: Number(form.minMarks),
        state: form.interest,
        minMarks: Number(form.minMarks),
        classRange,
      });
      setSuccess(res.data.message || "Scholarship added! 🎉");
      setForm({ title:"", description:"", type:"Scholarship", emoji:"🎓", class:"", minMarks:"", interest:"All", deadline:"", officialLink:"" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add ❌");
    } finally {
      setLoading(false);
    }
  }

  const fields = [
    { name:"title",         placeholder:"Scholarship / Competition Title 🎓", type:"text",   required:true },
    { name:"type",          placeholder:"Type 🏷️",                          type:"select", options: ["Scholarship", "Hackathon", "Competition", "Coding"], required:true },
    { name:"emoji",         placeholder:"Emoji Icon (e.g. 🎓) ✨",           type:"text",   required:true },
    { name:"description",   placeholder:"Short Description 📝",              type:"text",   required:true },
    { name:"class",         placeholder:"Eligible Class (e.g. Class 8–12) 📚",type:"text",   required:true },
    { name:"minMarks",      placeholder:"Minimum Marks/Percentage % 🏆",    type:"number", required:true },
    { name:"interest",      placeholder:"Interest Area (e.g. Coding, Math, Science, All) 🎨", type:"text", required:true },
    { name:"officialLink",  placeholder:"Official Application Link (URL) 🔗", type:"url",    required:false },
    { name:"deadline",      placeholder:"Deadline (e.g. 30 July 2026) ⏳",   type:"text",   required:true },
  ];

  return (
    <div className="page-wrap" style={{ paddingBottom:90 }}>
      <Navbar />

      {/* Admin header */}
      <div style={{
        background:"linear-gradient(135deg,#1a237e,#1565c0)",
        padding:"1.75rem 1.25rem",
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:8 }}>
          <div style={{
            width:44, height:44, borderRadius:14,
            background:"rgba(255,255,255,0.15)",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:22,
          }}>🛡️</div>
          <div>
            <span style={{ fontSize:11, fontWeight:800, color:"rgba(255,255,255,0.6)", letterSpacing:1 }}>ADMIN PANEL</span>
            <h1 style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:22, color:"white" }}>
              Manage Opportunities
            </h1>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display:"flex", gap:8, marginTop:4 }}>
          {["add","manage"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding:"8px 20px", borderRadius:14,
              background: tab===t ? "white" : "rgba(255,255,255,0.15)",
              color: tab===t ? "#1565c0" : "white",
              border:"none", fontFamily:"'Nunito',sans-serif",
              fontWeight:800, fontSize:13, cursor:"pointer",
              transition:"all 0.18s",
            }}>
              {t==="add" ? "➕ Add New" : "📋 Manage"}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding:"1.25rem", maxWidth:520, margin:"0 auto" }}>

        {tab === "add" && (
          <div style={{
            background:"white", borderRadius:24, padding:"1.75rem",
            border:"2px solid #e3f0ff",
            boxShadow:"0 4px 24px rgba(21,101,192,0.10)",
          }}>
            <h2 style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:17, color:"#1a237e", marginBottom:4 }}>
              ➕ Add Scholarship / Competition
            </h2>
            <p style={{ fontSize:12, color:"#7986cb", fontWeight:700, marginBottom:4 }}>
              Fill in the details below to publish a new opportunity
            </p>

            {success && (
              <div style={{ background:"#e8f5e9", border:"2px solid #43a047", borderRadius:12, padding:"10px 14px", marginTop:10, fontSize:13, fontWeight:700, color:"#2e7d32" }}>
                ✅ {success}
              </div>
            )}
            {error && (
              <div style={{ background:"#fce4ef", border:"2px solid #e91e8c", borderRadius:12, padding:"10px 14px", marginTop:10, fontSize:13, fontWeight:700, color:"#c2185b" }}>
                ❌ {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {fields.map(f => f.type === "select" ? (
                <div key={f.name} style={{ marginBottom: 12 }}>
                  <label style={{ fontSize: 12, fontWeight: 800, color: "#1a237e", display: "block", marginBottom: 4 }}>{f.placeholder}</label>
                  <select
                    className="input"
                    name={f.name}
                    value={form[f.name]}
                    onChange={handleChange}
                    required={f.required}
                    style={{ width: "100%", padding: "12px", border: "2px solid #e3f0ff", borderRadius: 12, outline: "none", appearance: "auto" }}
                  >
                    {f.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
              ) : (
                <input
                  key={f.name}
                  className="input"
                  name={f.name}
                  type={f.type}
                  placeholder={f.placeholder}
                  value={form[f.name]}
                  onChange={handleChange}
                  required={f.required}
                  min={f.name==="minMarks" ? 0 : undefined}
                  max={f.name==="minMarks" ? 100 : undefined}
                  style={{ marginBottom: 12 }}
                />
              ))}
              <button type="submit" className="btn-primary"
                style={{ width:"100%", marginTop:20 }}
                disabled={loading}
              >
                {loading ? "Publishing... ⏳" : "Publish Opportunity 🚀"}
              </button>
            </form>
          </div>
        )}

        {tab === "manage" && (
          <ManageTab />
        )}
      </div>
    </div>
  );
}

function ManageTab() {
  const [items, setItems]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  async function load() {
    setLoading(true);
    try {
      const res = await API.get("/scholarships");
      setItems(res.data.scholarships || res.data);
    } catch { setItems([]); }
    finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(id) {
    if (!window.confirm("Delete this scholarship?")) return;
    setDeleting(id);
    try {
      await API.delete(`/scholarships/${id}`);
      setItems(items.filter(i => i._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed ❌");
    } finally {
      setDeleting(null);
    }
  }

  if (loading) return (
    <div style={{ textAlign:"center", padding:"3rem" }}>
      <div style={{ fontSize:40, animation:"float 1s ease-in-out infinite" }}>⏳</div>
      <p style={{ fontWeight:800, color:"#7986cb", marginTop:8 }}>Loading...</p>
    </div>
  );

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
      <p style={{ fontFamily:"'Nunito',sans-serif", fontWeight:800, fontSize:13, color:"#7986cb" }}>
        📋 {items.length} opportunities listed
      </p>
      {items.map(s => (
        <div key={s._id} style={{
          background:"white", borderRadius:20, padding:"1.1rem",
          border:"2px solid #e3f0ff",
          display:"flex", alignItems:"flex-start", gap:12,
        }}>
          <div style={{
            width:42, height:42, borderRadius:12, flexShrink:0,
            background:"linear-gradient(135deg,#fce4ef,#e3f0ff)",
            display:"flex", alignItems:"center", justifyContent:"center", fontSize:20,
          }}>🎓</div>
          <div style={{ flex:1 }}>
            <h3 style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:14, color:"#1a237e", marginBottom:3 }}>
              {s.title || s.name}
            </h3>
            <p style={{ fontSize:12, color:"#7986cb", fontWeight:600, marginBottom:6 }}>{s.description}</p>
            <div style={{ fontSize:11, fontWeight:700, color:"#9e9e9e" }}>
              Class {s.class} · Min {s.minMarks !== undefined ? s.minMarks : s.minPercentage}% · {s.interest || s.state}
            </div>
            {s.officialLink && (
              <a href={s.officialLink} target="_blank" rel="noopener noreferrer" style={{ fontSize:11, color:"#e91e8c", fontWeight:700, textDecoration:"none", display:"inline-block", marginTop:4 }}>
                🔗 Application Link
              </a>
            )}
          </div>
          <button
            onClick={() => handleDelete(s._id)}
            disabled={deleting === s._id}
            style={{
              background: deleting===s._id ? "#f5f5f5" : "#fce4ef",
              color:"#c2185b", border:"none", borderRadius:10,
              padding:"6px 12px", fontFamily:"'Nunito',sans-serif",
              fontWeight:800, fontSize:12, cursor:"pointer",
              flexShrink:0,
            }}
          >
            {deleting===s._id ? "..." : "🗑️ Delete"}
          </button>
        </div>
      ))}
    </div>
  );
}