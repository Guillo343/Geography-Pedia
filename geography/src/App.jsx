import React from "react";
import { GeoProvider } from "./contexts/GeoContext";
import Earth from "./components/Hero";
import Search from "./components/Search";
import CountryInfo from "./components/CountryInfo";
import "./App.css";

function App() {
  return (
    <GeoProvider>
      <div className="App relative min-h-screen bg-gradient-to-b from-gray-900 to-black overflow-hidden">
        {/* Background stars (CSS in App.css) */}
        <div className="stars"></div>

        {/* Navigation/Header */}
        <header className="absolute top-0 left-0 right-0 z-10 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Geo-Pedia</h1>
          </div>
        </header>

        {/* Hero section with Earth */}
        <main className="relative">
          {/* 3D Earth */}
          <Earth />

          {/* Search overlay */}
          <div className="absolute top-24 left-0 right-0 z-10 px-4">
            <Search />
          </div>

          {/* Country information */}
          <CountryInfo />
        </main>
      </div>
    </GeoProvider>
  );
}

export default App;
