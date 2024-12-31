import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoIosClose } from "react-icons/io";
import { FaLocationArrow } from "react-icons/fa6";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import Select from "react-select";
import { setLocation } from "../../../../slices/userLocationSlice";
import { setLoading } from "../../../../slices/userSlice";
import useAxiosInstance from "../../../../axiosConfig";

const LocationModal = () => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({});

  const location = useSelector((state) => state.location);
  const dispatch = useDispatch();
  const axiosInstance = useAxiosInstance();
  const user = useSelector((state) => state.user.user);

  if (!location.showModal && !location.display) return null;

  const handleSelect = async (selectedOption) => {
    const address = selectedOption.label;
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      
      dispatch(setLoading(true));

      try {
        dispatch(setLocation({ lat, lng, address, display: true }));

        const response = await axiosInstance.post(`movie/location-movies/`, {
          lat,
          lng,
          address,
        });

        if (response.status === 200) {
          dispatch(
            setLocation({
              isLocation: true,
              nowShowing: response.data.now_showing,
              upComing: response.data.upcoming,
              futureShowing: response.data.future_showings,
              display: false,
            })
          );
        } else {
          dispatch(
            setLocation({
              isLocation: false,
              nowShowing: response.data.now_showing,
              upComing: {},
              display: false,
            })
          );
        }
      } catch (err) {
        if (err.status === 404) {
          dispatch(
            setLocation({
              nowShowing: err.response.data.data.now_showing,
              upComing: {},
              isLocation: false,
              display: false,
            })
          );
        }
      }

      dispatch(setLoading(false));
    } catch (error) {
      console.error("Error fetching geocode or lat/lng", error);
    }
  };

  const handleClose = () => {
    dispatch(setLocation({ display: false }));
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      paddingLeft: "2.5rem",
      borderColor: "#d1d5db",
      minHeight: "48px",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#2563eb",
      },
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 50,
    }),
    container: (provided) => ({
      ...provided,
      width: '100%',
    }),
  };

  const options = status === "OK"
    ? data.map(({ description, place_id }) => ({
        label: description,
        value: place_id,
      }))
    : [];

  const cities = [
    "bengaluru", "kochi", "mumbai", "delhi", 
    "kolkata", "chennai", "chandigrah", "hyderabad"
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-xl animate-spring overflow-y-auto max-h-[90vh]">
        <div className="relative p-4 sm:p-6 md:p-8">
          {/* Close button */}
          {location.display && (
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
              onClick={handleClose}
              aria-label="Close modal"
            >
              <IoIosClose className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          )}

          {/* Header */}
          <h1 className="text-center font-semibold text-lg sm:text-xl md:text-2xl mb-6">
            SELECT YOUR CITY TO CONTINUE
          </h1>

          {/* Location Search */}
          <div className="w-full max-w-2xl mx-auto mb-8">
            <div className="relative flex items-center">
              <FaLocationArrow className="absolute left-3 text-gray-400 z-10" />
              <Select
                options={options}
                onChange={handleSelect}
                styles={customStyles}
                isDisabled={!ready}
                placeholder="Select Your Location"
                onInputChange={(inputValue) => setValue(inputValue)}
                className="w-full"
              />
            </div>
          </div>

          {/* Popular Cities */}
          <div className="px-4 sm:px-8 md:px-12">
            <h2 className="text-center font-semibold text-base md:text-lg mb-6">
              POPULAR CITIES
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {cities.map((city) => (
                <div
                  key={city}
                  className="relative group cursor-pointer rounded-lg overflow-hidden aspect-video sm:aspect-square transition-transform hover:scale-105"
                  onClick={() => handleSelect({ label: city, value: city })}
                >
                  <img
                    src={`/assets/${city}.${city === 'mumbai' || city === 'chennai' || city === 'chandigrah' ? 'avif' : 'jpg'}`}
                    alt={city}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent group-hover:from-black/90 transition-opacity" />
                  <h4 className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white text-sm sm:text-base font-medium text-center w-full px-2">
                    {city.charAt(0).toUpperCase() + city.slice(1)}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;