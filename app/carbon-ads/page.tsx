import { SustainableBench } from "@/components/sustainable-bench"
import { BrandBench } from "@/components/brand-bench"
import LogoCarousel from "@/components/logo-carousel"
import { Footer } from "@/components/footer"

export default function PageWithComponents() {
  return (
    <>
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        {/* First Component */}
        <section className="mb-10">
          <SustainableBench />
        </section>
        </div>
        <LogoCarousel />
        <div className="container mx-auto px-4 py-12">
        {/* Second Component */}
        <section className="md:mt-24">
          <BrandBench />
        </section>
        </div>
    </main>
    <Footer />
    </>
  )
}
