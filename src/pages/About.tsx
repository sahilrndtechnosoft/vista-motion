import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import aboutImage from "@/assets/about-office.jpg";
import heroImage from "@/assets/hero-villa.jpg";
import { Award, Users, Building2, Globe } from "lucide-react";

const timeline = [
  { year: "2009", title: "Founded", description: "Verdant Estates was established with a vision to redefine luxury living." },
  { year: "2013", title: "First Major Project", description: "Delivered our first signature development — The Emerald Residences." },
  { year: "2017", title: "International Expansion", description: "Extended operations across three new international markets." },
  { year: "2020", title: "Sustainability Pledge", description: "Committed to carbon-neutral construction across all new projects." },
  { year: "2024", title: "250+ Properties", description: "Milestone of over 250 premium properties delivered worldwide." },
];

const achievements = [
  { icon: Award, value: "12", label: "Industry Awards" },
  { icon: Users, value: "50+", label: "Expert Team" },
  { icon: Building2, value: "250+", label: "Projects Delivered" },
  { icon: Globe, value: "8", label: "Countries" },
];

const About = () => {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Luxury architecture" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/40 to-transparent" />
        </div>
        <div className="relative z-10 section-padding pb-16 lg:pb-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="label-text text-accent mb-4"
          >
            About Us
          </motion.p>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="heading-xl text-secondary-foreground"
            >
              Our Story
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding section-gap bg-background">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection>
            <p className="label-text text-accent mb-6">Our Mission</p>
            <h2 className="heading-lg text-foreground mb-8">
              Creating Spaces That <span className="italic">Inspire</span>
            </h2>
            <p className="body-lg text-muted-foreground mb-6">
              At Verdant Estates, we believe that a home is more than walls and a roof — it's a 
              sanctuary, a statement, and a legacy. Our mission is to craft living spaces that 
              merge architectural innovation with timeless elegance.
            </p>
            <p className="body-md text-muted-foreground">
              Every project we undertake begins with a deep understanding of our clients' aspirations, 
              the surrounding environment, and the possibilities of modern design. We don't just build 
              properties; we create destinations for extraordinary living.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="image-reveal aspect-[4/5]">
              <img src={aboutImage} alt="Verdant Estates office" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Achievements */}
      <section className="section-padding py-20 md:py-28 bg-primary">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((item, i) => (
            <AnimatedSection key={item.label} delay={i * 0.1} className="text-center">
              <item.icon size={28} className="text-accent mx-auto mb-4" strokeWidth={1.5} />
              <p className="heading-lg text-primary-foreground mb-2">{item.value}</p>
              <p className="label-text text-primary-foreground/50">{item.label}</p>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding section-gap bg-background">
        <AnimatedSection className="text-center mb-16">
          <p className="label-text text-accent mb-4">Our Journey</p>
          <h2 className="heading-lg text-foreground">Milestones</h2>
        </AnimatedSection>

        <div className="max-w-3xl mx-auto">
          {timeline.map((item, i) => (
            <AnimatedSection key={item.year} delay={i * 0.1}>
              <div className="flex gap-8 mb-12 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-accent flex-shrink-0" />
                  {i < timeline.length - 1 && <div className="w-px flex-1 bg-border mt-2" />}
                </div>
                <div className="pb-8">
                  <p className="label-text text-accent mb-2">{item.year}</p>
                  <h3 className="heading-sm text-foreground mb-2">{item.title}</h3>
                  <p className="body-md text-muted-foreground">{item.description}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Team Preview */}
      <section className="section-padding section-gap bg-cream-dark">
        <AnimatedSection className="text-center mb-16">
          <p className="label-text text-accent mb-4">Leadership</p>
          <h2 className="heading-lg text-foreground">Meet Our Team</h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "David Sterling", role: "Founder & CEO" },
            { name: "Sarah Whitfield", role: "Chief Design Officer" },
            { name: "James Nakamura", role: "VP of Development" },
          ].map((member, i) => (
            <AnimatedSection key={member.name} delay={i * 0.15}>
              <div className="group cursor-pointer">
                <div className="aspect-[3/4] bg-muted mb-6 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center">
                    <Users size={48} className="text-muted-foreground/30" />
                  </div>
                </div>
                <h3 className="heading-sm text-foreground group-hover:text-accent transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="body-md text-muted-foreground mt-1">{member.role}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </main>
  );
};

export default About;
