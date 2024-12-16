import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoIosClose } from "react-icons/io";
import { FaLocationArrow } from "react-icons/fa6";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import Select from "react-select";
import { setLocation } from "../../../../slices/userLocationSlice";
import { setLoading } from "../../../../slices/userSlice";
import useAxiosInstance from "../../../../axiosConfig";
import showToast from "../../../../utils/ToastNotifier";
import "../../Profile/SidebarDetails/Bookings/cancelModal.css";

function LocationModal() {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({});

  console.log("something is triggered")
  console.log('Full Environment:', process.env);

  console.log('Backend URL:', process.env.REACT_APP_BASE_API_URL);



  const location = useSelector((state) => state.location);
  const dispatch = useDispatch();
  const axiosInstance = useAxiosInstance();
  const user = useSelector((state) => state.user.user);

  if (!location.showModal && !location.display) return null;

  // Handle selection from react-select dropdown
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
        } else if (err.status === 406) {
          console.error("Latitude or Longitude is missing.");
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
      paddingLeft: "2.5rem", // Space for the icon
      borderColor: "#d1d5db",
      height: "48px",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#2563eb",
      },
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 50,
    }),
  };

  const options =
    status === "OK"
      ? data.map(({ description, place_id }) => ({
          label: description,
          value: place_id,
        }))
      : [];

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
          <div className="relative flex items-center w-full">
            <FaLocationArrow className="absolute left-3 text-gray-400" />
            <Select
              options={options}
              onChange={handleSelect}
              styles={customStyles}
              isDisabled={!ready}
              placeholder="Select Your Location"
              className="w-full"
              onInputChange={(inputValue) => setValue(inputValue)}
            />
          </div>
        </div>

        <div className="flex flex-col text-center px-20 gap-6">
          <h2 className="font-semibold text-base">POPULAR CITIES</h2>
          <div className="grid grid-cols-4 gap-6">
            {["bengaluru.jpg", "kochi.jpg", "mumbai.avif", "delhi.jpg", "kolkata.jpg", "chennai.avif", "chandigrah.avif", "hyderabad.jpg"].map((cityImg, index) => (
              <div
                key={index}
                className="relative group cursor-pointer"
                onClick={() => handleSelect({ label: cityImg.split(".")[0], value: cityImg.split(".")[0] })}
              >
                <img
                  src={`/assets/${cityImg}`}
                  alt={cityImg.split(".")[0]}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 rounded-lg"></div>
                <h4 className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white text-base font-medium opacity-90 group-hover:opacity-100">
                  {cityImg.split(".")[0].charAt(0).toUpperCase() + cityImg.split(".")[0].slice(1)}
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