import { useEffect } from 'react'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StatStrip from './components/StatStrip'
import FeatureShowcase from './components/FeatureShowcase'
import Services from './components/Services'
import WhyUs from './components/WhyUs'
import HowItWorks from './components/HowItWorks'
import Testimonial from './components/Testimonial'
import Rating from './components/Rating'
import Industries from './components/Industries'
import Contact from './components/Contact'
import CtaBanner from './components/CtaBanner'
import Footer from './components/Footer'
import { recordPageview } from './api'

export default function App() {
  useEffect(() => {
    // First-party, cookie-free page view count (see backend /api/analytics).
    // Fires once per browser session, not on every re-render.
    if (!sessionStorage.getItem('pv_sent')) {
      recordPageview()
      sessionStorage.setItem('pv_sent', '1')
    }
  }, [])

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <Hero />
      <StatStrip />
      <FeatureShowcase />
      <Services />
      <WhyUs />
      <HowItWorks />
      <Testimonial />
      <Industries />
      <Contact />
      <Rating />
      <CtaBanner />
      <Footer />
    </>
  )
}
