import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { setContent } from '../../../../../slices/userProfileSlice';


// <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
function PersonalDetails() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user)
    return (
        <>
            <div className="flex justify-between items-center mb-4 px-10">
                <h2 className="text-xl font-semibold">Profile Details</h2>
                <button className="bg-primary text-white py-0.5 px-3 rounded-lg hover:bg-primaryhover" onClick={() => dispatch(setContent({ content: 'editProfile' }))}>
                    Edit Profile
                </button>
            </div>

            <hr className="border-t-2 border-gray-300 my-2 w-11/12 mx-auto" />

            <div className="space-y-4 mt-4 px-10">
  {/* Display Name */}
                <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">Name</span>
                    <span className="text-gray-900">
                    {user?.user?.username ? user.user.username : "Name not provided"}
                    </span>
                </div>

                {/* Display Email */}
                <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">Email</span>
                    <span className="text-gray-900">
                    {user?.user?.email || "Email not provided"}
                    </span>
                </div>

                {/* Display Phone */}
                <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">Phone</span>
                    <span className="text-danger">
                    {user?.user?.phone || "Phone Number not provided"}
                    </span>
                </div>
            </div>
            </>
        
    );
}

export default PersonalDetails;
