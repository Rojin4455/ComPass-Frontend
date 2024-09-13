import React,{useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoPerson, IoNotifications, IoLogOut } from "react-icons/io5";
import { setContent } from '../../../../slices/userProfileSlice';

function Sidebar() {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false); // Manage modal visibility

    const selectedContent = useSelector((state) => state.userprofile.content); // Get the current selected content from Redux

    const getClassNames = (content) => {
        // Apply background color based on the selected content
        return `flex items-center p-2 text-black rounded-lg ${
            selectedContent === content ? 'bg-[#fff0d6]' : ''
        }`;
    };

    const handleLogoutConfirm = () => {
        dispatch(setContent({ content: 'logout' }));
        setShowModal(false); // Close the modal after dispatching
    };

    return (
        <>
        <div className="w-1/4 p-4 bg-white h-full mx-10 rounded-lg">
            <ul className="space-y-4">
                <li>
                    <div
                        className={getClassNames('personalDetails')}
                        onClick={() => dispatch(setContent({ content: 'personalDetails' }))}
                    >
                        <IoPerson className="mr-2" />
                        Personal Details
                    </div>
                </li>
                <li>
                    <div
                        className={getClassNames('movieAlerts')}
                        onClick={() => dispatch(setContent({ content: 'movieAlerts' }))}
                    >
                        <IoNotifications className="mr-2" />
                        Movie Alerts
                    </div>
                </li>
                <li>
                    <div
                        className={getClassNames('logout')}
                        onClick={() => setShowModal(true)}
                    >
                        <IoLogOut className="mr-2" />
                        Logout
                    </div>
                </li>
            </ul>
        </div>

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
</>
    );
}

export default Sidebar;
