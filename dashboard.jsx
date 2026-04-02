import { useState, useMemo, useEffect } from "react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
 
const CAT_COLORS = {
  "Food & Dining": "#f97316","Shopping": "#a855f7","Transport": "#3b82f6",
  "Entertainment": "#ec4899","Utilities": "#06b6d4","Healthcare": "#10b981",
  "Travel": "#f59e0b","Salary": "#4ade80","Freelance": "#00c9a7","Investment": "#fbbf24",
};
const CATEGORIES = Object.keys(CAT_COLORS);
 
const SEED = [
  {id:1,date:"2025-01-05",desc:"Monthly Salary",category:"Salary",amount:85000,type:"income"},
  {id:2,date:"2025-01-08",desc:"Grocery Store",category:"Food & Dining",amount:3200,type:"expense"},
  {id:3,date:"2025-01-10",desc:"Netflix Subscription",category:"Entertainment",amount:649,type:"expense"},
  {id:4,date:"2025-01-12",desc:"Ola Cab",category:"Transport",amount:350,type:"expense"},
  {id:5,date:"2025-01-15",desc:"Electricity Bill",category:"Utilities",amount:1800,type:"expense"},
  {id:6,date:"2025-01-18",desc:"Freelance Project",category:"Freelance",amount:15000,type:"income"},
  {id:7,date:"2025-01-20",desc:"Restaurant Dinner",category:"Food & Dining",amount:2100,type:"expense"},
  {id:8,date:"2025-01-25",desc:"Amazon Shopping",category:"Shopping",amount:4500,type:"expense"},
  {id:9,date:"2025-02-05",desc:"Monthly Salary",category:"Salary",amount:85000,type:"income"},
  {id:10,date:"2025-02-07",desc:"Pharmacy",category:"Healthcare",amount:850,type:"expense"},
  {id:11,date:"2025-02-10",desc:"Swiggy Order",category:"Food & Dining",amount:560,type:"expense"},
  {id:12,date:"2025-02-14",desc:"Valentine Dinner",category:"Food & Dining",amount:3500,type:"expense"},
  {id:13,date:"2025-02-15",desc:"Metro Card",category:"Transport",amount:500,type:"expense"},
  {id:14,date:"2025-02-18",desc:"Freelance Project",category:"Freelance",amount:20000,type:"income"},
  {id:15,date:"2025-02-22",desc:"Myntra Shopping",category:"Shopping",amount:3200,type:"expense"},
  {id:16,date:"2025-02-26",desc:"Dividend Credit",category:"Investment",amount:5000,type:"income"},
  {id:17,date:"2025-03-05",desc:"Monthly Salary",category:"Salary",amount:85000,type:"income"},
  {id:18,date:"2025-03-08",desc:"Grocery Store",category:"Food & Dining",amount:2800,type:"expense"},
  {id:19,date:"2025-03-10",desc:"Goa Trip Hotel",category:"Travel",amount:12000,type:"expense"},
  {id:20,date:"2025-03-12",desc:"Flight Tickets",category:"Travel",amount:8500,type:"expense"},
  {id:21,date:"2025-03-15",desc:"Internet Bill",category:"Utilities",amount:999,type:"expense"},
  {id:22,date:"2025-03-18",desc:"Doctor Visit",category:"Healthcare",amount:1200,type:"expense"},
  {id:23,date:"2025-03-22",desc:"Concert Tickets",category:"Entertainment",amount:2500,type:"expense"},
  {id:24,date:"2025-03-25",desc:"Freelance Design",category:"Freelance",amount:12000,type:"income"},
  {id:25,date:"2025-03-28",desc:"Zomato Order",category:"Food & Dining",amount:420,type:"expense"},
  {id:26,date:"2025-04-05",desc:"Monthly Salary",category:"Salary",amount:88000,type:"income"},
  {id:27,date:"2025-04-08",desc:"Gym Membership",category:"Healthcare",amount:2000,type:"expense"},
  {id:28,date:"2025-04-12",desc:"Grocery Store",category:"Food & Dining",amount:3100,type:"expense"},
  {id:29,date:"2025-04-15",desc:"Spotify Premium",category:"Entertainment",amount:119,type:"expense"},
  {id:30,date:"2025-04-18",desc:"Stock Investment",category:"Investment",amount:10000,type:"expense"},
  {id:31,date:"2025-04-22",desc:"Rapido Bike",category:"Transport",amount:180,type:"expense"},
  {id:32,date:"2025-04-28",desc:"Dividend Credit",category:"Investment",amount:7000,type:"income"},
];
 
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg0:#080a0f;--bg1:#0d1018;--bg2:#131720;--bg3:#1a1f2e;
  --bd:rgba(255,255,255,0.06);--bd2:rgba(255,255,255,0.1);
  --t1:#e6eaf5;--t2:#7a8299;--t3:#3d4260;
  --ac:#00c9a7;--acg:rgba(0,201,167,0.12);
  --inc:#4ade80;--exp:#f87171;--amb:#fbbf24;
  --fs:14px;--r:12px;--r2:8px;
}
.light{
  --bg0:#eef0f5;--bg1:#f5f6fa;--bg2:#ffffff;--bg3:#f0f1f7;
  --bd:rgba(0,0,0,0.07);--bd2:rgba(0,0,0,0.13);
  --t1:#0a0c14;--t2:#5a6280;--t3:#aab0c8;
  --ac:#00a88a;--acg:rgba(0,168,138,0.1);
  --inc:#16a34a;--exp:#dc2626;--amb:#d97706;
}
body,html{height:100%}
#root{height:100%}
.app{display:flex;height:100vh;background:var(--bg0);color:var(--t1);font-family:'DM Sans',sans-serif;font-size:var(--fs);overflow:hidden;transition:background .3s,color .3s}
.serif{font-family:'DM Serif Display',serif}
.mono{font-family:'DM Mono',monospace}
 
/* SIDEBAR */
.sb{width:220px;min-width:220px;background:var(--bg1);border-right:1px solid var(--bd);display:flex;flex-direction:column;padding:0}
.sb-logo{padding:22px 20px 18px;border-bottom:1px solid var(--bd)}
.sb-logo h1{font-size:22px;letter-spacing:-0.5px}
.sb-logo span{color:var(--ac)}
.sb-logo p{font-size:10px;color:var(--t3);margin-top:2px;font-family:'DM Mono',monospace;letter-spacing:1px;text-transform:uppercase}
nav{flex:1;padding:12px 10px}
.ni{display:flex;align-items:center;gap:9px;padding:9px 12px;border-radius:var(--r2);cursor:pointer;color:var(--t2);font-size:13px;font-weight:500;margin-bottom:2px;transition:all .18s;border:1px solid transparent}
.ni svg{width:15px;height:15px;flex-shrink:0}
.ni:hover{background:var(--bg3);color:var(--t1)}
.ni.act{background:var(--acg);color:var(--ac);border-color:rgba(0,201,167,0.18)}
.sb-foot{padding:14px 16px;border-top:1px solid var(--bd);display:flex;align-items:center;gap:10px}
.av{width:32px;height:32px;border-radius:50%;background:var(--ac);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#000;flex-shrink:0}
 
/* MAIN */
.main{flex:1;overflow:hidden;display:flex;flex-direction:column}
.topbar{background:var(--bg1);border-bottom:1px solid var(--bd);padding:14px 28px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0}
.topbar h2{font-family:'DM Serif Display',serif;font-size:20px;letter-spacing:-0.3px}
.topbar p{font-size:11px;color:var(--t3);margin-top:1px}
.tb-right{display:flex;align-items:center;gap:10px}
.content{flex:1;overflow-y:auto;padding:24px 28px}
 
/* CARDS */
.card{background:var(--bg2);border:1px solid var(--bd);border-radius:var(--r);padding:20px;transition:border-color .2s}
.card:hover{border-color:var(--bd2)}
.sc{position:relative;overflow:hidden;cursor:default;transition:transform .2s,box-shadow .2s}
.sc::before{content:'';position:absolute;width:100px;height:100px;border-radius:50%;top:-20px;right:-20px;opacity:.07}
.sc:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(0,0,0,.25)}
.sc.bal::before{background:var(--ac)}
.sc.inc::before{background:var(--inc)}
.sc.exp::before{background:var(--exp)}
.sc.sav::before{background:var(--amb)}
.sc-lbl{font-size:10px;color:var(--t2);font-weight:600;letter-spacing:.7px;text-transform:uppercase;margin-bottom:10px;display:flex;justify-content:space-between;align-items:center}
.sc-icon{width:28px;height:28px;border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:13px}
.sc-val{font-family:'DM Mono',monospace;font-size:22px;font-weight:500;letter-spacing:-1px;margin-bottom:8px}
.badge{display:inline-flex;align-items:center;gap:3px;padding:3px 7px;border-radius:20px;font-size:10px;font-weight:600;font-family:'DM Mono',monospace}
.bp{background:rgba(74,222,128,.1);color:var(--inc)}
.bn{background:rgba(248,113,113,.1);color:var(--exp)}
 
/* GRID */
.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:20px}
.g21{display:grid;grid-template-columns:2fr 1fr;gap:14px;margin-bottom:14px}
.g3{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:20px}
.g12{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px}
 
/* TX */
.tx-hdr{display:grid;grid-template-columns:90px 1fr 140px 110px 80px;padding:10px 16px;background:var(--bg3);border-radius:var(--r) var(--r) 0 0;border:1px solid var(--bd);border-bottom:none;font-size:10px;color:var(--t3);font-weight:600;letter-spacing:.7px;text-transform:uppercase}
.tx-list{background:var(--bg2);border:1px solid var(--bd);border-radius:0 0 var(--r) var(--r);overflow:hidden}
.tx-row{display:grid;grid-template-columns:90px 1fr 140px 110px 80px;padding:13px 16px;border-bottom:1px solid var(--bd);transition:background .13s;align-items:center}
.tx-row:last-child{border-bottom:none}
.tx-row:hover{background:var(--bg3)}
 
/* BTNS */
btn,.btn{padding:7px 14px;border-radius:var(--r2);border:none;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;transition:all .18s}
.btn-p{background:var(--ac);color:#000}.btn-p:hover{opacity:.88;transform:translateY(-1px)}
.btn-g{background:var(--bg3);color:var(--t2);border:1px solid var(--bd)}.btn-g:hover{color:var(--t1);border-color:var(--ac)}
.btn-d{background:rgba(248,113,113,.08);color:var(--exp);border:1px solid rgba(248,113,113,.18)}.btn-d:hover{background:rgba(248,113,113,.15)}
.btn-sm{padding:4px 9px;font-size:11px}
 
/* FILTER ROW */
.filters{display:flex;gap:10px;flex-wrap:wrap;align-items:center;padding:14px 18px;background:var(--bg2);border:1px solid var(--bd);border-radius:var(--r);margin-bottom:12px}
input,select{background:var(--bg3);border:1px solid var(--bd);border-radius:var(--r2);padding:7px 11px;color:var(--t1);font-size:12px;font-family:'DM Sans',sans-serif;outline:none;transition:border-color .18s}
input::placeholder{color:var(--t3)}
input:focus,select:focus{border-color:var(--ac)}
select option{background:var(--bg2)}
 
/* MODAL */
.overlay{position:fixed;inset:0;background:rgba(0,0,0,.65);backdrop-filter:blur(6px);z-index:200;display:flex;align-items:center;justify-content:center;animation:fi .2s ease}
.modal{background:var(--bg2);border:1px solid var(--bd2);border-radius:16px;padding:28px;width:460px;max-width:92vw;animation:su .25s ease}
@keyframes fi{from{opacity:0}to{opacity:1}}
@keyframes su{from{transform:translateY(16px);opacity:0}to{transform:translateY(0);opacity:1}}
.form-lbl{font-size:10px;color:var(--t3);font-weight:600;letter-spacing:.6px;text-transform:uppercase;margin-bottom:5px;display:block}
 
/* INSIGHTS */
.ic{display:flex;gap:14px;align-items:flex-start;padding:14px 16px;background:var(--bg2);border:1px solid var(--bd);border-radius:var(--r);transition:transform .2s,border-color .2s}
.ic:hover{transform:translateY(-1px);border-color:var(--bd2)}
.ic-icon{width:36px;height:36px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0}
 
/* PROGRESS */
.pb{height:5px;background:var(--bg3);border-radius:99px;overflow:hidden}
.pf{height:100%;border-radius:99px;transition:width .9s cubic-bezier(.4,0,.2,1)}
 
/* SCROLL */
::-webkit-scrollbar{width:5px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:var(--bd2);border-radius:99px}
 
/* ROLE CHIP */
.role-admin{background:rgba(251,191,36,.1);color:var(--amb);border:1px solid rgba(251,191,36,.2);padding:4px 10px;border-radius:20px;font-size:11px;font-weight:600}
.role-viewer{background:var(--acg);color:var(--ac);border:1px solid rgba(0,201,167,.2);padding:4px 10px;border-radius:20px;font-size:11px;font-weight:600}
 
/* CHART TOOLTIP */
.ctt{background:var(--bg2)!important;border:1px solid var(--bd2)!important;border-radius:10px!important;padding:10px 14px!important;box-shadow:0 8px 24px rgba(0,0,0,.3)!important}
 
@media(max-width:900px){
  .g4{grid-template-columns:repeat(2,1fr)}
  .g21{grid-template-columns:1fr}
  .g3{grid-template-columns:1fr}
  .g12{grid-template-columns:1fr}
  .sb{display:none}
  .tx-hdr,.tx-row{grid-template-columns:70px 1fr 90px 80px 60px;font-size:11px}
}
`;
 
const fmt = (n) => `₹${Math.round(n).toLocaleString("en-IN")}`;
 
const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "var(--bg2)", border: "1px solid var(--bd2)", borderRadius: 10, padding: "10px 14px" }}>
      <p style={{ color: "var(--t2)", fontSize: 11, marginBottom: 7, fontFamily: "DM Mono" }}>{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color, fontFamily: "DM Mono", fontSize: 12, marginBottom: 2 }}>
          {p.name}: {fmt(p.value)}
        </p>
      ))}
    </div>
  );
};
 
const Icon = ({ d, size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const NAV = [
  { id: "dashboard", label: "Overview", d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { id: "transactions", label: "Transactions", d: "M4 6h16M4 10h16M4 14h16M4 18h16" },
  { id: "insights", label: "Insights", d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
];

const TITLES = { dashboard: "Financial Overview", transactions: "Transactions", insights: "Insights" };
 
export default function App() {
  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = CSS;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);
 
  const [dark, setDark] = useState(true);
  const [role, setRole] = useState("viewer");
  const [tab, setTab] = useState("dashboard");
  const [txs, setTxs] = useState(() => {
    const saved = localStorage.getItem("finArcTx");
    return saved ? JSON.parse(saved) : SEED;
  });

  useEffect(() => {
    localStorage.setItem("finArcTx", JSON.stringify(txs));
  }, [txs]);

  const [search, setSearch] = useState("");
  const [fType, setFType] = useState("all");
  const [fCat, setFCat] = useState("all");
  const [fMonth, setFMonth] = useState("all");
  const [sort, setSort] = useState("date-desc");
  const [modal, setModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ date: "", desc: "", category: "Food & Dining", amount: "", type: "expense" });
 
  const totalIncome = useMemo(() => txs.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0), [txs]);
  const totalExp = useMemo(() => txs.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0), [txs]);
  const balance = totalIncome - totalExp;
  const savRate = totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(1) : "0.0";
 
  const monthlyData = useMemo(() => {
    const map = { "01": { m: "Jan", inc: 0, exp: 0 }, "02": { m: "Feb", inc: 0, exp: 0 }, "03": { m: "Mar", inc: 0, exp: 0 }, "04": { m: "Apr", inc: 0, exp: 0 } };
    txs.forEach(t => {
      const k = t.date.split("-")[1];
      if (map[k]) { if (t.type === "income") map[k].inc += t.amount; else map[k].exp += t.amount; }
    });
    return Object.values(map).map(d => ({ month: d.m, Income: d.inc, Expenses: d.exp, Balance: d.inc - d.exp }));
  }, [txs]);
 
  const catData = useMemo(() => {
    const m = {};
    txs.filter(t => t.type === "expense").forEach(t => { m[t.category] = (m[t.category] || 0) + t.amount; });
    return Object.entries(m).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
  }, [txs]);
 
  const filtered = useMemo(() => {
    let r = [...txs];
    if (search) r = r.filter(t => t.desc.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase()));
    if (fType !== "all") r = r.filter(t => t.type === fType);
    if (fCat !== "all") r = r.filter(t => t.category === fCat);
    if (fMonth !== "all") r = r.filter(t => t.date.split("-")[1] === fMonth);
    r.sort((a, b) => {
      if (sort === "date-desc") return b.date.localeCompare(a.date);
      if (sort === "date-asc") return a.date.localeCompare(b.date);
      if (sort === "amt-desc") return b.amount - a.amount;
      if (sort === "amt-asc") return a.amount - b.amount;
      return 0;
    });
    return r;
  }, [txs, search, fType, fCat, fMonth, sort]);
 
  const openModal = (tx = null) => {
    setEditId(tx?.id || null);
    setForm(tx ? { date: tx.date, desc: tx.desc, category: tx.category, amount: tx.amount, type: tx.type } : { date: "", desc: "", category: "Food & Dining", amount: "", type: "expense" });
    setModal(true);
  };
 
  const save = () => {
    if (!form.date || !form.desc || !form.amount) {
      alert("Please fill all fields");
      return;
    }
    if (parseFloat(form.amount) <= 0) {
      alert("Amount must be greater than 0");
      return;
    }
    if (!CAT_COLORS[form.category]) {
      alert("Invalid category");
      return;
    }

    const entry = { ...form, amount: Number(form.amount) };
    if (editId) {
      setTxs(p => p.map(t => t.id === editId ? { ...t, ...entry } : t));
    } else {
      setTxs(p => [...p, { ...entry, id: Date.now() }]);
    }
    setModal(false);
    setForm({ date: "", desc: "", category: "Food & Dining", amount: "", type: "expense" });
  };
 
  return (
    <div className={`app ${dark ? "" : "light"}`}>
      {/* SIDEBAR */}
      <div className="sb">
        <div className="sb-logo">
          <h1 className="serif">Fin<span>arc</span></h1>
          <p>Personal Finance</p>
        </div>
        <nav>
          {NAV.map(n => (
            <div key={n.id} className={`ni${tab === n.id ? " act" : ""}`} onClick={() => setTab(n.id)}>
              <Icon d={n.d} />{n.label}
            </div>
          ))}
        </nav>
        <div className="sb-foot">
          <div className="av">{role === "admin" ? "A" : "V"}</div>
          <div>
            <p style={{ fontSize: 12, fontWeight: 600 }}>{role === "admin" ? "Admin User" : "Viewer User"}</p>
            <p style={{ fontSize: 10, color: "var(--t3)" }}>{role === "admin" ? "Full Access" : "Read Only"}</p>
          </div>
        </div>
      </div>
 
      {/* MAIN */}
      <div className="main">
        {/* TOPBAR */}
        <div className="topbar">
          <div>
            <h2>{TITLES[tab]}</h2>
            <p>{new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
          </div>
          <div className="tb-right">
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--bg3)", padding: "5px 10px", borderRadius: 8, border: "1px solid var(--bd)" }}>
              <span style={{ fontSize: 11, color: "var(--t2)" }}>Role</span>
              <select value={role} onChange={e => setRole(e.target.value)} style={{ background: "transparent", border: "none", fontSize: 12, fontWeight: 600, color: role === "admin" ? "var(--amb)" : "var(--ac)", padding: 0, cursor: "pointer" }}>
                <option value="viewer">Viewer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button className="btn btn-g" onClick={() => setDark(!dark)} style={{ padding: "7px 10px", fontSize: 14 }}>
              {dark ? "☀" : "☾"}
            </button>
            {role === "admin" && (
              <button className="btn btn-p" onClick={() => openModal()}>+ Add Transaction</button>
            )}
          </div>
        </div>
 
        {/* CONTENT */}
        <div className="content">
 
          {/* ── DASHBOARD ── */}
          {tab === "dashboard" && (
            <>
              {/* Summary Cards */}
              <div className="g4">
                {[
                  { lbl: "Total Balance", val: fmt(balance), cls: "bal", color: "var(--ac)", badge: "+12.4%", pos: true },
                  { lbl: "Total Income", val: fmt(totalIncome), cls: "inc", color: "var(--inc)", badge: "+8.2%", pos: true },
                  { lbl: "Total Expenses", val: fmt(totalExp), cls: "exp", color: "var(--exp)", badge: "+5.1%", pos: false },
                  { lbl: "Savings Rate", val: `${savRate}%`, cls: "sav", color: "var(--amb)", badge: "Apr 2025", pos: true },
                ].map(c => (
                  <div key={c.lbl} className={`card sc ${c.cls}`}>
                    <div className="sc-lbl">{c.lbl}
                      <div className="sc-icon" style={{ background: c.color + "1a", color: c.color }}>●</div>
                    </div>
                    <div className="sc-val">{c.val}</div>
                    <span className={`badge ${c.pos ? "bp" : "bn"}`}>{c.pos ? "▲" : "▼"} {c.badge}</span>
                  </div>
                ))}
              </div>
 
              {/* Area + Pie */}
              <div className="g21">
                <div className="card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: 13 }}>Balance Trend</p>
                      <p style={{ fontSize: 11, color: "var(--t3)", marginTop: 2 }}>Monthly income vs expenses</p>
                    </div>
                    <div style={{ display: "flex", gap: 14 }}>
                      {[["Income", "#4ade80"], ["Expenses", "#f87171"], ["Balance", "var(--ac)"]].map(([l, c]) => (
                        <span key={l} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--t2)" }}>
                          <span style={{ width: 8, height: 8, borderRadius: "50%", background: c, display: "inline-block" }} />{l}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={monthlyData}>
                      <defs>
                        {[["iG", "#4ade80"], ["eG", "#f87171"], ["bG", "#00c9a7"]].map(([id, c]) => (
                          <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={c} stopOpacity={0.18} />
                            <stop offset="95%" stopColor={c} stopOpacity={0} />
                          </linearGradient>
                        ))}
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                      <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--t2)" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 10, fill: "var(--t2)", fontFamily: "DM Mono" }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} width={48} />
                      <Tooltip content={<ChartTooltip />} />
                      <Area type="monotone" dataKey="Income" stroke="#4ade80" strokeWidth={2} fill="url(#iG)" />
                      <Area type="monotone" dataKey="Expenses" stroke="#f87171" strokeWidth={2} fill="url(#eG)" />
                      <Area type="monotone" dataKey="Balance" stroke="#00c9a7" strokeWidth={2} fill="url(#bG)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
 
                <div className="card">
                  <p style={{ fontWeight: 600, fontSize: 13, marginBottom: 2 }}>Spending Breakdown</p>
                  <p style={{ fontSize: 11, color: "var(--t3)", marginBottom: 14 }}>By category</p>
                  {catData.length === 0 ? (
                    <p style={{ textAlign: "center", color: "var(--t3)", padding: "20px" }}>No expense data available</p>
                  ) : (
                    <ResponsiveContainer width="100%" height={140}>
                      <PieChart>
                        <Pie data={catData} cx="50%" cy="50%" innerRadius={44} outerRadius={68} dataKey="value" strokeWidth={0}>
                          {catData.map(e => <Cell key={e.name} fill={CAT_COLORS[e.name] || "#888"} />)}
                        </Pie>
                        <Tooltip formatter={v => fmt(v)} contentStyle={{ background: "var(--bg2)", border: "1px solid var(--bd2)", borderRadius: 8, fontSize: 12 }} />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                  <div style={{ display: "flex", flexDirection: "column", gap: 7, marginTop: 8 }}>
                    {catData.slice(0, 5).map(c => (
                      <div key={c.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 11, color: "var(--t2)" }}>
                          <span style={{ width: 7, height: 7, borderRadius: "50%", background: CAT_COLORS[c.name], flexShrink: 0 }} />
                          {c.name}
                        </span>
                        <span className="mono" style={{ fontSize: 11 }}>{fmt(c.value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
 
              {/* Bar Chart */}
              <div className="card">
                <p style={{ fontWeight: 600, fontSize: 13, marginBottom: 2 }}>Monthly Comparison</p>
                <p style={{ fontSize: 11, color: "var(--t3)", marginBottom: 18 }}>Income vs Expenses — Jan to Apr 2025</p>
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart data={monthlyData} barGap={6}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--t2)" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: "var(--t2)", fontFamily: "DM Mono" }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} width={48} />
                    <Tooltip content={<ChartTooltip />} />
                    <Bar dataKey="Income" fill="#4ade80" radius={[4, 4, 0, 0]} maxBarSize={36} />
                    <Bar dataKey="Expenses" fill="#f87171" radius={[4, 4, 0, 0]} maxBarSize={36} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          )}
 
          {/* ── TRANSACTIONS ── */}
          {tab === "transactions" && (
            <>
              <div className="filters">
                <input placeholder="Search transactions..." value={search} onChange={e => setSearch(e.target.value)} style={{ flex: 1, minWidth: 150 }} />
                <select value={fType} onChange={e => setFType(e.target.value)}>
                  <option value="all">All Types</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
                <select value={fCat} onChange={e => setFCat(e.target.value)}>
                  <option value="all">All Categories</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <select value={fMonth} onChange={e => setFMonth(e.target.value)}>
                  <option value="all">All Months</option>
                  <option value="01">January</option>
                  <option value="02">February</option>
                  <option value="03">March</option>
                  <option value="04">April</option>
                </select>
                <select value={sort} onChange={e => setSort(e.target.value)}>
                  <option value="date-desc">Newest First</option>
                  <option value="date-asc">Oldest First</option>
                  <option value="amt-desc">Highest Amount</option>
                  <option value="amt-asc">Lowest Amount</option>
                </select>
                {(search || fType !== "all" || fCat !== "all" || fMonth !== "all") && (
                  <button className="btn btn-g btn-sm" onClick={() => { setSearch(""); setFType("all"); setFCat("all"); setFMonth("all"); }}>✕ Clear</button>
                )}
              </div>
 
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <p style={{ fontSize: 12, color: "var(--t2)" }}>
                  <span style={{ color: "var(--t1)", fontWeight: 600 }}>{filtered.length}</span> results
                </p>
                <div style={{ display: "flex", gap: 10 }}>
                  <span className="mono" style={{ fontSize: 12, color: "var(--inc)" }}>In: {fmt(filtered.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0))}</span>
                  <span style={{ color: "var(--t3)" }}>|</span>
                  <span className="mono" style={{ fontSize: 12, color: "var(--exp)" }}>Out: {fmt(filtered.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0))}</span>
                </div>
              </div>
 
              <div className="tx-hdr">
                <span>Date</span><span>Description</span><span>Category</span><span>Amount</span><span>{role === "admin" ? "Actions" : ""}</span>
              </div>
              <div className="tx-list">
                {filtered.length === 0 ? (
                  <div style={{ padding: "52px 16px", textAlign: "center" }}>
                    <p style={{ fontSize: 28, marginBottom: 10, color: "var(--t3)" }}>◈</p>
                    <p style={{ color: "var(--t2)", fontSize: 14 }}>No transactions found</p>
                    <p style={{ color: "var(--t3)", fontSize: 12, marginTop: 4 }}>Try adjusting your filters</p>
                  </div>
                ) : filtered.map(tx => (
                  <div key={tx.id} className="tx-row">
                    <span className="mono" style={{ fontSize: 11, color: "var(--t2)" }}>
                      {new Date(tx.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
                    </span>
                    <p style={{ fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{tx.desc}</p>
                    <span style={{ fontSize: 11, padding: "3px 8px", borderRadius: 6, background: (CAT_COLORS[tx.category] || "#888") + "1a", color: CAT_COLORS[tx.category] || "#888", fontWeight: 600, display: "inline-block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {tx.category}
                    </span>
                    <span className="mono" style={{ fontSize: 13, fontWeight: 600, color: tx.type === "income" ? "var(--inc)" : "var(--exp)" }}>
                      {tx.type === "income" ? "+" : "-"}{fmt(tx.amount)}
                    </span>
                    <div style={{ display: "flex", gap: 5 }}>
                      {role === "admin" && (
                        <>
                          <button className="btn btn-g btn-sm" onClick={() => openModal(tx)}>Edit</button>
                          <button className="btn btn-d btn-sm" onClick={() => setTxs(p => p.filter(t => t.id !== tx.id))}>✕</button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
 
          {/* ── INSIGHTS ── */}
          {tab === "insights" && (
            <>
              <div className="g3">
                {[
                  { lbl: "Top Spending Category", val: catData[0]?.name || "—", sub: catData[0] ? fmt(catData[0].value) : "—", color: CAT_COLORS[catData[0]?.name] || "var(--ac)", icon: "▲" },
                  { lbl: "Avg Monthly Expense", val: fmt(totalExp / 4), sub: "Over 4 months", color: "var(--exp)", icon: "≈" },
                  { lbl: "Best Savings Month", val: "February", sub: fmt(monthlyData[1]?.Balance || 0) + " saved", color: "var(--inc)", icon: "★" },
                ].map(m => (
                  <div key={m.lbl} className="card" style={{ textAlign: "center" }}>
                    <p style={{ fontSize: 24, color: m.color, marginBottom: 8 }}>{m.icon}</p>
                    <p style={{ fontSize: 10, color: "var(--t3)", textTransform: "uppercase", letterSpacing: ".6px", marginBottom: 5 }}>{m.lbl}</p>
                    <p className="serif" style={{ fontSize: 20 }}>{m.val}</p>
                    <p className="mono" style={{ fontSize: 11, color: "var(--t2)", marginTop: 4 }}>{m.sub}</p>
                  </div>
                ))}
              </div>
 
              <div className="g12">
                {/* Category breakdown */}
                <div className="card">
                  <p style={{ fontWeight: 600, fontSize: 13, marginBottom: 2 }}>Category Spending</p>
                  <p style={{ fontSize: 11, color: "var(--t3)", marginBottom: 18 }}>All expenses breakdown</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {catData.map(c => {
                      const pct = ((c.value / totalExp) * 100).toFixed(1);
                      return (
                        <div key={c.name}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, alignItems: "center" }}>
                            <span style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: "var(--t2)" }}>
                              <span style={{ width: 8, height: 8, borderRadius: "50%", background: CAT_COLORS[c.name] }} />{c.name}
                            </span>
                            <div style={{ display: "flex", gap: 10 }}>
                              <span className="mono" style={{ fontSize: 12 }}>{fmt(c.value)}</span>
                              <span style={{ fontSize: 11, color: "var(--t3)", width: 36, textAlign: "right" }}>{pct}%</span>
                            </div>
                          </div>
                          <div className="pb"><div className="pf" style={{ width: `${pct}%`, background: CAT_COLORS[c.name] }} /></div>
                        </div>
                      );
                    })}
                  </div>
                </div>
 
                {/* Observations */}
                <div>
                  <p style={{ fontWeight: 600, fontSize: 13, marginBottom: 12 }}>Smart Observations</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {[
                      { icon: "⚡", color: "#fbbf24", title: "High Travel Spend in March", body: "₹20,500 on travel — the single biggest month spike across all categories." },
                      { icon: "↑", color: "var(--inc)", title: "Salary grew in April", body: "Monthly salary increased by ₹3,000, improving overall financial health." },
                      { icon: "◐", color: "var(--ac)", title: `Savings rate: ${savRate}%`, body: parseFloat(savRate) > 30 ? "Excellent — you're saving over 30% of income each month." : "Consider reducing discretionary spending to improve savings ratio." },
                      { icon: "▼", color: "var(--exp)", title: "Consistent Food Spending", body: "₹2,000–₹3,500/mo on Food & Dining. Meal prepping could trim this category." },
                      { icon: "★", color: "#a855f7", title: "Freelance Peaked in Feb", body: "₹20,000 freelance income in February — the highest secondary income recorded." },
                    ].map(ins => (
                      <div key={ins.title} className="ic">
                        <div className="ic-icon" style={{ background: ins.color + "1a", color: ins.color }}>{ins.icon}</div>
                        <div>
                          <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 3 }}>{ins.title}</p>
                          <p style={{ fontSize: 12, color: "var(--t2)", lineHeight: 1.55 }}>{ins.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
 
              {/* Month-over-month table */}
              <div className="card">
                <p style={{ fontWeight: 600, fontSize: 13, marginBottom: 2 }}>Month-over-Month Summary</p>
                <p style={{ fontSize: 11, color: "var(--t3)", marginBottom: 18 }}>Jan–Apr 2025 detailed breakdown</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                  {monthlyData.map(m => (
                    <div key={m.month} style={{ background: "var(--bg3)", borderRadius: 10, padding: 14, border: "1px solid var(--bd)" }}>
                      <p style={{ fontSize: 11, color: "var(--t3)", textTransform: "uppercase", letterSpacing: ".6px", marginBottom: 12 }}>{m.month} 2025</p>
                      <p style={{ fontSize: 10, color: "var(--t3)" }}>Income</p>
                      <p className="mono" style={{ fontSize: 13, color: "var(--inc)", fontWeight: 500, marginBottom: 8 }}>{fmt(m.Income)}</p>
                      <p style={{ fontSize: 10, color: "var(--t3)" }}>Expenses</p>
                      <p className="mono" style={{ fontSize: 13, color: "var(--exp)", fontWeight: 500, marginBottom: 10 }}>{fmt(m.Expenses)}</p>
                      <div style={{ borderTop: "1px solid var(--bd)", paddingTop: 10 }}>
                        <p style={{ fontSize: 10, color: "var(--t3)" }}>Net</p>
                        <p className="mono" style={{ fontSize: 15, fontWeight: 600, color: m.Balance >= 0 ? "var(--inc)" : "var(--exp)" }}>
                          {m.Balance >= 0 ? "+" : ""}{fmt(m.Balance)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
 
      {/* MODAL */}
      {modal && (
        <div className="overlay" onClick={e => e.target === e.currentTarget && setModal(false)}>
          <div className="modal">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
              <h3 className="serif" style={{ fontSize: 20 }}>{editId ? "Edit Transaction" : "New Transaction"}</h3>
              <button className="btn btn-g btn-sm" onClick={() => setModal(false)}>✕</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { lbl: "Date", el: <input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} style={{ width: "100%" }} /> },
                { lbl: "Description", el: <input placeholder="e.g. Monthly Salary" value={form.desc} onChange={e => setForm(p => ({ ...p, desc: e.target.value }))} style={{ width: "100%" }} /> },
                { lbl: "Amount (₹)", el: <input type="number" placeholder="0" value={form.amount} onChange={e => setForm(p => ({ ...p, amount: e.target.value }))} style={{ width: "100%" }} /> },
              ].map(f => (
                <div key={f.lbl}><label className="form-lbl">{f.lbl}</label>{f.el}</div>
              ))}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label className="form-lbl">Category</label>
                  <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} style={{ width: "100%" }}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="form-lbl">Type</label>
                  <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))} style={{ width: "100%" }}>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 22, justifyContent: "flex-end" }}>
              <button className="btn btn-g" onClick={() => setModal(false)}>Cancel</button>
              <button className="btn btn-p" onClick={save}>{editId ? "Save Changes" : "Add Transaction"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}