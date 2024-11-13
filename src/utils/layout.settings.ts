export const pageVariants = {
  initial: { 
    opacity: 0, 
    scale: 0.99 
  },
  in: { 
    opacity: 1, 
    scale: 1 
  },
  out: { 
    opacity: 0, 
    scale: 1.01 
  }
};

export const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

