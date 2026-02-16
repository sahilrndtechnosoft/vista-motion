import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import HorizontalMarquee from "@/components/HorizontalMarquee";

const stats = [
  { value: 250, suffix: "+", label: "Properties Delivered" },
  { value: 15, suffix: "+", label: "Years of Excellence" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 12, suffix: "", label: "Industry Awards" },
];

const Counter = ({ target, suffix, isInView }: { target: number; suffix: string; isInView: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, target]);

  return (
    <span className="heading-xl text-accent tabular-nums">
      {count}{suffix}
    </span>
  );
};

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={ref} className="relative overflow-hidden">
      {/* Marquee text background */}
      <motion.div
        className="absolute inset-0 flex items-center opacity-[0.03] pointer-events-none"
        style={{ y: bgY }}
      >
        <HorizontalMarquee
          text="VERDANT ESTATES"
          className="heading-xl text-secondary-foreground whitespace-nowrap"
          speed={30}
          separator="—"
        />
      </motion.div>

      <div className="section-padding py-24 md:py-36 bg-secondary relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.8,
                delay: i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-center relative"
            >
              {/* Vertical line accent */}
              <motion.div
                className="absolute -top-4 left-1/2 w-px h-8 bg-accent/30"
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 + 0.3 }}
                style={{ originY: 0 }}
              />
              <Counter target={stat.value} suffix={stat.suffix} isInView={isInView} />
              <motion.p
                className="label-text text-secondary-foreground/50 mt-4"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 + 0.5 }}
              >
                {stat.label}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
