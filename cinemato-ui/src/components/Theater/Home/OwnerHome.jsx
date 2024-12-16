import React, { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import "tailwindcss/tailwind.css";
import axios from "axios";
import useAxiosInstance from "../../../axiosConfig";

// Chart.js setup
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import TopMovies from "../../Common/TopMovies";
import DashboardHeader from "./DashBoardHeader";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const generateChartData = (theaters) => {
  const uniqueScreens = Array.from(
    new Set(theaters.flatMap((theater) => theater.screens.map((screen) => screen.screen_name)))
  );


  const datasets = uniqueScreens.map((screen, index) => {
    const colors = ["#4F5D75", "#EF8354", "#474747"];
    return {
      label: screen,
      data: theaters.map((theater) =>
        theater.screens.find((s) => s.screen_name === screen)?.total_bookings || 0
      ),
      backgroundColor: colors[index % colors.length],
    };
  });


  return {
    labels: theaters.map((theater) => theater.theater_name),
    datasets,
  };
};

const theaterOptions = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    title: { display: true, text: "Theater-wise Booking Overview" },
  },
  scales: {
    y: { beginAtZero: true },
  },
};



function OwnerHome() {
  const [timePeriod, setTimePeriod] = useState("max");
  const [startDate, setStartDate] = useState("2024-11-01");
  const [endDate, setEndDate] = useState("2024-12-30");
  const [theaters, setTheaters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [chartData, setChartData] = useState(null);
  const axiosInstance = useAxiosInstance()
  const [stats,setStats] = useState([])
  const [animatedStats, setAnimatedStats] = useState([]);
  const [topMovies, setTopMovies] = useState([])


  useEffect(() => {
    const fetchTheaterData = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axiosInstance.post("/theater/dashboard-theater/", {
          start_date: startDate, end_date: endDate,
        });
        setTheaters(response.data.success);
        const transformedStats = [
          {title:"Total Bookings",value:response.data.title_data.total_bookings},
          {title:"Total Revenue",value:response.data.title_data.total_revenue},
          {title:"Total Theaters",value:response.data.title_data.total_theaters},
        ]
        setStats(transformedStats)
        setTopMovies(response.data.title_data.top_movies)
        console.log("resp[onseL: ",response)
        
      } catch (err) {
        setError("Failed to fetch theater data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTheaterData();
  }, [startDate, endDate]);
  console.log("top movies data: ",topMovies)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/theater/dashboard-booking/`, {
          params: { time_period: timePeriod },
        });
        console.log("response: ", response.data)
        const labels = response.data.map((item) => item.label);
        const data = response.data.map((item) => item.total);

        setChartData({
          labels,
          datasets: [
            {
              label: "Bookings",
              data,
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching booking trends data:", error);
      }
    };

    fetchData();
  }, [timePeriod]);

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Booking Trends" },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  // const stats = [
  //   { title: "Total Bookings", value: "3,250" },
  //   { title: "Total Theaters", value: "25" },
  //   { title: "Total Revenue", value: "$50,000" },
  // ]


  // const topMovies = [
  //   { id: 1, title: "Movie A", bookings: 500 },
  //   { id: 2, title: "Movie B", bookings: 450 },
  //   { id: 3, title: "Movie C", bookings: 400 },
  //   { id: 4, title: "Movie D", bookings: 380 },
  //   { id: 5, title: "Movie E", bookings: 350 },
  //   { id: 6, title: "Movie F", bookings: 300 },
  // ];


  const theaterData = generateChartData(theaters);


  useEffect(() => {
    // Create an animation effect for numbers shuffling before settling
    const interval = setInterval(() => {
      setAnimatedStats(
        stats.map((stat) => ({
          title: stat.title,
          value: Math.floor(Math.random() * stat.value * 1.5), // Random numbers
        }))
      );
    }, 100);

    // Set the final stats after a delay
    const timeout = setTimeout(() => {
      clearInterval(interval);
      setAnimatedStats(stats); // Set the actual values
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [stats]);

  return (
    <div className="mt-[5rem]">
      <div className="p-6 bg-gray-100 min-h-screen">
<DashboardHeader/>
        <div className="grid grid-cols-3 gap-6 mb-8">
      {animatedStats.map((stat, index) => (
        <div
          key={index}
          className="bg-white shadow-lg rounded-lg p-6 text-center border-l-4 border-secondary hover:scale-105 transition-transform duration-300"
        >
          <h2 className="text-xl font-semibold text-primary tracking-wide">
            {stat.title}
          </h2>
          <p className="text-4xl font-bold text-primary mt-4 animate-pulse">
            {stat.value}
          </p>
        </div>
      ))}
    </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 bg-white shadow-lg rounded-lg p-6">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <Bar data={theaterData} options={theaterOptions} />
            )}
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-700">Booking Trends</h2>
        <select
          value={timePeriod}
          onChange={(e) => setTimePeriod(e.target.value)}
          className="px-2 py-1 border border-gray-300 rounded-lg"
        >
          <option value="daily">Daily</option>
          {/* <option value="weekly">Weekly</option> */}
          <option value="monthly">Monthly</option>
          <option value="max">Max</option>
        </select>
      </div>
      {chartData ? (
        <Line data={chartData} options={lineChartOptions} />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
        </div>

        {/* Date Range Filter */}
        <div className="mt-6 flex space-x-4">
          <div>
            <label className="text-gray-600">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="ml-2 px-2 py-1 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="text-gray-600">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="ml-2 px-2 py-1 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
        <div>
        <TopMovies topMovies={topMovies} />
      </div>
      </div>
    </div>
  );
}

export default OwnerHome;
