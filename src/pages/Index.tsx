import { useState } from "react";
import { LoadingAnimation } from "@/components/LoadingAnimation";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { WorkSection } from "@/components/WorkSection";
import { ContactSection } from "@/components/ContactSection";

const Index = () => {
  const [showLoading, setShowLoading] = useState(true);

  if (showLoading) {
    return <LoadingAnimation onComplete={() => setShowLoading(false)} />;
  }

  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <WorkSection />
      <ContactSection />
      
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
