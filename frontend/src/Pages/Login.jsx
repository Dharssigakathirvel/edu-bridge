import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm]       = useState({ email:"", password:"" });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user",  JSON.stringify(res.data.user));
      if (res.data.user.role === "admin") navigate("/add-scholarship");
      else navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Is your backend running? ❌");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight:"100vh",
      background:"linear-gradient(135deg,#fce4ef 0%,#e3f0ff 100%)",
      display:"flex", alignItems:"center", justifyContent:"center",
      padding:"1.5rem",
    }}>
      <div style={{
        background:"white", borderRadius:28,
        padding:"2.5rem 2rem", width:"100%", maxWidth:400,
        border:"2px solid #fce4ef",
        boxShadow:"0 8px 40px rgba(233,30,140,0.12)",
        animation:"fadeUp 0.4s ease both",
      }}>
        {/* Logo */}
        <div style={{ textAlign:"center", marginBottom:8 }}>
          <span style={{ fontSize:22, fontFamily:"'Nunito',sans-serif", fontWeight:900,
            background:"linear-gradient(135deg,#e91e8c,#1565c0)",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
            ⭐ EduBridge
          </span>
        </div>

        <div style={{ textAlign:"center", marginBottom:"1.75rem" }}>
          <div style={{ fontSize:48, animation:"float 3s ease-in-out infinite" }}>🔐</div>
          <h1 style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:26, color:"#1a237e", marginTop:8 }}>
            Welcome back!
          </h1>
          <p style={{ fontSize:13, color:"#7986cb", fontWeight:700, marginTop:4 }}>
            Login to find scholarships made for you
          </p>
        </div>

        {error && (
          <div style={{
            background:"#fce4ef", border:"2px solid #e91e8c", borderRadius:14,
            padding:"10px 16px", marginBottom:14,
            fontSize:13, fontWeight:700, color:"#c2185b",
            animation:"fadeUp 0.2s ease both",
          }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input className="input" name="email" type="email"
            placeholder="Email Address 📧" value={form.email}
            onChange={handleChange} required />
          <input className="input" name="password" type="password"
            placeholder="Password 🔒" value={form.password}
            onChange={handleChange} required />
          <button type="submit" className="btn-primary"
            style={{ width:"100%", marginTop:20 }} disabled={loading}>
            {loading ? "Logging in... ⏳" : "Login 🚀"}
          </button>
        </form>

        <p style={{ textAlign:"center", marginTop:16, fontSize:13, fontWeight:700, color:"#7986cb" }}>
          No account?{" "}
          <NavLink to="/signup" style={{ color:"#e91e8c", textDecoration:"none", fontWeight:900 }}>
            Sign up free →
          </NavLink>
        </p>
      </div>
    </div>
  );
}