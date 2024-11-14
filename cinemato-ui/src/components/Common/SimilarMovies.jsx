import React, { useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Loading from './Loading';
import { HiArrowLeftCircle,HiArrowRightCircle } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';


function SimilarMovies({ movies, isLoading }) {
    const scrollRef = useRef(null);
    const [isScrolledLeft, setIsScrolledLeft] = useState(false);
    const [isScrolledRight, setIsScrolledRight] = useState(false);
    const navigate = useNavigate()

    const checkScrollPosition = () => {
        const scrollElement = scrollRef.current;
        if (scrollElement) {
            setIsScrolledLeft(scrollElement.scrollLeft > 0);
            setIsScrolledRight(
                scrollElement.scrollLeft + scrollElement.clientWidth < scrollElement.scrollWidth
            );
        }
    };

    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    };

    useEffect(() => {
        checkScrollPosition();
        const scrollElement = scrollRef.current;
        scrollElement.addEventListener('scroll', checkScrollPosition);
        return () => scrollElement.removeEventListener('scroll', checkScrollPosition);
    }, [movies]);


    const handleMovieDetails = (movieId) => {
        movies.map((movie, index) => {
            if (index === movieId){
              navigate('/user/movie-details/',{
                state:{
                  movie
                }
              })
            }
          })
    }

    return (
        <div className="relative py-4">
            <div className="relative flex items-center justify-center max-w-5xl mx-auto">
                {/* Left Scroll Button */}
                <button
                    onClick={scrollLeft}
                    className={`absolute left-2 sm:left-4 top-2/5 transform -translate-y-1/2 text-white rounded-full shadow-lg p-2 z-10 ${
                        isScrolledLeft ? 'opacity-80' : 'opacity-0'
                    } transition-opacity duration-300`}
                >
                    <HiArrowLeftCircle size={40} />
                </button>

                <div
                    ref={scrollRef}
                    style={{
                        overflowX: 'auto',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }}
                    className="flex space-x-4 px-4 sm:px-6 md:px-8 lg:px-2 overflow-hidden"
                >
                    <style>{`
                        div::-webkit-scrollbar {
                            display: none;
                        }
                    `}</style>

                    {isLoading
                        ? Array(4)
                              .fill()
                              .map((_, index) => (
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
                                  <div className="relative">
                                      <img
                                          src={movie.poster_path}
                                          alt={movie.title}
                                          className="w-full h-3/4 object-cover rounded-t-lg rounded-b-lg transition-transform transform hover:scale-105"
                                      />
                                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-t-lg rounded-b-lg"></div>
                                      <div className="absolute bottom-2 left-2 flex items-center text-yellow-400">
                                          {[...Array(5)].map((_, i) => (
                                              <svg
                                                  key={i}
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  fill={
                                                      i < Math.round(movie.vote_average / 2)
                                                          ? 'currentColor'
                                                          : 'none'
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

                                  <div className="p-3 bg-white rounded-b-lg">
                                      <h3 className="text-lg font-semibold text-gray-800 truncate">
                                          {movie.title}
                                      </h3>
                                  </div>
                              </div>
                          ))}
                </div>

                {/* Right Scroll Button */}
                <button
                    onClick={scrollRight}
                    className={`absolute right-2 sm:right-4 top-2/5 transform -translate-y-1/2 text-white rounded-full shadow-lg p-2 z-10 ${
                        isScrolledRight ? 'opacity-80' : 'opacity-0'
                    } transition-opacity duration-300`}
                >
                    <HiArrowRightCircle size={40} />
                </button>

                {/* Left and Right Blur Effect */}
                <div
                    className={`absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white ${
                        isScrolledLeft ? 'opacity-100' : 'opacity-0'
                    } transition-opacity duration-300`}
                ></div>
                <div
                    className={`absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white ${
                        isScrolledRight ? 'opacity-100' : 'opacity-0'
                    } transition-opacity duration-300`}
                ></div>
            </div>
        </div>
    );
}

export default SimilarMovies;
