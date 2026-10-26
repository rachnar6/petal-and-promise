import React, { useEffect, useRef } from 'react';

// Warm palette petals matching the new floral colour scheme
const PETAL_COLORS = [
  'rgba(232, 160, 32,  0.70)',  // golden amber
  'rgba(200, 88,  26,  0.65)',  // burnt orange
  'rgba(224, 112, 112, 0.65)', // coral pink
  'rgba(240, 192, 96,  0.70)', // warm yellow
  'rgba(200, 64,  96,  0.55)', // deep rose
  'rgba(253, 220, 160, 0.75)', // soft peach
  'rgba(139, 26,  42,  0.45)', // crimson
  'rgba(248, 216, 120, 0.70)', // sunflower yellow
];

const PETAL_COUNT = 22;

function randomBetween(a, b) { return a + Math.random() * (b - a); }

export default function BlossomBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animId;
    let W = (canvas.width  = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const onResize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    // Build petal particles
    const petals = Array.from({ length: PETAL_COUNT }, () => spawnPetal(W, H, true));

    function spawnPetal(W, H, initial = false) {
      return {
        x:       randomBetween(0, W),
        y:       initial ? randomBetween(-H, H) : randomBetween(-120, -20),
        size:    randomBetween(9, 20),
        color:   PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
        speedY:  randomBetween(0.6, 1.6),
        speedX:  randomBetween(-0.4, 0.4),
        rot:     randomBetween(0, Math.PI * 2),
        rotSpd:  randomBetween(-0.018, 0.018),
        sway:    randomBetween(0, Math.PI * 2),
        swaySpd: randomBetween(0.008, 0.022),
        swayAmp: randomBetween(18, 45),
      };
    }

    function drawPetal(p) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      // organic petal shape
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-p.size * 0.55, -p.size, -p.size, p.size * 0.55, 0, p.size);
      ctx.bezierCurveTo( p.size,        p.size * 0.55,  p.size * 0.55, -p.size, 0, 0);
      ctx.fill();
      ctx.restore();
    }

    function tick() {
      ctx.clearRect(0, 0, W, H);

      petals.forEach((p, i) => {
        p.sway  += p.swaySpd;
        p.x     += p.speedX + Math.sin(p.sway) * 0.7;
        p.y     += p.speedY;
        p.rot   += p.rotSpd;

        if (p.y > H + 40 || p.x < -60 || p.x > W + 60) {
          petals[i] = spawnPetal(W, H, false);
        } else {
          drawPetal(p);
        }
      });

      animId = requestAnimationFrame(tick);
    }

    tick();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[3] opacity-70"
      aria-hidden="true"
    />
  );
}
