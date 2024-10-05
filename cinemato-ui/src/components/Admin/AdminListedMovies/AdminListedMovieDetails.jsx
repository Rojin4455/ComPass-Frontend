import React, { useEffect, useState } from "react";
import { FaRegPlayCircle } from "react-icons/fa";
import AdminShowTrailers from "../AdminAddMovies/AdminShowTrailers";
import Loading from "../AdminAddMovies/Loading";

import { CiCircleMore } from "react-icons/ci";
import { HiMiniArrowLeft } from "react-icons/hi2";

import { useNavigate, useParams } from "react-router-dom";
import useAxiosConfigInstance from "../../../axiosConfig";

import { toast } from "sonner";
import { useLocation } from "react-router-dom";




function AdminListedMovieDetails() {
  const [loading, setLoading] = useState(false);

  const axiosInstance = useAxiosConfigInstance();
  const [showTrailer, setShowTrailer] = useState(false); // State to control trailer modal visibility
  const [selectedTrailer, setSelectedTrailer] = useState(null); // State to store selected trailer

  const [showAllCast, setShowAllCast] = useState(false);
  const [showAllCrew, setShowAllCrew] = useState(false);
  const navigate = useNavigate();



  const [isMovieListed, setIsMovieListed] = useState(true);
  const location = useLocation();
  console.log("movie details captured", location.state);

  const movie = location.state.movie;

  if (loading) {
    return <Loading loading={loading} />;
  }


  const {
    tmdb_id,
    title,
    poster_path,
    backdrop_path,
    release_date,
    genres,
    runtime,
    description,
    vote_average,
    roles,
    video_key,
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

 

  console.log("cast and crew: ", roles);
  console.log("Type of castAndCrew:", typeof roles);

  var cast = roles
    .filter((castitems) => castitems.is_cast === true)
    .slice(0, 4);
  var fullCast = roles.filter((castitems) => castitems.is_cast === true);
  const crew = roles
    .filter((castitems) => castitems.is_cast === false)
    .slice(0, 4);
  const fullCrew = roles.filter((castitems) => castitems.is_cast === false);


      
  const toggleMovieListing = () => {
    setIsMovieListed(!isMovieListed);
    if (isMovieListed){
    handleToggleMovieUnList();
    } 
  };

  const handleToggleMovieUnList = async () => {
    console.log("this is tmdb id", tmdb_id);
    
    try{
      const response = await axiosInstance.post('movie/remove-movie/',{
        id:tmdb_id
      })
      if (response.status === 200){
        console.log("movie unlisted successfully",response);
        toast.success("movie unlisted successfully")
        navigate('/admin/movies/')
        
      }else{
        console.error("error response", response)
        toast.error("something went wrong")
      }

    }catch(error){
      console.error("error response in catch",error)
      toast.error("Something Went Wrong")
    }
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
                onClick={() => handlePlayClick(video_key)}
              >
                <FaRegPlayCircle size={20} />
                Trailer
              </button>
            </div>

            <div className="ml-8 text-white">
              <h2 className="text-4xl font-bold">{title}</h2>
              <p className="mt-2 text-lg">{release_date}</p>
              <p className="mt-2 text-lg">
                ⭐ {isNaN(vote_average) ? 0 : vote_average}/10
              </p>
              <p className="mt-2 text-lg">{runtime} min</p>
              <div className="mt-4 relative">
                {/* Toggle Button for List/Unlist Movie */}
                <button
                  onClick={toggleMovieListing}
                  className={`relative w-40 h-16 rounded-full px-2 py-1 flex items-center ${
                    isMovieListed ? "bg-secondary" : "bg-gray-400"
                  } transition-all duration-300 ease-in-out`}
                >
                  {/* Text based on the toggle state */}
                  <span
                    className={`absolute text-lg font-semibold text-black transition-all duration-300 ease-in-out ${
                      isMovieListed ? "left-4" : "right-4"
                    }`}
                  >
                    {isMovieListed ? "Listed" : "Unlisted"}
                  </span>

                  {/* Switch Circle */}
                  <span
                    className="absolute w-14 h-14 bg-white rounded-full shadow-md transition-all duration-300 ease-in-out"
                    style={{
                      transform: isMovieListed
                        ? "translateX(89px)"
                        : "translateX(0)",
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
              <li>
                <strong>Genres: </strong>
                {genres.map((genre) => genre.name).join(", ")}
              </li>
              <li>
                <strong>Release Date: </strong>
                {release_date}
              </li>
              <li>
                <strong>Duration: </strong>
                {isNaN(runtime) ? "N/A" : runtime} min
              </li>
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
          <AdminShowTrailers
            showTrailer={showTrailer}
            selectedTrailer={{"key":selectedTrailer}}
            handleCloseModal={handleCloseModal}
          />
        )}
      </div>
      <div>
        <div className="px-16">
          <h2 className="text-lg font-bold">Cast</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-6">
            {showAllCast
              ? fullCast
                  .filter((member) => member.person.image)
                  .map((member, index) => (
                    <div key={member.id || index} className="text-center">
                      {/* Use only index */}
                      <img
                        src={`https://image.tmdb.org/t/p/w500${member.person.image}`}
                        alt={member.name}
                        className="w-full h-auto rounded-lg"
                      />
                      <p className="mt-2 text-sm font-semibold">
                        {member.character_name}
                      </p>
                      <p className="text-sm text-gray-500">{member.role}</p>
                    </div>
                  ))
              : cast
                  .filter((member) => member.person.image)
                  .map((member, index) => (
                    <div key={member.id || index} className="text-center">
                      {" "}
                      {/* Use only index */}
                      <img
                        src={`https://image.tmdb.org/t/p/w500${member.person.image}`}
                        alt={member.name}
                        className="w-full h-auto rounded-lg"
                      />
                      <p className="mt-2 text-sm font-semibold">
                        {member.character_name}
                      </p>
                      <p className="text-sm text-gray-500">{member.role}</p>
                    </div>
                  ))}

            {fullCast.length > 18 && !showAllCast && (
              <div className="mt-20">
                <CiCircleMore
                  onClick={() => setShowAllCast(true)}
                  className=""
                  size={30}
                />
              </div>
            )}
            {showAllCast && (
              <div className="mt-20">
                <HiMiniArrowLeft
                  onClick={() => setShowAllCast(false)}
                  className=""
                  size={30}
                />
              </div>
            )}
          </div>

          <h2 className="mt-8 text-lg font-bold">Crew</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-12 gap-6">
            {showAllCrew
              ? fullCrew
                  .filter((member) => member.person.image)
                  .map((member, index) => (
                    <div key={member.id || index} className="text-center">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${member.person.image}`}
                        alt={member.name}
                        className="w-full h-auto rounded-lg"
                      />
                      <p className="mt-2 text-sm font-semibold">
                        {member.character_name}
                      </p>
                      <p className="text-sm text-gray-500">{member.role}</p>
                    </div>
                  ))
              : crew
                  .filter((member) => member.person.image)
                  .map((member, index) => (
                    <div key={member.id || index} className="text-center">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${member.person.image}`}
                        alt={member.name}
                        className="w-full h-auto rounded-lg"
                      />
                      <p className="mt-2 text-sm font-semibold">
                        {member.character_name}
                      </p>
                      <p className="text-sm text-gray-500">{member.role}</p>
                    </div>
                  ))}

            {fullCrew.length > 18 && !showAllCrew && (
              <div className="mt-14">
                <CiCircleMore
                  onClick={() => setShowAllCrew(true)}
                  className=""
                  size={30}
                />
              </div>
            )}
            {showAllCrew && (
              <div className="mt-14">
                <HiMiniArrowLeft
                  onClick={() => setShowAllCrew(false)}
                  className=""
                  size={30}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminListedMovieDetails;
