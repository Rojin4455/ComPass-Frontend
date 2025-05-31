import React, { useState, useEffect } from 'react';
// import { IoIosAddCircleOutline } from "react-icons/io";
import { CiCircleMinus,CiCirclePlus  } from "react-icons/ci";
import { setBooking } from '../../../slices/userBookingSlice';
import { useDispatch, useSelector } from 'react-redux';



function LeftSnacksList({ categories, snacks }) {
    const [selectedSnacks, setSelectedSnacks] = useState(snacks)
    const [selectedCategory, setSelectedCategory] = useState("All")
    // const [addedSnacks, setAddedSnacks] = useState([]);
    // const [quantities, setQuantities] = useState({});
    const {quantities,addedSnacks} = useSelector((state) => state.booking)
    const dispatch = useDispatch()

    useEffect(() => {
        setSelectedSnacks(snacks);
    }, [snacks]);
    const handleCategoryItems = (catId) => {
        if (!catId) {
            setSelectedSnacks(snacks)
            setSelectedCategory("All")
        } else {
            const snackItems = snacks.filter((snack) => snack.category.id === catId)
            setSelectedSnacks(snackItems)
            const cat = uniqueCategories.filter((category) => category.id === catId)
            setSelectedCategory(cat[0].name)
        }
    }






    const handleAddClick = (snack) => {
        dispatch(setBooking({
            addedSnacks: [...addedSnacks, snack],
            quantities: { ...quantities, [snack.id]: 1 }
        }));
    };
    
    const increment = (snackId) => {
        dispatch(setBooking({
            quantities: {
                ...quantities,
                [snackId]: (quantities[snackId] || 0) + 1
            }
        }));
    };

    const decrement = (snackId) => {
        const newQuantity = (quantities[snackId] || 0) - 1;
    
        if (newQuantity <= 0) {
            // Remove snack if quantity is 0 or less
            const updatedSnacks = addedSnacks.filter((snack) => snack.id !== snackId);
            const { [snackId]: _, ...updatedQuantities } = quantities;
            
            dispatch(setBooking({
                addedSnacks: updatedSnacks,
                quantities: updatedQuantities
            }));
        } else {
            // Update quantity if still above 0
            dispatch(setBooking({
                quantities: { ...quantities, [snackId]: newQuantity }
            }));
        }
    };
    console.log("categoru id in drerere: ", categories)
    const uniqueCategories = Array.from(
        new Map(categories.map(cat => [cat.id, cat])).values()
      );
    
    return (
        <div className="flex flex-col items-center space-y-4">
    <div className="flex items-center gap-2">
        <h1 style={{ fontFamily: "Montserrat" }} className="text-2xl font-semibold">
            Grab a
        </h1>
        <h1 style={{ fontFamily: "Montserrat" }} className="text-2xl font-semibold text-yellow-600">
            Bite!
        </h1>
    </div>
    <p className="text-sm text-gray-600">Choose your favorite snacks</p>

    <div className="flex space-x-2">
        {uniqueCategories.map((category, index) => (
            <div
                key={index}
                className={`px-2 py-0.5 border border-gray-400 rounded-full cursor-pointer text-xs ${
                    category.name === selectedCategory
                        ? "bg-secondary text-gray-700"
                        : "text-gray-600 hover:bg-secondary hover:text-gray-600"
                }`}
                onClick={() => handleCategoryItems(category.id)}
            >
                {category.name}
            </div>
        ))}
    </div>

    <div className="overflow-y-auto h-96 w-full">
        {selectedSnacks.length === 0 ? (
            <div className="flex items-center justify-center h-full">
                <p className="text-gray-500 text-md font-medium">No snacks are available.</p>
            </div>
        ) : (
            <div
                className="grid gap-4"
                style={{
                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(300px, 1fr))",
                }}
            >
                {selectedSnacks.map((snack, index) => {
                    const quantity = quantities[snack.id] || 0;
                    const isAdded = addedSnacks.some((s) => s.id === snack.id);

                    return (
                        <div
                            key={index}
                            className="p-6 border rounded-lg flex items-center space-x-4 hover:shadow-lg transition-shadow duration-300 ease-in-out bg-white"
                        >
                            <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                                <img
                                    src={snack.image_url}
                                    alt={`Snack ${index + 1}`}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </div>

                            <div className="flex-1 overflow-hidden">
                                <h4 className="text-lg font-semibold text-gray-800 truncate">
                                    {snack.name}
                                </h4>
                                <p className="text-sm text-gray-500 truncate w-full overflow-hidden">
                                    {snack.description}
                                </p>
                                <p className="text-md font-bold text-gray-700 mt-1">
                                    ₹{parseFloat(snack.price).toFixed(2)}
                                </p>
                            </div>

                            {isAdded && quantity > 0 ? (
                                <div className="flex items-center space-x-2">
                                    <CiCircleMinus
                                        size={25}
                                        onClick={() => decrement(snack.id)}
                                        className="text-primary cursor-pointer"
                                    />
                                    <span className="text-md font-semibold text-gray-800">
                                        {quantity}
                                    </span>
                                    <CiCirclePlus
                                        size={25}
                                        onClick={() => increment(snack.id)}
                                        className="text-primary cursor-pointer"
                                    />
                                </div>
                            ) : (
                                <button
                                    onClick={() => handleAddClick(snack)}
                                    className="bg-white hover:bg-primary border hover:text-white border-primary text-primary text-sm font-semibold px-4 py-1 rounded-lg transition-colors duration-300 ease-in-out shadow-md"
                                >
                                    Add
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        )}
    </div>
</div>

    );
}

export default LeftSnacksList;
