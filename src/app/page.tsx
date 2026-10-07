import { Agents } from "@/components/sections/Agents";
import { ApplicationForm } from "@/components/sections/ApplicationForm";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { TrustBar } from "@/components/sections/TrustBar";
import { VisaServices } from "@/components/sections/VisaServices";
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
        <Process />
        <Agents />
        <FAQ />
        <ApplicationForm />
        <FinalCTA />
      </main>
      <Footer />
      <MobileCta />
    </>
  );
}
