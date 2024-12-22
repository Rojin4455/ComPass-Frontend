import React, { useEffect, useState, useRef } from 'react'
import MainLayout from '../../components/User/MainLayout'
import MovieDetails from '../../components/Common/MovieDetails'
import SimilarMovies from '../../components/Common/SimilarMovies';
import { useSelector } from 'react-redux';
import Loading from '../../components/Common/Loading';
import useAxiosInstance from '../../axiosConfig'
import { useLocation } from 'react-router-dom';
import ReviewBase from '../../components/User/Movie/ReviewBase';



function UpcomingMovieDetailsPage() {
    const [loading,setLoading] = useState(false)
    const movieDetailsRef = useRef(null);
    const locationOther = useLocation();



    const location = useSelector((state) => state.location)
      useEffect(() => {
          if (movieDetailsRef.current) {
              movieDetailsRef.current.scrollIntoView({ behavior: 'smooth' });
          }
      }, [locationOther]);

  return (
    <MainLayout>
        <div ref={movieDetailsRef}>
            <MovieDetails page={"user-upcoming"} />
        </div>

        <SimilarMovies movies={location.nowShowing} isLoading={loading}/>
    </MainLayout>
  )
}

export default UpcomingMovieDetailsPage;