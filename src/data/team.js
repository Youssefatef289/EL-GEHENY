import founderImg from '../../images/الحاج صلاح الجهينى.png'
import alaaImg from '../../images/علاء صلاح الجهينى.png'
import ahmedImg from '../../images/احمد صلاح الجهينى.png'
import waleedImg from '../../images/وليد كمال الجهينى.png'
import { getSiteCache } from '../lib/siteDataCache'
import { getData, STORAGE_KEYS } from '../admin/storage'
import { isSupabaseConfigured } from '../lib/supabase'

export const baseFounder = {
  id: 'founder',
  name: { ar: 'الحاج / صلاح كمال الجهيني', en: 'Haj Salah Kamal El Geheny' },
  role: { ar: 'المؤسس ورئيس مجلس الإدارة', en: 'Founder & Chairman of the Board' },
  bio: {
    ar: 'يُعد الحاج صلاح كمال الجهيني المؤسس ورئيس مجلس إدارة شركة الجهيني للتطوير العقاري، ويتمتع بخبرة طويلة في مجالات التطوير العقاري والمقاولات والإنشاءات. قاد تنفيذ العديد من المشروعات السكنية والتجارية والهندسية في مختلف أنحاء مصر، ووضع أسس الشركة على مبادئ الثقة والالتزام والجودة، مما ساهم في بناء سجل قوي من المشروعات الناجحة وسمعة راسخة للشركة.',
    en: 'Salah Kamal El Geheny is the Founder and Chairman of El Geheny Real Estate Development. With extensive experience in real estate development, construction, and infrastructure projects, he has led the execution of numerous residential, commercial, and engineering developments across Egypt. His vision is built on trust, commitment, and quality, forming the foundation of the company\'s strong reputation and successful project portfolio.',
  },
  image: founderImg,
}

export const baseTeamMembers = [
  {
    id: 'waleed',
    name: { ar: 'م/ وليد كمال الجهيني', en: 'Eng. Waleed Kamal El Geheny' },
    role: { ar: 'مدير المشروعات', en: 'Project Manager' },
    bio: {
      ar: 'يدير وليد كمال الجهيني الإشراف على التنفيذ والمتابعة الميدانية للمشروعات، مع التركيز على الحفاظ على معايير الجودة، والالتزام بالجداول الزمنية، وضمان التسليم الناجح في كل مرحلة من مراحل التطوير.',
      en: 'Waleed Kamal El Geheny manages on-site supervision and project execution, with a focus on maintaining quality standards, meeting timelines, and ensuring successful delivery at every stage of development.',
    },
    image: waleedImg,
  },
  {
    id: 'alaa',
    name: { ar: 'م/ علاء صلاح الجهيني', en: 'Eng. Alaa Salah El Geheny' },
    role: { ar: 'المدير العام', en: 'General Manager' },
    bio: {
      ar: 'يتولى علاء صلاح الجهيني الإشراف على العمليات اليومية للشركة والتنفيذ الاستراتيجي، مع ضمان الكفاءة والجودة وتسليم المشروعات في مواعيدها بما يدعم أهداف النمو طويلة الأمد للشركة.',
      en: 'Alaa Salah El Geheny oversees the company\'s daily operations and strategic execution, ensuring efficiency, quality standards, and timely project delivery while supporting the company\'s long-term growth objectives.',
    },
    image: alaaImg,
  },
  {
    id: 'ahmed',
    name: { ar: 'م/ احمد صلاح الجهيني', en: 'Eng. Ahmed Salah El Geheny' },
    role: { ar: ' الرئيس التنفيذي ومدير العمليات', en: 'CEO & Operations Manager' },
    bio: {
      ar: 'يقود أحمد صلاح الجهيني فريق المبيعات ويشرف على تطوير علاقات العملاء وتحقيق أهداف البيع، مع متابعة أداء كل فرد، وتصحيح مسار التواصل مع العملاء إذا لزم الأمر، لضمان تجربة احترافية تعكس قيمة مشروعات الجهيني.',
      en: 'Ahmed Salah El Geheny leads the sales team and oversees client relationships and sales targets, monitoring each member\'s performance and adjusting client communication when needed to ensure a professional experience that reflects the value of El Geheny projects.',
    },
    image: ahmedImg,
  },
]

const imageById = {
  founder: founderImg,
  waleed: waleedImg,
  alaa: alaaImg,
  ahmed: ahmedImg,
}

function mergeTeam(stored) {
  const founder = {
    ...baseFounder,
    ...stored.founder,
    image: imageById.founder,
  }
  const members = (stored.members || baseTeamMembers).map((member) => ({
    ...baseTeamMembers.find((m) => m.id === member.id),
    ...member,
    image: imageById[member.id] ?? member.image,
  }))
  return { founder, members }
}

export function getTeamData() {
  if (isSupabaseConfigured()) {
    const cached = getSiteCache().team
    if (cached) return cached
    return { founder: baseFounder, members: baseTeamMembers }
  }

  const stored = getData(STORAGE_KEYS.team, null)
  if (!stored) {
    return { founder: baseFounder, members: baseTeamMembers }
  }
  return mergeTeam(stored)
}

export function getFounder() {
  return getTeamData().founder
}

export function getTeamMembers() {
  return getTeamData().members
}
