import { HeroBanner } from "@/components/hero-banner";
import { OurStory } from "@/components/our-story";
import { CarbonAds } from "@/components/carbon-ads";
import { YouthSection } from "@/components/youth-section";
import { Footer } from "@/components/footer";

export default function Home() {


  return (
    <div className="relative w-full">
      <HeroBanner/>
      <OurStory/>
      <CarbonAds/>
      <YouthSection/>
      <Footer/>
    </div>
  );
}