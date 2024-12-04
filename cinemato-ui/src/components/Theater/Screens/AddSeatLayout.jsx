import React, { useState } from 'react';
import { FaIndianRupeeSign } from "react-icons/fa6";
import { IoChevronBackOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { setContent } from '../../../slices/OwnerScreenSlice';
import { MdChair } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import useAxiosInstance from '../../../axiosConfig';
import showToast from '../../../utils/ToastNotifier';
import { setScreen as setScreenAction } from '../../../slices/screenFullDetailsSlice';
import StatusButton from '../../Common/StatusButton';
// import fetchTheaterDetails from '../../../utils/fetchScreenDetails';




const AddSeatLayout = ({ ogTiers, theaterId, selectedSeats1 , setEnableEdit}) => {

    const [tiers,setTiers] = useState(ogTiers)
    const dispatch = useDispatch();
    
  const [seatConfig, setSeatConfig] = useState(
    tiers.map((tier) => ({ rows: tier.rows || 0, columns: tier.columns || 0 }))
  );
  let startCharCode = 65;


  const screenData = useSelector((state) => state.screendetails)
  // console.log("screen DataL :",screenData)
  // console.log("tier Data in seat layout: ",tiers)
  // console.log("this is selected seats: ",selectedSeats1)



  const axiosInstance = useAxiosInstance()
//   const [columns,setColumns] = useState("")
//   const [rows,setRows] = useState("")
//   const [tierIndex,setTierIndex] = useState("")


  

//   const [rowsColumns, setRowsColumns] = useState({})

const [selectedSeats, setSelectedSeats] = useState(() => {
    return tiers.map((tier) => {
      const seatsMap = {};
      tier.seats.forEach((seat) => {
        const seatKey = `${seat.row - 1}-${seat.column - 1}`; // Adjusting for zero-based indexing
        seatsMap[seatKey] = seat.is_available;
      });
      return seatsMap;
    });
  });

  const handleInputChange = (index, field, value) => {
    const updatedConfig = [...seatConfig];
    updatedConfig[index][field] = value;
    setSeatConfig(updatedConfig);
  };

  const toggleSeatSelection = (tierIndex, rowIndex, colIndex) => {
    const updatedSeats = { ...selectedSeats[tierIndex] };
    const seatKey = `${rowIndex}-${colIndex}`;

    if (updatedSeats[seatKey]) {
      delete updatedSeats[seatKey]; 
    } else {
      updatedSeats[seatKey] = true; 
    }

    const updatedSelectedSeats = [...selectedSeats];
    updatedSelectedSeats[tierIndex] = updatedSeats;
    if (Object.keys(updatedSelectedSeats[tierIndex]).length === tiers[tierIndex].total_seats+1){
        showToast("error","seat limit is exceeded")
        return
    } 
    setSelectedSeats(updatedSelectedSeats);
  };
  const getSortedSeatIdentifiers = (selectedSeats, tierIndex, allSeats) => {
    // console.log('Tier index:', tierIndex);
    // console.log("this is selected seats: ",allSeats)
    let count = 0;
    let rowSet = new Set();

    for (let i = 0; i < tierIndex; i++) {

      // Iterate through each object in the selectedSeats array
          // For each seat key (like '0-0', '0-1'), extract the row number (part before the hyphen)
          Object.keys(allSeats[i]).forEach(seatKey => {
              const row = seatKey.split('-')[0];
              rowSet.add(row); // Add the row to the set to keep it unique
          });
  
      
    }

    // console.log("Final count:", rowSet.size);
    

      const seatEntries = Object.keys(selectedSeats)
      .map((key) => {
          const [row, col] = key.split('-').map(Number);
          return { row, col, key };
        })
        .sort((a, b) => {
            if (a.row === b.row) return a.col - b.col;
            return a.row - b.row;
        });

        // console.log("count count count: ",count)

    const seatCounter = {};
    

    return seatEntries.map((entry) => {
      const rowIdentifier = String.fromCharCode(65 + entry.row+rowSet.size);
      // console.log("row identifier: ",rowIdentifier)
      // console.log("seat counter: ",seatCounter)
      if (!seatCounter[rowIdentifier]) {
        seatCounter[rowIdentifier] = 1;
      }
    
      const seatIdentifier = `${rowIdentifier}${seatCounter[rowIdentifier]}`;
      // console.log("seat identifier: ",seatIdentifier)
      seatCounter[rowIdentifier]++;
    
      return { ...entry, seatIdentifier };
    });
  } ;

  const renderMatrix = (tierIndex, rows, columns) => {
    // console.log("selected seats:   ",selectedSeats)
    const sortedSeats = getSortedSeatIdentifiers(selectedSeats[tierIndex], tierIndex,selectedSeats);
    console.log("this is sorted seats",sortedSeats)
    const matrix = [];
  
    for (let t = 0; t < tierIndex; t++) {
      startCharCode += seatConfig[t].rows;
    }
  


    for (let i = 0; i < rows; i++) {
      const row = [];
      
      const rowIdentifier = String.fromCharCode(startCharCode + i);
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
  

  
  const confirmLayout = async (tierIndex) => {
    const rows = seatConfig[tierIndex].rows;
    const columns = seatConfig[tierIndex].columns; 



    const TotalRowsUpToIndex = seatConfig.slice(0, tierIndex).reduce((sum, config) => sum + config.rows, 0)

  const fullLayout = [];

  let count = 0;

  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    let seatNumber = 1;

    let rowSet = new Set();

    for (let i = 0; i < tierIndex; i++) {

      // Iterate through each object in the selectedSeats array
          // For each seat key (like '0-0', '0-1'), extract the row number (part before the hyphen)
          Object.keys(selectedSeats[i]).forEach(seatKey => {
              const row = seatKey.split('-')[0];
              rowSet.add(row); // Add the row to the set to keep it unique
          });
  
      
    }



    for (let colIndex = 0; colIndex < columns; colIndex++) {
      const seatKey = `${rowIndex}-${colIndex}`;
      const isSelected = selectedSeats[tierIndex][seatKey] || false; 
      if (isSelected) {
        const rowIdentifier = String.fromCharCode(65 + rowIndex + TotalRowsUpToIndex); 
        const seatIdentifier = `${rowIdentifier}${seatNumber}`; 
        count = count + 1
        fullLayout.push({
          row: rowIndex + 1,      
          column: colIndex + 1,        
          identifier: seatIdentifier, 
          is_available: true,        
        });

        seatNumber++; 
      } else {
        fullLayout.push({
          row: rowIndex + 1,  
          column: colIndex + 1,  
          identifier: null,   
          is_available: false, 
        });
      }
    }
  }

  // console.log("sorted seats: ",sortedSeats)
  // console.log("full layout: ",fullLayout)
  // console.log("tiers: ",tiers)
  const payload = {
    theaterId,
    tierFullDetails: tiers[tierIndex],
    seatLayout: fullLayout, 
    grid_rows:rows,
    grid_columns:columns,
    activeSeatCount:count
    
  };

  // console.log('Confirming seat layout:', payload);


  try{
    const response = await axiosInstance.post('screen/add-tier-layout/',{
        payload
    })
    if ([200,201,202,204].includes(response.status)){
        showToast('success','Seat layout saved successfully!')
        // fetchTheaterDetails()
        dispatch(setScreenAction({screen:response.data.data}))
    }else{
        showToast('error',"something went wrong")
    }

    
  }catch(error){
    console.error("error", error)
  }

   
  };
  
  const [seatCounts, setSeatCounts] = useState(tiers.map((tier) => tier.total_seats));
  const [editingIndex, setEditingIndex] = useState(null); 



  const handleEditClick = (index) => {
    setEditingIndex(index); // Enable editing for the specific tier
  };

  const handleSave = async (index) => {
    try {
      const response = await axiosInstance.put(
        `screen/edit-seatcount/${tiers[index].id}/`,
        { total_seats: seatCounts[index] }
      );
      const updatedTiers = tiers.map((tier,i) => 
        i === index ? {...tier, total_seats: parseInt(seatCounts[index])} : tier
      )

      setTiers(updatedTiers);
      showToast('success',"seats are updated")
      setEditingIndex(null);
    } catch (error) {
      console.error('Error updating seat count:', error);
    }
  };

  const handleChange = (e, index) => {
    const updatedSeats = [...seatCounts]; 
    updatedSeats[index] = e.target.value;
    setSeatCounts(updatedSeats); 
  };
  return (
    <div className="tiers-info grid grid-cols-1 gap-6">
      <div className="flex items-center mb-4 gap-0.5 cursor-pointer"
        onClick={() => dispatch(setContent({ subContent: " " }))}>
        <IoChevronBackOutline
          size={15}
          className="text-gray-700 cursor-pointer hover:text-primary transition"
          onClick={() => {setEnableEdit !== null ? setEnableEdit(false) : console.log("not enable edit")}}
        />
        <h1 className="text-sm font-bold text-gray-800">Back</h1>
      </div>

      {tiers.map((tier, index) => (
        <div
          key={index}
          className="tier-card bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6"
          
        >



          <div className="tier-details">
         



                    <h4 className="text-2xl font-bold text-gray-800 mb-3 flex items-center justify-between">
                    {tier.name}
                    <div className="flex items-center gap-2">
                      {editingIndex === index ? (
                        <input
                          type="number"
                          value={seatCounts[index]} 
                          onChange={(e) => handleChange(e, index)} 
                          className="ml-2 bg-[#fdf8e1] text-primary text-sm px-3 py-1 rounded-full w-20"
                          onBlur={(e) => handleSave(index)} 
                          min="1"
                        />
                      ) : (
                        <span className="ml-2 bg-[#fdf8e1] text-primary text-sm px-3 py-1 rounded-full">
                          {seatCounts[index]} seats
                        </span>
                      )}
                      <FaRegEdit
                        className="cursor-pointer text-primary"
                        size={17}
                        onClick={() => handleEditClick(index)}
                      />
                    </div>
                  </h4>




  

            <div className="text-lg">
              <div className="mb-2 flex items-center text-gray-700">
                <span className="font-semibold mr-2">Price:</span>
                <div className="flex items-center gap-0.5">
                  <FaIndianRupeeSign size={15} className="text-secondary" />
                  <span className="font-bold text-gray-500">{tier.price}</span>
                </div>
              </div>
              <p className="text-green-800 text-sm">
                <span className='font-extrabold'>{tier.total_seats-Object.keys(selectedSeats[index]).length}</span> seats available to add
              </p>
            </div>

            <div className="mt-4 flex items-center gap-5">



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
        //   setRows(value);
        //   setTierIndex(index);
        }}
        className="border border-gray-300 rounded-full w-full py-3 px-4 shadow-md focus:ring-1 focus:ring-blue-200 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105 appearance-none" // Removed arrows with appearance-none
        placeholder="Enter number of rows"
      />
    </div>
  </div>

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
        //   setRows(value);
        }}
        className="border border-gray-300 rounded-full w-full py-3 px-4 shadow-md focus:ring-1 focus:ring-primary focus:outline-none transition duration-300 ease-in-out transform hover:scale-105 appearance-none" // Removed arrows with appearance-none
        placeholder="Enter number of columns"
      />
    </div>
  </div>
</div>


            {seatConfig[index].rows > 0 && seatConfig[index].columns > 0 && (
              <div className="mt-8">
                <h5 className="text-center text-lg font-semibold text-gray-600 mb-4">
                  ---------------------------- {tier.name} ----------------------------
                </h5>

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