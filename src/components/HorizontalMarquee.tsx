import { motion } from "framer-motion";

interface HorizontalMarqueeProps {
  text: string;
  className?: string;
  speed?: number;
  separator?: string;
}

const HorizontalMarquee = ({
  text,
  className = "",
  speed = 20,
  separator = "✦",
}: HorizontalMarqueeProps) => {
  const items = Array(6).fill(`${text} ${separator} `);

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-block"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: { repeat: Infinity, repeatType: "loop", duration: speed, ease: "linear" },
        }}
      >
        {items.map((item, i) => (
          <span key={i} className="inline-block">
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default HorizontalMarquee;
