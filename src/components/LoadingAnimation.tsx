import { useEffect, useState } from "react";
import emmanuelAvatar from "@/assets/emmanuel-avatar.jpg";

interface LoadingAnimationProps {
  onComplete: () => void;
}

export const LoadingAnimation = ({ onComplete }: LoadingAnimationProps) => {
  const [progress, setProgress] = useState(0);
  const [showAvatar, setShowAvatar] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setShowAvatar(true);
          setTimeout(onComplete, 1500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="text-center space-y-8">
        {/* Avatar appears after loading */}
        {showAvatar && (
          <div className="animate-fade-in">
            <div className="relative mx-auto w-32 h-32 mb-6">
              <img
                src={emmanuelAvatar}
                alt="Emmanuel Mbuli"
                className="w-full h-full rounded-full object-cover border-4 border-primary/30 avatar-pulse"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-accent/20"></div>
            </div>
            <h1 className="text-4xl font-bold text-glow animate-glow-pulse">
              Welcome to Emmanuel's Portfolio
            </h1>
            <p className="text-muted-foreground animate-slide-up">
              Creative • Descriptive • Ready for Challenges
            </p>
          </div>
        )}

        {/* Loading progress */}
        {!showAvatar && (
          <div className="space-y-4">
            <div className="w-64 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-muted-foreground">Loading portfolio... {progress}%</p>
          </div>
        )}
      </div>
    </div>
  );
};