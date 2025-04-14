
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
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
    let mouseRadius = 100;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      
      // Create ripple effect
      gsap.to(particles, {
        stagger: {
          each: 0.001,
          grid: "auto" // Fixed: Changed from "random" to "auto"
        },
        opacity: (i, target) => {
          const particle = target as unknown as Particle;
          const dx = mouseX - particle.x;
          const dy = mouseY - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouseRadius) {
            return 0.8;
          }
          return particle.opacity;
        },
        radius: (i, target) => {
          const particle = target as unknown as Particle;
          const dx = mouseX - particle.x;
          const dy = mouseY - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouseRadius) {
            return particle.radius * 1.5;
          }
          return particle.radius;
        },
        duration: 0.5,
        ease: "power2.out"
      });
    };
    
    canvas.addEventListener('mousemove', handleMouseMove);
    
    // Touch interaction for mobile devices
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.touches[0].clientX - rect.left;
        mouseY = e.touches[0].clientY - rect.top;
        
        // Same ripple effect as mouse
        gsap.to(particles, {
          stagger: {
            each: 0.001,
            grid: "auto"
          },
          opacity: (i, target) => {
            const particle = target as unknown as Particle;
            const dx = mouseX - particle.x;
            const dy = mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < mouseRadius) {
              return 0.8;
            }
            return particle.opacity;
          },
          radius: (i, target) => {
            const particle = target as unknown as Particle;
            const dx = mouseX - particle.x;
            const dy = mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < mouseRadius) {
              return particle.radius * 1.5;
            }
            return particle.radius;
          },
          duration: 0.5,
          ease: "power2.out"
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
    };
  }, []);
  
  return (
    <div ref={containerRef} className="fixed inset-0 -z-10">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default AnimatedBackground;
