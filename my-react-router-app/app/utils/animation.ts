export const fadeInAnimation = (index: number) => ({
  hidden: {
    opacity: 0,
    y: "80px",
    rotate: 3,
  },
  visible: {
    opacity: 1,
    y: "0px",
    rotate: 0,
    transition: {
      delay: index * 0.25,
      duration: 1,
      ease: [0.2, 0.65, 0.3, 0.9],
    },
  },
});

export const fadeInPropsFn = (index = 0) => ({
  initial: "hidden",
  animate: "visible",
  variants: fadeInAnimation(index),
});

export const zoomInAnimation = (index: number) => ({
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: index * 0.25,
      duration: 1,
      ease: [0.2, 0.65, 0.3, 0.9],
    },
  },
});

export const zoomInPropsFn = (index = 0) => ({
  initial: "hidden",
  animate: "visible",
  variants: zoomInAnimation(index),
});
