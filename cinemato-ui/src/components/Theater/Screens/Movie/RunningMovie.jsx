import React from 'react'
import { useDispatch } from 'react-redux';
import { FaFilm } from 'react-icons/fa';
import { setContent } from '../../../../slices/OwnerScreenSlice';

function RunningMovie() {
    const dispatch = useDispatch();
    const movies = []; // Replace with actual movie data from state or props
  
    return (
      <div className="add-movie-section">
        {movies.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <FaFilm size={50} className="text-green-500 mb-4" />
            <p className="text-gray-500 text-sm">No movies available. Add a movie to the list.</p>
            <button
              onClick={() => dispatch(setContent({ subContent: 'add-movie' }))}
              className="bg-primary text-white py-2 px-6 mt-6 rounded hover:bg-primaryhover transition"
            >
              Add Movie
            </button>
          </div>
        ) : (
          <div className="movie-list-section grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {movies.map((movie, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-4 border border-gray-200 flex items-center justify-between transform hover:scale-105 transition-transform duration-300"
              >
                <div className="movie-details">
                  <h3 className="text-xl font-medium text-gray-700">{movie.title}</h3>
                  <p className="text-gray-500">{movie.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
}

export default RunningMovie