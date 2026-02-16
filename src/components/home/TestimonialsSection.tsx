import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Verdant Estates exceeded every expectation. The attention to detail in our home is remarkable — from the custom finishes to the panoramic views, everything is flawless.",
    name: "Alexandra Chen",
    role: "Skyline Penthouse Owner",
  },
  {
    quote: "Working with the Verdant team was an extraordinary experience. They understood our vision from day one and delivered a home that truly reflects our lifestyle.",
    name: "Marcus & Elena Rivera",
    role: "Coastal Haven Residents",
  },
  {
    quote: "The quality of craftsmanship and the seamless process — from consultation to handover — sets Verdant Estates apart from every developer we've worked with.",
    name: "Jonathan Drake",
    role: "Commercial Portfolio Investor",
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section ref={ref} className="section-padding section-gap bg-cream-dark">
      <AnimatedSection className="max-w-4xl mx-auto text-center">
        <p className="label-text text-accent mb-6">Testimonials</p>
        <h2 className="heading-md text-foreground mb-16">What Our Clients Say</h2>

        <div className="relative min-h-[280px] md:min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex flex-col items-center"
            >
              <Quote size={32} className="text-accent/30 mb-6" />
              <blockquote className="heading-sm text-foreground font-normal mb-8 leading-relaxed">
                "{testimonials[current].quote}"
              </blockquote>
              <p className="label-text text-foreground">{testimonials[current].name}</p>
              <p className="body-md text-muted-foreground mt-1">{testimonials[current].role}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-12 h-1 transition-colors duration-300 ${
                i === current ? "bg-accent" : "bg-border"
              }`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
};

export default TestimonialsSection;
