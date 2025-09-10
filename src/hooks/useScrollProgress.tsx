import { useState, useEffect } from 'react';

export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || 0;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Avoid division by zero
      if (docHeight <= 0) {
        setScrollProgress(0);
        return;
      }
      
      const progress = Math.max(0, Math.min(scrollTop / docHeight, 1));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollProgress;
};