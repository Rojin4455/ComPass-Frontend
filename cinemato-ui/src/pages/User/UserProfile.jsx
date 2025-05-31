import React, { useEffect } from 'react'
import Sidebar from '../../components/User/Profile/Sidebar/Sidebar'
import UserDetails from '../../components/User/Profile/UserDetails/UserDetails'
import MainLayout from '../../components/User/MainLayout'
import { useSelector } from 'react-redux'
import MovieAlerts from '../../components/User/Profile/SidebarDetails/MovieAlerts/MovieAlerts'
import PersonalDetails from '../../components/User/Profile/SidebarDetails/ProfileDetails/ProfileDetails'
import Logout from '../../components/User/Profile/SidebarDetails/Logout/Logout'
import ProfileEdit from '../../components/User/Profile/SidebarDetails/ProfileDetails/EditProfile'
import { useDispatch } from 'react-redux'
import useAxiosInstance from '../../axiosConfig'
import { setUser } from '../../slices/userSlice'
import MyBookings from '../../components/User/Profile/SidebarDetails/Bookings/MyBookings'
import Hi5Subscription from '../../components/User/Profile/SidebarDetails/ProfileDetails/Hi5Subscription'


function UserProfile() {
  const profileContent = useSelector((state) => state.userprofile.content)
  const axiosInstance = useAxiosInstance();
  const dispatch = useDispatch();
  
  const user = useSelector((state) => state.user)
  useEffect(() => {

    const userProfile = async () => {
    try {
      const response =await axiosInstance.get('user-profile/')
      if (response.status === 200){
        if (response.data.user_details.profile){
          dispatch(setUser({...user,profilePhoto:response.data.user_details.profile}))
        }
      }else{
        console.error("error response: ",response)
      }
    }catch(error){
      console.log("something went wrong", error)
    }
  }

  userProfile();
  },[])
  
  const renderProfileContent = () => {
    switch (profileContent) {
      case "movieAlerts":
        return <MovieAlerts />;
      case "personalDetails":
        return <PersonalDetails />;
      case "logout":
        return <Logout />;
      case "editProfile":
          return <ProfileEdit />;
      case "myBookings":
          return <MyBookings />;
      case "hi5pass":
            return <Hi5Subscription />;
      default:
        return <div>Select an option from the sidebar</div>;
    }
  }

  return (
    <div className='bg-gray-100 w-full h-full'>
      <MainLayout>
        <UserDetails />
        <div className='flex mt-8'>
          <Sidebar />
          <div className="w-8/12 p-4 bg-white rounded-lg">
            {renderProfileContent()}
          </div>
        </div>
      </MainLayout>
    </div>
  )
}

export default UserProfile;
