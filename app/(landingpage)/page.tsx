import Hero from "./_components/hero/Hero";
import HorizontalScrolling from "./_components/brandsPanner/HorizontalScrolling";
import Steps from "./_components/stepsSection/Steps";
import Improve from "./_components/features/Improve";
import TextAnimation from "./_components/textSection/TextAnimation";
import Pricing from "./_components/pricing/Pricing";
import Cards from "./_components/cards/Cards";

export default function Home() {
  return (
    <main className=" relative">
      <div className="bg-1"></div>
      <div className="bg-2"></div>
      <div className="bg-3"></div>
      <HorizontalScrolling />
      <Hero />
      <Steps />
      <Improve />
      <TextAnimation />
      <div className="section flex justify-center rounded-[20px] overflow-hidden">
        <iframe
          height="800px"
          id="testimonialto-answerflow-ai-tag-all-dark-animated"
          src="https://embed-v2.testimonial.to/w/answerflow-ai?animated=on&theme=dark&shadowColor=ffffff&speed=1&tag=all"
          frameBorder="0"
          scrolling="no"
          width="100%"
        ></iframe>
      </div>
      <Cards />
      <Pricing />
    </main>
  );
}
