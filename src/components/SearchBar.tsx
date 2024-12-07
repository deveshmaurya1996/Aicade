import React, { useState } from "react";
import { debounce } from "lodash";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isSidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchBar = ({
  onSearch,
  isSidebarOpen,
  setSidebarOpen,
}: SearchBarProps) => {
  const [query, setQuery] = useState<string>("");

  const debouncedSearch = debounce((value: string) => {
    onSearch(value);
  }, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    debouncedSearch(newQuery);
  };

  const handleSearchButtonClick = () => {
    onSearch(query);
  };

  return (
    <div className="flex items-center space-x-2 mb-4 justify-center h-10">
      <input
        type="text"
        className="border p-2 rounded-md w-full sm:w-1/2"
        placeholder="Search for products..."
        value={query}
        onChange={handleChange}
      />
      <button
        onClick={handleSearchButtonClick}
        className="bg-black text-white p-2 pl-6 pr-6 rounded-md hover:bg-gray-600 h-full items-center"
      >
        <img src="/search.png" alt="Cart" width={25} height={25} />
      </button>
      <button
        className="lg:hidden bg-black p-2 pl-6 pr-6 rounded-md h-full"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      >
        <img src="/filter.png" alt="Cart" width={30} height={30} />
      </button>
    </div>
  );
};

export default SearchBar;
