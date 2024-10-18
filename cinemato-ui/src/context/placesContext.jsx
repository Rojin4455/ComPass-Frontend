import React, { createContext, useState } from 'react'
import { useContext } from 'react'
import { useLoadScript } from "@react-google-maps/api";


export const PlacesContext = createContext()


const libraries = ["places"];
function PlacesContextFunction({children}) {



    const { isLoaded } = useLoadScript({
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
      libraries: libraries,
    });
    console.log('isloded',isLoaded);
const [placesIsLoaded,setPlacesIsLoaded] = useState(isLoaded)
  


  return (
    <PlacesContext.Provider value={isLoaded}>
        {children}
    </PlacesContext.Provider>
  )
}

export default PlacesContextFunction