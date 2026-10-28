import confetti from 'canvas-confetti';

export function fireConfetti(options = {}) {
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#e84a72', '#ff758c', '#6366f1', '#4cc9f0', '#f59e0b', '#10b981'],
      ...options,
    });
  } catch (e) {
    // fallback if canvas not available
  }
}

export function fireCannons() {
  try {
    const end = Date.now() + 1.2 * 1000;
    const colors = ['#e84a72', '#ff758c', '#f59e0b', '#6366f1'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  } catch (e) {
    // ignore
  }
}
