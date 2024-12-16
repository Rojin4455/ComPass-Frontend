import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver"

const generatePDF = (reportData, startDate, endDate) => {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Booking Report", 14, 20);

  doc.setFontSize(12);
  const formattedStartDate = startDate.toISOString().split('T')[0];
  const formattedEndDate = endDate.toISOString().split('T')[0];
  doc.text(`Date Range: ${formattedStartDate} to ${formattedEndDate}`, 14, 30);

  const tableData = reportData.bookings.map((booking) => [
    booking.booking_id,
    booking.movie_title,
    booking.theater_name,
    booking.screen_name,
    booking.show_date,
    booking.show_time,
    booking.total,
  ]);

  autoTable(doc, {
    head: [["Booking ID", "Movie Title", "Theater Name", "Screen Name", "Show Date", "Show Time", "Total"]],
    body: tableData,
    startY: 40,
  });

  // Total Income
  doc.text(`Total Income: ${reportData.total_income}`, 14, doc.lastAutoTable.finalY + 10);

  // Save the PDF
  doc.save("Booking_Report.pdf");
};



const generateExcel = (reportData, startDate, endDate) => {
  const formattedStartDate = startDate.toISOString().split('T')[0];
  const formattedEndDate = endDate.toISOString().split('T')[0];

  const worksheetData = [
    [`Date Range: ${formattedStartDate} to ${formattedEndDate}`],
    ["Booking ID", "Movie Title", "Theater Name", "Screen Name", "Show Date", "Show Time", "Total"],
    ...reportData.bookings.map((booking) => [
      booking.booking_id,
      booking.movie_title,
      booking.theater_name,
      booking.screen_name,
      booking.show_date,
      booking.show_time,
      booking.total,
    ]),
  ];

  const totalRow = ["", "", "", "", "", "Total Income", reportData.total_income];
  worksheetData.push(totalRow);

  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

  // Save the Excel file
  XLSX.writeFile(workbook, "Booking_Report.xlsx");
};



  export {generateExcel, generatePDF}