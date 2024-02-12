/* eslint-disable react/prop-types */
import "./listingCard.scss";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HotelIcon from "@mui/icons-material/Hotel";
import BathtubIcon from "@mui/icons-material/Bathtub";
import { Link } from "react-router-dom";

const ListingCard = ({ listing }) => {
  return (
    <div className="listings-card">
      <Link to={`/single-listing/${listing._id}`}>
        <img
          src={listing?.images[0]?.url}
          alt="listing-image"
          className="image"
        />
      </Link>
      <h3 className="title">{listing?.name.slice(0, 33)}...</h3>
      <address className="address">
        <LocationOnIcon className="icon" />
        {listing?.address.slice(0, 35)}...
      </address>
      <p className="desc">{listing?.description.slice(0, 75)}...</p>
      {listing?.discountPrice ? (
        <p className="price">
          $
          {listing?.type === "sell"
            ? `${listing?.discountPrice}`
            : `${listing?.discountPrice}/month`}
        </p>
      ) : (
        <p className="price">
          $
          {listing?.type === "sell"
            ? `${listing?.regularPrice}`
            : `${listing?.regularPrice}/month`}
        </p>
      )}
      <p className="price"></p>
      <p className="rooms">
        <span>
          <HotelIcon className="icon" />
          {listing?.bedRooms} Beds
        </span>
        <span>
          <BathtubIcon className="icon" />
          {listing?.bathRooms} Baths
        </span>
      </p>
      <p className="type">{listing?.type}</p>
    </div>
  );
};

export default ListingCard;
