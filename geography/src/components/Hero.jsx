import React from "react";
import { Suspense } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";

const ThreeModel = () => {
  return (
    <mesh rotation={[0, 0, 0]}>
      <dodecahedronGeometry args={[1.5, 0]} />
      <meshStandardMaterial color="#4facfe" wireframe />
    </mesh>
  );
};

export const Hero = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-black bg-opacity-70 backdrop-blur-md z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <motion.a
          href="#home"
          className="text-white text-2xl font-bold tracking-wide"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          GeographyPedia
        </motion.a>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6">
          {["Home", "Explore", "About", "Contact"].map((item, index) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-gray-300 hover:text-white transition-colors duration-300"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {item}
            </motion.a>
          ))}
        </nav>

        {/* Mobile Menu (Optional) */}
        <div className="md:hidden">
          <button className="text-white focus:outline-none">☰</button>
        </div>
      </div>
    </header>
  );
};
