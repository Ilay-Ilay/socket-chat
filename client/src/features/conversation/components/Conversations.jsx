import { useEffect } from "react";
import { useState } from "react";
import SearchResults from "./SearchResults";

function Conversations() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  const handleSearchChange = (e) => {
    const value = e.target.value;

    setSearch(value);

    if (value.length < 2) {
      setResults([]);
    }
  };

  useEffect(() => {
    if (search.length < 2) {
      setSearchLoading(false);

      return;
    }

    setSearchLoading(true);

    const controller = new AbortController();

    const timer = setTimeout(async () => {
      try {
        const response = await fetch(
          `/api/users/search?q=${encodeURIComponent(search)}`,

          {
            signal: controller.signal,
          },
        );

        const data = await response.json();

        setResults(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      } finally {
        setSearchLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(timer);

      controller.abort();
    };
  }, [search]);

  return (
    <aside className="flex flex-col p-4 border-r border-gray-300 min-h-screen">
      <div className="flex items-center p-2 border border-gray-300 rounded-full">
        <input
          onFocus={() => {
            setSearchOpen(true);
          }}
          className="p-2"
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => {
            handleSearchChange(e);
          }}
        />
        <button
          className="p-2 rounded-full bg-gray-700 text-white h-8 w-8 flex items-center justify-center"
          onClick={() => {
            setSearch("");
            setResults([]);
            setSearchOpen(false);
          }}
        >
          x
        </button>
      </div>
      <SearchResults
        isOpen={searchOpen}
        results={results}
        isLoading={searchLoading}
      />
    </aside>
  );
}

export default Conversations;
