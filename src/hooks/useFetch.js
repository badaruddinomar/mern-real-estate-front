import { useState, useEffect } from "react";
import { backendUrl } from "../../helper";
import { useDispatch, useSelector } from "react-redux";
import { setLoadingState } from "../redux/reducers/searchReducer";

export const useFetch = (offer, parking, furnished, type, order, limit) => {
  const { searchTerm } = useSelector((state) => state.searchReducer);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchHandler = async () => {
      const url = `${backendUrl}/api/v1/listing/search?searchTerm=${searchTerm}&offer=${offer}&parking=${parking}&furnished=${furnished}&type=${type}&order=${order}&limit=${limit}`;
      dispatch(setLoadingState(true));
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) dispatch(setLoadingState(false));
      setData(data);
    };
    fetchHandler();
  }, [searchTerm, offer, parking, furnished, type, order, limit, dispatch]);
  return data;
};
