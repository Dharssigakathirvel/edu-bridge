import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import API from "../api";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", email: "", class: "",
    obtainedMarks: "", totalMarks: "",
    state: "", interest: "", password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // Frontend validation
    if (Number(form.obtainedMarks) > Number(form.totalMarks)) {
      setError("Obtained marks cannot be more than total marks ❌");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters ❌");
      return;
    }

    setLoading(true);
    try {
      // Convert number fields so backend gets numbers not strings
      const payload = {
        ...form,
        class:         String(form.class),
        obtainedMarks: Number(form.obtainedMarks),
        totalMarks:    Number(form.totalMarks),
      };

      const res = await API.post("/auth/signup", payload);

      // Save token + user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user",  JSON.stringify(res.data.user));

      navigate("/login");
    } catch (err) {
      console.log("Signup error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Signup failed. Is your backend running? ❌");
    } finally {
      setLoading(false);
    }
  }

  const fields = [
    { name:"name",          placeholder:"Full Name 😊",                       type:"text",     required:true },
    { name:"email",         placeholder:"Email Address 📧",                   type:"email",    required:true },
    { name:"class",         placeholder:"Class (e.g. 10) 📚",                type:"number",   required:true },
    { name:"obtainedMarks", placeholder:"Marks Obtained (e.g. 450) 📊",      type:"number",   required:true },
    { name:"totalMarks",    placeholder:"Total Marks (e.g. 500) 📊",         type:"number",   required:true },
    { name:"state",         placeholder:"Your State 📍",                      type:"text",     required:false },
    { name:"interest",      placeholder:"Interests (Coding, Science...) 🌟", type:"text",     required:false },
    { name:"password",      placeholder:"Password (min 6 chars) 🔒",         type:"password", required:true },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg,#fce4ef 0%,#e3f0ff 100%)",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      padding: "1.5rem",
    }}>
      <div style={{
        background: "white",
        borderRadius: 28,
        padding: "2.5rem 2rem",
        width: "100%",
        maxWidth: 420,
        border: "2px solid #fce4ef",
        boxShadow: "0 8px 40px rgba(233,30,140,0.12)",
        animation: "fadeUp 0.4s ease both",
        margin: "1rem 0",
      }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
          <div style={{ fontSize: 48, animation: "float 3s ease-in-out infinite" }}>🌟</div>
          <h1 style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:28, color:"#1a237e", marginTop:8 }}>
            Join EduBridge!
          </h1>
          <p style={{ fontSize:13, color:"#7986cb", fontWeight:700, marginTop:4 }}>
            Create your account and start exploring
          </p>
        </div>

        {/* Error banner */}
        {error && (
          <div style={{
            background: "#fce4ef",
            border: "2px solid #e91e8c",
            borderRadius: 14,
            padding: "10px 16px",
            marginBottom: 12,
            fontSize: 13,
            fontWeight: 700,
            color: "#c2185b",
            animation: "fadeUp 0.2s ease both",
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {fields.map(f => (
            <input
              key={f.name}
              className="input"
              name={f.name}
              type={f.type}
              placeholder={f.placeholder}
              value={form[f.name]}
              onChange={handleChange}
              required={f.required}
              min={["obtainedMarks","totalMarks","class"].includes(f.name) ? 0 : undefined}
            />
          ))}

          <button
            type="submit"
            className="btn-primary"
            style={{ width:"100%", marginTop:20 }}
            disabled={loading}
          >
            {loading ? "Creating account... ⏳" : "Create Account 🎓"}
          </button>
        </form>

        <p style={{ textAlign:"center", marginTop:16, fontSize:13, fontWeight:700, color:"#7986cb" }}>
          Already have an account?{" "}
          <NavLink to="/login" style={{ color:"#e91e8c", textDecoration:"none" }}>
            Login →
          </NavLink>
        </p>
      </div>
    </div>
  );
}