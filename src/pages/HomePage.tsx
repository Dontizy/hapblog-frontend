import { LandingCta } from '../components/landing/landing-cta'
import { LandingFeatures } from '../components/landing/landing-features'
import { LandingFeatured } from '../components/landing/landing-featured'
import { LandingHero } from '../components/landing/landing-hero'



const HomePage = () => {
 return (
    <div className="flex min-h-screen flex-col">

      <main className="flex-1">
        <LandingHero />
        <LandingFeatured />
        <LandingFeatures />
        <LandingCta />
      </main>
    </div>
  )
}

export default HomePage;
