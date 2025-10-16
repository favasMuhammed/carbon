import ProcessCarousel from "@/components/process-carousel"
import TeamSection from "@/components/team-section"
import JourneySections from "@/components/journey-section"
import { Footer } from "@/components/footer"
import AnimatedBannerAlt from "@/components/about-us-banner"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <AnimatedBannerAlt />
        <JourneySections />
        <ProcessCarousel />
        <TeamSection />
      </div>
      <Footer/>
    </main>
  )
}
