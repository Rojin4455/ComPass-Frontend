import React,{useState} from 'react'
import { IoHome } from "react-icons/io5";
import { MdLocalMovies } from "react-icons/md";
import { FaCircleUser } from "react-icons/fa6";
import { GiTheater } from "react-icons/gi";
import { IoFastFoodOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useAxiosInstance from '../../../axiosConfig';
import { clearUser } from '../../../slices/userSlice';
import ProfileModal from './ProfileModal';
import { setContent } from '../../../slices/OwnerScreenSlice';

function Header(props) {

  const navigate = useNavigate();
  const {page} = props;
  console.log("page: ",page);
  const email = useSelector((state) => state.user.user)
  console.log("email: ",email)
  
  const [showModal,setShowModal] = useState(false)
  const axiosInstance = useAxiosInstance();
  const dispatch = useDispatch()


  const handleSelect = (option) => {
    // setSelectedOption(option);
    navigate("/"+option)
  };

  const handleProfileClick = () => {
    // Add logic to navigate to profile or open profile menu
    console.log('owner profile clicked');
    
    

  };

  const handleLogout=()=>{
    console.log("logout clicked")
    setShowModal(true)
  }

  const handleLogoutConfirm= async ()=>{
    console.log("owner logounte");
    try{
      const response = await axiosInstance.post("user/logout/")
      
      if(response.status === 200) {
          
          dispatch(clearUser())
          console.log("logout successfully : ",response)
          navigate('/owner/login/')
      }else{
          console.log("something went wrong",response)
      }
  }catch(error){
      console.log("erroe happens: ",error);
      
  }
    
  }

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-50 py-4"> {/* Increased py-2 to py-4 for better height */}
      <nav className="flex relative justify-between items-center  px-4 md:px-8 lg:px-12">
        {/* Left side: Navigation Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleSelect('owner/home')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full ${page === 'owner/home/' ? 'bg-primary text-white' : 'bg-white text-black'}`}
          >
            <IoHome />
            Dashboard
          </button>
          <button
            onClick={() => handleSelect('owner/theaters/')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full ${page === 'owner/theaters/' ? 'bg-primary text-white' : 'bg-white text-black'}`}
          >
            <GiTheater/>
            Theaters
          </button>
          <button
            onClick={() => handleSelect('owner/movies')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full ${page === 'owner/movies/' ? 'bg-primary text-white' : 'bg-white text-black'}`}
          >
            <MdLocalMovies />
            Movies
          </button>
          <button
            onClick={() => {handleSelect('owner/snacks-list/') ; dispatch(setContent({snackContent:'owner'}))}}
            className={`flex items-center gap-2 px-4 py-2 rounded-full ${page === 'owner/snacks-list/' ? 'bg-primary text-white' : 'bg-white text-black'}`}
          >
            <IoFastFoodOutline />
            Snacks
          </button>
        </div>

        {/* Center: Logo */}
        {/* <div className=" flex-col">
            <img
              src="/assets/hi5_logo.jpg"
              alt="Logo"
              className="w-40"
            />
            <div className='flex justify-end'>
            <p className='text-xs text-secondary font-serif'>Owner Side</p>
            </div>
        </div> */}

        {/* Right side: Admin Profile */}
        <div className="relative flex items-center gap-4">


  {/* Dropdown menu */}
  {/* {isDropdownOpen && (
    <div className="absolute mt-1 w-36 bg-white rounded-md shadow-lg right-0">
      <button
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        onClick={handleProfileClick} // This will close the dropdown
      >
        <IoClose size={16} />
      </button>
      <ul className="py-1">
        <li className="px-3 py-1 text-sm hover:bg-gray-100 cursor-pointer">
          Profile
        </li>
        <li
          className="px-3 py-1 text-sm bg-danger text-white hover:bg-red-600 cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </li>
      </ul>
    </div>
  )} */}
</div>
<div className='flex items-center'>
  {/* <button
    onClick={handleLogout}
    className="gap-2 px-3 py-2 bg-danger text-white rounded-full"
  >
    Logout
  </button> */}
{/* <div>
<FaCircleUser size={35} className='text-black cursor-pointer text-primary'  onClick={() => setShowModal(true)}/>
</div> */}
{/* {showModal && ( */}
<ProfileModal email={email} onLogout={handleLogoutConfirm} />
{/* )} */}
</div>




  
      </nav>

      {/* {showModal && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-lg font-bold mb-4">Confirm Logout</h2>
            <p>Are you sure you want to log out?</p>
            <div className="flex justify-end mt-4">
                <button
                    className="bg-gray-300 px-4 py-2 rounded mr-2"
                    onClick={() => setShowModal(false)} // Close modal on "No"
                >
                    No
                </button>
                <button
                    className="bg-primary text-white px-4 py-2 rounded"
                    onClick={handleLogoutConfirm} // Call logout on "Yes"
                >
                    Yes
                </button>
            </div>
        </div>
    </div>
)} */}
    </header>
  );
}

export default Header
