import { useState } from "react";
import { LoadingAnimation } from "@/components/LoadingAnimation";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { WorkSection } from "@/components/WorkSection";
import { ContactSection } from "@/components/ContactSection";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const Index = () => {
  const [showLoading, setShowLoading] = useState(true);
  const scrollProgress = useScrollProgress();

  if (showLoading) {
    return <LoadingAnimation onComplete={() => setShowLoading(false)} />;
  }

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground scrollProgress={scrollProgress} />
      <div className="relative z-10">
        <HeroSection scrollProgress={scrollProgress} />
        <AboutSection />
        <WorkSection />
        <ContactSection />
      </div>
      
      {/* Footer */}
      <footer className="py-8 border-t border-primary/20 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground">
            © 2024 Emmanuel Mbuli. Crafted with passion and creativity.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
