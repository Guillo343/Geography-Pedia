import React, { useState } from "react";
import { Hero } from "./components/Hero";
import "./App.css";
import { Search } from "./components/Search";

function App() {
  const [countryData, setCountryData] = useState(null)
  return (
    <>
    <Hero />
    <Search setCountryData={setCountryData} />
    {countryData && (
      <div className="p-4">
        <h2 className="text-xl font-bold">{countryData.name}</h2>
        <p>Population: {countryData.population}</p>
        <p>Capital: {countryData.capital}</p>
        <p>Region: {countryData.region}</p>
        <img src={countryData.flag} alt={`${countryData.name} flag`} className="w-32 mt-2" />
      </div>
    )}
    </>
  );
}

export default App;
