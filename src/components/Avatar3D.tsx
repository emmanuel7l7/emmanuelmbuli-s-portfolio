import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface Avatar3DProps {
  scrollProgress?: number;
}

/**
 * Avatar3D renders an interactive 3D character that becomes aware of the user and tracks cursor movement.
 */
const Avatar3D = ({ scrollProgress = 0 }: Avatar3DProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const avatarRef = useRef<THREE.Group | null>(null);
  const eyesRef = useRef<{ left: THREE.Mesh; right: THREE.Mesh } | null>(null);
  const [isAware, setIsAware] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetLookRef = useRef({ x: 0, y: 0 });
  const currentLookRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(400, 400);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;
    
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x4169E1, 1, 100);
    pointLight.position.set(10, 10, 10);
    pointLight.castShadow = true;
    scene.add(pointLight);

    // Create avatar group
    const avatar = new THREE.Group();
    avatarRef.current = avatar;
    scene.add(avatar);

    // Head
    const headGeometry = new THREE.SphereGeometry(1, 32, 32);
    const headMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xffdbac,
      shininess: 30
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.castShadow = true;
    avatar.add(head);

    // Eyes
    const eyeGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const eyeMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
    
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.3, 0.2, 0.8);
    head.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.3, 0.2, 0.8);
    head.add(rightEye);

    eyesRef.current = { left: leftEye, right: rightEye };

    // Body
    const bodyGeometry = new THREE.CapsuleGeometry(0.8, 1.5, 4, 8);
    const bodyMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x4169E1,
      shininess: 50
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = -1.8;
    body.castShadow = true;
    avatar.add(body);

    // Arms
    const armGeometry = new THREE.CapsuleGeometry(0.2, 1.2, 4, 8);
    const armMaterial = new THREE.MeshPhongMaterial({ color: 0xffdbac });
    
    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-1.2, -1.5, 0);
    leftArm.rotation.z = Math.PI / 6;
    leftArm.castShadow = true;
    avatar.add(leftArm);

    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(1.2, -1.5, 0);
    rightArm.rotation.z = -Math.PI / 6;
    rightArm.castShadow = true;
    avatar.add(rightArm);

    // Position camera and avatar
    camera.position.set(0, 0, 6);
    
    // Initial "sleeping" pose
    avatar.rotation.y = -0.8;
    avatar.rotation.x = 0.3;
    head.rotation.x = 0.2;

    // Awakening sequence
    setTimeout(() => {
      setIsAware(true);
    }, 1500);

    // Mouse tracking
    const handleMouseMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    // Touch tracking for mobile
    const handleTouchMove = (event: TouchEvent) => {
      event.preventDefault();
      const rect = renderer.domElement.getBoundingClientRect();
      const touch = event.touches[0];
      mouseRef.current.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    // Animation loop
    const clock = new THREE.Clock();
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      if (avatar) {
        if (isAware) {
          // Smooth transition to aware state
          avatar.rotation.y = THREE.MathUtils.lerp(avatar.rotation.y, 0, 0.02);
          avatar.rotation.x = THREE.MathUtils.lerp(avatar.rotation.x, 0, 0.02);
          head.rotation.x = THREE.MathUtils.lerp(head.rotation.x, 0, 0.02);

          // Eye tracking
          if (eyesRef.current) {
            targetLookRef.current.x = mouseRef.current.x * 0.1;
            targetLookRef.current.y = mouseRef.current.y * 0.1;
            
            currentLookRef.current.x = THREE.MathUtils.lerp(
              currentLookRef.current.x, 
              targetLookRef.current.x, 
              0.1
            );
            currentLookRef.current.y = THREE.MathUtils.lerp(
              currentLookRef.current.y, 
              targetLookRef.current.y, 
              0.1
            );

            eyesRef.current.left.position.x = -0.3 + currentLookRef.current.x;
            eyesRef.current.left.position.y = 0.2 + currentLookRef.current.y;
            eyesRef.current.right.position.x = 0.3 + currentLookRef.current.x;
            eyesRef.current.right.position.y = 0.2 + currentLookRef.current.y;
          }

          // Head tracking (subtle)
          const targetHeadX = mouseRef.current.y * 0.1;
          const targetHeadY = mouseRef.current.x * 0.1;
          
          head.rotation.x = THREE.MathUtils.lerp(head.rotation.x, targetHeadX, 0.05);
          head.rotation.y = THREE.MathUtils.lerp(head.rotation.y, targetHeadY, 0.05);
        }

        // Breathing animation
        const breathe = Math.sin(elapsedTime * 1.5) * 0.02;
        avatar.scale.y = 1 + breathe;
        
        // Subtle floating
        avatar.position.y = Math.sin(elapsedTime * 0.8) * 0.1;
        
        // Day/night color changes based on scroll
        if (scrollProgress > 0) {
          const dayIntensity = Math.min(scrollProgress * 2, 1);
          pointLight.intensity = 0.8 + dayIntensity * 0.4;
          pointLight.color.setHSL(0.6 + dayIntensity * 0.1, 1, 0.5);
        }
      }

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isAware, scrollProgress]);

  return (
    <div 
      ref={mountRef} 
      className={`transition-all duration-1000 ${
        isAware ? 'avatar-aware' : 'avatar-sleeping'
      }`}
      style={{ width: 400, height: 400 }}
    />
  );
};

export default Avatar3D;
