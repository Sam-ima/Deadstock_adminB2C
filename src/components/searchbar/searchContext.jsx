import  { createContext, useState, useContext } from "react";

// Create context
const SearchContext = createContext();

// Context provider
export const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState("");

  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

// Custom hook to use search context
export const useSearch = () => useContext(SearchContext);