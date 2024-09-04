import Footer from "@/components/Modules/LandingPage/Footer";
import Jumbotron from "@/components/Modules/LandingPage/Jumbotron";
import SectionDownload from "@/components/Modules/LandingPage/SectionContents/SectionDownload";
import SectionEnjoy from "@/components/Modules/LandingPage/SectionContents/SectionEnjoy";
import SectionFAQ from "@/components/Modules/LandingPage/SectionContents/SectionFAQ";
import SectionProfile from "@/components/Modules/LandingPage/SectionContents/SectionProfile";
import SectionWatch from "@/components/Modules/LandingPage/SectionContents/SectionWatch";
import Navbar from "./Navbar";

function Landing() {
  return (
    <>
      <Navbar />
      <Jumbotron />
      <SectionEnjoy />
      <SectionDownload />
      <SectionWatch />
      <SectionProfile />
      <SectionFAQ />
      <Footer />
    </>
  );
}

export default Landing;
