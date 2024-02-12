import "./homePage.scss";
import ToastNotification from "../../components/ToastNotification/ToastNotification";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { backendUrl } from "../../../helper";
import ListingCard from "../../components/listingCard/ListingCard";
import { Link } from "react-router-dom";
import PreLoader from "../../components/preLoader/PreLoader";

const HomePage = () => {
  const { errorMessage, successMessage } = useSelector(
    (state) => state.messageReducer
  );
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);

  // get all listings--
  useEffect(() => {
    const fetchHandler = async () => {
      const url = `${backendUrl}/api/v1/listing/getAllListings`;
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setListings(data?.listing);
        setLoading(false);
      }
    };
    fetchHandler();
  }, []);

  return (
    <>
      {errorMessage && (
        <ToastNotification classname={"error"} text={errorMessage} />
      )}
      {successMessage && (
        <ToastNotification classname={"success"} text={successMessage} />
      )}

      <div className="home-page">
        <div className="hero-section">
          <h1>
            The Simplest <br /> Way to Find <span>Property</span>
          </h1>
          <p>
            A small river named Duden flows by their place and supplies it with
            the necessary regelialia. It is a <br /> paradisematic country, in
            which roasted parts
          </p>
        </div>
        <div className="container">
          <h3 className="container-header">Latest Property</h3>
          {loading ? (
            <PreLoader />
          ) : (
            <div className="cards">
              {listings?.slice(0, 8)?.map((item) => {
                return <ListingCard key={item?._id} listing={item} />;
              })}
            </div>
          )}
          <Link to={"/search-page"} type="button" className="button">
            View More
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomePage;
