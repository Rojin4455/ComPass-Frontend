import React from 'react';
import 'tailwindcss/tailwind.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function RecommendedMovies() {
    const scrollRef = React.useRef(null);
    const movies = [
        { title: 'Movie 2', imageUrl: "assets/banner-card.avif" },
        { title: 'Movie 1', imageUrl: "assets/banner-card.avif" },
        { title: 'Movie 1', imageUrl: "assets/banner-card.avif" },
        { title: 'Movie 2', imageUrl: "assets/banner-card.avif" },
        { title: 'Movie 1', imageUrl: "assets/banner-card.avif" },
        { title: 'Movie 2', imageUrl: "assets/banner-card.avif" },
        { title: 'Movie 1', imageUrl: "assets/banner-card.avif" },
        { title: 'Movie 1', imageUrl: "assets/banner-card.avif" },
        { title: 'Movie 2', imageUrl: "assets/banner-card.avif" },
        { title: 'Movie 1', imageUrl: "assets/banner-card.avif" },
    ];

    const cardWidth = 224; // 56 * 4 (Tailwind width w-56 in pixels)
    const cardMargin = 16; // 4 * 4 (Tailwind space-x-4 in pixels)
    const totalCardWidth = cardWidth + cardMargin;

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                top: 0,
                left: -totalCardWidth * 1, // Scroll by the width of 1 card
                behavior: 'smooth',
            });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                top: 0,
                left: totalCardWidth * 1, // Scroll by the width of 1 card
                behavior: 'smooth',
            });
        }
    };

    return (
        <>
            <div className="relative ">
                <h1 className="text-2xl font-semibold mb-2 mt-10" style={{ paddingLeft: "165px" }}>Recommended Movies</h1>
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
                    <button onClick={scrollLeft} className="bg-white rounded-full shadow-lg p-2" style={{ marginLeft: '149px' }}>
                        <FaChevronLeft size={20} />
                    </button>
                </div>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                    <button onClick={scrollRight} className="bg-white rounded-full shadow-lg p-2" style={{ marginRight: '149px' }}>
                        <FaChevronRight size={20} />
                    </button>
                </div>
                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto space-x-4 p-4 scrollbar-hide justify-center"
                    style={{
                        scrollBehavior: 'smooth',
                        paddingLeft: '75rem',
                        marginLeft: 'calc(50% - 599px)',
                        paddingRight: '0rem',
                        marginRight: 'calc(50% - 560px)',
                        scrollbarWidth: 'none', // For Firefox
                        msOverflowStyle: 'none', // For Internet Explorer and Edge
                    }}
                >
                    {movies.map((movie, index) => (
                        <div key={index} className="w-56 h-96 bg-gray-200 rounded-lg shadow-lg flex-shrink-0">
                            <img
                                src={movie.imageUrl}
                                alt={movie.title}
                                className="w-full h-full object-cover rounded-lg"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default RecommendedMovies;
