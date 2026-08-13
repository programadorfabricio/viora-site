import Header from "@/components/Header";
import Hero from "@/components/Hero";
import DirtFacts from "@/components/DirtFacts";
import HowItWorks from "@/components/HowItWorks";
import Services from "@/components/Services";
import Calculator from "@/components/Calculator";
import WhyChooseUs from "@/components/WhyChooseUs";
import ServiceArea from "@/components/ServiceArea";
import Reviews from "@/components/Reviews";
import Gallery from "@/components/Gallery";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import StickyWhatsApp from "@/components/StickyWhatsApp";
import { faq } from "@/config/site";

export default function Home() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header />
      <main>
        <Hero />
        <DirtFacts />
        <HowItWorks />
        <Services />
        <Calculator />
        <WhyChooseUs />
        <ServiceArea />
        <Reviews />
        <Gallery />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <StickyWhatsApp />
    </>
  );
}
