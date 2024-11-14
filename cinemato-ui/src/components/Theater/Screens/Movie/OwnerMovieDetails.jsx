import React,{useState,useEffect} from 'react';
import { FaRegPlayCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
// import AdminShowTrailers from '../../../Admin/AdminAddMovies/AdminShowTrailers';
import { CiCircleMore } from "react-icons/ci";
import { HiMiniArrowLeft } from "react-icons/hi2";
import showToast from '../../../../utils/ToastNotifier';
import useAxiosInstance from '../../../../axiosConfig';
import { useDispatch } from 'react-redux';
import { setContent } from '../../../../slices/OwnerScreenSlice';
import { IoChevronBackOutline } from 'react-icons/io5';
import AddMovieModal from './AddMovieModal';
import CommonShowTrailer from '../../../Common/ShowTrailer';
import useAxiosBaseInstance from '../../../../axiosBaseConfig';

function MovieDetails({movie,setLoadMovieDetails}) {

  const axiosInstance = useAxiosInstance();
  const [showTrailer, setShowTrailer] = useState(false);
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const axionBaseInatance = useAxiosBaseInstance()

  const [showAllCast, setShowAllCast] = useState(false);
  const [showAllCrew, setShowAllCrew] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [isModalOpen, setIsModalOpen] = useState(false);

  const AddMoviehandleOpenModal = () => {
    setIsModalOpen(true);
  };

  const AddMoviehandleCloseModal = () => {
    setIsModalOpen(false);
  };




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

//   const handlePlayClick = (trailer) => {
//     setSelectedTrailer(trailer);

//     setShowTrailer(true);
//   };

  const handleCloseModal = () => {
    setShowTrailer(false);
    setSelectedTrailer(null);
  };

  var cast = roles
    .filter((castitems) => castitems.is_cast === true)
    .slice(0, 4);
  var fullCast = roles.filter((castitems) => castitems.is_cast === true);
  const crew = roles
    .filter((castitems) => castitems.is_cast === false)
    .slice(0, 4);
  const fullCrew = roles.filter((castitems) => castitems.is_cast === false);


      

  const handleToggleMovieUnList = async () => {
    console.log("this is tmdb id", tmdb_id);
    
    try{
      const response = await axiosInstance.post('movie/remove-movie/',{
        id:tmdb_id
      })
      if (response.status === 200){
        console.log("movie unlisted successfully",response);
        showToast("success","movie unlisted successfully")
        navigate('/admin/movies/')
        
      }else{
        console.error("error response", response)
        showToast("error","something went wrong")
      }

    }catch(error){
      console.error("error response in catch",error)
      showToast("error","Something Went Wrong")
    }
  }

  const handlePlayClick = async (movieId) => {
    

    try {
        const trailersResponse = await axionBaseInatance.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=7cedc204afadbacc97f11b62930feaa3`);
        if (trailersResponse.status === 200) {
          const playableTrailer = trailersResponse.data.results.find(trailer => trailer.site === "YouTube" && trailer.type === "Trailer");
          if (playableTrailer) {
            setSelectedTrailer(playableTrailer);
            setShowTrailer(true)
  
          } else {
            
            console.log("No playable trailers found.");
            setSelectedTrailer(null)
            setShowTrailer(true)
  
          } 
  
        } else {
          console.error("Error response", trailersResponse);
        }
  
      } catch (err) {
        console.error("something went wrong in trailer", err);
      }



  };
  
  


  return (
    <div>
        <div className="flex items-center mb-4 gap-0.5 cursor-pointer"
        onClick={() => setLoadMovieDetails(false)}>
        <IoChevronBackOutline
          size={15}
          className="text-gray-700 cursor-pointer hover:text-primary transition"
        //   onClick={() => {setEnableEdit !== null ? setEnableEdit(false) : console.log("not enable edit")}}
        />
        <h1 className="text-sm font-bold text-gray-800">Back</h1>
      </div>
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
              <button
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 text-white flex items-center justify-center gap-1 px-2 py-1 rounded-full cursor-pointer shadow-lg z-10"
                onClick={() => handlePlayClick(tmdb_id)}
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
              
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-8 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <h3 className="text-3xl font-semibold mb-4">Synopsis</h3>
            <p className="text-lg text-gray-700">{description}</p>
          </div>

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

        <div className="mt-12">
          <h3 className="text-3xl font-semibold mb-6">Cast & Crew</h3>
        </div>
      </div>

      <div>
        {showTrailer && (
          <CommonShowTrailer
            showTrailer={showTrailer}
            selectedTrailer={selectedTrailer}
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
      <div className="w-full flex justify-center mt-7">
  <button className="bg-primary text-white py-2 px-4 mt-4 w-2/4 rounded-lg flex items-center justify-center hover:bg-primaryhover transition-transform transform hover:scale-105"
    onClick={AddMoviehandleOpenModal}
    >
    Add Movie
  </button>
</div>
<AddMovieModal isOpen={isModalOpen} onClose={AddMoviehandleCloseModal} movie={movie}/>

    </div>
  );
}

export default MovieDetails;
