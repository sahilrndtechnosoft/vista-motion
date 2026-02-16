import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  splitBy?: "words" | "chars";
}

const TextReveal = ({
  children,
  className = "",
  delay = 0,
  as: Tag = "h2",
  splitBy = "words",
}: TextRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const items = splitBy === "words" ? children.split(" ") : children.split("");

  return (
    <Tag ref={ref} className={className}>
      {items.map((item, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", rotateX: -80 }}
            animate={isInView ? { y: 0, rotateX: 0 } : { y: "110%", rotateX: -80 }}
            transition={{
              duration: 0.7,
              delay: delay + i * 0.04,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {item}
            {splitBy === "words" && "\u00A0"}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};

export default TextReveal;
