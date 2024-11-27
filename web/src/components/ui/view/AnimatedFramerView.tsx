import { motion } from "framer-motion";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const commonProps = {
  post: {
    initial: { y: 100, opacity: 0 },
    animate: { y: 0.5, opacity: 1 },
    exit: { y: -100, opacity: 0 },
  },
};

export const AnimatedView = ({ children }: Props) => {
  const animation = commonProps.post;

  return (
    <motion.div
      initial={animation.initial}
      animate={animation.animate}
      exit={animation.exit}
      transition={{
        type: "spring",
        stiffness: 360,
        damping: 30,
      }}
    >
      {children}
    </motion.div>
  );
};
