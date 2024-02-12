import "./app.scss";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import Navbar from "./components/navbar/Navbar";
import SignInPage from "./pages/signInPage/SignInPage";
import SignUpPage from "./pages/signUpPage/SignUpPage";
import AboutPage from "./pages/aboutPage/AboutPage";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import ProfilePage from "./pages/profilePage/ProfilePage";
import CreateListing from "./pages/createListing/CreateListing";
import SingleListing from "./pages/singleListing/SingleListing";
import EditListing from "./pages/editListing/EditListing";
import UserListing from "./pages/userListings/UserListings";
import SearchPage from "./pages/searchPage/SearchPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/single-listing/:id" element={<SingleListing />} />
        <Route path="/search-page" element={<SearchPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/all-listing" element={<UserListing />} />
          <Route path="/edit-listing/:id" element={<EditListing />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
