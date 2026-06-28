// بيانات المشاريع لشركة الجهيني للتطوير العقاري (ثنائية اللغة)

import { company } from './site'
import { getSiteCache } from '../lib/siteDataCache'
import { getData, STORAGE_KEYS } from '../admin/storage'
import { isSupabaseConfigured } from '../lib/supabase'
import j290Cover from '../../images/Elgeheny development_/الجهيني للتطوير العقاري كامل المشاريع/الحي التاني j290/الوجهات_(1).jpg'
import m75Cover from '../../images/Elgeheny development_/الجهيني للتطوير العقاري كامل المشاريع/الحي التالت m75/الوجهات_(1).jpg'
import e80Cover from '../../images/Elgeheny development_/الجهيني للتطوير العقاري كامل المشاريع/الحي الخامس E80/WhatsApp Image 2026-06-03 at 1.12.04 PM.jpeg'
import m36Cover from '../../images/Elgeheny development_/الجهيني للتطوير العقاري كامل المشاريع/الحي الخامس M36/WhatsApp Image 2026-06-03 at 1.15.13 PM.jpeg'
import a149Cover from '../../images/Elgeheny development_/الجهيني للتطوير العقاري كامل المشاريع/الحي التكميلي A149/الحي التكميلي A149.jpg'
import orchid179Cover from '../../images/Elgeheny development_/الجهيني للتطوير العقاري كامل المشاريع/حي شمال الاوركيد 179/الوجهات_(1).jpg'

// تحميل جميع صور المشاريع تلقائياً من مجلد كل مشروع داخل images/projects/<folder>/
const imageModules = import.meta.glob(
  '../../images/projects/*/*.{jpg,jpeg,png,JPG,JPEG,PNG}',
  { eager: true, import: 'default' }
)

const galleries = {}
for (const [path, url] of Object.entries(imageModules)) {
  const match = path.match(/\/projects\/([^/]+)\//)
  if (!match) continue
  const key = match[1]
  if (!galleries[key]) galleries[key] = []
  galleries[key].push({ path, url })
}
for (const key of Object.keys(galleries)) {
  galleries[key] = galleries[key]
    .sort((a, b) => a.path.localeCompare(b.path, undefined, { numeric: true }))
    .map((item) => item.url)
}

const websiteImageModules = import.meta.glob(
  [
    '../../images/Elgeheny development_/ويب سايت_/**/*.{jpg,jpeg,png,JPG,JPEG,PNG}',
    '../../images/ويب سايت_/**/*.{jpg,jpeg,png,JPG,JPEG,PNG}',
  ],
  { eager: true, import: 'default' },
)

const sourceProjectModules = import.meta.glob(
  '../../images/Elgeheny development_/الجهيني للتطوير العقاري كامل المشاريع/**/*.{jpg,jpeg,png,JPG,JPEG,PNG}',
  { eager: true, import: 'default' },
)

const websiteUnitFolderPatterns = {
  j290: /\/J290_\//i,
  m75: /\/M 75\//i,
  e80: /\/E80\//i,
  m36: /\/M 36_/i,
  a149: /\/A 149_\//i,
}

const sourceFolderPatterns = {
  j290: /الحي التاني j290/i,
  m75: /الحي التالت m75/i,
  e80: /الحي الخامس E80/i,
  m36: /الحي الخامس M36/i,
  a149: /الحي التكميلي A149/i,
  orchid179: /شمال الاوركيد 179|حي شمال الاوركيد/i,
}

/** تقسيمات الوحدات — تصميمات 3D بخلفية بيضاء (مجلد ويب سايت) */
const unitDivisionFileMap = {
  j290: {
    ground: ['6.png', '8.png', '7.png'],
    repeated: ['9.png', '11.png', '10.png'],
    roof: ['12.png', '13.png', '14.png'],
  },
  m75: {
    ground: [],
    repeated: [],
    roof: [],
  },
  e80: {
    ground: [],
    repeated: [],
    roof: [],
  },
  m36: {
    ground: [],
    repeated: [],
    roof: [],
  },
  a149: {
    ground: [],
    repeated: [],
    roof: [],
  },
  orchid179: {
    ground: [],
    repeated: [],
    roof: [],
  },
}

/** مخططات الأوتوكاد — مخططات تقسيم الوحدات (مجلد المشاريع الأصلي) */
const unitAutocadFileMap = {
  j290: {
    ground: ['New folder/19.png', 'New folder/21.png', 'New folder/جاردن 150.png'],
    repeated: ['New folder/22.png', 'New folder/23.png', 'New folder/24.png'],
    roof: ['New folder/25.png', 'New folder/26.png', 'New folder/27.png'],
  },
  m75: {
    ground: [],
    repeated: [],
    roof: [],
  },
  e80: {
    ground: [],
    repeated: [],
    roof: [],
  },
  m36: {
    ground: [],
    repeated: [],
    roof: [],
  },
  a149: {
    ground: [],
    repeated: [],
    roof: [],
  },
  orchid179: {
    ground: [],
    repeated: [],
    roof: [],
  },
}

function resolveWebsiteUnitAsset(folder, filename) {
  const pattern = websiteUnitFolderPatterns[folder]
  if (!pattern) return projectImageUrl(folder, filename)
  const entry = Object.entries(websiteImageModules).find(([path]) => {
    const normalized = path.replace(/\\/g, '/')
    return pattern.test(normalized) && normalized.endsWith(`/${filename}`)
  })
  return entry ? entry[1] : projectImageUrl(folder, filename)
}

function resolveSourceUnitAsset(folder, filename) {
  const pattern = sourceFolderPatterns[folder]
  if (!pattern) return null
  const entry = Object.entries(sourceProjectModules).find(([path]) => {
    const normalized = path.replace(/\\/g, '/')
    return pattern.test(normalized) && normalized.endsWith(`/${filename}`)
  })
  return entry ? entry[1] : null
}

function resolveSourceProjectAsset(folder, relativePath) {
  const pattern = sourceFolderPatterns[folder]
  if (!pattern) return null
  const suffix = `/${relativePath.replace(/\\/g, '/')}`
  const entry = Object.entries(sourceProjectModules).find(([path]) => {
    const normalized = path.replace(/\\/g, '/')
    return pattern.test(normalized) && normalized.endsWith(suffix)
  })
  return entry ? entry[1] : null
}

const J290_GALLERY_FILES = [
  'الوجهات_(1).jpg',
  'الوجهات_.jpg',
  'New folder/16.png',
  'New folder/17.png',
  'New folder/18.png',
  'New folder/19.png',
  'New folder/21.png',
  'New folder/22.png',
  'New folder/23.png',
  'New folder/24.png',
  'New folder/25.png',
  'New folder/26.png',
  'New folder/27.png',
  'New folder/29.png',
  'New folder/28.png',
]

const j290Gallery = J290_GALLERY_FILES.map((file) => resolveSourceProjectAsset('j290', file)).filter(Boolean)

const J290_FACADE_FILES = ['الوجهات_(1).jpg', 'الوجهات_.jpg']

const j290Facades = J290_FACADE_FILES.map((file) => resolveSourceProjectAsset('j290', file)).filter(Boolean)

const M75_FACADE_FILES = ['الوجهات_(1).jpg', 'الوجهات_(2).jpg', 'الوجهات_.jpg', 'الوجهات_.png']

const M75_GALLERY_FILES = [
  ...M75_FACADE_FILES,
  'New folder/30.png',
  'New folder/31.png',
  'New folder/32.png',
  'New folder/33.png',
  'New folder/35.png',
  'New folder/36.png',
  'New folder/WhatsApp Image 2026-06-27 at 2.12.47 PM 2.jpeg',
]

const M75_DIVISION_FILES = {
  ground: ['New folder/WhatsApp Image 2026-06-26 at 5.28.26 PM.jpeg'],
  repeated: ['New folder/34.png'],
  roof: ['New folder/WhatsApp Image 2026-06-27 at 2.12.47 PM 2.jpeg'],
}

const m75Facades = M75_FACADE_FILES.map((file) => resolveSourceProjectAsset('m75', file)).filter(Boolean)
const m75Gallery = M75_GALLERY_FILES.map((file) => resolveSourceProjectAsset('m75', file)).filter(Boolean)

const m75Divisions = {
  ground: M75_DIVISION_FILES.ground.map((file) => resolveSourceProjectAsset('m75', file)).filter(Boolean),
  repeated: M75_DIVISION_FILES.repeated.map((file) => resolveSourceProjectAsset('m75', file)).filter(Boolean),
  roof: M75_DIVISION_FILES.roof.map((file) => resolveSourceProjectAsset('m75', file)).filter(Boolean),
}

const E80_FACADE_FILES = ['WhatsApp Image 2026-06-03 at 1.12.04 PM.jpeg']

const E80_GALLERY_FILES = [
  ...E80_FACADE_FILES,
  'New folder/47.png',
  'New folder/48.png',
  'New folder/49.png',
  'New folder/56.png',
  'New folder/55.png',
]

const e80Facades = E80_FACADE_FILES.map((file) => resolveSourceProjectAsset('e80', file)).filter(Boolean)
const e80Gallery = E80_GALLERY_FILES.map((file) => resolveSourceProjectAsset('e80', file)).filter(Boolean)

const E80_DIVISION_FILES = {
  ground: ['New folder/51.png', 'New folder/52.png', 'New folder/50.png'],
  repeated: ['New folder/53.png'],
  roof: [],
}

const e80Divisions = {
  ground: E80_DIVISION_FILES.ground.map((file) => resolveSourceProjectAsset('e80', file)).filter(Boolean),
  repeated: E80_DIVISION_FILES.repeated.map((file) => resolveSourceProjectAsset('e80', file)).filter(Boolean),
  roof: [],
}

const M36_FACADE_FILES = ['WhatsApp Image 2026-06-03 at 1.15.13 PM.jpeg']

const M36_GALLERY_FILES = [
  ...M36_FACADE_FILES,
  'New folder/37.png',
  'New folder/38.png',
  'New folder/39.png',
  'New folder/40.png',
  'New folder/44.png',
  'New folder/45.png',
]

const m36Facades = M36_FACADE_FILES.map((file) => resolveSourceProjectAsset('m36', file)).filter(Boolean)
const m36Gallery = M36_GALLERY_FILES.map((file) => resolveSourceProjectAsset('m36', file)).filter(Boolean)

const M36_DIVISION_FILES = {
  ground: ['New folder/42.png', 'New folder/41.png'],
  repeated: ['New folder/43.png'],
  roof: [],
}

const m36Divisions = {
  ground: M36_DIVISION_FILES.ground.map((file) => resolveSourceProjectAsset('m36', file)).filter(Boolean),
  repeated: M36_DIVISION_FILES.repeated.map((file) => resolveSourceProjectAsset('m36', file)).filter(Boolean),
  roof: [],
}

const A149_FACADE_FILES = ['الحي التكميلي A149.jpg']

const A149_GALLERY_FILES = [
  'الحي التكميلي A149.jpg',
  'New folder/56.png',
  'New folder/57.png',
  'New folder/58.png',
  'New folder/59.png',
  'New folder/63.png',
  'New folder/64.png',
]

const a149Facades = A149_FACADE_FILES.map((file) => resolveSourceProjectAsset('a149', file)).filter(Boolean)
const a149Gallery = A149_GALLERY_FILES.map((file) => resolveSourceProjectAsset('a149', file)).filter(Boolean)

const A149_DIVISION_FILES = {
  ground: ['New folder/61.png'],
  repeated: ['New folder/62.png'],
  roof: ['New folder/60.png'],
}

const a149Divisions = {
  ground: A149_DIVISION_FILES.ground.map((file) => resolveSourceProjectAsset('a149', file)).filter(Boolean),
  repeated: A149_DIVISION_FILES.repeated.map((file) => resolveSourceProjectAsset('a149', file)).filter(Boolean),
  roof: A149_DIVISION_FILES.roof.map((file) => resolveSourceProjectAsset('a149', file)).filter(Boolean),
}

const ORCHID179_FACADE_FILES = [
  'الوجهات_.jpg',
  'الوجهات_(1).jpg',
  'الوجهات_(2).jpg',
  'الوجهات_(3).jpg',
  'الوجهات_(4).jpg',
  'الوجهات_(5).jpg',
]

const ORCHID179_GALLERY_FILES = [
  '2.png',
  '3.png',
  '4.png',
  '5.png',
  '6.png',
  '7.png',
  '8.png',
  '9.png',
  '10.png',
  '11.png',
  '12.png',
  '22.png',
  '23.png',
  '24.png',
  '25.png',
]

const ORCHID179_DIVISION_FILES = {
  ground: ['13.png', '14.png'],
  repeated: ['15.png', '16.png'],
  roof: ['17.png', '18.png'],
}

const orchid179Facades = ORCHID179_FACADE_FILES.map((file) => resolveSourceProjectAsset('orchid179', file)).filter(Boolean)

const orchid179Gallery = ORCHID179_GALLERY_FILES.map((file) => resolveSourceProjectAsset('orchid179', file)).filter(Boolean)

const orchid179Divisions = {
  ground: ORCHID179_DIVISION_FILES.ground.map((file) => resolveSourceProjectAsset('orchid179', file)).filter(Boolean),
  repeated: ORCHID179_DIVISION_FILES.repeated.map((file) => resolveSourceProjectAsset('orchid179', file)).filter(Boolean),
  roof: ORCHID179_DIVISION_FILES.roof.map((file) => resolveSourceProjectAsset('orchid179', file)).filter(Boolean),
}

function resolveProjectFacadeAssets(folder) {
  const pattern = sourceFolderPatterns[folder]
  if (!pattern) return []
  return Object.entries(sourceProjectModules)
    .filter(([path]) => {
      const normalized = path.replace(/\\/g, '/')
      return pattern.test(normalized) && /\/الوجهات[^/]*\.(jpe?g|png)$/i.test(normalized)
    })
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([, url]) => url)
}

export function getProjectFacades(project) {
  if (!project) return []
  if (project.facades?.length) return project.facades
  if (project.id === 'j290' && j290Facades.length > 0) return j290Facades
  if (project.id === 'm75' && m75Facades.length > 0) return m75Facades
  if (project.id === 'e80' && e80Facades.length > 0) return e80Facades
  if (project.id === 'm36' && m36Facades.length > 0) return m36Facades
  if (project.id === 'a149' && a149Facades.length > 0) return a149Facades
  if (project.id === 'north-orchid-179' && orchid179Facades.length > 0) return orchid179Facades
  const folder = projectFolderById[project.id] || project.id
  const autoFacades = resolveProjectFacadeAssets(folder)
  if (autoFacades.length > 0) return autoFacades
  return project.cover ? [project.cover] : []
}

function resolveUnitAssets(folder, fileMap) {
  const map = fileMap[folder] || { ground: [], repeated: [], roof: [] }
  const resolve = (files) =>
    files
      .map((file) => {
        if (file.includes('/')) {
          return resolveSourceProjectAsset(folder, file)
        }
        return resolveWebsiteUnitAsset(folder, file)
      })
      .filter(Boolean)
  return {
    ground: resolve(map.ground),
    repeated: resolve(map.repeated),
    roof: resolve(map.roof),
  }
}

function resolveAutocadAssets(folder, fileMap) {
  const map = fileMap[folder] || { ground: [], repeated: [], roof: [] }
  const resolve = (files) =>
    files
      .map((file) => {
        if (file.includes('/')) {
          return resolveSourceProjectAsset(folder, file)
        }
        return resolveSourceUnitAsset(folder, file) || projectImageUrl(folder, file)
      })
      .filter(Boolean)
  return {
    ground: resolve(map.ground),
    repeated: resolve(map.repeated),
    roof: resolve(map.roof),
  }
}

// معرض صور المشروع حسب اسم مجلده (الصورة الأولى = الغلاف)
const galleryFor = (folder) => galleries[folder] || []

function galleryForProject(folder, { excludePlanFiles = false } = {}) {
  const images = galleryFor(folder)
  if (!excludePlanFiles) return images
  return images.filter((url) => !String(url).includes('plan-'))
}

const projectFolderById = {
  'north-orchid-179': 'orchid179',
}

function projectImageUrl(folder, filename) {
  const entry = Object.entries(imageModules).find(([path]) => {
    const normalized = path.replace(/\\/g, '/')
    return normalized.includes(`/projects/${folder}/`) && normalized.endsWith(`/${filename}`)
  })
  return entry ? entry[1] : null
}

export const UNIT_TYPE_KEYS = ['ground', 'repeated', 'roof']

export const UNIT_TYPE_LABELS = {
  ground: { ar: 'أرضي بحديقة', en: 'Ground with garden' },
  repeated: { ar: 'متكرر', en: 'Repeated floor' },
  roof: { ar: 'روف', en: 'Roof' },
}

export function classifyUnitType(unit) {
  const ar = typeof unit.name === 'object' ? unit.name?.ar : String(unit.name || '')
  const en = typeof unit.name === 'object' ? unit.name?.en : ''
  const text = `${ar} ${en}`.toLowerCase()
  if (/رووف|روف|\broof\b/i.test(text)) return 'roof'
  if (/متكرر|repeated/i.test(text)) return 'repeated'
  if (/أرضي|ارضي|ground|بزمنت|basement|دوبلكس|duplex/i.test(text)) return 'ground'
  if (/الوحدة الأولى|unit 1/i.test(text)) return 'repeated'
  return 'ground'
}

export function groupUnitDetails(unitDetails = []) {
  const groups = { ground: [], repeated: [], roof: [] }
  unitDetails.forEach((unit) => {
    groups[classifyUnitType(unit)].push(unit)
  })
  return groups
}

export function getProjectUnitDivisions(project) {
  if (project?.id === 'm75') return m75Divisions
  if (project?.id === 'e80') return e80Divisions
  if (project?.id === 'm36') return m36Divisions
  if (project?.id === 'a149') return a149Divisions
  if (project?.id === 'north-orchid-179') return orchid179Divisions
  const folder = projectFolderById[project.id] || project.id
  return resolveUnitAssets(folder, unitDivisionFileMap)
}

export function getProjectAutocadPlans(project) {
  const folder = projectFolderById[project.id] || project.id
  return resolveAutocadAssets(folder, unitAutocadFileMap)
}

/** @deprecated use getProjectUnitDivisions */
export function getProjectUnitPlans(project) {
  return getProjectUnitDivisions(project)
}

export function getAllProjectLayoutPlans(project) {
  const divisions = getProjectUnitDivisions(project)
  const autocad = getProjectAutocadPlans(project)
  return UNIT_TYPE_KEYS.flatMap((type) => [
    ...divisions[type].map((src) => ({
      type,
      src,
      variant: 'division',
      label: UNIT_TYPE_LABELS[type],
    })),
    ...autocad[type].map((src) => ({
      type,
      src,
      variant: 'autocad',
      label: UNIT_TYPE_LABELS[type],
    })),
  ])
}

function parseAreaSqm(value) {
  if (!value) return null
  const text = typeof value === 'object' ? value.ar || value.en || '' : String(value)
  const match = text.match(/(\d+)/)
  return match ? Number.parseInt(match[1], 10) : null
}

export function getProjectAreaRange(project, lang) {
  const areas = (project.unitDetails || [])
    .map((unit) => parseAreaSqm(unit.area))
    .filter((n) => Number.isFinite(n))

  if (areas.length === 0) {
    return project.area?.[lang] ?? project.area?.ar ?? ''
  }

  const min = Math.min(...areas)
  const max = Math.max(...areas)

  if (min === max) {
    return lang === 'ar' ? `${min} م²` : `${min} m²`
  }

  return lang === 'ar' ? `من ${min} م² إلى ${max} م²` : `From ${min} m² to ${max} m²`
}

export function getProjectUnitsCount(project) {
  return project.unitsCount ?? 10
}

export function getProjectUnitsLabel(project, lang) {
  const count = getProjectUnitsCount(project)
  if (lang === 'ar') {
    if (count === 1) return 'شقة واحدة'
    if (count === 2) return 'شقتان'
    if (count >= 3 && count <= 10) return `${count} شقق`
    return `${count} شقة`
  }
  return count === 1 ? '1 apartment' : `${count} apartments`
}

export function getProjectUnitTypesSummary(project, lang) {
  const types = project.unitTypes ?? defaultUnitTypes
  return typeof types === 'object' ? types[lang] ?? types.ar : types
}

/** مراحل الإنشاء المعتمدة — تُطابق نسبة الإنجاز المعروضة */
export const CONSTRUCTION_STAGES = [
  { threshold: 25, label: { ar: 'الأساسات والحفر', en: 'Foundations & excavation' } },
  { threshold: 55, label: { ar: 'الهيكل الإنشائي', en: 'Structural works' } },
  { threshold: 85, label: { ar: 'التشطيبات والتجهيزات', en: 'Finishing & MEP' } },
  { threshold: 100, label: { ar: 'التسليم', en: 'Delivery' } },
]

export function getConstructionStageState(progress) {
  return CONSTRUCTION_STAGES.map((stage, index) => {
    const prev = index === 0 ? 0 : CONSTRUCTION_STAGES[index - 1].threshold
    const completed = progress >= stage.threshold
    const active = !completed && progress > prev
    return { ...stage, completed, active }
  })
}

export function getActiveConstructionPhase(progress, delivered = false) {
  if (delivered || progress >= 100) {
    return {
      label: { ar: 'مكتمل — تم التسليم', en: 'Complete — delivered' },
      completed: true,
      active: false,
    }
  }
  const stages = getConstructionStageState(progress)
  return stages.find((s) => s.active) || stages.find((s) => !s.completed) || stages[stages.length - 1]
}

export const projectCategories = [
  { id: 'all', name: { ar: 'كل المشاريع', en: 'All Projects' } },
  { id: 'hay-thani', name: { ar: 'الحي الثاني', en: 'Second District' } },
  { id: 'hay-thalith', name: { ar: 'الحي الثالث', en: 'Third District' } },
  { id: 'hay-khamis', name: { ar: 'الحي الخامس', en: 'Fifth District' } },
  { id: 'hay-takmili', name: { ar: 'الحي التكميلي', en: 'Supplementary District' } },
  { id: 'north-orchid', name: { ar: 'شمال الأوركيد', en: 'North Orchid' } },
]

const defaultFeatures = [
  { ar: 'تصميم معماري عصري', en: 'Modern architectural design' },
  { ar: 'تشطيبات عالية الجودة', en: 'High-quality finishes' },
  { ar: 'موقع متميز بالقاهرة الجديدة', en: 'Prime location in New Cairo' },
  { ar: 'واجهات أنيقة وإضاءة مميزة', en: 'Elegant facades and distinctive lighting' },
  { ar: 'جراج ومداخل منظمة', en: 'Organized garage and entrances' },
  { ar: 'قرب من الخدمات والمحاور', en: 'Close to services and main axes' },
]

const defaultPayment = [
  { label: { ar: 'مقدم تعاقد', en: 'Down payment' }, value: { ar: '10%', en: '10%' } },
  { label: { ar: 'فترة السداد', en: 'Payment period' }, value: { ar: 'حتى 8 سنوات', en: 'Up to 8 years' } },
  { label: { ar: 'التشطيب', en: 'Finishing' }, value: { ar: 'نصف تشطيب', en: 'Semi-finished' } },
]

export const defaultUnitTypes = {
  ar: 'أرضي بحديقة · متكرر · روف',
  en: 'Ground with garden · Repeated · Roof',
}

// مواصفات التسليم المعتمدة لشركة الجهيني (موحّدة لجميع المشاريع)
const defaultDeliverySpecs = [
  { ar: 'انتر كم', en: 'Intercom' },
  { ar: 'جراج خاص', en: 'Private garage' },
  { ar: 'أبواب مصفحة', en: 'Armored doors' },
  { ar: 'مصاعد مستوردة', en: 'Imported elevators' },
  { ar: 'نصف تشطيب أو تشطيب كامل', en: 'Semi or full finishing' },
  { ar: 'دش مركزي', en: 'Central satellite dish' },
  { ar: 'سباكة بمواصفات معتمدة', en: 'Plumbing to approved specs' },
  { ar: 'أسقف فلات سلاب', en: 'Flat-slab ceilings' },
  { ar: 'سلالم من أرقى أنواع الرخام', en: 'Stairs in finest marble' },
  { ar: 'مداخل من أجود أنواع الرخام', en: 'Entrances in finest marble' },
  { ar: 'عزل مائي وحراري للأسطح', en: 'Waterproof & thermal roof insulation' },
  { ar: 'تشطيب الواجهات بأفضل المواد', en: 'Facades finished with premium materials' },
  { ar: 'تأسيس كهرباء معتمد', en: 'Certified electrical setup' },
  { ar: 'تأسيس صرف وحوامل تكييف', en: 'Drainage & A/C mount setup' },
  { ar: 'قطاعات ألومنيوم عازلة للضوضاء والأتربة', en: 'Aluminum sections insulating noise & dust' },
]

// مميزات الحي الخامس (مشتركة بين مشاريع الحي الخامس)
const fifthDistrictHighlights = [
  {
    title: { ar: 'الموقع الاستراتيجي (قلب التجمع)', en: 'Strategic location (heart of the Settlement)' },
    desc: {
      ar: 'موقع ذهبي يتوسط أهم معالم القاهرة الجديدة: يحده شمالاً طريق السويس مباشرة (سهولة الوصول للعاصمة الإدارية والشروق)، وجنوباً محور محمد بن زايد الشمالي، وشرقاً ماونتن فيو iCity وهايد بارك، وغرباً منطقة النوادي الكبرى (بلاتينيوم، وادي دجلة، والنادي الأهلي).',
      en: "A golden location at the center of New Cairo's key landmarks: bordered north by Suez Road (easy access to the New Capital and El-Shorouk), south by the Mohamed Bin Zayed North axis, east by Mountain View iCity and Hyde Park, and west by the major clubs zone (Platinum, Wadi Degla, and Al-Ahly).",
    },
  },
  {
    title: { ar: 'القرب من الفيو زون (View Zone)', en: 'Close to the View Zone' },
    desc: {
      ar: 'يطل الحي الخامس مباشرة على أكبر منطقة خدمات وخضرة في بيت الوطن (View Zone) التي تضم حدائق ومراكز تجارية ومدارس، مما يمنح وحداته إطلالات مفتوحة ومناخًا نقيًا.',
      en: "The Fifth District overlooks Beit El-Watan's largest services and green area (the View Zone), with parks, commercial centers, and schools, giving its units open views and clean air.",
    },
  },
  {
    title: { ar: 'الكثافة السكانية المنخفضة', en: 'Low population density' },
    desc: {
      ar: 'تخطيط عمراني يعتمد على (أرضي + 3 أدوار مكررة) فقط، مما يقلل الزحام المروري ويوفر خصوصية وهدوءًا عاليًا للسكان.',
      en: 'An urban plan of only (ground + 3 repeated floors), reducing traffic and offering residents high privacy and quiet.',
    },
  },
  {
    title: { ar: 'بنية تحتية متطورة', en: 'Advanced infrastructure' },
    desc: {
      ar: 'بنية تحتية حديثة تشمل شبكات صرف صحي وكهرباء مستقلة، ومسارات ألياف ضوئية (Fiber Optics) لسرعة إنترنت عالية، وشوارع واسعة وتنسيق حضاري يمنع التكدس.',
      en: 'Modern infrastructure with independent sewage and electricity networks, fiber-optic routes for high internet speed, wide streets, and orderly planning that prevents congestion.',
    },
  },
  {
    title: { ar: 'قيمة استثمارية عالية', en: 'High investment value' },
    desc: {
      ar: 'الحي الخامس هو الأسرع في معدلات التنفيذ، وقربه من العاصمة الإدارية والنوادي يجعل الطلب عليه (سكنًا أو إيجارًا) في تزايد مستمر، مما يضمن عائدًا قويًا على الاستثمار.',
      en: 'The Fifth District has the fastest construction pace, and its proximity to the Capital and clubs keeps demand (for living or rent) rising, ensuring a strong return on investment.',
    },
  },
]

const baseProjects = [
  {
    id: 'j290',
    title: { ar: 'J290 - الحي الثاني', en: 'J290 - Second District' },
    category: 'hay-thani',
    categoryName: { ar: 'بيت الوطن - الحي الثاني', en: 'Beit El-Watan - Second District' },
    location: { ar: 'بيت الوطن، الحي الثاني، القاهرة الجديدة', en: 'Beit El-Watan, Second District, New Cairo' },
    type: { ar: 'مشروع سكني', en: 'Residential project' },
    area: { ar: 'من 120 م² إلى 187 م²', en: 'From 120 m² to 187 m²' },
    unitsCount: 15,
    units: { ar: '15 شقة', en: '15 apartments' },
    progress: 88,
    statusKey: 'in-progress',
    deliveryStatus: { ar: 'قيد التسليم', en: 'Under delivery' },
    unitTypes: defaultUnitTypes,
    cover: j290Cover,
    gallery: j290Gallery.length > 0 ? j290Gallery : [j290Cover],
    shortDescription: {
      ar: 'مشروع سكني فاخر في بيت الوطن بواجهات كلاسيكية أنيقة وإضاءة مميزة.',
      en: 'A luxury residential project in Beit El-Watan with elegant classic facades and distinctive lighting.',
    },
    description: {
      ar: 'مشروع سكني متميز في الحي الثاني ببيت الوطن (القطعة 290 ز)، تجمع بين الطابع الكلاسيكي الفاخر والتشطيبات الحديثة، في موقع حيوي قريب من الخدمات والمحاور الرئيسية بالقاهرة الجديدة.',
      en: 'A distinctive residential building in the Second District of Beit El-Watan (Plot 290-Z), combining a luxurious classic character with modern finishes, in a vibrant location close to services and main axes in the New Cairo.',
    },
    features: defaultFeatures,
    payment: defaultPayment,
    deliverySpecs: defaultDeliverySpecs,
    locationFeatures: {
      intro: {
        ar: 'لوكيشن مميز جدًا بالحي الثاني، بالقرب من منطقة الخدمات والطرق الرئيسية والفرعية.',
        en: 'A prime location in the Second District, close to the services area and the main and secondary roads.',
      },
      points: [
        { ar: 'التسعين الشمالي', en: 'North 90th Street' },
        { ar: 'شارع النوادي', en: 'Clubs Street' },
        { ar: 'طريق السويس', en: 'Suez Road' },
        { ar: 'الطريق الدائري الأوسطي', en: 'Middle Ring Road' },
      ],
    },
    unitDetails: [
      {
        name: { ar: 'نموذج أرضي – يمين الواجهة (أمامي)', en: 'Ground model – right facade (front)' },
        area: { ar: '125 م²', en: '125 m²' },
        extra: { ar: 'جاردن 70 م²', en: '70 m² garden' },
        status: { ar: 'تحت الإنشاء', en: 'Under construction' },
        rooms: [
          { name: { ar: 'ريسبشن (2) قطع', en: 'Reception (2 pieces)' }, dim: '6.5 × 6.5' },
          { name: { ar: 'مطبخ', en: 'Kitchen' }, dim: '4.10 × 2.5' },
          { name: { ar: 'حمام', en: 'Bathroom' }, dim: '1 × 2.80' },
          { name: { ar: 'حمام', en: 'Bathroom' }, dim: '2.28 × 2.04' },
          { name: { ar: 'غرفة نوم', en: 'Bedroom' }, dim: '3.5 × 3.60' },
          { name: { ar: 'غرفة نوم', en: 'Bedroom' }, dim: '3.5 × 3.80' },
        ],
      },
      {
        name: { ar: 'نموذج أرضي – يسار الواجهة (أمامي)', en: 'Ground model – left facade (front)' },
        area: { ar: '140 م²', en: '140 m²' },
        extra: { ar: 'جاردن 100 م²', en: '100 m² garden' },
        status: { ar: 'تحت الإنشاء', en: 'Under construction' },
        rooms: [
          { name: { ar: 'ريسبشن (3) قطع', en: 'Reception (3 pieces)' }, dim: '6.5 × 6.5' },
          { name: { ar: 'مطبخ', en: 'Kitchen' }, dim: '4.10 × 2.5' },
          { name: { ar: 'حمام', en: 'Bathroom' }, dim: '1 × 2.80' },
          { name: { ar: 'حمام', en: 'Bathroom' }, dim: '1.60 × 2' },
          { name: { ar: 'حمام', en: 'Bathroom' }, dim: '1.5 × 2' },
          { name: { ar: 'غرفة نوم', en: 'Bedroom' }, dim: '3.5 × 3.60' },
          { name: { ar: 'غرفة نوم', en: 'Bedroom' }, dim: '3.5 × 4.22' },
          { name: { ar: 'غرفة معيشة', en: 'Living room' }, dim: '3.22 × 3.20' },
        ],
      },
      {
        name: { ar: 'نموذج أرضي – خلفي الواجهة', en: 'Ground model – rear facade' },
        area: { ar: '125 م²', en: '125 m²' },
        extra: { ar: 'جاردن 150 م²', en: '150 m² garden' },
        status: { ar: 'تحت الإنشاء', en: 'Under construction' },
        rooms: [
          { name: { ar: 'ريسبشن (2) قطع', en: 'Reception (2 pieces)' }, dim: '6.10 × 5.5' },
          { name: { ar: 'مطبخ', en: 'Kitchen' }, dim: '2.5 × 3' },
          { name: { ar: 'حمام', en: 'Bathroom' }, dim: '1.80 × 2.60' },
          { name: { ar: 'غرفة نوم', en: 'Bedroom' }, dim: '3.5 × 3.80' },
          { name: { ar: 'غرفة نوم', en: 'Bedroom' }, dim: '3.5 × 3.40' },
          { name: { ar: 'غرفة نوم', en: 'Bedroom' }, dim: '3.5 × 3.82' },
        ],
      },
      {
        name: { ar: 'نموذج متكرر – يمين الواجهة', en: 'Repeated model – right facade' },
        area: { ar: '170 م²', en: '170 m²' },
        status: { ar: 'تحت الإنشاء', en: 'Under construction' },
        rooms: [
          { name: { ar: 'ريسبشن (3) قطع', en: 'Reception (3 pieces)' }, dim: '9.5 × 7.82' },
          { name: { ar: 'مطبخ', en: 'Kitchen' }, dim: '3.80 × 2.40' },
          { name: { ar: 'حمام', en: 'Bathroom' }, dim: '1 × 2.5' },
          { name: { ar: 'حمام', en: 'Bathroom' }, dim: '2.04 × 2.28' },
          { name: { ar: 'غرفة نوم', en: 'Bedroom' }, dim: '3.80 × 3.5' },
          { name: { ar: 'غرفة نوم', en: 'Bedroom' }, dim: '3.64 × 3.60' },
          { name: { ar: 'غرفة نوم', en: 'Bedroom' }, dim: '3.5 × 3.80' },
          { name: { ar: 'تراس', en: 'Terrace' }, dim: '1.38 × 4.30' },
          { name: { ar: 'تراس', en: 'Terrace' }, dim: '1.38 × 3.50' },
        ],
      },
      {
        name: { ar: 'نموذج متكرر – يسار الواجهة', en: 'Repeated model – left facade' },
        area: { ar: '187 م²', en: '187 m²' },
        status: { ar: 'تحت الإنشاء', en: 'Under construction' },
        rooms: [
          { name: { ar: 'ريسبشن (3) قطع', en: 'Reception (3 pieces)' }, dim: '10.43 × 7.82' },
          { name: { ar: 'مطبخ', en: 'Kitchen' }, dim: '3.80 × 2.40' },
          { name: { ar: 'حمام', en: 'Bathroom' }, dim: '1 × 2.23' },
          { name: { ar: 'حمام', en: 'Bathroom' }, dim: '2 × 2.40' },
          { name: { ar: 'حمام', en: 'Bathroom' }, dim: '1.5 × 2.40' },
          { name: { ar: 'غرفة نوم', en: 'Bedroom' }, dim: '3.60 × 3.5' },
          { name: { ar: 'غرفة نوم', en: 'Bedroom' }, dim: '3.60 × 4.52' },
          { name: { ar: 'غرفة نوم', en: 'Bedroom' }, dim: '3.5 × 4.64' },
          { name: { ar: 'غرفة معيشة', en: 'Living room' }, dim: '3.12 × 3.22' },
          { name: { ar: 'تراس', en: 'Terrace' }, dim: '1.38 × 4.30' },
          { name: { ar: 'تراس', en: 'Terrace' }, dim: '1.38 × 3.50' },
        ],
      },
      {
        name: { ar: 'نموذج متكرر – خلفي الواجهة', en: 'Repeated model – rear facade' },
        area: { ar: '156 م²', en: '156 m²' },
        status: { ar: 'تحت الإنشاء', en: 'Under construction' },
        rooms: [
          { name: { ar: 'ريسبشن (2) قطع', en: 'Reception (2 pieces)' }, dim: '5.22 × 6.5' },
          { name: { ar: 'مطبخ', en: 'Kitchen' }, dim: '2.5 × 3' },
          { name: { ar: 'حمام', en: 'Bathroom' }, dim: '1.76 × 2.60' },
          { name: { ar: 'حمام', en: 'Bathroom' }, dim: '1.80 × 0.93' },
          { name: { ar: 'غرفة نوم', en: 'Bedroom' }, dim: '3.5 × 3.80' },
          { name: { ar: 'غرفة نوم', en: 'Bedroom' }, dim: '3.70 × 4.20' },
          { name: { ar: 'غرفة نوم', en: 'Bedroom' }, dim: '4.20 × 3.82' },
          { name: { ar: 'تراس', en: 'Terrace' }, dim: '4.20 × 1' },
        ],
      },
      {
        name: { ar: 'نموذج رابع رووف – أمامي يمين الواجهة', en: 'Fourth-floor roof – front right facade' },
        area: { ar: '165 م²', en: '165 m²' },
        extra: { ar: 'تراس 45 م²', en: '45 m² terrace' },
        status: { ar: 'تحت الإنشاء', en: 'Under construction' },
        rooms: [
          { name: { ar: 'ريسبشن قطعتين', en: 'Reception (2 pieces)' } },
          { name: { ar: 'مطبخ', en: 'Kitchen' } },
          { name: { ar: 'حمام', en: 'Bathroom' } },
          { name: { ar: '3 غرف نوم', en: '3 bedrooms' } },
          { name: { ar: 'تراس مكشوف', en: 'Open terrace' } },
          { name: { ar: 'تراس', en: 'Terrace' } },
        ],
      },
      {
        name: { ar: 'نموذج رابع رووف', en: 'Fourth-floor roof' },
        area: { ar: '125 م²', en: '125 m²' },
        status: { ar: 'تحت الإنشاء', en: 'Under construction' },
        rooms: [
          { name: { ar: 'ريسبشن قطعتين', en: 'Reception (2 pieces)' } },
          { name: { ar: 'مطبخ', en: 'Kitchen' } },
          { name: { ar: 'حمام', en: 'Bathroom' } },
          { name: { ar: 'غرفتين نوم', en: '2 bedrooms' } },
          { name: { ar: 'تراس', en: 'Terrace' } },
        ],
      },
      {
        name: { ar: 'نموذج رابع رووف – خلفي الواجهة', en: 'Fourth-floor roof – rear facade' },
        area: { ar: '120 م²', en: '120 m²' },
        extra: { ar: 'تراس 65 م²', en: '65 m² terrace' },
        status: { ar: 'تحت الإنشاء', en: 'Under construction' },
        rooms: [
          { name: { ar: 'ريسبشن قطعتين', en: 'Reception (2 pieces)' } },
          { name: { ar: 'مطبخ', en: 'Kitchen' } },
          { name: { ar: 'حمام', en: 'Bathroom' } },
          { name: { ar: 'غرفتين نوم', en: '2 bedrooms' } },
          { name: { ar: 'تراس', en: 'Terrace' } },
        ],
      },
    ],
  },
  {
    id: 'm75',
    title: { ar: 'M75 - الحي الثالث', en: 'M75 - Third District' },
    category: 'hay-thalith',
    categoryName: { ar: 'بيت الوطن - الحي الثالث', en: 'Beit El-Watan - Third District' },
    location: { ar: 'بيت الوطن، الحي الثالث، القاهرة الجديدة', en: 'Beit El-Watan, Third District, New Cairo' },
    type: { ar: 'مشروع سكني', en: 'Residential project' },
    area: { ar: 'من 225 م² إلى 250 م²', en: 'From 225 m² to 250 m²' },
    units: { ar: '10 شقق', en: '10 apartments' },
    progress: 72,
    statusKey: 'in-progress',
    deliveryStatus: { ar: 'قيد التسليم', en: 'Under delivery' },
    unitTypes: { ar: 'أرضي بحديقة · متكرر · روف · دوبلكس على حديقة', en: 'Ground with garden · Repeated · Roof · Garden duplex' },
    cover: m75Cover,
    gallery: m75Gallery.length > 0 ? m75Gallery : [m75Cover],
    facades: m75Facades.length > 0 ? m75Facades : [m75Cover],
    unitDetails: [
      {
        name: { ar: 'نموذج أرضي – يمين الواجهة', en: 'Ground model – right facade' },
        area: { ar: '225 م²', en: '225 m²' },
        extra: { ar: 'جاردن 60 م²', en: '60 m² garden' },
        status: { ar: 'تحت الإنشاء', en: 'Under construction' },
        rooms: [
          { name: { ar: 'ريسبشن (2) قطع', en: 'Reception (2 pieces)' } },
          { name: { ar: 'مطبخ', en: 'Kitchen' } },
          { name: { ar: 'ليفينج روم', en: 'Living room' } },
          { name: { ar: 'حمام', en: 'Bathroom' } },
          { name: { ar: 'حمام', en: 'Bathroom' } },
          { name: { ar: 'غرفة نوم', en: 'Bedroom' } },
          { name: { ar: 'غرفة نوم', en: 'Bedroom' } },
          { name: { ar: 'غرفة نوم', en: 'Bedroom' } },
          { name: { ar: 'دريسنج روم', en: 'Dressing room' } },
          { name: { ar: 'حديقة خاصة', en: 'Private garden' } },
        ],
      },
      {
        name: { ar: 'نموذج متكرر – يمين الواجهة', en: 'Repeated model – right facade' },
        area: { ar: '250 م²', en: '250 m²' },
        status: { ar: 'تحت الإنشاء', en: 'Under construction' },
        rooms: [
          { name: { ar: 'ريسبشن (3) قطع', en: 'Reception (3 pieces)' } },
          { name: { ar: 'مطبخ', en: 'Kitchen' } },
          { name: { ar: 'ليفينج روم', en: 'Living room' } },
          { name: { ar: 'حمام', en: 'Bathroom' } },
          { name: { ar: 'حمام', en: 'Bathroom' } },
          { name: { ar: 'حمام', en: 'Bathroom' } },
          { name: { ar: 'غرفة نوم', en: 'Bedroom' } },
          { name: { ar: 'غرفة نوم', en: 'Bedroom' } },
          { name: { ar: 'غرفة نوم', en: 'Bedroom' } },
          { name: { ar: 'دريسنج روم', en: 'Dressing room' } },
          { name: { ar: 'تراس', en: 'Terrace' } },
        ],
      },
    ],
    shortDescription: {
      ar: 'وحدات سكنية بتصميم عصري في الحي الثالث ببيت الوطن، مع توفر نموذج دوبلكس على حديقة.',
      en: 'Residential units with a modern design in the Third District of Beit El-Watan, including a garden duplex model.',
    },
    description: {
      ar: 'مشروع سكني في الحي الثالث ببيت الوطن يقدم وحدات بمساحات متنوعة وتشطيبات راقية، مع توفر نموذج دوبلكس على حديقة، بتصميم معماري يجمع بين الأناقة والعملية في موقع مميز.',
      en: 'A residential project in the Third District of Beit El-Watan offering units of various sizes with elegant finishes, including a garden duplex model, with an architectural design combining elegance and practicality in a prime location.',
    },
    features: defaultFeatures,
    payment: defaultPayment,
    deliverySpecs: defaultDeliverySpecs,
  },
  {
    id: 'e80',
    title: { ar: 'E80 - الحي الخامس', en: 'E80 - Fifth District' },
    category: 'hay-khamis',
    categoryName: { ar: 'بيت الوطن - الحي الخامس', en: 'Beit El-Watan - Fifth District' },
    location: { ar: 'بيت الوطن، الحي الخامس، القاهرة الجديدة', en: 'Beit El-Watan, Fifth District, New Cairo' },
    type: { ar: 'مشروع سكني', en: 'Residential project' },
    area: { ar: 'من 130 م² إلى 300 م²', en: 'From 130 m² to 300 m²' },
    units: { ar: '10 شقق', en: '10 apartments' },
    progress: 100,
    statusKey: 'delivered',
    deliveryStatus: { ar: 'استلام فوري', en: 'Immediate delivery' },
    unitTypes: defaultUnitTypes,
    cover: e80Cover,
    gallery: e80Gallery.length > 0 ? e80Gallery : [e80Cover],
    facades: e80Facades.length > 0 ? e80Facades : [e80Cover],
    shortDescription: {
      ar: 'تصميمات أوروبية ذكية ومبتكرة في الحي الخامس ببيت الوطن — استلام فوري.',
      en: 'Smart, innovative European designs in the Fifth District of Beit El-Watan — immediate delivery.',
    },
    description: {
      ar: 'مشروع سكني بتصميمات أوروبية ذكية ومبتكرة في الحي الخامس ببيت الوطن (القطعة E80)، بمساحات تبدأ من 130 م² وحتى دوبلكس 300 م²، في لوكيشن مميز جدًا الأقرب للخدمات والطرق الرئيسية، والاستلام فوري.',
      en: 'A residential project with smart, innovative European designs in the Fifth District of Beit El-Watan (Plot E80), with areas from 130 m² up to a 300 m² duplex, in a prime location closest to services and main roads, with immediate delivery.',
    },
    features: defaultFeatures,
    payment: defaultPayment,
    deliverySpecs: defaultDeliverySpecs,
    locationFeatures: {
      tagline: { ar: 'خامس نمرة من بالم هيلز', en: 'Fifth plot from Palm Hills' },
      intro: {
        ar: 'يُعد الحي الخامس من أرقى أحياء بيت الوطن ويُطلق عليه «حي القصور» أو «حي الفيلات» لانخفاض الكثافة السكانية وتميّز تصميمه المعماري. لوكيشن مميز جدًا، الأقرب للطرق الرئيسية والفرعية والخدمات.',
        en: 'The Fifth District is among the finest in Beit El-Watan — nicknamed the "Palaces" or "Villas" district for its low density and distinctive architecture. A prime location, closest to main and secondary roads and services.',
      },
      points: [
        { ar: 'التسعين الشمالي', en: 'North 90th Street' },
        { ar: 'شارع النوادي', en: 'Clubs Street' },
        { ar: 'محور محمد بن زايد', en: 'Mohamed Bin Zayed Axis' },
        { ar: 'الطريق الدائري الأوسطي', en: 'Middle Ring Road' },
      ],
      highlights: fifthDistrictHighlights,
    },
    unitDetails: [
      {
        name: { ar: 'نموذج أرضي – يمين', en: 'Ground model – right' },
        area: { ar: '170 م²', en: '170 m²' },
        extra: { ar: 'جاردن 80 م²', en: '80 m² garden' },
        status: { ar: 'استلام فوري', en: 'Immediate delivery' },
        rooms: [
          { name: { ar: 'ريسبشن قطعتين', en: 'Reception (2 pieces)' } },
          { name: { ar: 'مطبخ', en: 'Kitchen' } },
          { name: { ar: 'حمامان', en: '2 bathrooms' } },
          { name: { ar: '3 غرف نوم', en: '3 bedrooms' } },
          { name: { ar: 'دريسنج روم', en: 'Dressing room' } },
          { name: { ar: 'حديقة خاصة', en: 'Private garden' } },
          { name: { ar: 'تراس', en: 'Terrace' } },
        ],
      },
      {
        name: { ar: 'نموذج متكرر', en: 'Repeated model' },
        area: { ar: '220 م²', en: '220 m²' },
        status: { ar: 'استلام فوري', en: 'Immediate delivery' },
        rooms: [
          { name: { ar: 'ريسبشن (3) قطع', en: 'Reception (3 pieces)' } },
          { name: { ar: 'مطبخ', en: 'Kitchen' } },
          { name: { ar: 'ليفينج روم', en: 'Living room' } },
          { name: { ar: '3 حمامات', en: '3 bathrooms' } },
          { name: { ar: '3 غرف نوم', en: '3 bedrooms' } },
          { name: { ar: 'تراس', en: 'Terrace' } },
        ],
      },
      {
        name: { ar: 'نموذج يمين بزمنت', en: 'Right basement model' },
        area: { ar: '130 م²', en: '130 m²' },
        extra: { ar: 'جاردن 80 م²', en: '80 m² garden' },
        status: { ar: 'استلام فوري', en: 'Immediate delivery' },
        rooms: [
          { name: { ar: 'ريسبشن', en: 'Reception' } },
          { name: { ar: 'مطبخ', en: 'Kitchen' } },
          { name: { ar: 'حمام', en: 'Bathroom' } },
          { name: { ar: '3 غرف نوم', en: '3 bedrooms' } },
          { name: { ar: 'حديقة خاصة', en: 'Private garden' } },
        ],
      },
      {
        name: { ar: 'نموذج دوبلكس (بزمنت 130 م² + أرضي 170 م²)', en: 'Duplex model (basement 130 m² + ground 170 m²)' },
        area: { ar: '300 م²', en: '300 m²' },
        extra: { ar: 'جاردن 160 م²', en: '160 m² garden' },
        status: { ar: 'استلام فوري', en: 'Immediate delivery' },
        rooms: [
          { name: { ar: 'ريسبشن (4) قطع', en: 'Reception (4 pieces)' } },
          { name: { ar: 'مطبخان', en: '2 kitchens' } },
          { name: { ar: 'ليفينج روم', en: 'Living room' } },
          { name: { ar: '3 حمامات', en: '3 bathrooms' } },
          { name: { ar: '5 غرف نوم', en: '5 bedrooms' } },
          { name: { ar: 'دريسنج روم', en: 'Dressing room' } },
          { name: { ar: 'حديقة خاصة', en: 'Private garden' } },
        ],
      },
    ],
  },
  {
    id: 'm36',
    title: { ar: 'M36 - الحي الخامس', en: 'M36 - Fifth District' },
    category: 'hay-khamis',
    categoryName: { ar: 'الحي الخامس', en: 'Fifth District' },
    location: { ar: 'الحي الخامس، القاهرة الجديدة، القاهرة الجديدة', en: 'Fifth District, New Cairo, New Cairo' },
    type: { ar: 'مشروع سكني', en: 'Residential project' },
    area: { ar: 'من 190 م² إلى 220 م²', en: 'From 190 m² to 220 m²' },
    units: { ar: '10 شقق', en: '10 apartments' },
    progress: 100,
    statusKey: 'delivered',
    deliveryStatus: { ar: 'استلام فوري', en: 'Immediate delivery' },
    unitTypes: defaultUnitTypes,
    cover: m36Cover,
    gallery: m36Gallery.length > 0 ? m36Gallery : [m36Cover],
    facades: m36Facades.length > 0 ? m36Facades : [m36Cover],
    shortDescription: {
      ar: 'تصميمات أوروبية ذكية ومبتكرة في الحي الخامس ببيت الوطن — استلام فوري.',
      en: 'Smart, innovative European designs in the Fifth District of Beit El-Watan — immediate delivery.',
    },
    description: {
      ar: 'مشروع سكني بتصميمات أوروبية ذكية ومبتكرة في الحي الخامس ببيت الوطن (القطعة M36)، بمساحات تبدأ من 190 م² وحتى 220 م²، في لوكيشن مميز جدًا الأقرب للفيو زون والخدمات والطرق الرئيسية، والاستلام فوري.',
      en: 'A residential project with smart, innovative European designs in the Fifth District of Beit El-Watan (Plot M36), with areas from 190 m² up to 220 m², in a prime location closest to the View Zone, services, and main roads, with immediate delivery.',
    },
    features: defaultFeatures,
    payment: defaultPayment,
    deliverySpecs: defaultDeliverySpecs,
    locationFeatures: {
      tagline: { ar: 'خامس نمرة من الفيو زون', en: 'Fifth plot from the View Zone' },
      intro: {
        ar: 'يُعد الحي الخامس من أرقى أحياء بيت الوطن ويُطلق عليه «حي القصور» أو «حي الفيلات» لانخفاض الكثافة السكانية وتميّز تصميمه المعماري. لوكيشن مميز جدًا، الأقرب للفيو زون والطرق الرئيسية والفرعية والمدارس والجامعات والنوادي.',
        en: 'The Fifth District is among the finest in Beit El-Watan — nicknamed the "Palaces" or "Villas" district for its low density and distinctive architecture. A prime location, closest to the View Zone, main and secondary roads, schools, universities, and clubs.',
      },
      points: [
        { ar: 'التسعين الشمالي', en: 'North 90th Street' },
        { ar: 'شارع النوادي', en: 'Clubs Street' },
        { ar: 'محور محمد بن زايد', en: 'Mohamed Bin Zayed Axis' },
        { ar: 'الطريق الدائري الأوسطي', en: 'Middle Ring Road' },
      ],
      highlights: fifthDistrictHighlights,
    },
    unitDetails: [
      {
        name: { ar: 'نموذج متكرر – يمين الواجهة', en: 'Repeated model – right facade' },
        area: { ar: '220 م²', en: '220 m²' },
        status: { ar: 'استلام فوري', en: 'Immediate delivery' },
        rooms: [
          { name: { ar: 'ريسبشن (3) قطع', en: 'Reception (3 pieces)' } },
          { name: { ar: 'مطبخ', en: 'Kitchen' } },
          { name: { ar: 'ليفينج روم', en: 'Living room' } },
          { name: { ar: '3 حمامات', en: '3 bathrooms' } },
          { name: { ar: '3 غرف نوم', en: '3 bedrooms' } },
          { name: { ar: 'دريسنج روم', en: 'Dressing room' } },
          { name: { ar: 'تراس', en: 'Terrace' } },
        ],
      },
      {
        name: { ar: 'نموذج أرضي – يمين الواجهة', en: 'Ground model – right facade' },
        area: { ar: '190 م²', en: '190 m²' },
        extra: { ar: 'جاردن 160 م²', en: '160 m² garden' },
        status: { ar: 'استلام فوري', en: 'Immediate delivery' },
        rooms: [
          { name: { ar: 'ريسبشن (3) قطع', en: 'Reception (3 pieces)' } },
          { name: { ar: 'مطبخ', en: 'Kitchen' } },
          { name: { ar: 'حمامان', en: '2 bathrooms' } },
          { name: { ar: '3 غرف نوم', en: '3 bedrooms' } },
          { name: { ar: 'دريسنج روم', en: 'Dressing room' } },
          { name: { ar: 'حديقة خاصة', en: 'Private garden' } },
        ],
      },
    ],
  },
  {
    id: 'a149',
    title: { ar: 'A149 - الحي التكميلي', en: 'A149 - Supplementary District' },
    category: 'hay-takmili',
    categoryName: { ar: 'بيت الوطن - الحي التكميلي', en: 'Beit El-Watan - Supplementary District' },
    location: { ar: 'بيت الوطن، الحي التكميلي، القاهرة الجديدة', en: 'Beit El-Watan, Supplementary District, New Cairo' },
    type: { ar: 'مشروع سكني', en: 'Residential project' },
    area: { ar: 'من 150 م² إلى 160 م²', en: 'From 150 m² to 160 m²' },
    units: { ar: '10 شقق', en: '10 apartments' },
    progress: 100,
    statusKey: 'delivered',
    deliveryStatus: { ar: 'استلام فوري', en: 'Immediate delivery' },
    unitTypes: defaultUnitTypes,
    cover: a149Cover,
    gallery: a149Gallery.length > 0 ? a149Gallery : [a149Cover],
    facades: a149Facades.length > 0 ? a149Facades : [a149Cover],
    shortDescription: {
      ar: 'تصميمات أوروبية ذكية ومبتكرة في الحي التكميلي ببيت الوطن — استلام فوري.',
      en: 'Smart, innovative European designs in the Supplementary District of Beit El-Watan — immediate delivery.',
    },
    description: {
      ar: 'مشروع سكني بتصميمات أوروبية ذكية ومبتكرة في الحي التكميلي (جنوب السويس) ببيت الوطن (القطعة A149)، بمساحات تبدأ من 150 م² وحتى 160 م²، في لوكيشن مميز جدًا الأقرب للطرق الرئيسية وشارع التسعين الشمالي، والاستلام فوري.',
      en: 'A residential project with smart, innovative European designs in the Supplementary District (South Suez) of Beit El-Watan (Plot A149), with areas from 150 m² up to 160 m², in a prime location closest to main roads and North 90th Street, with immediate delivery.',
    },
    features: defaultFeatures,
    payment: defaultPayment,
    deliverySpecs: defaultDeliverySpecs,
    locationFeatures: {
      intro: {
        ar: 'لوكيشن مميز جدًا بالحي التكميلي (جنوب السويس)، الأقرب للطرق الرئيسية والفرعية وشارع التسعين الشمالي، بالقرب من الأحياء الرئيسية في بيت الوطن.',
        en: 'A prime location in the Supplementary District (South Suez), closest to main and secondary roads and North 90th Street, near the main districts of Beit El-Watan.',
      },
      points: [
        { ar: 'التسعين الشمالي', en: 'North 90th Street' },
        { ar: 'شارع النوادي', en: 'Clubs Street' },
        { ar: 'محور محمد بن زايد', en: 'Mohamed Bin Zayed Axis' },
        { ar: 'الطريق الدائري الأوسطي', en: 'Middle Ring Road' },
      ],
      highlights: [
        {
          title: { ar: 'الموقع المتميز', en: 'Prime location' },
          desc: {
            ar: 'يقع الحي التكميلي بالقرب من الأحياء الرئيسية في مشروع بيت الوطن مثل الحي الأول والثاني، وقريب من الطرق والمحاور الرئيسية مثل محور محمد بن زايد، مما يسهّل الوصول للعاصمة الإدارية الجديدة والقاهرة الكبرى.',
            en: 'The Supplementary District is close to the main districts of Beit El-Watan (such as the First and Second), and near major roads and axes like the Mohamed Bin Zayed axis, easing access to the New Administrative Capital and Greater Cairo.',
          },
        },
        {
          title: { ar: 'الهدوء والتنظيم', en: 'Calm and organization' },
          desc: {
            ar: 'يتميز الحي بتصميمه العصري وتنظيمه المتقن، مع شوارع واسعة ومساحات خضراء، وكثافة سكانية أقل نسبيًا مقارنة ببعض الأحياء الأخرى.',
            en: 'A modern, well-organized district with wide streets and green spaces, and a relatively lower population density than some other districts.',
          },
        },
        {
          title: { ar: 'القرب من الخدمات والمرافق', en: 'Close to services and facilities' },
          desc: {
            ar: 'قريب من مجموعة متنوعة من المرافق مثل المدارس الدولية والمستشفيات والمراكز التجارية، وبالقرب من مناطق ترفيهية كالنوادي الرياضية والمساحات المفتوحة.',
            en: 'Close to a variety of facilities such as international schools, hospitals, and commercial centers, and near recreational areas like sports clubs and open spaces.',
          },
        },
        {
          title: { ar: 'الأسعار التنافسية', en: 'Competitive prices' },
          desc: {
            ar: 'يعتبر الحي التكميلي من الخيارات الجيدة من حيث أسعار الأراضي والشقق مقارنةً ببعض المناطق الأخرى داخل المشروع، مما يجذب المستثمرين والمشترين.',
            en: 'The Supplementary District offers good value in land and apartment prices compared to some other areas within the project, attracting investors and buyers.',
          },
        },
        {
          title: { ar: 'البنية التحتية الحديثة', en: 'Modern infrastructure' },
          desc: {
            ar: 'تم تنفيذ البنية التحتية وفقًا لأحدث المواصفات، بما في ذلك شبكات المياه والكهرباء والصرف الصحي، وتوفر الخدمات الأساسية بشكل مريح للمقيمين.',
            en: 'Infrastructure built to the latest standards, including water, electricity, and sewage networks, providing essential services conveniently for residents.',
          },
        },
        {
          title: { ar: 'التنوع العقاري', en: 'Real-estate variety' },
          desc: {
            ar: 'يوفر الحي وحدات سكنية متنوعة بين الشقق والفيلات، مما يتيح خيارات متعددة تناسب احتياجات العائلات المختلفة.',
            en: 'The district offers diverse units between apartments and villas, providing multiple options to suit different families.',
          },
        },
        {
          title: { ar: 'الاستثمار المستقبلي', en: 'Future investment' },
          desc: {
            ar: 'فرصة استثمارية واعدة نظرًا للتطور المستمر في منطقة بيت الوطن وقرب العاصمة الإدارية الجديدة، والطلب المتزايد على السكن يرفع قيمة العقارات على المدى الطويل.',
            en: 'A promising investment given the continuous growth of Beit El-Watan and the proximity of the New Administrative Capital; rising housing demand increases property value over the long term.',
          },
        },
      ],
    },
    unitDetails: [
      {
        name: { ar: 'نموذج أرضي', en: 'Ground model' },
        area: { ar: '150 م²', en: '150 m²' },
        extra: { ar: 'جاردن 100 م²', en: '100 m² garden' },
        status: { ar: 'استلام فوري', en: 'Immediate delivery' },
        rooms: [
          { name: { ar: 'ريسبشن (2) قطع', en: 'Reception (2 pieces)' } },
          { name: { ar: 'مطبخ', en: 'Kitchen' } },
          { name: { ar: 'حمامان', en: '2 bathrooms' } },
          { name: { ar: '3 غرف نوم', en: '3 bedrooms' } },
          { name: { ar: 'حديقة خاصة', en: 'Private garden' } },
        ],
      },
      {
        name: { ar: 'نموذج متكرر', en: 'Repeated model' },
        area: { ar: '160 م²', en: '160 m²' },
        status: { ar: 'استلام فوري', en: 'Immediate delivery' },
        rooms: [
          { name: { ar: 'ريسبشن (3) قطع', en: 'Reception (3 pieces)' } },
          { name: { ar: 'مطبخ', en: 'Kitchen' } },
          { name: { ar: 'ليفينج روم', en: 'Living room' } },
          { name: { ar: 'حمامان', en: '2 bathrooms' } },
          { name: { ar: '3 غرف نوم', en: '3 bedrooms' } },
          { name: { ar: 'دريسنج روم', en: 'Dressing room' } },
          { name: { ar: 'تراس', en: 'Terrace' } },
        ],
      },
      {
        name: { ar: 'نموذج روف', en: 'Roof model' },
        area: { ar: '120 م²', en: '120 m²' },
        extra: { ar: 'تراس 40 م²', en: '40 m² terrace' },
        status: { ar: 'استلام فوري', en: 'Immediate delivery' },
        rooms: [
          { name: { ar: 'ريسبشن (2) قطع', en: 'Reception (2 pieces)' } },
          { name: { ar: 'مطبخ', en: 'Kitchen' } },
          { name: { ar: 'حمام', en: 'Bathroom' } },
          { name: { ar: 'غرفتان نوم', en: '2 bedrooms' } },
          { name: { ar: 'تراس خاص', en: 'Private terrace' } },
        ],
      },
    ],
  },
  {
    id: 'north-orchid-179',
    title: { ar: '179 - شمال الأوركيد', en: '179 - North Orchid' },
    category: 'north-orchid',
    categoryName: { ar: 'بيت الوطن - شمال الأوركيد', en: 'Beit El-Watan - North Orchid' },
    location: { ar: 'شمال الأوركيد - بيت الوطن - القاهرة الجديدة', en: 'North Orchid - Beit El-Watan - New Cairo' },
    type: { ar: 'مشروع سكني', en: 'Residential project' },
    area: { ar: 'من 120 م² إلى 180 م²', en: 'From 120 m² to 180 m²' },
    units: { ar: '10 شقق', en: '10 apartments' },
    progress: 42,
    statusKey: 'in-progress',
    deliveryStatus: { ar: 'تحت الإنشاء', en: 'Under construction' },
    unitTypes: defaultUnitTypes,
    cover: orchid179Cover,
    gallery: orchid179Gallery.length > 0 ? orchid179Gallery : [orchid179Cover],
    facades: orchid179Facades.length > 0 ? orchid179Facades : [orchid179Cover],
    shortDescription: {
      ar: 'مشروع سكني عصري في شمال الأوركيد — ناصية صريحة على منطقة الخدمات بمساحات من 120 إلى 180 م².',
      en: 'A modern residential project in North Orchid — a corner plot overlooking the services zone, with areas from 120 to 180 m².',
    },
    description: {
      ar: 'مشروع سكني في حي شمال الأوركيد ببيت الوطن (القطعة 179) بتصميم معماري مودرن يجمع بين الخطوط العصرية والخامات المميزة. يتميز المشروع بواجهات مدروسة بإطلالات بانورامية، وموقع ناصية بالقرب من منطقة الخدمات والطرق الرئيسية وكمبوندات Mountain View و Address East.',
      en: 'A residential project in North Orchid, Beit El-Watan (Plot 179), with a modern architectural design combining contemporary lines and premium materials. The project features carefully designed facades with panoramic views, on a corner plot near the services zone, main roads, and compounds such as Mountain View and Address East.',
    },
    features: [
      { ar: 'تصميم معماري مودرن بواجهات بانورامية', en: 'Modern design with panoramic facades' },
      { ar: 'ناصية صريحة على منطقة الخدمات والمولات', en: 'Corner plot overlooking the services and mall zone' },
      { ar: 'مدخل فاخر وجراج مجهّز', en: 'Luxury entrance and equipped garage' },
      { ar: '6 نماذج: أرضي · متكرر · روف', en: '6 models: ground · repeated · roof' },
      { ar: 'قرب Mountain View و Address East', en: 'Close to Mountain View and Address East' },
      { ar: 'موقع استرategي قرب طريق السويس والدائري الأوسطي', en: 'Strategic location near Suez Road and the Middle Ring Road' },
    ],
    payment: defaultPayment,
    deliverySpecs: defaultDeliverySpecs,
    locationFeatures: {
      tagline: { ar: 'ناصية صريحة — شمال الأوركيد 179', en: 'Corner plot — North Orchid 179' },
      intro: {
        ar: 'موقع مميز جداً بحي شمال الأوركيد — ناصية صريحة بالقرب من منطقة الخدمات والطرق الرئيسية والكمبوندات مثل Mountain View و Address East.',
        en: 'A prime location in North Orchid — a clear corner plot near the services area, main roads, and compounds such as Mountain View and Address East.',
      },
      points: [
        { ar: 'التسعين الشمالي', en: 'North 90th Street' },
        { ar: 'شارع النوادي', en: 'Clubs Street' },
        { ar: 'طريق السويس', en: 'Suez Road' },
        { ar: 'الطريق الدائري الأوسطي', en: 'Middle Ring Road' },
      ],
      highlights: [
        {
          title: { ar: 'موقع استراتيجي مميز', en: 'Prime strategic location' },
          desc: {
            ar: 'قريب من طريق السويس والطريق الدائري الأوسطي، مما يسهّل الوصول لمناطق القاهرة الجديدة والعاصمة الإدارية.',
            en: 'Close to Suez Road and the Middle Ring Road, easing access to the New Cairo and the Administrative Capital.',
          },
        },
        {
          title: { ar: 'محاط بأرقى الكمبوندات', en: 'Surrounded by top compounds' },
          desc: {
            ar: 'بالقرب من Mountain View و Address East و Palm Hills، مما يرفع القيمة الاستثمارية للمنطقة.',
            en: 'Near Mountain View, Address East, and Palm Hills, boosting the area’s investment value.',
          },
        },
        {
          title: { ar: 'منطقة مرتفعة ومفتوحة', en: 'Elevated open area' },
          desc: {
            ar: 'يتمتع الحي بتهوية ممتازة وإطلالات أفضل مقارنة بالمناطق المجاورة.',
            en: 'The district enjoys excellent ventilation and better views than neighboring areas.',
          },
        },
        {
          title: { ar: 'قيمة استثمارية متزايدة', en: 'Rising investment value' },
          desc: {
            ar: 'أسعار المنطقة في نمو مستمر مع تطور البنية التحتية وزيادة نسب الإشغال.',
            en: 'Area prices keep rising as infrastructure develops and occupancy grows.',
          },
        },
      ],
    },
    unitDetails: [
      {
        name: { ar: 'نموذج أرضي – يمين الواجهة', en: 'Ground model – right facade' },
        area: { ar: '130 م²', en: '130 m²' },
        extra: { ar: 'جاردن 75 م² · فيو بانوراما', en: '75 m² garden · panorama view' },
        status: { ar: 'تحت الإنشاء', en: 'Under construction' },
        rooms: [
          { name: { ar: 'ريسبشن قطعتين', en: 'Reception (2 pieces)' } },
          { name: { ar: '3 غرف نوم', en: '3 bedrooms' } },
          { name: { ar: '3 حمامات', en: '3 bathrooms' } },
          { name: { ar: 'مطبخ', en: 'Kitchen' } },
          { name: { ar: 'حديقة خاصة', en: 'Private garden' } },
        ],
      },
      {
        name: { ar: 'نموذج أرضي – يسار الواجهة', en: 'Ground model – left facade' },
        area: { ar: '130 م²', en: '130 m²' },
        extra: { ar: 'جاردن 90 م²', en: '90 m² garden' },
        status: { ar: 'تحت الإنشاء', en: 'Under construction' },
        rooms: [
          { name: { ar: 'ريسبشن قطعتين', en: 'Reception (2 pieces)' } },
          { name: { ar: '3 غرف نوم', en: '3 bedrooms' } },
          { name: { ar: '3 حمامات', en: '3 bathrooms' } },
          { name: { ar: 'مطبخ', en: 'Kitchen' } },
          { name: { ar: 'حديقة خاصة', en: 'Private garden' } },
        ],
      },
      {
        name: { ar: 'نموذج متكرر – يمين الواجهة', en: 'Repeated model – right facade' },
        area: { ar: '180 م²', en: '180 m²' },
        extra: { ar: 'فيو بانوراما · 4 تراس', en: 'Panorama view · 4 terraces' },
        status: { ar: 'تحت الإنشاء', en: 'Under construction' },
        rooms: [
          { name: { ar: 'ريسبشن 3 قطع', en: 'Reception (3 pieces)' } },
          { name: { ar: '3 غرف نوم', en: '3 bedrooms' } },
          { name: { ar: '3 حمامات', en: '3 bathrooms' } },
          { name: { ar: '4 تراس', en: '4 terraces' } },
          { name: { ar: 'مطبخ', en: 'Kitchen' } },
        ],
      },
      {
        name: { ar: 'نموذج متكرر – يسار الواجهة', en: 'Repeated model – left facade' },
        area: { ar: '165 م²', en: '165 m²' },
        status: { ar: 'تحت الإنشاء', en: 'Under construction' },
        rooms: [
          { name: { ar: 'ريسبشن 3 قطع', en: 'Reception (3 pieces)' } },
          { name: { ar: '3 غرف نوم', en: '3 bedrooms' } },
          { name: { ar: '3 حمامات', en: '3 bathrooms' } },
          { name: { ar: 'تراس', en: 'Terrace' } },
          { name: { ar: 'مطبخ', en: 'Kitchen' } },
        ],
      },
      {
        name: { ar: 'نموذج روف – يمين الواجهة', en: 'Roof model – right facade' },
        area: { ar: '125 م²', en: '125 m²' },
        extra: { ar: 'تراس روف 45 م² · فيو بانوراما', en: '45 m² roof terrace · panorama view' },
        status: { ar: 'تحت الإنشاء', en: 'Under construction' },
        rooms: [
          { name: { ar: 'ريسبشن قطعتين', en: 'Reception (2 pieces)' } },
          { name: { ar: '2 غرف نوم', en: '2 bedrooms' } },
          { name: { ar: '2 حمام', en: '2 bathrooms' } },
          { name: { ar: 'مطبخ', en: 'Kitchen' } },
          { name: { ar: 'تراس خاص', en: 'Private terrace' } },
        ],
      },
      {
        name: { ar: 'نموذج روف – يسار الواجهة', en: 'Roof model – left facade' },
        area: { ar: '120 م²', en: '120 m²' },
        extra: { ar: 'تراس روف 37 م²', en: '37 m² roof terrace' },
        status: { ar: 'تحت الإنشاء', en: 'Under construction' },
        rooms: [
          { name: { ar: 'ريسبشن قطعتين', en: 'Reception (2 pieces)' } },
          { name: { ar: '2 غرف نوم', en: '2 bedrooms' } },
          { name: { ar: '2 حمام', en: '2 bathrooms' } },
          { name: { ar: 'مطبخ', en: 'Kitchen' } },
          { name: { ar: 'تراس خاص', en: 'Private terrace' } },
        ],
      },
    ],
  },
]

export function getProjects() {
  if (isSupabaseConfigured()) {
    const cached = getSiteCache().projects
    if (Array.isArray(cached) && cached.length > 0) return cached
    return baseProjects
  }
  const stored = getData(STORAGE_KEYS.projects, null)
  if (Array.isArray(stored) && stored.length > 0) return stored
  return baseProjects
}

export const projects = baseProjects
export { baseProjects }

export function formatProjectCode(id) {
  if (id === 'north-orchid-179') return '179'
  const match = id.match(/^([a-z]+)(\d+)$/i)
  if (match) return `${match[1].toUpperCase()}-${match[2]}`
  return id.toUpperCase()
}

export function getProjectHeroContent(project, lang) {
  const companyName = company.name[lang] ?? company.name.ar
  const category = projectCategories.find((c) => c.id === project.category)
  const districtName = category
    ? category.name[lang] ?? category.name.ar
    : project.categoryName[lang] ?? project.categoryName.ar
  const code = formatProjectCode(project.id)
  const districtLine = `${districtName} - ${code}`

  const categoryLabel = project.categoryName[lang] ?? project.categoryName.ar
  const locationText = project.location[lang] ?? project.location.ar
  const compound = categoryLabel.includes(' - ')
    ? categoryLabel.split(' - ')[0].trim()
    : lang === 'ar'
      ? 'بيت الوطن'
      : 'Beit El-Watan'

  let settlement = lang === 'ar' ? 'القاهرة الجديدة' : 'New Cairo'
  if (lang === 'ar' && !locationText.includes('القاهرة الجديدة')) {
    settlement = locationText.split('،').pop()?.trim() || settlement
  } else if (lang === 'en' && !locationText.includes('New Cairo')) {
    settlement = locationText.split(',').pop()?.trim() || settlement
  }

  let locationLine = `${compound} - ${settlement}`
  if (project.category === 'north-orchid') {
    locationLine = `${districtName} - ${compound} - ${settlement}`
  }

  return { companyName, districtLine, locationLine }
}

export function getProjectDisplayTitle(project, lang) {
  const category = projectCategories.find((c) => c.id === project.category)
  const district = category ? category.name[lang] ?? category.name.ar : project.categoryName[lang] ?? project.categoryName.ar
  const code = formatProjectCode(project.id)
  return `${district} - ${code}`
}

export const getProjectById = (id) => getProjects().find((p) => p.id === id)

/** بريد استقبال استفسارات المشاريع */
export function getProjectSalesEmail() {
  return company.email
}
