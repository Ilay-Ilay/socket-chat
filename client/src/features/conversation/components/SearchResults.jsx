import Spinner from "../../../components/Spinner";
import ResultTab from "./ResultTab";

function SearchResults({ results, isOpen, isLoading }) {
  if (!isOpen) return null;
  if (isLoading)
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Spinner />
      </div>
    );
  return (
    <div className="flex h-full flex-col gap-2">
      {results.length > 0 ? (
        results.map((result) => <ResultTab key={result._id} user={result} />)
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <p className="text-gray-500">Search results will appear here</p>
        </div>
      )}
    </div>
  );
}

export default SearchResults;
