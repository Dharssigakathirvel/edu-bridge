import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const floatBadges = [
  { emoji: "🎓", label: "Scholarships" },
  { emoji: "🏆", label: "Olympiads" },
  { emoji: "💻", label: "Coding" },
  { emoji: "🔬", label: "Science" },
  { emoji: "🎨", label: "Arts" },
];

const stats = [
  { emoji: "🎓", num: "120+", label: "Scholarships" },
  { emoji: "🏆", num: "45+",  label: "Competitions" },
  { emoji: "💻", num: "30+",  label: "Hackathons" },
  { emoji: "🌟", num: "10K+", label: "Students" },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="page-wrap">
      <Navbar />

      {/* ── Hero ───────────────────────────────────────── */}
      <section style={{
        background: "linear-gradient(135deg,#fce4ef 0%,#e3f0ff 55%,#fce4ef 100%)",
        padding: "3rem 1.5rem 2.5rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Decorative blobs */}
        <div style={{ position:"absolute", top:-60, left:-60, width:200, height:200,
          borderRadius:"50%", background:"#e91e8c", opacity:0.07, pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:-80, right:-50, width:260, height:260,
          borderRadius:"50%", background:"#1565c0", opacity:0.07, pointerEvents:"none" }} />
        <div style={{ position:"absolute", top:"30%", left:"5%", width:80, height:80,
          borderRadius:"50%", background:"#e91e8c", opacity:0.05, animation:"float 4s ease-in-out infinite" }} />

        <div className="animate-fadeUp" style={{ animationDelay:"0.05s" }}>
          <span style={{
            display: "inline-block",
            background: "white",
            border: "2px solid #e91e8c",
            color: "#e91e8c",
            fontSize: 12,
            fontWeight: 800,
            padding: "4px 18px",
            borderRadius: 20,
            letterSpacing: 1.2,
            marginBottom: "1rem",
          }}>
            ✨ FOR GRADES 1 TO 12 ✨
          </span>
        </div>

        <h1 className="animate-fadeUp" style={{
          fontFamily: "'Nunito', sans-serif",
          fontWeight: 900,
          fontSize: "clamp(28px, 7vw, 52px)",
          lineHeight: 1.2,
          color: "#1a237e",
          marginBottom: "0.6rem",
          animationDelay: "0.1s",
        }}>
          Find Your Next{" "}
          <span style={{
            background: "linear-gradient(135deg,#e91e8c,#1565c0)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Big Opportunity
          </span>{" "}🚀
        </h1>

        <p className="animate-fadeUp" style={{
          fontSize: "clamp(14px,3vw,17px)",
          color: "#5c6bc0",
          fontWeight: 700,
          marginBottom: "1.8rem",
          animationDelay: "0.16s",
        }}>
          Scholarships • Hackathons • Olympiads • Competitions
          <br />All in one magical place!
        </p>

        <div className="animate-fadeUp stagger" style={{
          display: "flex",
          gap: 12,
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: "2rem",
          animationDelay: "0.22s",
        }}>
          <button className="btn-primary" onClick={() => navigate("/opportunities")}>
            Start Exploring ✨
          </button>
          <button className="btn-secondary" onClick={() => navigate("/recommendations")}>
            My Matches 🎓
          </button>
        </div>

        {/* Floating badges */}
        <div style={{
          display: "flex",
          gap: 10,
          justifyContent: "center",
          flexWrap: "wrap",
        }}>
          {floatBadges.map((b, i) => (
            <div
              key={b.label}
              className="animate-bounce-in"
              style={{
                background: "white",
                border: "2px solid #e3f0ff",
                borderRadius: 16,
                padding: "8px 16px",
                fontSize: 13,
                fontWeight: 800,
                color: "#1a237e",
                display: "flex",
                alignItems: "center",
                gap: 6,
                animationDelay: `${0.3 + i * 0.07}s`,
                animation: `bounce-in 0.45s ease both, float ${3 + i * 0.4}s ease-in-out ${i * 0.3}s infinite`,
              }}
            >
              <span style={{ fontSize: 20 }}>{b.emoji}</span>
              {b.label}
            </div>
          ))}
        </div>
      </section>

      {/* ── Stats ──────────────────────────────────────── */}
      <section style={{ padding: "2rem 1.5rem 0" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
          gap: 12,
        }}>
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="card-hover animate-fadeUp"
              style={{
                background: "white",
                borderRadius: 20,
                padding: "1.2rem",
                border: "2px solid #fce4ef",
                textAlign: "center",
                animationDelay: `${0.1 * i}s`,
              }}
            >
              <div style={{ fontSize: 30, marginBottom: 4 }}>{s.emoji}</div>
              <div style={{ fontWeight: 900, fontSize: 24, color: "#1a237e" }}>{s.num}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#7986cb", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Why EduBridge ──────────────────────────────── */}
      <section style={{ padding: "2rem 1.5rem" }}>
        <h2 style={{ fontWeight: 900, fontSize: 22, color: "#1a237e", marginBottom: "1.2rem" }}>
          💡 Why EduBridge?
        </h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 14,
        }}>
          {[
            { emoji:"🎯", title:"Smart Matches", desc:"We match opportunities to your class, marks, and interests automatically." },
            { emoji:"⚡", title:"Always Updated", desc:"Fresh scholarships and contests added every week." },
            { emoji:"🔒", title:"Safe & Trusted", desc:"Only verified, legitimate opportunities listed — no scams." },
          ].map((f, i) => (
            <div
              key={f.title}
              className="card-hover animate-fadeUp"
              style={{
                background: "white",
                borderRadius: 20,
                padding: "1.4rem",
                border: "2px solid #e3f0ff",
                animationDelay: `${0.1 * i}s`,
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 10 }}>{f.emoji}</div>
              <div style={{ fontWeight: 900, fontSize: 15, color: "#1a237e", marginBottom: 6 }}>{f.title}</div>
              <div style={{ fontSize: 13, color: "#7986cb", fontWeight: 600, lineHeight: 1.5 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA banner ─────────────────────────────────── */}
      <section style={{ padding: "0 1.5rem 2rem" }}>
        <div style={{
          background: "linear-gradient(135deg,#e91e8c,#1565c0)",
          borderRadius: 24,
          padding: "2rem 1.5rem",
          textAlign: "center",
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{ position:"absolute", top:-30, right:-30, width:120, height:120,
            borderRadius:"50%", background:"rgba(255,255,255,0.1)" }} />
          <div style={{ fontSize: 36, marginBottom: 8 }}>🌟</div>
          <h2 style={{ fontWeight: 900, fontSize: 22, marginBottom: 8 }}>
            Ready to shine?
          </h2>
          <p style={{ fontSize: 14, fontWeight: 700, opacity: 0.9, marginBottom: 16 }}>
            Create your free profile and get personalised recommendations!
          </p>
          <button
            onClick={() => navigate("/signup")}
            style={{
              background: "white",
              color: "#e91e8c",
              border: "none",
              borderRadius: 20,
              padding: "11px 28px",
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 900,
              fontSize: 15,
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
              transition: "transform 0.18s",
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            Get Started — It's Free! 🚀
          </button>
        </div>
      </section>
    </div>
  );
}