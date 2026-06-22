import { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import OpportunityCard from "../components/OpportunityCard.jsx";
import opportunities from "../data/opportunities.jsx";

const CATEGORIES = ["All", "Scholarship", "Hackathon", "Competition", "Coding"];

export default function Opportunities() {
  const [search, setSearch]     = useState("");
  const [category, setCategory] = useState("All");

  const filtered = opportunities.filter(item => {
    const matchSearch   = item.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "All" || item.type === category;
    return matchSearch && matchCategory;
  });

  return (
    <div className="page-wrap">
      <Navbar />

      {/* Page header */}
      <div style={{
        background: "linear-gradient(135deg,#fce4ef,#e3f0ff)",
        padding: "2rem 1.5rem 1.5rem",
        textAlign: "center",
      }}>
        <h1 style={{
          fontFamily: "'Nunito', sans-serif",
          fontWeight: 900,
          fontSize: "clamp(24px,6vw,42px)",
          color: "#1a237e",
          marginBottom: 6,
        }}>
          Explore Opportunities 🌟
        </h1>
        <p style={{ fontSize: 14, color: "#5c6bc0", fontWeight: 700 }}>
          Find the perfect match for your talents!
        </p>
      </div>

      {/* Search + filter */}
      <div style={{
        padding: "1.5rem 1.5rem 0",
        display: "flex",
        gap: 10,
        flexWrap: "wrap",
        justifyContent: "center",
      }}>
        <div style={{ position: "relative", flex: "1 1 240px", maxWidth: 380 }}>
          <span style={{
            position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
            fontSize: 18, pointerEvents: "none",
          }}>🔍</span>
          <input
            type="text"
            placeholder="Search opportunities..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 16px 12px 42px",
              borderRadius: 20,
              border: "2px solid #fce4ef",
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 700,
              fontSize: 14,
              color: "#1a237e",
              background: "white",
              outline: "none",
            }}
            onFocus={e => e.target.style.borderColor = "#e91e8c"}
            onBlur={e  => e.target.style.borderColor = "#fce4ef"}
          />
        </div>

        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          style={{
            padding: "12px 18px",
            borderRadius: 20,
            border: "2px solid #e3f0ff",
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 800,
            fontSize: 14,
            color: "#1565c0",
            background: "white",
            cursor: "pointer",
            outline: "none",
            flex: "0 0 auto",
          }}
        >
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* Category pill shortcuts */}
      <div style={{
        display: "flex",
        gap: 8,
        padding: "1rem 1.5rem 0",
        overflowX: "auto",
        scrollbarWidth: "none",
      }}>
        {CATEGORIES.map(c => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            style={{
              whiteSpace: "nowrap",
              padding: "6px 16px",
              borderRadius: 16,
              border: category === c ? "2px solid #e91e8c" : "2px solid #e3f0ff",
              background: category === c
                ? "linear-gradient(135deg,#fce4ef,#e3f0ff)"
                : "white",
              color: category === c ? "#e91e8c" : "#7986cb",
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 800,
              fontSize: 13,
              cursor: "pointer",
              transition: "all 0.18s",
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{
        padding: "1.5rem",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: 16,
      }}>
        {filtered.map((item, i) => (
          <div key={item.id} style={{ animationDelay: `${i * 0.08}s` }}>
            <OpportunityCard item={item} />
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>😢</div>
          <p style={{ fontWeight: 800, fontSize: 18, color: "#7986cb" }}>
            No opportunities found
          </p>
          <p style={{ fontSize: 14, color: "#b0bec5", marginTop: 4 }}>
            Try a different search or category!
          </p>
        </div>
      )}
    </div>
  );
}