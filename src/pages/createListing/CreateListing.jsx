import { useEffect, useState } from "react";
import "./createListing.scss";
import { backendUrl } from "./../../../helper";
import PreLoader from "./../../components/preLoader/PreLoader";
import {
  successMessageAction,
  errorMessageAction,
} from "../../redux/reducers/messageReducer";
import { useDispatch, useSelector } from "react-redux";
import ToastNotification from "./../../components/ToastNotification/ToastNotification";
import { useNavigate } from "react-router-dom";

const CreateListing = () => {
  const { errorMessage } = useSelector((state) => state.messageReducer);

  const [hideInputSell, setHideInputSell] = useState(false);
  const [hideInputRent, setHideInputRent] = useState(false);
  const [hideDiscountPrice, setHideDiscountPrice] = useState(false);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    type: "",
    parking: false,
    furnished: false,
    offer: false,
    bedRooms: 1,
    bathRooms: 1,
    regularPrice: 0,
    discountPrice: 0,
    images: [],
  });

  const formDataChangeHandler = (e) => {
    if (e.target.id === "name") {
      setFormData({ ...formData, name: e.target.value });
    } else if (e.target.id === "desc") {
      setFormData({ ...formData, description: e.target.value });
    } else if (e.target.id === "address") {
      setFormData({ ...formData, address: e.target.value });
    } else if (e.target.id === "sell") {
      if (e.target.checked) {
        setFormData({ ...formData, type: "sell" });
        setHideInputRent(true);
      } else {
        setFormData({ ...formData, type: "" });
        setHideInputRent(false);
      }
    } else if (e.target.id === "rent") {
      if (e.target.checked) {
        setFormData({ ...formData, type: "rent" });
        setHideInputSell(true);
      } else {
        setFormData({ ...formData, type: "" });
        setHideInputSell(false);
      }
    } else if (e.target.id === "parking") {
      setFormData({ ...formData, parking: e.target.checked });
    } else if (e.target.id === "furnished") {
      setFormData({ ...formData, furnished: e.target.checked });
    } else if (e.target.id === "offer") {
      setFormData({ ...formData, offer: e.target.checked });
      if (e.target.checked) {
        setHideDiscountPrice(true);
      } else {
        setHideDiscountPrice(false);
      }
    } else if (e.target.id === "beds") {
      setFormData({ ...formData, bedRooms: e.target.value });
    } else if (e.target.id === "baths") {
      setFormData({ ...formData, bathRooms: e.target.value });
    } else if (e.target.id === "regular-price") {
      setFormData({ ...formData, regularPrice: e.target.value });
    } else if (e.target.id === "discount-price") {
      setFormData({ ...formData, discountPrice: e.target.value });
    }
  };
  const imageChangeHandler = (e) => {
    // Store multiple images into an array--
    const files = Array.from(e.target.files);
    // We don't want to show the previous images so remove from the array--
    setImages([]);
    setImagesPreview([]);
    // Show the new selected images by FileReader Constructor--

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]); // store all selected images inside this loop-
          setImagesPreview((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  useEffect(() => {
    setFormData({ ...formData, images: images });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);
  // submit handler--
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const url = `${backendUrl}/api/v1/listing/createListing`;
      const options = {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      };
      setLoading(true);
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        setLoading(false);
        dispatch(successMessageAction(data?.message));
        navigate(`/single-listing/${data?.listing?._id}`);
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
      {loading ? (
        <PreLoader />
      ) : (
        <div className="create-listing-page">
          <h1 className="heading">Create Listing</h1>
          {/* container-- */}
          <div className="container">
            <form onSubmit={submitHandler}>
              {/* left part-- */}
              <div className="left-div">
                {/* first-div */}
                <div className="first-div">
                  <div>
                    <label htmlFor="name"></label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Name"
                      required
                      value={formData.name}
                      onChange={formDataChangeHandler}
                    />
                  </div>
                  <div>
                    <label htmlFor="desc"></label>
                    <textarea
                      type="text"
                      id="desc"
                      placeholder="Description"
                      required
                      value={formData.description}
                      onChange={formDataChangeHandler}
                    />
                  </div>
                  <div>
                    <label htmlFor="address"></label>
                    <input
                      type="text"
                      id="address"
                      placeholder="Address"
                      required
                      value={formData.address}
                      onChange={formDataChangeHandler}
                    />
                  </div>
                </div>
                {/* second div-- */}
                <div className="second-div">
                  <div>
                    <input
                      type="checkbox"
                      id="sell"
                      disabled={hideInputSell}
                      onChange={formDataChangeHandler}
                    />
                    <label htmlFor="sell">Sell</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="rent"
                      disabled={hideInputRent}
                      onChange={formDataChangeHandler}
                    />
                    <label htmlFor="rent">Rent</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="parking"
                      onChange={formDataChangeHandler}
                    />
                    <label htmlFor="parking">Parking</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="furnished"
                      onChange={formDataChangeHandler}
                    />
                    <label htmlFor="furnished">Furnished</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="offer"
                      onChange={formDataChangeHandler}
                    />
                    <label htmlFor="offer">Offer</label>
                  </div>
                </div>
                {/* third div-- */}
                <div className="third-div">
                  <div>
                    <input
                      type="number"
                      id="beds"
                      value={formData.bedRooms}
                      onChange={formDataChangeHandler}
                    />
                    <label htmlFor="beds">Beds</label>
                  </div>
                  <div>
                    <input
                      type="number"
                      id="baths"
                      value={formData.bathRooms}
                      onChange={formDataChangeHandler}
                    />
                    <label htmlFor="baths">Baths</label>
                  </div>
                  <div>
                    <input
                      type="number"
                      id="regular-price"
                      value={formData.regularPrice}
                      onChange={formDataChangeHandler}
                    />
                    <label htmlFor="regular-price">
                      Regular Price {!hideInputRent && <span>($/month)</span>}
                    </label>
                  </div>
                  {hideDiscountPrice && (
                    <div>
                      <input
                        type="number"
                        id="discount-price"
                        value={formData.discountPrice}
                        onChange={formDataChangeHandler}
                      />
                      <label htmlFor="discount-price">
                        Discount Price{" "}
                        {!hideInputRent && <span>($/month)</span>}
                      </label>
                    </div>
                  )}
                </div>
              </div>
              {/* right part-- */}
              <div className="right-div">
                <p>
                  <b>Images: </b>
                  The first image will be the cover (max - 6)
                </p>
                <div>
                  <label htmlFor="images"></label>
                  <input
                    type="file"
                    id="images"
                    multiple
                    accept="image/*"
                    onChange={imageChangeHandler}
                    required
                  />
                </div>
                <div className="image-preview">
                  {imagesPreview &&
                    imagesPreview.map((image, ind) => {
                      return <img src={image} alt="image-preview" key={ind} />;
                    })}
                </div>

                <button>Create Listing</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateListing;
