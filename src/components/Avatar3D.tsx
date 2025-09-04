import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Avatar3D renders a simple 3D character that transitions from unaware to aware and tracks cursor movement.
 */
const Avatar3D = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<THREE.Mesh | null>(null);
  const stateRef = useRef<'entrance' | 'interactive'>('entrance');
  const cursor = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.z = 4.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(320, 320);
    renderer.setClearColor(0x000000, 0);
    mountRef.current?.appendChild(renderer.domElement);
  }, []);

  return <div ref={mountRef} style={{ width: 320, height: 320 }} />;
};

export default Avatar3D;
