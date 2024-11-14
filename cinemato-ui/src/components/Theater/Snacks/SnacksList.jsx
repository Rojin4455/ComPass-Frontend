import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosInstance from '../../../axiosConfig';
import SnacksFilter from './SnacksFilter';
import { useSelector } from 'react-redux';
import showToast from '../../../utils/ToastNotifier';


function SnacksList() {
  const [snacks, setSnacks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const axiosInstance = useAxiosInstance();
  const snackContent = useSelector((state) => state.ownerscreen.snackContent)
  const theaterId = useSelector((state) => state.screendetails.theater)
  const [price, setPrice] = useState({})
  const [quantity, setQuantity] = useState({})
  const navigate = useNavigate();



  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        let response
        if(snackContent === 'owner'){
        response = await axiosInstance.get('theater/get-snack-category/')
        }else if(snackContent === 'theater'){
        response = await axiosInstance.get(`theater/theater/get-snack/${theaterId}/`)
        }
        if (response.status === 200) {
          console.log("success response: ", response.data);
          const categoryNames = response.data.data.map((category) => category.name);
          const snackItems = response.data.data.flatMap((category) =>
            category.snack_items.map((snack) => ({
              id: snack.id,
              name: snack.name,
              description: snack.description,
              is_vegetarian: snack.is_vegetarian,
              image_url: snack.image_url,
              calories: snack.calories,
              category_name: category.name,
            }))
          );

          setCategories(categoryNames);
          setSnacks(snackItems);
        } else {
          console.error("error response: ", response);
        }
      } catch (err) {
        console.log("something went wrong: ", err);
      }
    };
    fetchAllCategories();
  }, [selectedCategory, searchQuery]); // Correct dependency array syntax

  // Filter snacks based on category and search query
  const filteredSnacks = snacks.filter(
    (snack) =>
      (selectedCategory === "All" || snack.category_name === selectedCategory) &&
      snack.name.toLowerCase().includes(searchQuery.toLowerCase())

  );

  const onAddToTheater = async (snackId) => {
    if (price.snackId === snackId &&
      quantity.snackId === snackId &&
      price.price.trim() !== "" &&
      quantity.quantity.trim() !== "") {
      console.log("price: ", price, " quantity: ", quantity, "snackId: ", snackId)
      try{
        
        const response = await axiosInstance.post('theater/theater/add-snack/',{
          price:price.price,
          stock:quantity.quantity,
          snack_id:snackId,
          theater_id:theaterId
        })

        if (response.status === 201){
          console.log("added snacks to the theater side",response.data)
          const updatedSnacks = snacks.filter((snack) => snack.id !== response.data.snack_item.id)
          setSnacks(updatedSnacks)
          showToast('success', "Snack Added Successfully")
          
        }else{
          console.error('error response: ',response)
        }

      }catch(error){
        console.error("something went wrong", error)
      }
    }else{
      showToast("error","Data is Invalid")
    }
  }



  return (
    <div className="pt-24 p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Snack Inventory</h1>

      <SnacksFilter setSelectedCategory={setSelectedCategory} categories={categories} selectedCategory={selectedCategory} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />


      {/* Display Snacks or No Items Message */}
      {filteredSnacks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSnacks.map((snack, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-lg flex flex-col justify-between h-full">
              {/* Top Section - Snack Info */}
              <div>
                {snack.image_url && (
                  <img
                    src={snack.image_url}
                    alt={snack.name}
                    className="h-32 w-full object-cover rounded-lg mb-3"
                  />
                )}
                <div className="flex items-center mb-1">
                  <h3 className="text-lg font-semibold">{snack.name}</h3>
                  {/* Veg/Non-Veg Icon */}
                  <span
                    className={`ml-2 w-5 h-5 flex items-center justify-center rounded-sm border-2 ${snack.is_vegetarian ? 'border-green-500' : 'border-red-500'}`}
                    title={snack.is_vegetarian ? 'Vegetarian' : 'Non-Vegetarian'}
                  >
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${snack.is_vegetarian ? 'bg-green-500' : 'bg-red-500'}`}
                    ></span>
                  </span>
                </div>
                <p className="text-sm text-gray-500">Category: {snack.category_name}</p>
                <p className="mt-2 text-sm text-gray-700">{snack.description}</p>
                <p className="mt-2 text-sm">Calories: {snack.calories}</p>
                <p className="mt-1 text-sm">
                  Vegetarian: {snack.is_vegetarian ? 'Yes' : 'No'}
                </p>
              </div>

              {/* Bottom Section - Inputs */}
              {snackContent === 'theater' && (
                <div className="mt-4">
                  <input
                    type="number"
                    placeholder="Price"
                    className="w-full mb-2 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    onChange={(e) => setPrice({ price: e.target.value, snackId: snack.id })}
                  />
                  <input
                    type="number"
                    placeholder="Quantity"
                    className="w-full mb-2 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    onChange={(e) => setQuantity({ quantity: e.target.value, snackId: snack.id })}
                  />
                  <button
                    className="bg-primary text-white w-full py-2 rounded-md shadow-lg mt-2 transition-all duration-300 hover:bg-primaryhover"
                    onClick={() => onAddToTheater(snack.id)}
                  >
                    Add to Theater
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-20 text-xl">
          No snacks match your search criteria.
        </p>
      )}

    </div>
  );
}

export default SnacksList;
