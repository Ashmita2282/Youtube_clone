import React, { useState } from "react";

const FilterButtons = ({ onCategorySelect }) => {
  const categories = [
    "All",
    "Music",
    "Sports",
    "Gaming",
    "News",
    "Education",
    "Technology",
    "Food",
    "Drama",
  ];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onCategorySelect(category); // Pass the selected category to Home
  };

  return (
    <div className="flex p-4 ml-16 space-x-2 w-full justify-between z-0 bg-gray-50 fixed  mt-20">
      {categories.map((category) => (
        <button
          key={category}
          className={`px-4 py-1 rounded-full ${
            selectedCategory === category
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
