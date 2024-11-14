import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function SnacksFilter({setSelectedCategory, categories, selectedCategory, searchQuery, setSearchQuery}) {

    const navigate = useNavigate()
    const snackContent = useSelector((state) => state.ownerscreen.snackContent)
    console.log("snack content: ",snackContent)

    const onAddSnack = () => {
        navigate('/owner/snacks/');
      };


  return (
    <div className="flex w-full p-10 bg-white shadow-lg rounded-lg mb-10">
    <div className="mb-6 flex flex-wrap items-center justify-start gap-6 w-3/4">
      <div className="flex overflow-x-auto scrollbar-hide space-x-4 px-2 py-3 bg-gray-100 rounded-lg shadow-inner">
        <button
          className={`px-5 py-2 rounded-full transition-all duration-300 ease-in-out text-sm font-semibold ${
            selectedCategory === "All" ? "bg-secondary text-gray-700" : "bg-gray-300 text-gray-700 hover:bg-secondary hover:text-gray-600"
          }`}
          onClick={() => setSelectedCategory("All")}
        >
          All
        </button>
        {categories.map((category, index) => (
          <button
            key={index}
            className={`px-5 py-2 rounded-full transition-all duration-300 ease-in-out text-sm font-semibold ${
              selectedCategory === category
                ? "bg-secondary text-gray-700"
                : "bg-gray-300 text-gray-700 hover:bg-secondary hover:text-gray-600"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
  
      <input
        type="text"
        placeholder="Search snacks..."
        className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/3 text-gray-600 focus:outline-none focus:border-primary focus:ring-0.5 focus:ring-primary transition-all duration-300"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
    {snackContent === 'owner' && (
    <div className="flex justify-end mb-6 w-1/4">
      <button
        onClick={onAddSnack}
        className="bg-primary text-white px-6 py-2 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out hover:bg-primaryhover hover:shadow-xl hover:scale-105"
      >
        + Add Snack
      </button>
    </div>
    )}
  </div>
  )
}

export default SnacksFilter