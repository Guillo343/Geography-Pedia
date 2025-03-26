import React, { Suspense } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
// import { Earth } from "./Earth"; 

export const Hero = () => {
  const scrollToNextSection = () => {
    const nextSection = document.querySelector("#hero").nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative h-screen flex flex-col justify-center items-center text-center text-white">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-900 to-black opacity-80 z-[-1]"></div>

      {/* Content */}
      <motion.div
        className="space-y-6 max-w-3xl px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-5xl font-extrabold"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Explore the World in 3D
        </motion.h1>

        <motion.p
          className="text-lg text-gray-300"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Discover countries, cultures, and history with an interactive 3D experience.
        </motion.p>
      </motion.div>

      {/* 3D Earth */}
      {/* <div className="w-full h-96">
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} />
          <Suspense fallback={null}>
            <Earth />
            <OrbitControls enableZoom={false} autoRotate />
          </Suspense>
        </Canvas>
      </div> */}

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        onClick={scrollToNextSection}
      >
        <span className="block w-4 h-4 border-b-2 border-r-2 border-white transform rotate-45"></span>
      </motion.div>
    </section>
  );
};
