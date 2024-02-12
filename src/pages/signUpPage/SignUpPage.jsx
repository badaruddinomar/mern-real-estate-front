import { useState } from "react";
import "./signUpPage.scss";
import { backendUrl } from "../../../helper";
import PasswordInputBox from "./../../components/passwordInputBox/PasswordInputBox";
import PreLoader from "./../../components/preLoader/PreLoader";
import ToastNotification from "./../../components/ToastNotification/ToastNotification";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailAction,
  signInRequestAction,
  signInSuccessAction,
} from "../../redux/reducers/userReducer";
import { useNavigate, Link } from "react-router-dom";
import {
  successMessageAction,
  errorMessageAction,
} from "../../redux/reducers/messageReducer";
import { GoogleAuth } from "../../components/googleAuth/GoogleAuth";

const SignUpPage = () => {
  const { loading } = useSelector((state) => state.userReducer);
  const { errorMessage } = useSelector((state) => state.messageReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const passwordChangeHandler = (initialPassword) => {
    setPassword(initialPassword);
  };

  // SIGN UP HANDLER--
  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInRequestAction());
      const response = await fetch(`${backendUrl}/api/v1/auth/signup`, {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
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
        <div className="signup-page">
          <h1>Sign Up </h1>
          <div className="form-container">
            <form onSubmit={signupHandler}>
              <div className="input-div">
                <label htmlFor="username"></label>
                <input
                  type="text"
                  placeholder="Username"
                  id="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="input-div">
                <label htmlFor="email"></label>
                <input
                  type="email"
                  placeholder="Email"
                  id="email"
                  required
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
              <button>Submit</button>
            </form>
          </div>
          <GoogleAuth />
          <div className="have-account">
            Already have an account?
            <Link className="link" to="/signin">
              Sign In
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUpPage;
