import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading'
import ProjectCard from '../components/ProjectCard'
import Reveal from '../components/Reveal'
import { projects } from '../data/projects'

export default function FeaturedProjects() {
  const featured = projects.slice(0, 3)

  return (
    <section className="section-pad relative">
      <div className="pointer-events-none absolute left-0 top-1/3 h-72 w-72 rounded-full bg-primary-400/20 blur-[120px]" />
      <div className="container-x relative">
        <div className="flex flex-col items-end justify-between gap-6 sm:flex-row sm:items-center">
          <SectionHeading
            align="right"
            eyebrow="مشاريعنا"
            title="نماذج من إبداعاتنا"
            description="نقدم مجموعة من المشروعات السكنية المتميزة في بيت الوطن بالقاهرة الجديدة، إحدى أسرع المناطق نمواً وأكثرها جذباً للاستثمار"
          />
          <Reveal direction="left" className="hidden flex-shrink-0 sm:block">
            <Link to="/projects" className="btn-outline">
            عرض جميع المشاريع
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        <div className="mt-10 text-center sm:hidden">
          <Link to="/projects" className="btn-outline w-full">
            كل المشاريع
          </Link>
        </div>
      </div>
    </section>
  )
}
