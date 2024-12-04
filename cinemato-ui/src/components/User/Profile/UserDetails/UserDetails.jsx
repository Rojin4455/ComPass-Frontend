import React,{useRef} from 'react';
import { useSelector } from 'react-redux';
import { FaUserCircle, FaCamera } from 'react-icons/fa';
import useAxiosInstance from '../../../../axiosConfig';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../../slices/userSlice';

function UserDetails() {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const axiosInstance = useAxiosInstance();
    const BASE_URL = process.env.REACT_APP_BASE_API_URL;
    const fileInputRef = useRef(null);



    const handleProfileChange = () => {
        // Open the file picker when profile image is clicked
        fileInputRef.current.click();
    };

    const handleImageUpload = async (event) => {

        console.log("here")
        const file = event.target.files[0];
        if (!file) return;
    
        // Prepare the form data to send the image to the backend
        const formData = new FormData();
        formData.append('profile_pic', file); // Adjust the field name according to your backend's expectation

        try {
            const response = await axiosInstance.put('/user/update-profile/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response)
            // Assuming the updated profile photo URL comes back in response.data.profilePhoto
            if (response.data.profilePhoto) {
                // Update the Redux state with the new profile photo
                dispatch(setUser({
                    ...user,
                    profilePhoto: response.data.profilePhoto,
                }));
            }
        } catch (error) {
            console.error('Error updating profile picture:', error);
        }
    };
    return (
        <div className="flex items-center p-4 bg-white py-5 pl-24">
            <div className="relative mr-4" onClick={handleProfileChange}>
                {user?.profilePhoto ? (
                    <div className="relative w-16 h-16">
                        <img
                            src={`${user.profilePhoto}`}  // Full URL to the image
                            alt="Profile"
                            className="w-16 h-16 rounded-full object-cover"
                        />
                        {/* Overlay with camera icon */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 rounded-full transition-opacity">
                            <FaCamera className="text-secondary text-1xl" />
                        </div>
                    </div>
                ) : (
                    <FaUserCircle size={75} className="bg-white text-secondary cursor-pointer" />
                )}
            </div>
            <div>
                <h2 className="text-xl font-semibold">{user.username}</h2>
                {user.user && user.user.email ? (<p>{user.user.email}</p>) : (<p>Email not provided</p>)}
                {user.user && user.user.phone ? (<p>{user.user.phone}</p>) : (<p>Phone not provided</p>)}
            </div>


            

            {/* Hidden file input for uploading the image */}
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleImageUpload}
            />
        </div>
    );
}

export default UserDetails;