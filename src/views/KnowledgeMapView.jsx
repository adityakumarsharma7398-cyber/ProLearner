import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import Card from '../components/Card.jsx'
import Button from '../components/Button.jsx'
import { computeLayout, NODE_W, NODE_H } from '../engine/layout.js'
import { deriveStatuses, STATUS_LABEL } from '../engine/progress.js'

const MILESTONE_COLORS = ['var(--lavender)', 'var(--yellow)', 'var(--mint)', 'var(--pink)', 'var(--peach)']
const MIN_SCALE = 0.7
const STATUS_ORDER =['locked', 'available', 'in_progress', 'completed']

// Vertical S-curve from the bottom of a prerequisite down to the top of its dependent topic.
function edgePath(e) {
  const dy = Math.min(70, Math.max(24, (e.y2 - e.y1) / 2))
  return `M${e.x1} ${e.y1} C${e.x1} ${e.y1 + dy}, ${e.x2} ${e.y2 - dy}, ${e.x2} ${e.y2}`
}

export default function KnowledgeMapView({ roadmap, onNavigate, onOpenTopic }) {
  const [selectedId, setSelectedId] = useState(null)

  // Layout depends on structure only, so progress never moves a node.
  const layout = useMemo(() => (roadmap ? computeLayout(roadmap) : null), [roadmap?.id])

  // Shrink the map to fit the panel, but never below MIN_SCALE so text stays readable; beyond that it scrolls.
  const scrollRef = useRef(null)
  const [panelW, setPanelW] = useState(0)
  useLayoutEffect(() => {
    const el = scrollRef.current
    if (!el) return undefined
    setPanelW(el.clientWidth)
    const ro = new ResizeObserver(([e]) => setPanelW(Math.round(e.contentRect.width)))
    ro.observe(el)
    return () => ro.disconnect()
  }, [roadmap?.id])
  const scale = layout && panelW ? Math.max(MIN_SCALE, Math.min(1, panelW / layout.width)) : 1
  const overflows = layout && panelW ? layout.width * scale > panelW + 1 : false

  // Bring the current topic into view the first time the map opens.
  const centred = useRef(false)
  useLayoutEffect(() => {
    const el = scrollRef.current
    if (!el || !layout || !panelW || centred.current) return
    centred.current = true
    const cur = layout.nodes[roadmap.progress.currentTopicId]
    if (cur) {
      el.scrollLeft = Math.max(0, (cur.x + NODE_W / 2) * scale - panelW / 2)
      el.scrollTop = Math.max(0, (cur.y + NODE_H / 2) * scale - el.clientHeight / 2)
    }
  }, [panelW])

  if (!roadmap) {
    return (
      <div className="container stack">
        <Card tone="mint">
          <h1>Knowledge Map</h1>
          <p>You have no roadmap yet. Create one on the dashboard and its concepts will appear here as a connected map.</p>
          <Button onClick={() => onNavigate('dashboard')}>Create a roadmap</Button>
        </Card>
      </div>
    )
  }

  const statuses = deriveStatuses(roadmap)
  const topicById = Object.fromEntries(roadmap.topics.map((t) => [t.id, t]))
  const milestoneById = Object.fromEntries(roadmap.milestones.map((m) => [m.id, m]))
  const msIndex = Object.fromEntries(roadmap.milestones.map((m, i) => [m.id, i]))

  const selected = topicById[selectedId] || topicById[roadmap.progress.currentTopicId]
  const unlocks = roadmap.topics.filter((t) => t.prerequisites.includes(selected.id))
  const touching = (e) => e.from === selected.id || e.to === selected.id

  return (
    <div className="container stack">
      <Card tone="mint">
        <div className="row-between">
          <div>
            <h1>Knowledge Map</h1>
            <p style={{ marginBottom: 0 }}>
              <strong>{roadmap.goal}</strong>: {roadmap.topics.length} concepts. Arrows run from a prerequisite to the topic that needs it. The layout stays fixed; only the colours change as you learn.
            </p>
          </div>
          <Button variant="ghost" onClick={() => onNavigate('dashboard')}>Back to dashboard</Button>
        </div>
      </Card>

      <div className="map-layout">
        <div className="map-scroll" ref={scrollRef} tabIndex={0} aria-label="Knowledge map, scrolls horizontally">
          {overflows && <p className="map-hint">Wider than the screen: scroll sideways, and down, to see the whole map.</p>}
          <div style={{ width: layout.width * scale, height: layout.height * scale }}>
          <div className="map-canvas" style={{ width: layout.width, height: layout.height, transform: `scale(${scale})`, transformOrigin: '0 0' }}>
            <svg width={layout.width} height={layout.height} className="map-edges" aria-hidden="true">
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                  <path d="M0 0 L10 5 L0 10 z" fill="#141414" />
                </marker>
              </defs>
              {layout.edges.map((e) => (
                <path key={`${e.from}>${e.to}`} d={edgePath(e)}
                  className={touching(e) ? 'edge edge--hot' : 'edge'} markerEnd="url(#arrow)" />
              ))}
            </svg>
            {roadmap.topics.map((t) => {
              const pos = layout.nodes[t.id]
              const status = statuses[t.id]
              return (
                <button key={t.id} type="button"
                  className={`kn kn--${status}${t.id === selected.id ? ' kn--selected' : ''}`}
                  style={{ left: pos.x, top: pos.y, width: NODE_W, height: NODE_H, '--ms': MILESTONE_COLORS[msIndex[t.milestoneId] % 5] }}
                  aria-pressed={t.id === selected.id}
                  aria-label={`${t.name}, ${STATUS_LABEL[status]}`}
                  onClick={() => setSelectedId(t.id)}>
                  <span className="kn__name">{t.name}</span>
                  <span className="kn__status">{STATUS_LABEL[status]}</span>
                </button>
              )
            })}
          </div>
          </div>
        </div>

        <Card as="aside" className="map-detail" aria-live="polite">
          <div>
            <span className={`pill pill--${statuses[selected.id]}`}>{STATUS_LABEL[statuses[selected.id]]}</span>
            <h2 style={{ marginTop: '.5rem' }}>{selected.name}</h2>
            <p>{selected.objective}</p>
            {statuses[selected.id] === 'locked' ? (
              <p className="notice" style={{ background: 'var(--yellow)' }}>Locked. Complete its prerequisites to unlock the quiz.</p>
            ) : (
              <Button onClick={() => onOpenTopic(selected.id)}>{statuses[selected.id] === 'completed' ? 'Review topic' : 'Study this topic'}</Button>
            )}
          </div>
          <dl className="facts">
            <dt>Milestone</dt>
            <dd>
              <span className="dot" style={{ background: MILESTONE_COLORS[msIndex[selected.milestoneId] % 5] }} />
              {milestoneById[selected.milestoneId].order}. {milestoneById[selected.milestoneId].title}
            </dd>
            <dt>Prerequisites</dt>
            <dd>
              {selected.prerequisites.length ? (
                <ul className="link-list">
                  {selected.prerequisites.map((p) => (
                    <li key={p}><button type="button" className="link-btn" onClick={() => setSelectedId(p)}>{topicById[p].name}</button> ({STATUS_LABEL[statuses[p]].toLowerCase()})</li>
                  ))}
                </ul>
              ) : 'None. A starting topic.'}
            </dd>
            <dt>Unlocks</dt>
            <dd>
              {unlocks.length ? (
                <ul className="link-list">
                  {unlocks.map((u) => (
                    <li key={u.id}><button type="button" className="link-btn" onClick={() => setSelectedId(u.id)}>{u.name}</button></li>
                  ))}
                </ul>
              ) : 'Nothing. A final topic.'}
            </dd>
            <dt>Estimated time</dt>
            <dd>about {selected.estimatedHours} hours</dd>
          </dl>
        </Card>
      </div>

      <Card flat className="legend">
        <strong>Status:</strong>
        {STATUS_ORDER.map((s) => <span key={s} className={`legend__item kn--${s}`}>{STATUS_LABEL[s]}</span>)}
        <strong style={{ marginLeft: '.75rem' }}>Milestones:</strong>
        {roadmap.milestones.map((m, i) => (
          <span key={m.id} className="legend__ms"><span className="dot" style={{ background: MILESTONE_COLORS[i % 5] }} />{m.order}. {m.title}</span>
        ))}
      </Card>
    </div>
  )
}
