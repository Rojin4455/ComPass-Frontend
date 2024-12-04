import React, { useState } from "react";
import { BiLike, BiDislike, BiSolidDislike, BiSolidLike } from "react-icons/bi";
import showToast from "../../../utils/ToastNotifier";


const ReviewActions = ({ review, isLoggedIn, handleReaction, isReacion, likes, dislikes }) => {
  const [userReaction, setUserReaction] = useState(review.userReaction || null);
  

  const handleLike = () => {
    if (!isLoggedIn) {
        showToast('error', 'Please log in to react to reviews!')
        return;
    }
    const newReaction = userReaction === "like" ? null : "like";
    setUserReaction(newReaction);
    handleReaction(review.id, newReaction);
  };

  const handleDislike = () => {
    if (!isLoggedIn) {
      showToast('error', 'Please log in to react to reviews!')
      return;
    }
    const newReaction = userReaction === "dislike" ? null : "dislike";
    setUserReaction(newReaction);
    handleReaction(review.id, newReaction);
  };

  return (
    <div className="absolute bottom-5 left-4 right-4 flex justify-between items-center text-gray-500 text-sm">
      <div className="flex items-center gap-4">
        <button
          className={`flex items-center gap-1 text-black`}
          onClick={handleLike}
        >
          {review.reviewReaction === "like" ? <BiSolidLike /> : <BiLike/> }{review.likes}
        </button>
        <button
          className={`flex items-center gap-1 text-black`}
          onClick={handleDislike}
        >
          {review.reviewReaction === "dislike" ? <BiSolidDislike /> : <BiDislike/> }{review.dislikes}
        </button>
      </div>
      <span>{review.timeAgo}</span>
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
          />
        </svg>
      </button>
    </div>
  );
};

export default ReviewActions;
