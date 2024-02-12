import "./signInPage.scss";
import PasswordInputBox from "./../../components/passwordInputBox/PasswordInputBox";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { backendUrl } from "./../../../helper";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailAction,
  signInRequestAction,
  signInSuccessAction,
} from "../../redux/reducers/userReducer";
import {
  errorMessageAction,
  successMessageAction,
} from "../../redux/reducers/messageReducer";
import ToastNotification from "../../components/ToastNotification/ToastNotification";
import PreLoader from "../../components/preLoader/PreLoader";
import { GoogleAuth } from "./../../components/googleAuth/GoogleAuth";

const SignInPage = () => {
  const { loading } = useSelector((state) => state.userReducer);
  const { errorMessage } = useSelector((state) => state.messageReducer);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const passwordChangeHandler = (initialPassword) => {
    setPassword(initialPassword);
  };
  // SIGN IN HANDLER--
  const signinHandler = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return dispatch(errorMessageAction("All fields are required!"));
    }

    try {
      dispatch(signInRequestAction());
      const response = await fetch(`${backendUrl}/api/v1/auth/signin`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await response.json();
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
    <>
      {errorMessage && (
        <ToastNotification classname={"error"} text={errorMessage} />
      )}
      {loading ? (
        <PreLoader />
      ) : (
        <div className="signin-page">
          <h1>Sign In</h1>
          <div className="container">
            <form onSubmit={signinHandler}>
              <div className="input-div">
                <label htmlFor="email"></label>
                <input
                  type="email"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <PasswordInputBox
                initialPassword={password}
                passwordHandler={passwordChangeHandler}
                id={"password"}
                placeholder={"Password"}
              />
              <button>Sign In</button>
            </form>
          </div>
          <GoogleAuth />
          <div className="have-account">
            {`Don't have account?`}
            <Link to={"/signup"} className="link">
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default SignInPage;
