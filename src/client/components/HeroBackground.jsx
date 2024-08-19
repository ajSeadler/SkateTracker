// src/components/HeroBackground.js
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry";
import "../styles/HomePage.css";

const HeroBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 3;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Create a 3D cube with rounded corners and gaps between the faces
    const geometry = new RoundedBoxGeometry(1.45, 1.45, 1.45, 10, 0.1); // Slightly smaller cube
    const materials = [
      new THREE.MeshStandardMaterial({
        color: 0x8e2de2,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
      }), // Tech purple
      new THREE.MeshStandardMaterial({
        color: 0x2a2a2a,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
      }), // Dark gray
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
      }), // White
      new THREE.MeshStandardMaterial({
        color: 0x121212,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
      }), // Black
      new THREE.MeshStandardMaterial({
        color: 0x8e2de2,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
      }), // Tech purple
      new THREE.MeshStandardMaterial({
        color: 0x2a2a2a,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
      }), // Dark gray
    ];

    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Animation loop with slower rotation
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.005; // Slower rotation
      cube.rotation.y += 0.005; // Slower rotation
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Clean up on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="hero-background" ref={mountRef}></div>;
};

export default HeroBackground;
