import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowLeft, MapPin, Maximize, BedDouble, Bath, Car } from "lucide-react";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

const projectsData: Record<string, {
  title: string; category: string; location: string; price: string; image: string;
  description: string; specs: { beds: number; baths: number; sqft: string; parking: number };
  gallery: string[];
}> = {
  "skyline-penthouse": {
    title: "Skyline Penthouse", category: "Luxury", location: "Downtown Metropolitan", price: "$4.2M",
    image: project1, description: "An extraordinary penthouse with panoramic city views, featuring floor-to-ceiling windows, Italian marble floors, and a private rooftop terrace. The pinnacle of urban luxury living.",
    specs: { beds: 4, baths: 5, sqft: "6,200", parking: 3 },
    gallery: [project1, project2, project3],
  },
  "coastal-haven": {
    title: "Coastal Haven Villa", category: "Residential", location: "Oceanfront Drive", price: "$3.8M",
    image: project2, description: "A serene beachfront villa blending contemporary architecture with coastal tranquility. Expansive outdoor living areas, infinity pool, and direct beach access.",
    specs: { beds: 5, baths: 4, sqft: "5,800", parking: 2 },
    gallery: [project2, project3, project4],
  },
  "alpine-retreat": {
    title: "Alpine Retreat", category: "Luxury", location: "Mountain Ridge", price: "$5.1M",
    image: project3, description: "Nestled among ancient pines, this architectural masterpiece features expansive glass walls framing dramatic mountain vistas. A perfect harmony of luxury and nature.",
    specs: { beds: 6, baths: 5, sqft: "7,400", parking: 4 },
    gallery: [project3, project1, project4],
  },
  "urban-lofts": {
    title: "Urban Lofts", category: "Commercial", location: "Arts District", price: "$2.4M",
    image: project4, description: "A collection of meticulously designed loft spaces in the heart of the arts district. Industrial elegance meets modern comfort with soaring ceilings and open layouts.",
    specs: { beds: 2, baths: 2, sqft: "2,800", parking: 1 },
    gallery: [project4, project1, project2],
  },
  "emerald-gardens": {
    title: "Emerald Gardens", category: "Residential", location: "Hillside Avenue", price: "$1.9M",
    image: project3, description: "A garden-inspired residential community featuring lush landscaping, private courtyards, and sustainable design principles throughout.",
    specs: { beds: 3, baths: 3, sqft: "3,600", parking: 2 },
    gallery: [project3, project2, project1],
  },
  "harbour-tower": {
    title: "Harbour Tower", category: "Commercial", location: "Waterfront Plaza", price: "$8.5M",
    image: project1, description: "An iconic waterfront commercial tower offering premium office and retail spaces with stunning harbour views and state-of-the-art amenities.",
    specs: { beds: 0, baths: 8, sqft: "24,000", parking: 50 },
    gallery: [project1, project4, project2],
  },
};

const ProjectDetails = () => {
  const { id } = useParams();
  const project = projectsData[id || ""];

  if (!project) {
    return (
      <main className="section-padding pt-32 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="heading-lg text-foreground mb-4">Project Not Found</h1>
          <Link to="/projects" className="label-text text-accent btn-underline">Back to Projects</Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/30 to-transparent" />
        </div>
        <div className="relative z-10 section-padding pb-16 lg:pb-24 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Link to="/projects" className="inline-flex items-center gap-2 label-text text-secondary-foreground/70 hover:text-accent transition-colors mb-6">
              <ArrowLeft size={16} /> Back to Projects
            </Link>
          </motion.div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="heading-xl text-secondary-foreground"
            >
              {project.title}
            </motion.h1>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-4 mt-4"
          >
            <span className="label-text text-accent">{project.category}</span>
            <span className="text-secondary-foreground/30">|</span>
            <span className="flex items-center gap-1 body-md text-secondary-foreground/70">
              <MapPin size={14} /> {project.location}
            </span>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding section-gap bg-background">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          <div className="lg:col-span-2">
            <AnimatedSection>
              <p className="label-text text-accent mb-4">Overview</p>
              <p className="body-lg text-foreground mb-8">{project.description}</p>
            </AnimatedSection>

            {/* Specs */}
            <AnimatedSection delay={0.15}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-t border-b border-border">
                {project.specs.beds > 0 && (
                  <div className="flex items-center gap-3">
                    <BedDouble size={20} className="text-accent" strokeWidth={1.5} />
                    <div>
                      <p className="heading-sm text-foreground">{project.specs.beds}</p>
                      <p className="text-sm text-muted-foreground">Bedrooms</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <Bath size={20} className="text-accent" strokeWidth={1.5} />
                  <div>
                    <p className="heading-sm text-foreground">{project.specs.baths}</p>
                    <p className="text-sm text-muted-foreground">Bathrooms</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Maximize size={20} className="text-accent" strokeWidth={1.5} />
                  <div>
                    <p className="heading-sm text-foreground">{project.specs.sqft}</p>
                    <p className="text-sm text-muted-foreground">Sq. Ft.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Car size={20} className="text-accent" strokeWidth={1.5} />
                  <div>
                    <p className="heading-sm text-foreground">{project.specs.parking}</p>
                    <p className="text-sm text-muted-foreground">Parking</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Gallery */}
            <AnimatedSection delay={0.3}>
              <p className="label-text text-accent mb-6 mt-12">Gallery</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.gallery.map((img, i) => (
                  <div key={i} className={`image-reveal ${i === 0 ? "md:col-span-2 aspect-video" : "aspect-[4/3]"}`}>
                    <img src={img} alt={`${project.title} gallery ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-32">
              <AnimatedSection delay={0.2}>
                <div className="border border-border p-8">
                  <p className="label-text text-muted-foreground mb-2">Starting From</p>
                  <p className="heading-lg text-foreground mb-8">{project.price}</p>
                  <Link
                    to="/contact"
                    className="block w-full text-center bg-accent text-accent-foreground py-4 label-text hover:bg-warm-orange-hover transition-colors duration-300 mb-4"
                  >
                    Inquire Now
                  </Link>
                  <Link
                    to="/contact"
                    className="block w-full text-center border border-border text-foreground py-4 label-text hover:bg-muted transition-colors duration-300"
                  >
                    Schedule Visit
                  </Link>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProjectDetails;
