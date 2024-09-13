import React,{useState} from 'react'
import 'tailwindcss/tailwind.css';
import { IoHome,IoClose } from "react-icons/io5";
import { MdLocalMovies } from "react-icons/md";
import { MdPerson, MdLocationPin } from "react-icons/md";
import { FaTheaterMasks } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

function Header(props) {
  // const [selectedOption, setSelectedOption] = useState('Home');
  const navigate = useNavigate();
  const {page} = props;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  
  const handleSelect = (option) => {
    // setSelectedOption(option);
    navigate("/"+option)
  };

  const handleProfileClick = () => {
    // Add logic to navigate to profile or open profile menu
    console.log('Admin profile clicked');
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown

  };

  const handleLogout=()=>{
    console.log("logout clicked")
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
  <button
    onClick={handleProfileClick}
    className="flex items-center gap-2 px-3 py-2 bg-third text-black rounded-full"
  >
    <MdPerson />
    Admin
    <IoIosArrowDown />
  </button>

  {/* Dropdown menu */}
  {isDropdownOpen && (
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
  )}
</div>


  
      </nav>
    </header>
  );
}

export default Header;

