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
import OwnerMovieDetailsPage from "../pages/Owner/OwnerMovieDetailsPage";
import SetTime from "../components/Theater/ScreenTime/SetTime";
import SnacksListPage from "../pages/Owner/SnacksListPage";
import AddTheaterSnacksPage from "../pages/Owner/AddTheaterSnacksPage";

function OwnerRoutes() {
  return (
    <Routes>
      <Route path={"/signup/"} element= {<OwnerOwnerSignup />}/>
      <Route path={"/home/"} element={<OwnerProtectedRoute><OwnerHomePage /></OwnerProtectedRoute>} />
      <Route path={"/login/"} element={<OwnerLoginPage />} />
      <Route path={"/theaters/"} element={<OwnerProtectedRoute><OwnerTheatersPage /></OwnerProtectedRoute>} />
      <Route path={"/movies/"} element={<OwnerProtectedRoute><OwnerMoviesPage /></OwnerProtectedRoute>} />
      <Route path={"/snacks/"} element={<OwnerProtectedRoute><OwnerSnacksPage /></OwnerProtectedRoute>} />
      <Route path={"/add-theater/"} element={<OwnerProtectedRoute><OwnerAddTheaterPage /></OwnerProtectedRoute>} />
      <Route path={"/get-places/"} element={<OwnerProtectedRoute><PlacesAutoComplete /></OwnerProtectedRoute>} />
      <Route path={'/theater-details/:id/'} element={<OwnerProtectedRoute><OwnerTheaterDetailsPage /></OwnerProtectedRoute>} />
      <Route path={'/list-screens/:id/'} element={<OwnerProtectedRoute><ListedScreensPage/></OwnerProtectedRoute>} />
      <Route path={'/screen-details/:id/'} element={<OwnerProtectedRoute><ScreenDetailsPage/></OwnerProtectedRoute>} />
      <Route path={'/movie-details/'} element={<OwnerProtectedRoute><OwnerMovieDetailsPage/></OwnerProtectedRoute>} />
      <Route path={'/set-time'} element={<OwnerProtectedRoute><SetTime/></OwnerProtectedRoute>} />
      <Route path={'/snacks-list'} element={<OwnerProtectedRoute><SnacksListPage/></OwnerProtectedRoute>} />
      <Route path={'/theater-add-snacks'} element={<OwnerProtectedRoute><AddTheaterSnacksPage/></OwnerProtectedRoute>} />
    </Routes>
  );
}

export default OwnerRoutes;
