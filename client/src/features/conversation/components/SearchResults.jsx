import Spinner from "../../../components/Spinner";

function SearchResults({ results, isOpen, isLoading }) {
  if (!isOpen) return;
  if (isLoading)
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Spinner />
      </div>
    );
  return (
    <div className="flex h-full">
      {results.length < 0 ? (
        <p>Results</p>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <p className="text-gray-500">Search results will appear here</p>
        </div>
      )}
    </div>
  );
}

export default SearchResults;
