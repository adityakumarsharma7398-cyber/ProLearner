import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import Card from '../components/Card.jsx'
import Button from '../components/Button.jsx'
import { computeJourney } from '../engine/journeyLayout.js'
import { deriveStatuses, summarize, STATUS_LABEL } from '../engine/progress.js'

const MILESTONE_COLORS = ['var(--lavender)', 'var(--yellow)', 'var(--mint)', 'var(--pink)', 'var(--peach)']

function useWidth(ref, dep) {
  const [w, setW] = useState(900)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return undefined
    setW(Math.round(el.clientWidth) || 900)
    const ro = new ResizeObserver(([e]) => setW(Math.round(e.contentRect.width) || 900))
    ro.observe(el)
    return () => ro.disconnect()
  }, [dep])
  return w
}

function Car() {
  return (
    <svg width="64" height="37" viewBox="0 0 52 30" aria-hidden="true">
      <path d="M4 20 L4 14 Q4 11 7 11 L15 11 L20 4 Q21 3 23 3 L34 3 Q36 3 37 4 L42 11 L46 11 Q49 11 49 14 L49 20 Z" fill="#ff9ec4" stroke="#141414" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M21 6 L34 6 L38 11 L17 11 Z" fill="#fff" stroke="#141414" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="14" cy="22" r="5" fill="#141414" /><circle cx="14" cy="22" r="1.8" fill="#fff" />
      <circle cx="39" cy="22" r="5" fill="#141414" /><circle cx="39" cy="22" r="1.8" fill="#fff" />
    </svg>
  )
}

function Tree({ x, y }) {
  return (
    <g>
      <rect x={x - 3} y={y + 6} width="6" height="14" fill="#8a5a2b" stroke="#141414" strokeWidth="1.5" />
      <circle cx={x} cy={y} r="14" fill="#8fdcae" stroke="#141414" strokeWidth="2.5" />
    </g>
  )
}

export default function JourneyView({ roadmap, onNavigate, onOpenTopic }) {
  const wrapRef = useRef(null)
  const width = useWidth(wrapRef, roadmap?.id)
  const [notice, setNotice] = useState('')
  const layout = useMemo(() => (roadmap ? computeJourney(roadmap.topics.length, width) : null), [roadmap?.id, roadmap?.topics.length, width])

  if (!roadmap) {
    return (
      <div className="container stack">
        <Card tone="pink">
          <h1>Progress Journey</h1>
          <p>You have no roadmap yet. Create one on the dashboard and your road will appear here, with a station for every topic.</p>
          <Button onClick={() => onNavigate('dashboard')}>Create a roadmap</Button>
        </Card>
      </div>
    )
  }

  const statuses = deriveStatuses(roadmap)
  const s = summarize(roadmap)
  const msIndex = Object.fromEntries(roadmap.milestones.map((m, i) => [m.id, i]))
  const milestoneById = Object.fromEntries(roadmap.milestones.map((m) => [m.id, m]))

  // Car sits at the current station, or at the last one once everything is done.
  const currentIdx = roadmap.progress.currentTopicId
    ? roadmap.topics.findIndex((t) => t.id === roadmap.progress.currentTopicId)
    : roadmap.topics.length - 1
  const car = layout.stations[Math.max(0, currentIdx)].car

  const open = (t) => {
    if (statuses[t.id] === 'locked') {
      setNotice(`"${t.name}" is locked. Complete its prerequisites first.`)
      return
    }
    setNotice('')
    onOpenTopic(t.id)
  }

  const labelW = Math.min(150, layout.span / layout.perRow - 12)

  return (
    <div className="container stack">
      <Card tone="pink">
        <div className="row-between">
          <div>
            <h1>Progress Journey</h1>
            <p style={{ marginBottom: '.75rem' }}><strong>{roadmap.goal}</strong>. This road changes as you pass quizzes. For how the concepts connect, open the Knowledge Map.</p>
          </div>
          <Button variant="ghost" onClick={() => onNavigate('dashboard')}>Back to dashboard</Button>
        </div>
        <div className="stat-row">
          <span className="pill">{s.percent}% complete</span>
          <span className="pill">{s.done} of {s.total} topics</span>
          <span className="pill">{s.milestonesDone} of {s.milestonesTotal} milestones</span>
          <span className="pill">XP: {s.xp}</span>
        </div>
        <div className="bar" role="progressbar" aria-valuenow={s.percent} aria-valuemin="0" aria-valuemax="100" aria-label="Overall progress">
          <div className="bar__fill" style={{ width: `${s.percent}%` }} />
        </div>
        {s.complete && <p className="notice" role="status">Journey complete. Every topic is done.</p>}
      </Card>

      <div className="journey" ref={wrapRef}>
        <div className="journey__canvas" style={{ width: '100%', height: layout.height }}>
          <svg width={width} height={layout.height} className="journey__svg" aria-hidden="true">
            {layout.trees.map((t, i) => <Tree key={i} x={t.x} y={t.y} />)}
            <path d={layout.pathD} fill="none" stroke="#141414" strokeWidth="60" strokeLinecap="round" strokeLinejoin="round" />
            <path d={layout.pathD} fill="none" stroke="#4a4a4a" strokeWidth="52" strokeLinecap="round" strokeLinejoin="round" />
            <path d={layout.pathD} fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="14 12" strokeLinecap="round" />
          </svg>

          {roadmap.topics.map((t, i) => {
            const st = layout.stations[i]
            const status = statuses[t.id]
            const m = milestoneById[t.milestoneId]
            const firstOfMilestone = m.topicIds[0] === t.id
            return (
              <button key={t.id} type="button" className={`st st--${status}`}
                style={{ left: st.x, top: st.y, width: labelW }}
                aria-label={`${t.name}, ${STATUS_LABEL[status]}`}
                onClick={() => open(t)}>
                {firstOfMilestone && <span className="st__ms" style={{ background: MILESTONE_COLORS[msIndex[t.milestoneId] % 5] }}>{m.title}</span>}
                <span className="st__badge">{status === 'completed' ? '✓' : i + 1}</span>
                <span className="st__name">{t.name}</span>
              </button>
            )
          })}

          <div className="car" style={{ left: car.x, top: car.y }} aria-label="Your car" role="img">
            <span className="car__tag">You</span>
            <div style={{ transform: `rotate(${car.angle}deg) scaleX(${car.flip ? -1 : 1})` }}><Car /></div>
          </div>
        </div>
      </div>

      {notice && <p className="notice" role="status" style={{ background: 'var(--yellow)' }}>{notice}</p>}

      <Card flat className="legend">
        <strong>Stations:</strong>
        {['locked', 'available', 'in_progress', 'completed'].map((k) => <span key={k} className={`legend__item kn--${k}`}>{STATUS_LABEL[k]}</span>)}
        <span className="small">Click a station to study it. The car waits at your current topic.</span>
      </Card>
    </div>
  )
}
