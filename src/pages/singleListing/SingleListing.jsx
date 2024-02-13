import { useEffect, useState } from "react";
import "./singleListing.scss";
import Carousel from "react-material-ui-carousel";
import { Link, useParams } from "react-router-dom";
import { backendUrl } from "../../../helper";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HotelIcon from "@mui/icons-material/Hotel";
import BathtubIcon from "@mui/icons-material/Bathtub";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import ChairIcon from "@mui/icons-material/Chair";
import { useSelector } from "react-redux";
import ToastNotification from "./../../components/ToastNotification/ToastNotification";

const SingleListing = () => {
  const { successMessage } = useSelector((state) => state.messageReducer);
  const { user } = useSelector((state) => state.userReducer);
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const [listing, setListing] = useState({});

  const carouselOptions = {
    indicators: false,
    navButtonsAlwaysVisible: true,
  };

  useEffect(() => {
    const fetchHandler = async () => {
      const url = `${backendUrl}/api/v1/listing/getListing/${id}`;
      const response = await fetch(url);
      const data = await response.json();
      setListing(data.listing);
    };
    fetchHandler();
  }, [id]);

  return (
    <>
      {successMessage && (
        <ToastNotification classname={"success"} text={successMessage} />
      )}
      <div className="single-listing-page">
        <Carousel
          {...carouselOptions}
          NextIcon={
            <ArrowForwardIosIcon
              style={{ color: "#ab46d2", fontSize: "30px" }}
            />
          }
          PrevIcon={
            <ArrowBackIosIcon style={{ color: "#ab46d2", fontSize: "30px" }} />
          }
          navButtonsProps={{
            style: {
              backgroundColor: "transparent",
              borderRadius: 0,
            },
          }}
        >
          {listing?.images?.map((image, index) => (
            <div key={index} className="slider">
              <img src={image.url} alt={"listing-banner-images"} />
            </div>
          ))}
        </Carousel>
        {/* conatiner-- */}
        <div className="container">
          <h1>{listing.name}</h1>
          <p className="location">
            <LocationOnIcon className="icon" /> {listing.address}
          </p>
          <span className="type">For {listing.type}</span>
          <span className="discount-price">
            {listing.type === "sell"
              ? `$${listing.discountPrice}`
              : `$${listing.discountPrice}/month`}
            Dicount Price
          </span>
          <span
            className={`regular-price ${
              listing.discountPrice && "line-through"
            }`}
          >
            {listing.type === "sell"
              ? `$${listing.regularPrice}`
              : `$${listing.regularPrice}/month`}
            Regular Price
          </span>
          <p className="desc">
            <b>Description - </b>
            {listing.description}
          </p>
          <div className="features">
            <div>
              <HotelIcon className="icon" />
              <span>{listing.bedRooms} Beds</span>
            </div>
            <div>
              <BathtubIcon className="icon" />
              <span>{listing.bathRooms} Baths</span>
            </div>
            <div>
              <LocalParkingIcon className="icon" />
              <span>
                {listing.parking ? "Parking Available" : "No Parking"}
              </span>
            </div>
            <div>
              <ChairIcon className="icon" />
              <span>{listing.furnished ? "Furnished" : "Not Furnished"}</span>
            </div>
          </div>
          {/* contact section-- */}
          {user?._id !== listing?.user?._id && (
            <div className="contact-section">
              <form>
                <textarea
                  type="text"
                  placeholder="Contact with owner"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                {user ? (
                  <Link
                    className="button"
                    to={`mailto:${listing?.user?.email}?subject=Regarding ${listing?.name}&body=${message}`}
                  >
                    Send Message
                  </Link>
                ) : (
                  <Link className="button" to={`/signin`}>
                    Send Message
                  </Link>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SingleListing;
