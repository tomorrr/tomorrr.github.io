import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  r: number;
  opacity: number;
  speed: number;
  drift: number;
  phase: number;
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let stars: Star[] = [];
    let animId: number;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function createStars() {
      const count = Math.floor((canvas!.width * canvas!.height) / 6000);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * canvas!.width,
        y: Math.random() * canvas!.height,
        r: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.6 + 0.1,
        speed: Math.random() * 0.3 + 0.05,
        drift: (Math.random() - 0.5) * 0.15,
        phase: Math.random() * Math.PI * 2,
      }));
    }
    createStars();
    window.addEventListener("resize", createStars);

    let frame = 0;
    function draw() {
      frame++;
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      for (const s of stars) {
        const flicker = Math.sin(frame * 0.02 + s.phase) * 0.3 + 0.7;
        const alpha = s.opacity * flicker;

        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(186, 230, 253, ${alpha})`;
        ctx!.fill();

        // Add subtle glow for larger stars
        if (s.r > 1) {
          ctx!.beginPath();
          ctx!.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(186, 230, 253, ${alpha * 0.12})`;
          ctx!.fill();
        }

        s.y -= s.speed;
        s.x += s.drift;

        if (s.y < -5) s.y = canvas!.height + 5;
        if (s.x < -5) s.x = canvas!.width + 5;
        if (s.x > canvas!.width + 5) s.x = -5;
      }

      animId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("resize", createStars);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-5"
      style={{ zIndex: -5 }}
    />
  );
}
