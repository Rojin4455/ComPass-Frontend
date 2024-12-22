import { useState, useEffect } from "react";
import ReviewActions from "./ReviewActions";
import '../Profile/SidebarDetails/Bookings/cancelModal.css'


const AllReviewModal = ({ showModal, setShowModal, reviews, isLoggedIn, handleReaction, isReaction }) => {
  const [visibleReviews, setVisibleReviews] = useState([]);
  const [currentBatch, setCurrentBatch] = useState(6); // Initial number of reviews to show

  useEffect(() => {
    if (showModal) {
      setVisibleReviews(reviews.slice(0, currentBatch));
    }
  }, [showModal, currentBatch, reviews]);

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight;
    if (bottom && currentBatch < reviews.length) {
      setCurrentBatch((prev) => prev + 6); // Load 6 more reviews when scrolled to the bottom
    }
  };

  if (!showModal) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={() => setShowModal(false)}
    >
      <div
        className="bg-white w-4/5 max-w-3xl max-h-[80vh] overflow-y-auto animate-spring rounded-lg p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
        onScroll={handleScroll}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">All Reviews</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => setShowModal(false)}
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          {visibleReviews.map((review, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 relative"
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
              {/* Review Actions */}
              <ReviewActions
                review={review}
                isLoggedIn={isLoggedIn}
                handleReaction={handleReaction}
                likes={review.likes}
                dislikes={review.dislikes}
                isReacion={isReaction}
              />
            </div>
          ))}
          {currentBatch >= reviews.length && (
            <p className="text-center text-gray-500">No more reviews to show.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllReviewModal;
