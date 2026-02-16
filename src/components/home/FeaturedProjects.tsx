import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import TextReveal from "@/components/TextReveal";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

const projects = [
  {
    id: "skyline-penthouse",
    title: "Skyline Penthouse",
    category: "Luxury",
    location: "Downtown Metropolitan",
    image: project1,
  },
  {
    id: "coastal-haven",
    title: "Coastal Haven Villa",
    category: "Residential",
    location: "Oceanfront Drive",
    image: project2,
  },
  {
    id: "alpine-retreat",
    title: "Alpine Retreat",
    category: "Luxury",
    location: "Mountain Ridge",
    image: project3,
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80, rotateX: -8 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{
        duration: 0.9,
        delay: index * 0.2,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ perspective: "1000px" }}
    >
      <Link to={`/projects/${project.id}`} className="group block">
        <div className="relative overflow-hidden aspect-[3/4] mb-6">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover will-change-transform"
            loading="lazy"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
          {/* Reveal overlay */}
          <motion.div
            className="absolute inset-0 bg-secondary"
            initial={{ scaleY: 1 }}
            animate={isInView ? { scaleY: 0 } : { scaleY: 1 }}
            transition={{ duration: 1, delay: index * 0.2 + 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ originY: 0 }}
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <motion.div
            className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0"
          >
            <span className="inline-flex items-center gap-2 label-text text-secondary-foreground">
              View Project <ArrowUpRight size={14} />
            </span>
          </motion.div>
        </div>
        <motion.p
          className="label-text text-muted-foreground mb-2"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
        >
          {project.category}
        </motion.p>
        <h3 className="heading-sm text-foreground group-hover:text-accent transition-colors duration-300">
          {project.title}
        </h3>
        <p className="body-md text-muted-foreground mt-1">{project.location}</p>
      </Link>
    </motion.div>
  );
};

const FeaturedProjects = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const lineWidth = useTransform(scrollYProgress, [0, 0.3], ["0%", "100%"]);

  return (
    <section ref={sectionRef} className="section-padding section-gap bg-background overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
        <div>
          <AnimatedSection direction="left">
            <p className="label-text text-accent mb-4 flex items-center gap-3">
              <span className="inline-block w-8 h-px bg-accent" />
              Featured Projects
            </p>
          </AnimatedSection>
          <TextReveal className="heading-lg text-foreground" delay={0.1}>
            Signature Developments
          </TextReveal>
        </div>
        <AnimatedSection delay={0.3} direction="right">
          <Link
            to="/projects"
            className="mt-6 md:mt-0 inline-flex items-center gap-2 label-text text-foreground btn-underline"
          >
            View All Projects <ArrowUpRight size={16} />
          </Link>
        </AnimatedSection>
      </div>

      {/* Animated divider */}
      <motion.div className="h-px bg-border mb-16" style={{ width: lineWidth }} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProjects;
