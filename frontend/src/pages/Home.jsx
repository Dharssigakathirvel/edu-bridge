import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

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

const QUOTES = [
  { text: "The roots of education are bitter, but the fruit is sweet.", author: "Aristotle" },
  { text: "Education is the passport to the future, for tomorrow belongs to those who prepare for it today.", author: "Malcolm X" },
  { text: "An investment in knowledge pays the best interest.", author: "Benjamin Franklin" },
  { text: "The beautiful thing about learning is that no one can take it away from you.", author: "B.B. King" },
  { text: "Do not wait for opportunities, create them.", author: "Roy T. Bennett" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" }
];

export default function Home() {
  const navigate = useNavigate();
  const [quoteIndex, setQuoteIndex] = useState(0);

  function nextQuote() {
    setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
  }

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

      {/* ── Inspirational Quotes Section ── */}
      <section style={{ padding: "0 1.5rem 1.5rem" }}>
        <div style={{
          background: "linear-gradient(135deg, #1a237e 0%, #1565c0 100%)",
          borderRadius: 24,
          padding: "2.5rem 2rem",
          textAlign: "center",
          color: "white",
          boxShadow: "0 10px 30px rgba(21, 101, 192, 0.2)",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Decorative background elements */}
          <div style={{ position: "absolute", top: -40, left: -40, width: 140, height: 140, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
          <div style={{ position: "absolute", bottom: -40, right: -40, width: 140, height: 140, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
          
          <div style={{ fontSize: 32, marginBottom: 12, animation: "float 3s ease-in-out infinite" }}>✨ Inspiring Words ✨</div>
          
          <div style={{ minHeight: "90px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: 18,
              fontWeight: 800,
              fontStyle: "italic",
              lineHeight: 1.6,
              marginBottom: 10,
              maxWidth: 600,
              margin: "0 auto 10px",
              opacity: 0.95
            }}>
              "{QUOTES[quoteIndex].text}"
            </p>
            <p style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#e3f0ff",
              letterSpacing: 0.5
            }}>
              — {QUOTES[quoteIndex].author}
            </p>
          </div>

          <button
            onClick={nextQuote}
            style={{
              marginTop: 18,
              background: "rgba(255, 255, 255, 0.15)",
              color: "white",
              border: "2px solid rgba(255, 255, 255, 0.3)",
              borderRadius: 20,
              padding: "8px 24px",
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 800,
              fontSize: 13,
              cursor: "pointer",
              backdropFilter: "blur(4px)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "white";
              e.currentTarget.style.color = "#1565c0";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
              e.currentTarget.style.color = "white";
            }}
          >
            Inspire Me More 🔄
          </button>
        </div>
      </section>

      {/* ── Connect with Me Footer Tab ── */}
      <section style={{ padding: "0 1.5rem 2.5rem", textAlign: "center" }}>
        <div style={{
          background: "white",
          border: "2px solid #e3f0ff",
          borderRadius: 24,
          padding: "2rem 1.5rem",
          boxShadow: "0 8px 32px rgba(21, 101, 192, 0.05)",
        }}>
          <h3 style={{
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 900,
            fontSize: 18,
            color: "#1a237e",
            marginBottom: 4,
          }}>
            🤝 Connect with Me
          </h3>
          <p style={{ fontSize: 13, color: "#7986cb", fontWeight: 700, marginBottom: 20 }}>
            Let's build something amazing together!
          </p>

          <div style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 12,
          }}>
            {[
              { label: "GitHub", href: "https://github.com/Dharssigakathirvel", emoji: "🐙", color: "#24292e", hoverBg: "#f6f8fa" },
              { label: "LeetCode", href: "https://leetcode.com/Dharssigakathirvel", emoji: "💻", color: "#ffa116", hoverBg: "#fff9f0" },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/dharssiga-kathirvel-0aa5b5326/", emoji: "💼", color: "#0077b5", hoverBg: "#f0f7fa" },
              { label: "Email", href: "mailto:dharssigakathirvel@gmail.com", emoji: "📧", color: "#e91e8c", hoverBg: "#fdf0f6" }
            ].map(social => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  textDecoration: "none",
                  border: `2px solid ${social.color}33`,
                  borderRadius: 16,
                  padding: "10px 20px",
                  fontSize: 14,
                  fontWeight: 800,
                  color: social.color,
                  transition: "all 0.2s ease",
                  background: "white"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = social.color;
                  e.currentTarget.style.background = social.hoverBg;
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = `${social.color}33`;
                  e.currentTarget.style.background = "white";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <span>{social.emoji}</span>
                <span>{social.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}