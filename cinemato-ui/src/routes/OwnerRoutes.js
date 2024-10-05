import React from "react";
import { Route, Routes } from "react-router-dom";
import OwnerLoginPage from "../pages/Owner/OwnerLoginPage";
import OwnerOwnerSignup from "../components/Theater/Signup/OwnerSignup";
import OwnerHomePage from "../pages/Owner/OwnerHomePage";
import OwnerTheatersPage from "../pages/Owner/OwnerTheatersPage";
import OwnerMoviesPage from "../pages/Owner/OwnerMoviesPage";
import OwnerSnacksPage from "../pages/Owner/OwnerSnacksPage";
import OwnerAddTheaterPage from "../pages/Owner/OwnerAddTheaterPage";
import PlacesAutoComplete from "../components/Theater/Theaters/GoogleMap/PlacesAutoComplete";

function OwnerRoutes() {
  return (
    <Routes>
      <Route path={"/owner/login/"} element={<OwnerLoginPage />} />
      <Route path={"/owner/signup/"} element={<OwnerOwnerSignup />} />
      <Route path={"/owner/home/"} element={<OwnerHomePage />} />
      <Route path={"/owner/theaters/"} element={<OwnerTheatersPage />} />
      <Route path={"/owner/movies/"} element={<OwnerMoviesPage />} />
      <Route path={"/owner/snacks/"} element={<OwnerSnacksPage />} />
      <Route path={"/owner/add-theater/"} element={<OwnerAddTheaterPage />} />
      <Route path={"/owner/get-places/"} element={<PlacesAutoComplete />} />
    </Routes>
  );
}

export default OwnerRoutes;
