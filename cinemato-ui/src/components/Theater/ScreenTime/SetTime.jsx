// SetTime.js
import React, { useState } from 'react';
import axios from 'axios';
import useAxiosInstance from '../../../axiosConfig';

function SetTime() {
  const [time, setTime] = useState("");
  const [movieTitle, setMovieTitle] = useState("");
  const axiosInstance = useAxiosInstance()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the backend with movie title and time
      const response = await axiosInstance.post("screen/set-time/", {
        movie_title: movieTitle,
        time: time,
      });
      
      if (response.status === 201) {
        alert("Time saved successfully!");
      }
    } catch (error) {
      console.error("Error saving time:", error);
      alert("Failed to save time. Please try again.");
    }
  };

  return (
    <div>
      <h2>Select Movie Time</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Movie Title"
          value={movieTitle}
          onChange={(e) => setMovieTitle(e.target.value)}
          required
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <button type="submit">Set Time</button>
      </form>
    </div>
  );
}

export default SetTime;
