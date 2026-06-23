import { useState, useEffect } from "react";
import API from "../api";
import Navbar from "../components/Navbar.jsx";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  let user = null;
  try { user = JSON.parse(localStorage.getItem("user")); } catch {}

  // Pre-fill from user profile if available
  let savedStudent = null;
  try { savedStudent = JSON.parse(localStorage.getItem("student")); } catch {}

  const userPct = user?.obtainedMarks && user?.totalMarks
    ? Math.round((user.obtainedMarks / user.totalMarks) * 100)
    : (user?.percentage || savedStudent?.marks || "");

  const [form, setForm] = useState({
    class:      user?.class      || savedStudent?.class      || "",
    percentage: userPct,
    state:      user?.state      || savedStudent?.state      || "",
  });
  const [results, setResults]   = useState([]);
  const [loading, setLoading]   = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError]       = useState("");

  // Auto-search on mount if we have user data
  useEffect(() => {
    if (form.class && form.percentage) {
      fetchScholarships(form);
    }
  // eslint-disable-next-line
  }, []);

  async function fetchScholarships(data) {
    setLoading(true);
    setSearched(true);
    setError("");
    try {
      const res = await API.post("/scholarships/recommend", {
        class:      String(data.class),
        percentage: Number(data.percentage),
        state:      data.state || "",
      });
      setResults(res.data.scholarships || res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Session expired. Please login again 🔐");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(err.response?.data?.message || "Failed to fetch recommendations ❌");
      }
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetchScholarships(form);
  }

  const initials = user?.name
    ? user.name.split(" ").map(w => w[0]).join("").slice(0,2).toUpperCase()
    : "?";

  const typeEmojis = { Scholarship:"🎓", Hackathon:"🚀", Competition:"🏆", Coding:"💻" };

  return (
    <div className="page-wrap" style={{ paddingBottom:90 }}>
      <Navbar />

      {/* Hero greeting */}
      <div style={{
        background:"linear-gradient(135deg,#fce4ef 0%,#e3f0ff 100%)",
        padding:"1.75rem 1.25rem 1.25rem",
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:12 }}>
          <div style={{
            width:52, height:52, borderRadius:"50%",
            background:"linear-gradient(135deg,#e91e8c,#1565c0)",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:20, color:"white", fontWeight:900, flexShrink:0,
            boxShadow:"0 4px 14px rgba(233,30,140,0.28)",
          }}>{initials}</div>
          <div>
            <p style={{ fontSize:13, fontWeight:700, color:"#7986cb" }}>Welcome back,</p>
            <h2 style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:20, color:"#1a237e" }}>
              {user?.name?.split(" ")[0] || "Student"} 👋
            </h2>
          </div>
        </div>
        <h1 style={{
          fontFamily:"'Nunito',sans-serif", fontWeight:900,
          fontSize:"clamp(20px,5vw,30px)", color:"#1a237e", marginBottom:4,
        }}>
          🎓 Your Scholarships
        </h1>
        <p style={{ fontSize:13, color:"#5c6bc0", fontWeight:700 }}>
          Showing opportunities matched to your profile
        </p>
      </div>

      <div style={{ padding:"1.25rem", maxWidth:600, margin:"0 auto" }}>

        {/* Filter card */}
        <div style={{
          background:"white", borderRadius:22, padding:"1.25rem",
          border:"2px solid #fce4ef",
          boxShadow:"0 4px 20px rgba(233,30,140,0.08)",
          marginBottom:"1.25rem",
        }}>
          <p style={{ fontFamily:"'Nunito',sans-serif", fontWeight:800, fontSize:13, color:"#7986cb", marginBottom:10 }}>
            🔧 Refine your search
          </p>
          <form onSubmit={handleSubmit} style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
            <input
              className="input"
              name="class"
              type="number"
              placeholder="Class 📚"
              value={form.class}
              onChange={handleChange}
              required
              style={{ flex:"1 1 80px", marginTop:0 }}
            />
            <input
              className="input"
              name="percentage"
              type="number"
              placeholder="Your % 🏆"
              value={form.percentage}
              onChange={handleChange}
              required
              min={0} max={100}
              style={{ flex:"1 1 80px", marginTop:0 }}
            />
            <input
              className="input"
              name="state"
              type="text"
              placeholder="State 📍"
              value={form.state}
              onChange={handleChange}
              style={{ flex:"1 1 120px", marginTop:0 }}
            />
            <button type="submit" className="btn-primary"
              style={{ flex:"1 1 100%", padding:"11px", marginTop:4 }}
              disabled={loading}
            >
              {loading ? "Searching... ⏳" : "Search 🔍"}
            </button>
          </form>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background:"#fce4ef", border:"2px solid #e91e8c",
            borderRadius:14, padding:"12px 16px", marginBottom:14,
            fontSize:13, fontWeight:700, color:"#c2185b",
            display:"flex", alignItems:"center", gap:8,
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* Loading shimmer */}
        {loading && (
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {[1,2,3].map(i => (
              <div key={i} style={{
                background:"white", borderRadius:20, padding:"1.25rem",
                border:"2px solid #fce4ef", height:100,
                background:"linear-gradient(90deg,#fce4ef 25%,#fff 50%,#fce4ef 75%)",
                backgroundSize:"200% 100%",
                animation:"shimmer 1.4s ease infinite",
              }} />
            ))}
          </div>
        )}

        {/* No results */}
        {!loading && searched && !error && results.length === 0 && (
          <div style={{ textAlign:"center", padding:"3rem 1rem" }}>
            <div style={{ fontSize:56, marginBottom:12 }}>😢</div>
            <p style={{ fontWeight:800, fontSize:17, color:"#7986cb" }}>No scholarships found</p>
            <p style={{ fontSize:13, color:"#b0bec5", marginTop:4 }}>
              Try a lower percentage or leave state empty
            </p>
          </div>
        )}

        {/* Results count */}
        {!loading && results.length > 0 && (
          <p style={{ fontFamily:"'Nunito',sans-serif", fontWeight:800, fontSize:13, color:"#7986cb", marginBottom:10 }}>
            ✨ {results.length} scholarships matched for you
          </p>
        )}

        {/* Results */}
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {results.map((s, i) => (
            <div
              key={i}
              className="card-hover animate-fadeUp"
              style={{
                background:"white", borderRadius:22, padding:"1.25rem",
                border:"2px solid #e3f0ff",
                animationDelay:`${i * 0.07}s`,
              }}
            >
              <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
                {/* Icon */}
                <div style={{
                  width:50, height:50, borderRadius:16, flexShrink:0,
                  background:"linear-gradient(135deg,#fce4ef,#e3f0ff)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:24,
                }}>
                  {typeEmojis[s.type] || "🎓"}
                </div>

                <div style={{ flex:1 }}>
                  {/* Badge */}
                  <span style={{
                    display:"inline-block",
                    background:"#e3f0ff", color:"#1565c0",
                    fontSize:10, fontWeight:900,
                    padding:"2px 10px", borderRadius:8, marginBottom:6,
                    letterSpacing:0.5,
                  }}>
                    {s.type || "SCHOLARSHIP"}
                  </span>

                  <h2 style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:15, color:"#1a237e", marginBottom:4, lineHeight:1.3 }}>
                    {s.name}
                  </h2>
                  <p style={{ fontSize:12, color:"#7986cb", fontWeight:600, marginBottom:8, lineHeight:1.5 }}>
                    {s.description}
                  </p>

                  {/* Meta pills */}
                  <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:10 }}>
                    <span style={{ background:"#f3e5f5", color:"#7b1fa2", fontSize:11, fontWeight:800, padding:"3px 10px", borderRadius:8 }}>
                      📚 Class {s.class}
                    </span>
                    <span style={{ background:"#e8f5e9", color:"#2e7d32", fontSize:11, fontWeight:800, padding:"3px 10px", borderRadius:8 }}>
                      🏆 Min {s.minPercentage}%
                    </span>
                    {s.deadline && (
                      <span style={{ background:"#fce4ef", color:"#c2185b", fontSize:11, fontWeight:800, padding:"3px 10px", borderRadius:8 }}>
                        ⏳ {s.deadline}
                      </span>
                    )}
                    {s.state && s.state !== "All" && (
                      <span style={{ background:"#e3f0ff", color:"#1565c0", fontSize:11, fontWeight:800, padding:"3px 10px", borderRadius:8 }}>
                        📍 {s.state}
                      </span>
                    )}
                  </div>

                  {s.officialLink && (
                    <a href={s.officialLink} target="_blank" rel="noopener noreferrer"
                      style={{
                        display:"inline-block",
                        background:"linear-gradient(135deg,#e91e8c,#1565c0)",
                        color:"white", textDecoration:"none",
                        padding:"8px 18px", borderRadius:12,
                        fontSize:12, fontWeight:800,
                        boxShadow:"0 3px 10px rgba(233,30,140,0.20)",
                      }}
                    >
                      Apply Now →
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}