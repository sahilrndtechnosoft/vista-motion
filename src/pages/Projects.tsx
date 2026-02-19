import { useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ShaderImage from "@/components/ShaderImage";
import { initVelocityProxy } from "@/lib/velocityProxy";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

gsap.registerPlugin(ScrollTrigger, Draggable);

const allProjects = [
  { id: "skyline-penthouse", title: "Skyline Penthouse", category: "Luxury", location: "Downtown Metropolitan", price: "$4.2M", image: project1 },
  { id: "coastal-haven", title: "Coastal Haven Villa", category: "Residential", location: "Oceanfront Drive", price: "$3.8M", image: project2 },
  { id: "alpine-retreat", title: "Alpine Retreat", category: "Luxury", location: "Mountain Ridge", price: "$5.1M", image: project3 },
  { id: "urban-lofts", title: "Urban Lofts", category: "Commercial", location: "Arts District", price: "$2.4M", image: project4 },
  { id: "emerald-gardens", title: "Emerald Gardens", category: "Residential", location: "Hillside Avenue", price: "$1.9M", image: project3 },
  { id: "harbour-tower", title: "Harbour Tower", category: "Commercial", location: "Waterfront Plaza", price: "$8.5M", image: project1 },
];

function buildSeamlessLoop(
  items: HTMLElement[],
  spacing: number,
  animateFunc: (el: HTMLElement) => gsap.core.Timeline
) {
  const overlap = Math.ceil(1 / spacing);
  const startTime = items.length * spacing + 0.5;
  const loopTime = (items.length + overlap) * spacing + 1;
  const rawSequence = gsap.timeline({ paused: true });
  const seamlessLoop = gsap.timeline({
    paused: true,
    repeat: -1,
    onRepeat() {
      // @ts-ignore
      if (this._time === this._dur) this._tTime += this._dur - 0.01;
    },
  });

  const l = items.length + overlap * 2;
  for (let i = 0; i < l; i++) {
    const index = i % items.length;
    const time = i * spacing;
    rawSequence.add(animateFunc(items[index]), time);
    if (i <= items.length) seamlessLoop.add("label" + i, time);
  }

  rawSequence.time(startTime);
  seamlessLoop
    .to(rawSequence, { time: loopTime, duration: loopTime - startTime, ease: "none" })
    .fromTo(
      rawSequence,
      { time: overlap * spacing + 1 },
      { time: startTime, duration: startTime - (overlap * spacing + 1), immediateRender: false, ease: "none" }
    );

  return seamlessLoop;
}

const Projects = () => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLUListElement>(null);
  const dragProxyRef = useRef<HTMLDivElement>(null);
  const iterationRef = useRef(0);
  const scrubRef = useRef<gsap.core.Tween | null>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const seamlessLoopRef = useRef<gsap.core.Timeline | null>(null);

  const scrollToOffset = useCallback((offset: number) => {
    const scrub = scrubRef.current;
    const trigger = triggerRef.current;
    const seamlessLoop = seamlessLoopRef.current;
    if (!scrub || !trigger || !seamlessLoop) return;

    const spacing = 0.1;
    const snapTime = gsap.utils.snap(spacing);
    const snappedTime = snapTime(offset);
    const progress =
      (snappedTime - seamlessLoop.duration() * iterationRef.current) / seamlessLoop.duration();
    const progressToScroll = (p: number) =>
      gsap.utils.clamp(1, trigger.end - 1, gsap.utils.wrap(0, 1, p) * trigger.end);
    const scroll = progressToScroll(progress);

    if (progress >= 1 || progress < 0) {
      iterationRef.current += Math.floor(progress);
      trigger.scroll(scroll);
      trigger.update();
      return;
    }
    trigger.scroll(scroll);
  }, []);

  useEffect(() => {
    // Initialize the shared velocity proxy for shader distortion
    initVelocityProxy();
  }, []);

  useEffect(() => {
    if (!galleryRef.current || !cardsRef.current || !dragProxyRef.current) return;

    const spacing = 0.1;
    const cards = gsap.utils.toArray<HTMLElement>(".carousel-card");
    if (!cards.length) return;

    gsap.set(cards, { xPercent: 400, opacity: 0, scale: 0 });

    const animateFunc = (element: HTMLElement) => {
      const tl = gsap.timeline();
      tl.fromTo(
        element,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, zIndex: 100, duration: 0.5, yoyo: true, repeat: 1, ease: "power1.in", immediateRender: false }
      ).fromTo(
        element,
        { xPercent: 400 },
        { xPercent: -400, duration: 1, ease: "none", immediateRender: false },
        0
      );
      return tl;
    };

    const seamlessLoop = buildSeamlessLoop(cards, spacing, animateFunc);
    seamlessLoopRef.current = seamlessLoop;

    const snapTime = gsap.utils.snap(spacing);
    const playhead = { offset: 0 };
    const wrapTime = gsap.utils.wrap(0, seamlessLoop.duration());

    const scrub = gsap.to(playhead, {
      offset: 0,
      onUpdate() { seamlessLoop.time(wrapTime(playhead.offset)); },
      duration: 0.5,
      ease: "power3",
      paused: true,
    });
    scrubRef.current = scrub;

    const trigger = ScrollTrigger.create({
      start: 0,
      onUpdate(self) {
        const scroll = self.scroll();
        if (scroll > self.end - 1) {
          iterationRef.current += 1;
          trigger.scroll(2);
          trigger.update();
        } else if (scroll < 1 && self.direction < 0) {
          iterationRef.current -= 1;
          trigger.scroll(self.end - 2);
          trigger.update();
        } else {
          scrub.vars.offset = (iterationRef.current + self.progress) * seamlessLoop.duration();
          scrub.invalidate().restart();
        }
      },
      end: "+=3000",
      pin: galleryRef.current,
    });
    triggerRef.current = trigger;

    const onScrollEnd = () => scrollToOffset(scrub.vars.offset as number);
    ScrollTrigger.addEventListener("scrollEnd", onScrollEnd);

    Draggable.create(dragProxyRef.current, {
      type: "x",
      trigger: cardsRef.current,
      onPress() { (this as any).startOffset = scrub.vars.offset; },
      onDrag() {
        scrub.vars.offset = (this as any).startOffset + ((this as any).startX - this.x) * 0.001;
        scrub.invalidate().restart();
      },
      onDragEnd() { scrollToOffset(scrub.vars.offset as number); },
    });

    return () => {
      ScrollTrigger.removeEventListener("scrollEnd", onScrollEnd);
      trigger.kill();
      scrub.kill();
      seamlessLoop.kill();
    };
  }, [scrollToOffset]);

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

      {/* Carousel Gallery */}
      <div
        ref={galleryRef}
        className="gallery relative h-screen w-full bg-background flex flex-col items-center justify-center overflow-hidden"
      >
        <ul
          ref={cardsRef}
          className="cards absolute inset-0 flex items-center justify-center list-none m-0 p-0"
        >
          {allProjects.map((project, i) => (
            <li
              key={`${project.id}-${i}`}
              className="carousel-card absolute"
              style={{ willChange: "transform, opacity" }}
            >
              <Link
                to={`/projects/${project.id}`}
                className="group block w-[20rem] h-[28rem] md:w-[24rem] md:h-[32rem] rounded-2xl overflow-hidden relative shadow-elevated"
              >
                <ShaderImage
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/30 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 pointer-events-none">
                  <p className="label-text text-accent mb-2">{project.category}</p>
                  <h3 className="heading-sm text-secondary-foreground mb-1">{project.title}</h3>
                  <p className="body-md text-secondary-foreground/60">{project.location}</p>
                  <p className="label-text text-secondary-foreground/80 mt-3">{project.price}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {/* Drag proxy */}
        <div ref={dragProxyRef} className="drag-proxy absolute inset-0 pointer-events-none" />

        {/* Navigation */}
        <div className="absolute bottom-12 flex items-center gap-6 z-10">
          <button
            onClick={() => scrollToOffset((scrubRef.current?.vars.offset as number) - 0.1)}
            className="prev w-14 h-14 rounded-full border border-border bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300 hover-lift"
            aria-label="Previous project"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scrollToOffset((scrubRef.current?.vars.offset as number) + 0.1)}
            className="next w-14 h-14 rounded-full border border-border bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300 hover-lift"
            aria-label="Next project"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </main>
  );
};

export default Projects;
