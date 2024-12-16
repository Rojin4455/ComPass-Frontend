import React from 'react'
import MainLayout from '../../components/User/MainLayout'
import ListMovie from '../../components/User/AllMovies/ListMovie'
import { useSelector } from 'react-redux'

function ListMoviePage() {
    const location = useSelector((state) => state.location)

  return (
    <MainLayout>
        <ListMovie movies={location.nowShowing}/>
    </MainLayout>
  )
}

export default ListMoviePage