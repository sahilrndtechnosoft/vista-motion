import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  scale?: boolean;
}

const ParallaxImage = ({
  src,
  alt,
  className = "",
  speed = 0.2,
  scale = true,
}: ParallaxImageProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}%`, `${speed * 100}%`]);
  const scaleVal = useTransform(scrollYProgress, [0, 0.5, 1], scale ? [1.15, 1, 1.05] : [1, 1, 1]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale: scaleVal }}
        className="w-full h-full object-cover will-change-transform"
        loading="lazy"
      />
    </div>
  );
};

export default ParallaxImage;
