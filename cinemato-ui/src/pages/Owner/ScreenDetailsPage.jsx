import React from "react";
import Header from "../../components/Theater/Header/Header";
import ScreenDetails from "../../components/Theater/Screens/ScreenDetails";




const sampleScreen = {
    screenName: "Screen 1",
    screenType: "IMAX",
    tiers: [
      { name: "VIP", price: "$20", totalSeats: 30 },
      { name: "Standard", price: "$12", totalSeats: 80 },
    ],
    images: [
      "https://via.placeholder.com/300",
      "https://via.placeholder.com/300",
      "https://via.placeholder.com/300",
    ],
  };
  
  const ScreenDetailsPage = () => {
    return (
      <div className="container mx-auto p-4">
        <Header page='owner/theaters/'/>
        <ScreenDetails />
      </div>
    );
  };
  
  export default ScreenDetailsPage;