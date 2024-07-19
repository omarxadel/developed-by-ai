import React from "react";

export const ItemListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-lg shadow-md animate-pulse"
        >
          <div className="bg-gray-200 h-48 w-full mb-4 rounded-lg"></div>
          <div className="bg-gray-200 h-6 w-2/3 mb-2 rounded-lg"></div>
          <div className="bg-gray-200 h-6 w-1/2 rounded-lg"></div>
        </div>
      ))}
    </div>
  );
};
