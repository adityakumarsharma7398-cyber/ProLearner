// Deterministic top-to-bottom layered layout for the Knowledge Map.
// Depends ONLY on topic order and prerequisites, never on progress, so the map is stable.
// Prerequisites sit in rows above the topics that depend on them.

export const NODE_W = 184
export const NODE_H = 68
const COL_GAP = 28
const ROW_GAP = 60
const PAD = 24

export function computeLayout(roadmap) {
  const byId = new Map(roadmap.topics.map((t) => [t.id, t]))
  const depth = {}
  roadmap.topics.forEach((t) => {
    depth[t.id] = t.prerequisites.length ? 1 + Math.max(...t.prerequisites.map((p) => depth[p])) : 0
  })

  const rows = []
  roadmap.topics.forEach((t) => {
    ;(rows[depth[t.id]] ||= []).push(t.id)
  })

  const maxCols = Math.max(...rows.map((r) => r.length))
  const slot = NODE_W + COL_GAP
  const nodes = {}

  rows.forEach((row, r) => {
    if (r > 0) {
      // Order each row by the average x of its prerequisites to keep arrows short and untangled.
      const score = (id) => {
        const ps = byId.get(id).prerequisites
        return ps.reduce((s, p) => s + nodes[p].x, 0) / ps.length
      }
      row.sort((a, b) => score(a) - score(b) || byId.get(a).order - byId.get(b).order)
    }
    const offset = ((maxCols - row.length) * slot) / 2
    row.forEach((id, i) => {
      nodes[id] = { x: PAD + offset + i * slot, y: PAD + r * (NODE_H + ROW_GAP) }
    })
  })

  // Arrows leave the bottom of a prerequisite and enter the top of a dependent.
  // Where a node has several arrows on one side they are spread along its edge so they branch cleanly.
  const outgoing = {}
  const incoming = {}
  roadmap.topics.forEach((t) => {
    incoming[t.id] = [...t.prerequisites].sort((a, b) => nodes[a].x - nodes[b].x)
    t.prerequisites.forEach((p) => { (outgoing[p] ||= []).push(t.id) })
  })
  Object.values(outgoing).forEach((list) => list.sort((a, b) => nodes[a].x - nodes[b].x))

  const edges = roadmap.topics.flatMap((t) =>
    incoming[t.id].map((p, i) => {
      const j = outgoing[p].indexOf(t.id)
      return {
        from: p,
        to: t.id,
        x1: nodes[p].x + (NODE_W * (j + 1)) / (outgoing[p].length + 1),
        y1: nodes[p].y + NODE_H,
        x2: nodes[t.id].x + (NODE_W * (i + 1)) / (incoming[t.id].length + 1),
        y2: nodes[t.id].y,
      }
    }),
  )

  return {
    nodes,
    edges,
    width: PAD * 2 + maxCols * NODE_W + (maxCols - 1) * COL_GAP,
    height: PAD * 2 + rows.length * NODE_H + (rows.length - 1) * ROW_GAP,
  }
}
