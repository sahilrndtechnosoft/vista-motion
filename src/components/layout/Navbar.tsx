import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Projects", path: "/projects" },
  { label: "Career", path: "/career" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 50);
      // Hide navbar on scroll down, show on scroll up
      if (currentY > 300) {
        setHidden(currentY > lastScrollY.current && currentY - lastScrollY.current > 5);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 nav-reveal ${
          hidden ? "nav-hidden" : ""
        } ${
          scrolled
            ? "glass border-b border-border shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="section-padding flex items-center justify-between h-20 lg:h-24">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-serif text-xl md:text-2xl font-semibold tracking-tight">
              <span className="text-primary">Verdant</span>
              <span className={scrolled ? "text-foreground" : "text-primary-foreground"}> Estates</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`label-text btn-underline transition-colors duration-300 ${
                  location.pathname === link.path
                    ? "text-accent"
                    : scrolled
                    ? "text-foreground hover:text-primary"
                    : "text-primary-foreground/80 hover:text-primary-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 label-text hover:bg-warm-orange-hover transition-colors duration-300"
            >
              Get in Touch
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            className={`lg:hidden p-2 ${scrolled ? "text-foreground" : "text-primary-foreground"}`}
            aria-label="Open menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-secondary"
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col h-full section-padding"
            >
              <div className="flex items-center justify-between h-20">
                <span className="font-serif text-xl font-semibold text-secondary-foreground">
                  <span className="text-primary">Verdant</span> Estates
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-secondary-foreground p-2"
                  aria-label="Close menu"
                >
                  <X size={28} />
                </button>
              </div>

              <nav className="flex flex-col gap-6 mt-16">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
                  >
                    <Link
                      to={link.path}
                      className={`heading-md transition-colors ${
                        location.pathname === link.path
                          ? "text-accent"
                          : "text-secondary-foreground hover:text-accent"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto mb-12">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 label-text hover:bg-warm-orange-hover transition-colors duration-300"
                >
                  Get in Touch
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
