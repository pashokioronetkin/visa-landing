import { ApplicationForm } from "@/components/sections/ApplicationForm";
import { Destinations } from "@/components/sections/Destinations";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { TrustBar } from "@/components/sections/TrustBar";
import { VisaServices } from "@/components/sections/VisaServices";
import { WhyUs } from "@/components/sections/WhyUs";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileCta } from "@/components/layout/MobileCta";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <VisaServices />
        <Destinations />
        <WhyUs />
        <Process />
        <FAQ />
        <ApplicationForm />
        <FinalCTA />
      </main>
      <Footer />
      <MobileCta />
    </>
  );
}
