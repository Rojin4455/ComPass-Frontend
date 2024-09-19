import React from 'react'
import { setFilter } from '../../../slices/adminMovieFilterSlice';
import { useDispatch } from 'react-redux';
import { FaLanguage } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { FaMasksTheater } from "react-icons/fa6";

function AdminFilterMovies({setLanguageDropdown, languageDropdown, selectedLanguage, setSelectedLanguage, setChangeFilter, setGenreDropdown, genreDropdown, selectedGenre,
    setSelectedGenre,filter
  }) {
    const dispatch = useDispatch();
  return (
    <>

            
            {/* Language Filter */}
            <div className="relative mr-4">
              <button 
                className="flex items-center gap-2 px-3 py-2 bg-third text-black rounded-full" 
                onClick={() => setLanguageDropdown(!languageDropdown)}
              >
                <FaLanguage />
                {selectedLanguage} 
                <IoIosArrowDown />

              </button>
              {languageDropdown && (
                <div className="absolute mt-2 w-30 bg-white border rounded-lg shadow-lg p-4">
                <ul>
                <li 
                    className="cursor-pointer p-2 hover:bg-secondary rounded-lg"
                    onClick={() => setSelectedLanguage("All")}
                  >
                    All
                  </li>                  <li 
                    className="cursor-pointer p-2 hover:bg-secondary rounded-lg"
                    onClick={() => {setSelectedLanguage("hin")
                    dispatch(setFilter({language:'hi',genre:filter.genre}))}
                    }
                  >
                    Hindi
                  </li>
                  <li 
                    className="cursor-pointer p-2 hover:bg-secondary rounded-lg"
                    onClick={() => {setSelectedLanguage("mal")
                      dispatch(setFilter({language:'ml',genre:filter.genre}))
                      setChangeFilter(true)}
                    }
                  >
                    Malayalam
                  </li>
                  <li 
                    className="cursor-pointer p-2 hover:bg-secondary rounded-lg"
                    onClick={() => {setSelectedLanguage("eng")
                      dispatch(setFilter({language:'en',genre:filter.genre}))
                      setChangeFilter(true)}
                    }
                  >
                    English
                  </li>
                  <li 
                    className="cursor-pointer p-2 hover:bg-secondary rounded-lg"
                    onClick={() => {setSelectedLanguage("kan")
                      dispatch(setFilter({language:'kn',genre:filter.genre}))
                      setChangeFilter(true)}
                    }
                  >
                    Kannada
                  </li>
                  <li 
                    className="cursor-pointer p-2 hover:bg-secondary rounded-lg"
                    onClick={() => {setSelectedLanguage("tel")
                      dispatch(setFilter({language:'te',genre:filter.genre}))
                      setChangeFilter(true)}
                    }
                  >
                    Telugu
                  </li>
                  <li 
                    className="cursor-pointer p-2 hover:bg-secondary rounded-lg"
                    onClick={() => {setSelectedLanguage("tam")
                      dispatch(setFilter({language:'ta',genre:filter.genre}))
                      setChangeFilter(true)}
                    }
                  >
                    Tamil
                  </li>
                </ul>
              </div>
              
              )}
            </div>

            {/* Genre Filter */}
            <div className="relative mr-4">
              <button 
                className="flex items-center gap-2 px-3 py-2 bg-third text-black rounded-full"
                onClick={() => setGenreDropdown(!genreDropdown)}
              >
                <FaMasksTheater/>
               {selectedGenre}
               <IoIosArrowDown/>
              </button>
              {genreDropdown && (

                <div className="absolute mt-2 w-30 bg-white border rounded-lg shadow-lg p-4">
                <ul>
                <li 
                    className="cursor-pointer p-2 hover:bg-secondary rounded-lg"
                    onClick={() => {setSelectedGenre("All");
                      dispatch(setFilter({language:filter.language,genre:35}));
                  }}
                  >
                    All
                  </li>
                  <li 
                    className="cursor-pointer p-2 hover:bg-secondary rounded-lg"
                    onClick={() => {setSelectedGenre("Act")
                      dispatch(setFilter({language:filter.language,genre:28}))
                      setChangeFilter(true)}
                    }
                  >
                    Action
                  </li>
                  <li 
                    className="cursor-pointer p-2 hover:bg-secondary rounded-lg"
                    onClick={() => {setSelectedGenre("Com")
                      dispatch(setFilter({language:filter.language,genre:35}))
                      setChangeFilter(true)}
                    }
                  >
                    Comedy
                  </li>
                  <li 
                    className="cursor-pointer p-2 hover:bg-secondary rounded-lg"
                    onClick={() => {setSelectedGenre("Dra")
                      dispatch(setFilter({language:filter.language,genre:18}))
                      setChangeFilter(true)}
                    }
                  >
                    Drama
                  </li>
                  <li 
                    className="cursor-pointer p-2 hover:bg-secondary rounded-lg"
                    onClick={() => {setSelectedGenre("Thr")
                      dispatch(setFilter({language:filter.language,genre:53}))
                      setChangeFilter(true)}
                    }
                  >
                    Thriller
                  </li>
                  <li 
                    className="cursor-pointer p-2 hover:bg-secondary rounded-lg"
                    onClick={() => {setSelectedGenre("Hor")
                      dispatch(setFilter({language:filter.language,genre:27}))
                      setChangeFilter(true)}
                    }
                  >
                    Horror
                  </li>
                  <li 
                    className="cursor-pointer p-2 hover:bg-secondary rounded-lg"
                    onClick={() => {setSelectedGenre("Rom")
                      dispatch(setFilter({language:filter.language,genre:10749}))
                      setChangeFilter(true)}
                    }
                  >
                    Romance
                  </li>
                </ul>
              </div>
              )}
            </div>
    </>
  )
}

export default AdminFilterMovies
