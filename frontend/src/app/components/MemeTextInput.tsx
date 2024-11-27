import React from "react";

interface MemeTextInputProps {}

export const MemeTextInput: React.FC<MemeTextInputProps> = () => {
  return (
    <div className="ml-2 relative group inline-flex items-center">
      {/* Badge */}
      <div className="flex items-center space-x-1 bg-indigo-100 text-indigo-800 font-semibold text-xs px-2 py-1 rounded-full shadow-sm">
        <FaStar className="w-4 h-4" />
        <span>Rookie</span>
      </div>
    </div>
  );
};

export default MemeTextInput;
