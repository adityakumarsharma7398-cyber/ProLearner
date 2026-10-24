import Card from '../components/Card.jsx'
import Button from '../components/Button.jsx'
import GoalForm from '../components/GoalForm.jsx'
import { deriveStatuses, summarize } from '../engine/progress.js'

const STEPS = [
  { tone: 'lavender', title: 'Tell us your goal', text: 'Goal, level, duration and daily study time.' },
  { tone: 'yellow', title: 'Get a roadmap', text: 'A structured plan of topics and prerequisites.' },
  { tone: 'mint', title: 'Study and take quizzes', text: 'Pass a topic quiz to complete its milestone.' },
  { tone: 'pink', title: 'Drive your journey', text: 'Earn XP and move your car down the road.' },
]

function ProgressSummary({ roadmap }) {
  const s = summarize(roadmap)
  const statuses = deriveStatuses(roadmap)
  const current = roadmap.topics.find((t) => statuses[t.id] === 'in_progress')
  return (
    <>
      <h3>Your progress</h3>
      <p className="summary__pct">{s.percent}%</p>
      <div className="bar" role="progressbar" aria-valuenow={s.percent} aria-valuemin="0" aria-valuemax="100" aria-label="Overall progress">
        <div className="bar__fill" style={{ width: `${s.percent}%` }} />
      </div>
      <div className="summary__grid">
        <div><strong>{s.done}/{s.total}</strong><span>topics</span></div>
        <div><strong>{s.milestonesDone}/{s.milestonesTotal}</strong><span>milestones</span></div>
        <div><strong>{s.xp}</strong><span>XP</span></div>
      </div>
      <p className="small summary__now">{current ? <>Now: <strong>{current.name}</strong></> : s.complete ? 'Every topic complete.' : ''}</p>
    </>
  )
}

function RoadmapOverview({ roadmap, justCreated, onNavigate, onOpenTopic, onReset }) {
  const statuses = deriveStatuses(roadmap)
  const { done, total, percent } = summarize(roadmap)
  const next = roadmap.topics.find((t) => statuses[t.id] === 'in_progress') || roadmap.topics.find((t) => statuses[t.id] === 'available')
  const allDone = done === total

  return (
    <Card tone="mint">
      {justCreated && <p className="notice" role="status" style={{ marginTop: 0, marginBottom: '1rem', background: 'var(--white)' }}>Roadmap created and saved on this device.</p>}
      <div className="row-between">
        <div>
          <h2>{roadmap.goal}</h2>
          <p className="small">{roadmap.engine.templateLabel} / {roadmap.level} / {roadmap.weeks} weeks at {roadmap.hoursPerDay} h/day</p>
        </div>
        <Button variant="ghost" onClick={() => onNavigate('map')}>Open Knowledge Map</Button>
      </div>
      <div className="stat-row">
        <span className="pill">{roadmap.milestones.length} milestones</span>
        <span className="pill">{total} topics</span>
        <span className="pill">{done} of {total} done ({percent}%)</span>
        <span className="pill">about {roadmap.pacing.totalHours} study hours</span>
        <span className="pill">XP: {roadmap.progress.xp}</span>
      </div>
      <Card tone="yellow" as="div" className="next-action">
        <h3>Next recommended action</h3>
        {allDone ? (
          <>
            <p><strong>Roadmap complete. Every topic is done.</strong> Retake any quiz to revise, or create a new roadmap below.</p>
            <div className="btn-row">
              <Button onClick={() => onNavigate('journey')}>Open Progress Journey</Button>
              <Button variant="ghost" onClick={() => onNavigate('map')}>Open Knowledge Map</Button>
            </div>
          </>
        ) : (
          <>
            <p><strong>{next.name}</strong>: {next.objective}</p>
            <div className="btn-row">
              <Button onClick={() => onOpenTopic(next.id)}>Study this topic</Button>
              <Button variant="ghost" onClick={() => onNavigate('journey')}>Open Progress Journey</Button>
            </div>
          </>
        )}
      </Card>
      <ol className="ms-list" style={{ marginTop: '1rem' }}>
        {roadmap.milestones.map((m) => {
          const mDone = m.topicIds.filter((id) => statuses[id] === 'completed').length
          return (
            <li key={m.id}>
              <span>{m.order}. {m.title}</span>
              <span className="small">about {m.weeks} wk</span>
              <span className="count">{mDone}/{m.topicIds.length}</span>
            </li>
          )
        })}
      </ol>
      <p className="small" style={{ margin: '1rem 0 0' }}>{roadmap.pacing.note}</p>
      {roadmap.engine.templateNote && <p className="small" style={{ margin: '.5rem 0 0' }}>{roadmap.engine.templateNote}</p>}
      <p className="small" style={{ margin: '.5rem 0 0' }}>{roadmap.engine.label}</p>
      <p style={{ margin: '1rem 0 0' }}>
        <Button variant="ghost" onClick={onReset}>Reset roadmap and progress</Button>
      </p>
    </Card>
  )
}

export default function Dashboard({ roadmap, justCreated, onCreate, onReset, onNavigate, onOpenTopic }) {
  const handleReset = () => {
    if (window.confirm('Delete this roadmap and all progress on this device? This cannot be undone.')) onReset()
  }
  const handleSubmit = (form) => {
    if (roadmap && !window.confirm('This replaces your current roadmap and progress. Continue?')) return
    onCreate(form)
  }

  return (
    <div className="container stack">
      <div className={`hero${roadmap ? ' hero--compact' : ''}`}>
        <Card tone="lavender">
          <div className="hero__badges">
            <span className="pill">Prototype</span>
            <span className="pill">Roadmap / Map / Journey</span>
          </div>
          <h1>Learn anything, <span className="hl">one milestone</span> at a time.</h1>
          <p className="hero__lead">
            ProLearner turns your learning goal into a roadmap, a Knowledge Map of concepts, and a road you drive along as you pass quizzes.
          </p>
          <Button onClick={() => document.getElementById('goal')?.focus()}>{roadmap ? 'Make a new roadmap' : 'Set my goal'}</Button>
        </Card>
        <Card tone="peach" className="summary">
          {roadmap ? <ProgressSummary roadmap={roadmap} /> : (
            <>
              <h3>Your roadmap</h3>
              <p>No roadmap yet. Fill in the form below and we will build one.</p>
              <p style={{ marginBottom: 0 }}><span className="pill">XP: 0</span> <span className="pill">Milestones: 0</span></p>
            </>
          )}
        </Card>
      </div>

      {roadmap ? (
        <RoadmapOverview roadmap={roadmap} justCreated={justCreated} onNavigate={onNavigate} onOpenTopic={onOpenTopic} onReset={handleReset} />
      ) : (
        <div className="grid grid-3" aria-label="How it works">
          {STEPS.map((s, i) => (
            <Card key={s.title} tone={s.tone}>
              <div className="step__num">{i + 1}</div>
              <h3>{s.title}</h3>
              <p style={{ marginBottom: 0 }}>{s.text}</p>
            </Card>
          ))}
        </div>
      )}

      <Card tone="yellow">
        <h2>{roadmap ? 'Create a new roadmap' : 'Start with your goal'}</h2>
        <p className="small" style={{ color: 'var(--ink)' }}>
          Roadmaps are built on this device from structured templates and rules. No AI model is connected yet.
          {roadmap && ' Creating a new one replaces the current roadmap.'}
        </p>
        <Card as="div" flat>
          <GoalForm onSubmit={handleSubmit} />
        </Card>
      </Card>

      <div className="grid grid-2">
        <Card tone="mint">
          <h3>Knowledge Map</h3>
          <p>Concepts and how they depend on each other. Stays fixed as you learn.</p>
          <Button variant="ghost" onClick={() => onNavigate('map')}>Open Knowledge Map</Button>
        </Card>
        <Card tone="pink">
          <h3>Progress Journey</h3>
          <p>A winding road with topic stations. Your car advances when you pass quizzes.</p>
          <Button variant="ghost" onClick={() => onNavigate('journey')}>Open Progress Journey</Button>
        </Card>
      </div>
    </div>
  )
}
