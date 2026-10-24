// Single source of truth for progress. Structure (topics, prerequisites) never changes;
// only `roadmap.progress` does, and statuses are always derived from it.

export const STATUS = {
  LOCKED: 'locked',
  AVAILABLE: 'available',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
}

export const STATUS_LABEL = {
  locked: 'Locked',
  available: 'Available',
  in_progress: 'Current',
  completed: 'Completed',
}

export const PASS_MARK = 70
export const XP_PER_TOPIC = 50

export function deriveStatuses(roadmap) {
  const done = new Set(roadmap.progress.completedTopicIds)
  const statuses = {}
  for (const topic of roadmap.topics) {
    if (done.has(topic.id)) statuses[topic.id] = STATUS.COMPLETED
    else if (topic.id === roadmap.progress.currentTopicId) statuses[topic.id] = STATUS.IN_PROGRESS
    else if (topic.prerequisites.every((p) => done.has(p))) statuses[topic.id] = STATUS.AVAILABLE
    else statuses[topic.id] = STATUS.LOCKED
  }
  return statuses
}

/** A topic can be studied and assessed once all its prerequisites are completed. */
export function canAttempt(roadmap, topicId) {
  return deriveStatuses(roadmap)[topicId] !== STATUS.LOCKED
}

export function summarize(roadmap) {
  const statuses = deriveStatuses(roadmap)
  const total = roadmap.topics.length
  const done = roadmap.topics.filter((t) => statuses[t.id] === STATUS.COMPLETED).length
  const milestonesDone = roadmap.milestones.filter((m) => m.topicIds.every((id) => statuses[id] === STATUS.COMPLETED)).length
  return {
    done,
    total,
    percent: total ? Math.round((done / total) * 100) : 0,
    milestonesDone,
    milestonesTotal: roadmap.milestones.length,
    xp: roadmap.progress.xp,
    complete: done === total,
  }
}

/**
 * Records a passed assessment. Idempotent: an already completed (or locked) topic
 * changes nothing and awards no XP. Returns { roadmap, xpAwarded }.
 */
export function completeTopic(roadmap, topicId) {
  const p = roadmap.progress
  if (p.completedTopicIds.includes(topicId) || !canAttempt(roadmap, topicId)) {
    return { roadmap, xpAwarded: 0 }
  }

  const completedTopicIds = [...p.completedTopicIds, topicId]
  const done = new Set(completedTopicIds)

  // The car only moves on when the current topic has been completed.
  let currentTopicId = p.currentTopicId
  if (currentTopicId == null || done.has(currentTopicId)) {
    const at = roadmap.topics.findIndex((t) => t.id === topicId)
    const eligible = (t) => !done.has(t.id) && t.prerequisites.every((x) => done.has(x))
    const order = [...roadmap.topics.slice(at + 1), ...roadmap.topics.slice(0, at)]
    currentTopicId = order.find(eligible)?.id ?? null
  }

  const next = {
    ...roadmap,
    progress: { ...p, completedTopicIds, currentTopicId, xp: p.xp + XP_PER_TOPIC, updatedAt: new Date().toISOString() },
  }
  const statuses = deriveStatuses(next)
  next.topics = next.topics.map((t) => ({ ...t, status: statuses[t.id] }))
  return { roadmap: next, xpAwarded: XP_PER_TOPIC }
}
