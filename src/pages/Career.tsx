import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const positions = [
  {
    title: "Senior Architect",
    department: "Design",
    location: "Metropolitan City",
    type: "Full-Time",
    description: "Lead architectural design for premium residential and commercial projects. 8+ years experience required with a portfolio of luxury developments.",
  },
  {
    title: "Project Manager",
    department: "Operations",
    location: "Metropolitan City",
    type: "Full-Time",
    description: "Oversee end-to-end project delivery for high-value developments. Strong leadership, budgeting, and stakeholder management skills essential.",
  },
  {
    title: "Interior Design Lead",
    department: "Design",
    location: "Remote / Hybrid",
    type: "Full-Time",
    description: "Direct interior design vision for luxury properties. Expert knowledge of premium materials, furnishings, and spatial design principles required.",
  },
  {
    title: "Marketing Specialist",
    department: "Marketing",
    location: "Metropolitan City",
    type: "Full-Time",
    description: "Drive brand awareness and lead generation for premium real estate. Experience in luxury brand marketing and digital campaigns preferred.",
  },
];

const Career = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <main>
      {/* Hero */}
      <section className="bg-secondary section-padding pt-32 pb-16 lg:pt-40 lg:pb-24">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="label-text text-accent mb-4"
        >
          Join Our Team
        </motion.p>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="heading-xl text-secondary-foreground"
          >
            Careers
          </motion.h1>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="body-lg text-secondary-foreground/60 mt-6 max-w-2xl"
        >
          Build your career with one of the most respected names in luxury real estate development.
        </motion.p>
      </section>

      {/* Why join */}
      <section className="section-padding section-gap bg-background">
        <AnimatedSection className="max-w-3xl">
          <p className="label-text text-accent mb-4">Why Verdant</p>
          <h2 className="heading-lg text-foreground mb-8">
            Shape the Future of <span className="italic">Luxury Living</span>
          </h2>
          <p className="body-lg text-muted-foreground mb-6">
            At Verdant Estates, you'll work alongside visionary architects, designers, and strategists 
            to create properties that set new standards for excellence. We foster creativity, reward 
            ambition, and invest in our people.
          </p>
        </AnimatedSection>
      </section>

      {/* Positions */}
      <section className="section-padding pb-20 md:pb-32 bg-background">
        <AnimatedSection className="mb-12">
          <p className="label-text text-accent mb-4">Open Positions</p>
          <h2 className="heading-md text-foreground">Current Opportunities</h2>
        </AnimatedSection>

        <div className="max-w-4xl">
          {positions.map((pos, i) => (
            <AnimatedSection key={pos.title} delay={i * 0.08}>
              <div className="border-b border-border">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between py-6 group text-left"
                >
                  <div>
                    <h3 className="heading-sm text-foreground group-hover:text-accent transition-colors duration-300">
                      {pos.title}
                    </h3>
                    <div className="flex flex-wrap gap-3 mt-2">
                      <span className="label-text text-muted-foreground">{pos.department}</span>
                      <span className="text-muted-foreground/30">•</span>
                      <span className="label-text text-muted-foreground">{pos.location}</span>
                      <span className="text-muted-foreground/30">•</span>
                      <span className="label-text text-muted-foreground">{pos.type}</span>
                    </div>
                  </div>
                  <ChevronDown
                    size={20}
                    className={`text-muted-foreground transition-transform duration-300 flex-shrink-0 ml-4 ${
                      openIndex === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6">
                        <p className="body-md text-muted-foreground mb-6">{pos.description}</p>
                        <Link
                          to="/contact"
                          className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 label-text hover:bg-warm-orange-hover transition-colors duration-300"
                        >
                          Apply Now <ArrowUpRight size={14} />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding py-24 bg-primary text-center">
        <AnimatedSection>
          <h2 className="heading-lg text-primary-foreground mb-6">
            Don't See Your <span className="italic">Role?</span>
          </h2>
          <p className="body-lg text-primary-foreground/60 mb-10 max-w-lg mx-auto">
            We're always looking for exceptional talent. Send us your resume and we'll be in touch.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 label-text hover:bg-warm-orange-hover transition-all duration-300"
          >
            Get in Touch <ArrowUpRight size={16} />
          </Link>
        </AnimatedSection>
      </section>
    </main>
  );
};

export default Career;
