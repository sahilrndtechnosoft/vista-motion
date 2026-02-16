import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

const stats = [
  { value: 250, suffix: "+", label: "Properties Delivered" },
  { value: 15, suffix: "+", label: "Years of Excellence" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 12, suffix: "", label: "Industry Awards" },
];

const Counter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

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
    <span ref={ref} className="heading-xl text-accent tabular-nums">
      {count}{suffix}
    </span>
  );
};

const StatsSection = () => {
  return (
    <section className="section-padding py-20 md:py-28 bg-secondary">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        {stats.map((stat, i) => (
          <AnimatedSection key={stat.label} delay={i * 0.1} className="text-center">
            <Counter target={stat.value} suffix={stat.suffix} />
            <p className="label-text text-secondary-foreground/50 mt-4">{stat.label}</p>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
