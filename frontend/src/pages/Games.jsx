import { useState, useEffect, useCallback, useRef } from "react";
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

// ── GAME 5: Tic Tac Toe (vs Computer) ──────────────────────────────
const WINS = [
  [0,1,2],[3,4,5],[6,7,8], // rows
  [0,3,6],[1,4,7],[2,5,8], // cols
  [0,4,8],[2,4,6],         // diagonals
];

function TicTacToe(){
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xTurn, setXTurn] = useState(true); // Player is X
  const [winLine, setWinLine] = useState(null);

  function getWinner(b){
    for(const [a,c,d] of WINS){
      if(b[a] && b[a]===b[c] && b[a]===b[d]) return {winner:b[a], line:[a,c,d]};
    }
    if(b.every(Boolean)) return {winner:"Draw", line:[]};
    return null;
  }

  function click(i){
    if(board[i] || winLine || !xTurn) return;
    const next = board.slice();
    next[i] = "X";
    setBoard(next);
    setXTurn(false);
    const result = getWinner(next);
    if(result) {
      setWinLine(result);
    }
  }

  // Computer AI move effect
  useEffect(() => {
    if (xTurn || winLine) return;
    
    const timer = setTimeout(() => {
      const emptyCells = board.map((val, idx) => val === null ? idx : null).filter(val => val !== null);
      if (emptyCells.length === 0) return;
      
      let choice = null;
      // 1. Try to win or block
      for (const checkMark of ["O", "X"]) {
        for (const [a, b, c] of WINS) {
          const vals = [board[a], board[b], board[c]];
          const emptyCount = vals.filter(v => v === null).length;
          const markCount = vals.filter(v => v === checkMark).length;
          if (emptyCount === 1 && markCount === 2) {
            if (board[a] === null) choice = a;
            else if (board[b] === null) choice = b;
            else if (board[c] === null) choice = c;
            break;
          }
        }
        if (choice !== null) break;
      }
      
      // 2. Take center if available
      if (choice === null && board[4] === null) {
        choice = 4;
      }
      
      // 3. Take random corner
      if (choice === null) {
        const corners = [0, 2, 6, 8].filter(c => board[c] === null);
        if (corners.length > 0) {
          choice = corners[Math.floor(Math.random() * corners.length)];
        }
      }

      // 4. Random choice
      if (choice === null) {
        choice = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      }

      const next = board.slice();
      next[choice] = "O";
      setBoard(next);
      setXTurn(true);
      const result = getWinner(next);
      if (result) setWinLine(result);
    }, 450);

    return () => clearTimeout(timer);
  }, [xTurn, board, winLine]);

  function reset(){ setBoard(Array(9).fill(null)); setXTurn(true); setWinLine(null); }

  const result = winLine;
  const cellColors = {
    X: "linear-gradient(135deg,#ec407a,#e91e8c)",
    O: "linear-gradient(135deg,#29b6f6,#0288d1)",
    null: "linear-gradient(135deg,#fce4ef,#e3f0ff)",
  };

  return (
    <div style={{ background:"white", borderRadius:24, padding:"1.5rem", border:"2px solid #ffe0b2" }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12, alignItems:"center" }}>
        <span style={{ fontSize:11, fontWeight:800, color:"#ffa726" }}>⭕ Tic Tac Toe vs Bot</span>
        {result ? (
          <span style={{ fontSize:12, fontWeight:900, color: result.winner==="Draw"?"#ff6f00":"#e91e8c" }}>
            {result.winner==="Draw" ? "🤝 It's a Draw!" : (result.winner === "X" ? "🏆 You Win! 🎉" : "😢 Bot Wins!")}
          </span>
        ) : (
          <span style={{ fontSize:12, fontWeight:800, color: xTurn?"#e91e8c":"#0288d1" }}>
            {xTurn ? "⚡ Your Turn (X)" : "🤖 Bot is thinking... (O)"}
          </span>
        )}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, margin:"1rem 0" }}>
        {board.map((val,i)=>{
          const isWinCell = result?.line?.includes(i);
          return (
            <div key={i} onClick={()=>click(i)} style={{
              height:80, borderRadius:16,
              background: isWinCell ? "linear-gradient(135deg,#81c784,#4caf50)" : cellColors[val],
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:36, fontWeight:900, cursor: val||result||!xTurn?"default":"pointer",
              color: val==="X"?"white" : val==="O"?"white" : "transparent",
              border: isWinCell?"3px solid #4caf50":"2px solid transparent",
              transition:"all 0.2s ease",
              transform: isWinCell?"scale(1.08)":"scale(1)",
              userSelect:"none",
              boxShadow: val ? "0 4px 12px rgba(0,0,0,0.1)" : "none",
            }}>
              {val || "·"}
            </div>
          );
        })}
      </div>

      <button onClick={reset} style={{
        width:"100%", marginTop:4,
        background:"linear-gradient(135deg,#fce4ef,#e3f0ff)",
        border:"2px solid #e3f0ff", borderRadius:14,
        padding:"10px", fontFamily:"'Nunito',sans-serif",
        fontWeight:800, fontSize:13, color:"#1a237e", cursor:"pointer",
        transition:"background 0.2s",
      }}>🔄 Reset Board</button>
    </div>
  );
}

// Helper to draw a star on canvas
function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
  let rot = Math.PI / 2 * 3;
  let x = cx;
  let y = cy;
  let step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }
  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();
  ctx.fill();
}

// ── GAME 6: Star Chaser (Canvas) ──────────────────────────────────
function StarChaser() {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [highScore, setHighScore] = useState(() => Number(localStorage.getItem("broomBest") || 0));
  
  const canvasRef = useRef(null);
  const stateRef = useRef({
    x: 135,
    obstacles: [],
    snitches: [],
    keys: {},
    score: 0,
    lastSpawn: 0,
    lastSnitchSpawn: 0,
    speed: 3,
    frameCount: 0
  });

  const reset = () => {
    stateRef.current = {
      x: 135,
      obstacles: [],
      snitches: [],
      keys: {},
      score: 0,
      lastSpawn: 0,
      lastSnitchSpawn: 0,
      speed: 3,
      frameCount: 0
    };
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (["ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
      }
      stateRef.current.keys[e.key] = true;
    };
    const handleKeyUp = (e) => {
      stateRef.current.keys[e.key] = false;
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (!isPlaying || gameOver) return;
    
    let animId;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    
    const update = () => {
      const state = stateRef.current;
      
      if (state.keys["ArrowLeft"] && state.x > 10) state.x -= 5;
      if (state.keys["ArrowRight"] && state.x < 260) state.x += 5;
      
      state.obstacles.forEach(o => o.y += state.speed);
      state.snitches.forEach(s => s.y += state.speed - 1);
      
      const playerBox = { x: state.x, y: 340, w: 30, h: 45 };
      
      for (const o of state.obstacles) {
        if (
          playerBox.x < o.x + 24 &&
          playerBox.x + playerBox.w > o.x &&
          playerBox.y < o.y + 24 &&
          playerBox.y + playerBox.h > o.y
        ) {
          setGameOver(true);
          setIsPlaying(false);
          if (state.score > highScore) {
            setHighScore(state.score);
            localStorage.setItem("broomBest", state.score);
          }
          return;
        }
      }
      
      const remainingSnitches = [];
      for (const s of state.snitches) {
        if (
          playerBox.x < s.x + 20 &&
          playerBox.x + playerBox.w > s.x &&
          playerBox.y < s.y + 20 &&
          playerBox.y + playerBox.h > s.y
        ) {
          state.score += 10;
          setScore(state.score);
          if (state.score > 0 && state.score % 50 === 0) state.speed += 0.5;
        } else if (s.y < 400) {
          remainingSnitches.push(s);
        }
      }
      state.snitches = remainingSnitches;
      state.obstacles = state.obstacles.filter(o => o.y < 400);
      
      // Survival score: +1 point every 60 frames (~1 second)
      state.frameCount = (state.frameCount || 0) + 1;
      if (state.frameCount % 60 === 0) {
        state.score += 1;
        setScore(state.score);
      }
      
      const now = Date.now();
      if (now - state.lastSpawn > 1200) {
        state.obstacles.push({ x: Math.random() * 250 + 10, y: -30 });
        state.lastSpawn = now;
      }
      
      if (now - state.lastSnitchSpawn > 2000) {
        state.snitches.push({ x: Math.random() * 250 + 10, y: -30 });
        state.lastSnitchSpawn = now;
      }
      
      ctx.clearRect(0, 0, 300, 400);
      
      // Draw background sky gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, 400);
      skyGrad.addColorStop(0, "#1a237e");
      skyGrad.addColorStop(1, "#311b92");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, 300, 400);
      
      // Soft glowing border
      ctx.strokeStyle = "rgba(233, 30, 140, 0.35)";
      ctx.lineWidth = 4;
      ctx.strokeRect(4, 4, 292, 392);
      
      // Draw collectable dream gems
      state.snitches.forEach(s => {
        ctx.fillStyle = "#ec407a";
        ctx.shadowColor = "#ff85a7";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.moveTo(s.x + 10, s.y + 2);
        ctx.lineTo(s.x + 17, s.y + 10);
        ctx.lineTo(s.x + 10, s.y + 18);
        ctx.lineTo(s.x + 3, s.y + 10);
        ctx.closePath();
        ctx.fill();
        
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.moveTo(s.x + 10, s.y + 4);
        ctx.lineTo(s.x + 13, s.y + 10);
        ctx.lineTo(s.x + 10, s.y + 12);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      
      // Draw obstacles (cute storm clouds)
      state.obstacles.forEach(o => {
        ctx.fillStyle = "#cfd8dc";
        ctx.beginPath();
        ctx.arc(o.x + 6, o.y + 12, 6, 0, Math.PI * 2);
        ctx.arc(o.x + 12, o.y + 8, 8, 0, Math.PI * 2);
        ctx.arc(o.x + 18, o.y + 12, 6, 0, Math.PI * 2);
        ctx.rect(o.x + 6, o.y + 9, 12, 6);
        ctx.closePath();
        ctx.fill();
        
        // Draw tiny lightning bolt
        ctx.fillStyle = "#ffd54f";
        ctx.beginPath();
        ctx.moveTo(o.x + 12, o.y + 13);
        ctx.lineTo(o.x + 9, o.y + 18);
        ctx.lineTo(o.x + 12, o.y + 18);
        ctx.lineTo(o.x + 11, o.y + 22);
        ctx.lineTo(o.x + 15, o.y + 16);
        ctx.lineTo(o.x + 12, o.y + 16);
        ctx.closePath();
        ctx.fill();
      });
      
      // Draw Star Player
      const cx = state.x + 15;
      const cy = 340 + 20;
      
      // Spark trail
      ctx.fillStyle = "rgba(255, 224, 130, 0.25)";
      ctx.beginPath();
      ctx.moveTo(cx - 6, cy + 5);
      ctx.lineTo(cx + 6, cy + 5);
      ctx.lineTo(cx + 10, cy + 25);
      ctx.lineTo(cx - 10, cy + 25);
      ctx.closePath();
      ctx.fill();
      
      ctx.fillStyle = "#ffd54f";
      ctx.shadowColor = "#ffeb3b";
      ctx.shadowBlur = 12;
      drawStar(ctx, cx, cy, 5, 14, 7);
      ctx.shadowBlur = 0;
      
      // Eyes
      ctx.fillStyle = "#1a237e";
      ctx.beginPath();
      ctx.arc(cx - 3, cy - 1, 1.8, 0, Math.PI * 2);
      ctx.arc(cx + 3, cy - 1, 1.8, 0, Math.PI * 2);
      ctx.fill();
      
      // Smile
      ctx.strokeStyle = "#1a237e";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy + 2, 1.8, 0, Math.PI);
      ctx.stroke();
      
      // Draw score in top left of canvas
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      ctx.font = "bold 13px 'Nunito', sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(`✨ Score: ${state.score}`, 14, 26);

      // Draw high score in top right of canvas
      ctx.textAlign = "right";
      ctx.fillText(`🏆 Best: ${highScore}`, 286, 26);
      
      animId = requestAnimationFrame(update);
    };
    
    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, gameOver, highScore]);

  return (
    <div style={{ background: "white", borderRadius: 24, padding: "1.5rem", border: "2px solid #b2ebf2", textAlign: "center", color: "var(--navy)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <span style={{ fontSize: 11, fontWeight: 800, color: "var(--blue)" }}>✨ Star Chaser</span>
        <span style={{ fontSize: 11, fontWeight: 900, color: "var(--blue)" }}>✨ Score: {score} | 🏆 Best: {highScore}</span>
      </div>
      
      <div style={{ position: "relative", width: 300, height: 400, margin: "0 auto", borderRadius: 16, overflow: "hidden", boxShadow: "0 8px 24px rgba(26,35,126,0.15)" }}>
        <canvas ref={canvasRef} width={300} height={400} style={{ display: "block" }} />
        
        {(!isPlaying || gameOver) && (
          <div style={{
            position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
            background: "rgba(26, 35, 126, 0.88)", display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", padding: 20
          }}>
            {gameOver ? (
              <>
                <div style={{ fontSize: 48, animation: "float 3s infinite" }}>💥</div>
                <h3 style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900, fontSize: 20, color: "#fff59d", margin: "8px 0" }}>Crash! Cloud Storm!</h3>
                <p style={{ fontSize: 28, fontWeight: 900, color: "white", marginBottom: 16 }}>Score: {score}</p>
              </>
            ) : (
              <>
                <div style={{ fontSize: 52, animation: "float 3s infinite" }}>🌠</div>
                <h3 style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900, fontSize: 20, color: "#fff59d", margin: "8px 0" }}>Magical Star Chaser</h3>
                <p style={{ fontSize: 13, color: "#e3f0ff", marginBottom: 16 }}>Steer your shooting star! Catch dream gems and dodge dark storm clouds!</p>
              </>
            )}
            <button className="btn-primary" onClick={reset}>
              {gameOver ? "Fly Again ✨" : "Start Flight 🚀"}
            </button>
          </div>
        )}
      </div>
      
      {isPlaying && (
        <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 14 }}>
          <button
            onMouseDown={() => { stateRef.current.keys["ArrowLeft"] = true; }}
            onMouseUp={() => { stateRef.current.keys["ArrowLeft"] = false; }}
            onTouchStart={() => { stateRef.current.keys["ArrowLeft"] = true; }}
            onTouchEnd={() => { stateRef.current.keys["ArrowLeft"] = false; }}
            style={{
              width: 60, height: 45, borderRadius: 12, background: "#e3f0ff",
              border: "2px solid #b2ebf2", color: "var(--blue)", fontSize: 18, fontWeight: 900, cursor: "pointer",
              transition: "transform 0.1s"
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
          >◀</button>
          <button
            onMouseDown={() => { stateRef.current.keys["ArrowRight"] = true; }}
            onMouseUp={() => { stateRef.current.keys["ArrowRight"] = false; }}
            onTouchStart={() => { stateRef.current.keys["ArrowRight"] = true; }}
            onTouchEnd={() => { stateRef.current.keys["ArrowRight"] = false; }}
            style={{
              width: 60, height: 45, borderRadius: 12, background: "#e3f0ff",
              border: "2px solid #b2ebf2", color: "var(--blue)", fontSize: 18, fontWeight: 900, cursor: "pointer",
              transition: "transform 0.1s"
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
          >▶</button>
        </div>
      )}
      <p style={{ fontSize: 11, color: "var(--blue-mid)", marginTop: 8 }}>Use Arrow keys Left / Right or buttons to control your star.</p>
    </div>
  );
}

// ── MAIN Games Page ───────────────────────────────────────────────
const GAMES = [
  { id:"math",   label:"Math Blitz",    emoji:"🧮", desc:"Solve fast! Beat the clock",  color:"#e3f0ff", border:"#bbdefb" },
  { id:"word",   label:"Word Scramble", emoji:"🔤", desc:"Unscramble science & tech words", color:"#fce4ef", border:"#f8bbd0" },
  { id:"memory", label:"Memory Match",  emoji:"🧠", desc:"Find the matching pairs",      color:"#e8f5e9", border:"#c8e6c9" },
  { id:"code",   label:"Code Fill-in",  emoji:"💻", desc:"Complete the code snippet",    color:"#ede7f6", border:"#d1c4e9" },
  { id:"ttt",    label:"Tic Tac Toe",   emoji:"⭕", desc:"Play against the Dreamy Bot",  color:"#fff3e0", border:"#ffe0b2" },
  { id:"broom",  label:"Star Chaser",   emoji:"🌠", desc:"Fly your star & catch gems",    color:"#e0f7fa", border:"#b2ebf2" }
];

export default function Games(){
  const [active,setActive] = useState(null);

  return (
    <div className="page-wrap" style={{ paddingBottom:90 }}>
      <Navbar />

      {/* Header */}
      <div style={{
        background:"linear-gradient(135deg, var(--pink-light) 0%, var(--blue-light) 100%)",
        padding:"1.75rem 1.25rem 1.5rem",
        borderBottom: "2px solid var(--pink-light)",
        textAlign: "center"
      }}>
        <h1 style={{ fontFamily:"'Nunito', sans-serif", fontWeight:900, fontSize:"clamp(24px,5vw,34px)", color:"var(--navy)", marginBottom:4 }}>
          🎮 Magical Mind Games
        </h1>
        <p style={{ fontSize:13, color:"var(--blue-mid)", fontWeight:700 }}>
          Play, learn and power up your brain! 🌟
        </p>
      </div>

      <div style={{ padding:"1.25rem", maxWidth:600, margin:"0 auto" }}>

        {/* Game selector */}
        {!active && (
          <>
            <p style={{ fontSize:12, fontWeight:800, color:"var(--pink)", marginBottom:12 }}>
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
                  <div style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:15, color:"var(--navy)", marginBottom:4 }}>{g.label}</div>
                  <div style={{ fontSize:12, fontWeight:700, color:"var(--blue-mid)" }}>{g.desc}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Active game */}
        {active && (
          <div className="animate-fadeUp">
            <button onClick={()=>setActive(null)} style={{
              background:"white", border:"2px solid var(--pink-light)", borderRadius:14,
              padding:"8px 16px", fontFamily:"'Nunito',sans-serif",
              fontWeight:800, fontSize:13, color:"var(--pink)", cursor:"pointer",
              marginBottom:14, display:"flex", alignItems:"center", gap:6,
              transition:"background 0.2s"
            }}
            onMouseEnter={e=>e.currentTarget.style.background="var(--pink-light)"}
            onMouseLeave={e=>e.currentTarget.style.background="white"}
            >← Back to Games</button>

            <h2 style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:18, color:"var(--navy)", marginBottom:14 }}>
              {GAMES.find(g=>g.id===active)?.emoji} {GAMES.find(g=>g.id===active)?.label}
            </h2>

            {active==="math"   && <MathPuzzle />}
            {active==="word"   && <WordScramble />}
            {active==="memory" && <MemoryMatch />}
            {active==="code"   && <CodeFill />}
            {active==="ttt"    && <TicTacToe />}
            {active==="broom"  && <StarChaser />}
          </div>
        )}
      </div>
    </div>
  );
}