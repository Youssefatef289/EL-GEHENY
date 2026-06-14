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
      <SectionReveal from="right">
        <AboutGeheny />
      </SectionReveal>
      <SectionReveal from="left">
        <WhyUs />
      </SectionReveal>
      <SectionReveal from="right">
        <Vision />
      </SectionReveal>
      <Services />
      <ProjectsSlider />
      <ExploreProjects />
      <SectionReveal from="right">
        <Partners />
      </SectionReveal>
    </>
  )
}
