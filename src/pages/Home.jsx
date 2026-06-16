import Hero from '../sections/Hero'
import AboutGeheny from '../sections/AboutGeheny'
import WhyUs from '../sections/WhyUs'
import Vision from '../sections/Vision'
import Services from '../sections/Services'
import ProjectsSlider from '../sections/ProjectsSlider'
import ExploreProjects from '../sections/ExploreProjects'
import Partners from '../sections/Partners'
import SectionReveal from '../components/SectionReveal'

export default function Home() {
  return (
    <>
      <Hero />
      <SectionReveal>
        <AboutGeheny />
      </SectionReveal>
      <SectionReveal>
        <WhyUs />
      </SectionReveal>
      <SectionReveal>
        <Vision />
      </SectionReveal>
      <Services />
      <ProjectsSlider />
      <SectionReveal>
        <ExploreProjects />
      </SectionReveal>
      <SectionReveal>
        <Partners />
      </SectionReveal>
    </>
  )
}
