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
import OwnerTheaterDetailsPage from "../pages/Owner/OwnerTheaterDetailsPage";
import OwnerProtectedRoute from "./OwnerProtectedRoute";
import ListedScreensPage from "../pages/Owner/ListedScreensPage";
import ScreenDetailsPage from "../pages/Owner/ScreenDetailsPage";

function OwnerRoutes() {
  return (
    <Routes>
      <Route path={"/owner/login/"} element={<OwnerLoginPage />} />
      <Route path={"/owner/signup/"} element= {<OwnerOwnerSignup />}/>
      <Route path={"/owner/home/"} element={<OwnerProtectedRoute><OwnerHomePage /></OwnerProtectedRoute>} />
      <Route path={"/owner/theaters/"} element={<OwnerProtectedRoute><OwnerTheatersPage /></OwnerProtectedRoute>} />
      <Route path={"/owner/movies/"} element={<OwnerProtectedRoute><OwnerMoviesPage /></OwnerProtectedRoute>} />
      <Route path={"/owner/snacks/"} element={<OwnerProtectedRoute><OwnerSnacksPage /></OwnerProtectedRoute>} />
      <Route path={"/owner/add-theater/"} element={<OwnerProtectedRoute><OwnerAddTheaterPage /></OwnerProtectedRoute>} />
      <Route path={"/owner/get-places/"} element={<OwnerProtectedRoute><PlacesAutoComplete /></OwnerProtectedRoute>} />
      <Route path={'/owner/theater-details/:id/'} element={<OwnerProtectedRoute><OwnerTheaterDetailsPage /></OwnerProtectedRoute>} />
      <Route path={'/owner/list-screens/:id/'} element={<OwnerProtectedRoute><ListedScreensPage/></OwnerProtectedRoute>} />
      <Route path={'/owner/screen-details/:id/'} element={<OwnerProtectedRoute><ScreenDetailsPage/></OwnerProtectedRoute>} />
    </Routes>
  );
}

export default OwnerRoutes;
