import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import OpportunityCard from "../components/OpportunityCard";
import opportunities from "../data/opportunities";

export default function Recommendations() {
  const navigate = useNavigate();

  let student = null;
  try { student = JSON.parse(localStorage.getItem("student")); } catch {}

  if (!student || !student.name) {
    return (
      <div className="page-wrap">
        <Navbar />
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "5rem 1.5rem",
          textAlign: "center",
        }}>
          <div style={{ fontSize: 64, marginBottom: 16, animation: "float 3s ease-in-out infinite" }}>🎓</div>
          <h2 style={{ fontWeight: 900, fontSize: 24, color: "#1a237e", marginBottom: 8 }}>
            No profile yet!
          </h2>
          <p style={{ fontSize: 14, color: "#7986cb", fontWeight: 700, marginBottom: 20 }}>
            Create your student profile so we can find your perfect matches.
          </p>
          <button className="btn-primary" onClick={() => navigate("/profile")}>
            Create Profile 🚀
          </button>
        </div>
      </div>
    );
  }

  const matched = opportunities.filter(item => {
    const classMatch    = item.classRange.includes(Number(student.class));
    const marksMatch    = Number(student.marks) >= item.minMarks;
    const interestMatch =
      item.interest === "All" ||
      (student.interest || "").toLowerCase().includes(item.interest.toLowerCase());
    return classMatch && marksMatch && interestMatch;
  });

  const initials = student.name
    .split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="page-wrap">
      <Navbar />

      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg,#fce4ef,#e3f0ff)",
        padding: "2rem 1.5rem",
      }}>
        {/* Student summary chip */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          background: "white",
          borderRadius: 20,
          padding: "12px 16px",
          border: "2px solid #fce4ef",
          marginBottom: 16,
          maxWidth: 420,
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: "50%",
            background: "linear-gradient(135deg,#e91e8c,#1565c0)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, color: "white", fontWeight: 900, flexShrink: 0,
          }}>
            {initials}
          </div>
          <div>
            <div style={{ fontWeight: 900, fontSize: 15, color: "#1a237e" }}>{student.name}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#7986cb" }}>
              Class {student.class} · {student.marks}% · {student.state}
            </div>
          </div>
        </div>

        <h1 style={{
          fontFamily: "'Nunito', sans-serif",
          fontWeight: 900,
          fontSize: "clamp(22px,5vw,36px)",
          color: "#1a237e",
        }}>
          Your Matches 🚀
        </h1>
        <p style={{ fontSize: 14, color: "#5c6bc0", fontWeight: 700, marginTop: 4 }}>
          {matched.length} {matched.length === 1 ? "opportunity" : "opportunities"} matched for you!
        </p>
      </div>

      {/* Cards */}
      <div style={{
        padding: "1.5rem",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: 16,
      }}>
        {matched.map((item, i) => (
          <div key={item.id} className="animate-fadeUp" style={{ animationDelay: `${i * 0.09}s` }}>
            <OpportunityCard item={item} />
          </div>
        ))}
      </div>

      {matched.length === 0 && (
        <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>😢</div>
          <p style={{ fontWeight: 800, fontSize: 18, color: "#7986cb" }}>
            No matches yet
          </p>
          <p style={{ fontSize: 14, color: "#b0bec5", margin: "6px 0 20px" }}>
            Update your profile with more interests or check your marks!
          </p>
          <button className="btn-primary" onClick={() => navigate("/profile")}>
            Update Profile 🎓
          </button>
        </div>
      )}
    </div>
  );
}