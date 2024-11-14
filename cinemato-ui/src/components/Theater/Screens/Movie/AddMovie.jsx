import React, { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setContent } from '../../../../slices/OwnerScreenSlice';
import { FaFilm, FaPlusCircle } from 'react-icons/fa';
import useAxiosInstance from '../../../../axiosConfig';
import Loading from '../../../Admin/AdminAddMovies/Loading';
import MovieDetails from './OwnerMovieDetails';

function AddMovie() {
  const dispatch = useDispatch();
  const axiosInstance = useAxiosInstance()
  
  // Sample movie list for admin (replace with actual data)
  const [movies,setMovies] = useState([])
//   const [isMovie, setIsMovie] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isRemoved,setIsRemoved] = useState(false)
  const [movieId, setMovieId] = useState(null)
    const [loadMovieDetails, setLoadMovieDetails] = useState(false)

  useEffect(() => {
    
    const fetchListedMovies = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("movie/get-movie/");
        if (response.status === 200) {
          console.log("success", response);
          setMovies(response.data);
          if (movies.length === 0) {
            // setIsMovie(false);
          }
        } else {
          console.error("error response : ", response);
        }
      } catch (error) {
        console.error("error while fetching the data :", error);
      }
      setLoading(false);
    //   setIsRemoved(false)
    };

    fetchListedMovies();
  }, []);




  const handleViewDetails = async (movieId) => {
    setLoadMovieDetails(true)
    setMovieId(movieId)
    // dispatch(setContent({subContent:"movie-details"}))
    console.log("handle movie details clicked")
  }

  return (
    <div className="add-movie-section">
      {loading ? (
        <Loading loading={loading} />
      ) : (
        
        <div>
          {movies.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <FaFilm size={50} className="text-green-500 mb-4 animate-pulse" />
              <p className="text-gray-500 text-sm">No movies available. Add a movie to the list.</p>
              <button
                onClick={() => dispatch(setContent({ subContent: 'add-movie' }))}
                className="bg-primary text-white py-2 px-6 mt-6 rounded-lg shadow-lg hover:bg-primaryhover transition-transform transform hover:scale-105"
              >
                Add Movie
              </button>
            </div>
          ) : !loadMovieDetails ? (
            <div className="movie-list-section grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {movies.map((movie,index) => (
                <div
                  key={movie.id || index}
                  className="bg-white shadow-md rounded-lg p-4 border border-gray-200 flex flex-col justify-between transform hover:scale-105 transition-transform duration-300 hover:shadow-xl hover:border-secondary"
                >
                  <img
                    src={movie.poster_path}
                    alt={movie.title}
                    className="rounded-md mb-4 w-full h-64 object-cover transition-opacity hover:opacity-80"
                  />
                  <div className="movie-details">
                    <h3 className="text-xl font-bold text-gray-700">{movie.title}</h3>
                    <p className="text-gray-500 my-2">{movie.genres.map(genre => genre.name).join(', ')}</p>
                    <p className="text-sm text-gray-400">{movie.languages.map(lang => lang.name).join(', ')}</p>
                  </div>
                  <button
                    onClick={() => handleViewDetails(index)}
                    className="bg-primary text-white py-2 px-4 mt-4 rounded-lg flex items-center justify-center hover:bg-primaryhover transition-transform transform hover:scale-105"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          ): (
        <MovieDetails movie={movies.find((movie, index) => index === movieId) } setLoadMovieDetails={setLoadMovieDetails} />
          )}
        </div>
      )}
    </div>
  );
}

export default AddMovie;
