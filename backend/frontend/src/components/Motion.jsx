import { motion } from "framer-motion";

// Module-scope motion variants — stable references across renders.
// Avoids creating new objects on each render that would defeat memoization.
const EASE_OUT_QUART = [0.16, 1, 0.3, 1];

export const FADE_UP_TRANSITION = { duration: 0.6, ease: EASE_OUT_QUART };
export const STAGGER_CHILD_TRANSITION = { duration: 0.55, ease: EASE_OUT_QUART };
export const VIEWPORT_OPTS = { once: true, margin: "-80px" };

const STAGGER_CONTAINER_VARIANTS = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const STAGGER_ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: STAGGER_CHILD_TRANSITION },
};

export function FadeUp({ children, delay = 0, className = "", ...rest }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_OPTS}
      transition={{ ...FADE_UP_TRANSITION, delay }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function StaggerGroup({ children, className = "", stagger = 0.08 }) {
  // Custom stagger value retains a stable variants object via memo-equivalent
  // shape: only override transition.staggerChildren if caller asked for non-default.
  const variants =
    stagger === 0.08
      ? STAGGER_CONTAINER_VARIANTS
      : { hidden: {}, show: { transition: { staggerChildren: stagger } } };

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT_OPTS}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "" }) {
  return (
    <motion.div variants={STAGGER_ITEM_VARIANTS} className={className}>
      {children}
    </motion.div>
  );
}
