import React, { useEffect, useState } from 'react';
// import Header from '../../components/Admin/Header/Header';
// import './AdminMovies.css'; // Add custom styles here or use Tailwind
import { IoAddCircle } from "react-icons/io5";
import useAxiosInstance from '../../../axiosConfig'
import { useNavigate } from 'react-router-dom';
import { RiFunctionAddLine } from "react-icons/ri";

function AdminMovies() {
  const [movies, setMovies] = useState([]); // Empty array initially
  const axiosInstance = useAxiosInstance();
  const navigate = useNavigate();

  const handleAddMovie = async () => {
    // Logic to handle adding a movie
    console.log("Add movie clicked");
    navigate('/admin/addmovies/')
    // try {
    //   const response = await axiosInstance.get('https://api.themoviedb.org/3/movie/157336?api_key=7cedc204afadbacc97f11b62930feaa3')

    //   if (response.status === 200){
    //     console.log("success response got", response)
    //   }else{
    //     console.log("error response",response)
    //   }
    // }catch{
    //   console.log("something went wrong")
    // }
    // console.log("rrrrrrrrrrrr")

  };


  useEffect(()=> {
    const fetchListedMovies = async () => {
      try {
        const response = await axiosInstance.get('movie/get-movie/')
        if (response.status === 200){
          console.log("success",response)
          setMovies(response.data)
        }else{
          console.error("error response : ",response)
        }
      }catch(error){
        console.error("error while fetching the data :" , error)
      }
    }

    fetchListedMovies()
  },[])

  return (
    <div>
      {/* <Header page="admin/movies/" /> */}
      
      <div>
        {/* Top-right button to add movies */}
      

        {/* Check if movies array is empty */}
        {movies.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[70vh]">
            <p className="text-yellow-500 text-xl mb-4">No movies are listed yet.</p>
            <p className='text-bold-900 text-xl mb-4'>Add Movies</p>
            {/* <button 
              onClick={handleAddMovie} 
            //   className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-4 px-8 rounded-full"
            >
              +
            </button> */}
            <IoAddCircle size={120} className='text-primary hover:text-gray-600' onClick={handleAddMovie}/>

          </div>
        ) : (
          <>
  {/* Container for the button and movies */}
  <div className="relative">
    {/* Button Container */}
    <div className=" absolute right-8 top-4">
      <button className="flex items-center gap-2 bg-yellow-100 text-black border-2 border-secondary rounded-full px-4 py-2 hover:bg-yellow-200 hover:border-secondary transition-all"
      onClick={handleAddMovie}>
        <RiFunctionAddLine size={30}/>
        Add More
      </button>
    </div>

    {/* Movies Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-8">
      {movies.map((movie, index) => (
        <div
          key={index}
          className="relative group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          {/* Movie poster */}
          <img
            src={movie.poster_path}
            alt={movie.title}
            className="rounded-t-lg w-full h-60 object-cover"
          />

          <div className="p-4">
            {/* Movie title */}
            <h3 className="text-lg font-semibold mb-2">{movie.title}</h3>

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
                <span key={i}>{lang.name}{i < movie.languages.length - 1 ? ', ' : ''}</span>
              ))}
            </div>

            {/* Rating with stars */}
            <div className="flex items-center text-yellow-400 mb-2">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  fill={i < Math.round(movie.vote_average / 2) ? 'currentColor' : 'none'}
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
              <span className="ml-2 text-gray-500">({movie.vote_average.toFixed(1)})</span>
            </div>

            {/* Release Date */}
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Released: </span>
              {movie.release_date}
            </p>
          </div>

          {/* Hover effect to show movie description */}
          <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="text-center p-4">
              <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
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
  );
}

export default AdminMovies;
