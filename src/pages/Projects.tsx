import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

const categories = ["All", "Residential", "Commercial", "Luxury"];

const allProjects = [
  { id: "skyline-penthouse", title: "Skyline Penthouse", category: "Luxury", location: "Downtown Metropolitan", price: "$4.2M", image: project1 },
  { id: "coastal-haven", title: "Coastal Haven Villa", category: "Residential", location: "Oceanfront Drive", price: "$3.8M", image: project2 },
  { id: "alpine-retreat", title: "Alpine Retreat", category: "Luxury", location: "Mountain Ridge", price: "$5.1M", image: project3 },
  { id: "urban-lofts", title: "Urban Lofts", category: "Commercial", location: "Arts District", price: "$2.4M", image: project4 },
  { id: "emerald-gardens", title: "Emerald Gardens", category: "Residential", location: "Hillside Avenue", price: "$1.9M", image: project3 },
  { id: "harbour-tower", title: "Harbour Tower", category: "Commercial", location: "Waterfront Plaza", price: "$8.5M", image: project1 },
];

const Projects = () => {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? allProjects : allProjects.filter((p) => p.category === active);

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
          Our Portfolio
        </motion.p>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="heading-xl text-secondary-foreground"
          >
            Projects
          </motion.h1>
        </div>
      </section>

      {/* Filters */}
      <section className="section-padding py-8 bg-background border-b border-border sticky top-20 lg:top-24 z-40 glass">
        <div className="flex gap-6 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`label-text whitespace-nowrap pb-2 border-b-2 transition-all duration-300 ${
                active === cat
                  ? "border-accent text-accent"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="section-padding section-gap bg-background">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link to={`/projects/${project.id}`} className="group block">
                  <div className="image-reveal aspect-[3/4] mb-6 relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                      <p className="label-text text-secondary-foreground">{project.price}</p>
                    </div>
                  </div>
                  <p className="label-text text-muted-foreground mb-2">{project.category}</p>
                  <h3 className="heading-sm text-foreground group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="body-md text-muted-foreground mt-1">{project.location}</p>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </main>
  );
};

export default Projects;
