import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import emmanuelAvatar from "@/assets/emmanuel-avatar.jpg";

export const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAware, setIsAware] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const avatarRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
    // Start awareness animation after a delay
    const awarenessTimer = setTimeout(() => {
      setIsAware(true);
    }, 2000);

    return () => clearTimeout(awarenessTimer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (avatarRef.current && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const avatarRect = avatarRef.current.getBoundingClientRect();
        
        // Calculate mouse position relative to the avatar center
        const avatarCenterX = avatarRect.left + avatarRect.width / 2;
        const avatarCenterY = avatarRect.top + avatarRect.height / 2;
        
        // Calculate distance and angle from avatar center to mouse
        const deltaX = e.clientX - avatarCenterX;
        const deltaY = e.clientY - avatarCenterY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        // Normalize the movement (stronger effect when closer)
        const maxDistance = Math.min(window.innerWidth, window.innerHeight) / 2;
        const intensity = Math.max(0, 1 - distance / maxDistance);
        
        // Calculate rotation based on mouse position
        const rotationX = (deltaY / avatarRect.height) * 15 * intensity;
        const rotationY = (deltaX / avatarRect.width) * 15 * intensity;
        
        // Calculate eye tracking position
        const eyeX = Math.max(-8, Math.min(8, (deltaX / avatarRect.width) * 20));
        const eyeY = Math.max(-5, Math.min(5, (deltaY / avatarRect.height) * 15));
        
        setMousePosition({ x: rotationY, y: -rotationX });
        setEyePosition({ x: eyeX, y: eyeY });
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        handleMouseMove({
          clientX: touch.clientX,
          clientY: touch.clientY,
        } as MouseEvent);
      }
    };

    if (isAware) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleTouchMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isAware]);

  return (
    <section ref={containerRef} className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"></div>
      
      <div className={`container mx-auto px-6 text-center relative z-10 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        
        {/* Interactive Avatar with Enhanced Reactivity */}
        <div 
          ref={avatarRef}
          className="relative mx-auto w-80 h-80 mb-8 group cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
          style={{ perspective: '1000px' }}
        >
          {/* Outer glow ring */}
          <div 
            className={`absolute inset-0 rounded-full transition-all duration-500 ${
              isAware ? 'animate-awareness-glow' : ''
            }`}
            style={{
              background: `conic-gradient(from 0deg, 
                hsl(var(--primary) / 0.3), 
                hsl(var(--accent) / 0.4), 
                hsl(var(--primary-glow) / 0.3), 
                hsl(var(--primary) / 0.3))`,
              transform: isAware ? `scale(${1.2 + (isHovered ? 0.1 : 0)}) rotate(${Date.now() / 50}deg)` : 'scale(0.8)',
              opacity: isAware ? (isHovered ? 0.8 : 0.6) : 0,
            }}
          ></div>
          
          {/* Main avatar container */}
          <div 
            className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary/30 transition-all duration-300"
            style={{
              transform: isAware ? `
                perspective(1000px)
                rotateX(${mousePosition.y}deg) 
                rotateY(${mousePosition.x}deg)
                scale(${isHovered ? 1.05 : 1})
                translateZ(${isHovered ? '20px' : '0px'})
              ` : 'scale(0.9) rotateY(-20deg) rotateX(10deg)',
              transformStyle: 'preserve-3d',
              filter: isAware ? 
                `brightness(${1.1 + (isHovered ? 0.1 : 0)}) 
                 contrast(${1.15 + (isHovered ? 0.1 : 0)}) 
                 saturate(${1.2 + (isHovered ? 0.1 : 0)})` : 
                'brightness(0.7) contrast(0.8) saturate(0.6)',
              boxShadow: isAware ? 
                `0 20px 40px hsl(var(--primary) / 0.3), 
                 0 0 60px hsl(var(--primary-glow) / ${isHovered ? 0.4 : 0.2})` : 
                '0 10px 20px hsl(var(--background) / 0.5)',
            }}
          >
            <img
              src={emmanuelAvatar}
              alt="Emmanuel Mbuli"
              className="w-full h-full object-cover transition-all duration-500"
              style={{
                transform: isAware ? `translateZ(10px)` : 'translateZ(0px)',
              }}
            />
            
            {/* Eye tracking overlay */}
            {isAware && (
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at ${50 + eyePosition.x}% ${50 + eyePosition.y}%, 
                    transparent 30%, 
                    hsl(var(--primary) / 0.1) 40%, 
                    transparent 50%)`,
                  transition: 'background 0.1s ease-out',
                }}
              ></div>
            )}
          </div>
          
          {/* Recognition pulse rings */}
          {isAware && (
            <>
              <div 
                className="absolute inset-0 rounded-full border-2 border-accent/30 animate-recognition-pulse"
                style={{ animationDelay: '0s' }}
              ></div>
              <div 
                className="absolute inset-0 rounded-full border-2 border-primary/20 animate-recognition-pulse"
                style={{ animationDelay: '0.5s' }}
              ></div>
              <div 
                className="absolute inset-0 rounded-full border-2 border-accent/10 animate-recognition-pulse"
                style={{ animationDelay: '1s' }}
              ></div>
            </>
          )}
          
          {/* Interactive light reflection */}
          <div 
            className="absolute inset-0 rounded-full pointer-events-none transition-all duration-200"
            style={{
              background: isAware ? `linear-gradient(
                ${Math.atan2(mousePosition.y, mousePosition.x) * 180 / Math.PI + 90}deg,
                transparent 0%,
                hsl(var(--primary-glow) / 0.1) 30%,
                hsl(var(--accent) / 0.2) 50%,
                transparent 70%
              )` : 'none',
              opacity: isHovered ? 0.8 : 0.4,
            }}
          ></div>
        </div>

        {/* Main heading with enhanced animation */}
        <h1 className={`text-5xl md:text-7xl font-bold mb-6 text-glow transition-all duration-1000 ${
          isAware ? 'animate-glow-pulse' : ''
        }`}>
          Emmanuel <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Mbuli</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-4">
          IT Graduate • Creative Problem Solver
        </p>

        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          "I am descriptive, creative, and always ready for challenges."
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            className="btn-hero"
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Discover My Work
          </Button>
          <Button 
            variant="outline" 
            className="border-primary/30 text-foreground hover:bg-primary/10 px-8 py-4 rounded-xl"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get In Touch
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};