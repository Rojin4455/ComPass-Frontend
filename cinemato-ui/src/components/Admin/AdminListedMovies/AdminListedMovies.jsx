import React, { useEffect, useState } from "react";
// import Header from '../../components/Admin/Header/Header';
// import './AdminMovies.css'; // Add custom styles here or use Tailwind
import { IoAddCircle } from "react-icons/io5";
import useAxiosInstance from "../../../axiosConfig";
import { useNavigate } from "react-router-dom";
import { RiFunctionAddLine } from "react-icons/ri";
import Loading from "../AdminAddMovies/Loading";



function AdminMovies() {
  const [movies, setMovies] = useState([]);
  const axiosInstance = useAxiosInstance();
  const [isMovie, setIsMovie] = useState(true);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [isRemoved,setIsRemoved] = useState(false)
  const handleAddMovie = async () => {
    console.log("Add movie clicked");
    navigate("/admin/addmovies/");
  };

  useEffect(() => {
    
    const fetchListedMovies = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("movie/get-movie/?page=admin");
        if (response.status === 200) {
          setMovies(response.data);
          if (movies.length === 0) {
            setIsMovie(false);
          }
        } else {
          console.error("error response : ", response);
        }
      } catch (error) {
        console.error("error while fetching the data :", error);
      }
      setLoading(false);
      setIsRemoved(false)
    };

    fetchListedMovies();
  }, [isRemoved]);




  const showMovieDetails = async (movieId) => {
    movies.map((movie, index) => {
      if (index === movieId){
        navigate('/admin/listmovie-datail/',{
          state:{
            movie
          }
        })
      }
    })
  }

  return (
    <>
      <Loading loading={loading} />

      <div>

        <div>

          {movies.length === 0 && !isMovie ? (
            <div className="flex flex-col items-center justify-center h-[70vh]">
              <p className="text-yellow-500 text-xl mb-4">
                No movies are listed yet.
              </p>
              <p className="text-bold-900 text-xl mb-4">Add Movies</p>

              <IoAddCircle
                size={120}
                className="text-primary hover:text-gray-600"
                onClick={handleAddMovie}
              />
            </div>
          ) : (
            <>
              <div className="relative">
                <div className=" absolute right-8 top-4">
                  <button
                    className="flex items-center gap-2 bg-yellow-100 text-black border-2 border-secondary rounded-full px-4 py-2 hover:bg-yellow-200 hover:border-secondary transition-all"
                    onClick={handleAddMovie}
                  >
                    <RiFunctionAddLine size={30} />
                    Add More
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-20">
                  {movies.map((movie, index) => (
                    <div
                      key={index}
                      className="relative group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                      <img
                        src={movie.poster_path}
                        alt={movie.title}
                        className="rounded-t-lg w-full object-cover"
                      />

                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">
                          {movie.title}
                        </h3>

                        <div className="flex flex-wrap text-sm text-gray-500 mb-2">
                          {movie.genres.map((genre, i) => (
                            <span
                              key={i}
                              className="mr-2 bg-gray-200 rounded-full px-3 py-1 text-xs"
                            >
                              {genre.name}
                            </span>
                          ))}
                        </div>

                        <div className="text-sm text-gray-500 mb-2">
                          <span className="font-semibold">Languages: </span>
                          {movie.languages.map((lang, i) => (
                            <span key={i}>
                              {lang.name}
                              {i < movie.languages.length - 1 ? ", " : ""}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center text-yellow-400 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              fill={
                                i < Math.round(movie.vote_average / 2)
                                  ? "currentColor"
                                  : "none"
                              }
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 2l2.39 7.173H22l-6.043 4.247L17.32 22 12 17.75 6.68 22l1.733-8.58L2 9.173h7.611L12 2z"
                              />
                            </svg>
                          ))}
                          <span className="ml-2 text-gray-500">
                            ({movie.vote_average.toFixed(1)})
                          </span>
                        </div>

                        <p className="text-sm text-gray-500">
                          <span className="font-semibold">Released: </span>
                          {movie.release_date}
                        </p>
                      </div>

                      <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">


                        <div className="text-center p-4 cursor-pointer" onClick={() => showMovieDetails(index)}>
                          <h3 className="text-xl font-bold mb-2">
                            {movie.title}
                          </h3>
                          <p>{movie.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminMovies;
