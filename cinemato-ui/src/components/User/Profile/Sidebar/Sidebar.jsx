// Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoPerson, IoNotifications, IoLogOut } from "react-icons/io5";

function Sidebar() {
    return (
        <div className="w-1/4 p-4 bg-gray-100 h-full">
            <ul className="space-y-4">
                <li>
                    <NavLink 
                        to="/profile/personal-details"
                        className="flex items-center p-2 text-black rounded-lg hover:bg-gray-200"
                    >
                        <IoPerson className="mr-2" />
                        Personal Details
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/profile/movie-alerts"
                        className="flex items-center p-2 text-black rounded-lg hover:bg-gray-200"
                    >
                        <IoNotifications className="mr-2" />
                        Movie Alerts
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/profile/logout"
                        className="flex items-center p-2 text-black rounded-lg hover:bg-gray-200"
                    >
                        <IoLogOut className="mr-2" />
                        Logout
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
