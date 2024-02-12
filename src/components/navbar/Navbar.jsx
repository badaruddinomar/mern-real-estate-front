import "./navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LogoutIcon from "@mui/icons-material/Logout";
import CreateIcon from "@mui/icons-material/Create";
import { backendUrl } from "./../../../helper";
import { useDispatch } from "react-redux";
import {
  signInFailAction,
  signInSuccessAction,
} from "../../redux/reducers/userReducer";
import ApartmentIcon from "@mui/icons-material/Apartment";
import {
  errorMessageAction,
  successMessageAction,
} from "../../redux/reducers/messageReducer";
import { useEffect, useState } from "react";
import { setSearchData } from "../../redux/reducers/searchReducer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Menubar from "../menubar/Menubar";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleSearch, setToggleSearch] = useState(false);

  // toggle menu handler-
  const toggleMenuHandler = () => {
    setToggleMenu(!toggleMenu);
  };

  // SIGN OUT HADNLER--
  const signoutHandler = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/v1/auth/signout`);
      const data = await response.json();
      if (response.ok) {
        dispatch(signInFailAction());
        dispatch(successMessageAction(data.message));
      } else {
        dispatch(errorMessageAction(data.message));
      }
    } catch (err) {
      dispatch(errorMessageAction(err.message));
    }
  };

  // search handler--
  const searchHandler = () => {
    navigate("/search-page");
    dispatch(setSearchData(searchKeyword));
  };
  useEffect(() => {
    dispatch(setSearchData(searchKeyword));
  }, [dispatch, searchKeyword]);

  // get authenticated user--
  useEffect(() => {
    const fetchHandler = async () => {
      const url = `${backendUrl}/api/v1/auth/user`;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      };
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        dispatch(signInSuccessAction(data.user));
      } else {
        dispatch(signInFailAction());
      }
    };
    fetchHandler();
  }, [dispatch]);

  return (
    <nav>
      {/* ---LOGO--- */}
      {!toggleSearch && (
        <Link className="logo" to={"/"}>
          Badar<span>Estate</span>
        </Link>
      )}

      {/* ---SEARCH BAR--- */}
      <form className="nav-form">
        <input
          type="text"
          placeholder="Search.."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <Link to={"/search-page"} className="button" onClick={searchHandler}>
          <SearchIcon className="icon" />
        </Link>
      </form>
      {/* ---LINKS---  */}
      <ul className="links">
        <li>
          <Link to={"/"} className="link">
            Home
          </Link>
        </li>
        <li>
          <Link className="link" to="/about">
            About
          </Link>
        </li>
        <li>
          {!isAuthenticated ? (
            <Link className="link" to="/signin">
              Sing In
            </Link>
          ) : (
            <div className="link user">
              <span> {user?.username?.split(" ")[0]}</span>
              <ExpandMoreIcon className="icon" />
              {/* SUB MENU-- */}
              <ul className="sub-menu">
                <li>
                  <Link className="link" to={"/create-listing"}>
                    <CreateIcon className="icon" /> <span>Create Listing</span>
                  </Link>
                </li>
                <li>
                  <Link className="link" to={"/all-listing"}>
                    <ApartmentIcon className="icon" />
                    <span>My Listing</span>
                  </Link>
                </li>
                <li>
                  <Link className="link" onClick={signoutHandler}>
                    <LogoutIcon className="icon" /> <span>Sign Out</span>
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </li>
      </ul>
      {/* search icon for mobile device-- */}
      <form className={`menu-search-form ${toggleSearch && "show"}`}>
        {toggleSearch && (
          <>
            <CloseIcon
              className="icon"
              onClick={() => {
                setToggleSearch(false);
              }}
            />
            <input
              type="text"
              placeholder="Search.."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </>
        )}
      </form>
      {/* humburger menu for mobile responsive desgin-- */}
      {!toggleSearch && (
        <>
          <div className="humburger">
            <Link
              to={"/search-page"}
              className="button"
              onClick={() => {
                searchHandler();
                setToggleSearch(true);
              }}
            >
              <SearchIcon className="search-icon" />
            </Link>
            {!toggleMenu && (
              <MenuIcon className="icon" onClick={toggleMenuHandler} />
            )}
            {toggleMenu && (
              <CloseIcon className="icon" onClick={toggleMenuHandler} />
            )}
          </div>
          <Menubar showMenu={toggleMenu} />
        </>
      )}
    </nav>
  );
};

export default Navbar;
