import { useEffect, useState } from "react";
import "./userListings.scss";
import { backendUrl } from "../../../helper";
import { Link } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PreLoader from "./../../components/preLoader/PreLoader";
import {
  successMessageAction,
  errorMessageAction,
} from "../../redux/reducers/messageReducer";
import { useDispatch, useSelector } from "react-redux";
import ToastNotification from "./../../components/ToastNotification/ToastNotification";

const UserListing = () => {
  const [myListings, setMyListings] = useState([]);
  const { errorMessage, successMessage } = useSelector(
    (state) => state.messageReducer
  );
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchHandler = async () => {
      const url = `${backendUrl}/api/v1/listing/userListings`;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      };
      setLoading(true);
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        setMyListings(data.listing);
        setLoading(false);
      }
    };
    fetchHandler();
  }, []);
  // delete listing--
  const deleteListingHandler = async (id) => {
    try {
      const url = `${backendUrl}/api/v1/listing/delete/${id}`;
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      };
      setLoading(true);
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        setLoading(false);
        dispatch(successMessageAction(data?.message));
      } else {
        dispatch(errorMessageAction(data.message));
      }
    } catch (err) {
      dispatch(errorMessageAction(err.message));
    }
  };
  return (
    <>
      {errorMessage && (
        <ToastNotification classname={"error"} text={errorMessage} />
      )}
      {successMessage && (
        <ToastNotification classname={"success"} text={successMessage} />
      )}
      {loading ? (
        <PreLoader />
      ) : (
        <div className="all-listing-page">
          <h1 className="heading">My Listing</h1>

          {/* cotnainer-- */}
          <div className="container">
            {myListings?.length === 0 && (
              <p className="not-found-text">Nothing Found!</p>
            )}
            {myListings?.map((listing, ind) => {
              return (
                <div className="listing-card" key={ind}>
                  <div className="listing-img">
                    <Link to={`/single-listing/${listing._id}`}>
                      <img src={listing?.images[0].url} alt="listing-img" />
                    </Link>
                  </div>
                  <div className="listing-info">
                    <h3 className="listing-title">{listing.name}</h3>
                    <div className="listing-price">
                      <span className="type">For {listing.type}</span>
                      <span className="price">
                        $
                        {listing.discountPrice
                          ? listing.discountPrice
                          : listing.regularPrice}{" "}
                        {listing.type === "rent" && "/Month"}
                      </span>
                    </div>
                    <div className="listing-location">
                      <LocationOnIcon className="icon" />{" "}
                      <span className="location">{listing.address}</span>
                    </div>
                  </div>
                  <div className="btns">
                    <Link className="btn" to={`/edit-listing/${listing._id}`}>
                      Edit
                    </Link>
                    <button
                      className="btn"
                      type="button"
                      onClick={() => deleteListingHandler(listing._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default UserListing;
