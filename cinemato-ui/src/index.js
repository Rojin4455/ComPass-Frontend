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
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <PlacesContextFunction>
  <Provider store={store}>
  <Elements stripe={stripePromise}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
    </Elements>
  </Provider>
  </PlacesContextFunction>
);
