import React, { useState, useContext } from "react";

const SearchContext = React.createContext();

export function SearchProvider({ children }) {
  const [searchInput, setSearchInput] = useState("");

  const contextValue = {
    searchInput,
    setSearchInput,
  };

  return (
    <SearchContext.Provider value={contextValue}>{children}</SearchContext.Provider>
  );
}

export const useSearchContext = () => useContext(SearchContext);
