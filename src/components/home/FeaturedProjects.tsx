import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
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

const FeaturedProjects = () => {
  return (
    <section className="section-padding section-gap bg-background">
      <AnimatedSection>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <p className="label-text text-accent mb-4">Featured Projects</p>
            <h2 className="heading-lg text-foreground">
              Signature<br />Developments
            </h2>
          </div>
          <Link
            to="/projects"
            className="mt-6 md:mt-0 inline-flex items-center gap-2 label-text text-foreground btn-underline"
          >
            View All Projects <ArrowUpRight size={16} />
          </Link>
        </div>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {projects.map((project, i) => (
          <AnimatedSection key={project.id} delay={i * 0.15}>
            <Link to={`/projects/${project.id}`} className="group block">
              <div className="image-reveal aspect-[3/4] mb-6">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/20 transition-colors duration-500" />
              </div>
              <p className="label-text text-muted-foreground mb-2">{project.category}</p>
              <h3 className="heading-sm text-foreground group-hover:text-accent transition-colors duration-300">
                {project.title}
              </h3>
              <p className="body-md text-muted-foreground mt-1">{project.location}</p>
            </Link>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProjects;
