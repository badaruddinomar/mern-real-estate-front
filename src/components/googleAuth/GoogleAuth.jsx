import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../../firebase/firebase";
import "./googleAuth.scss";
import { backendUrl } from "./../../../helper";
import {
  signInFailAction,
  signInRequestAction,
  signInSuccessAction,
} from "../../redux/reducers/userReducer";
import {
  errorMessageAction,
  successMessageAction,
} from "../../redux/reducers/messageReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const GoogleAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // GOOGLE AUTH HANDLER--
  const authHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      dispatch(signInRequestAction());
      const response = await fetch(`${backendUrl}/api/v1/auth/googleAuth`, {
        method: "POST",
        body: JSON.stringify({
          username: result.user.displayName,
          email: result.user.email,
          avatar: result.user.photoURL,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        dispatch(signInSuccessAction(data.user));
        dispatch(successMessageAction(data.message));
        navigate("/");
      } else {
        dispatch(signInFailAction());
        dispatch(errorMessageAction(data.message));
      }
    } catch (err) {
      dispatch(signInFailAction());
      dispatch(errorMessageAction(err.message));
    }
  };
  return (
    <button onClick={authHandler} className="google-btn">
      Continue With Google
    </button>
  );
};
