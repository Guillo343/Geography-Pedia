const API_KEY = import.meta.env.VITE_API_KEY
const URL_API = import.meta.env.VITE_API_URL

export const fetchCountryData = async (countryName) => {
    try {
      const response = await fetch(`${URL_API}/name/${countryName}?apikey=${API_KEY}`);
      if (!response.ok) throw new Error("Country not found");
      
      const data = await response.json();
      return data; 
    } catch (error) {
      console.error(error);
      return null;
    }
  };