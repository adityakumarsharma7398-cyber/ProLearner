import { LEVELS } from '../data/demo.js'
import { templateForCategory } from './templates.js'
import { deriveStatuses } from './progress.js'

export const SCHEMA_VERSION = 1
export const ENGINE_LABEL = 'Local demo engine: templates and rules. Not live AI.'

const round = (n, step) => Math.round(n / step) * step

function newId() {
  return `rm-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`
}

function sinks(topics) {
  const used = new Set(topics.flatMap((t) => t.prerequisites))
  return topics.filter((t) => !used.has(t.id)).map((t) => t.id)
}

function pacingFor(totalHours, topicCount) {
  const perTopic = totalHours / topicCount
  let note = 'A balanced plan: enough time to study each topic and practise it.'
  if (perTopic < 3) note = 'A tight plan. Consider more weeks or more hours per day, or expect to move quickly.'
  else if (perTopic > 20) note = 'A roomy plan. Use the extra time for practice problems, projects and revision.'
  return { totalHours: Math.round(totalHours), hoursPerTopic: Math.max(0.5, round(perTopic, 0.5)), note }
}

/**
 * Builds a roadmap from the learner's form input.
 * Rules used: template choice by category, topics dropped when the learner's level already covers them,
 * hours spread from weeks x daily hours, and keyword rules on the preferences text.
 */
export function generateRoadmap(input) {
  const goal = input.goal.trim()
  const levelIdx = Math.max(0, LEVELS.indexOf(input.level))
  const template = templateForCategory(input.category, goal)
  const prefs = (input.notes || '').toLowerCase()

  const milestones = []
  const topics = []

  template.milestones.forEach((m) => {
    const kept = m.topics.filter((t) => levelIdx <= (t.tier ?? 3))
    if (!kept.length) return
    const milestoneId = `${template.id}-m-${m.key}`
    milestones.push({ id: milestoneId, title: m.title, summary: m.summary, order: milestones.length + 1, topicIds: [] })
    kept.forEach((t) => {
      const id = `${template.id}-${t.key}`
      topics.push({ id, name: t.name, objective: t.objective, milestoneId, prerequisites: t.prereqs.map((p) => `${template.id}-${p}`) })
      milestones[milestones.length - 1].topicIds.push(id)
    })
  })

  const ids = new Set(topics.map((t) => t.id))
  topics.forEach((t) => { t.prerequisites = t.prerequisites.filter((p) => ids.has(p)) })

  const last = milestones[milestones.length - 1]
  const addExtra = (key, name, objective) => {
    const lastTopics = topics.filter((t) => t.milestoneId === last.id)
    const id = `${template.id}-${key}`
    topics.push({ id, name, objective, milestoneId: last.id, prerequisites: sinks(topics.filter((t) => lastTopics.includes(t) || t.milestoneId === last.id)) })
    last.topicIds.push(id)
  }
  if (/project|hands.?on|build/.test(prefs)) {
    addExtra('capstone', 'Capstone project', `Build one complete project that applies your learning toward "${goal}".`)
  }
  if (/revis|mock|exam|test/.test(prefs) && !topics.some((t) => /mock|revis|exam/i.test(t.name))) {
    addExtra('revision', 'Revision sprint', 'Review every milestone, redo weak topics and self-test before you finish.')
  }

  const totalHours = input.weeks * 7 * input.hoursPerDay
  const pacing = pacingFor(totalHours, topics.length)

  topics.forEach((t, i) => {
    t.order = i + 1
    t.estimatedHours = pacing.hoursPerTopic
    t.quiz = { status: 'placeholder', passMark: 70, questions: [] }
  })
  milestones.forEach((m) => {
    m.weeks = Math.max(0.5, round((input.weeks * m.topicIds.length) / topics.length, 0.5))
  })

  const roadmap = {
    schemaVersion: SCHEMA_VERSION,
    id: newId(),
    createdAt: new Date().toISOString(),
    engine: { type: 'local-template', label: ENGINE_LABEL, templateId: template.id, templateLabel: template.label, templateNote: template.note || null },
    goal,
    category: input.category,
    level: input.level,
    weeks: input.weeks,
    hoursPerDay: input.hoursPerDay,
    preferences: input.notes || '',
    pacing,
    milestones,
    topics,
    progress: { xp: 0, completedTopicIds: [], currentTopicId: topics[0].id },
  }

  const statuses = deriveStatuses(roadmap)
  roadmap.topics.forEach((t) => { t.status = statuses[t.id] })
  return roadmap
}

/** Checks structural integrity: unique ids, known and earlier prerequisites (so no cycles). */
export function validateRoadmap(r) {
  const errors = []
  const index = new Map()
  r.topics.forEach((t, i) => {
    if (index.has(t.id)) errors.push(`duplicate topic id ${t.id}`)
    index.set(t.id, i)
  })
  r.topics.forEach((t, i) => {
    t.prerequisites.forEach((p) => {
      if (!index.has(p)) errors.push(`${t.id} has unknown prerequisite ${p}`)
      else if (index.get(p) >= i) errors.push(`${t.id} has prerequisite ${p} that is not earlier`)
    })
  })
  const ms = new Set(r.milestones.map((m) => m.id))
  r.topics.forEach((t) => { if (!ms.has(t.milestoneId)) errors.push(`${t.id} has unknown milestone`) })
  return errors
}
