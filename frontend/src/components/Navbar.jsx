import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  let user = null;
  try { user = JSON.parse(localStorage.getItem("user")); } catch {}
  const isAdmin = user?.role === "admin";

  const studentLinks = [
    { to:"/",                label:"Home",    icon:"🏠" },
    { to:"/opportunities",   label:"Find",    icon:"🔍" },
    { to:"/games",           label:"Games",   icon:"🎮" },
    { to:"/recommendations", label:"Matches", icon:"🚀" },
    { to:"/profile",         label:"Profile", icon:"👤" },
  ];

  const adminLinks = [
    { to:"/",                label:"Home",    icon:"🏠" },
    { to:"/opportunities",   label:"Find",    icon:"🔍" },
    { to:"/add-scholarship", label:"Admin",   icon:"🛡️" },
    { to:"/profile",         label:"Profile", icon:"👤" },
  ];

  const guestLinks = [
    { to:"/",              label:"Home",    icon:"🏠" },
    { to:"/opportunities", label:"Find",    icon:"🔍" },
    { to:"/games",         label:"Games",   icon:"🎮" },
    { to:"/login",         label:"Login",   icon:"🔐" },
    { to:"/signup",        label:"Sign Up", icon:"✨" },
  ];

  const links = user ? (isAdmin ? adminLinks : studentLinks) : guestLinks;

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("student");
    window.location.href = "/login";
  }

  const initials = user?.name
    ? user.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase()
    : null;

  return (
    <>
      {/* ── TOP bar ── */}
      <nav style={{
        background:"white",
        borderBottom:"2px solid #fce4ef",
        padding:"0 1.25rem",
        height:60,
        display:"flex",
        alignItems:"center",
        justifyContent:"space-between",
        position:"sticky",
        top:0,
        zIndex:100,
        boxShadow:"0 2px 16px rgba(233,30,140,0.08)",
      }}>
        {/* Logo */}
        <div onClick={()=>navigate("/")} style={{ cursor:"pointer", display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:26, display:"inline-block", animation:"spin-slow 8s linear infinite" }}>⭐</span>
          <span style={{
            fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:20,
            background:"linear-gradient(135deg,#e91e8c,#1565c0)",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
          }}>EduBridge</span>
        </div>

        {/* Right side */}
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          {user ? (
            <>
              {/* User chip */}
              <div style={{
                display:"flex", alignItems:"center", gap:8,
                background:"linear-gradient(135deg,#fce4ef,#e3f0ff)",
                borderRadius:20, padding:"5px 12px 5px 5px",
                border:"2px solid #fce4ef",
              }}>
                <div style={{
                  width:30, height:30, borderRadius:"50%",
                  background:"linear-gradient(135deg,#e91e8c,#1565c0)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:12, color:"white", fontWeight:900,
                }}>{initials}</div>
                <span style={{ fontFamily:"'Nunito',sans-serif", fontWeight:800, fontSize:13, color:"#1a237e" }}>
                  {user.name?.split(" ")[0]}
                </span>
                {isAdmin && (
                  <span style={{
                    background:"linear-gradient(135deg,#e91e8c,#1565c0)",
                    color:"white", fontSize:10, fontWeight:900,
                    padding:"2px 8px", borderRadius:8,
                  }}>ADMIN</span>
                )}
              </div>
              <button onClick={logout} style={{
                background:"white", color:"#e91e8c",
                border:"2px solid #fce4ef", borderRadius:16,
                padding:"6px 14px", fontFamily:"'Nunito',sans-serif",
                fontWeight:800, fontSize:13, cursor:"pointer",
              }}
              onMouseEnter={e=>e.currentTarget.style.background="#fce4ef"}
              onMouseLeave={e=>e.currentTarget.style.background="white"}
              >Logout</button>
            </>
          ) : (
            <div style={{ display:"flex", gap:8 }}>
              <NavLink to="/login" style={{ textDecoration:"none" }}>
                <button style={{
                  background:"white", color:"#1565c0",
                  border:"2px solid #e3f0ff", borderRadius:16,
                  padding:"7px 16px", fontFamily:"'Nunito',sans-serif",
                  fontWeight:800, fontSize:13, cursor:"pointer",
                }}>Login</button>
              </NavLink>
              <NavLink to="/signup" style={{ textDecoration:"none" }}>
                <button style={{
                  background:"linear-gradient(135deg,#e91e8c,#1565c0)",
                  color:"white", border:"none", borderRadius:16,
                  padding:"7px 16px", fontFamily:"'Nunito',sans-serif",
                  fontWeight:800, fontSize:13, cursor:"pointer",
                  boxShadow:"0 3px 12px rgba(233,30,140,0.25)",
                }}>Sign Up ✨</button>
              </NavLink>
            </div>
          )}
        </div>
      </nav>

      {/* ── BOTTOM nav ── */}
      <nav style={{
        position:"fixed", bottom:0, left:0, right:0, zIndex:100,
        background:"white",
        borderTop:"2px solid #fce4ef",
        display:"flex", alignItems:"center", justifyContent:"space-around",
        padding:"6px 0 calc(6px + env(safe-area-inset-bottom))",
        boxShadow:"0 -4px 20px rgba(233,30,140,0.10)",
      }}>
        {links.map(l=>(
          <NavLink key={l.to} to={l.to} end={l.to==="/"} style={{ textDecoration:"none", flex:1 }}>
            {({ isActive })=>(
              <div style={{
                display:"flex", flexDirection:"column", alignItems:"center", gap:2,
                padding:"4px 0", position:"relative",
              }}>
                {isActive && (
                  <div style={{
                    position:"absolute", top:0, left:"50%", transform:"translateX(-50%)",
                    width:44, height:44, borderRadius:14,
                    background:"linear-gradient(135deg,#fce4ef,#e3f0ff)",
                    zIndex:0,
                  }}/>
                )}
                <span style={{
                  fontSize:20, zIndex:1,
                  transform: isActive ? "scale(1.15) translateY(-1px)" : "scale(1)",
                  transition:"transform 0.2s",
                  display:"block",
                  filter: isActive ? "none" : "grayscale(30%)",
                }}>{l.icon}</span>
                <span style={{
                  fontSize:10, fontWeight:800,
                  fontFamily:"'Nunito',sans-serif",
                  color: isActive ? "#e91e8c" : "#9e9e9e",
                  zIndex:1, letterSpacing:0.2,
                }}>{l.label}</span>
              </div>
            )}
          </NavLink>
        ))}
      </nav>
    </>
  );
}