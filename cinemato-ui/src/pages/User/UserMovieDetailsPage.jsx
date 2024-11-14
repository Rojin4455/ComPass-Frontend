import React, { useEffect, useState, useRef } from 'react'
import MainLayout from '../../components/User/MainLayout'
import MovieDetails from '../../components/Common/MovieDetails'
import SimilarMovies from '../../components/Common/SimilarMovies';
import { useSelector } from 'react-redux';
import Loading from '../../components/Common/Loading';
import useAxiosInstance from '../../axiosConfig'
import { useLocation } from 'react-router-dom'; // Import useLocation



function UserMovieDetailsPage() {
    const [loading,setLoading] = useState(false)
    const [nowShowing,setNowShowing] = useState([])
    const axiosInstance = useAxiosInstance()
    const movieDetailsRef = useRef(null);
    const locationOther = useLocation();



    const location = useSelector((state) => state.location)
    // useEffect(() => {
    //     const fetchMovies = async () => {
    //       setLoading(true)
    //       try{
    //         const response = await axiosInstance.post(`movie/location-movies/`,{
    //           lat:location.lat,
    //           lng:location.lng
    //         })
    //         if (response.status === 200){
    //           setNowShowing(response.data.now_showing)
              
    //         }
    //       }catch(err){
    //           console.log("error: in directing banner",err)
    //       }
    //       setLoading(false)
    //     }
        
    //     fetchMovies()
        
    //   },[])



      useEffect(() => {
          // Scroll to the MovieDetails component when the page loads
          if (movieDetailsRef.current) {
              movieDetailsRef.current.scrollIntoView({ behavior: 'smooth' });
          }
      }, [locationOther]);

  return (
    <MainLayout>
        <div ref={movieDetailsRef}>
            <MovieDetails />
        </div>
        <SimilarMovies movies={location.nowShowing} isLoading={loading}/>
    </MainLayout>
  )
}

export default UserMovieDetailsPage