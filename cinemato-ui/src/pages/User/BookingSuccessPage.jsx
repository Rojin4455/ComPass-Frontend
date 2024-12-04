import React, { useEffect, useState } from 'react'
import BookingSuccess from '../../components/User/Payment/BookingSuccess'
import MainLayout from '../../components/User/MainLayout'
import useAxiosInstance from '../../axiosConfig';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Loading from '../../components/Common/Loading';
import { useNavigate } from 'react-router-dom';
function BookingSuccessPage() {

    const location = useLocation();
    const [ticketDetails, setTicketDetails] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate()

    // Extract the 'id' parameter from the URL
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');


      const axiosInstance = useAxiosInstance()

      useEffect(() => {
        const fetchTicketDetails = async () => {
          try {
            const response = await axiosInstance.get(`booking/ticket-details/${id}`);
            if (response.status === 200) {
              console.log("Success response: ", response.data);
              setTicketDetails(response.data);
            } else {
              console.error("Error response: ", response);
              setError("Failed to fetch ticket details");
            }
          } catch (err) {
            console.error("Something went wrong", err);
            setError("Something went wrong while fetching ticket details");
          }
        };
        fetchTicketDetails();
      }, [id]);

        console.log("error")

        useEffect(() => {
            navigate(`/user/booking-success?id=${id}`, { replace: true });
        }, [navigate]);
    
      if (error) {
        return <div>Error: {error}</div>;
      }
    
      if (!ticketDetails) {
        return <Loading loading={true} />
      }

      


  return (
    <MainLayout>
        <BookingSuccess bookingDetails={ticketDetails}/>
    </MainLayout>
  )
}

export default BookingSuccessPage