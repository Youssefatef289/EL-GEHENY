import Reveal from '../components/Reveal'
import { useLang, L } from '../i18n'

import founderImg from '../../images/الحاج صلاح الجهينى.png'
import alaaImg from '../../images/علاء صلاح الجهينى.png'
import ahmedImg from '../../images/احمد صلاح الجهينى.png'
import waleedImg from '../../images/وليد كمال الجهينى.png'
import signatureImg from '../../images/التوقيع.png'

const founder = {
  name: { ar: 'الحاج صلاح كمال الجهيني', en: 'Haj Salah Kamal Al-Juhaini' },
  role: { ar: 'رئيس مجلس الإدارة والمؤسس', en: 'Chairman of the Board and Founder' },
  bio: {
    ar: 'يُعد الحاج صلاح كمال الجهيني المؤسس ورئيس مجلس إدارة شركة الجهيني للتطوير العقاري، ويتمتع بخبرة طويلة تمتد لسنوات في مجالات التطوير العقاري والمقاولات والإنشاءات. قاد تنفيذ العديد من المشروعات السكنية والتجارية والبنية التحتية في مختلف أنحاء الجمهورية، واضعًا أسس الشركة على مبادئ الثقة والالتزام والجودة، مما ساهم في بناء سجل قوي من المشروعات الناجحة وعلاقات طويلة الأمد مع العملاء والشركاء.',
    en: 'Haj Salah Kamal Al-Juhaini is the founder and Chairman of the Board of El-Geheny Real Estate Development Company. With many years of experience in real estate development, contracting, and construction, he has led the execution of numerous residential, commercial, and infrastructure projects across Egypt. He built the company on the principles of trust, commitment, and quality, establishing a strong record of successful projects and long-term relationships with clients and partners.',
  },
  image: founderImg,
}

const teamMembers = [
  {
    name: { ar: 'علاء صلاح الجهيني', en: 'Alaa Salah Al-Juhaini' },
    role: { ar: 'المدير العام', en: 'General Manager' },
    bio: {
      ar: 'يتولى علاء صلاح الجهيني إدارة العمليات اليومية للشركة والإشراف على تنفيذ الخطط التشغيلية والاستراتيجية، مع التركيز على تحقيق أعلى مستويات الجودة والكفاءة وضمان الالتزام بالجداول الزمنية للمشروعات.',
      en: 'Alaa Salah Al-Juhaini manages the company\'s daily operations and oversees the implementation of operational and strategic plans, with a focus on achieving the highest levels of quality and efficiency and ensuring commitment to project timelines.',
    },
    image: alaaImg,
  },
  {
    name: { ar: 'أحمد صلاح الجهيني', en: 'Ahmed Salah Al-Juhaini' },
    role: { ar: 'مدير العمليات', en: 'Operations Manager' },
    bio: {
      ar: 'يشرف أحمد صلاح الجهيني على إدارة العمليات التشغيلية ومتابعة سير العمل بين مختلف الإدارات، لضمان تنفيذ المشروعات وفق أعلى معايير الجودة وتحقيق التكامل بين التخطيط والتنفيذ بما يدعم أهداف الشركة ونموها المستمر.',
      en: 'Ahmed Salah Al-Juhaini supervises operational management and workflow across departments, ensuring projects are executed to the highest quality standards and that planning and implementation are integrated to support the company\'s goals and continuous growth.',
    },
    image: ahmedImg,
  },
  {
    name: { ar: 'وليد كمال الجهيني', en: 'Waleed Kamal Al-Juhaini' },
    role: { ar: 'مدير المشروعات', en: 'Project Manager' },
    bio: {
      ar: 'يمتلك وليد كمال الجهيني خبرة عملية في إدارة وتنفيذ المشروعات العقارية، ويتولى الإشراف على مراحل التنفيذ المختلفة، مع الحرص على تطبيق أعلى معايير الجودة والالتزام بالمواصفات الفنية والجداول الزمنية المحددة.',
      en: 'Waleed Kamal Al-Juhaini has practical experience in managing and executing real estate projects. He supervises various implementation stages while ensuring the highest quality standards and adherence to technical specifications and schedules.',
    },
    image: waleedImg,
  },
]

function PortraitFrame({ src, alt, tall = false, uniform = false, showSignature = false }) {
  return (
    <div
      className={`relative w-full ${showSignature ? 'overflow-visible' : 'overflow-hidden'} ${
        tall
          ? 'min-h-[28rem] sm:min-h-[32rem] lg:min-h-[36rem]'
          : uniform
            ? 'h-[22rem] sm:h-[26rem] lg:h-[28rem]'
            : 'min-h-[22rem] sm:min-h-[26rem]'
      }`}
      style={{
        background: 'radial-gradient(ellipse 70% 55% at 50% 35%, rgb(55 55 55) 0%, rgb(0 0 0) 72%)',
      }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="relative z-[1] mx-auto h-full w-full object-contain object-bottom"
      />
      {showSignature && (
        <img
          src={signatureImg}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="pointer-events-none absolute bottom-[-1%] right-0 z-[3] w-[100%] max-w-[18rem] translate-x-[10%] translate-y-[46%] select-none object-contain object-right mix-blend-screen sm:max-w-[20rem] lg:max-w-[24rem]"
        />
      )}
    </div>
  )
}

function TeamCard({ member, lang, delay = 0 }) {
  return (
    <Reveal delay={delay} className="flex h-full flex-col">
      <PortraitFrame src={member.image} alt={L(member.name, lang)} uniform />
      <div className="mt-5 text-center sm:mt-6">
        <h3 className="card-title text-gradient-primary">
          {L(member.name, lang)}
        </h3>
        <p className="mt-3 body-sm text-hero-body">
          {L(member.bio, lang)}
        </p>
      </div>
    </Reveal>
  )
}

export default function AboutTeam() {
  const { lang, dir } = useLang()

  return (
    <section className="relative overflow-x-hidden bg-ink py-16 sm:py-20 lg:py-24">
      <div className="container-x">
        {/* المؤسس — صورة يسار / نص يمين */}
        <div
          className={`flex flex-col items-center gap-10 lg:gap-14 xl:gap-20 ${
            dir === 'rtl' ? 'lg:flex-row-reverse' : 'lg:flex-row'
          }`}
        >
          <Reveal className="w-full lg:w-[42%] lg:max-w-xl xl:max-w-2xl">
            <div className="relative mx-auto w-full overflow-visible">
              <PortraitFrame src={founder.image} alt={L(founder.name, lang)} tall showSignature />
            </div>
          </Reveal>

          <Reveal delay={0.08} className="w-full flex-1 text-center lg:text-start">
            <h2 className="heading-lg text-gradient-primary">
              {L(founder.name, lang)}
            </h2>
            <p className="section-desc mt-4 text-hero-body">
              {L(founder.bio, lang)}
            </p>
          </Reveal>
        </div>

        {/* فريق الإدارة */}
        <div className="mt-16 grid gap-12 sm:mt-20 sm:gap-14 md:grid-cols-3 md:items-start md:gap-8 lg:mt-24 lg:gap-10">
          {teamMembers.map((member, i) => (
            <TeamCard key={L(member.name, 'ar')} member={member} lang={lang} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  )
}
