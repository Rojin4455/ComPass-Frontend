import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosInstance from '../../../axiosConfig';
import { IoClose } from "react-icons/io5";

import AdminShowTrailers from './AdminShowTrailers';
import ShowCastAndCrew from './ShowCastAndCrew';
import { FaRegPlayCircle } from "react-icons/fa";
import Loading from './Loading';
import { MdTranslate } from 'react-icons/md';

function AdminAddMovieDetails() {
    const axiosInstance = useAxiosInstance();
    const { id } = useParams();
    const [movie, setMovie] = useState(null); // State to store movie data
    const [trailers, setTrailer] = useState([]); // State to store trailers
    const [loading, setLoading] = useState(true); // State to handle loading
    const [showTrailer, setShowTrailer] = useState(false); // State to control trailer modal visibility
    const [selectedTrailer, setSelectedTrailer] = useState(null); // State to store selected trailer

    const [showAllCast, setShowAllCast] = useState(false);
    const [showAllCrew, setShowAllCrew] = useState(false);
  
    const [castAndCrew, setCastAndCrew] = useState({ cast: [], crew: [] });

    const visibleCast = showAllCast ? castAndCrew.cast : castAndCrew.cast.slice(0, 10);
    const visibleCrew = showAllCrew ? castAndCrew.crew : castAndCrew.crew.slice(0, 10);

    const [isMovieListed, setIsMovieListed] = useState(true);

    useEffect(() => {
        const fetchMovieById = async (movieId) => {
            try {
                const movieResponse = await axiosInstance.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=7cedc204afadbacc97f11b62930feaa3`);
                if (movieResponse.status === 200) {
                    setMovie(movieResponse.data);
                    console.log("movie datas: ",movieResponse.data);
                    
                } else {
                    console.log("Error response", movieResponse);
                }

                // Fetch trailers
                const trailersResponse = await axiosInstance.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=7cedc204afadbacc97f11b62930feaa3`);
                if (trailersResponse.status === 200) {
                    const playableTrailer = trailersResponse.data.results.find(trailer => trailer.site === "YouTube" && trailer.type === "Trailer");
                    if (playableTrailer) {
                        setTrailer(playableTrailer);
                        console.log("trailer: ",playableTrailer);
                        
                    } else {
                        console.log("No playable trailers found.");
                    }

                    
                
                } else {
                    console.log("Error response", trailersResponse);
                }

                const castAndCrewResponse = await axiosInstance.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=7cedc204afadbacc97f11b62930feaa3`);
                if (castAndCrewResponse.status === 200) {
                    setCastAndCrew({ cast: castAndCrewResponse.data.cast, crew: castAndCrewResponse.data.crew });
                    // castAndCrew.filter((cast.) => {

                    // })
                    console.log('cast and crew',castAndCrewResponse.data)
                } else {
                    console.log("Error response", castAndCrewResponse);
                }


            } catch (error) {
                console.error("Error while fetching the data", error);
            } finally {
                setLoading(false);
            }
        }

        fetchMovieById(id);
    }, []);

    // Handle loading state
    if (loading) {
        return <Loading loading={loading}/>;
    }

    // Handle case where movie data might not be available
    if (!movie) {
        return <div>No movie details found.</div>;
    }

    const {
        id: tmdb_id,
        title,
        poster_path,
        backdrop_path,
        release_date,
        genres,
        runtime,
        overview:description,
        original_language,
        vote_average,

    } = movie;

    // Function to handle play button click
    const handlePlayClick = (trailer) => {
        setSelectedTrailer(trailer);

        setShowTrailer(true);
    };

    // Function to handle close button click
    const handleCloseModal = () => {
        setShowTrailer(false);
        setSelectedTrailer(null);
    };

    
    const toggleMovieListing = () => {
        setIsMovieListed(!isMovieListed);
        if (!isMovieListed){
        handleToggleMovieList();
        }else{

        }
      };


    const handleToggleMovieList = async () => {
        console.log("trailer in toggle", trailers);
        console.log("movie in toggle", movie)
        console.log("cast in toggle: ",castAndCrew)
        const genres = movie.genres.map(genre => ({
          tmdb_id: genre.id,
          name: genre.name,
      }));

      const languages = movie.spoken_languages.map(language => ({
        name: language.english_name || language.name,
      }));

      const roles = [
        // Map cast members with profile_path (images)
        ...castAndCrew.cast
            .filter(cast => cast.profile_path)  // Filter to include only cast members with images
            .map(cast => ({
                person: {
                    name: cast.name,
                    image: `https://image.tmdb.org/t/p/w500${cast.profile_path}`,
                },
                role: cast.gender === 2? "Actor" : cast.gender === 1?"Actress":"",
                character_name: cast.character || null,
                is_cast: true
            })),
        
        // Map crew members with profile_path (images)
        ...castAndCrew.crew
            .filter(crew => crew.profile_path)  // Filter to include only crew members with images
            .map(crew => ({
                person: {
                    name: crew.name,
                    image: `https://image.tmdb.org/t/p/w500${crew.profile_path}`,
                },
                role: crew.job || 'Crew',
                character_name: null,  // Crew members typically won't have character names
                is_cast: false
            })),
      ];

      const video_key = selectedTrailer?.key? selectedTrailer.key : null

      const backdroprUrl = `https://image.tmdb.org/t/p/original${backdrop_path}`
      const posterUrl = `https://image.tmdb.org/t/p/w500${poster_path}`
    


        try{
            const response = await axiosInstance.post('movie/add-movie/',{
                title,
                tmdb_id,
                release_date,
                runtime,
                description,
                vote_average,
                poster_path : posterUrl,
                backdrop_path : backdroprUrl,
                video_key,
                is_listed: true,
                genres,
                languages,
                roles,
            })

            if (response.status === 201){
              console.log("Movie Addedd Successfully")
            
            }else{
              console.error("error response", response)
            }
        }catch{
          console.error("something went wrong")

        }

        // try{
        //   const response = await axiosInstance.get('movie/add-movie')

        //   if (response.status === 200){
        //     console.log("success get", response)
        //   }else{
        //     console.error("error")
        //   }

        // }catch{
        //   console.log("error")
        // }
        
    }

    return (
        <div>
            {/* Movie Banner */}
            <div className="relative">
  <img
    src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
    alt={title}
    className="w-full h-96 object-cover rounded-lg shadow-lg"
  />
  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center">
    <div className="container mx-auto px-8 flex flex-col md:flex-row items-center space-y-6 md:space-y-0 relative">
    <div className="relative">
  <img
    src={`https://image.tmdb.org/t/p/w500${poster_path}`}
    alt={title}
    className="w-52 h-auto rounded-lg shadow-lg"
  />
  {/* Play Trailer Button */}
  <button
  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 text-white flex items-center justify-center gap-1 px-2 py-1 rounded-full cursor-pointer shadow-lg z-10"
  onClick={() => handlePlayClick(trailers)}
>
  <FaRegPlayCircle size={20} />
  Trailer
</button>

</div>

      <div className="ml-8 text-white">
        <h2 className="text-4xl font-bold">{title}</h2>
        <p className="mt-2 text-lg">
          {release_date} • {original_language.toUpperCase()}
        </p>
        <p className="mt-2 text-lg">⭐ {vote_average}/10</p>
        <p className="mt-2 text-lg">{runtime} min</p>
        <div className="mt-4 relative">
          {/* Toggle Button for List/Unlist Movie */}
          <button
            onClick={toggleMovieListing}
            className={`relative w-40 h-16 rounded-full px-2 py-1 flex items-center ${
              isMovieListed ? 'bg-secondary' : 'bg-gray-400'
            } transition-all duration-300 ease-in-out`}
          >
            {/* Text based on the toggle state */}
            <span
              className={`absolute text-lg font-semibold text-black transition-all duration-300 ease-in-out ${
                isMovieListed ? 'left-4' : 'right-4'
              }`}
            >
              {isMovieListed ? 'Listed' : 'Unlisted'}
            </span>

            {/* Switch Circle */}
            <span
              className="absolute w-14 h-14 bg-white rounded-full shadow-md transition-all duration-300 ease-in-out"
              style={{
                transform: isMovieListed ? 'translateX(89px)' : 'translateX(0)',
              }}
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</div>


            {/* Movie Details Section */}
            <div className="container mx-auto px-8 mt-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Left Column - Overview */}
                    <div className="md:col-span-2">
                        <h3 className="text-3xl font-semibold mb-4">Synopsis</h3>
                        <p className="text-lg text-gray-700">{description}</p>
                    </div>

                    {/* Right Column - Genres, Release Date, etc. */}
                    <div>
                        <h3 className="text-3xl font-semibold mb-4">Movie Info</h3>
                        <ul className="text-lg text-gray-700 space-y-2">
                            <li><strong>Genres: </strong>{genres.map(genre => genre.name).join(", ")}</li>
                            <li><strong>Release Date: </strong>{release_date}</li>
                            <li><strong>Duration: </strong>{runtime} min</li>
                            <li><strong>Language: </strong>{original_language.toUpperCase()}</li>
                        </ul>
                    </div>
                </div>

                {/* Cast and Crew Section */}
                <div className="mt-12">
                    <h3 className="text-3xl font-semibold mb-6">Cast & Crew</h3>

                </div>
            </div>

            {/* Trailer Modal */}
            <div>
            {showTrailer && selectedTrailer && (
                                <AdminShowTrailers showTrailer={showTrailer} selectedTrailer={selectedTrailer} handleCloseModal={handleCloseModal} />
            )}
            </div>
            <div>
            <ShowCastAndCrew {...{castAndCrew}}/>
            </div>



        </div>
    );
}

export default AdminAddMovieDetails;
