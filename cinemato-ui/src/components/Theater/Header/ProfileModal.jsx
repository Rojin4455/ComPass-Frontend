import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { FaCircleUser } from "react-icons/fa6";

const ProfileModal = ({ email, onLogout }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleProfileClick = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <div>
      <FaCircleUser
        size={35}
        className="text-primary cursor-pointer hover:primaryhover transition duration-300"
        onClick={handleProfileClick}
      />

      {isModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-white rounded-xl shadow-lg p-6 w-80 relative transform transition-transform duration-300 scale-95 hover:scale-100">
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition duration-200"
            >
              <FaTimes size={20} />
            </button>

            <div className="flex flex-col items-center">
              <FaCircleUser size={60} className="text-primary mb-3" />
              <p className="text-lg font-semibold text-gray-800 mb-2">{email}</p>

              <div className="w-full border-t border-gray-300 my-3"></div>

              <button
                onClick={onLogout}
                className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 focus:ring-2 focus:ring-red-300 focus:outline-none transition duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileModal;
