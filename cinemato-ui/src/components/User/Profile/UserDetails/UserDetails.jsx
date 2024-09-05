// UserDetails.js
import React from 'react';
import { useSelector } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';


function UserDetails() {
    const user = useSelector(state => state.user);

    return (
        <div className="flex items-center p-4 bg-white shadow-md py-5 pl-24">
            <div className="mr-4">
                {user.profilePhoto ? (
                    <img 
                        src={user.profilePhoto} 
                        alt="Profile" 
                        className="w-16 h-16 rounded-full object-cover"
                    />
                ) : (
                    <FaUserCircle size={75} className="bg-white text-secondary" />
                )}
            </div>
            <div>
                <h2 className="text-xl font-semibold">{user.username}</h2>
                {user.user && user.user.email ? (<p> {user.user.email}</p>):<p>Email not provided</p>}
                {user.user && user.user.phone ? (<p> {user.user.phone}</p>):<p>Phone not provided</p>}
            </div>
        </div>
    );
}

export default UserDetails;
