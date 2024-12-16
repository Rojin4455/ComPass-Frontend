import React from 'react';

const TopMovies = ({ topMovies }) => {
  return (
    <div className="px-6 py-10 bg-gray-50 mt-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Top Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {topMovies.map((movie, index) => (
          <div
            key={index}
            className="flex items-center bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300"
            style={{ height: '80px' }}
          >
            <img
              src={movie[1][1].poster_path}
              alt={movie[0]}
              className="w-20 h-full object-cover"
            />
            <div className="flex-1 p-4 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium text-gray-800">{movie[0]}</h3>
                <p className="text-sm text-gray-600">{movie[1][1].genres}</p>
              </div>
              <p className="text-gray-700 font-semibold">
                {movie[1][0]} Bookings
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopMovies;