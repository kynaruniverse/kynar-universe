import canvasConfetti from 'canvas-confetti';

export const confetti = (options?: canvasConfetti.Options) => {
  return canvasConfetti({
    ...options,
    disableForReducedMotion: true, // Accessibility (UX Canon Section 4)
  });
};
