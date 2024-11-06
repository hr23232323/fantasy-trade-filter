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
  const positionOptions = ["WR", "RB", "QB", "TE", "PICK"];

  // Handle change in position checkbox
  const handlePositionChange = (option: string) => {
    // Toggle position in selected positions array
    const updatedPositions = position.includes(option)
      ? position.filter((p) => p !== option) // Remove if already selected
      : [...position, option]; // Add if not selected
    onPositionChange(updatedPositions); // Update parent state
  };

  return (
    <div className="w-full md:w-2/3 p-4 bg-gray-100 rounded-lg shadow-md m-2">
      <h2 className="text-lg font-bold mb-2 text-gray-800">Filter Players</h2>
      <div className="flex flex-col space-y-4">
        {/* Position Checkboxes */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold">Position</label>
          <div className="flex flex-row">
            {positionOptions.map((option) => (
              <label key={option} className="flex items-center mr-6">
                <input
                  type="checkbox"
                  value={option}
                  checked={position.includes(option)}
                  onChange={() => handlePositionChange(option)}
                  className="text-blue-500"
                />
                <span className="text-gray-800 ml-1">{option}</span>
              </label>
            ))}
          </div>
        </div>
        {/* Age Range Slider */}
        <div className="mb-4">
          <label className="text-gray-700 font-semibold">Age Range</label>
          <ReactSlider
            className="w-full h-6 bg-gray-300 rounded"
            thumbClassName="w-6 h-6 bg-blue-500 cursor-pointer text-center"
            trackClassName="bg-blue-300"
            min={18} // Minimum age for the slider
            max={42} // Maximum age for the slider
            value={[minAge, maxAge]}
            onChange={([newMinAge, newMaxAge]: [number, number]) =>
              onAgeRangeChange(newMinAge, newMaxAge)
            }
            minDistance={1} // Minimum distance between handles
            pearling
            renderThumb={(props, state) => (
              <div {...props}>{state.valueNow}</div>
            )}
            marks={[24, 30, 36]}
            markClassName="w-2 h-6 bg-blue-100 text-center"
            renderMark={(props) => <span {...props} />}
          />
          <div className="flex justify-between text-gray-700 mt-2">
            <span className="text-gray-500 text-xs">Min Age: {minAge}</span>
            <span className="text-gray-500 text-xs">Max Age: {maxAge}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterForm;
