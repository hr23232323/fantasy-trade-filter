import React from "react";

interface TextMemeBoxProps {
  inputText: string;
  updateInputText: (inputText: string) => void;
  loading: boolean;
}

export const TextMemeBox: React.FC<TextMemeBoxProps> = ({
  inputText,
  updateInputText,
  loading,
}) => {
  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg border border-gray-200 max-w-4xl md:w-2/5">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">🎙 Talk Shit</h2>
      <p className="text-xs text-gray-600 mb-4">
        Write an open-ended prompt to generate memes with.
      </p>

      <div className="p-4 bg-white shadow-md rounded-md mb-6">
        <textarea
          id="memeText"
          value={inputText}
          onChange={(e) => updateInputText(e.target.value)}
          placeholder="Let's hear it..."
          className="w-full p-2 border rounded-lg text-gray-900 bg-white shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none hover:border-blue-500 transition ease-in-out duration-150"
          rows={4}
          disabled={loading} // Disable input while loading
        />
      </div>
    </div>
  );
};

export default TextMemeBox;
