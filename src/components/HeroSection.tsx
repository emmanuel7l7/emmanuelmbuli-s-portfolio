import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import emmanuelAvatar from "@/assets/emmanuel-avatar.jpg";

export const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"></div>
      
      <div className={`container mx-auto px-6 text-center relative z-10 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        
        {/* Interactive Avatar */}
        <div className="relative mx-auto w-48 h-48 mb-8 group cursor-pointer">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-accent p-1 animate-float">
            <img
              src={emmanuelAvatar}
              alt="Emmanuel Mbuli"
              className="w-full h-full rounded-full object-cover bg-card group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          {/* Awareness glow effect */}
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-75 group-hover:opacity-100"></div>
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