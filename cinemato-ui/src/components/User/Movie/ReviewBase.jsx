import React, {useEffect, useState} from "react";
import AddRatingModal from "./AddRatingModal";
import useAxiosInstance from "../../../axiosConfig";
import { useLocation, useSearchParams } from "react-router-dom";
import { BiLike,BiDislike } from "react-icons/bi";
import { FaRegCircleUser } from "react-icons/fa6";
import ReviewActions from "./ReviewActions";
import { useSelector } from "react-redux";
import { VscLightbulb } from "react-icons/vsc";
import showToast from "../../../utils/ToastNotifier";




const ReviewBase = () => {

    const [ratingModal, setRatingModal] = useState(false)
    const axiosInstance = useAxiosInstance()
    const location = useLocation()
    const [reviews, setReviews] = useState([])
    const [isReaction, setIsReaction] = useState(false)
    const [likes, setLikes] = useState(0)
    const [dislikes, setDislikes] = useState(0)
    
    const movie = location.state.movie
    const user = useSelector((state) => state.user.is_user )
    const isLoggedIn = user? true: false

    const handleReaction = async (reviewId, newReaction) => {
        try{
            const response = await axiosInstance.post('movie/add-review-reaction/',{
                reviewId:reviewId,
                reaction:newReaction
            })
            if(response.status === 200){
                console.log("review reaction is added", response)
                setLikes(response.data.likes)
                setDislikes(response.data.dislikes)
                setIsReaction(isReaction? false:true)
            }else{
                console.error('error response', response)
            }
        }catch(error){
            console.error("something went wrong: ",error)
        }
    }

    const handleRatingModal = async () => {
        if (!user){
            showToast('error', 'please login to add reviews!')
        }else{
            setRatingModal(true)
        }
    }

    const calculateTimeAgo = (createdAt) => {
        const createdTime = new Date(createdAt);
        const currentTime = new Date();
        const diffInSeconds = Math.floor((currentTime - createdTime) / 1000);
      
        if (diffInSeconds < 60) {
          return `${diffInSeconds} seconds ago`;
        } else if (diffInSeconds < 3600) {
          const minutes = Math.floor(diffInSeconds / 60);
          return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
        } else if (diffInSeconds < 86400) {
          const hours = Math.floor(diffInSeconds / 3600);
          return `${hours} hour${hours > 1 ? "s" : ""} ago`;
        } else {
          const days = Math.floor(diffInSeconds / 86400);
          return `${days} day${days > 1 ? "s" : ""} ago`;
        }
      };

    
    useEffect(() => {
        const fetchReviews = async () => {
            try{
            const response = await axiosInstance.get(`movie/get-reviews/${movie.id}/`)
            if (response.status === 200) {
                console.log("this is reviews get API call");
                console.log("user review: ", response.data.userReview);
              
                const userReview = response.data.userReview
                  ? {
                      id: response.data.userReview.id,
                      user: response.data.userReview.user?.email
                        ? response.data.userReview.user.email.split("@")[0]
                        : "Anonymous User",
                      platform: "cinemato",
                      rating: parseFloat(response.data.userReview.rating),
                      hashtags: response.data.userReview.hashtags.map(
                        (hashtag) => `#${hashtag.heading}`
                      ),
                      content:
                        response.data.userReview.content || "No review content provided",
                      likes: response.data.userReview.likes_count,
                      dislikes: response.data.userReview.dislikes_count,
                      reviewReaction:
                        response.data.userReview.review_reaction?.reaction || null,
                      timeAgo: calculateTimeAgo(response.data.userReview.created_at),
                      isEditable: true, // User review is editable
                    }
                  : null;
              
                const otherReviews = response.data.otherReviews.map((review) => ({
                  id: review.id,
                  user: review.user?.email
                    ? review.user.email.split("@")[0]
                    : "Anonymous User",
                  platform: "cinemato",
                  rating: parseFloat(review.rating),
                  hashtags: review.hashtags.map((hashtag) => `#${hashtag.heading}`),
                  content: review.content || "No review content provided",
                  likes: review.likes_count,
                  dislikes: review.dislikes_count,
                  reviewReaction: review.review_reaction?.reaction || null,
                  timeAgo: calculateTimeAgo(review.created_at),
                  isEditable: false,
                }));
              
                // Combine userReview and otherReviews
                const allReviews = userReview
                  ? [userReview, ...otherReviews]
                  : otherReviews;
              
                setReviews(allReviews);
                console.log("transformed reviews: ", allReviews);
              } else {
                console.error("error response: ", response);
              }
            }catch(error){
                console.error("something went wrong", error)
            }
        }

        fetchReviews()
    },[isReaction,user])


    const handleEditReview = async () => {
        
    }


  return (

    <div className="w-4/5 mx-auto px-8">
        
        <AddRatingModal setRatingModal={setRatingModal} ratingModal={ratingModal} movieId={movie.id}/>
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-bold">Top Reviews</h2>
    <button className="text-primary flex items-center gap-2">
      See All Reviews <span>&gt;</span>
    </button>
  </div>
  <div className=" flex justify-between w-2/5 gap-8 p-4 bg-gray-100 mb-4 rounded-lg"
    
  >
    <div className="space-y-1">
    {reviews.some((review) => review.isEditable) ? (
    <>
      <h2 className="text-xl font-base">You've already rated this movie</h2>
      <h4 className="text-md font-thin">Thank you for your feedback!</h4>
    </>
  ) : (
    <>
      <h2 className="text-xl font-base">Add your rating & reviews</h2>
      <h4 className="text-md font-thin">Your rating matters</h4>
    </>
  )}
    </div>
    {!reviews.some((review) => review.isEditable) && (
    <button className="px-4 rounded-md text-md border border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all transform hover:scale-110"
    style={{ fontFamily: "Montserrat" }}
    onClick={handleRatingModal}
    > 
        Rate Now
    </button>
    )}
  </div>

  <p className="text-gray-600 mb-4">Summary of {reviews.length} reviews.</p>

  <div className="relative">
    <div className="flex gap-4 mb-6 overflow-x-auto scroll-smooth snap-x">
      {reviews.map((review, index) => (
        <div
        key={index}
        className="border rounded-lg p-4 w-[calc(50%-8px)] flex-shrink-0 snap-center relative"
      >
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            <div>
              <p className="font-medium">{review.user}</p>
              <p className="text-sm text-gray-500">
                Booked on <span className="text-primary">{review.platform}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-yellow-400 mr-1">★</span>
            <span>{review.rating}/10</span>
          </div>
        </div>
      
        <div className="mb-10">
          <p className="text-gray-700 mb-2">{review.hashtags.join(" ")}</p>
          <p className="text-gray-800">{review.content}</p>
        </div>
      
       <ReviewActions review={review} isLoggedIn={isLoggedIn} handleReaction={handleReaction} likes={likes} dislikes={dislikes} isReaction={isReaction}/>
      </div>
      
      ))}
    </div>
  
  
</div>

</div>

  );
};

export default ReviewBase;
