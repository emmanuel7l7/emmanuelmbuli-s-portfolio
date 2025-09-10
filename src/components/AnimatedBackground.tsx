import { useEffect, useRef, useState } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

interface Cloud {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

interface AnimatedBackgroundProps {
  scrollProgress: number;
}

export const AnimatedBackground = ({ scrollProgress }: AnimatedBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [stars] = useState<Star[]>(() => {
    return Array.from({ length: 150 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      z: Math.random() * 1000,
      size: Math.random() * 2 + 0.5,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinklePhase: Math.random() * Math.PI * 2,
    }));
  });

  const [clouds] = useState<Cloud[]>(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      x: (Math.random() - 0.5) * window.innerWidth * 2,
      y: Math.random() * window.innerHeight * 0.4 + 50,
      size: Math.random() * 100 + 80,
      speed: Math.random() * 0.3 + 0.1,
      opacity: Math.random() * 0.4 + 0.2,
    }));
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let animationFrame: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Subtle but noticeable light transition based on scroll
      const safeScrollProgress = Math.max(0, Math.min(scrollProgress || 0, 1));
      
      // Dim background gradient with clear but subtle lighting transition
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      
      // Transition from dark night to dim daylight
      const baseLightness1 = 8 + safeScrollProgress * 12; // From 8% to 20%
      const baseLightness2 = 12 + safeScrollProgress * 15; // From 12% to 27%
      const baseLightness3 = 4 + safeScrollProgress * 10; // From 4% to 14%
      
      // Slightly reduce saturation as it gets lighter for more natural look
      const baseSaturation1 = 25 - safeScrollProgress * 5; // From 25% to 20%
      const baseSaturation2 = 35 - safeScrollProgress * 8; // From 35% to 27%
      
      gradient.addColorStop(0, `hsl(225, ${baseSaturation1}%, ${baseLightness1}%)`);
      gradient.addColorStop(0.6, `hsl(225, ${baseSaturation2}%, ${baseLightness2}%)`);
      gradient.addColorStop(1, `hsl(225, ${baseSaturation1}%, ${baseLightness3}%)`);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars (fade as background gets lighter)
      stars.forEach((star) => {
        star.twinklePhase += star.twinkleSpeed;
        
        const twinkle = (Math.sin(star.twinklePhase) + 1) * 0.5;
        const baseOpacity = (1 - safeScrollProgress * 0.8) * 0.7; // More noticeable fade
        const opacity = baseOpacity * (0.3 + twinkle * 0.7);

        if (opacity > 0.05) {
          // Mouse interaction - stars move away from cursor
          const dx = star.x - mouseRef.current.x;
          const dy = star.y - mouseRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 150;

          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance * 2;
            star.x += (dx / distance) * force;
            star.y += (dy / distance) * force;
          }

          // Keep stars in bounds
          if (star.x < 0) star.x = canvas.width;
          if (star.x > canvas.width) star.x = 0;
          if (star.y < 0) star.y = canvas.height;
          if (star.y > canvas.height) star.y = 0;

          ctx.save();
          ctx.globalAlpha = opacity;
          ctx.fillStyle = `hsl(225, 100%, ${70 + twinkle * 20}%)`;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * (0.5 + twinkle * 0.5), 0, Math.PI * 2);
          ctx.fill();
          
          // Add glow effect
          ctx.shadowColor = `hsl(225, 100%, 70%)`;
          ctx.shadowBlur = star.size * 3;
          ctx.fill();
          ctx.restore();
        }
      });

      // No sun - removed as requested

      // Draw clouds
      clouds.forEach((cloud, index) => {
        cloud.x += cloud.speed;
        if (cloud.x > canvas.width + cloud.size) {
          cloud.x = -cloud.size;
        }

        const cloudOpacity = cloud.opacity * (0.1 + safeScrollProgress * 0.1); // Slightly more visible as it gets lighter
        
        if (cloudOpacity > 0.01) {
          // Mouse interaction - clouds drift away from cursor
          const dx = cloud.x - mouseRef.current.x;
          const dy = cloud.y - mouseRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 200) {
            const force = (200 - distance) / 200 * 0.5;
            cloud.y += (dy / distance) * force * 0.1;
          }

          ctx.save();
          ctx.globalAlpha = cloudOpacity;
          
          // Subtle cloud gradient (barely visible)
          const cloudGradient = ctx.createRadialGradient(
            cloud.x, cloud.y, 0,
            cloud.x, cloud.y, cloud.size
          );
          cloudGradient.addColorStop(0, `hsl(225, 10%, 20%)`);
          cloudGradient.addColorStop(0.6, `hsl(225, 8%, 18%)`);
          cloudGradient.addColorStop(1, `hsl(225, 5%, 15%)`);
          
          ctx.fillStyle = cloudGradient;
          
          // Draw cloud shapes
          const numCircles = 5;
          for (let i = 0; i < numCircles; i++) {
            const offsetX = (i - 2) * cloud.size * 0.15;
            const offsetY = Math.sin(i * 0.8) * cloud.size * 0.1;
            const circleSize = cloud.size * (0.3 + Math.sin(i * 1.2) * 0.1);
            
            ctx.beginPath();
            ctx.arc(cloud.x + offsetX, cloud.y + offsetY, circleSize, 0, Math.PI * 2);
            ctx.fill();
          }
          
          ctx.restore();
        }
      });

      // Cursor glow effect
      if (mouseRef.current.x > 0 && mouseRef.current.y > 0) {
        const glowGradient = ctx.createRadialGradient(
          mouseRef.current.x, mouseRef.current.y, 0,
          mouseRef.current.x, mouseRef.current.y, 100
        );
        glowGradient.addColorStop(0, `hsl(225, 73%, 35%)`);
        glowGradient.addColorStop(0.5, `hsl(225, 73%, 35%)`);
        glowGradient.addColorStop(1, 'transparent');
        
        ctx.save();
        ctx.globalAlpha = 0.1;
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 100, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrame);
    };
  }, [stars, clouds, scrollProgress]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'normal' }}
    />
  );
};
