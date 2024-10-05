import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
// import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "sonner";
import ToastNotifier from '../src/utils/ToastNotifier'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
      <ToastNotifier/>
    </PersistGate>
  </Provider>
);
