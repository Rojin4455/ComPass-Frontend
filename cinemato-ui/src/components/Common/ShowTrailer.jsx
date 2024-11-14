import React from 'react'
import { IoClose } from "react-icons/io5";
import { FaFilm } from "react-icons/fa";

function ShowTrailer({ showTrailer, selectedTrailer, handleCloseModal }) {
    console.log("selected trailer: ",selectedTrailer)

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
        {/* Container for modal content */}
        <div className="relative bg-white rounded-lg w-full max-w-4xl h-80 flex items-center justify-center">
          
          {/* Close button */}
          <button
            className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 z-50"
            onClick={handleCloseModal}
          >
            <IoClose />
          </button>

          {/* Check if there is a trailer available */}
          {selectedTrailer ? (
            <div className="relative w-full h-full">
              <iframe
                src={`https://www.youtube.com/embed/${selectedTrailer.key}?autoplay=1`}
                title={selectedTrailer.title || 'Trailer'}
                className="w-full h-full rounded-lg"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-700">
              <FaFilm className="text-6xl text-gray-400 mb-4" />
              {console.log("no trailer in section trailer")}
              <h2 className="text-2xl font-bold">No Trailer Available</h2>
              <p className="text-md text-gray-500 mt-2">
                We couldn't find a trailer for this movie.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ShowTrailer;
