import React from 'react';
import 'tailwindcss/tailwind.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { useSelector } from 'react-redux';
import { BsFillInfoCircleFill } from "react-icons/bs";
import { CiCircleInfo } from "react-icons/ci";
import { IoInformation } from "react-icons/io5";



function NowShowing({ movies }) {
    const scrollRef = React.useRef(null);
    const isLoading = useSelector((state) => state.location.showModal);

    // const movies = [
    //     { title: 'Movie 1', genre: 'Action', language: 'English', imageUrl: "assets/deadpool-img.jpg" },
    //     { title: 'Movie 2', genre: 'Comedy', language: 'Hindi', imageUrl: "assets/deadpool-img.jpg" },
    //     { title: 'Movie 3', genre: 'Drama', language: 'Tamil', imageUrl: "assets/deadpool-img.jpg" },
    //     { title: 'Movie 4', genre: 'Thriller', language: 'Malayalam', imageUrl: "assets/deadpool-img.jpg" },
    //     { title: 'Movie 5', genre: 'Romance', language: 'Telugu', imageUrl: "assets/deadpool-img.jpg" },
    // ];

    const cardWidth = 320;
    const cardMargin = 24;
    const totalCardWidth = cardWidth + cardMargin;

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                top: 0,
                left: -totalCardWidth * 4,
                behavior: 'smooth',
            });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                top: 0,
                left: totalCardWidth * 4,
                behavior: 'smooth',
            });
        }
    };

    return (
        <>
            <div className="relative px-8 lg:px-24">
                <div className="flex items-center mb-6 mt-10">
                    <hr className="border-t-2 border-gray-300 flex-grow" />
                    <h1 className="text-2xl font-semibold text-gray-600 mx-4">Now Showing</h1>
                    <hr className="border-t-2 border-gray-300 flex-grow" />
                </div>
                {/* 
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
                    <button onClick={scrollLeft} className="bg-white rounded-full shadow-lg p-2 ml-4">
                        <FaChevronLeft size={20} />
                    </button>
                </div> */}

                {/* <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                    <button onClick={scrollRight} className="bg-white rounded-full shadow-lg p-2 mr-4">
                        <FaChevronRight size={20} />
                    </button>
                </div> */}

                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto space-x-6 scrollbar-hide"
                    style={{ scrollBehavior: 'smooth', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {isLoading
                        ? Array(5).fill(0).map((_, index) => (
                            <div key={index} className="w-64 h-140 rounded-lg shadow-lg flex-shrink-0 animate-pulse">
                                <div className="w-full h-96 bg-gray-300 rounded-t-lg"></div>
                                <div className="p-4">
                                    <div className="h-6 bg-gray-300 rounded mb-2"></div>
                                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                                    <div className="mt-4 bg-gray-300 h-10 rounded-lg"></div>
                                </div>
                            </div>
                        ))
                        : movies.map((movie, index) => (
                            <div key={index} className="w-64 h-auto rounded-lg flex-shrink-0 bg-white overflow-hidden relative">
                                <img
                                    src={movie.poster_path}
                                    alt={movie.title}
                                    className="w-full h-96 object-cover rounded-t-lg"
                                />

                                <div className="p-4 space-y-3">
                                    <h2 className="text-xl font-semibold text-gray-800 truncate">{movie.title}</h2>

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
                                        <span className="ml-2 text-gray-500 text-sm">
                                            ({movie.vote_average.toFixed(1)})
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {movie.genres.map((genre, index) => (
                                            <span
                                                key={index}
                                                className="text-xs text-gray-600 bg-gray-100 rounded-full px-2 py-1"
                                            >
                                                {genre.name}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex flex-wrap gap-1">
                                        {movie.languages.map((language, index) => (
                                            <span
                                                key={index}
                                                className="text-xs text-gray-600 bg-gray-50 rounded-full px-2 py-1"
                                            >
                                                {language.name}
                                            </span>
                                        ))}
                                    </div>
                                    <div className='absolute bottom-0   w-full mt-4 flex items-center'>
                                        <button className="w-4/6 bg-primary text-white py-2 rounded-lg text-center font-medium hover:bg-primary-dark transition-colors">
                                            Book Tickets
                                        </button>
                                        <IoInformation
                                            size={36}
                                            className="ml-3 border border-gray-600 rounded-lg p-2 hover:bg-secondary transition duration-300"
                                        />
                                    </div>
                                </div>
                            </div>

                        ))}
                </div>
            </div>
        </>
    );
}

export default NowShowing;
