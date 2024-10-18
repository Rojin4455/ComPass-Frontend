// import React, { useEffect, useState } from 'react';
// import { FaIndianRupeeSign } from "react-icons/fa6";
// import { PiArmchairFill } from "react-icons/pi";
// import { IoChevronBackOutline } from "react-icons/io5";
// import { useNavigate } from 'react-router-dom';
// import { setContent } from '../../../slices/OwnerScreenSlice';
// import { useDispatch } from 'react-redux';



// const AddSeatLayout = ({ tiers,theaterId }) => {
//   // State to hold the number of rows and columns for each tier
//   const [seatConfig, setSeatConfig] = useState(
//     tiers.map(() => ({ rows: 0, columns: 0 }))
//   );

//   const dispatch = useDispatch()
//   // State to track which seats are selected in each tier
//   const [selectedSeats, setSelectedSeats] = useState(
//     tiers.map(() => ({})) // Store selected state for each tier's seats
//   );
//   // Handle input change for rows and columns
//   const handleInputChange = (index, field, value) => {
//     const updatedConfig = [...seatConfig];
//     updatedConfig[index][field] = value;
//     setSeatConfig(updatedConfig);
//   };

//   // Toggle seat selection when clicking on a grid cell
//   const toggleSeatSelection = (tierIndex, rowIndex, colIndex) => {
//     const updatedSeats = [...selectedSeats];
//     const seatKey = `${rowIndex}-${colIndex}`;

//     // Toggle the seat's selected state
//     if (updatedSeats[tierIndex][seatKey]) {
//       delete updatedSeats[tierIndex][seatKey]; // Deselect seat
//     } else {
//       updatedSeats[tierIndex][seatKey] = true; // Select seat
//     }
//     setSelectedSeats(updatedSeats);
//   };

//   // Function to render matrix based on rows and columns
//   const renderMatrix = (tierIndex, rows, columns) => {
//     const matrix = [];
//     for (let i = 0; i < rows; i++) {
//       const row = [];
//       for (let j = 0; j < columns; j++) {
//         const seatKey = `${i}-${j}`;
//         const isSelected = selectedSeats[tierIndex][seatKey];

//         row.push(
//           <div
//             key={`${i}-${j}`}
//             onClick={() => toggleSeatSelection(tierIndex, i, j)}
//             className={`w-8 h-8 m-1 flex items-center justify-center cursor-pointer
//               ${
//                 isSelected
//                   ? 'bg-primary text-white border-primary'
//                   : 'bg-gray-200 border border-gray-300'
//               }
//               hover:bg-primary hover:text-white transition-colors scale-95 hover:scale-110 duration-300`}
//           >
//             {isSelected ? <PiArmchairFill className='text-secondary'/> : ''}
//           </div>
//         );
//       }
//       matrix.push(
//         <div key={i} className="flex justify-center mb-1">
//           {row}
//         </div>
//       );
//     }
//     console.log("seat configurations: ",matrix)
//     return matrix;
//   };


//   return (
//     <div className="tiers-info grid grid-cols-1 gap-6">
//                             <div className="flex items-center mb-4 gap-0.5 cursor-pointer"
//                         onClick={() => dispatch(setContent({subContent:" "}))}>
//                         <IoChevronBackOutline
//                             size={15}
//                             className="text-gray-700 cursor-pointer hover:text-primary transition"

//                         />
//                         <h1 className="text-sm font-bold text-gray-800">Back</h1>
//                     </div>
//       {tiers.map((tier, index) => (
//         <div
//           key={index}
//           className="tier-card bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6"
//         >
//           {/* Tier Details */}
//           <div className="tier-details">
//             <h4 className="text-2xl font-bold text-gray-800 mb-3 flex items-center justify-between">
//               {tier.name}
//               <span className="ml-2 bg-[#fdf8e1] text-primary text-sm px-3 py-1 rounded-full">
//                 {tier.total_seats} seats
//               </span>
//             </h4>

//             <div className="text-lg">
//               <div className="mb-2 flex items-center text-gray-700">
//                 <span className="font-semibold mr-2">Price:</span>
//                 <div className="flex items-center gap-0.5">
//                   <FaIndianRupeeSign size={15} className="text-secondary" />
//                   <span className="font-bold text-gray-500">{tier.price}</span>
//                 </div>
//               </div>
//               <p className="text-gray-600 text-sm">
//                 {tier.total_seats} seats available
//               </p>
//             </div>


//             <div className="mt-4 flex items-center gap-5">
//                 <div className='w-1/2'>
//               <label className="block text-gray-600 text-sm mb-2">Rows:</label>
//               <input
//                 type="number"
//                 min="0"
//                 value={seatConfig[index].rows}
//                 onChange={(e) =>
//                   handleInputChange(index, 'rows', parseInt(e.target.value) || 0)
//                 }
//                 className="border border-gray-300 p-2 rounded-full w-full mb-4"
//                 placeholder="Enter number of rows"
//               />
//               </div>
//               <div className='w-1/2'>

//               <label className="block text-gray-600 text-sm mb-2">
//                 Columns:
//               </label>
//               <input
//                 type="number"
//                 min="0"
//                 value={seatConfig[index].columns}
//                 onChange={(e) =>
//                   handleInputChange(index, 'columns', parseInt(e.target.value) || 0)
//                 }
//                 className="border border-gray-300 p-2 rounded-full w-full mb-4"
//                 placeholder="Enter number of columns"
//               />
//               </div>
//             </div>


//             {/* Tier Title and Seat Matrix */}
//             {seatConfig[index].rows > 0 && seatConfig[index].columns > 0 && (
//               <div className="mt-8">
//                 {/* Tier Title */}
//                 <h5 className="text-center text-lg font-semibold text-gray-600 mb-4">
//                   ---------------------------- {tier.name} ----------------------------
//                 </h5>

//                 {/* Seat Grid */}
//                 <div className="seat-matrix grid grid-cols-1">
//                   {renderMatrix(index, seatConfig[index].rows, seatConfig[index].columns)}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default AddSeatLayout;









import React, { useState,useEffect } from 'react';
import { FaIndianRupeeSign } from "react-icons/fa6";
import { PiArmchairFill } from "react-icons/pi";
import { IoChevronBackOutline } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { setContent } from '../../../slices/OwnerScreenSlice';
import { TbArmchair } from "react-icons/tb";
import { MdChair } from "react-icons/md";



const AddSeatLayout = ({ tiers, theaterId }) => {
  // State to hold the number of rows and columns for each tier
  const [seatConfig, setSeatConfig] = useState(
    tiers.map(() => ({ rows: 0, columns: 0 }))
  );

  const [columns,setColumns] = useState("")
  const [rows,setRows] = useState("")
  const [tierIndex,setTierIndex] = useState("")

  const dispatch = useDispatch();

  const [rowsColumns, setRowsColumns] = useState({})

  // State to track which seats are selected in each tier
  const [selectedSeats, setSelectedSeats] = useState(
    tiers.map(() => ({})) // Store selected state for each tier's seats
  );

  // Handle input change for rows and columns
  const handleInputChange = (index, field, value) => {
    const updatedConfig = [...seatConfig];
    updatedConfig[index][field] = value;
    setSeatConfig(updatedConfig);
  };

  // Toggle seat selection when clicking on a grid cell
  const toggleSeatSelection = (tierIndex, rowIndex, colIndex) => {
    const updatedSeats = { ...selectedSeats[tierIndex] };
    const seatKey = `${rowIndex}-${colIndex}`;

    // Toggle the seat's selected state
    if (updatedSeats[seatKey]) {
      delete updatedSeats[seatKey]; // Deselect seat
    } else {
      updatedSeats[seatKey] = true; // Select seat
    }

    // Update the selected seats for this tier
    const updatedSelectedSeats = [...selectedSeats];
    updatedSelectedSeats[tierIndex] = updatedSeats;
    setSelectedSeats(updatedSelectedSeats);
  };

  // Helper function to get the sorted selected seat identifiers
  const getSortedSeatIdentifiers = (selectedSeats) => {
      const seatEntries = Object.keys(selectedSeats)
      .map((key) => {
          const [row, col] = key.split('-').map(Number);
          return { row, col, key };
        })
        .sort((a, b) => {
            // Sort by row first, then by column
            if (a.row === b.row) return a.col - b.col;
            return a.row - b.row;
        });

    // Generate seat identifiers based on the sorted order


    const seatCounter = {};

    return seatEntries.map((entry) => {
      const rowIdentifier = String.fromCharCode(65 + entry.row);
    
      if (!seatCounter[rowIdentifier]) {
        seatCounter[rowIdentifier] = 1;
      }
    
      const seatIdentifier = `${rowIdentifier}${seatCounter[rowIdentifier]}`;
      seatCounter[rowIdentifier]++;
    
      return { ...entry, seatIdentifier };
    });
  };


//   const prev = {...rowsColumns,tierIndex:{rows,columns}}
//   setRowsColumns(prev)


//   useEffect(() => {
//     const updatedRowsColumns = { ...rowsColumns, [tierIndex]: { rows, columns } };
//     setRowsColumns(updatedRowsColumns);
//     console.log("rows and columns: ", updatedRowsColumns);
//   }, [rows, columns, tierIndex]);



  // Function to render matrix based on rows and columns
  const renderMatrix = (tierIndex, rows, columns) => {
    console.log("rows: ", rows, "columns: ", columns, "index: ", tierIndex);
  
    const sortedSeats = getSortedSeatIdentifiers(selectedSeats[tierIndex]);
    const matrix = [];
  
    for (let i = 0; i < rows; i++) {
      const row = [];
      
      // Add a div for row identifier (e.g., 'A', 'B', etc.)
      const rowIdentifier = String.fromCharCode(65 + i); // Convert 0 to 'A', 1 to 'B', etc.
      row.push(
        <div key={`row-identifier-${i}`} className="w-8 h-8 m-1 flex items-center justify-center font-bold">
          {rowIdentifier}
        </div>
      );
  
      for (let j = 0; j < columns; j++) {
        const seatKey = `${i}-${j}`;
        const isSelected = selectedSeats[tierIndex][seatKey];
        const seatInfo = sortedSeats.find((seat) => seat.key === seatKey);
  
        row.push(
          <div
            key={seatKey}
            onClick={() => toggleSeatSelection(tierIndex, i, j)}
            className={`w-8 h-8 m-1 flex items-center justify-center cursor-pointer rounded
              ${
                isSelected
                  ? 'bg-primary text-white border-primary'
                  : 'bg-gray-200 border border-gray-300'
              }
              hover:bg-primary hover:text-white transition-colors scale-95 hover:scale-110 duration-300`}
          >
            {isSelected ? (
                <>
  <div className="relative flex items justify-center">
    <MdChair className="text-secondary" size={30} />
    <span className="absolute text-xs text-primary mt-0.5">{seatInfo?.seatIdentifier.replace(/[A-Z]/g, '')}</span>
  </div>
              </>
            ) : ''}
          </div>
        );
      }
  
      matrix.push(
        <div key={i} className="flex justify-center mb-1">
          {row}
        </div>
      );
    }
  
    return matrix;
  };
  

  // Function to handle seat layout confirmation and send data to backend
  const confirmLayout = (tierIndex) => {
    const rows = seatConfig[tierIndex].rows; // Number of rows for the current tier
  const columns = seatConfig[tierIndex].columns; // Number of columns for the current tier

  // Get all selected seats for the current tier
  const sortedSeats = getSortedSeatIdentifiers(selectedSeats[tierIndex]);

  // Initialize the seat layout for the full matrix
  const fullLayout = [];

  let seatNumber = 1; // To assign identifiers only to selected seats

  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    for (let colIndex = 0; colIndex < columns; colIndex++) {
      const seatKey = `${rowIndex}-${colIndex}`;
      const isSelected = selectedSeats[tierIndex][seatKey] || false; // Check if the seat is selected

      if (isSelected) {
        // Only assign identifier if seat is selected
        const rowIdentifier = String.fromCharCode(65 + rowIndex); // 'A', 'B', 'C', etc.
        const seatIdentifier = `${rowIdentifier}${seatNumber}`; // Sequential identifier for selected seats

        fullLayout.push({
          row: rowIndex + 1,        // Row reference
          col: colIndex + 1,        // Column reference
          identifier: seatIdentifier, // Reference identifier (e.g., A1, A2)
          is_available: true,        // Mark as available since it's selected
        });

        seatNumber++; // Increment the seat number for the next selected seat
      } else {
        // If the seat is not selected, push with no identifier and mark as unavailable
        fullLayout.push({
          row: rowIndex + 1,  // Row reference
          col: colIndex + 1,  // Column reference
          identifier: null,   // No identifier for unselected seats
          is_available: false, // Mark as unavailable
        });
      }
    }
  }
  console.log("tiers: ",tiers)
  const payload = {
    theaterId,
    tierName: tiers[tierIndex].name,
    tierFullDetails: tiers[tierIndex],
    seatLayout: fullLayout, // Full layout of the tier
    tierIndex, // The current tier index
  };

  // Log the payload to check the final structure
  console.log('Confirming seat layout:', payload);

    // TODO: Send payload to backend via API call
    // You can use fetch/axios to make the API request here
  };

  return (
    <div className="tiers-info grid grid-cols-1 gap-6">
      <div className="flex items-center mb-4 gap-0.5 cursor-pointer"
        onClick={() => dispatch(setContent({ subContent: " " }))}>
        <IoChevronBackOutline
          size={15}
          className="text-gray-700 cursor-pointer hover:text-primary transition"
        />
        <h1 className="text-sm font-bold text-gray-800">Back</h1>
      </div>

      {tiers.map((tier, index) => (
        <div
          key={index}
          className="tier-card bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6"
          
        >
          {/* Tier Details */}
          <div className="tier-details">
            <h4 className="text-2xl font-bold text-gray-800 mb-3 flex items-center justify-between">
              {tier.name}
              <span className="ml-2 bg-[#fdf8e1] text-primary text-sm px-3 py-1 rounded-full">
                {tier.total_seats} seats
              </span>
            </h4>

            <div className="text-lg">
              <div className="mb-2 flex items-center text-gray-700">
                <span className="font-semibold mr-2">Price:</span>
                <div className="flex items-center gap-0.5">
                  <FaIndianRupeeSign size={15} className="text-secondary" />
                  <span className="font-bold text-gray-500">{tier.price}</span>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                {tier.total_seats} seats available
              </p>
            </div>

            <div className="mt-4 flex items-center gap-5">
  {/* Rows Input */}
  <div className="w-1/2">
    <label className="block text-gray-700 text-sm font-medium mb-2">
      Rows:
    </label>
    <div className="relative">
      <input
        type="number"
        min="0"
        value={seatConfig[index].rows}
        onChange={(e) => {
          const value = parseInt(e.target.value) || 0;
          handleInputChange(index, 'rows', value);
          setRows(value);
          setTierIndex(index);
        }}
        className="border border-gray-300 rounded-full w-full py-3 px-4 shadow-md focus:ring-1 focus:ring-blue-200 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105 appearance-none" // Removed arrows with appearance-none
        placeholder="Enter number of rows"
      />
    </div>
  </div>

  {/* Columns Input */}
  <div className="w-1/2">
    <label className="block text-gray-700 text-sm font-medium mb-2">
      Columns:
    </label>
    <div className="relative">
      <input
        type="number"
        min="0"
        value={seatConfig[index].columns}
        onChange={(e) => {
          const value = parseInt(e.target.value) || 0;
          handleInputChange(index, 'columns', value);
          setRows(value);
        }}
        className="border border-gray-300 rounded-full w-full py-3 px-4 shadow-md focus:ring-1 focus:ring-primary focus:outline-none transition duration-300 ease-in-out transform hover:scale-105 appearance-none" // Removed arrows with appearance-none
        placeholder="Enter number of columns"
      />
    </div>
  </div>
</div>


            {/* Tier Title and Seat Matrix */}
            {seatConfig[index].rows > 0 && seatConfig[index].columns > 0 && (
              <div className="mt-8">
                {/* Tier Title */}
                <h5 className="text-center text-lg font-semibold text-gray-600 mb-4">
                  ---------------------------- {tier.name} ----------------------------
                </h5>

                {/* Seat Grid */}
                <div className="matrix-container mb-4">
                  {renderMatrix(index, seatConfig[index].rows, seatConfig[index].columns)}
                </div>

                <div className="flex justify-center mt-6">
  <button
    onClick={() => confirmLayout(index)}
    className="bg-primary text-white rounded-full py-3 px-8 shadow-lg hover:bg-primaryhover hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105"
  >
    Confirm Layout
  </button>
</div>

              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddSeatLayout;


