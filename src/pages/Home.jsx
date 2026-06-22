import Hero from '../sections/Hero'
import CompanyBrief from '../sections/CompanyBrief'
import AboutGeheny from '../sections/AboutGeheny'
import Vision from '../sections/Vision'
import Services from '../sections/Services'
import ExploreProjects from '../sections/ExploreProjects'
import Partners from '../sections/Partners'
import ProjectContactSection from '../components/ProjectContactSection'
import SectionReveal from '../components/SectionReveal'

export default function Home() {
  return (
    <>
      <Hero />
      <CompanyBrief />
      <AboutGeheny />
      <Vision />
      <SectionReveal>
        <ExploreProjects />
      </SectionReveal>
      <Services />
      <SectionReveal>
        <Partners />
      </SectionReveal>
      <SectionReveal>
        <ProjectContactSection />
      </SectionReveal>
    </>
  )
}
