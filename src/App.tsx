import Nav from './components/Nav'
import MobileCta from './components/MobileCta'
import BracketCursor from './components/BracketCursor'
import ScrollProgress from './components/ScrollProgress'
import Hero from './sections/Hero'
import Work from './sections/Work'
import Services from './sections/Services'
import Engineering from './sections/Engineering'
import Approach from './sections/Approach'
import About from './sections/About'
import Working from './sections/Working'
import FinalCta from './sections/FinalCta'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

export default function App() {
  return (
    <div className="grain">
      <ScrollProgress />
      <BracketCursor />
      <Nav />
      <main id="main">
        <Hero />
        <Work />
        <Services />
        <Engineering />
        <Approach />
        <About />
        <Working />
        <FinalCta />
        <Contact />
      </main>
      <Footer />
      <MobileCta />
    </div>
  )
}
