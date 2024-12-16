import React from 'react';
import 'tailwindcss/tailwind.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setBooking } from '../../../../slices/userBookingSlice';


function RecommendedMovies({movies}) {
    const scrollRef = React.useRef(null);
    const isLoading = useSelector((state) => state.location.showModal);
    const navigate = useNavigate()
    
    const dispatch = useDispatch()
    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                top: 0,
                left: -250,
                behavior: 'smooth',
            });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                top: 0,
                left: 250,
                behavior: 'smooth',
            });
        }
    };

    const handleMovieDetails = (movieId) => {
        movies.map((movie, index) => {
            if (index === movieId){
                dispatch(setBooking({selectedMovie:movie}))
              navigate('/user/movie-details/',{
                state:{
                  movie
                }
              })
            }
          })
    }

    return (
        <div className="relative py-10 px-4 sm:px-6 md:px-10 lg:px-20">
            
            <div className="flex items-center">
        <hr className="border-t-2 mb-3 border-gray-300 flex-grow" />
        <h1 className="text-xl sm:text-xl md:text-2xl lg:text-2xl font-semibold mb-4 text-center">
            Recommended Movies
        </h1>
        <hr className="border-t-2 mb-3 border-gray-300 flex-grow" />
    </div>
        <div className="flex items-center justify-between relative">
            {/* <button
                onClick={scrollLeft}
                className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-lg p-2 z-10"
            >
                <FaChevronLeft size={20} />
            </button> */}
            <div
                ref={scrollRef}
                style={{
                    overflowX: 'auto',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}
                className="flex space-x-4 px-4 sm:px-6 md:px-8 lg:px-2"
            >
                {/* Hide scrollbar in WebKit (Chrome, Safari) */}
                <style>{`
                    div::-webkit-scrollbar {
                        display: none;
                    }
                `}</style>
                {isLoading
                    ? Array(5).fill().map((_, index) => (
                        <div
                            key={index}
                            className="w-36 h-52 sm:w-48 sm:h-72 md:w-56 md:h-80 lg:w-[236px] lg:h-96 bg-gray-300 rounded-lg shadow-lg flex-shrink-0 animate-pulse"
                        ></div>
                    ))
                    : movies.map((movie, index) => (
<div 
    key={index} 
    className="w-28 h-52 sm:w-48 sm:h-72 md:w-56 md:h-80 lg:w-[236px] lg:h-auto rounded-lg flex-shrink-0 bg-white overflow-hidden relative"
    onClick={() => handleMovieDetails(index)}

>
    {/* Image with Gradient Overlay */}
    <div className="relative">
        <img
            src={movie.poster_path}
            alt={movie.title}
            className="w-full h-3/4 object-cover rounded-t-lg rounded-b-lg transition-transform transform hover:scale-105"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-t-lg rounded-b-lg"></div>
        
        {/* Rating Stars Positioned Inside the Image */}
        <div className="absolute bottom-2 left-2 flex items-center text-yellow-400">
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
                    className="w-4 h-4"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 2l2.39 7.173H22l-6.043 4.247L17.32 22 12 17.75 6.68 22l1.733-8.58L2 9.173h7.611L12 2z"
                    />
                </svg>
            ))}
            <span className="ml-1 text-white text-xs">
                ({movie.vote_average.toFixed(1)})
            </span>
        </div>
    </div>

    {/* Content Below the Image */}
    <div className="p-3 bg-white rounded-b-lg">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{movie.title}</h3>
        
        {/* Display Genres */}
            <div className="flex flex-wrap gap-1 mt-1">
                {movie.genres.map((genre, index) => (
                    <span 
                        key={index} 
                        className="text-xs text-gray-600 bg-gray-100 rounded-full px-2 py-1"
                    >
                        {genre.name}
                    </span>
                ))}
            </div>
    </div>
</div>



                    ))}
            </div>
            {/* <button
                onClick={scrollRight}
                className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-lg p-2"
            >
                <FaChevronRight size={20} />
            </button> */}
        </div>
    </div>
    );
}

export default RecommendedMovies;
