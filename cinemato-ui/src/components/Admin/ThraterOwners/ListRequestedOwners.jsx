import React, { useState } from "react";
import RequestedOwnerDetails from "./RequestedOwnerDetails";
import showToast from "../../../utils/ToastNotifier";
import { IoChevronBackOutline } from "react-icons/io5";
import { IoIosArrowRoundBack } from "react-icons/io";

const ListRequestedOwners = ({ notifications, setNotifications , setIsRequested}) => {

    const [isRequesteDetails, setIsRequestDetails] = useState(false)
    const [notification, setNotification] = useState({})
    const markAsRead = (notificationId) => {
        
        const updatedNotifications = notifications.map((noti) => 
            noti.id === notificationId
            ? {...noti , is_read:true}
            : noti
        )

        console.log("updated notification: ",updatedNotifications)
        setNotifications(updatedNotifications)
        setIsRequestDetails(true)
        setNotification(notificationId)
    }

    






  return (

    <div className="min-h-screen p-4">
        {isRequesteDetails ? (
        <RequestedOwnerDetails notificationId={notification} goBack={setIsRequestDetails}/>
    ):(
      <div className="max-w-3xl mx-auto bg-white shadow rounded-md">
        <header className="flex justify-between items-center p-6 border-b">
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => setIsRequested(false)}
          >
            &larr; Back
          </button>
          <h1 className="text-xl font-semibold text-gray-800">All Requests</h1>
        </header>

        <div>
            
          {notifications.length === 0 ? (
            <div className="p-6 text-center text-gray-600">
              No notifications yet!
            </div>
          ) : (
            <ul className="divide-y">
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 cursor-pointer ${
                    notification.is_read ? "text-gray-700" : "font-bold text-black"
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex justify-between items-center">
                    <div className="truncate w-3/4">
                      <span className="block text-sm text-gray-500">
                        {new Date(notification.created_at).toLocaleDateString()}
                      </span>
                      <p>{notification.message}</p>
                    </div>
                    {!notification.is_read && (
                      <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                        Unread
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      )}
    </div>
  );
};

export default ListRequestedOwners;
