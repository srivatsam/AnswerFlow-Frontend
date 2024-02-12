import React from "react";

export function TestimonialsSection() {
  return (
    <div className="section flex flex-col gap-10">
      <h1 className="text-[35px] md:text-[45px] font-bold ">Customers Love</h1>
      <div className="section flex flex-col gap-4 justify-center rounded-[20px] overflow-hidden bg-gray-200">
        <iframe
          height="800px"
          id="testimonialto-answerflow-ai-tag-all-dark-animated"
          src="https://embed-v2.testimonial.to/w/answerflow-ai?animated=on&theme=dark&shadowColor=ffffff&speed=1&tag=all"
          frameBorder="0"
          scrolling="no"
          width="100%"
        ></iframe>{" "}
      </div>
    </div>
  );
}
