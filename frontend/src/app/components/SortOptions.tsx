import { FC } from "react";

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
  return (
    <div className="w-full md:w-1/3 p-4 bg-gray-100 rounded-lg shadow-md m-2">
      <h2 className="text-lg font-bold mb-2 text-gray-800">Sort Players</h2>
      <div className="flex space-x-4">
        <label className="flex flex-col text-gray-700">
          Sort By:
          <select
            value={sortField}
            onChange={(e) => onSortFieldChange(e.target.value)}
            className="p-2 border rounded text-gray-900 bg-white"
          >
            <option value="age">Age</option>
            <option value="oneQBValues.value">Value (1QB)</option>
            <option value="superflexValues.value">Value (2QB)</option>
          </select>
        </label>
        <label className="flex flex-col text-gray-700">
          Order:
          <select
            value={sortOrder}
            onChange={(e) => onSortOrderChange(e.target.value)}
            className="p-2 border rounded text-gray-900 bg-white"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default SortOptions;
