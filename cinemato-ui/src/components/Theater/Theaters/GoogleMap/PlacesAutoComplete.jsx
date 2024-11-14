import React from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from "@reach/combobox";
import { FaLocationArrow } from "react-icons/fa6";

// import { useLoadScript } from "@react-google-maps/api";

// const libraries = ["places"];  // Declare libraries as a constant outside the component to avoid re-render issues.

function PlacesAutoComplete({ setTheaterData, theaterData }) {
  const { ready, value, setValue, suggestions: { status, data }, clearSuggestions } = usePlacesAutocomplete({});
  // const { isLoaded } = useLoadScript({
  //   googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  //   libraries: libraries,  // Ensure libraries is not passed as a new array every time.
  // });

  // Handle address selection
  const handleSelect = async (address) => {
    setValue(address, false); // Set the input value
    clearSuggestions();  // Clear autocomplete suggestions

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);

      setTheaterData({
        ...theaterData,
        address: address,
        lat: lat,
        lng: lng,
      });
    } catch (error) {
      console.error("Error fetching geocode or lat/lng", error);
    }
  };

  // Early return if script isn't loaded yet
  if (!ready) {
    return <p>Loading Google Maps API...</p>;  // Show a loading message while the API is loading
  }

  return (
    <Combobox onSelect={handleSelect}>
      <div className='relative flex items-center'>
        <FaLocationArrow className="absolute left-3 text-gray-400" />
        <ComboboxInput
          className="pl-10 pr-4 py-2 w-full border-b h-10 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-primary focus:ring-primary transition duration-300"
          value={value || ""}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}  // Disable the input if the API isn't ready
          placeholder="Select Your Location"
        />
        {/* Render suggestions if available */}
        {status === "OK" && (
          <ComboboxPopover className="bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-50">
            <ComboboxList className="max-h-48 overflow-y-auto">
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
  );
}

export default PlacesAutoComplete;
