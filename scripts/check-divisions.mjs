import { getProjectUnitDivisions, projects, UNIT_TYPE_KEYS } from '../src/data/projects.js'

const ids = ['j290', 'm75', 'e80', 'm36', 'a149', 'north-orchid-179']
let missing = 0

for (const id of ids) {
  const project = projects.find((p) => p.id === id)
  if (!project) {
    console.log(`${id}: project not found`)
    missing += 1
    continue
  }

  const divisions = getProjectUnitDivisions(project)
  const total = UNIT_TYPE_KEYS.reduce((sum, type) => sum + (divisions[type]?.length ?? 0), 0)
  const empty = UNIT_TYPE_KEYS.filter((type) => !(divisions[type]?.length > 0))

  console.log(`\n${id}: ${total} division image(s)`)
  for (const type of UNIT_TYPE_KEYS) {
    const list = divisions[type] || []
    console.log(`  ${type}: ${list.length}`)
    list.forEach((src, i) => console.log(`    [${i + 1}] ${src}`))
  }

  if (total === 0) {
    console.log('  ⚠ no division images resolved')
    missing += 1
  } else if (empty.length > 0) {
    console.log(`  note: empty types — ${empty.join(', ')}`)
  }
}

if (missing > 0) process.exitCode = 1
