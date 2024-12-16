import React,{useState} from 'react'
import 'tailwindcss/tailwind.css';
import { IoHome,IoClose } from "react-icons/io5";
import { MdLocalMovies } from "react-icons/md";
import { MdPerson, MdLocationPin } from "react-icons/md";
import { FaTheaterMasks } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../../../slices/userSlice';
import useAxiosInstance from '../../../axiosConfig';
import ProfileModal from '../../Theater/Header/ProfileModal';

function Header(props) {
  // const [selectedOption, setSelectedOption] = useState('Home');
  const email = useSelector((state) => state.user.user)
  const navigate = useNavigate();
  const {page} = props;
  const [showModal,setShowModal] = useState(false)
  const axiosInstance = useAxiosInstance();
  const dispatch = useDispatch()


  
  const handleSelect = (option) => {
    // setSelectedOption(option);
    navigate("/"+option)
  };

  const handleProfileClick = () => {
    // Add logic to navigate to profile or open profile menu
    console.log('Admin profile clicked');
    
    

  };

  const handleLogout=()=>{
    console.log("logout clicked")
    setShowModal(true)
  }

  const handleLogoutConfirm= async ()=>{
    console.log("user logounte");
    try{
      const response = await axiosInstance.post("user/logout/")
      
      if(response.status === 200) {
          
          dispatch(clearUser())
          console.log("logout successfully : ",response)
          navigate('/admin/')
      }else{
          console.log("something went wrong",response)
      }
  }catch(error){
      console.log("erroe happens: ",error);
      
  }
    
  }

  return (
    <header className="fixed top-0 left-0 w-full bg-primary shadow-md z-50 py-4"> {/* Increased py-2 to py-4 for better height */}
      <nav className="flex relative justify-between items-center  px-4 md:px-8 lg:px-12">
        {/* Left side: Navigation Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleSelect('admin/home')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full ${page === 'admin/home/' ? 'bg-secondary text-black' : 'bg-primary text-white'}`}
          >
            <IoHome />
            Home
          </button>
          <button
            onClick={() => handleSelect('admin/users')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full ${page === 'admin/users/' ? 'bg-secondary text-black' : 'bg-primary text-white'}`}
          >
            <MdPerson />
            Users
          </button>
          <button
            onClick={() => handleSelect('admin/movies')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full ${page === 'admin/movies/' ? 'bg-secondary text-black' : 'bg-primary text-white'}`}
          >
            <MdLocalMovies />
            Movies
          </button>
          <button
            onClick={() => handleSelect('admin/theaters')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full ${page === 'admin/theaters/' ? 'bg-secondary text-black' : 'bg-primary text-white'}`}
          >
            <FaTheaterMasks />
            Theaters
          </button>
        </div>

        {/* Center: Logo */}
        <div className="flex-grow flex justify-center items-center">
            <img
              src="../../assets/logo-adminside.png"
              alt="Logo"
              className="w-40"
            />
          </div>

        {/* Right side: Admin Profile */}
        <div className="relative flex items-center gap-4">
  {/* <button
    onClick={handleLogout}
    className="flex items-center gap-2 px-3 py-2 bg-danger text-white rounded-full"
  >
    Logout
  </button> */}



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
{/* <div className='ml-8'>
<MdPerson size={35} className='text-white' onClick={handleProfileClick}/>
</div> */}
<ProfileModal email={email} onLogout={handleLogoutConfirm} page="admin"/>



  
      </nav>

      {showModal && (
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
)}
    </header>
  );
}

export default Header;

