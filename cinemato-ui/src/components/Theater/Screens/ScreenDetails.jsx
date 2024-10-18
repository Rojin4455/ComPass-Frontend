import React, { useEffect, useState } from 'react';
import { FaChair, FaClock, FaImages } from 'react-icons/fa';
import { FaVideo } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosInstance from '../../../axiosConfig';
import Loading from '../../Admin/AdminAddMovies/Loading';
import { FaIndianRupeeSign } from "react-icons/fa6";
import { IoIosArrowRoundBack } from 'react-icons/io';
import { IoChevronBackOutline } from "react-icons/io5";
import AddSeatLayout from './AddSeatLayout';
import { useDispatch, useSelector } from 'react-redux';
import { setContent } from '../../../slices/OwnerScreenSlice';


const ScreenDetails = () => {
    // const { screenName, tiers, screenType, images } = screen;
    // const [activeTab, setActiveTab] = useState('details');
    const [loading, setLoading] = useState(true)
    const { id } = useParams();
    const [screen, setScreen] = useState({})
    const navigate = useNavigate()
    const [theaterId, setTheaterId] = useState();
    const [createComponent, setCreateComponent] = useState("")
    const {content,subContent} = useSelector((state) => state.ownerscreen)
    console.log("this is the content: ",content,subContent)
    const dispatch = useDispatch()

    const axiosInstance = useAxiosInstance()
    useEffect(() => {
        const fetchTheaterDetails = async (id) => {
            setLoading(true)
            try {
                const response = await axiosInstance.get(`theater/screen-details/${id}`)
                if (response.status === 200) {
                    console.log("response got: ", response)
                    setScreen(response.data.data)
                    setTheaterId(response.data.theater_id)
                } else {
                    console.error("error response: ", response)
                }
            } catch (error) {
                console.error("something went wrong: ", error)
            }
            setLoading(false)
        }
        fetchTheaterDetails(id)
    }, [])

    console.log("screen info: ", screen)

    return (
        <div className="screen-details-container bg-white p-10 rounded-lg shadow-xl max-w-6xl mx-auto mt-[2rem]">

            {loading ? (<Loading loading={loading} />) : (
                <>
                    <div className="flex items-center mb-4 gap-1 cursor-pointer"
                        onClick={() => navigate(`/owner/theater-details/${theaterId}/`)}>
                        <IoChevronBackOutline
                            size={20}
                            className="text-gray-700 cursor-pointer hover:text-primary transition"

                        />
                        <h1 className="text-lg font-bold text-gray-800">Back</h1>
                    </div>

                    {/* Header Section */}
                    <div className="header-section relative mb-8 p-6 bg-white border border-gray-200 rounded-lg shadow-lg">

                        {/* <div className="flex items-center mb-4 z-20">
        <IoIosArrowRoundBack
          size={50}
          className="text-gray-700 cursor-pointer"
          onClick={() => navigate('/admin/theaters/')}
        />
        <h1 className="text-2xl font-bold text-gray-800 ml-4">Owner Details</h1>
      </div> */}



                        {/* Background Image */}
                        {/* <div className="header-section relative mb-8 p-6 bg-primary rounded-lg shadow-lg"> */}
                        {/* Background Image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center bg-primary rounded-lg"
                        // style={{ backgroundImage: 'url("https://st.depositphotos.com/19430566/55010/v/450/depositphotos_550103678-stock-illustration-abstract-dark-white-art-stripe.jpg")' }}
                        ></div>

                        {/* Content */}
                        <div className="relative z-10 text-[#fdf8e1]">
                            <h2 className="text-2xl font-bold mb-3">{screen.name}</h2>

                            <div className="inline-flex items-center px-4 py-2 bg-[#fdf8e1] rounded-full">
                                <FaVideo className="text-secondary mr-2" />
                                <p className="text-md font-semibold text-primary">
                                    Screen Type: <strong>{screen.type}</strong>
                                </p>
                            </div>
                        </div>
                    </div>


                    {/* Optional Divider */}
                    {/* <hr className="my-4 border-t border-gray-300" /> */}

                    {/* Additional Info */}
                    {/* <p className="text-lg text-gray-600 mb-2">Manage screen layouts and show timings here</p> */}
                    {/* </div> */}



                    {/* Tab Navigation */}
                    <div className="tab-navigation mb-6">
                        <ul className="flex justify-start space-x-6 border-b pb-2">
                            <li
                                className={`cursor-pointer ${content === 'details' ? 'border-secondary text-primary' : 'text-gray-500'} border-b-2 pb-2`}
                                onClick={() => dispatch(setContent({content:'details'}))}
                            >
                                Details
                            </li>
                            <li
                                className={`cursor-pointer ${content === 'seat-layout' ? 'border-secondary text-primary' : 'text-gray-500'} border-b-2 pb-2`}
                                onClick={() => dispatch(setContent({content:'seat-layout'}))}
                            >
                                Seat Layout
                            </li>
                            <li
                                className={`cursor-pointer ${content === 'screen-timings' ? 'border-secondary text-primary' : 'text-gray-500'} border-b-2 pb-2`}
                                onClick={() => dispatch(setContent({content:'screen-timings'}))}
                            >
                                Screen Timings
                            </li>
                        </ul>
                    </div>

                    {/* Tab Content */}
                    <div className="tab-content">
                        {content === 'details' && (
                            <div className="details-section">
                                {/* Tiers Information */}
                                <div className="tiers-info grid grid-cols-2 gap-4">
                                    {screen.tiers.map((tier, index) => (
                                        <div
                                            key={index}
                                            className="tier-card bg-gray-100 p-5 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 hover:bg-white border border-gray-300"
                                        >
                                            <h4 className="text-xl font-bold text-gray-800 mb-3 flex items-center justify-between">
                                                {tier.name}
                                                <span className="ml-2 bg-[#fdf8e1] text-primary text-xs px-3 py-1 rounded-full">
                                                    {tier.total_seats} seats
                                                </span>
                                            </h4>

                                            <div className="text-md">
                                                <div className="mb-2 flex items-center text-gray-700">
                                                    <span className="font-semibold mr-2">Price:</span>
                                                    <div className='flex items-center gap-0.5'>
                                                        <FaIndianRupeeSign size={13} className='text-secondary' />
                                                        <span className="font-bold text-gray-500">{tier.price}</span>
                                                    </div>
                                                </div>
                                                <p className="text-gray-600 text-sm">{tier.total_seats} seats available</p>
                                            </div>
                                        </div>


                                    ))}
                                </div>

                                {/* Screen Images */}
                                <div className="screen-images mt-6">
                                    <h3 className="text-2xl font-semibold mb-4">Screen Images</h3>
                                    <div className="image-grid grid grid-cols-3 gap-4">
                                        {screen.screen_images.map((image, index) => (
                                            <div
                                                key={index}
                                                className="image-wrapper overflow-hidden rounded-lg shadow-md hover:shadow-xl transition"
                                            >
                                                <img
                                                    src={image.image_url}
                                                    alt={`screen-${index}`}
                                                    className="w-full h-auto transform hover:scale-110 transition-transform duration-300"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {content === 'seat-layout' && (
                            subContent !== 'add-seat' ? ( // Corrected conditional check
                                <div className="seat-layout-section">
                                    <div className="flex flex-col items-center justify-center py-20">
                                        <FaChair size={50} className="text-secondary mb-4" />
                                        <p className="text-gray-500 text-sm">Start setting up your seat layout.</p>
                                        <button
                                            onClick={() => dispatch(setContent({subContent:"add-seat"}))}
                                            className="bg-primary text-white py-2 px-6 mt-6 rounded hover:bg-primaryhover transition"
                                        >
                                            Create Seat Layout
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <AddSeatLayout tiers={screen.tiers} theaterId={theaterId}/>

                            )
                        )}



                        {content === 'screen-timings' && (
                            <div className="screen-timings-section">
                                <div className="flex flex-col items-center justify-center py-20">
                                    <FaClock size={50} className="text-green-500 mb-4" />
                                    <p className="text-gray-500 text-sm">Set the timings for this screen.</p>
                                    <button
                                        onClick={() => alert('Navigating to Screen Timings Setup...')}
                                        className="bg-primary text-white py-2 px-6 mt-6 rounded hover:bg-primaryhover transition"
                                    >
                                        Set Screen Timings
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};



export default ScreenDetails
