import { useEffect, useRef } from 'react';

type SignalNode = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  phase: number;
};

const palette = {
  cyan: 'rgba(0, 229, 255,',
  lime: 'rgba(190, 255, 0,',
  coral: 'rgba(255, 77, 94,',
  steel: 'rgba(128, 150, 164,',
};

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<SignalNode[]>([]);
  const pointerRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!canvas || !ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const colors = [palette.cyan, palette.lime, palette.coral, palette.steel];
    let width = 0;
    let height = 0;
    let frameId = 0;

    const createNodes = () => {
      const density = width < 768 ? 36 : 70;
      nodesRef.current = Array.from({ length: density }, (_, index) => {
        const color = colors[index % colors.length];

        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          radius: Math.random() * 1.8 + 0.8,
          color,
          phase: Math.random() * Math.PI * 2,
        };
      });
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createNodes();
    };

    const drawGrid = () => {
      ctx.save();
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(128, 150, 164, 0.055)';

      for (let x = -80; x < width + 80; x += 80) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + height * 0.22, height);
        ctx.stroke();
      }

      for (let y = 40; y < height; y += 96) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y - width * 0.04);
        ctx.stroke();
      }

      ctx.restore();
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      drawGrid();

      const nodes = nodesRef.current;

      nodes.forEach((node) => {
        if (!reducedMotion) {
          node.x += node.vx;
          node.y += node.vy;
        }

        if (node.x < -30) node.x = width + 30;
        if (node.x > width + 30) node.x = -30;
        if (node.y < -30) node.y = height + 30;
        if (node.y > height + 30) node.y = -30;
      });

      ctx.save();
      ctx.lineWidth = 0.75;

      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 132) {
            const alpha = (1 - distance / 132) * 0.18;
            ctx.strokeStyle = `${a.color} ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      nodes.forEach((node) => {
        const pulse = reducedMotion ? 0 : Math.sin(time * 0.0016 + node.phase) * 0.45;
        const radius = node.radius + pulse;
        const pointer = pointerRef.current;
        const dx = pointer.x - node.x;
        const dy = pointer.y - node.y;
        const pointerDistance = Math.sqrt(dx * dx + dy * dy);
        const lift = pointer.active && pointerDistance < 150 ? 0.45 : 0;

        ctx.beginPath();
        ctx.arc(node.x, node.y, Math.max(radius + lift, 0.7), 0, Math.PI * 2);
        ctx.fillStyle = `${node.color} ${0.28 + lift})`;
        ctx.fill();
      });

      ctx.restore();

      if (!reducedMotion) {
        frameId = requestAnimationFrame(draw);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerRef.current = { x: event.clientX, y: event.clientY, active: true };
      window.setTimeout(() => {
        pointerRef.current.active = false;
      }, 260);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    frameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-50 h-screen w-screen opacity-90"
    />
  );
};

export default AnimatedBackground;
