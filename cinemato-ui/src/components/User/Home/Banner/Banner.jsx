import React from 'react';
import { CgPlayButtonO } from "react-icons/cg";

function Banner() {
  return (
    <div className="relative w-full h-96 bg-gradient-to-r from-black to-gray-800 text-white flex items-center">
      {/* Left side: Banner text/content */}
      <div className="ml-12 flex-1">
        <h1 className="text-4xl font-bold">Latest Movie Release</h1>
        <p className="mt-2 text-lg">Catch the excitement in theaters near you!</p>
      </div>

      {/* Right side: Trailer card */}
      <div className="mr-12">
        <div className="mt-12 w-52 h-72 bg-white rounded-lg overflow-hidden shadow-lg flex flex-col justify-center items-center">
          <div className="relative w-full h-full">
            <img
              src="assets\banner-card.avif"
              alt="Trailer Thumbnail"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex justify-center items-center">
            <CgPlayButtonO className='text-black-200 w-14 h-14 rounded-full flex items-center justify-center' />
            </div>
          </div>
          {/* <p className="mt-2 text-black font-semibold">Watch Trailer</p> */}
        </div>
      </div>
    </div>
  );
}

export default Banner;
