import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

gsap.registerPlugin(ScrollTrigger);

const galleryProjects = [
  { id: "skyline-penthouse", title: "Skyline Penthouse", category: "Luxury", image: project1 },
  { id: "coastal-haven", title: "Coastal Haven Villa", category: "Residential", image: project2 },
  { id: "alpine-retreat", title: "Alpine Retreat", category: "Luxury", image: project3 },
  { id: "urban-lofts", title: "Urban Lofts", category: "Commercial", image: project4 },
  { id: "emerald-gardens", title: "Emerald Gardens", category: "Residential", image: project1 },
];

const HorizontalGallery = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const totalWidth = track.scrollWidth - window.innerWidth;

      // Heading reveal
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current.children,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Horizontal scroll
      const tl = gsap.to(track, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${totalWidth}`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Parallax each card image
      const cards = track.querySelectorAll(".gallery-card-img");
      cards.forEach((card) => {
        gsap.to(card, {
          xPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            containerAnimation: tl,
            start: "left right",
            end: "right left",
            scrub: 1,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-secondary overflow-hidden">
      {/* Header area */}
      <div ref={headingRef} className="section-padding pt-20 pb-8 lg:pt-28 lg:pb-12">
        <p className="label-text text-accent mb-4 flex items-center gap-3">
          <span className="inline-block w-8 h-px bg-accent" />
          Portfolio Showcase
        </p>
        <h2 className="heading-lg text-secondary-foreground">
          Explore Our <span className="italic text-accent">Collection</span>
        </h2>
      </div>

      {/* Gallery track */}
      <div ref={trackRef} className="flex gap-6 pl-6 md:pl-12 lg:pl-20 xl:pl-32 pr-20 pb-20 lg:pb-28 will-change-transform">
        {galleryProjects.map((project, i) => (
          <Link
            key={`${project.id}-${i}`}
            to={`/projects/${project.id}`}
            className="group flex-shrink-0 w-[75vw] sm:w-[55vw] md:w-[40vw] lg:w-[30vw] relative"
          >
            <div className="relative overflow-hidden aspect-[3/4]">
              <img
                src={project.image}
                alt={project.title}
                className="gallery-card-img w-[120%] h-full object-cover will-change-transform transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <span className="inline-flex items-center gap-2 label-text text-secondary-foreground">
                  View Project <ArrowUpRight size={14} />
                </span>
              </div>
            </div>
            <div className="mt-4">
              <p className="label-text text-secondary-foreground/40 mb-1">{project.category}</p>
              <h3 className="heading-sm text-secondary-foreground group-hover:text-accent transition-colors duration-300">
                {project.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-6 left-6 md:left-12 lg:left-20 xl:left-32 right-6 md:right-12 lg:right-20 xl:right-32">
        <div className="h-px bg-secondary-foreground/10 relative overflow-hidden">
          <div className="gallery-progress absolute inset-y-0 left-0 bg-accent" style={{ width: "0%" }} />
        </div>
      </div>
    </section>
  );
};

export default HorizontalGallery;
