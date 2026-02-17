import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RevealOptions {
  y?: number;
  x?: number;
  opacity?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
  start?: string;
  scale?: number;
}

/**
 * Hook to apply GSAP scroll-triggered reveal animation to child elements.
 * Pass a selector string for children to animate (e.g., ".reveal-item").
 */
const useGSAPReveal = (
  childSelector: string = ".gsap-reveal",
  options: RevealOptions = {}
) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray(childSelector) as HTMLElement[];
      if (!elements.length) return;

      elements.forEach((el, i) => {
        gsap.fromTo(
          el,
          {
            y: options.y ?? 60,
            x: options.x ?? 0,
            opacity: options.opacity ?? 0,
            scale: options.scale ?? 1,
          },
          {
            y: 0,
            x: 0,
            opacity: 1,
            scale: 1,
            duration: options.duration ?? 1,
            delay: (options.delay ?? 0) + i * (options.stagger ?? 0),
            ease: options.ease ?? "power3.out",
            scrollTrigger: {
              trigger: el,
              start: options.start ?? "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [childSelector, options.y, options.x, options.duration, options.delay, options.stagger, options.ease, options.start, options.scale, options.opacity]);

  return containerRef;
};

/**
 * Hook for parallax effect using GSAP ScrollTrigger.
 * Returns a ref to attach to the parallax container.
 */
export const useGSAPParallax = (speed: number = 0.3) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        yPercent: -speed * 100,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [speed]);

  return ref;
};

/**
 * Hook for horizontal scroll gallery pinning.
 */
export const useHorizontalScroll = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const totalWidth = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${totalWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return { sectionRef, trackRef };
};

export default useGSAPReveal;
