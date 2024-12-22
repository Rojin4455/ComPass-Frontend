import React, { useEffect, useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import useAxiosInstance from "../../../axiosBaseConfig";
import Loading from "../../Admin/AdminAddMovies/Loading";

function Movies() {
  const [movies, setMovies] = useState([]);
  const axiosInstance = useAxiosInstance();
  const [isMovie, setIsMovie] = useState(true);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [isRemoved,setIsRemoved] = useState(false)


  const handleAddMovie = async () => {
    // Logic to handle adding a movie
    console.log("Add movie clicked");
  }

  useEffect(() => {
      console.log("FFF");
      
      const fetchListedMovies = async () => {
        setLoading(true);
        try {
          const response = await axiosInstance.get("movie/get-movie/?page=theater");
          if (response.status === 200) {
            console.log("success", response);
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


    const unListMovie = async (movieId) => {
      // try{
      //   const response = await axiosInstance.post('movie/remove-movie/',{
      //     id:movieId
      //   })
      //   if (response.status === 200){
      //     console.log("movie unlisted successfully",response);
      //     showToast("success","movie removed successfully")
      //     setIsRemoved(true)        
      //   }else{
      //     console.error("error response", response)
      //     showToast("error","something went wrong")
      //   }
  
      // }catch(error){
      //   console.error("error response in catch",error)
      //   showToast("error","Something Went Wrong")
      // }
    }


    const showMovieDetails = async (movieId) => {
      movies.map((movie, index) => {
        if (index === movieId){
          navigate('/owner/movie-details/',{
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
      {/* <Header page="admin/movies/" /> */}

      <div>
        {/* Top-right button to add movies */}

        {/* Check if movies array is empty */}
        {movies.length === 0 && !isMovie ? (
          <div className="flex flex-col items-center justify-center h-[70vh]">
            <p className="text-yellow-500 text-xl mb-4">
              No movies are listed yet.
            </p>
            <p className="text-bold-900 text-xl mb-4">Add Movies</p>
            {/* <button 
            onClick={handleAddMovie} 
          //   className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-4 px-8 rounded-full"
          >
            +
          </button> */}
            <IoAddCircle
              size={120}
              className="text-primary hover:text-gray-600"
              onClick={handleAddMovie}
            />
          </div>
        ) : (
          <>
            {/* Container for the button and movies */}
            <div className="relative">
              {/* Button Container */}
              {/* <div className=" absolute right-8 top-4">
                <button
                  className="flex items-center gap-2 bg-yellow-100 text-black border-2 border-secondary rounded-full px-4 py-2 hover:bg-yellow-200 hover:border-secondary transition-all"
                  onClick={handleAddMovie}
                >
                  <RiFunctionAddLine size={30} />
                  Add More
                </button>
              </div> */}

              {/* Movies Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-20">
                {movies.map((movie, index) => (
                  <div
                    key={index}
                    className="relative group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  >
                    {/* Movie poster */}
                    <img
                      src={movie.poster_path}
                      alt={movie.title}
                      className="rounded-t-lg w-full object-cover"
                    />

                    <div className="p-4">
                      {/* Movie title */}
                      <h3 className="text-lg font-semibold mb-2">
                        {movie.title}
                      </h3>

                      {/* Movie genres */}
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

                      {/* Movie languages */}
                      <div className="text-sm text-gray-500 mb-2">
                        <span className="font-semibold">Languages: </span>
                        {movie.languages.map((lang, i) => (
                          <span key={i}>
                            {lang.name}
                            {i < movie.languages.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </div>

                      {/* Rating with stars */}
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

                      {/* Release Date */}
                      <p className="text-sm text-gray-500">
                        <span className="font-semibold">Released: </span>
                        {movie.release_date}
                      </p>
                    </div>

                    {/* Hover effect to show movie description */}
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      {/* Delete Icon Positioned at Top Right */}
                      {/* <div className="absolute top-4 right-4" onClick={() => unListMovie(movie.tmdb_id)}>
                        <RiDeleteBin3Fill size={20} className="text-danger cursor-pointer"/>
                      </div> */}

                      {/* Movie Description in the Center */}
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
)
}

export default Movies
