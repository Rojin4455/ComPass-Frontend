import React, {useState} from 'react';
import { MdChair } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import AddSeatLayout from './AddSeatLayout';
import { setContent } from '../../../slices/OwnerScreenSlice';
import { useDispatch, useSelector } from 'react-redux';


const SeatLayoutDisplay = ({ screen }) => {
    const screensilce = useSelector((state) => state.screendetails.screen)
    console.log("scrteen slice: ",screensilce)
  const tiers = screensilce.tiers;
  console.log("tiers123: ", tiers)
  const dispatch = useDispatch()

  const selectedSeats = tiers.reduce((acc, tier) => {
    tier.seats.forEach(seat => {
      if (seat.is_available) {
        const rowIndex = parseInt(seat.row) - 1;
        const colIndex = seat.column - 1; 
        acc[`${rowIndex}-${colIndex}`] = true;
      }
    });
    return acc;
  }, {});
  

  const renderSeatLayout = (tier, startCharCode) => {
    const { rows, columns, seats } = tier;
    
    const seatMatrix = Array(rows).fill(null).map(() => Array(columns).fill(null));

    
    // Fill in the seating positions from the seat data
    seats.forEach((seat) => {
      const { row, column } = seat;
      seatMatrix[row - 1][column - 1] = seat; // row and column are 1-indexed in the seat data
    });

    return seatMatrix.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center mb-1 relative">
        {/* Seat row */}
        {row.map((seat, columnIndex) => (
          <div
            key={columnIndex}
            className={`w-8 h-8 m-1 flex items-center justify-center  rounded-lg transition-all duration-300
              ${seat ? 'bg-primary text-white border border-primary hover:shadow-lg hover:bg-secondary hover:text-white cursor-pointer' : 'bg-gray-100'}
              
            `}
          >
            {seat && (
              <>
                <MdChair className="text-secondary" size={28} />
                <span className="absolute text-xs text-primary mb-1.5">{seat.identifier.replace(/[A-Z]/g, '')}</span>
              </>
            )}
          </div>
        ))}
        {/* Move the row label to the rightmost side */}
        <div className="w-8 h-8 m-1 flex items-center justify-center absolute left-0">
            <h1 className="font-semibold text-gray-500 text-sm">
          {String.fromCharCode(startCharCode + rowIndex)} {/* Adjust row index to start from calculated letter */}
          </h1>
        </div>
      </div>
      
    ));
  };

  let currentCharCode = 65; // Starting from 'A'
  const [enableEdit, setEnableEdit] = useState(false)

  return (
    <>
    {enableEdit ? (
        <AddSeatLayout ogTiers={tiers} theaterId={screen.theater}  selectedSeats1={selectedSeats} setEnableEdit={setEnableEdit} />
    ):(
        <div className="screen-layout-section p-6 bg-gray-100 rounded-md shadow-lg">

        
        <button className='ml-auto flex text-sm items-center bg-primary hover:bg-primaryhover text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out w-[13%]'
        onClick={(() => {setEnableEdit(true);    dispatch(setContent({ subContent: "add-seat1" }))}   )}
        >
  <FaRegEdit className="mr-2" /> Edit layout
</button>

    {/* Unified seat layout */}
    <div className="flex flex-col">
      {tiers.map((tier, index) => {
        const startCharCode = currentCharCode;
        currentCharCode += tier.rows; // Update for the next tier
  
        return (
            <div key={index} className="mb-4">

            {/* Small title above each tier */}
            <h4 className="text-xs font-semibold text-gray-500 left-0">
              ₹{Math.round(tier.price)} {tier.name.toUpperCase()}
            </h4>
            <div className="my-4 w-full border-t border-gray-300"></div>

            {/* Seat layout grid */}
            <div className="seat-grid bg-gray-100 p-4 rounded-md">
              {renderSeatLayout(tier, startCharCode)}
            </div>
      
          </div>
        );
    })}
    </div>
  
    {/* Screen representation at the bottom */}
    <div className="relative w-2/3 h-5 bg-gray-900 text-white flex items-center justify-center rounded-b-full shadow-lg mx-auto mt-8">
      {/* Light yellow gradient outside the screen */}
      <div className="absolute -inset-3 bg-gradient-to-t from-transparent to-yellow-100 rounded-b-full opacity-70 blur-sm"></div>
  
      {/* Screen title below the curve */}
      <h2 className="absolute -bottom-6 text-xs font-semibold text-gray-800 px-3 py-1">
        All eyes on this way please!
      </h2>
    </div>
  </div>
    )}
    </>
    
  
  );
};

export default SeatLayoutDisplay;
