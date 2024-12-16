import React, { useState, useEffect } from 'react';
import useAxiosInstance from '../../axiosConfig';

const NotificationComponent = () => {
  const [notifications, setNotifications] = useState([]);
  const [websocket, setWebsocket] = useState(null);
  const axiosInstance = useAxiosInstance()

  // Fetch existing notifications
//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const response = await axiosInstance.get('/notification/get-notification/');
//         setNotifications(response.data);
//       } catch (error) {
//         console.error('Error fetching notifications:', error);
//       }
//     };
    
//     fetchNotifications();
//   }, []);

  // Establish WebSocket connection
  useEffect(() => {
    // Create WebSocket connection
    const ws = new WebSocket('ws://localhost:8000/ws/notifications/');

    ws.onopen = () => {
      console.log('WebSocket Connected');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("this is notification data: ", data)
      // Add new notification to the list
      setNotifications(prev => [
        {
          id: Date.now(), 
          message: data.message, 
          is_read: false
        },
        ...prev
      ]);
    };

    ws.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    setWebsocket(ws);

    // Cleanup on component unmount
    return () => {
      if (ws) ws.close();
    };
  }, []);

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      await axiosInstance.patch(`/notification/change-status/${notificationId}/`, { is_read: true });
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === notificationId 
            ? {...notification, is_read: true} 
            : notification
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  return (
    <div className="notifications-container">
      <h2>Notifications</h2>
      {notifications.map(notification => (
        <div 
          key={notification.id} 
          className={`notification ${notification.is_read ? 'read' : 'unread'}`}
        >
          <p>{notification.message}</p>
          {!notification.is_read && (
            <button onClick={() => markAsRead(notification.id)}>
              Mark as Read
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default NotificationComponent;