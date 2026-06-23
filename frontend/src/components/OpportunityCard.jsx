export default function OpportunityCard({ item }) {
  const typeColors = {
    Scholarship: { bg: "#e3f0ff", color: "#1565c0", border: "#bbdefb" },
    Hackathon:   { bg: "#fce4ec", color: "#c2185b", border: "#f8bbd0" },
    Competition: { bg: "#e8f5e9", color: "#2e7d32", border: "#c8e6c9" },
    Coding:      { bg: "#ede7f6", color: "#512da8", border: "#d1c4e9" },
  };
  const t = typeColors[item.type] || typeColors.Scholarship;

  return (
    <div
      className="card-hover animate-fadeUp"
      style={{
        background: "white",
        borderRadius: 20,
        padding: "1.4rem",
        border: `2px solid ${t.border}`,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      {/* emoji */}
      <div style={{
        fontSize: 42,
        lineHeight: 1,
        animation: "float 3s ease-in-out infinite",
        display: "inline-block",
        width: "fit-content",
      }}>
        {item.emoji}
      </div>

      {/* type badge */}
      <span style={{
        display: "inline-block",
        background: t.bg,
        color: t.color,
        fontSize: 11,
        fontWeight: 800,
        padding: "3px 12px",
        borderRadius: 10,
        letterSpacing: 0.6,
        width: "fit-content",
      }}>
        {item.type.toUpperCase()}
      </span>

      {/* title */}
      <h2 style={{
        fontFamily: "'Nunito', sans-serif",
        fontWeight: 900,
        fontSize: 17,
        color: "#1a237e",
        lineHeight: 1.3,
      }}>
        {item.title || item.name}
      </h2>

      {/* description */}
      <p style={{
        fontSize: 13,
        color: "#7986cb",
        fontWeight: 600,
        lineHeight: 1.5,
        flex: 1,
      }}>
        {item.description}
      </p>

      {/* meta */}
      <div style={{
        fontSize: 12,
        fontWeight: 700,
        color: "#9e9e9e",
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}>
        <span>📚 {item.class}</span>
        <span style={{ color: "#e91e8c" }}>⏳ Deadline: {item.deadline}</span>
        <span>🏷️ {item.type}</span>
      </div>

      {/* CTA */}
      {item.officialLink ? (
        <a
          href={item.officialLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          style={{ marginTop: 6, width: "100%", padding: "10px", textAlign: "center", textDecoration: "none", display: "block" }}
          onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
          onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
        >
          Apply Now 🔗
        </a>
      ) : (
        <button
          className="btn-primary"
          style={{ marginTop: 6, width: "100%", padding: "10px" }}
          onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
          onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
        >
          View Details →
        </button>
      )}
    </div>
  );
}