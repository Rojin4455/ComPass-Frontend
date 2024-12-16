import React from 'react'
import 'tailwindcss/tailwind.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { useSelector } from 'react-redux';
import { BsFillInfoCircleFill } from "react-icons/bs";
import { CiCircleInfo } from "react-icons/ci";
import { IoInformation } from "react-icons/io5";

function FutureShowings({movies}) {
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
            <div className="relative px-4 sm:px-6 md:px-10 lg:px-24">
    <div className="flex items-center mb-6 mt-10">
        <hr className="border-t-2 mb-3 border-gray-300 flex-grow" />
        <h1 className="text-xl sm:text-xl md:text-2xl lg:text-2xl font-semibold mb-4 text-center">
            Future Showings
        </h1>
        <hr className="border-t-2 mb-3 border-gray-300 flex-grow" />
    </div>

    <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-4 sm:space-x-6 scrollbar-hide"
        style={{ scrollBehavior: 'smooth' }}
    >
        {isLoading
            ? Array(5).fill(0).map((_, index) => (
                <div
                    key={index}
                    className="w-48 sm:w-64 h-96 rounded-lg shadow-lg flex-shrink-0 animate-pulse bg-gray-100"
                >
                    <div className="w-full h-2/3 bg-gray-300 rounded-t-lg"></div>
                    <div className="p-4">
                        <div className="h-6 bg-gray-300 rounded mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                        <div className="mt-4 bg-gray-300 h-10 rounded-lg"></div>
                    </div>
                </div>
            ))
            : movies.map((movie, index) => (
                <div
                    key={index}
                    className="w-48 sm:w-64 flex-shrink-0 rounded-lg bg-white overflow-hidden relative"
                >
                    <img
                        src={movie.poster_path}
                        alt={movie.title}
                        className="w-full h-64 sm:h-80 object-cover rounded-t-lg"
                    />

                    <div className="py-4 space-y-3 w-full">
                        <h2 className="text-base sm:text-lg font-semibold text-gray-800 truncate">
                            {movie.title}
                        </h2>

                        <div className="flex items-center text-yellow-400">
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
                                    className="w-4 sm:w-5 h-4 sm:h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 2l2.39 7.173H22l-6.043 4.247L17.32 22 12 17.75 6.68 22l1.733-8.58L2 9.173h7.611L12 2z"
                                    />
                                </svg>
                            ))}
                            <span className="ml-2 text-sm text-gray-500">
                                ({movie.vote_average.toFixed(1)})
                            </span>
                        </div>

                        <div className="flex flex-wrap gap-1">
                            {movie.genres.map((genre, index) => (
                                <span
                                    key={index}
                                    className="text-xs bg-gray-200 text-gray-700 rounded-full px-2 py-1"
                                >
                                    {genre.name}
                                </span>
                            ))}
                        </div>

                        {/* <div className=" w-full flex items-center justify-between">
                            <button className="w-4/6 bg-primary text-white py-2 rounded-lg text-center font-medium hover:bg-primary-dark transition-colors">
                                Book Tickets
                            </button>
                            <IoInformation
                                size={32}
                                className="ml-2 border border-gray-300 rounded-lg p-2 hover:bg-secondary transition"
                            />
                        </div> */}
                    </div>
                </div>
            ))}
    </div>
</div>

        </>
    );
}

export default FutureShowings