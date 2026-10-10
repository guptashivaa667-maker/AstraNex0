import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Activity, Award, Bell, BookOpen, BrainCircuit, BriefcaseBusiness,
  CheckCircle2, ChevronDown, ChevronRight, CircleUserRound, Compass,
  FileBadge, FileText, Gauge, LayoutDashboard, MapPin, Search,
  ShieldCheck, Sparkles, Target, TrendingUp, Upload, X
} from 'lucide-react';
import './styles.css';

const navItems = [
  ['Executive Overview', LayoutDashboard],
  ['Skills Signal Engine', Sparkles],
  ['Transition Recommender', Compass],
  ['Aggregate Signals', TrendingUp],
  ['Proof-of-Skill Passport', ShieldCheck],
  ['Evaluation & Validation', Gauge]
];
const roles = ['Chartered Accountant', 'Data Analyst', 'Business Analyst', 'Software Developer', 'AI & ML Engineer', 'Financial Analyst'];

const personas = {
  'Divya (Hoshiarpur)': {
    name: 'Divya Sharma', location: 'Hoshiarpur, Punjab', role: 'Chartered Accountant',
    bio: "Hoshiarpur. Balanced the daily khata and ledger, tracked supplier invoices, and managed customer payments. Taught myself advanced Excel, basic Tally, and beginner Python from YouTube tutorials to automate weekly stock reconciliation and billing.",
    work: "Managed accounts for father's textile business: prepared billing summaries, negotiated with yarn suppliers, reconciled cash registers, and filed monthly GST returns using Tally ERP.",
    projects: 'Created automated Python script to parse supplier invoices from email and append items into an Excel stock spreadsheet, cutting manual entry time by 4 hours per week.',
    learning: 'Self-taught Excel (VLOOKUP, Pivot Tables, SUMIFS), Tally ERP Prime, and Python fundamentals learned independently from YouTube courses.'
  },
  'Ramesh (Patna)': {
    name: 'Ramesh Kumar', location: 'Patna, Bihar', role: 'Data Analyst',
    bio: 'Worked in a small retail shop maintaining stock sheets, checking daily sales, and preparing weekly summaries. Learning SQL and Power BI through practice projects.',
    work: 'Maintained inventory records, reconciled daily cash sales, and prepared weekly sales summaries for the shop owner.',
    projects: 'Built a spreadsheet that highlights low-stock products and summarizes weekly revenue by category.',
    learning: 'Excel formulas, pivot tables, basic SQL, Power BI fundamentals, and self-directed learning.'
  },
  'Arun (Bengaluru)': {
    name: 'Arun Nair', location: 'Bengaluru, Karnataka', role: 'Software Developer',
    bio: 'Self-taught programmer who built small websites, fixed community group issues, and learned Python and JavaScript through independent projects.',
    work: 'Helped a local business maintain product listings and resolve website content issues.',
    projects: 'Built a task tracker and a Python script to clean duplicated rows in CSV files.',
    learning: 'Python, JavaScript, Git, HTML, CSS, and independent project-based learning.'
  }
};

const starterSkills = [
  { skill: 'Accounting', phrase: '"running the accounts"', evidence: "Spent two years running the accounts for my father's textile business.", method: 'informal verb phrase', confidence: 92, status: 'Candidate match — review required' },
  { skill: 'ERP Systems', phrase: '"Tally"', evidence: 'Taught myself advanced Excel, basic Tally, and beginner Python from YouTube tutorials.', method: 'explicit mention', confidence: 95, status: 'Candidate match — review required' },
  { skill: 'Excel/Spreadsheets', phrase: '"Excel"', evidence: 'Taught myself advanced Excel, basic Tally, and beginner Python from YouTube tutorials.', method: 'explicit mention', confidence: 97, status: 'Candidate match — review required' },
  { skill: 'Financial Analysis', phrase: '"invoices"', evidence: 'Balanced the daily khata and ledger, tracked supplier invoices, and managed customer payments.', method: 'contextual task', confidence: 88, status: 'Candidate match — review required' },
  { skill: 'Python', phrase: '"Python"', evidence: 'Taught myself advanced Excel, basic Tally, and beginner Python from YouTube tutorials.', method: 'explicit mention', confidence: 95, status: 'Candidate match — review required' },
  { skill: 'Self-Directed Learning', phrase: '"taught myself"', evidence: 'Taught myself advanced Excel, basic Tally, and beginner Python from YouTube tutorials.', method: 'self taught', confidence: 85, status: 'Candidate match — review required' }
];

function Field({ label, value, onChange }) {
  return <label className="field"><span>{label}</span><textarea value={value} onChange={e => onChange(e.target.value)} rows={4} /></label>;
}
function Stat({ icon: Icon, label, value, note }) {
  return <div className="stat"><div className="stat-icon"><Icon size={18}/></div><span>{label}</span><strong>{value}</strong><small>{note}</small></div>;
}

function App() {
  const [active, setActive] = useState('Skills Signal Engine');
  const [query, setQuery] = useState('');
  const [role, setRole] = useState('Chartered Accountant');
  const [target, setTarget] = useState('Data Analyst');
  const [persona, setPersona] = useState('Divya (Hoshiarpur)');
  const [bio, setBio] = useState(personas['Divya (Hoshiarpur)'].bio);
  const [work, setWork] = useState(personas['Divya (Hoshiarpur)'].work);
  const [projects, setProjects] = useState(personas['Divya (Hoshiarpur)'].projects);
  const [learning, setLearning] = useState(personas['Divya (Hoshiarpur)'].learning);
  const [skills, setSkills] = useState(starterSkills);
  const [filter, setFilter] = useState('');
  const [notice, setNotice] = useState('');
  const [selectedFile, setSelectedFile] = useState('');
  const [roadmapDone, setRoadmapDone] = useState([]);
  const [modal, setModal] = useState(false);

  const profile = personas[persona];
  const allText = `${bio}\n${work}\n${projects}\n${learning}`;
  const visibleSkills = useMemo(
    () => skills.filter(s => `${s.skill} ${s.phrase} ${s.evidence}`.toLowerCase().includes(filter.toLowerCase())),
    [skills, filter]
  );

  function loadPersona(key) {
    const p = personas[key];
    setPersona(key); setBio(p.bio); setWork(p.work); setProjects(p.projects); setLearning(p.learning);
    setRole(p.role); setSkills(starterSkills);
    setNotice(`Loaded sample test persona: ${p.name}. Sample data is illustrative.`);
  }

  function extractSkills() {
    const dictionary = [
      ['Accounting', ['account', 'ledger', 'billing', 'invoice', 'gst', 'cash register'], 88, 'contextual task'],
      ['Excel/Spreadsheets', ['excel', 'spreadsheet', 'pivot table', 'vlookup', 'sumifs'], 96, 'explicit mention'],
      ['ERP Systems', ['tally', 'erp'], 92, 'explicit mention'],
      ['Python', ['python', 'script', 'automate'], 91, 'explicit mention'],
      ['SQL', ['sql', 'query', 'database'], 88, 'explicit mention'],
      ['Financial Analysis', ['invoice', 'revenue', 'payments', 'reconcile', 'financial'], 86, 'contextual task'],
      ['Communication', ['negotiated', 'supplier', 'customer', 'communicat'], 78, 'contextual task'],
      ['Self-Directed Learning', ['taught myself', 'self-taught', 'youtube', 'independently', 'independent'], 85, 'self taught'],
      ['Data Cleaning', ['clean', 'duplicate', 'csv', 'reconciliation'], 82, 'contextual task'],
      ['Inventory Management', ['stock', 'inventory', 'supplier'], 84, 'contextual task'],
      ['Power BI', ['power bi'], 90, 'explicit mention'],
      ['JavaScript', ['javascript'], 90, 'explicit mention']
    ];
    const lower = allText.toLowerCase();
    const found = dictionary.filter(([, terms]) => terms.some(t => lower.includes(t))).map(([skill, terms, confidence, method]) => {
      const term = terms.find(t => lower.includes(t));
      const idx = lower.indexOf(term);
      const start = Math.max(0, idx - 45), end = Math.min(allText.length, idx + 120);
      return {
        skill, phrase: `"${term}"`,
        evidence: `${start > 0 ? '…' : ''}${allText.slice(start, end).trim()}${end < allText.length ? '…' : ''}`,
        method, confidence, status: 'Candidate match — review required'
      };
    });
    setSkills([...new Map(found.map(s => [s.skill, s])).values()]);
    setNotice(`Found ${new Set(found.map(s => s.skill)).size} candidate skills. This starter uses keyword rules, not a validated AI model. Review the evidence before relying on results.`);
  }

  function handleUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file.name);
    if (file.name.endsWith('.txt') || file.name.endsWith('.md') || file.type.startsWith('text/')) {
      const reader = new FileReader();
      reader.onload = () => { setBio(String(reader.result || '')); setNotice(`Loaded text from ${file.name}. Click “Extract & Ground Skills”.`); };
      reader.readAsText(file);
    } else {
      setNotice(`${file.name} selected. This starter only reads TXT/MD files; paste PDF/DOCX resume text into the fields.`);
    }
  }

  const phases = [
    { title: 'Core Skills & Foundations', weeks: 'Weeks 1 - 3', desc: 'Strengthen role-relevant fundamentals through focused learning and short practice tasks.', skills: ['Excel / Spreadsheets', 'SQL Fundamentals', 'Communication', 'Data Quality'], project: 'Documented skills inventory and baseline assessment' },
    { title: 'Applied Projects & Practice', weeks: 'Weeks 4 - 7', desc: 'Turn learning into practical evidence through realistic tasks and portfolio projects.', skills: ['Portfolio Project', 'Problem Solving', 'Domain Knowledge', 'Documentation'], project: 'A reproducible project with evidence and measurable outcomes' },
    { title: 'Role Readiness & Evaluation', weeks: 'Weeks 8 - 10', desc: 'Review missing skills, assess competency, and improve weak areas using feedback.', skills: ['Technical Assessment', 'Case Studies', 'Interview Practice', 'Peer Review'], project: 'Role-readiness assessment with transparent scoring' },
    { title: 'Capstone & Career Launch', weeks: 'Weeks 11 - 12', desc: 'Package the capstone, document what you can demonstrate, and prepare applications.', skills: ['Capstone', 'Resume', 'Portfolio', 'Interview Readiness'], project: 'Portfolio-ready capstone and project report' }
  ];

  function overview() {
    return <>
      <section className="hero"><div><span className="eyebrow"><Sparkles size={14}/> PS-02 · THE UNMAPPED</span><h1>Skill Intelligence Overview</h1><p>Turn informal experience into evidence-backed skill signals, explore role transitions, and build a practical learning pathway.</p></div><div className="hero-mark"><BrainCircuit size={52}/><span>CAREER INTELLIGENCE AI</span></div></section>
      <div className="stats-grid">
        <Stat icon={BriefcaseBusiness} label="Occupation taxonomy" value="820*" note="Demo label; source dataset not bundled"/>
        <Stat icon={Activity} label="Candidate skills" value={skills.length} note="Current extracted list"/>
        <Stat icon={Target} label="Target occupation" value={role} note="Editable profile setting"/>
        <Stat icon={ShieldCheck} label="Evidence status" value="Review needed" note="No independent verification"/>
      </div>
      <section className="panel"><h2>PS-02 modules</h2><div className="module-grid">{navItems.slice(1).map(([name, Icon], i) => <button className="module-card" key={name} onClick={() => setActive(name)}><Icon size={21}/><strong>{name}</strong><span>{['Extract candidate skills from experience and text evidence','Compare candidate signals with a target occupation','Show sourced labor-market indicators','Organize skill claims and supporting evidence','Track evaluation tasks and limitations'][i]}</span><ChevronRight size={16}/></button>)}</div></section>
    </>;
  }

  function skillsPage() {
    return <>
      <section className="hero"><div><span className="eyebrow"><Sparkles size={14}/> COMPONENT 1 — SKILLS SIGNAL ENGINE (PS-02)</span><h1>Informal Experience &amp; Skill Extractor</h1><p>Identify potential competencies from self-taught projects and informal work. Each candidate is linked to a text snippet for review; taxonomy mapping still needs a trusted dataset.</p></div><div className="persona-box"><label>LOAD PS-02 TEST PERSONA</label><div className="persona-buttons">{Object.keys(personas).map(p => <button key={p} className={persona === p ? 'selected' : ''} onClick={() => loadPersona(p)}>{p}</button>)}</div></div></section>
      <section className="panel">
        <div className="panel-toolbar"><div className="tabs"><span className="tab active">Multi-Field Input (Experience, Projects &amp; Self-Taught)</span><span className="tab">Resume / Free Text Upload</span></div><label className="upload-btn"><Upload size={15}/> Upload Resume / Text File<input type="file" accept=".txt,.md,.pdf,.doc,.docx" onChange={handleUpload}/></label></div>
        {selectedFile && <div className="file-chip"><FileText size={14}/>{selectedFile}<button onClick={() => setSelectedFile('')}><X size={13}/></button></div>}
        <div className="form-grid"><Field label="Candidate Bio & Overall Summary" value={bio} onChange={setBio}/><Field label="Work Experience & Informal Duties" value={work} onChange={setWork}/><Field label="Projects, Automation & Practical Work" value={projects} onChange={setProjects}/><Field label="Self-Taught Skills & Independent Learning" value={learning} onChange={setLearning}/></div>
        <div className="grounding"><span><i className="green-dot"/> Evidence snippets are traceable to input text. Keyword matches can be wrong.</span><button className="primary" onClick={extractSkills}><Sparkles size={15}/> Extract &amp; Ground Skills</button></div>
      </section>
      <section className="panel">
        <div className="table-heading"><div><h2>Extracted Competency Signals ({visibleSkills.length})</h2><p>Heuristic candidate skills with source evidence and uncalibrated confidence scores.</p></div><div className="table-actions"><div className="filter"><Search size={15}/><input placeholder="Filter extracted skills..." value={filter} onChange={e => setFilter(e.target.value)}/></div><button className="outline" onClick={() => setModal(true)}><ShieldCheck size={15}/> View Passport</button></div></div>
        <div className="table-wrap"><table><thead><tr><th>CANONICAL SKILL</th><th>EXTRACTED PHRASE</th><th>SOURCE EVIDENCE TEXT</th><th>METHOD</th><th>CONFIDENCE*</th><th>STATUS</th></tr></thead><tbody>{visibleSkills.map(s => <tr key={s.skill}><td><strong><i className="purple-dot"/> {s.skill}</strong></td><td className="phrase">{s.phrase}</td><td className="evidence" title={s.evidence}>{s.evidence}</td><td><span className="tag">{s.method}</span></td><td className="confidence">{s.confidence}%</td><td className="status">{s.status}</td></tr>)}</tbody></table>{!visibleSkills.length && <div className="empty">No skills match that filter.</div>}</div>
        <div className="table-foot"><span>* Heuristic score, not statistically calibrated or proof of competence.</span><button className="primary" onClick={() => setActive('Transition Recommender')}>Proceed to Target Transition <ChevronRight size={16}/></button></div>
      </section>
    </>;
  }

  function transitionPage() {
    const have = skills.map(s => s.skill.toLowerCase());
    const reqs = target === 'Data Analyst' ? ['Excel/Spreadsheets','SQL','Python','Data Cleaning','Communication'] :
      target === 'Chartered Accountant' ? ['Accounting','ERP Systems','Excel/Spreadsheets','Financial Analysis'] :
      target === 'AI & ML Engineer' ? ['Python','SQL','Data Cleaning','Communication'] :
      ['Excel/Spreadsheets','Communication','Data Cleaning'];
    return <><section className="hero"><div><span className="eyebrow"><Compass size={14}/> COMPONENT 2 — TRANSITION RECOMMENDER</span><h1>Target Role Transition</h1><p>Compare candidate signals with an illustrative checklist. Replace this checklist with sourced occupation requirements for a real evaluation.</p></div></section><section className="panel"><div className="role-picker"><label>Target occupation<select value={target} onChange={e => setTarget(e.target.value)}>{roles.map(r => <option key={r}>{r}</option>)}</select></label><span className="pill">Demo checklist</span></div><div className="gap-grid">{reqs.map(r => {const found = have.includes(r.toLowerCase()); return <div className="gap-card" key={r}><span className={found ? 'check-icon' : 'missing-icon'}>{found ? <CheckCircle2 size={18}/> : <Target size={18}/>}</span><div><strong>{r}</strong><p>{found ? 'Candidate evidence found — review snippet' : 'Potential gap — validate against a sourced role profile'}</p></div><span className={`pill ${found ? 'green' : 'amber'}`}>{found ? 'Evidence found' : 'Gap to review'}</span></div>;})}</div><div className="notice"><Activity size={18}/><div><strong>No transition probability calculated</strong><p>A credible 12-month probability requires labeled transition outcomes and a validated, calibrated model. This starter does not have those.</p></div></div><h2>Suggested next steps</h2><ol className="next-steps"><li>Validate each detected skill with a project, work artifact, or assessment.</li><li>Prioritize gaps using reliable target-role requirements.</li><li>Complete a small project that demonstrates the missing skill.</li></ol></section></>;
  }

  function signalsPage() {
    return <><section className="hero"><div><span className="eyebrow"><TrendingUp size={14}/> COMPONENT 3 — AGGREGATE SIGNALS</span><h1>India Labor-Market Signals</h1><p>Show wages, employment trends, and automation exposure only when the dataset and its provenance are available.</p></div></section><section className="panel"><div className="notice amber"><FileText size={18}/><div><strong>No verified labor-market dataset is bundled</strong><p>These placeholders are intentional. Add the PS-provided dataset before presenting labor-market numbers as facts.</p></div></div><div className="stats-grid"><Stat icon={BriefcaseBusiness} label="Median wage" value="Data required" note="No sourced wage table loaded"/><Stat icon={TrendingUp} label="Employment growth" value="Data required" note="Occupation and period required"/><Stat icon={Activity} label="Automation exposure" value="Data required" note="Methodology and source required"/></div><p className="muted">Do not treat the “820 roles” interface label as evidence that a verified dataset is present.</p></section></>;
  }

  function passportPage() {
    return <><section className="hero"><div><span className="eyebrow"><ShieldCheck size={14}/> COMPONENT 4 — PROOF-OF-SKILL PASSPORT</span><h1>Evidence-backed Skill Passport</h1><p>Organize candidate claims and evidence, and distinguish inferred skills from independently verified competencies.</p></div></section><section className="panel"><div className="notice"><ShieldCheck size={18}/><div><strong>No independent verification performed</strong><p>Skills below come from sample text or user-entered text; they are not certified credentials.</p></div></div><div className="passport-list">{skills.map(s => <div className="passport-row" key={s.skill}><div className="passport-icon"><Award size={20}/></div><div className="passport-info"><strong>{s.skill}</strong><p>{s.evidence}</p></div><span className="pill amber">Claimed / inferred</span><button className="outline small" onClick={() => setNotice(`Evidence snippet for ${s.skill}: ${s.evidence}`)}>View evidence</button></div>)}</div></section></>;
  }

  function evaluationPage() {
    const tasks = ['Create a manually reviewed test set of informal experience descriptions.','Measure extraction precision, recall, and F1 against reviewed labels.','Measure taxonomy mapping accuracy against a trusted skills taxonomy.','Document a baseline and compare the proposed method with it.','Evaluate calibration only if suitable transition outcome labels exist.','Record data provenance, limitations, and reproducible test instructions.'];
    return <><section className="hero"><div><span className="eyebrow"><Gauge size={14}/> COMPONENT 5 — EVALUATION &amp; VALIDATION</span><h1>Evaluation &amp; Validation</h1><p>Track evaluation work without claiming results that have not been measured.</p></div></section><section className="panel"><h2>Evaluation checklist</h2>{tasks.map((t,i) => <label className="checkline" key={t}><input type="checkbox" checked={roadmapDone.includes(i)} onChange={e => setRoadmapDone(old => e.target.checked ? [...old,i] : old.filter(x => x !== i))}/><span>{t}</span></label>)}<div className="progressline"><div style={{width: `${roadmapDone.length / tasks.length * 100}%`}}/></div><p className="muted">{roadmapDone.length} of {tasks.length} tasks checked off. This checklist is not proof an evaluation has run.</p></section></>;
  }

  function roadmapPage() {
    return <><section className="hero"><div><span className="eyebrow"><BookOpen size={14}/> PERSONALIZED LEARNING PATHWAY</span><h1>Career Acceleration Roadmap</h1><p>A milestone-based learning pathway with practical deliverables. Current milestones are starter examples.</p></div></section>{phases.map((p,i) => <section className="panel phase" key={p.title}><div className="phase-top"><div className="phase-number">{i+1}</div><div className="phase-main"><h2>{p.title} <span className="weeks">{p.weeks}</span></h2><p>{p.desc}</p></div><span className="pill">{roadmapDone.includes(i+10) ? 'Completed' : i===0 ? 'Ready to start' : 'Upcoming'}</span></div><div className="phase-details"><div><label>TARGET SKILLS TO PRACTICE</label><div className="skill-tags">{p.skills.map(s => <span key={s}>{s}</span>)}</div></div><div><label>PRACTICAL DELIVERABLE</label><div className="deliverable"><FileBadge size={16}/>{p.project}</div></div></div><label className="checkline"><input type="checkbox" checked={roadmapDone.includes(i+10)} onChange={e => setRoadmapDone(old => e.target.checked ? [...old,i+10] : old.filter(x => x !== i+10))}/><span>Mark milestone completed</span></label></section>)}</>;
  }

  const pageMap = {
    'Executive Overview': overview,
    'Skills Signal Engine': skillsPage,
    'Transition Recommender': transitionPage,
    'Aggregate Signals': signalsPage,
    'Proof-of-Skill Passport': passportPage,
    'Evaluation & Validation': evaluationPage,
    'Learning Roadmap': roadmapPage
  };

  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-icon"><BrainCircuit size={24}/></div><div><strong>Skill Intelligence</strong><small>PS-02 The Unmapped</small></div></div>
      <div className="target-box"><label>TARGET OCCUPATION <Sparkles size={13}/></label><strong><i className="green-dot"/>{role}</strong></div>
      <div className="nav-title">CORE PS-02 MODULES</div>
      <nav>{navItems.map(([name,Icon],i) => <button key={name} className={`nav-item ${active===name?'active':''}`} onClick={() => setActive(name)}><Icon size={17}/><span>{name}</span>{i===1&&<small>PS-02</small>}{i===3&&<small>820 ROLES*</small>}{active===name&&<ChevronRight size={15}/>}</button>)}<button className={`nav-item ${active==='Learning Roadmap'?'active':''}`} onClick={() => setActive('Learning Roadmap')}><BookOpen size={17}/><span>Learning Roadmap</span><ChevronRight size={15}/></button><button className="nav-item" onClick={() => setNotice('The map view requires a real, sourced geographic dataset and is not included in this starter.')}><MapPin size={17}/><span>India Demand Map</span></button></nav>
      <div className="sidebar-bottom"><span className="demo"><i/> DEMO DATA</span><small>PS-02 · Starter</small><div className="user-card"><div className="avatar">{profile.name.split(' ').map(s=>s[0]).slice(0,2).join('')}</div><div><strong>{profile.name}</strong><small>{profile.location}</small></div><ChevronRight size={15}/></div></div>
    </aside>
    <main className="main">
      <header className="topbar"><div className="global-search"><Search size={16}/><input placeholder="Search occupations or skills..." value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&query.trim()){setFilter(query);setActive('Skills Signal Engine');setNotice(`Filtering extracted skills for “${query}”.`)}}}/></div><span className="demo"><i/> DEMO DATA <span className="info">ⓘ</span></span><div className="role-select"><BriefcaseBusiness size={15}/><label>Target Role<select value={role} onChange={e=>setRole(e.target.value)}>{roles.map(r=><option key={r}>{r}</option>)}</select></label><ChevronDown size={14}/></div><button className="icon-btn" title="Notifications" onClick={()=>setNotice('No new notifications in this demo.')}><Bell size={17}/></button><div className="profile-pill"><div className="avatar">{profile.name[0]}</div><span>{profile.name.split(' ')[0]}</span><ChevronDown size={14}/></div></header>
      <div className="content"><div className="page-heading"><span className="crumb">SKILL INTELLIGENCE <span>/</span> {active.toUpperCase()}</span></div>{notice&&<div className="toast"><span>{notice}</span><button onClick={()=>setNotice('')}><X size={15}/></button></div>}{(pageMap[active]||skillsPage)()}<footer>Skill Intelligence <span>•</span> PS-02 Social Upliftment (“The Unmapped”)<span className="footer-right">DEMO DATA · Starter implementation</span></footer></div>
    </main>
    {modal&&<div className="modal-backdrop" onClick={()=>setModal(false)}><div className="modal" onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>setModal(false)}><X size={18}/></button><span className="eyebrow"><ShieldCheck size={14}/> PROOF-OF-SKILL PASSPORT</span><h2>{profile.name}'s skill evidence</h2><p className="muted">Demo status only — not independently verified.</p>{skills.map(s=><div className="modal-skill" key={s.skill}><strong>{s.skill}</strong><span>{s.evidence}</span><em>Claimed / inferred</em></div>)}</div></div>}
  </div>;
}

createRoot(document.getElementById('root')).render(<App/>);
