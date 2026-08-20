'use client'

import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowUpRight,
  AtSign,
  Check,
  ChevronRight,
  Code2,
  Copy,
  Database,
  GitBranch,
  Globe2,
  Layers3,
  Link,
  Mail,
  MapPin,
  Menu,
  Moon,
  Radio,
  Send,
  Server,
  Sparkles,
  Sun,
  Terminal,
  X,
} from 'lucide-react'

const projects = [
  {
    title: 'Project placeholder',
    eyebrow: 'Case study 01',
    description: 'A space for a product you want to spotlight, with a concise summary of the problem and the build.',
    role: 'Full-stack developer',
    stack: ['Next.js', 'TypeScript', 'Postgres'],
    challenge: 'Replace this with the real challenge, constraints, and context behind the project.',
    solution: 'Replace this with the approach, system design, and product decisions you made.',
    outcome: 'Replace this with a factual outcome. Keep it specific without inventing metrics.',
    accent: 'mint',
    live: '#contact',
    source: '#contact',
  },
  {
    title: 'Another placeholder',
    eyebrow: 'Case study 02',
    description: 'A second project slot for an interface, platform, or experiment that shows how you think.',
    role: 'Product-minded engineer',
    stack: ['React', 'Node.js', 'Supabase'],
    challenge: 'Replace this with the most interesting problem this project needed to solve.',
    solution: 'Replace this with the architecture and interaction choices that made the solution useful.',
    outcome: 'Replace this with the real result or learning from the work.',
    accent: 'coral',
    live: '#contact',
    source: '#contact',
  },
  {
    title: 'Your next build',
    eyebrow: 'Case study 03',
    description: 'Keep this card as a quiet invitation for future work, or swap in another project.',
    role: 'End-to-end builder',
    stack: ['Design systems', 'APIs', 'Cloud'],
    challenge: 'A clear problem is the beginning of every strong product story.',
    solution: 'The best solution balances clarity for people with leverage for the team.',
    outcome: 'Make room for the outcome once the work has shipped.',
    accent: 'blue',
    live: '#contact',
    source: '#contact',
  },
]

const skillGroups = [
  { label: 'Frontend', icon: Code2, skills: ['React', 'Next.js', 'TypeScript', 'Motion'] },
  { label: 'Backend', icon: Server, skills: ['Node.js', 'REST APIs', 'Auth', 'Validation'] },
  { label: 'Databases', icon: Database, skills: ['Postgres', 'Supabase', 'SQL', 'Data modeling'] },
  { label: 'Tools', icon: Terminal, skills: ['Git', 'Figma', 'Testing', 'DX'] },
  { label: 'Product thinking', icon: Layers3, skills: ['Discovery', 'Flows', 'Prototyping', 'Iteration'] },
  { label: 'Deployment', icon: Globe2, skills: ['Vercel', 'CI/CD', 'Observability', 'Performance'] },
]

const navItems = [
  { id: 'home', label: 'Home', icon: Sparkles },
  { id: 'about', label: 'About', icon: AtSign },
  { id: 'work', label: 'Work', icon: Layers3 },
  { id: 'skills', label: 'Skills', icon: Terminal },
  { id: 'contact', label: 'Contact', icon: Mail },
]

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  window.history.replaceState(null, '', `#${id}`)
}

function SoftButton({ children, onClick, variant = 'primary', type = 'button' }: { children: React.ReactNode; onClick?: () => void; variant?: 'primary' | 'soft'; type?: 'button' | 'submit' }) {
  return <button type={type} onClick={onClick} className={`soft-button ${variant}`}>{children}</button>
}

export default function Page() {
  const [active, setActive] = useState('home')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const saved = window.localStorage.getItem('gaurav-theme') as 'light' | 'dark' | null
    const preferred = saved ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    setTheme(preferred)
    document.documentElement.classList.toggle('dark', preferred === 'dark')
    const timer = window.setTimeout(() => setLoading(false), 650)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActive(visible.target.id)
    }, { rootMargin: '-20% 0px -55% 0px', threshold: [0.1, 0.4, 0.8] })
    navItems.forEach(({ id }) => document.getElementById(id) && observer.observe(document.getElementById(id)!))
    return () => observer.disconnect()
  }, [])

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    document.documentElement.classList.toggle('dark', next === 'dark')
    window.localStorage.setItem('gaurav-theme', next)
  }

  if (loading) return <div className="loading-screen"><div className="loading-mark">GK</div><p>Preparing the workspace<span className="loading-dots">...</span></p></div>

  return (
    <main className="portfolio-shell">
      <header className="topbar">
        <button className="brand" onClick={() => scrollToSection('home')} aria-label="Go to home"><span>GK</span><strong>Gaurav Khetwal</strong></button>
        <div className="topbar-actions">
          <span className="availability"><i /> Available for thoughtful builds</span>
          <button className="icon-button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>{theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}</button>
          <button className="icon-button menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu"><Menu size={18} /></button>
        </div>
      </header>

      <AnimatePresence>{menuOpen && <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="mobile-menu">{navItems.map((item) => <button key={item.id} onClick={() => { scrollToSection(item.id); setMenuOpen(false) }}>{item.label}<ChevronRight size={15} /></button>)}</motion.div>}</AnimatePresence>

      <div className="screen-stack">
        <motion.section id="home" className="screen hero-screen" initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="hero-copy"><div className="eyebrow"><span className="eyebrow-dot" /> Full-stack developer / product thinker</div><h1>Turning complex problems into <em>clear, useful</em> software.</h1><p className="lede">I’m Gaurav — I design and build digital products with a bias toward clarity, craft, and the small details that make software feel good to use.</p><div className="hero-actions"><SoftButton onClick={() => scrollToSection('work')}>View selected work <ArrowUpRight size={16} /></SoftButton><SoftButton variant="soft" onClick={() => scrollToSection('contact')}>Start a conversation <Send size={15} /></SoftButton></div><div className="hero-meta"><span><MapPin size={14} /> India / working globally</span><span><Radio size={14} /> Open to meaningful problems</span></div></div>
          <div className="hero-visual" aria-label="Interactive developer workspace illustration"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="code-panel"><div className="code-header"><span /><span /><span /><small>workspace.tsx</small></div><pre><code><span className="syntax-purple">const</span> <span className="syntax-blue">clarity</span> <span className="syntax-muted">=</span> {'{'}{`\n`}  <span className="syntax-orange">listen</span>: <span className="syntax-green">true</span>,{`\n`}  <span className="syntax-orange">make</span>: <span className="syntax-green">'useful'</span>,{`\n`}  <span className="syntax-orange">ship</span>: <span className="syntax-green">'carefully'</span>{`\n`}{'}'}<span className="cursor" /></code></pre></div><div className="float-chip chip-top"><span className="chip-icon mint"><Check size={13} /></span><span><b>Thoughtful by default</b><small>systems + interfaces</small></span></div><div className="float-chip chip-bottom"><span className="chip-icon coral"><Sparkles size={13} /></span><span><b>Currently exploring</b><small>better product rituals</small></span></div></div>
        </motion.section>

        <section id="about" className="screen about-screen"><div className="section-heading"><div><div className="eyebrow">A little context</div><h2>Developer, product thinker, <em>problem solver.</em></h2></div><p>I like working where the question is still being shaped — turning ambiguity into a product people can understand and a system teams can build on.</p></div><div className="process-grid">{['Understand', 'Design', 'Build', 'Validate', 'Improve'].map((step, index) => <motion.div key={step} className="process-card" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ delay: index * 0.07 }}><span>0{index + 1}</span><h3>{step}</h3><p>{['Find the signal in the noise.', 'Make the invisible visible.', 'Turn decisions into durable code.', 'Learn from real use.', 'Keep the useful parts moving.'][index]}</p></motion.div>)}</div><div className="about-note"><span className="quote-mark">“</span><p>The work is never just shipping the feature. It’s making the next decision easier.</p><span className="note-line" /></div></section>

        <section id="work" className="screen work-screen"><div className="section-heading"><div><div className="eyebrow">Selected work</div><h2>Proof of thought, <em>not made-up metrics.</em></h2></div><p>Placeholder slots are intentionally clear. Swap in real projects, outcomes, and links when you’re ready.</p></div><div className="project-grid">{projects.map((project, index) => <motion.button key={project.title} className={`project-card ${project.accent}`} onClick={() => setSelectedProject(project)} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ delay: index * 0.1 }}><div className="project-art"><span className="art-label">{project.eyebrow}</span><div className="art-window"><span /><span /><span /><div className="art-lines"><i /><i /><i /></div></div><div className="art-orb" /></div><div className="project-info"><div><h3>{project.title}</h3><p>{project.description}</p></div><span className="round-arrow"><ArrowUpRight size={17} /></span></div><div className="project-tags">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div></motion.button>)}</div></section>

        <section id="skills" className="screen skills-screen"><div className="section-heading"><div><div className="eyebrow">The toolkit</div><h2>Tools are useful. <em>Judgment is the skill.</em></h2></div><p>A practical stack for taking an idea from the first question to a calm, dependable release.</p></div><div className="skills-layout"><div className="skill-grid">{skillGroups.map((group, index) => { const Icon = group.icon; return <motion.div key={group.label} className="skill-card" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}><div className="skill-icon"><Icon size={17} /></div><h3>{group.label}</h3><div className="skill-list">{group.skills.map((skill) => <span key={skill}>{skill}</span>)}</div></motion.div> })}</div><div className="terminal"><div className="terminal-bar"><span /><span /><span /><b>gaurav@workspace:~</b><Copy size={14} /></div><div className="terminal-body"><p><span className="terminal-green">➜</span> <span className="terminal-blue">~</span> whoami</p><p className="terminal-muted">full-stack developer, product thinker</p><p><span className="terminal-green">➜</span> <span className="terminal-blue">~</span> principles</p><p className="terminal-muted">{`{`} clarity, curiosity, care {`}`}</p><p><span className="terminal-green">➜</span> <span className="terminal-blue">~</span> status<span className="cursor terminal-cursor" /></p></div><div className="terminal-status"><i /> accepting interesting problems</div></div></div></section>

        <section id="contact" className="screen contact-screen"><div className="contact-intro"><div className="eyebrow">Let’s make something useful</div><h2>Have a good problem? <em>Let’s talk.</em></h2><p>Tell me what you’re working through. No polished brief required — just enough context to start a useful conversation.</p><div className="contact-links"><a href="mailto:hello@example.com"><Mail size={16} /> hello@example.com</a><a href="https://github.com" target="_blank" rel="noreferrer"><GitBranch size={16} /> github.com/your-handle</a><a href="https://linkedin.com" target="_blank" rel="noreferrer"><Link size={16} /> linkedin.com/in/your-handle</a></div></div><ContactForm /></section>
      </div>

      <nav className="dock" aria-label="Primary navigation">{navItems.map((item) => { const Icon = item.icon; return <button key={item.id} className={active === item.id ? 'active' : ''} onClick={() => scrollToSection(item.id)} aria-label={`Go to ${item.label}`} aria-current={active === item.id ? 'page' : undefined}><Icon size={18} /><span>{item.label}</span>{active === item.id && <motion.i layoutId="active-dot" />}</button> })}</nav>

      <AnimatePresence>{selectedProject && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProject(null)}><motion.div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-title" initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24, scale: 0.97 }} onClick={(event) => event.stopPropagation()}><button className="modal-close icon-button" onClick={() => setSelectedProject(null)} aria-label="Close project details"><X size={18} /></button><div className={`modal-art ${selectedProject.accent}`}><span>{selectedProject.eyebrow}</span><div className="modal-art-shape"><Code2 size={42} /></div></div><div className="modal-content"><div className="eyebrow">{selectedProject.role}</div><h2 id="project-title">{selectedProject.title}</h2><p>{selectedProject.description}</p><div className="case-grid"><div><small>Challenge</small><p>{selectedProject.challenge}</p></div><div><small>Solution</small><p>{selectedProject.solution}</p></div><div><small>Outcome</small><p>{selectedProject.outcome}</p></div></div><div className="modal-actions"><a className="soft-button soft" href={selectedProject.live}>Live demo <ArrowUpRight size={15} /></a><a className="soft-button soft" href={selectedProject.source}>Source code <GitBranch size={15} /></a></div></div></motion.div></motion.div>}</AnimatePresence>
    </main>
  )
}

function ContactForm() {
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [startedAt, setStartedAt] = useState(Date.now())
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', website: '' })
  const update = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }))
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (form.website || Date.now() - startedAt < 1200) return
    setState('loading'); setError('')
    try { const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) }); const result = await response.json(); if (!response.ok) throw new Error(result.error ?? 'Something went wrong.')
      setState('success'); setForm({ name: '', email: '', subject: '', message: '', website: '' }); setStartedAt(Date.now())
    } catch (submitError) { setState('error'); setError(submitError instanceof Error ? submitError.message : 'Something went wrong. Please try again.') }
  }
  if (state === 'success') return <div className="form-card form-state"><div className="success-icon"><Check size={24} /></div><h3>Message received.</h3><p>Thanks for reaching out. I’ll get back to you as soon as I can.</p><SoftButton variant="soft" onClick={() => setState('idle')}>Send another message</SoftButton></div>
  return <form className="form-card" onSubmit={submit} aria-label="Contact form"><div className="form-row"><label>Name<input required value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Your name" /></label><label>Email<input required type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@example.com" /></label></div><label>Subject<input required value={form.subject} onChange={(e) => update('subject', e.target.value)} placeholder="What are you working on?" /></label><label>Message<textarea required minLength={10} value={form.message} onChange={(e) => update('message', e.target.value)} placeholder="A few words about the problem..." rows={5} /></label><label className="honeypot" aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => update('website', e.target.value)} /></label>{error && <p className="form-error" role="alert">{error}</p>}<SoftButton type="submit">{state === 'loading' ? 'Sending...' : 'Send message'} <Send size={15} /></SoftButton><p className="form-footnote">No mailing list. No noise. Just a direct reply.</p></form>
}
