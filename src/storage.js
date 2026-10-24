import { SCHEMA_VERSION } from './engine/generateRoadmap.js'

const KEY = 'prolearner.roadmap.v1'

function looksValid(r) {
  return Boolean(
    r && r.schemaVersion === SCHEMA_VERSION &&
    Array.isArray(r.topics) && r.topics.length &&
    Array.isArray(r.milestones) &&
    r.progress && Array.isArray(r.progress.completedTopicIds)
  )
}

export function loadRoadmap() {
  try {
    const r = JSON.parse(localStorage.getItem(KEY))
    return looksValid(r) ? r : null
  } catch {
    return null
  }
}

export function clearRoadmap() {
  try { localStorage.removeItem(KEY) } catch { /* storage unavailable */ }
}

export function saveRoadmap(roadmap) {
  try { localStorage.setItem(KEY, JSON.stringify(roadmap)) } catch { /* storage unavailable */ }
}
