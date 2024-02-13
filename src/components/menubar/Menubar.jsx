import { Link } from "react-router-dom";
import "./mernubar.scss";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import CreateIcon from "@mui/icons-material/Create";
import ApartmentIcon from "@mui/icons-material/Apartment";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
const Menubar = ({ showMenu, signoutHandler }) => {
  const { isAuthenticated } = useSelector((state) => state.userReducer);

  return (
    <div className={`menu-bar ${showMenu && "show-menu"}`}>
      <ul className="menu-links">
        <li>
          <HomeIcon className="icon" />
          <Link className="link" to={"/"}>
            Home
          </Link>
        </li>
        <li>
          <InfoIcon className="icon" />
          <Link className="link" to={"/about"}>
            About
          </Link>
        </li>
        <li>
          <CreateIcon className="icon" />
          <Link
            className="link"
            to={`${isAuthenticated ? "/create-listing" : "/signin"}`}
          >
            Create Listing
          </Link>
        </li>
        <li>
          <ApartmentIcon className="icon" />
          <Link
            className="link"
            to={`${isAuthenticated ? "/all-listing" : "/signin"}`}
          >
            Edit Listing
          </Link>
        </li>
        <li>
          {isAuthenticated ? (
            <LogoutIcon className="icon" />
          ) : (
            <LoginIcon className="icon" />
          )}
          {isAuthenticated && (
            <span className="link" onClick={signoutHandler}>
              Sign Out
            </span>
          )}
          {!isAuthenticated && (
            <Link to={"/signin"} className="link">
              Sign In
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Menubar;
