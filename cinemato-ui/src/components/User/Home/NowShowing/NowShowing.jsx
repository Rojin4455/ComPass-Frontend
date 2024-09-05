import React from 'react';
import 'tailwindcss/tailwind.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function NowShowing() {
    const scrollRef = React.useRef(null);
    const movies = [
        { title: 'Movie 1', genre: 'Action', language: 'English', imageUrl: "assets/deadpool-img.jpg" },
        { title: 'Movie 2', genre: 'Comedy', language: 'Hindi', imageUrl: "assets/deadpool-img.jpg" },
        { title: 'Movie 3', genre: 'Drama', language: 'Tamil', imageUrl: "assets/deadpool-img.jpg" },
        { title: 'Movie 4', genre: 'Thriller', language: 'Malayalam', imageUrl: "assets/deadpool-img.jpg" },
        { title: 'Movie 5', genre: 'Romance', language: 'Telugu', imageUrl: "assets/deadpool-img.jpg" },
    ];

    const cardWidth = 320; // Adjusted card width
    const cardMargin = 24; // Space between cards
    const totalCardWidth = cardWidth + cardMargin;

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                top: 0,
                left: -totalCardWidth * 4, // Scroll by the width of 4 cards
                behavior: 'smooth',
            });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                top: 0,
                left: totalCardWidth * 4, // Scroll by the width of 4 cards
                behavior: 'smooth',
            });
        }
    };

    return (
        <>
            <div className="relative px-8 lg:px-24">
                <div className="flex items-center mb-6 mt-10">
                    <hr className="border-t-2 border-gray-300 flex-grow" />
                    <h1 className="text-2xl font-semibold mx-4">Now Showing</h1>
                    <hr className="border-t-2 border-gray-300 flex-grow" />
                </div>

                {/* Left Arrow Button */}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
                    <button onClick={scrollLeft} className="bg-white rounded-full shadow-lg p-2 ml-4">
                        <FaChevronLeft size={20} />
                    </button>
                </div>

                {/* Right Arrow Button */}
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                    <button onClick={scrollRight} className="bg-white rounded-full shadow-lg p-2 mr-4">
                        <FaChevronRight size={20} />
                    </button>
                </div>

                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto space-x-6 scrollbar-hide"
                    style={{ scrollBehavior: 'smooth', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {movies.map((movie, index) => (
                        <div key={index} className="w-64 h-140 rounded-lg shadow-lg flex-shrink-0">
                            <img
                                src={movie.imageUrl}
                                alt={movie.title}
                                className="w-full h-96 object-cover rounded-t-lg"
                            />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold">{movie.title}</h2>
                                <p className="text-md text-gray-600">{movie.genre}</p>
                                <p className="text-md text-gray-600">{movie.language}</p>
                                <button className="mt-4 bg-primary text-white px-4 py-2 rounded-lg">Book Tickets</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default NowShowing;
