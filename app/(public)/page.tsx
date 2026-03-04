import dynamic from 'next/dynamic'
import { HeroSection } from "@/components/home/hero-section"
import { FeaturedTours } from "@/components/home/featured-tours"

const WhyChooseUs = dynamic(() => import("@/components/home/why-choose-us").then(mod => mod.WhyChooseUs))
const CtaSection = dynamic(() => import("@/components/home/cta-section").then(mod => mod.CtaSection))

export const revalidate = 3600 // Cache for 1 hour, cleared instantly on update

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedTours />
      {/* <DestinationsSection /> */}
      <WhyChooseUs />
      <CtaSection />
    </>
  )
}

