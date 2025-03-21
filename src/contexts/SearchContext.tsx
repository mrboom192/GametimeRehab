import { createContext, useContext } from "react";

export const SearchContext = createContext<{
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}>({
  searchQuery: "",
  setSearchQuery: () => {},
});

export const useSearch = () => useContext(SearchContext);
