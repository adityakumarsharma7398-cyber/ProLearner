import { useState } from 'react'
import Button from './Button.jsx'
import { GOAL_CATEGORIES, LEVELS } from '../data/demo.js'

const INITIAL = {
  goal: '',
  category: GOAL_CATEGORIES[0],
  level: LEVELS[0],
  weeks: 12,
  hoursPerDay: 2,
  notes: '',
}

// Example values for demonstrations; the Full-Stack topics have hand-written notes and quizzes.
const DEMO = { goal: 'Become a full-stack developer', category: GOAL_CATEGORIES[0], level: LEVELS[0], weeks: 12, hoursPerDay: 2, notes: '' }

export default function GoalForm({ onSubmit }) {
  const [form, setForm] = useState(INITIAL)
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ ...form, weeks: Number(form.weeks), hoursPerDay: Number(form.hoursPerDay) })
  }

  return (
    <form onSubmit={handleSubmit} className="form-grid">
      <div className="full">
        <label className="lbl" htmlFor="goal">What do you want to achieve?</label>
        <input id="goal" className="field" required value={form.goal} onChange={set('goal')}
          placeholder="e.g. Become a full-stack developer, crack GATE CSE..." />
      </div>
      <div>
        <label className="lbl" htmlFor="category">Area</label>
        <select id="category" className="field" value={form.category} onChange={set('category')}>
          {GOAL_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>
      <div>
        <label className="lbl" htmlFor="level">Current level</label>
        <select id="level" className="field" value={form.level} onChange={set('level')}>
          {LEVELS.map((l) => <option key={l}>{l}</option>)}
        </select>
      </div>
      <div>
        <label className="lbl" htmlFor="weeks">Target duration (weeks)</label>
        <input id="weeks" type="number" min="1" max="104" className="field" value={form.weeks} onChange={set('weeks')} />
      </div>
      <div>
        <label className="lbl" htmlFor="hours">Study time per day (hours)</label>
        <input id="hours" type="number" min="0.5" max="16" step="0.5" className="field" value={form.hoursPerDay} onChange={set('hoursPerDay')} />
      </div>
      <div className="full">
        <label className="lbl" htmlFor="notes">Preferences (optional)</label>
        <textarea id="notes" className="field" value={form.notes} onChange={set('notes')}
          placeholder="Learning style, topics to focus on or skip..." />
      </div>
      <div className="full">
        <div className="btn-row">
          <Button type="submit">Generate my roadmap</Button>
          <Button type="button" variant="ghost" onClick={() => setForm(DEMO)}>Fill in a Full-Stack demo goal</Button>
        </div>
      </div>
    </form>
  )
}
