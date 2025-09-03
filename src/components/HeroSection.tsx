import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import emmanuelAvatar from "@/assets/emmanuel-avatar.jpg";

export const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAware, setIsAware] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLookingAtCursor, setIsLookingAtCursor] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
    
    // Simulate coming to awareness sequence
    const awarenessSequence = async () => {
      // Phase 1: Initial sleep state (0-1s)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Phase 2: First movement - slight head turn (1-2s)
      setIsAware(true);
      
      // Phase 3: Full awareness and cursor tracking (3s+)
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsLookingAtCursor(true);
    };

    awarenessSequence();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isLookingAtCursor || !avatarRef.current) return;

      const avatarRect = avatarRef.current.getBoundingClientRect();
      const avatarCenterX = avatarRect.left + avatarRect.width / 2;
      const avatarCenterY = avatarRect.top + avatarRect.height / 2;
      
      // Calculate angle from avatar to cursor
      const deltaX = e.clientX - avatarCenterX;
      const deltaY = e.clientY - avatarCenterY;
      
      // Normalize to reasonable head movement range
      const maxDistance = 300;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const intensity = Math.min(1, distance / maxDistance);
      
      // Calculate head rotation (limited range for realism)
      const headRotationY = Math.max(-25, Math.min(25, (deltaX / maxDistance) * 30));
      const headRotationX = Math.max(-15, Math.min(15, (deltaY / maxDistance) * 20));
      
      setMousePosition({ x: headRotationY, y: headRotationX });
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

    if (isLookingAtCursor) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleTouchMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isLookingAtCursor]);

  return (
    <section ref={containerRef} className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"></div>
      
      <div className={`container mx-auto px-6 text-center relative z-10 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        
        {/* Realistic Avatar Animation */}
        <div className="relative mx-auto w-80 h-80 mb-8 group">
          {/* Awareness glow ring */}
          <div 
            className={`absolute inset-0 rounded-full transition-all duration-1000 ${
              isAware ? 'animate-awareness-ring' : 'opacity-0 scale-0'
            }`}
            style={{
              background: `conic-gradient(from 0deg, 
                hsl(var(--primary) / 0.4), 
                hsl(var(--accent) / 0.6), 
                hsl(var(--primary-glow) / 0.4), 
                hsl(var(--primary) / 0.4))`,
            }}
          ></div>
          
          {/* Main avatar container with realistic movement */}
          <div 
            ref={avatarRef}
            className={`relative w-full h-full rounded-full overflow-hidden border-4 transition-all duration-500 ${
              !isAware ? 'avatar-sleeping' : 
              !isLookingAtCursor ? 'avatar-awakening' : 
              'avatar-aware'
            }`}
            style={{
              transform: isLookingAtCursor ? `
                perspective(1000px)
                rotateX(${mousePosition.y}deg) 
                rotateY(${mousePosition.x}deg)
                translateZ(10px)
              ` : undefined,
              transformStyle: 'preserve-3d',
              borderColor: isAware ? 'hsl(var(--primary) / 0.5)' : 'hsl(var(--border))',
            }}
          >
            {/* Avatar image with overlay effects */}
            <div className="relative w-full h-full">
              <img
                src={emmanuelAvatar}
                alt="Emmanuel Mbuli"
                className="w-full h-full object-cover transition-all duration-1000"
              />
              
              {/* Awareness overlay that gradually reveals the avatar */}
              <div 
                className={`absolute inset-0 transition-all duration-2000 ${
                  isAware ? 'opacity-0' : 'opacity-70'
                }`}
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--background) / 0.8), hsl(var(--muted) / 0.6))',
                }}
              ></div>
              
              {/* Eye tracking highlight */}
              {isLookingAtCursor && (
                <div 
                  className="absolute inset-0 pointer-events-none transition-all duration-200"
                  style={{
                    background: `radial-gradient(circle at ${50 + (mousePosition.x * 0.8)}% ${50 + (mousePosition.y * 0.5)}%, 
                      transparent 20%, 
                      hsl(var(--primary-glow) / 0.1) 35%, 
                      transparent 50%)`,
                  }}
                ></div>
              )}
              
              {/* Facial feature shadows for depth */}
              <div 
                className={`absolute inset-0 pointer-events-none transition-all duration-300 ${
                  isLookingAtCursor ? 'opacity-30' : 'opacity-0'
                }`}
                style={{
                  background: `linear-gradient(${135 + mousePosition.x}deg, 
                    transparent 0%, 
                    hsl(var(--background) / 0.2) 30%, 
                    transparent 60%)`,
                }}
              ></div>
            </div>
          </div>
          
          {/* Recognition pulse rings */}
          {isAware && (
            <>
              <div className="absolute inset-0 rounded-full border-2 border-accent/40 animate-recognition-pulse-1"></div>
              <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-recognition-pulse-2"></div>
              <div className="absolute inset-0 rounded-full border-2 border-accent/20 animate-recognition-pulse-3"></div>
            </>
          )}
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