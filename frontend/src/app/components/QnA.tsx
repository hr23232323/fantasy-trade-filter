import React from "react";

interface QnAProps {
  index: number;
  question: string;
  answer: string;
}

export const QnA: React.FC<QnAProps> = ({ index, question, answer }) => {
  return (
    <div
      key={index}
      className="p-6 bg-gray-800 text-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-700"
    >
      {/* Question */}
      <div className="flex items-center mb-4">
        <span className="text-3xl text-blue-500 mr-3">❓</span>
        <h2 className="text-xl font-bold">{question}</h2>
      </div>
      {/* Answer */}
      <div className="flex items-start">
        <span className="text-2xl text-green-400 mr-3">💡</span>
        <p className="leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

export default QnA;
