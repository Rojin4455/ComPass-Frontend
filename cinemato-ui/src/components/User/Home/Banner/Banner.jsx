import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { CgPlayButtonO } from "react-icons/cg";
import { useSelector } from 'react-redux';
import { FaCirclePlay } from "react-icons/fa6";
import AdminShowTrailers from '../../../Admin/AdminAddMovies/AdminShowTrailers';
import useAxiosInstance from '../../../../axiosBaseConfig';

function Banner({ movies }) {
  const isLoading = useSelector((state) => state.location.showModal);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [trailer, setTrailer] = useState([])
  const [showTrailer, setShowTrailer] = useState(false);
  const axiosInstance = useAxiosInstance()

  useEffect(() => {
    let interval;
    if (movies?.length > 0) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === movies.length - 1 ? 0 : prevIndex + 1
        );
      }, 7000);     
    }

    return () => clearInterval(interval);
  }, [movies]);

  const currentMovie = movies[currentIndex];


  const handlePlayClick = async (movieId) => {
    try {
      const trailersResponse = await axiosInstance.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=7cedc204afadbacc97f11b62930feaa3`);
      if (trailersResponse.status === 200) {
        const playableTrailer = trailersResponse.data.results.find(trailer => trailer.site === "YouTube" && trailer.type === "Trailer");
        if (playableTrailer) {
          setTrailer(playableTrailer);
          setShowTrailer(true)

        } else {
          
          console.log("No playable trailers found.");
          setTrailer(null)
          setShowTrailer(true)

        }



      } else {
        console.error("Error response", trailersResponse);
      }

    } catch (err) {
      console.error("something went wrong in trailer", err);
    }
  }


  const handleCloseModal = () => {
    setShowTrailer(false);
  };

  return (
    <div className="relative w-full h-96 text-white flex flex-col lg:flex-row items-center lg:items-center justify-center p-6 lg:p-12">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.6)), url(${currentMovie?.backdrop_path})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
      ></div>

      <div className="flex-1 text-center lg:text-left mb-6 lg:mb-0 lg:ml-12 relative z-9">
        {isLoading ? (
          <Skeleton width={250} height={40} />
        ) : (
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            {currentMovie?.title || 'Latest Movie Release'}
          </h1>
        )}
        {isLoading ? (
          <Skeleton width={200} height={20} className="mt-2" />
        ) : (
          <p className="mt-2 text-sm sm:text-base md:text-lg">
            {currentMovie?.description || 'Catch the excitement in theaters near you!'}
          </p>
        )}
      </div>

      <div className="w-full lg:w-auto flex justify-center lg:mr-12 relative z-11">
        <div className="w-44 h-60 sm:w-52 sm:h-72 md:w-60 md:h-80 bg-white rounded-lg overflow-hidden shadow-lg flex flex-col justify-center items-center">
          {isLoading ? (
            <Skeleton width={200} height={300} />
          ) : (
            <div className="relative w-full h-full">
              <img
                src={currentMovie?.poster_path}
                alt="Trailer Thumbnail"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex justify-center items-center ">
                <FaCirclePlay size={35} className="text-white opacity-0 hover:opacity-80 transition duration-300"
                  onClick={() => handlePlayClick(currentMovie.tmdb_id)}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div>
        {showTrailer && (
          <AdminShowTrailers showTrailer={showTrailer} selectedTrailer={trailer} handleCloseModal={handleCloseModal} />
        )}
      </div>


    </div>




  );
}

export default Banner;
