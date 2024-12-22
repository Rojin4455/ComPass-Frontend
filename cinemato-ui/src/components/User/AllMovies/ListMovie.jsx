import React,{ useState, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5"
import { useSelector } from "react-redux"
import { IoIosClose } from "react-icons/io";




export default function ListMovie({movies}) {
    const languages = [
        ...new Set(
            movies.flatMap(movie => movie.languages.map(lan => lan.name))
        )
    ]; 
    const genres = [
        ...new Set(
            movies.flatMap(movie => movie.genres.map(gen => gen.name))
        )
    ]
    const address = useSelector((state) => state.location.address)
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const ogAllMovies = movies
    const [allMovies,setAllMovies] = useState(movies)
    const [content,setContent] = useState("")

    const [selectedOptions, setSelectedOptions] = useState({
        Languages: [],
        Genres: [],
      });
    
      const setSearchContent = (e) => {
        if (e.target.value === ""){
            setContent("")
            return
        }
        const searchValue = e.target.value.toLowerCase();
        setContent(searchValue);
        console.log(searchValue);
    
        const filteredMovies = allMovies.filter((movie) => 
            movie.title.toLowerCase().includes(searchValue)
        );
    
        // Update the state with filtered movies
        setAllMovies(filteredMovies);

        console.log("filtered options: ", filteredMovies);
    };

    useEffect(()=> {
        if (content === ""){
            setAllMovies(ogAllMovies)
        }

    },[content])
    
    const [activeFilter, setActiveFilter] = useState(true);

    const toggleFilter = (filter) => {
      setActiveFilter(activeFilter === filter ? null : filter);
    };
  
    const filterOptions = {
      Languages: languages,
      Genres: genres,
    };


    const handleFilterOptionClick = (filter, option) => {
        const updatedSelectedOptions = { ...selectedOptions };
        if (updatedSelectedOptions[filter].includes(option)) {
          updatedSelectedOptions[filter] = updatedSelectedOptions[filter].filter((o) => o !== option);
        } else {
          updatedSelectedOptions[filter].push(option);
        }
        setSelectedOptions(updatedSelectedOptions);
      };


      useEffect(() => {

        const filteredMovies = movies.filter((movie) => {
            const matchesGenres = selectedOptions.Genres.length === 0 || movie.genres.some((genre) => selectedOptions.Genres.includes(genre.name));
    
            const matchesLanguages = selectedOptions.Languages.length === 0 || movie.languages.some((language) => selectedOptions.Languages.includes(language.name));
    
            return matchesGenres && matchesLanguages;
        });
        setAllMovies(filteredMovies)
    
    }, [selectedOptions]);


    const handleRemoveFilter = (filter, option) => {
        const updatedSelectedOptions = { ...selectedOptions };
        updatedSelectedOptions[filter] = updatedSelectedOptions[filter].filter((o) => o !== option);
        setSelectedOptions(updatedSelectedOptions);
        // onFilterChange(updatedSelectedOptions);
      };
    
  return (
    <div className="container mx-auto py-8 px-4">
        
      <div className="flex flex-col lg:flex-row gap-8">
        
      <div className="w-full lg:w-64 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Filters</h2>
      <div className="space-y-6">
        {Object.keys(selectedOptions).map((filter) => (
          <div key={filter} className="space-y-2">
            {selectedOptions[filter].length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedOptions[filter].map((option) => (
                  <div
                    key={`${filter}-${option}`}
                    className="bg-secondary text-gray-700 px-3 py-1 rounded-md flex items-center"
                  >
                    {option}
                    <button
                      className="ml-2 text-gray-700 hover:text-gray-900"
                      onClick={() => handleRemoveFilter(filter, option)}
                    >
                      <IoIosClose className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <button
              className="flex justify-between items-center w-full text-lg font-medium hover:text-primaryhover focus:outline-none"
              onClick={() => toggleFilter(filter)}
            >
              <span>{filter}</span>
              <svg
                className={`w-5 h-5 transition-transform ${
                  activeFilter === filter ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {activeFilter === filter && (
              <div className="mt-4 grid grid-cols-2 gap-2">
                {filterOptions[filter].map((option) => (
                  <button
                    key={option}
                    className={`px-3 py-2 rounded-md transition-all duration-200 ${
                      selectedOptions[filter].includes(option)
                        ? 'bg-primaryhover text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                    onClick={() => handleFilterOptionClick(filter, option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

    </div>

        {/* Main Content */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-6">Movies In {address ? address.split(" ")[0] : ""}</h1>
          <div className="ml-auto flex items-center relative mb-8">
  {isSearchVisible ? (
    <div className="flex items-center border-b-2 border-gray-300 transition-all duration-300 ease-in-out">
      <IoSearchOutline
        size={20}
        className={`cursor-pointer text-gray-500 transition-transform duration-300 ease-in-out ${isSearchVisible ? 'translate-x-[-10px]' : ''}`}
      />
      <input
        type="text"
        placeholder="Search cinema"
        className="border-0 outline-none py-1 placeholder-gray-400 transition-all duration-300 ease-in-out"
        onBlur={() => setIsSearchVisible(false)}
        onChange={setSearchContent}
        autoFocus
      />
      
    </div>
  ) : (
    <IoSearchOutline
      size={30}
      className="cursor-pointer text-gray-500 transition-transform duration-300 ease-in-out"
      onClick={() => setIsSearchVisible(true)}
    />
  )}
</div>
          {/* Language Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {languages.map((lang) => (
              <button key={lang} className="px-4 py-1 rounded-full border border-primary text-primary text-sm hover:bg-blue-50">
                {lang}
              </button>
            ))}
          </div>
          
          {/* Coming Soon Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">In Theaters</h2>
              {/* <button className="text-primary font-medium text-sm flex items-center">
                Explore Upcoming Movies
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button> */}
            </div>
            
            {/* Movie Grid */}
            <div>
  {allMovies.length === 0 ? (
    <div className="text-center py-10">
      <h2 className="text-lg font-medium text-gray-500">No movies available</h2>
      <p className="text-sm text-gray-400">Try adjusting your search or filters.</p>
    </div>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {allMovies.map((movie, index) => (
        <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm">
          <div className="relative aspect-[2/3]">
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
              }}
            >
              <img
                src={movie.poster_path}
                alt={movie.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
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
          <div className="p-4">
            <h3 className="font-medium text-lg mb-1">{movie.title}</h3>
            <div className="flex items-center gap-2">
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
        </div>
      ))}
    </div>
  )}
</div>

          </div>
        </div>

        
      </div>
    </div>
  )
}

