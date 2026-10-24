// Geometry for the winding Progress Journey road. Pure function of (station count, width).
// A serpentine of rows joined by U-turns; stations sit on the road in roadmap order.

export const ROW_H = 190
const TOP = 120
const TURN_RX = 44
const AMP = 22

function bez(p0, p1, p2, p3, t) {
  const u = 1 - t
  return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3
}
function dbez(p0, p1, p2, p3, t) {
  const u = 1 - t
  return 3 * u * u * (p1 - p0) + 6 * u * t * (p2 - p1) + 3 * t * t * (p3 - p2)
}

export function computeJourney(count, width) {
  const perRow = width < 520 ? 2 : width < 820 ? 3 : 4
  const rows = Math.ceil(count / perRow)
  const xL = TURN_RX + 14
  const xR = width - TURN_RX - 14
  const span = xR - xL

  let d = ''
  const stations = []

  for (let r = 0; r < rows; r++) {
    const dir = r % 2 === 0 ? 1 : -1
    const m = Math.min(perRow, count - r * perRow)
    const y = TOP + r * ROW_H
    const xs = dir > 0 ? xL : xR
    const xe = xs + dir * span * (m / perRow)
    const a = r % 2 === 0 ? AMP : -AMP
    const c1x = xs + (xe - xs) / 3
    const c2x = xe - (xe - xs) / 3

    d += r === 0 ? `M${xs} ${y}` : ''
    d += ` C${c1x} ${y - a} ${c2x} ${y + a} ${xe} ${y}`
    if (r < rows - 1) d += ` A${TURN_RX} ${ROW_H / 2} 0 0 1 ${xe} ${y + ROW_H}`

    for (let k = 0; k < m; k++) {
      const t = (k + 0.5) / m
      const point = (tt) => ({ x: bez(xs, c1x, c2x, xe, tt), y: bez(y, y - a, y + a, y, tt) })
      const at = point(t)
      const tc = Math.max(0.02, t - (0.46 / m))
      const carPos = point(tc)
      const dx = dbez(xs, c1x, c2x, xe, tc)
      const dy = dbez(y, y - a, y + a, y, tc)
      let angle = (Math.atan2(dy, dx) * 180) / Math.PI
      const flip = Math.abs(angle) > 90
      if (flip) angle -= angle > 0 ? 180 : -180
      stations.push({ x: at.x, y: at.y, row: r, car: { x: carPos.x, y: carPos.y, angle, flip } })
    }
  }

  const trees = []
  for (let r = 0; r < rows; r++) {
    for (let j = 0; j < 3; j++) {
      const f = (r * 0.37 + j * 0.31 + 0.12) % 1
      trees.push({ x: xL + span * f, y: TOP + r * ROW_H + ROW_H * 0.58 + (j % 2) * 8 })
    }
  }
  trees.push({ x: 14, y: 40 }, { x: width - 18, y: 56 })

  return { perRow, span, width, height: TOP + (rows - 1) * ROW_H + 120, pathD: d.trim(), stations, trees }
}
