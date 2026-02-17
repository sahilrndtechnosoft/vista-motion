import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;

export const getLenis = () => lenisInstance;

const useSmoothScroll = () => {
  const lenisRef = useRef<Lenis | null>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;
    lenisInstance = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisInstance = null;
      gsap.ticker.remove(lenis.raf as any);
    };
  }, []);

  // On route change: scroll to top and refresh ScrollTrigger
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }

    // Give DOM time to settle, then refresh triggers
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    return () => {
      clearTimeout(timeout);
      // Kill all ScrollTrigger instances on route change to prevent stale triggers
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [pathname]);

  return lenisRef;
};

export default useSmoothScroll;
