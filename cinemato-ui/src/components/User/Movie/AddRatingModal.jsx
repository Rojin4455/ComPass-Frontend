import React, { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import '../Profile/SidebarDetails/Bookings/cancelModal.css'
import { FaStar } from "react-icons/fa";
import useAxiosInstance from '../../../axiosConfig';
import { useLocation } from 'react-router-dom';
import showToast from '../../../utils/ToastNotifier';



export default function MovieRatingModal({ setRatingModal, ratingModal, movieId }) {
    const [rating, setRating] = useState(0)
    const [selectedHashtags, setSelectedHashtags] = useState([])
    const axiosInstance = useAxiosInstance()
    const [hashtags, setHashtags] = useState([])
    const [hashtagIndex, sethashtagIndex] = useState(0)
    const [content, setContent] = useState('')
    const [isFocused, setIsFocused] = useState(false);

        // const movie = useSelector((state) => state.booking.selectedMovie)



    const [groupedHashtags, setGroupedHashtags] = useState({});

    const handleRatingChange = (e) => {
        setRating(Number(e.target.value))
    }

    const toggleHashtagSelection = (hashtag, hashtagIndex) => {

        if (selectedHashtags.includes(hashtag)) {
            setSelectedHashtags(selectedHashtags.filter((item) => item != hashtag))
        } else {
            setSelectedHashtags([...selectedHashtags, hashtag])
        }
    }

    useEffect(() => {

        const fetchHashtags = async () => {

            try {
                const response = await axiosInstance.get('movie/movie-hashtags/')
                const data = await response.data;

                const grouped = data.reduce((acc, item) => {
                    acc[item.rated_at] = acc[item.rated_at] || [];
                    acc[item.rated_at].push(item.heading);
                    return acc;
                }, {});

                console.log("grouped: ", grouped)
                setGroupedHashtags(grouped);
            } catch (error) {
                console.log("response: error ", error)
            }
        }
        fetchHashtags()

    }, [])


    useEffect(() => {
        if (rating <= 3) {
            sethashtagIndex(3)
        } else if (rating <= 6) {
            sethashtagIndex(6)
        } else {
            sethashtagIndex(10)
        }

        setSelectedHashtags([])

    }, [rating])


    const handleReviewSubmit = async () => {
        try {
            const response = await axiosInstance.post('movie/add-review/', {
                rating: rating,
                selectedHashtags: selectedHashtags,
                content: content,
                movieId: movieId

            })

            if (response.status === 201){
                showToast('success', response.data.message)
                setRatingModal(false)
            }else{
                showToast('error', 'something went wrong')
                console.log("error response: ",response)
            }   
        } catch (error) {
            console.log("something went wring :", error)
            if (error.status === 400){
                showToast('error', error.response.data.message)
            }else{
            showToast('error', "something went wrong")
            }
        }
    }



    return (
        <div className="relative">
            {ratingModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div
                        className="bg-white rounded-lg p-6 max-w-md w-full mx-4 animate-spring overflow-hidden relative"
                        style={{ maxHeight: "90vh", height: "500px" }}
                    >
                        {/* Modal Header */}
                        <div className="flex justify-between items-center mb-4 p-4 bg-white shadow-md rounded-t-lg">
                            <h2 className="text-xl font-semibold">How was the movie?</h2>
                            <button
                                onClick={() => setRatingModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div
                            className="mb-8 overflow-y-auto pr-2"
                            style={{ maxHeight: "calc(100% - 110px)" }} /* Adjust for footer */
                        >
                            <h3 className="text-lg mb-8">How would you rate the movie?</h3>
                            <div className="relative w-full mt-10">
                                <div className="relative w-full h-10">
                                    <input
                                        type="range"
                                        min="0"
                                        max="10"
                                        step="0.1"
                                        value={rating}
                                        onChange={handleRatingChange}
                                        className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer absolute z-10 opacity-0"
                                    />
                                    <FaStar
                                        className="absolute text-yellow-300 text-2xl transition-all duration-500 ease-out"
                                        style={{
                                            top: rating === 0 ? "40%" : "-30px",
                                            left: `${(rating / 10) * 100}%`,
                                            transform: "translate(-50%, -50%)",
                                            transition: "top 0.5s ease, left 0.5s ease",
                                        }}
                                    />
                                    <div
                                        className="absolute top-0 left-0 h-2 rounded-lg"
                                        style={{
                                            width: "100%",
                                            background: `linear-gradient(to right, #003049 ${(rating / 10) * 100
                                                }%, #e5e7eb ${(rating / 10) * 100}%)`,
                                            transition: "background-size 0.3s ease-out",
                                        }}
                                    />
                                    <div className="absolute inset-0 flex justify-between items-center">
                                        {Array.from({ length: 11 }, (_, i) => (
                                            <div
                                                key={i}
                                                className={`w-2 h-2 rounded-full ${i <= rating
                                                        ? "bg-primary"
                                                        : "bg-white border border-gray-300"
                                                    }`}
                                                style={{ transition: "background-color 0.3s ease" }}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="text-lg font-medium text-center mt-2">
                                    {rating}/10
                                </div>
                            </div>

                            <div className="text-center mt-3">
                                {!rating ? (
                                    <>
                                        <p className="text-gray-600 italic text-lg mb-1">
                                            Your ratings matter!
                                        </p>
                                        <p className="text-gray-400">
                                            They help others decide what to watch next.
                                        </p>
                                    </>
                                ) : (
                                    <div>
                                        <p className="text-gray-800 italic text-lg mb-1">
                                            What do you think about the movie?
                                        </p>
                                        <p className="text-gray-400 italic text-sm mb-1">
                                            Express Yourself with hashtags
                                        </p>
                                        {/* Hashtags */}
                                        <div className="flex flex-wrap justify-center gap-2">
                                            {groupedHashtags[hashtagIndex].map((hashtag, index) => (
                                                <div
                                                    key={index}
                                                    className={`px-2 py-1 rounded-full border text-xs border-primary cursor-pointer transition-all 
                          ${selectedHashtags.includes(hashtag)
                                                            ? "bg-primary text-white"
                                                            : "text-gray-700 bg-white"
                                                        }`}
                                                    onClick={() => toggleHashtagSelection(hashtag, hashtagIndex)}
                                                >
                                                    #{hashtag}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-6 mb-10">
                                            <p className="text-gray-800 mb-5 left-0">
                                                Express more with a review{" "}
                                                <span className="text-gray-400">(optional)</span>
                                            </p>
                                            <div className="relative">
      <input
        type="text"
        id="review"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full px-4 py-6 border-b border-gray-300 focus:outline-none focus:border-black"
        placeholder=" " // Invisible placeholder for styling
      />
      <label
        htmlFor="review"
        className={`absolute left-0 transition-all transform ${
          isFocused || content.length > 0
            ? "top-0 text-black text-sm"
            : "top-1/2 -translate-y-1/2 text-gray-400 text-base"
        }`}
      >
        Your opinion matters
      </label>
    </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="absolute bottom-0 left-0 w-full p-4 bg-gray-100">
                            <button
                                className={`w-full py-3 rounded-lg text-lg font-medium transition-colors ${rating
                                        ? "text-white bg-primary hover:bg-primaryhover cursor-pointer"
                                        : "text-white bg-gray-300 cursor-default"
                                    }`}
                                disabled={!rating}

                                onClick={handleReviewSubmit}
                            >
                                Submit Rating
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>



    )
}

