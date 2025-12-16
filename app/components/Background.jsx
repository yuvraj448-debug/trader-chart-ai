"use client";

import { useEffect, useRef } from "react";

export default function Background() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let w, h;
    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.2 + 0.2,
      o: Math.random() * 0.6 + 0.2,
    }));

    let angle = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // background
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, w, h);

      // stars
      for (const s of stars) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${s.o})`;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // rings
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.rotate(angle);

      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.strokeStyle = "rgba(56,189,248,0.6)";
        ctx.lineWidth = 1.2;
        ctx.shadowColor = "rgba(56,189,248,0.8)";
        ctx.shadowBlur = 18;
        ctx.arc(0, 0, 180 + i * 60, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.restore();

      angle += 0.002; // slow luxury motion
      requestAnimationFrame(draw);
    };

    draw();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
      }}
    />
  );
}