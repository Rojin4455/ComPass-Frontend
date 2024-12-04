import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IoSearchOutline } from "react-icons/io5";
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from "@reach/combobox";
import { FaLocationArrow } from "react-icons/fa6";
import { setLocation } from '../../../../slices/userLocationSlice';
import { useDispatch } from 'react-redux';
import { IoIosClose } from "react-icons/io";
import { setLoading } from '../../../../slices/userSlice';
import showToast from '../../../../utils/ToastNotifier';
import useAxiosInstance from '../../../../axiosConfig';
import '../../Profile/SidebarDetails/Bookings/cancelModal.css'




function LocationModal() {
    const { ready, value, setValue, suggestions: { status, data }, clearSuggestions } = usePlacesAutocomplete({});
    const location = useSelector((state) => state.location);
    const dispatch = useDispatch()
    const axiosInstance = useAxiosInstance()
    const user = useSelector((state) => state.user.user)





    // const fetchMovies = async () => {
    //   setLoading(true)
    //   try{
    //     const response = await axiosInstance.post(`movie/location-movies/`,{
    //       lat:location.lat,
    //       lng:location.lng
    //     })
    //     if (response.status === 200){
    //       console.log("movie response: ",response)
    //       dispatch(setLocation({isLocation:true,nowShowing:response.data.now_showing,upComing:response.data.upcoming,display:false}))
    //       // setNowShowing(response.data.now_showing)
    //       // setUpComing(response.data.upcoming)
    //       // setIsLocation(true)
    //     }else{
    //       console.error("error response: ",response)
    //       dispatch(setLocation({isLocation:false,nowShowing:response.data.now_showing,upComing:{},display:false}))

    //     }
    //   }catch(err){
    //     if (err.status === 404){
    //       // setIsLocation(false)
    //     //   dispatch(setLocation({isLocation:false}))
    //       dispatch(setLocation({nowShowing:err.response.data.data.now_showing,upComing:{},display:true, isLocation:false, display:false}))
    //       console.log("error: in directing banner",err)
    //       // setNowShowing(err.response.data.data.now_showing)
    //     } else if(err.status === 406){
    //       console.error("lat or lng is missing")
    //     }
    //   }
    //   setLoading(false)
    // }
    
    

    // useEffect(() => {

    //     const updateLocation = async () => {
    
        
    //     try{
    //       const response = axiosInstance.post('update-location/',{
    //         address:location.address,
    //         lat:location.lat,
    //         lng:location.lng
    //       })
    
    //       if (response.state === 200){
    //         console.log("response success: ",response)
    //       }else{
    //         console.error("error response: ",response)
    //       }
    
    //     }catch(err){
    //       console.log("Something went wrong in set user location")
    //     }
    //   }
    //   updateLocation()
    //   },[location])

    
    if (!location.showModal && !location.display) return null;

    

    const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions(); 
    
        try {
          const results = await getGeocode({ address });
          const { lat, lng } = await getLatLng(results[0]);


            // fetchMovies()



    setLoading(true)
      try{
        dispatch(setLocation({lat:lat,lng:lng,address:address,display:true}))
        const response = await axiosInstance.post(`movie/location-movies/`,{
          lat:lat,
          lng:lng,
          address:address
        })
        if (response.status === 200){
          console.log("movie response: ",response)
          dispatch(setLocation({isLocation:true,nowShowing:response.data.now_showing,upComing:response.data.upcoming,display:false}))
          // setNowShowing(response.data.now_showing)
          // setUpComing(response.data.upcoming)
          // setIsLocation(true)
        }else{
          console.error("error response: ",response)
          dispatch(setLocation({isLocation:false,nowShowing:response.data.now_showing,upComing:{},display:false}))

        }
      }catch(err){
        if (err.status === 404){
          // setIsLocation(false)
        //   dispatch(setLocation({isLocation:false}))
          dispatch(setLocation({nowShowing:err.response.data.data.now_showing,upComing:{}, isLocation:false, display:false}))
          console.log("error: in directing banner",err)
          // setNowShowing(err.response.data.data.now_showing)
        } else if(err.status === 406){
          console.error("lat or lng is missing")
        }
      }

      
      setLoading(false)






        //   const updateLocation = async () => {
    
        //     console.log("in Update location")
        //     try{
        //       const response = await axiosInstance.post('update-location/',{
        //         address:address,
        //         lat:lat,
        //         lng:lng
        //       })
        
        //       if (response.status === 200){
        //         console.log("response success: ",response)
        //         dispatch(setLocation({lat:lat,lng:lng,address:address,display:false}))
        //         showToast('success','Location Updated! ')
                
        //       }else{
        //         console.error("error response: ",response)
        //       }
        
        //     }catch(err){
        //       console.log("Something went wrong in set user location")
        //     }
        //   }
        //   if (user != null){
        //   updateLocation()
        //   }else{
        //     dispatch(setLocation({lat:lat,lng:lng,address:address,display:false}))
        //   }


          

          


            
        //   setTheaterData({
        //     ...theaterData,
        //     address: address,
        //     lat: lat,
        //     lng: lng,
        //   });
        } catch (error) {
          console.error("Error fetching geocode or lat/lng", error);
        }
      };


    const handleClose = () => {
        dispatch(setLocation({display:false}))
    }





  



    return (
        
        <div className="fixed bg-[#7e7e7e90] w-full h-screen flex justify-center items-center p-5 top-0 z-20">
  <div className="bg-white w-3/5 py-9 flex flex-col justify-around items-center relative animate-spring">
  {location.display && (
    <button
    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
    onClick={handleClose}
  >
    <IoIosClose size={35} />
  </button>
  )}
    <h1 className="font-semibold text-xl mb-4">SELECT YOUR CITY TO CONTINUE</h1>

    <div className="relative w-4/5 mb-6">
      <Combobox onSelect={handleSelect}>
        <div className="relative flex items-center w-full">
          <FaLocationArrow className="absolute left-3 text-gray-400" />
          <ComboboxInput
            className="pl-10 pr-4 py-3 h-12 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-primary focus:ring-primary transition duration-300 w-full" // Ensure it takes full width
            value={value || ""}
            onChange={(e) => setValue(e.target.value)}
            disabled={!ready}
            placeholder="Select Your Location"
          />
          
          {status === "OK" && (
            <ComboboxPopover className="absolute left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <ComboboxList className="max-h-48 overflow-y-auto w-full">
                {data.map(({ description, place_id }) => (
                  <ComboboxOption
                    key={place_id}
                    value={description}
                    className="p-2 border-b border-gray-100 last:border-none cursor-pointer hover:bg-gray-100"
                  />
                ))}
              </ComboboxList>
            </ComboboxPopover>
          )}
        </div>
      </Combobox>
    </div>

    <div className="flex flex-col text-center px-20 gap-6">
      <h2 className="font-semibold text-base">POPULAR CITIES</h2>
      <div className="grid grid-cols-4 gap-6">
        {['bengaluru.jpg', 'kochi.jpg', 'mumbai.avif', 'delhi.jpg', 'kolkata.jpg', 'chennai.avif', 'chandigrah.avif', 'hyderabad.jpg'].map((cityImg, index) => (
          <div key={index} className="relative group cursor-pointer"
          onClick={()=> handleSelect(cityImg.split('.')[0])}
          >
            <img src={`/assets/${cityImg}`} alt={cityImg.split('.')[0]} className="w-full h-24 object-cover rounded-lg" />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 rounded-lg"></div>
            <h4 className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white text-base font-medium opacity-90 group-hover:opacity-100">
              {cityImg.split('.')[0].charAt(0).toUpperCase() + cityImg.split('.')[0].slice(1)}
            </h4>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

    );

}

export default LocationModal;
