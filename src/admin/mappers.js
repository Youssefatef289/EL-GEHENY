import { baseProjects } from '../data/projects'
import { baseServices } from '../data/services'
import { baseBlogPosts } from '../data/blog'
import { baseFounder, baseTeamMembers } from '../data/team'

function toJsonSafe(value) {
  return JSON.parse(JSON.stringify(value))
}

export function projectToRow(project, sortOrder = 0) {
  const payload = toJsonSafe(project)
  return {
    id: project.id,
    title: project.title ?? null,
    location: project.location ?? null,
    status: project.deliveryStatus ?? project.status ?? null,
    progress: project.progress ?? 0,
    description: project.description ?? null,
    features: project.features ?? [],
    cover_url: typeof project.cover === 'string' ? project.cover : '',
    gallery: Array.isArray(project.gallery)
      ? project.gallery.filter((item) => typeof item === 'string')
      : [],
    units: project.units ?? {},
    sort_order: sortOrder,
    payload,
    updated_at: new Date().toISOString(),
  }
}

export function rowToProject(row) {
  const base = baseProjects.find((p) => p.id === row.id)
  const payload = row.payload && typeof row.payload === 'object' ? row.payload : {}
  const merged = base ? { ...base, ...payload, id: row.id } : { ...payload, id: row.id }

  if (row.cover_url) merged.cover = row.cover_url
  else if (base?.cover) merged.cover = base.cover

  if (Array.isArray(row.gallery) && row.gallery.length > 0) merged.gallery = row.gallery
  else if (!merged.gallery?.length && base?.gallery) merged.gallery = base.gallery

  if (row.title) merged.title = row.title
  if (row.location) merged.location = row.location
  if (row.status) merged.deliveryStatus = row.status
  if (row.description) merged.description = row.description
  if (row.features) merged.features = row.features
  if (row.progress != null) merged.progress = row.progress
  if (row.units) merged.units = row.units

  return merged
}

export function serviceToRow(service, sortOrder = 0) {
  const { icon, ...rest } = service
  return {
    id: service.id,
    title: service.title ?? null,
    description: service.description ?? null,
    icon_url: typeof icon === 'string' ? icon : service.id,
    sort_order: sortOrder,
    payload: toJsonSafe(rest),
  }
}

export function rowToService(row) {
  const base = baseServices.find((s) => s.id === row.id)
  const payload = row.payload && typeof row.payload === 'object' ? row.payload : {}
  const merged = base ? { ...base, ...payload, id: row.id } : { ...payload, id: row.id }
  if (base?.icon) merged.icon = base.icon
  if (row.title) merged.title = row.title
  if (row.description) merged.description = row.description
  return merged
}

export function blogToRow(post, sortOrder = 0) {
  return {
    id: post.id,
    title: post.title ?? null,
    content: post.content ?? null,
    excerpt: post.excerpt ?? null,
    cover_url: typeof post.cover === 'string' ? post.cover : '',
    published_at: post.date ?? post.published_at ?? null,
    slug: post.slug ?? post.id,
    sort_order: sortOrder,
    payload: toJsonSafe(post),
    updated_at: new Date().toISOString(),
  }
}

export function rowToBlogPost(row) {
  const base = baseBlogPosts.find((p) => p.id === row.id)
  const payload = row.payload && typeof row.payload === 'object' ? row.payload : {}
  const merged = base ? { ...base, ...payload, id: row.id } : { ...payload, id: row.id }
  if (row.cover_url) merged.cover = row.cover_url
  else if (base?.cover) merged.cover = base.cover
  if (row.published_at) merged.date = row.published_at
  if (row.title) merged.title = row.title
  if (row.excerpt) merged.excerpt = row.excerpt
  if (row.content) merged.content = row.content
  return merged
}

export function serializeTeam(team) {
  return {
    founder: { ...team.founder, image: undefined },
    members: (team.members || []).map(({ image, ...member }) => member),
  }
}

export function deserializeTeam(stored) {
  if (!stored) return null
  const imageById = Object.fromEntries(
    [baseFounder, ...baseTeamMembers].map((member) => [member.id, member.image]),
  )
  const founder = {
    ...baseFounder,
    ...stored.founder,
    image: imageById.founder,
  }
  const members = (stored.members || []).map((member) => ({
    ...baseTeamMembers.find((m) => m.id === member.id),
    ...member,
    image: imageById[member.id] ?? member.image,
  }))
  return { founder, members }
}
