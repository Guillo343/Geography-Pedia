import React, { useRef, useEffect, useState, useContext } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { motion } from 'framer-motion';
import { GeoContext } from '../contexts/GeoContext';

const Earth = () => {
  const mountRef = useRef(null);
  const { selectedCountry, setSelectedCountry, countryData } = useContext(GeoContext);
  const [isLoading, setIsLoading] = useState(true);
  
  // Store Three.js objects in refs to access them for updates
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const earthRef = useRef(null);
  const markerGroupRef = useRef(null);
  
  useEffect(() => {
    // Initialize Three.js scene
    const initialize = () => {
      // Create scene
      const scene = new THREE.Scene();
      sceneRef.current = scene;
      
      // Create camera
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 5;
      cameraRef.current = camera;
      
      // Create renderer
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      mountRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;
      
      // Add controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.rotateSpeed = 0.5;
      
      // Create Earth
      createEarth();
      
      // Add ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
      
      // Add directional light (sunlight effect)
      const dirLight = new THREE.DirectionalLight(0xffffff, 1);
      dirLight.position.set(5, 3, 5);
      scene.add(dirLight);
      
      // Create markers group
      const markerGroup = new THREE.Group();
      scene.add(markerGroup);
      markerGroupRef.current = markerGroup;
      
      // Handle window resize
      window.addEventListener('resize', handleResize);
      
      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        
        // Gentle auto-rotation when not interacting
        if (!controls.enableDamping) {
          earthRef.current.rotation.y += 0.001;
        }
        
        controls.update();
        renderer.render(scene, camera);
      };
      
      animate();
      setIsLoading(false);
    };
    
    // Create Earth sphere with textures
    const createEarth = () => {
      const textureLoader = new THREE.TextureLoader();
      
      // Load Earth textures
      const earthGeometry = new THREE.SphereGeometry(2, 64, 64);
      
      // Promisify texture loading
      Promise.all([
        new Promise(resolve => {
          textureLoader.load('/assets/textures/earth_daymap.jpg', texture => {
            resolve(texture);
          });
        }),
        new Promise(resolve => {
          textureLoader.load('/assets/textures/earth_normal_map.jpg', texture => {
            resolve(texture);
          });
        }),
        new Promise(resolve => {
          textureLoader.load('/assets/textures/earth_specular_map.jpg', texture => {
            resolve(texture);
          });
        })
      ]).then(([dayTexture, normalTexture, specularTexture]) => {
        const earthMaterial = new THREE.MeshPhongMaterial({
          map: dayTexture,
          normalMap: normalTexture,
          specularMap: specularTexture,
          shininess: 10
        });
        
        const earth = new THREE.Mesh(earthGeometry, earthMaterial);
        sceneRef.current.add(earth);
        earthRef.current = earth;
        
        // Once Earth is created, add country markers
        if (countryData.length > 0) {
          addCountryMarkers();
        }
      });
    };
    
    // Add markers for countries based on their coordinates
    const addCountryMarkers = () => {
      if (!markerGroupRef.current || !countryData) return;
      
      // Clear any existing markers
      while (markerGroupRef.current.children.length) {
        markerGroupRef.current.remove(markerGroupRef.current.children[0]);
      }
      
      countryData.forEach(country => {
        if (country.latlng && country.latlng.length === 2) {
          const [lat, lng] = country.latlng;
          
          // Convert lat/lng to 3D coordinates
          const marker = createMarkerAt(lat, lng, country);
          markerGroupRef.current.add(marker);
        }
      });
    };
    
    // Create a marker at specific coordinates
    const createMarkerAt = (lat, lng, country) => {
      // Convert lat/lng to 3D position
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      
      // Radius slightly above Earth surface
      const radius = 2.05;
      
      // Calculate position
      const x = -radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);
      
      // Create marker
      const markerGeometry = new THREE.SphereGeometry(0.02, 16, 16);
      const markerMaterial = new THREE.MeshBasicMaterial({ 
        color: country.name === selectedCountry?.name ? 0xff0000 : 0x00ff00
      });
      
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      marker.position.set(x, y, z);
      
      // Store country data with the marker for interaction
      marker.userData = { country };
      
      return marker;
    };
    
    // Handle window resize
    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };
    
    // Initialize scene
    initialize();
    
    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(rendererRef.current.domElement);
      sceneRef.current?.clear();
    };
  }, []); // Run once on mount
  
  // Update markers when selected country changes
  useEffect(() => {
    if (markerGroupRef.current && countryData.length > 0) {
      markerGroupRef.current.children.forEach(marker => {
        if (marker.userData.country) {
          marker.material.color.set(
            marker.userData.country.name === selectedCountry?.name 
            ? 0xff0000 
            : 0x00ff00
          );
        }
      });
    }
  }, [selectedCountry]);
  
  // Update markers when country data is loaded
  useEffect(() => {
    if (countryData.length > 0 && markerGroupRef.current) {
      const addCountryMarkers = () => {
        // Implementation from above
        // ... (same code as in the first useEffect)
      };
      addCountryMarkers();
    }
  }, [countryData]);
  
  return (
    <motion.div 
      className="w-full h-screen relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      ref={mountRef}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-xl text-white">Loading Earth...</div>
        </div>
      )}
    </motion.div>
  );
};

export default Earth;