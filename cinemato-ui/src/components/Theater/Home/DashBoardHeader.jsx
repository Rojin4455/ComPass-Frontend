import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useAxiosInstance from '../../../axiosConfig';
import { generateExcel, generatePDF } from '../../../utils/ReportGenerator';
import showToast from '../../../utils/ToastNotifier';

const DashboardHeader = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const axiosInstance = useAxiosInstance()

  const handleDownload = async () => {
    if (!startDate || !endDate) {
      showToast("error","Please select a date range before downloading the report.");
      return;
    }

    try {
      const response = await axiosInstance.post('/theater/booking-report/', {
        start_date: startDate.toISOString().split('T')[0],
        end_date: endDate.toISOString().split('T')[0],
      });

      generatePDF(response.data, startDate, endDate)
      generateExcel(response.data, startDate, endDate)
      showToast("success","Report downloaded successfully!");
    } catch (error) {
      console.error("Error downloading report:", error);
      showToast("error","Failed to download the report. Please try again.");
    }
  };

  return (
    <div className="flex justify-between items-center mb-8 bg-gray-50 p-4 rounded-lg shadow">
      <h1 className="text-2xl font-bold text-gray-800">Welcome to Dashboard</h1>
      <div className="flex items-center space-x-4">
        <p className="text-gray-600">{new Date().toLocaleDateString()}</p>
        <div className="flex items-center space-x-2">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="Start Date"
            className="px-3 py-2 border rounded-lg text-sm"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            placeholderText="End Date"
            className="px-3 py-2 border rounded-lg text-sm"
          />
        </div>
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primaryhover transition-colors duration-300"
        >
          Download Report
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
