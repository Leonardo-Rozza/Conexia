import Header from "../components/Header" 
import HeroMain from "../components/HeroMain"
import Features from "../components/Features"
import Stats from "../components/Stats"
import LoginModal from  "../components/LoginModal"

export default function LandingPage() {
  return (
    <>
        <Header />
        <HeroMain />
        <Features />
        <Stats />
        <LoginModal />
    </>
  )
}
