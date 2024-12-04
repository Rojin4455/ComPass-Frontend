import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useAxiosInstance from '../../../../../axiosConfig';
import { setUser } from '../../../../../slices/userSlice';
import { setContent } from '../../../../../slices/userProfileSlice';

function ProfileEdit() {
    const user = useSelector((state) => state.user); // Assuming this is the current user state
    const dispatch = useDispatch();
    const axiosInstance = useAxiosInstance();

    // State for holding user input values and error message
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });
    const [error, setError] = useState('');

    // Populate formData with user values when the component mounts
    useEffect(() => {
        setFormData({
            name: user.user.username || '',
            email: user.user.email || '',
            phone: user.user.phone || '',
        });
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        let formattedValue = name === 'phone' ? value.replace(/[^0-9]/g, '') : value;

        if (name === 'phone' && formattedValue.length > 10) {
            setError('Phone number must be exactly 10 digits.');
            formattedValue = formattedValue.slice(0, 10);
        } else {
            setError('');
        }

        setFormData({
            ...formData,
            [name]: formattedValue,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate phone number length
        if (formData.phone & formData.phone.length !== 10) {
            setError('Phone number must be exactly 10 digits.');
            return;
        }
        try{
            const response = await axiosInstance.post('user/edit-profile/',{
                "first_name":formData.name,
                "phone":formData.phone,
                "email":formData.email
            })

            if (response.status === 200){
                const updatedData = response.data.updatedData
                console.log("updated data",updatedData,response)
                dispatch(setUser({user:updatedData}))
                dispatch(setContent({content:"personalDetails"}))
            }else{
                console.log("user Profile edit failed", response)
            }
        }catch(error){
            console.log("catched error in user edit profile", error)
        }

        

        
    };

    return (
        <>
            <div className="flex justify-between items-center mb-4 px-6">
                <h2 className="text-xl font-semibold">Edit Profile</h2>
            </div>

            <hr className="border-t-2 border-gray-300 my-2 w-11/12 mx-auto" />

            <form onSubmit={handleSubmit} className="space-y-4 mt-4 px-6">
                {/* Name Input */}
                <div className="flex flex-col">
                    <label htmlFor="name" className="text-gray-600 font-medium mb-1">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}  // Updated to use formData
                        onChange={handleChange}
                        className="p-2 border rounded-lg w-full focus:border-primary focus:outline-none focus:ring-0.5 focus:ring-primary"
                    />
                </div>

                {/* Email Input */}
                {formData.email? (
                <div className="flex flex-col">
                    <label htmlFor="email" className="text-gray-600 font-medium mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}  // Updated to use formData
                        disabled
                        className="p-2 border rounded-lg w-full bg-gray-100 cursor-not-allowed focus:border-primary focus:outline-none focus:ring-0.5 focus:ring-primary"
                    />
                </div>
                ) : (
                    <div className="flex flex-col">
                    <label htmlFor="email" className="text-gray-600 font-medium mb-1">
                        Email
                    </label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="p-2 border rounded-lg w-full focus:border-primary focus:outline-none focus:ring-0.5 focus:ring-primary"
                    />
                </div>
                )}

                {/* Phone Input */}
                <div className="flex flex-col">
                    <label htmlFor="phone" className="text-gray-600 font-medium mb-1">
                        Phone
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}  // Updated to use formData
                        onChange={handleChange}
                        placeholder="Add Number"
                        pattern="\d{10}"  // Allows exactly 10 digits
                        title="Phone number must be 10 digits"
                        className="p-2 border rounded-lg w-full focus:border-primary focus:outline-none focus:ring-0.5 focus:ring-primary placeholder-gray-400"
                    />
                    {error && <p className="text-red-500 mt-1">{error}</p>}
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                    <button
                        type="button"
                        className="bg-primaryhover text-white py-1 px-4 rounded-lg hover:bg-primaryhover"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-primary text-white py-1 px-4 rounded-lg hover:bg-primaryhover ml-4"
                    >
                        Save
                    </button>
                </div>
            </form>
        </>
    );
}

export default ProfileEdit;
