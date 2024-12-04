import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosInstance from '../../../axiosBaseConfig';
import useAxiosConfigInstance from '../../../axiosConfig';
import { IoClose } from "react-icons/io5";

import AdminShowTrailers from './AdminShowTrailers';
import ShowCastAndCrew from './ShowCastAndCrew';
import { FaRegPlayCircle } from "react-icons/fa";
import Loading from './Loading';
import { MdTranslate } from 'react-icons/md';
// import { toast } from 'sonner';
import showToast from '../../../utils/ToastNotifier';



function AdminAddMovieDetails() {
    const axiosInstance = useAxiosInstance();
    const AxiosConfigInstance = useAxiosConfigInstance()
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [trailers, setTrailer] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showTrailer, setShowTrailer] = useState(false);
    const [selectedTrailer, setSelectedTrailer] = useState(null);

    const [showAllCast, setShowAllCast] = useState(false);
    const [showAllCrew, setShowAllCrew] = useState(false);
  
    const [castAndCrew, setCastAndCrew] = useState({ cast: [], crew: [] });
    const [releaseDate, setReleaseDate] = useState(null)

    const visibleCast = showAllCast ? castAndCrew.cast : castAndCrew.cast.slice(0, 10);
    const visibleCrew = showAllCrew ? castAndCrew.crew : castAndCrew.crew.slice(0, 10);

    const [isMovieListed, setIsMovieListed] = useState(false);

    console.log("herere")

    useEffect(() => {
        const fetchMovieById = async (movieId) => {
            try {
                const movieResponse = await axiosInstance.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=7cedc204afadbacc97f11b62930feaa3`);
                if (movieResponse.status === 200) {
                    setMovie(movieResponse.data);
                    setReleaseDate(movieResponse.data.release_date? movieResponse.data.release_date : null)
                    
                } else {
                    console.log("Error response", movieResponse);
                }

                // Fetch trailers
                const trailersResponse = await axiosInstance.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=7cedc204afadbacc97f11b62930feaa3`);
                if (trailersResponse.status === 200) {
                    const playableTrailer = trailersResponse.data.results.find(trailer => trailer.site === "YouTube" && trailer.type === "Trailer");
                    if (playableTrailer) {
                        setTrailer(playableTrailer);
                        
                    } else {
                        console.log("No playable trailers found.");
                        setTrailer(null)
                    }

                    
                
                } else {
                    console.log("Error response", trailersResponse);
                }

                const castAndCrewResponse = await axiosInstance.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=7cedc204afadbacc97f11b62930feaa3`);
                if (castAndCrewResponse.status === 200) {
                    setCastAndCrew({ cast: castAndCrewResponse.data.cast, crew: castAndCrewResponse.data.crew });
                    // castAndCrew.filter((cast.) => {

                    // })
                    console.log("cast and crew: ",castAndCrewResponse)
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


    const [isEditingReleaseDate, setIsEditingReleaseDate] = useState(false);
    const [newReleaseDate, setNewReleaseDate] = useState(releaseDate);

    const handleSaveReleaseDate = () => {
      if (newReleaseDate !== releaseDate) {
          // Handle the save logic here, e.g., make an API call to update the release date
          if (newReleaseDate){
            setReleaseDate(newReleaseDate)
          }
      }
      setIsEditingReleaseDate(false);
  };


    // useEffect(() => {
    //   const IsMovieListed = async () => {
    //     try {
    //       const response = await axiosInstance.get(`movie/check-movie/${id}`);
    //       if (response.status === 200) {
    //         setIsMovieListed(false);  // Movie is not listed
    //       } else if (response.status === 202) {
    //         setIsMovieListed(true);   // Movie is listed
    //       }
    //     } catch (error) {
    //       console.error("Something went wrong:", error.message || error);
    //     }
    //   };
    
    //   IsMovieListed();  // Corrected function call
    // }, [movie]);
    

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
        handleToggleMovieUnList();
        }
      };

    const handleToggleMovieUnList = async () => {
      try{
        const response = await AxiosConfigInstance.post('movie/remove-movie/',{
          id:tmdb_id
        })
        if (response.status === 200){
          console.log("movie unlisted successfully",response);
          showToast("success","movie unlisted successfully")
          
        }else{
          console.error("error response", response)
          showToast("error","something went wrong")
        }

      }catch(error){
        console.error("error response in catch",error)
        showToast("error","Something Went Wrong")
      }
    }

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

      const video_key = trailers?.key? trailers.key : null

      const backdroprUrl = `https://image.tmdb.org/t/p/original${backdrop_path}`
      const posterUrl = `https://image.tmdb.org/t/p/w500${poster_path}`
    
      console.log("release date: ",releaseDate)


        try{
            const response = await AxiosConfigInstance.post('movie/add-movie/',{
                title,
                tmdb_id,
                release_date:releaseDate,
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
              showToast("success","Movie Listed Successfully")

            }

        }catch(error){

        if(error.response && error.response.status === 409){
          console.log("movie is already listed",error)
          showToast("error",error.response.data.message)
        }else{
          showToast("error","Something Went Wrong!")

          console.error("error response", error)
        }

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
          {releaseDate} • {original_language.toUpperCase()}
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
                            <li className="relative">
    <strong>Release Date: </strong>
    {!isEditingReleaseDate ? (
        <span
            className="cursor-pointer text-blue-600 hover:underline"
            onClick={() => setIsEditingReleaseDate(true)}
        >
            {releaseDate}
        </span>
    ) : (
        <div className="flex items-center space-x-2">
            <input
                type="date"
                className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-2 focus:gray-700"
                value={newReleaseDate}
                onChange={(e) => setNewReleaseDate(e.target.value)}
            />
            <button
                className="px-3 py-1 bg-primary text-white rounded-md hover:bg-primaryhover"
                onClick={handleSaveReleaseDate}
            >
                Save
            </button>
            <button
                className="px-3 py-1 border border-gray-800 text-gray-800 rounded-md hover:bg-gray-400 hover:text-white hover:border-none"
                onClick={() => {
                    setIsEditingReleaseDate(false);
                }}
            >
                Cancel
            </button>
        </div>
    )}
</li>                            <li><strong>Duration: </strong>{runtime} min</li>
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
            {showTrailer && (
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
