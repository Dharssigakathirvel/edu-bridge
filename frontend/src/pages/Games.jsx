import { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar.jsx";

// ── GAME 1: Math Puzzle ──────────────────────────────────────────
function MathPuzzle() {
  const ops = ["+","-","×","÷"];
  function makeQ() {
    const op = ops[Math.floor(Math.random()*ops.length)];
    let a,b,ans;
    if(op==="+"){a=Math.floor(Math.random()*50)+1;b=Math.floor(Math.random()*50)+1;ans=a+b;}
    else if(op==="-"){a=Math.floor(Math.random()*50)+10;b=Math.floor(Math.random()*a)+1;ans=a-b;}
    else if(op==="×"){a=Math.floor(Math.random()*12)+1;b=Math.floor(Math.random()*12)+1;ans=a*b;}
    else{b=Math.floor(Math.random()*10)+1;ans=Math.floor(Math.random()*10)+1;a=b*ans;}
    return {q:`${a} ${op} ${b}`,ans};
  }
  const [q,setQ]         = useState(makeQ);
  const [input,setInput] = useState("");
  const [score,setScore] = useState(0);
  const [streak,setStreak]=useState(0);
  const [flash,setFlash] = useState(null); // "right"|"wrong"
  const [timer,setTimer] = useState(15);
  const [best,setBest]   = useState(()=>Number(localStorage.getItem("mathBest")||0));

  useEffect(()=>{
    if(timer===0){next(false);return;}
    const t=setTimeout(()=>setTimer(v=>v-1),1000);
    return()=>clearTimeout(t);
  },[timer]);

  function next(correct){
    if(correct){
      const ns=score+1,nst=streak+1;
      setScore(ns);setStreak(nst);
      if(ns>best){setBest(ns);localStorage.setItem("mathBest",ns);}
      setFlash("right");
    } else {
      setStreak(0);setFlash("wrong");
    }
    setTimeout(()=>setFlash(null),400);
    setQ(makeQ());setInput("");setTimer(15);
  }

  function submit(e){e.preventDefault();if(Number(input)===q.ans)next(true);else next(false);}

  return (
    <div style={{ background:"white", borderRadius:24, padding:"1.5rem", border:"2px solid #e3f0ff",
      transition:"background 0.2s",
      ...(flash==="right"?{background:"#e8f5e9",border:"2px solid #43a047"}:{}),
      ...(flash==="wrong"?{background:"#fce4ef",border:"2px solid #e91e8c"}:{}),
    }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
        <div>
          <span style={{ fontSize:11, fontWeight:800, color:"#7986cb" }}>🏆 Score: {score}</span>
          <span style={{ fontSize:11, fontWeight:800, color:"#e91e8c", marginLeft:12 }}>⭐ Best: {best}</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          {streak>=3 && <span style={{ fontSize:11, fontWeight:900, color:"#ff6f00", background:"#fff3e0", padding:"2px 8px", borderRadius:8 }}>🔥 x{streak}</span>}
          <div style={{
            width:36, height:36, borderRadius:"50%",
            background: timer<=5 ? "linear-gradient(135deg,#e91e8c,#c2185b)" : "linear-gradient(135deg,#fce4ef,#e3f0ff)",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:14,
            color: timer<=5 ? "white" : "#1a237e",
          }}>{timer}</div>
        </div>
      </div>
      <div style={{ textAlign:"center", margin:"1.5rem 0 1rem" }}>
        <div style={{ fontSize:13, fontWeight:800, color:"#7986cb", marginBottom:6 }}>Solve it! 🧮</div>
        <div style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:42, color:"#1a237e" }}>{q.q} = ?</div>
      </div>
      <form onSubmit={submit} style={{ display:"flex", gap:8 }}>
        <input
          type="number" value={input} onChange={e=>setInput(e.target.value)}
          placeholder="Your answer..."
          style={{ flex:1, padding:"12px 16px", borderRadius:16, border:"2px solid #e3f0ff",
            fontFamily:"'Nunito',sans-serif", fontWeight:800, fontSize:18, color:"#1a237e",
            outline:"none", textAlign:"center" }}
          autoFocus
        />
        <button type="submit" className="btn-primary" style={{ padding:"12px 20px", borderRadius:16 }}>✓</button>
      </form>
    </div>
  );
}

// ── GAME 2: Word Scramble ─────────────────────────────────────────
const WORDS = [
  {word:"ALGORITHM",hint:"Set of rules for solving a problem"},
  {word:"PYTHON",hint:"Popular programming language 🐍"},
  {word:"SCHOLARSHIP",hint:"Money for education 🎓"},
  {word:"VARIABLE",hint:"Stores data in code"},
  {word:"GRAVITY",hint:"Force that pulls things down 🌍"},
  {word:"PHOTON",hint:"Particle of light"},
  {word:"EQUATION",hint:"Math statement with ="},
  {word:"MOLECULE",hint:"Two or more atoms bonded"},
  {word:"FUNCTION",hint:"Reusable block of code"},
  {word:"HEXAGON",hint:"Shape with 6 sides"},
];

function scramble(w){return w.split("").sort(()=>Math.random()-0.5).join("");}

function WordScramble(){
  const [idx,setIdx]     = useState(0);
  const [sc,setSc]       = useState(()=>scramble(WORDS[0].word));
  const [input,setInput] = useState("");
  const [score,setScore] = useState(0);
  const [reveal,setReveal]=useState(false);
  const [flash,setFlash] = useState(null);

  function next(skip=false){
    if(!skip && input.toUpperCase()===WORDS[idx].word){
      setScore(s=>s+1); setFlash("right");
    } else { setFlash("wrong"); }
    setTimeout(()=>setFlash(null),400);
    const ni=(idx+1)%WORDS.length;
    setIdx(ni); setSc(scramble(WORDS[ni].word));
    setInput(""); setReveal(false);
  }

  return (
    <div style={{ background:"white", borderRadius:24, padding:"1.5rem", border:"2px solid #fce4ef",
      transition:"background 0.2s",
      ...(flash==="right"?{background:"#e8f5e9",border:"2px solid #43a047"}:{}),
      ...(flash==="wrong"?{background:"#fce4ef",border:"2px solid #e91e8c"}:{}),
    }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12 }}>
        <span style={{ fontSize:11, fontWeight:800, color:"#7986cb" }}>🔤 Word Scramble</span>
        <span style={{ fontSize:11, fontWeight:900, color:"#e91e8c" }}>🏆 {score}/{WORDS.length}</span>
      </div>
      <p style={{ fontSize:12, fontWeight:700, color:"#7986cb", marginBottom:6 }}>💡 {WORDS[idx].hint}</p>
      <div style={{ textAlign:"center", margin:"1rem 0" }}>
        <div style={{ display:"flex", gap:6, justifyContent:"center", flexWrap:"wrap" }}>
          {sc.split("").map((c,i)=>(
            <div key={i} style={{
              width:36, height:42, borderRadius:10,
              background:"linear-gradient(135deg,#fce4ef,#e3f0ff)",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:20, color:"#1a237e",
              border:"2px solid #e3f0ff",
            }}>{c}</div>
          ))}
        </div>
      </div>
      {reveal && <p style={{ textAlign:"center", fontWeight:900, color:"#e91e8c", marginBottom:8 }}>Answer: {WORDS[idx].word}</p>}
      <div style={{ display:"flex", gap:8 }}>
        <input value={input} onChange={e=>setInput(e.target.value.toUpperCase())}
          placeholder="Unscramble..." maxLength={WORDS[idx].word.length}
          style={{ flex:1, padding:"11px 14px", borderRadius:14, border:"2px solid #e3f0ff",
            fontFamily:"'Nunito',sans-serif", fontWeight:800, fontSize:16, color:"#1a237e", outline:"none" }}
          onKeyDown={e=>e.key==="Enter"&&next()}
        />
        <button onClick={()=>next()} className="btn-primary" style={{ padding:"11px 16px", borderRadius:14 }}>→</button>
      </div>
      <button onClick={()=>setReveal(true)} style={{
        marginTop:8, width:"100%", background:"transparent", border:"none",
        color:"#7986cb", fontFamily:"'Nunito',sans-serif", fontWeight:700, fontSize:12, cursor:"pointer"
      }}>🔍 Show answer</button>
    </div>
  );
}

// ── GAME 3: Memory Match ──────────────────────────────────────────
const EMOJIS = ["🎓","🚀","💻","🔬","🧮","🎨","📚","🏆"];
function makeCards(){
  const pairs=[...EMOJIS,...EMOJIS];
  return pairs.sort(()=>Math.random()-0.5).map((e,i)=>({id:i,emoji:e,flipped:false,matched:false}));
}
function MemoryMatch(){
  const [cards,setCards]   = useState(makeCards);
  const [sel,setSel]       = useState([]);
  const [moves,setMoves]   = useState(0);
  const [won,setWon]       = useState(false);
  const [lock,setLock]     = useState(false);

  function flip(id){
    if(lock||cards[id].flipped||cards[id].matched) return;
    const newCards=cards.map(c=>c.id===id?{...c,flipped:true}:c);
    const newSel=[...sel,id];
    setCards(newCards);
    if(newSel.length===2){
      setMoves(m=>m+1); setLock(true);
      if(newCards[newSel[0]].emoji===newCards[newSel[1]].emoji){
        const matched=newCards.map(c=>newSel.includes(c.id)?{...c,matched:true}:c);
        setCards(matched); setSel([]); setLock(false);
        if(matched.every(c=>c.matched)) setWon(true);
      } else {
        setTimeout(()=>{
          setCards(newCards.map(c=>newSel.includes(c.id)?{...c,flipped:false}:c));
          setSel([]); setLock(false);
        },900);
      }
    } else { setSel(newSel); }
  }

  function reset(){setCards(makeCards());setSel([]);setMoves(0);setWon(false);setLock(false);}

  return (
    <div style={{ background:"white", borderRadius:24, padding:"1.5rem", border:"2px solid #e3f0ff" }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12 }}>
        <span style={{ fontSize:11, fontWeight:800, color:"#7986cb" }}>🧠 Memory Match</span>
        <span style={{ fontSize:11, fontWeight:900, color:"#1565c0" }}>👆 Moves: {moves}</span>
      </div>
      {won ? (
        <div style={{ textAlign:"center", padding:"1rem" }}>
          <div style={{ fontSize:48 }}>🎉</div>
          <p style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:20, color:"#1a237e", margin:"8px 0" }}>
            You won in {moves} moves!
          </p>
          <button onClick={reset} className="btn-primary" style={{ padding:"10px 24px" }}>Play Again</button>
        </div>
      ) : (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8 }}>
          {cards.map(c=>(
            <div key={c.id} onClick={()=>flip(c.id)} style={{
              height:58, borderRadius:14,
              background: c.flipped||c.matched
                ? "linear-gradient(135deg,#fce4ef,#e3f0ff)"
                : "linear-gradient(135deg,#1565c0,#1a237e)",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize: c.flipped||c.matched ? 26 : 20,
              cursor:"pointer",
              border: c.matched ? "2px solid #43a047" : "2px solid transparent",
              transition:"all 0.2s",
              transform: c.flipped||c.matched ? "scale(1.05)" : "scale(1)",
              userSelect:"none",
            }}>
              {c.flipped||c.matched ? c.emoji : "⭐"}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── GAME 4: Code Fill-in ──────────────────────────────────────────
const CODE_QS = [
  { code:`print("Hello, ___!")`, blank:"World", hint:"The classic first program", lang:"Python" },
  { code:`for i in range(___):`, blank:"10", hint:"Loop 10 times", lang:"Python" },
  { code:`if ___ == True:`, blank:"condition", hint:"Check a condition", lang:"Python" },
  { code:`let x = ___;`, blank:"5", hint:"Declare a variable with value 5", lang:"JS" },
  { code:`console.___(\"hi\")`, blank:"log", hint:"Print to browser console", lang:"JS" },
  { code:`def ___(x): return x*2`, blank:"double", hint:"Function that doubles a number", lang:"Python" },
  { code:`arr = [1, 2, ___]`, blank:"3", hint:"Complete the list", lang:"Python" },
];
function CodeFill(){
  const [idx,setIdx]     = useState(0);
  const [input,setInput] = useState("");
  const [score,setScore] = useState(0);
  const [flash,setFlash] = useState(null);
  const q=CODE_QS[idx];

  function submit(e){
    e.preventDefault();
    const correct=input.trim()===q.blank;
    if(correct)setScore(s=>s+1);
    setFlash(correct?"right":"wrong");
    setTimeout(()=>{
      setFlash(null);
      setIdx(i=>(i+1)%CODE_QS.length);
      setInput("");
    },600);
  }

  return (
    <div style={{ background:"white", borderRadius:24, padding:"1.5rem", border:"2px solid #ede7f6",
      transition:"background 0.2s",
      ...(flash==="right"?{background:"#e8f5e9"}:{}),
      ...(flash==="wrong"?{background:"#fce4ef"}:{}),
    }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12 }}>
        <span style={{ fontSize:11, fontWeight:800, color:"#7986cb" }}>💻 Code Fill-in</span>
        <div style={{ display:"flex", gap:8 }}>
          <span style={{ fontSize:10, fontWeight:900, background:"#ede7f6", color:"#512da8", padding:"2px 8px", borderRadius:6 }}>{q.lang}</span>
          <span style={{ fontSize:11, fontWeight:900, color:"#e91e8c" }}>🏆 {score}/{CODE_QS.length}</span>
        </div>
      </div>
      <p style={{ fontSize:12, fontWeight:700, color:"#7986cb", marginBottom:10 }}>💡 {q.hint}</p>
      <div style={{
        background:"#1a237e", borderRadius:14, padding:"1rem 1.25rem", marginBottom:14,
        fontFamily:"monospace", fontSize:16, color:"#e3f0ff", letterSpacing:0.5,
      }}>
        {q.code.replace("___", "▓▓▓")}
      </div>
      <form onSubmit={submit} style={{ display:"flex", gap:8 }}>
        <input value={input} onChange={e=>setInput(e.target.value)}
          placeholder="Fill the blank..."
          style={{ flex:1, padding:"11px 14px", borderRadius:14, border:"2px solid #ede7f6",
            fontFamily:"monospace", fontWeight:800, fontSize:14, color:"#1a237e", outline:"none" }}
          autoFocus
        />
        <button type="submit" className="btn-primary" style={{ padding:"11px 18px", borderRadius:14 }}>✓</button>
      </form>
    </div>
  );
}

// ── MAIN Games Page ───────────────────────────────────────────────
const GAMES = [
  { id:"math",   label:"Math Blitz",    emoji:"🧮", desc:"Solve fast! Beat the clock",  color:"#e3f0ff", border:"#bbdefb" },
  { id:"word",   label:"Word Scramble", emoji:"🔤", desc:"Unscramble science & tech words", color:"#fce4ef", border:"#f8bbd0" },
  { id:"memory", label:"Memory Match",  emoji:"🧠", desc:"Find the matching pairs",      color:"#e8f5e9", border:"#c8e6c9" },
  { id:"code",   label:"Code Fill-in",  emoji:"💻", desc:"Complete the code snippet",    color:"#ede7f6", border:"#d1c4e9" },
];

export default function Games(){
  const [active,setActive] = useState(null);

  return (
    <div className="page-wrap" style={{ paddingBottom:90 }}>
      <Navbar />

      {/* Header */}
      <div style={{
        background:"linear-gradient(135deg,#fce4ef 0%,#e3f0ff 100%)",
        padding:"1.75rem 1.25rem 1.5rem",
      }}>
        <h1 style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:"clamp(22px,5vw,32px)", color:"#1a237e", marginBottom:4 }}>
          🎮 Brain Games
        </h1>
        <p style={{ fontSize:13, color:"#5c6bc0", fontWeight:700 }}>
          Play, learn and level up! Games for ages 10–18 🚀
        </p>
      </div>

      <div style={{ padding:"1.25rem", maxWidth:600, margin:"0 auto" }}>

        {/* Game selector */}
        {!active && (
          <>
            <p style={{ fontSize:12, fontWeight:800, color:"#7986cb", marginBottom:12 }}>
              Pick a game to play 👇
            </p>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:12, marginBottom:20 }}>
              {GAMES.map(g=>(
                <div key={g.id} onClick={()=>setActive(g.id)}
                  className="card-hover"
                  style={{
                    background:g.color, borderRadius:22, padding:"1.25rem",
                    border:`2px solid ${g.border}`, cursor:"pointer",
                    textAlign:"center",
                  }}
                >
                  <div style={{ fontSize:36, marginBottom:8, animation:"float 3s ease-in-out infinite" }}>{g.emoji}</div>
                  <div style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:15, color:"#1a237e", marginBottom:4 }}>{g.label}</div>
                  <div style={{ fontSize:12, fontWeight:700, color:"#7986cb" }}>{g.desc}</div>
                </div>
              ))}
            </div>

            {/* Fun facts */}
            <div style={{ background:"white", borderRadius:22, padding:"1.25rem", border:"2px solid #fce4ef" }}>
              <p style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:14, color:"#1a237e", marginBottom:10 }}>
                💡 Did you know?
              </p>
              {[
                "Playing math games for 15 mins/day improves exam scores by 20%! 🧮",
                "Coding is the 2nd most in-demand skill worldwide in 2025! 💻",
                "Memory games strengthen focus and help in exams! 🧠",
              ].map((f,i)=>(
                <div key={i} style={{
                  padding:"8px 12px", borderRadius:12,
                  background: i%2===0 ? "#fdf4f8" : "#f0f4ff",
                  marginBottom:8, fontSize:13, fontWeight:700, color:"#5c6bc0",
                }}>{f}</div>
              ))}
            </div>
          </>
        )}

        {/* Active game */}
        {active && (
          <div className="animate-fadeUp">
            <button onClick={()=>setActive(null)} style={{
              background:"white", border:"2px solid #e3f0ff", borderRadius:14,
              padding:"8px 16px", fontFamily:"'Nunito',sans-serif",
              fontWeight:800, fontSize:13, color:"#1565c0", cursor:"pointer",
              marginBottom:14, display:"flex", alignItems:"center", gap:6,
            }}>← Back to Games</button>

            <h2 style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:18, color:"#1a237e", marginBottom:14 }}>
              {GAMES.find(g=>g.id===active)?.emoji} {GAMES.find(g=>g.id===active)?.label}
            </h2>

            {active==="math"   && <MathPuzzle />}
            {active==="word"   && <WordScramble />}
            {active==="memory" && <MemoryMatch />}
            {active==="code"   && <CodeFill />}
          </div>
        )}
      </div>
    </div>
  );
}