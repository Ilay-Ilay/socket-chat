import { useEffect } from "react";
import { useState } from "react";
import SearchResults from "./SearchResults";
import { useAuth } from "@clerk/react";
import Navigation from "../../../components/Navigation";

function Conversations() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const { getToken } = useAuth();

  const handleSearchChange = (e) => {
    const value = e.target.value;

    setSearch(value);

    if (value.length < 2) {
      setResults([]);
    }
  };

  useEffect(() => {
    if (search.length < 2) {
      return;
    }

    const controller = new AbortController();

    const timer = setTimeout(async () => {
      setSearchLoading(true);

      try {
        const token = await getToken();
        if (!token) return;
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/search?q=${encodeURIComponent(search)}`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },

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
  }, [search, getToken]);

  return (
    <aside className="flex w-80 shrink-0 flex-col overflow-hidden border-r border-gray-300 p-4">
      <Navigation />

      <div className="flex items-center p-2 border border-gray-300 rounded-full">
        <input
          onFocus={() => {
            setSearchOpen(true);
          }}
          className="p-2"
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleSearchChange}
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
