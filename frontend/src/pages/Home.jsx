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
  { emoji: "🎓", num: "6",   label: "Scholarships" },
  { emoji: "🏆", num: "4",   label: "Competitions" },
  { emoji: "💻", num: "3",   label: "Hackathons" },
  { emoji: "🌟", num: "100+",label: "Students" },
];

const QUOTES = [
  { text: "The roots of education are bitter, but the fruit is sweet.", author: "Aristotle", emoji: "📚", mood: "deep" },
  { text: "Education is the passport to the future, for tomorrow belongs to those who prepare for it today.", author: "Malcolm X", emoji: "🌍", mood: "powerful" },
  { text: "An investment in knowledge pays the best interest.", author: "Benjamin Franklin", emoji: "💡", mood: "wise" },
  { text: "The beautiful thing about learning is that no one can take it away from you.", author: "B.B. King", emoji: "🔥", mood: "bold" },
  { text: "Do not wait for opportunities, create them.", author: "Roy T. Bennett", emoji: "🚀", mood: "energetic" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill", emoji: "⚡", mood: "motivating" },
  { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar", emoji: "🌱", mood: "encouraging" },
  { text: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein", emoji: "🌟", mood: "thoughtful" },
];

export default function Home() {
  const navigate = useNavigate();
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [flipping, setFlipping] = useState(false);

  // Magic Study House Quiz State
  const [hatStep, setHatStep] = useState(0); // 0 = intro, 1-3 = Qs, 4 = Result
  const [points, setPoints] = useState({ Codedor: 0, Mathclaw: 0, Artpuff: 0, Scitherin: 0 });
  const [finalHouse, setFinalHouse] = useState(null);

  const quizQuestions = [
    {
      q: "Which magical study tool calls out to you?",
      options: [
        { text: "💻 A glowing keyboard that builds digital worlds", house: "Codedor" },
        { text: "🧮 A cosmic chart of mathematical patterns", house: "Mathclaw" },
        { text: "🎨 A paintbrush that colors the clouds in the sky", house: "Artpuff" },
        { text: "🧪 A beaker of glowing, bubbling science experiments", house: "Scitherin" }
      ]
    },
    {
      q: "When you face a challenging problem, you like to...",
      options: [
        { text: "🚀 Jump right in and start experimenting with code", house: "Codedor" },
        { text: "🧩 Map out the logic and calculate the perfect solution", house: "Mathclaw" },
        { text: "✨ Sketch out creative ideas and share with friends", house: "Artpuff" },
        { text: "🔬 Research the science behind it and test hypotheses", house: "Scitherin" }
      ]
    },
    {
      q: "What is your ultimate dream power?",
      options: [
        { text: "⚡ To build legendary apps, games and websites", house: "Codedor" },
        { text: "🔍 To unlock the hidden codes of space and time", house: "Mathclaw" },
        { text: "🌈 To inspire others and bring beauty to the world", house: "Artpuff" },
        { text: "🧪 To invent new cures and master scientific systems", house: "Scitherin" }
      ]
    }
  ];

  const housesInfo = {
    Codedor: {
      name: "Code Castle 🏰",
      desc: "For the creators and builders! You write the magic spells of code and shape the future with awesome software engineering.",
      color: "#1565c0",
      bg: "#e3f0ff",
      borderColor: "#bbdefb",
      icon: "🏰💻"
    },
    Mathclaw: {
      name: "Logic Lagoon 🧮",
      desc: "For the pattern solvers! You unlock the deep secret codes of the universe using logic, math and reasoning.",
      color: "#7e57c2",
      bg: "#ede7f6",
      borderColor: "#d1c4e9",
      icon: "🧮🧠"
    },
    Artpuff: {
      name: "Creative Clouds ☁️",
      desc: "For the dreamers! You paint the world with color, stories, art, and boundless imagination.",
      color: "#ec407a",
      bg: "#fce4ef",
      borderColor: "#f8bbd0",
      icon: "☁️🎨"
    },
    Scitherin: {
      name: "Science Summit 🔬",
      desc: "For the explorers! You analyze complex experiments and master the scientific wonders of nature.",
      color: "#2e7d32",
      bg: "#e8f5e9",
      borderColor: "#c8e6c9",
      icon: "🔬🧪"
    }
  };

  function handleAnswer(house) {
    const updatedPoints = { ...points, [house]: points[house] + 1 };
    setPoints(updatedPoints);
    if (hatStep < quizQuestions.length) {
      setHatStep(hatStep + 1);
    } else {
      // Determine house with max points
      let maxHouse = "Codedor";
      let maxVal = -1;
      for (const [h, val] of Object.entries(updatedPoints)) {
        if (val > maxVal) {
          maxVal = val;
          maxHouse = h;
        }
      }
      setFinalHouse(maxHouse);
      setHatStep(4);
    }
  }

  function resetQuiz() {
    setHatStep(0);
    setPoints({ Codedor: 0, Mathclaw: 0, Artpuff: 0, Scitherin: 0 });
    setFinalHouse(null);
  }

  function nextQuote() {
    setFlipping(true);
    setTimeout(() => {
      setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
      setFlipping(false);
    }, 300);
  }

  function goToQuote(i) {
    if (i === quoteIndex) return;
    setFlipping(true);
    setTimeout(() => { setQuoteIndex(i); setFlipping(false); }, 300);
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
          background: "linear-gradient(135deg, #0d0d2b 0%, #1a237e 50%, #1565c0 100%)",
          borderRadius: 28,
          padding: "2.5rem 2rem",
          textAlign: "center",
          color: "white",
          boxShadow: "0 20px 60px rgba(21, 101, 192, 0.35)",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Star particles */}
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{
              position: "absolute",
              width: i % 2 === 0 ? 4 : 6,
              height: i % 2 === 0 ? 4 : 6,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.5)",
              top: `${10 + i * 14}%`,
              left: `${5 + i * 16}%`,
              animation: `float ${2 + i * 0.4}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }} />
          ))}

          {/* Mood emoji */}
          <div style={{
            fontSize: 48,
            marginBottom: 8,
            animation: "float 3s ease-in-out infinite",
            filter: "drop-shadow(0 4px 12px rgba(255,255,255,0.3))",
          }}>
            {QUOTES[quoteIndex].emoji}
          </div>

          {/* Quote card with flip animation */}
          <div style={{
            minHeight: 110,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            transition: "opacity 0.3s ease, transform 0.3s ease",
            opacity: flipping ? 0 : 1,
            transform: flipping ? "translateY(10px)" : "translateY(0)",
          }}>
            <p style={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: "clamp(15px, 3.5vw, 20px)",
              fontWeight: 800,
              fontStyle: "italic",
              lineHeight: 1.65,
              maxWidth: 560,
              margin: "0 auto 12px",
              opacity: 0.97,
              textShadow: "0 2px 8px rgba(0,0,0,0.3)",
            }}>
              "{QUOTES[quoteIndex].text}"
            </p>
            <p style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#90caf9",
              letterSpacing: 1,
              textTransform: "uppercase",
            }}>
              — {QUOTES[quoteIndex].author}
            </p>
          </div>

          {/* Progress dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: 8, margin: "16px 0" }}>
            {QUOTES.map((_, i) => (
              <button
                key={i}
                onClick={() => goToQuote(i)}
                style={{
                  width: i === quoteIndex ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: i === quoteIndex ? "white" : "rgba(255,255,255,0.3)",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>

          <button
            onClick={nextQuote}
            style={{
              background: "rgba(255,255,255,0.12)",
              color: "white",
              border: "2px solid rgba(255,255,255,0.25)",
              borderRadius: 22,
              padding: "10px 28px",
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 900,
              fontSize: 14,
              cursor: "pointer",
              backdropFilter: "blur(8px)",
              transition: "all 0.2s ease",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "white";
              e.currentTarget.style.color = "#1565c0";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "rgba(255,255,255,0.12)";
              e.currentTarget.style.color = "white";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Next Quote ✨
          </button>
        </div>
      </section>

      {/* ── Magical Study House Quiz Section ── */}
      <section style={{ padding: "0 1.5rem 2.5rem", textAlign: "center" }}>
        <div style={{
          background: "linear-gradient(135deg, var(--pink-light) 0%, var(--blue-light) 100%)",
          border: "2.5px solid var(--pink-light)",
          borderRadius: 28,
          padding: "2.5rem 1.5rem",
          boxShadow: "var(--shadow-md)",
          color: "var(--navy)",
          position: "relative",
          overflow: "hidden"
        }}>
          {/* Sparkles */}
          <div style={{ position: "absolute", top: 12, right: 16, fontSize: 24, animation: "float 4s infinite" }}>🔮</div>
          <div style={{ position: "absolute", bottom: 12, left: 16, fontSize: 24, animation: "float 3s infinite" }}>🌟</div>

          {hatStep === 0 && (
            <div>
              <div style={{ fontSize: 64, marginBottom: 8, animation: "float 3s ease-in-out infinite" }}>🔮</div>
              <h3 style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 900,
                fontSize: 22,
                color: "var(--navy)",
                marginBottom: 8,
                letterSpacing: 0.5
              }}>
                ✨ The Magic Study House Quiz 🌟
              </h3>
              <p style={{ fontSize: 14, color: "var(--blue-mid)", fontWeight: 700, maxWidth: 500, margin: "0 auto 24px", lineHeight: 1.6 }}>
                Step forward, young explorer! Answer a few magical questions to discover your Study House!
              </p>
              <button className="btn-primary" onClick={() => setHatStep(1)}>
                Discover Your House 🔮
              </button>
            </div>
          )}

          {hatStep > 0 && hatStep <= 3 && (
            <div>
              <span style={{ fontSize: 11, fontWeight: 900, color: "var(--pink)", letterSpacing: 2 }}>QUESTION {hatStep} OF 3</span>
              <h4 style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 800,
                fontSize: 18,
                marginTop: 8,
                marginBottom: 20,
                color: "var(--navy)"
              }}>
                {quizQuestions[hatStep - 1].q}
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 420, margin: "0 auto" }}>
                {quizQuestions[hatStep - 1].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(opt.house)}
                    style={{
                      background: "white",
                      border: "2px solid var(--blue-light)",
                      borderRadius: 16,
                      padding: "14px 20px",
                      textAlign: "left",
                      color: "var(--navy)",
                      fontFamily: "'Nunito', sans-serif",
                      fontWeight: 800,
                      fontSize: 14,
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = "var(--pink-light)";
                      e.currentTarget.style.borderColor = "var(--pink)";
                      e.currentTarget.style.transform = "translateX(4px)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = "white";
                      e.currentTarget.style.borderColor = "var(--blue-light)";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {hatStep === 4 && finalHouse && (
            <div className="animate-bounce-in">
              <div style={{ fontSize: 72, marginBottom: 8 }}>{housesInfo[finalHouse].icon}</div>
              <span style={{ fontSize: 11, fontWeight: 900, color: "var(--pink)", letterSpacing: 2 }}>YOU BELONG IN...</span>
              <h3 style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 900,
                fontSize: 26,
                color: housesInfo[finalHouse].color,
                marginTop: 6,
                marginBottom: 12
              }}>
                {housesInfo[finalHouse].name}
              </h3>
              <div style={{
                background: housesInfo[finalHouse].bg,
                border: `2px solid ${housesInfo[finalHouse].borderColor}`,
                borderRadius: 20,
                padding: "20px",
                maxWidth: 450,
                margin: "0 auto 24px"
              }}>
                <p style={{ fontSize: 14, color: "var(--navy)", fontWeight: 700, lineHeight: 1.6 }}>
                  {housesInfo[finalHouse].desc}
                </p>
              </div>
              <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                <button className="btn-primary" onClick={resetQuiz}>
                  Quiz Again 🔄
                </button>
                <button className="btn-secondary" onClick={() => navigate("/opportunities")}>
                  Explore Opportunities 🚀
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}