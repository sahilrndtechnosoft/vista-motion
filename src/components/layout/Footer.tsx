import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const footerLinks = [
  {
    title: "Navigation",
    links: [
      { label: "Home", path: "/" },
      { label: "About", path: "/about" },
      { label: "Projects", path: "/projects" },
      { label: "Career", path: "/career" },
      { label: "Contact", path: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Residential", path: "/projects" },
      { label: "Commercial", path: "/projects" },
      { label: "Luxury Homes", path: "/projects" },
      { label: "Consulting", path: "/contact" },
    ],
  },
];

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      const children = footerRef.current!.querySelectorAll(".footer-reveal");
      gsap.fromTo(
        children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div ref={footerRef} className="section-padding py-20 lg:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2 footer-reveal" style={{ opacity: 0 }}>
            <h3 className="font-serif text-3xl md:text-4xl font-medium mb-6">
              <span className="text-primary">Verdant</span> Estates
            </h3>
            <p className="body-md text-secondary-foreground/60 max-w-md mb-8">
              Crafting exceptional living spaces that redefine luxury. 
              Where vision meets architecture, and dreams find their address.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-accent label-text link-underline-grow"
            >
              Start a Conversation <ArrowUpRight size={16} />
            </Link>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title} className="footer-reveal" style={{ opacity: 0 }}>
              <h4 className="label-text text-secondary-foreground/40 mb-6">{group.title}</h4>
              <ul className="space-y-4">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="body-md text-secondary-foreground/70 hover:text-accent transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-reveal border-t border-secondary-foreground/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4" style={{ opacity: 0 }}>
          <p className="text-sm text-secondary-foreground/40">
            © {new Date().getFullYear()} Verdant Estates. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-sm text-secondary-foreground/40 hover:text-secondary-foreground/60 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="text-sm text-secondary-foreground/40 hover:text-secondary-foreground/60 cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
