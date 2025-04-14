
import { useEffect, useRef, useState } from 'react';

const AnimatedBackground = () => {
  // Componente de fundo animado com interação de mouse
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('AnimatedBackground useEffect called');
    if (!canvasRef.current || !containerRef.current) {
      console.log('Canvas or container ref is null');
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.log('Failed to get canvas context');
      return;
    }

    console.log('Canvas and context initialized successfully');

    // Set canvas size
    const updateSize = () => {
      const container = containerRef.current;
      if (!container) return;

      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    // Create particles
    const particles: Particle[] = [];
    const particleCount = 100;

    interface Particle {
      x: number;
      y: number;
      radius: number;
      color: string;
      speed: number;
      direction: number;
      vx: number;
      vy: number;
      opacity: number;
      // Propriedades adicionais para animação suave
      targetOpacity?: number;
      targetRadius?: number;
      lastInteraction?: number; // Timestamp da última interação
      isActive?: boolean; // Se a partícula está ativa (sob efeito do mouse)
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        color: `hsl(${Math.random() * 30 + 250}, 70%, 70%)`,
        speed: Math.random() * 0.5 + 0.1,
        direction: Math.random() * Math.PI * 2,
        vx: 0,
        vy: 0,
        opacity: Math.random() * 0.5 + 0.2
      });
    }

    // Update particle positions
    const update = () => {
      particles.forEach(p => {
        p.vx = Math.cos(p.direction) * p.speed;
        p.vy = Math.sin(p.direction) * p.speed;

        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) {
          p.vx = -p.vx;
          p.direction = Math.atan2(p.vy, p.vx);
        }

        if (p.y < 0 || p.y > canvas.height) {
          p.vy = -p.vy;
          p.direction = Math.atan2(p.vy, p.vx);
        }

        // Animação suave para opacidade e raio - velocidade muito reduzida
        if (p.targetOpacity !== undefined) {
          p.opacity += (p.targetOpacity - p.opacity) * 0.02; // Reduzido para 0.02 (muito mais lento)
        }

        if (p.targetRadius !== undefined) {
          const originalRadius = Math.random() * 2 + 1;
          p.radius += (p.targetRadius - p.radius) * 0.02; // Reduzido para 0.02 (muito mais lento)

          // Limitar o raio para evitar partículas muito grandes
          if (p.radius > originalRadius * 3) {
            p.radius = originalRadius * 3;
          }
        }
      });
    };

    // Draw particles
    const draw = () => {
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      ctx.lineWidth = 0.5;

      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const opacity = 1 - distance / 100;
            ctx.strokeStyle = `rgba(130, 87, 229, ${opacity * 0.2})`;

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      // Draw particles
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      });
    };

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    const mouseRadius = 100;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;

      // Mouse move detectado

      // Abordagem direta sem usar GSAP para evitar o erro
      particles.forEach(particle => {
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseRadius) {
          // Aplicar efeito diretamente nas partículas
          particle.targetOpacity = 1.0;
          particle.targetRadius = particle.radius * 3.0;
        } else {
          // Restaurar valores originais gradualmente
          particle.targetOpacity = Math.random() * 0.5 + 0.2;
          particle.targetRadius = Math.random() * 2 + 1;
        }
      });
    };

    console.log('Adding mousemove event listeners');
    canvas.addEventListener('mousemove', handleMouseMove);

    // Adicionar evento ao documento como fallback
    const documentMouseMoveHandler = (e: MouseEvent) => {
      // Document mousemove detectado
      // Simular o evento no canvas
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;

      // Chamar a função de manipulação diretamente
      handleMouseMove(e);
    };

    document.addEventListener('mousemove', documentMouseMoveHandler);

    // Touch interaction for mobile devices
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.touches[0].clientX - rect.left;
        mouseY = e.touches[0].clientY - rect.top;

        // Touch move detectado

        // Mesma abordagem direta usada para o mouse
        particles.forEach(particle => {
          const dx = mouseX - particle.x;
          const dy = mouseY - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouseRadius) {
            // Aplicar efeito diretamente nas partículas
            particle.targetOpacity = 0.2;
            particle.targetRadius = particle.radius * 1.2;
          } else {
            // Restaurar valores originais gradualmente
            particle.targetOpacity = Math.random() * 0.5 + 0.2;
            particle.targetRadius = Math.random() * 2 + 1;
          }
        });
      }
    };

    canvas.addEventListener('touchmove', handleTouchMove);

    // Animate
    let animationFrameId: number;

    const animate = () => {
      update();
      draw();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', updateSize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mousemove', documentMouseMoveHandler);
    };
  }, []);

  // Implementação alternativa para interação com o mouse
  const [isMouseActive, setIsMouseActive] = useState(false);

  // Efeito para atualizar as partículas quando o mouse se move
  useEffect(() => {
    if (!isMouseActive || !canvasRef.current) return;

    // Adicionar um efeito visual quando o mouse está ativo
    const canvas = canvasRef.current;
    canvas.style.filter = 'brightness(1.2)';

    // Resetar o efeito quando o mouse fica inativo
    return () => {
      // Usar a referência capturada no escopo do efeito
      canvas.style.filter = 'none';
    };
  }, [isMouseActive]);

  useEffect(() => {
    const globalMouseHandler = (_e: MouseEvent) => {
      // Global mouse handler
      // Ativar o estado de interação
      setIsMouseActive(true);

      // Resetar o estado após um tempo
      setTimeout(() => setIsMouseActive(false), 500);
    };

    window.addEventListener('mousemove', globalMouseHandler);

    return () => {
      window.removeEventListener('mousemove', globalMouseHandler);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-50 overflow-hidden"
      style={{ pointerEvents: 'auto' }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          cursor: isMouseActive ? 'pointer' : 'default',
          transition: 'opacity 0.3s ease',
          opacity: 1
        }}
        onMouseMove={(_e) => {
          // Direct canvas mouse move
          // Atualizar o estado diretamente aqui também
          // Ativar o estado de interação
          setIsMouseActive(true);
          setTimeout(() => setIsMouseActive(false), 500);
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
