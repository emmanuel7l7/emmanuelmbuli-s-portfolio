import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import emmanuelAvatar from "@/assets/emmanuel-avatar.jpg";

export const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAware, setIsAware] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
    // Start awareness animation after a delay
    const awarenessTimer = setTimeout(() => {
      setIsAware(true);
    }, 1000);

    return () => clearTimeout(awarenessTimer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (avatarRef.current) {
        const rect = avatarRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - centerX) / rect.width;
        const deltaY = (e.clientY - centerY) / rect.height;
        
        setMousePosition({ x: deltaX * 10, y: deltaY * 10 });
      }
    };

    if (isAware) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isAware]);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"></div>
      
      <div className={`container mx-auto px-6 text-center relative z-10 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        
        {/* Interactive Avatar - Large with awareness animation */}
        <div 
          ref={avatarRef}
          className="relative mx-auto w-80 h-80 mb-8 group cursor-pointer perspective-1000"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-accent p-2 animate-float">
            <img
              src={emmanuelAvatar}
              alt="Emmanuel Mbuli"
              className={`w-full h-full rounded-full object-cover bg-card transition-all duration-300 ${
                !isAware ? 'avatar-awareness' : ''
              }`}
              style={{
                transform: isAware ? `
                  rotateY(${mousePosition.x * 0.5}deg) 
                  rotateX(${-mousePosition.y * 0.3}deg)
                  scale(${isHovered ? 1.05 : 1})
                ` : undefined,
                filter: isAware ? `brightness(${1.1 + (isHovered ? 0.1 : 0)}) contrast(${1.15 + (isHovered ? 0.1 : 0)})` : undefined
              }}
            />
          </div>
          {/* Awareness glow effect */}
          <div 
            className="absolute inset-0 rounded-full bg-primary/20 animate-awareness-glow opacity-60"
            style={{
              opacity: isAware && isHovered ? 0.9 : 0.6,
              transform: isAware ? `scale(${1.3 + (isHovered ? 0.2 : 0)})` : undefined
            }}
          ></div>
          {/* Recognition pulse */}
          <div className="absolute inset-0 rounded-full bg-accent/10 animate-recognition-pulse"></div>
          
          {/* Interactive eye tracking effect */}
          {isAware && (
            <div 
              className="absolute inset-0 rounded-full pointer-events-none transition-all duration-200"
              style={{
                boxShadow: `${mousePosition.x * 2}px ${mousePosition.y * 2}px 30px hsl(var(--primary-glow) / 0.3)`
              }}
            ></div>
          )}
        </div>

        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-glow">
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