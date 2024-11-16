import { FC } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

interface SortOptionsProps {
  sortField: string;
  sortOrder: string;
  onSortFieldChange: (field: string) => void;
  onSortOrderChange: (order: string) => void;
}

const SortOptions: FC<SortOptionsProps> = ({
  sortField,
  sortOrder,
  onSortFieldChange,
  onSortOrderChange,
}) => {
  const toggleSortOrder = () => {
    onSortOrderChange(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="w-full md:w-1/3 p-6 bg-white rounded-lg shadow-lg m-2 border border-gray-200">
      <h2 className="text-lg font-bold mb-4 text-gray-800">Sort Players</h2>
      <div className="flex items-center gap-4">
        <label className="flex flex-col text-gray-700 w-full">
          <span className="mb-1 font-medium">Sort By</span>

          <div className="flex flex-row w-full">
            <select
              value={sortField}
              onChange={(e) => onSortFieldChange(e.target.value)}
              className="w-full mr-2 p-2 border rounded-lg text-gray-900 bg-white shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none hover:border-blue-500 transition ease-in-out duration-150"
            >
              <option value="age">Age</option>
              <option value="oneQBValues.value">Value (1QB)</option>
              <option value="superflexValues.value">Value (2QB)</option>
            </select>
            <button
              onClick={toggleSortOrder}
              className="p-2 w-10 h-9 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition ease-in-out duration-150 flex items-center justify-center"
              aria-label={`Sort Order: ${
                sortOrder === "asc" ? "Ascending" : "Descending"
              }`}
            >
              {sortOrder === "asc" ? (
                <FaArrowUp className="w-4 h-4" />
              ) : (
                <FaArrowDown className="w-4 h-4" />
              )}
            </button>
          </div>
        </label>
      </div>
    </div>
  );
};

export default SortOptions;
