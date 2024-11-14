import React,{useState,useEffectß} from "react";
import { FiEdit3 } from "react-icons/fi";
import showToast from "../../../utils/ToastNotifier";
import useAxiosInstance from "../../../axiosConfig";
import { useSelector } from "react-redux";


export default function SnackDetailModal({ snack, onClose, setSnacks, snacks }) {
    const [isEditingPrice, setIsEditingPrice] = useState(false);
    const [isEditingStock, setIsEditingStock] = useState(false);
    const [newPrice, setNewPrice] = useState(snack.price);
    const [newStock, setNewStock] = useState(snack.stock);
    const axiosInstance = useAxiosInstance()
    const theaterId = useSelector((state)=> state.screendetails.theater)


    const handleSavePrice = async () => {
        if(newPrice){
            try{
                const response = await axiosInstance.post('theater/update-snack/',{
                    price:newPrice,
                    snack_id:snack.id,
                })
                if (response.status === 200){
                    console.log("success: ",response)
                    showToast('success','price Updated!')
                }else{
                    console.log("error resonse")
                    showToast('error',"something went wrong")
                }
            }catch(error){
                showToast('error',"something went wrong")
            }
        }      setIsEditingPrice(false);
    };

  
    const handleSaveStock =  async () => {
        if(newStock){
            try{
                const response = await axiosInstance.post('theater/update-snack/',{
                    stock:newStock,
                    snack_id:snack.id,
                })
                if (response.status === 200){
                    console.log("success: ",response)
                    showToast('success','quantity Updated!')
                }else{
                    console.log("error resonse")
                    showToast('error',"something went wrong")
                }
            }catch(error){
                showToast('error',"something went wrong")
            }
        }
    //   onSave({ ...snack, stock: newStock });
      setIsEditingStock(false);
    };


    const handleRemoveSnack = async () => {
            try{
                const response = await axiosInstance.delete(`theater/delete-snack/${snack.id}/`)
                if (response.status === 200){
                    console.log("success: ",response)
                    showToast('success','Snack is Removed!')
                    const snackId = snack.id
                    setSnacks(snacks.filter((snack) => snack.id != snackId))
                    onClose()
                }else{
                    console.error("error resonse", response)
                    showToast('error',"something went wrong")
                }
            }catch(error){
                console.error("error", error)
                showToast('error',"something went wrong")
            }
    }


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-80 p-6 shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          &times;
        </button>

        <img
          src={snack.image_url}
          alt={snack.name}
          className="w-full h-32 object-cover rounded-md mb-4"
        />

        <h2 className="text-lg font-bold">{snack.name}</h2>
        <p className="text-sm mt-2">{snack.description}</p>
        <p className="text-sm mt-2">Calories: {snack.calories}</p>
        {/* <p className="text-sm mt-2">Category: {snack.category_name}</p> */}
        <div className="flex items-center mt-2">
        <p className="text-sm">Price: </p>
        {isEditingPrice ? (
          <input
            type="number"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            className="ml-2 border rounded px-1 text-sm"
            onBlur={handleSavePrice} // Save on blur
          />
        ) : (
          <p className="ml-2 text-sm">{newPrice}</p>
        )}
        <FiEdit3
          className="ml-1 text-gray-600 cursor-pointer hover:text-gray-800"
          onClick={() => setIsEditingPrice(!isEditingPrice)}
        />
      </div>

      {/* Editable Stock */}
      <div className="flex items-center mt-2">
        <p className="text-sm">Stock: </p>
        {isEditingStock ? (
          <input
            type="number"
            value={newStock}
            onChange={(e) => setNewStock(e.target.value)}
            className="ml-2 border rounded px-1 text-sm"
            onBlur={handleSaveStock} // Save on blur
          />
        ) : (
          <p className="ml-2 text-sm">{newStock}</p>
        )}
        <FiEdit3
          className="ml-1 text-gray-600 cursor-pointer hover:text-gray-800"
          onClick={() => setIsEditingStock(!isEditingStock)}
        />
      </div>
        <div className="flex justify-between">
        <button
          className="mt-4 bg-primary text-sm text-white py-1 px-4 rounded-md hover:bg-primaryhover transition"
          onClick={onClose}
        >
          Close
        </button>

        <button
          className="mt-4 bg-danger text-sm text-white py-1 px-4 rounded-md hover:bg-red-700 transition"
          onClick={handleRemoveSnack}
        >
          Remove
        </button>
        </div>
      </div>
    </div>
  );
}
