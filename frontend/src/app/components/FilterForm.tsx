import { FC } from "react";
import ReactSlider from "react-slider";

interface FilterFormProps {
  position: string[];
  onPositionChange: (selectedPositions: string[]) => void;
  minAge: number;
  maxAge: number;
  onAgeRangeChange: (min: number, max: number) => void;
}

const FilterForm: FC<FilterFormProps> = ({
  position,
  onPositionChange,
  minAge,
  maxAge,
  onAgeRangeChange,
}) => {
  const positionOptions: Record<string, string> = {
    WR: "WR",
    RB: "RB",
    QB: "QB",
    TE: "TE",
  };

  // Handle change in position checkbox
  const handlePositionChange = (option: string) => {
    // Toggle position in selected positions array
    const updatedPositions = position.includes(option)
      ? position.filter((p) => p !== option) // Remove if already selected
      : [...position, option]; // Add if not selected
    onPositionChange(updatedPositions); // Update parent state
  };

  // If all positions are selected, deselect all; otherwise, select all
  const allSelected = Object.values(positionOptions).every((option) =>
    position.includes(option)
  );

  const handleSelectAll = () => {
    const updatedPositions = allSelected
      ? [] // Deselect all
      : Object.values(positionOptions); // Select all

    onPositionChange(updatedPositions); // Update parent state
  };

  return (
    <div className="md:w-3/5 p-4 bg-gray-100 rounded-lg shadow-md m-2">
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        🎯 Filter Players
      </h2>
      <p className="text-xs text-gray-600 mb-4">
        Narrow down your options by position or age range. Combine filters to
        pinpoint the best trade targets.
      </p>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col p-4 bg-white shadow-md rounded-md">
          <label className="text-gray-900 font-semibold text-lg">
            Position
          </label>
          <p className="text-xs text-gray-500 mb-3">
            Select one or more positions to refine your search
          </p>
          <div className="flex flex-row flex-wrap gap-4">
            {Object.entries(positionOptions).map(([label, value]) => (
              <label
                key={value}
                className="flex items-center cursor-pointer group"
              >
                <input
                  type="checkbox"
                  value={value}
                  checked={position.includes(value)}
                  onChange={() => handlePositionChange(value)}
                  className="hidden"
                />
                <div className="w-5 h-5 border-2 border-gray-400 rounded-sm flex items-center justify-center group-hover:border-blue-500">
                  {position.includes(value) && (
                    <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                  )}
                </div>
                <span className="ml-2 text-gray-800 group-hover:text-blue-500">
                  {label}
                </span>
              </label>
            ))}
            <button
              onClick={handleSelectAll}
              className="text-blue-500 text-sm hover:underline focus:outline-none"
            >
              {allSelected ? "Deselect All" : "Select All"}
            </button>
          </div>
        </div>
        <div className="mb-6 p-4 bg-white shadow-md rounded-md">
          <label className="text-gray-900 font-semibold text-lg block">
            Age Range
          </label>
          <p className="text-xs text-gray-500 mb-3">
            Use the range slider to target players based on age range
          </p>
          <ReactSlider
            className="relative w-full h-10 cursor-pointer"
            thumbClassName="w-6 h-6 bg-blue-500 shadow-md rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            trackClassName="h-2 rounded-full"
            value={[minAge, maxAge]}
            onChange={([newMinAge, newMaxAge]: [number, number]) =>
              onAgeRangeChange(newMinAge, newMaxAge)
            }
            min={18}
            max={42}
            minDistance={1}
            pearling
            renderThumb={(props, state) => (
              <div {...props} className="relative flex justify-center">
                <div className="absolute top-full mt-4 px-2 py-1 bg-blue-500 text-white text-xs rounded shadow-md">
                  {state.valueNow}
                </div>
              </div>
            )}
            marks={[18, 24, 30, 36, 42]}
            markClassName="w-1 h-4 bg-gray-400 rounded-full"
            renderMark={(props) => (
              <div {...props} className="relative mt-2">
                <span className="absolute top-4 text-xs text-gray-500">
                  {props.value}
                </span>
              </div>
            )}
            renderTrack={(props, { index }) => {
              const isActive = index === 1;
              return (
                <div
                  key={index} // Pass the key explicitly
                  {...props}
                  className={`h-2 rounded-full ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-blue-300"
                      : "bg-gray-300"
                  }`}
                />
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterForm;
