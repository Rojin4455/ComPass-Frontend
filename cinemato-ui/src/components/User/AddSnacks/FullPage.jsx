import React, { useEffect, useState } from "react"
import TopBar from "./TopBar"
import LeftSnacksList from "./LeftSnacksList"
import RightPriceDetails from "./RightPriceDetails"
import Header from "../Home/Header/Header"
import MainLayout from "../MainLayout"
import useAxiosInstance from "../../../axiosConfig"
import { useSelector } from "react-redux"

function FullPage() {
  const [snacks,setSnacks] = useState([])
  const [categories, setCategories] = useState([])
  const axiosInstance = useAxiosInstance()
  const theaterId = useSelector((state) => state.booking.selectedTheater)
  const selectedMovie = useSelector((state) => state.booking.selectedMovie)
  

  useEffect(() => {
    const fetchAddedSnacks = async () => {
      try{
        const response = await axiosInstance.get(`booking/get-added-snack/${theaterId.id}/`)
        if (response.status === 200) {
          console.log('success response: ',response)

          const snackItems = response.data.data.flatMap((item) => ({
            id: item.id,
            name: item.snack_item.name,
            description: item.snack_item.description,
            is_vegetarian: item.snack_item.is_vegetarian,
            image_url: item.snack_item.image_url,
            calories: item.snack_item.calories,
            category_name: item.snack_item.category_name,
            price: item.price,
            stock: item.stock,
            category:item.snack_item.category
          }));



          const snackCategories = Array.from(
            new Set(response.data.data.flatMap((item) => ({
              name: item.snack_item.category.name,
              id: item.snack_item.category.id,
            })))
          );



          snackCategories.splice(0,0,{name:"All",id:null})
          

          setCategories(snackCategories)

          setSnacks(snackItems)

        }else{
          console.error("error response: ",response)
        }
      }catch(error){
        console.error("something went wrong: ",error)
      }
  }

  fetchAddedSnacks()
  },[])



    return (
      <MainLayout>
      <div className="w-full flex flex-col">
        <TopBar title={selectedMovie.title}/>
  
        <div className="flex flex-1 overflow-hidden mt-[6rem]">
          <div className="flex-1 p-4 ">
            <LeftSnacksList categories={categories} snacks={snacks} />
          </div>
  
          <div className="w-1/3 p-4 bg-500">
            <RightPriceDetails movie={selectedMovie} />
          </div>
        </div>
      </div>
      </MainLayout>
    )
  }
  
  export default FullPage