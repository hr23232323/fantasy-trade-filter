import React from "react";

interface MemeTextInputProps {
  inputText: string;
  updateInputText: (inputText: string) => void;
  loading: boolean;
  error: string | null;
  handleGenerate: () => void;
}

export const MemeTextInput: React.FC<MemeTextInputProps> = ({
  inputText,
  updateInputText,
  loading,
  error,
  handleGenerate,
}) => {
  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg m-4 border border-gray-200 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">😂 Create Memes</h2>
      <p className="text-sm text-gray-600 mb-6">
        Select some players or enter some text to generate memes to kickstart
        trade talks with.
      </p>

      <div className="p-4 bg-white shadow-md rounded-md mb-6">
        <textarea
          id="memeText"
          value={inputText}
          onChange={(e) => updateInputText(e.target.value)}
          placeholder="Talk your shit king..."
          className="w-full p-2 border rounded-lg text-gray-900 bg-white shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none hover:border-blue-500 transition ease-in-out duration-150"
          rows={4}
          disabled={loading} // Disable input while loading
        />
      </div>

      {error && (
        <p className="mb-4 text-red-500 font-semibold text-center">
          {error} Please try again.
        </p>
      )}

      <button
        onClick={handleGenerate}
        className={`w-full p-3 rounded-lg shadow font-bold text-white ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
        } transition ease-in-out duration-150`}
        disabled={loading} // Disable button while loading
      >
        {loading ? "Generating Memes..." : "Generate Memes"}
      </button>
    </div>
  );
};

export default MemeTextInput;
