import { useEffect, useState } from "react";
import ListingCard from "../../components/listingCard/ListingCard";
import "./searchPage.scss";
import { useFetch } from "../../hooks/useFetch";
import { useSelector } from "react-redux";
import PreLoader from "./../../components/preLoader/PreLoader";

const SearchPage = () => {
  const { loading } = useSelector((state) => state.searchReducer);
  const [offer, setOffer] = useState(false);
  const [furnished, setFurnished] = useState(false);
  const [parking, setParking] = useState(false);
  const [type, setType] = useState("all");
  const [order, setOrder] = useState(-1);
  const [limit, setLimit] = useState(6);
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(false);
  const searchedData = useFetch(offer, parking, furnished, type, order, limit);

  // show load more button login--
  useEffect(() => {
    if (searchedData?.totalListings > 6 || searchedData?.filteredResults > 6) {
      setShowLoadMoreBtn(true);
    }
    if (
      searchedData?.totalListings === searchedData?.listings?.length ||
      searchedData?.listings?.length === searchedData.filteredResults
    ) {
      setShowLoadMoreBtn(false);
    }
  }, [
    searchedData?.totalListings,
    searchedData?.listings,
    searchedData?.filteredResults,
  ]);
  return (
    <div className="search-page">
      <div className="left-side">
        {/* type-filter-box */}
        <div className="type-filter-box">
          <span>Type:</span>
          <div className="input-div">
            <input
              type="checkbox"
              id="rent-sell"
              onChange={(e) => {
                setType(e.target.checked ? "all" : undefined);
              }}
              checked={
                type === "rent" || type === "sell" || type === undefined
                  ? false
                  : true
              }
            />
            <label htmlFor="rent-sell">Rent & Sell</label>
          </div>
          <div className="input-div">
            <input
              type="checkbox"
              id="rent"
              checked={
                type === "all" || type === "sell" || type === undefined
                  ? false
                  : true
              }
              onChange={(e) => setType(e.target.checked ? "rent" : undefined)}
            />
            <label htmlFor="rent">Rent</label>
          </div>
          <div className="input-div">
            <input
              type="checkbox"
              id="sell"
              checked={
                type === "all" || type === "rent" || type === undefined
                  ? false
                  : true
              }
              onChange={(e) => setType(e.target.checked ? "sell" : undefined)}
            />
            <label htmlFor="sell">Sell</label>
          </div>
          <div className="input-div">
            <input
              type="checkbox"
              id="offer"
              onChange={(e) => setOffer(e.target.checked)}
            />
            <label htmlFor="offer">Offer</label>
          </div>
        </div>
        {/* features filter box */}
        <div className="features-filter-box">
          <span>Features:</span>
          <div className="input-div">
            <input
              type="checkbox"
              id="parking"
              onChange={(e) => setParking(e.target.checked)}
            />
            <label htmlFor="parking">Parking</label>
          </div>
          <div className="input-div">
            <input
              type="checkbox"
              id="furnished"
              onChange={(e) => setFurnished(e.target.checked)}
            />
            <label htmlFor="furnished">Furnished</label>
          </div>
        </div>
        <div className="sort-filter-box">
          <span>Sort:</span>
          <div className="input-div">
            <input
              type="checkbox"
              id="latest"
              checked={order === -1 ? true : false}
              onChange={(e) => setOrder(e.target.checked && -1)}
            />
            <label htmlFor="latest">Latest</label>
          </div>
          <div className="input-div">
            <input
              type="checkbox"
              id="old"
              checked={order === 1 ? true : false}
              onChange={(e) => setOrder(e.target.checked && 1)}
            />
            <label htmlFor="old">Old</label>
          </div>
        </div>
        <button>Search</button>
      </div>
      <div className="right-side">
        {loading && <PreLoader />}
        <div className="cards">
          {searchedData?.listings?.length === 0 && (
            <p className="not-found-text">Nothing Found!</p>
          )}
          {!loading &&
            searchedData?.listings?.map((listing) => {
              return <ListingCard key={listing._id} listing={listing} />;
            })}
        </div>
        {showLoadMoreBtn && (
          <button
            type="button"
            className="load-more-btn"
            onClick={() => setLimit(limit + 6)}
          >
            Load More...
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
