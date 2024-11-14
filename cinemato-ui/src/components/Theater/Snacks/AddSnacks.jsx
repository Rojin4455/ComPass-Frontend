import React, { useEffect, useState } from 'react';
import useAxiosInstance from '../../../axiosConfig';
import { useSelector } from 'react-redux';
import { IoChevronBackOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';


function AddSnacks() {
  // State for managing categories, snacks, and validation errors
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [snacks, setSnacks] = useState([]);
  const axiosInstance = useAxiosInstance()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const [newSnack, setNewSnack] = useState({
    name: '',
    image: null,
    description: '',
    category: '',
    is_veg: false,
    calories: ''
  });
  const [errors, setErrors] = useState({});


  useEffect(() => {
    const fetchAllCategories = async () => {
      try{  
        const response = await axiosInstance.get('theater/get-snack-category/')
        if (response.status === 200){
          console.log("success response: ",response.data)
          const categoryNames = response.data.data.map((category) => category.name)
          const snackItems = response.data.data.flatMap((category) =>
            category.snack_items.map((snack) => ({
              id: snack.id,
              name: snack.name,
              description: snack.description,
              is_vegetarian: snack.is_vegetarian,
              image_url: snack.image_url,
              calories: snack.calories,
              category_name: category.name, // Use category name for reference
            }))
          );       
            setCategories(categoryNames)
            setSnacks(snackItems)
          setNewCategory('');
          setErrors((prevErrors) => ({ ...prevErrors, category: null }));


        }else{
          console.error("error response: ",response)
        }
      }catch(err){
        console.log("something went wrong: ",err)
      }


    }
    fetchAllCategories()
  },[])




  // Validate category name
  const validateCategory = () => {
    if (!newCategory.trim()) return "Category name is required.";
    if (newCategory.length < 3) return "Category name should be at least 3 characters.";
    return null;
  };

  // Function to add a new category with validation
  const addCategory = async () => {
    const categoryError = validateCategory();
    if (categoryError) {
      setErrors((prevErrors) => ({ ...prevErrors, category: categoryError }));
    } else {
      try{  
        const response = await axiosInstance.post('theater/add-snack-category/',{
          category_name:newCategory,
          
        })
        if (response.status === 201){
          setCategories([...categories, newCategory.trim()]);
          setNewCategory('');
          setErrors((prevErrors) => ({ ...prevErrors, category: null }));


        }else{
          console.error("error response: ",response)
        }
      }catch(err){
        console.log("something went wrong: ",err)
      }
    }
  };

  const validateSnack = () => {
    const snackErrors = {};
    if (!newSnack.name.trim()) snackErrors.name = "Snack name is required.";
    if (newSnack.name.length < 3) snackErrors.name = "Snack name should be at least 3 characters.";

    if (!newSnack.category) snackErrors.category = "Category is required.";
    if (!newSnack.calories) {
      snackErrors.calories = "Calories are required.";
    } else if (isNaN(newSnack.calories) || newSnack.calories <= 0) {
      snackErrors.calories = "Please enter a valid calorie count greater than 0.";
    }


    if (!newSnack.image) {
      snackErrors.image = "Image is required.";
    } else if (!newSnack.image.type.startsWith("image/")) {
      snackErrors.image = "Please upload a valid image file.";
    }

    return snackErrors;
  };

  const addSnack = async () => {
    const snackErrors = validateSnack();
    if (Object.keys(snackErrors).length > 0) {
      setErrors(snackErrors);
    } else {

      try {
        console.log("new snack: ", newSnack);
      
        const formData = new FormData();
        formData.append('name', newSnack.name);
        formData.append('description', newSnack.description);
        formData.append('category', newSnack.category);
        formData.append('is_vegetarian', newSnack.is_veg);
        formData.append('calories', newSnack.calories);
        formData.append('image', newSnack.image);
        console.log("new snack: ",newSnack)
        const response = await axiosInstance.post('theater/owner/add-snack/', formData);
      
        if (response.status === 201) {
          console.log("Snack created successfully: ", response.data);
        } else {
          console.error("Error response: ", response);
        }
      } catch (error) {
        console.error("Something went wrong", error);
      }
      


      setSnacks([...snacks, newSnack]);
      setNewSnack({ name: '', image: null, category: '', is_veg: false, calories: '' });
      setErrors({});
    }


  };

  // Handle image upload
  const handleImageChange = (e) => {
    setNewSnack({ ...newSnack, image: e.target.files[0] });
  };

console.log("snacks::::",snacks)
  return (
    <div className="pt-24 p-6 max-w-4xl mx-auto">

      <h1 className="text-3xl font-bold mb-6 text-center">Snack Management - Main Owner</h1>

      {/* Add Category Section */}
      <div className="mb-8 bg-gray-100 p-4 rounded-lg shadow">
      <div className="flex items-center mb-4 gap-0.5 cursor-pointer"
        onClick={() => navigate('/owner/snacks-list/')}>
        <IoChevronBackOutline
          size={15}
          className="text-gray-700 cursor-pointer hover:text-primary transition"
        />
        <h1 className="text-sm font-bold text-gray-800">Back</h1>
      </div>
        <h2 className="text-xl font-semibold mb-4">Add Snack Category</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Enter Category Name"
            className="border p-2 rounded w-2/3"
            value={newCategory}
            onChange={(e) => {
              setNewCategory(e.target.value);
              if (errors.category) setErrors((prevErrors) => ({ ...prevErrors, category: null }));
            }}
          />
          <button
            className="bg-primary text-white p-2 rounded w-1/3 hover:bg-primaryhover"
            onClick={addCategory}
          >
            Add Category
          </button>
        </div>
        {errors.category && <p className="text-red-500 mt-2">{errors.category}</p>}
      </div>

      {/* Add Snack Section */}
      <div className="mb-8 bg-gray-100 p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Add Snack Item</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Snack Name"
            className="border p-2 rounded w-full"
            value={newSnack.name}
            onChange={(e) => {
              setNewSnack({ ...newSnack, name: e.target.value });
              if (errors.name) setErrors((prevErrors) => ({ ...prevErrors, name: null }));
            }}
          />
          {errors.name && <p className="text-red-500 mt-1">{errors.name}</p>}

          <select
            className="border p-2 rounded w-full"
            value={newSnack.category}
            onChange={(e) => {
              setNewSnack({ ...newSnack, category: e.target.value });
              if (errors.category) setErrors((prevErrors) => ({ ...prevErrors, category: null }));
            }}
          >
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 mt-1">{errors.category}</p>}

          <input
            type="number"
            placeholder="Calories"
            className="border p-2 rounded w-full"
            value={newSnack.calories}
            onChange={(e) => {
              setNewSnack({ ...newSnack, calories: e.target.value });
              if (errors.calories) setErrors((prevErrors) => ({ ...prevErrors, calories: null }));
            }}
          />
          {errors.calories && <p className="text-red-500 mt-1">{errors.calories}</p>}

          <div className="flex items-center gap-2">
            <label className="font-medium">Vegetarian:</label>
            <input
              type="checkbox"
              checked={newSnack.is_veg}
              onChange={(e) => setNewSnack({ ...newSnack, is_veg: e.target.checked })}
            />
          </div>

          <textarea
            placeholder="Snack Description"
            className="border p-2 rounded w-full col-span-2"
            rows="3"
            value={newSnack.description}
            onChange={(e) => {
              setNewSnack({ ...newSnack, description: e.target.value });
              // if (errors.description) setErrors((prevErrors) => ({ ...prevErrors, description: null }));
            }}
          />
          {/* {errors.description && <p className="text-red-500 mt-1">{errors.description}</p>} */}

          <div className="col-span-2">
  <label className="block mb-2 font-medium">Upload Snack Image:</label>
  <div
    className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center relative cursor-pointer hover:border-blue-500 transition-colors"
    onClick={() => document.getElementById("image-upload").click()}
  >
    {newSnack.image ? (
      <img
        src={URL.createObjectURL(newSnack.image)}
        alt="Uploaded preview"
        className="h-32 w-full object-cover rounded-lg"
      />
    ) : (
      <div className="text-center">
        <svg
          className="w-10 h-10 mx-auto text-gray-400 mb-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 3v18h18V3H3zm4 4h10M9 13h6m-6 4h6"
          />
        </svg>
        <p className="text-sm text-gray-500">click to upload</p>
      </div>
    )}
    <input
      type="file"
      id="image-upload"
      className="hidden"
      onChange={handleImageChange}
    />
  </div>
  {errors.image && <p className="text-red-500 mt-1">{errors.image}</p>}
</div>

        </div>
        <button
          className="bg-primary text-white p-2 mt-4 rounded w-full hover:bg-primaryhover"
          onClick={addSnack}
        >
          Add Snack Item
        </button>
      </div>

 {/* Display Categories */}
<div className="mb-8">
  <h2 className="text-xl font-semibold mb-4 text-gray-700">Categories</h2>
  <div className="flex flex-wrap gap-3 bg-white p-4 rounded-lg shadow-md">
    {categories.length > 0 ? (
      categories.map((category, index) => (
        <div
          key={index}
          className="bg-yellow-100 text-yellow-700 font-medium px-4 py-1.5 rounded-full shadow-sm hover:bg-yellow-200 transition duration-200"
        >
          {category}
        </div>
      ))
    ) : (
      <p className="text-gray-500">No categories added yet.</p>
    )}
  </div>
</div>


      {/* Display Snacks */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Snack Items</h2>
        {snacks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {snacks.map((snack, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow">
                {snack.image_url&& (
                  <img
                    src={snack.image_url}
                    alt={snack.name}
                    className="h-32 w-full object-cover rounded-lg mb-2"
                  />
                )}
                <h3 className="text-lg font-semibold">{snack.name}</h3>
                <p className="text-sm text-gray-500">Category: {snack.category}</p>
                <p className="text-sm text-gray-500">Calories: {snack.calories}</p>
                <p className="text-sm text-gray-500">{snack.is_veg ? 'Vegetarian' : 'Non-Vegetarian'}</p>
                <p className="text-sm mt-2">{snack.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No snack items added yet.</p>
        )}
      </div>
    </div>
  );
}

export default AddSnacks;
