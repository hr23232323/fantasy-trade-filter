import React from "react";

const SkeletonPlayerTable = () => {
  const rowsPerPage = 25; // Match your pagination
  const skeletonRows = Array.from({ length: rowsPerPage });

  return (
    <div className="overflow-x-auto mt-4 bg-gray-100 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mt-2">📋 Player List</h2>
      <p className="text-md text-gray-700 bg-gray-100 rounded mt-1 mb-6">
        Loading player data...
      </p>
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-800 text-white sticky top-0">
          <tr>
            <th className="p-3 text-left">Player</th>
            <th className="p-3 text-left">Position Rank</th>
            <th className="p-3 text-left">Age</th>
            <th className="p-3 text-left">Value</th>
            <th className="p-3 text-left"></th> {/* Expand icon */}
          </tr>
        </thead>
        <tbody className="text-gray-800">
          {skeletonRows.map((_, index) => (
            <tr key={index}>
              <td className="p-3">
                <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
              </td>
              <td className="p-3">
                <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
              </td>
              <td className="p-3">
                <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
              </td>
              <td className="p-3">
                <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
              </td>
              <td className="p-3">
                <div className="w-8 h-4 bg-gray-200 rounded animate-pulse"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination skeleton */}
      <div className="flex justify-between items-center mt-4">
        <div className="px-3 py-1 bg-gray-200 rounded w-20 h-8 animate-pulse"></div>
        <div className="text-sm text-gray-700">
          <div className="w-32 h-4 bg-gray-200 rounded animate-pulse mx-auto"></div>
        </div>
        <div className="px-3 py-1 bg-gray-200 rounded w-20 h-8 animate-pulse"></div>
      </div>
    </div>
  );
};

export default SkeletonPlayerTable;
