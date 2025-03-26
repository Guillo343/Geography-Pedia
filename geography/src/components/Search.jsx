import React, {useState} from "react";
import { fetchCountryData } from "../services/api";

export const Search = ({ setCountryData}) => {
    const [query, setQuery] = useState(''); 
    const handleSearch= async(e) =>{
        e.preventDefault();

        if(!query.trim()) return;
        
        const data = await fetchCountryData(query);
        if(data) {
            setCountryData(data)
        }
    }
  return (
    <section className="bg-amber-400 w-full p-4 flex flex-col items-center">
      <label htmlFor="search" className="text-lg font-bold">
        Search for a country:
      </label>
      <input
        id="search"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Which country do you want to search?"
        className="mt-2 p-2 rounded-md w-80 text-black"
      />
      <button
        onClick={handleSearch}
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Search
      </button>
    </section>
  );
};
