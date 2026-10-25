import React, { useEffect, useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function FloatingPetals() {
  const canvasRef = useRef(null);
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    if (!isEnabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Petal particle definitions
    const colors = [
      'rgba(221, 166, 178, 0.65)', // Blush Pink
      'rgba(247, 232, 235, 0.75)', // Soft Rose Mist
      'rgba(248, 241, 236, 0.85)', // Ivory White
      'rgba(167, 185, 160, 0.45)', // Whisper Sage Leaf
      'rgba(232, 217, 197, 0.60)', // Warm Sand Petal
    ];

    const petalCount = Math.min(38, Math.floor(width / 35));
    const petals = [];

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 11 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: Math.random() * 1.2 - 0.4,
        speedY: Math.random() * 0.9 + 0.6,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 1.5,
        swayAngle: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.02 + 0.01,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      petals.forEach((p) => {
        p.swayAngle += p.swaySpeed;
        p.x += p.speedX + Math.sin(p.swayAngle) * 0.8;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        // Wrap around borders
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);

        // Draw organic petal curve
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-p.size / 2, -p.size, -p.size, p.size / 2, 0, p.size);
        ctx.bezierCurveTo(p.size, p.size / 2, p.size / 2, -p.size, 0, 0);
        ctx.fill();

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isEnabled]);

  return (
    <>
      {isEnabled && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-20 opacity-80"
          aria-hidden="true"
        />
      )}
      {/* Floating Petals Toggle Pill */}
      <button
        onClick={() => setIsEnabled(!isEnabled)}
        title={isEnabled ? 'Mute falling petals' : 'Enable heavenly falling petals'}
        className={`fixed bottom-5 right-5 z-40 flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium shadow-romantic border transition-all duration-300 backdrop-blur-md ${
          isEnabled
            ? 'bg-ivory/90 border-blush/40 text-berry-600 hover:bg-blush-light'
            : 'bg-sand-100/90 border-sand-300 text-berry-400 hover:bg-ivory'
        }`}
      >
        <Sparkles className={`w-3.5 h-3.5 ${isEnabled ? 'text-blush-500 animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
        <span>{isEnabled ? 'Petals Falling' : 'Petals Paused'}</span>
      </button>
    </>
  );
}
