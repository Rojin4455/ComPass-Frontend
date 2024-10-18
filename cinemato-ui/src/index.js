import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
// import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
// import ToastNotifier from '../src/utils/ToastNotifier'
import './toastStyles.css';
import { Toaster } from "sonner";
import PlacesContextFunction from "./context/placesContext"; // Import the correct provider


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <PlacesContextFunction>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
      {/* <ToastNotifier/> */}
    </PersistGate>
  </Provider>
  </PlacesContextFunction>
);
