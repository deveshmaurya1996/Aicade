import React, { useState } from "react";
import Image from "next/image";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearchButtonClick = () => {
    onSearch(query);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(query);
    }
  };

  return (
    <div className="flex items-center space-x-2 mb-4 justify-center h-10">
      <input
        type="text"
        className="border p-2 rounded-md w-full sm:w-1/2 text-black"
        placeholder="Search for products..."
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
      />

      <button
        onClick={handleSearchButtonClick}
        className="bg-black p-2 px-4 rounded-md h-full flex items-center justify-center"
      >
        <Image
          src="/search.png"
          alt="Search"
          width={30}
          height={30}
          loading="lazy"
          objectFit="contain"
        />
      </button>

      <button
        className="lg:hidden bg-black p-2 px-4 rounded-md h-full flex items-center justify-center"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      >
        <Image
          src="/filter.png"
          alt="Filter"
          width={30}
          height={30}
          loading="lazy"
        />
      </button>
    </div>
  );
};

export default SearchBar;
