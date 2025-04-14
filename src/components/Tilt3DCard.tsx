
import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { cn } from '@/lib/utils';

interface Tilt3DCardProps {
  children: React.ReactNode;
  className?: string;
  glareEnabled?: boolean;
  tiltAmount?: number;
}

const Tilt3DCard = ({ 
  children, 
  className, 
  glareEnabled = true,
  tiltAmount = 10 
}: Tilt3DCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  
  useEffect(() => {
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovering) return;
      
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate rotation based on mouse position
      const rotateY = ((x / rect.width) - 0.5) * tiltAmount;
      const rotateX = ((y / rect.height) - 0.5) * -tiltAmount;
      
      // Apply tilt effect with GSAP
      gsap.to(card, {
        rotateY: rotateY,
        rotateX: rotateX,
        transformPerspective: 1000,
        duration: 0.4,
        ease: "power2.out"
      });
      
      // Move glare effect
      if (glare && glareEnabled) {
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        
        gsap.to(glare, {
          backgroundPosition: `${glareX}% ${glareY}%`,
          opacity: 0.2,
          duration: 0.4
        });
      }
    };
    
    const handleMouseEnter = () => {
      setIsHovering(true);
      
      // Apply hover animation
      gsap.to(card, {
        scale: 1.05,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        duration: 0.3,
        ease: "power2.out"
      });
      
      // Show glare effect
      if (glare && glareEnabled) {
        gsap.to(glare, {
          opacity: 0.1,
          duration: 0.3
        });
      }
    };
    
    const handleMouseLeave = () => {
      setIsHovering(false);
      
      // Reset transform
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        scale: 1,
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        duration: 0.5,
        ease: "power3.out"
      });
      
      // Hide glare effect
      if (glare && glareEnabled) {
        gsap.to(glare, {
          opacity: 0,
          duration: 0.5
        });
      }
    };
    
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isHovering, tiltAmount, glareEnabled]);
  
  return (
    <div 
      ref={cardRef}
      className={cn(
        "relative rounded-xl overflow-hidden transition-all duration-300 transform-gpu",
        className
      )}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {glareEnabled && (
        <div 
          ref={glareRef}
          className="absolute inset-0 z-10 pointer-events-none opacity-0 transition-opacity"
          style={{
            backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 80%)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '50% 50%',
            mixBlendMode: 'overlay'
          }}
        />
      )}
      <div style={{ transform: 'translateZ(0)' }}>
        {children}
      </div>
    </div>
  );
};

export default Tilt3DCard;
