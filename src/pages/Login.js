import { useHistory, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";
import { LOGIN_POSTER, LOGO } from "../constants/img_paths";
import Input from "../components/form/Input";
import Button from "../components/form/Button";
const Login = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const [password, setPassword] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [error, setError] = useState("");

  const handleEmail = (e) => {
    setEmailAddress(e.target.value);
    console.log("email", e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    console.log("password", e.target.value);
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    handleLogin(e);
  };
  const handleSubmitKey = (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      handleLogin(e);
    }
  };

  useEffect(() => {
    document.title = "Instagram-login";
    console.log("error");
    if (error !== "") {
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }, [error]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
      history.push(ROUTES.DASHBOARD);
    } catch (error) {
      console.log(error);
      setEmailAddress("");
      setPassword("");
      setError(error.message);
    }
  };

  return (
    <div className="login_container">
      <div className="login_poster">
        <img src={LOGIN_POSTER} alt="login poster" />
      </div>
      <div className="login_form_section">
        <div className="login_details_section">
          <div className="logo">
            <img src={LOGO} alt="Instagram-Logo" />
          </div>

          {error && <p className="error_message">{error}</p>}

          <form method="post">
            <Input
              inputType={"text"}
              inputClass={""}
              inputValue={emailAddress}
              ariaLabel={"Enter your email address"}
              inputLabel={""}
              labelClass={"hide"}
              placeHolder={"Email address"}
              handleChange={handleEmail}
            />
            <Input
              inputType={"password"}
              inputClass={""}
              inputValue={password}
              ariaLabel={"Enter your password"}
              inputLabel={""}
              labelClass={"hide"}
              placeHolder="Password"
              handleChange={handlePassword}
            />
            <Button
              btnType={"submit"}
              btnClass={"btn login_btn"}
              btnTitle={"Log In"}
              icon={""}
              handleClick={handleSubmitClick}
              handleKey={handleSubmitKey}
            />
          </form>
        </div>
        <div className="form_tags">
          <p className="login_form_tag">
            Don't have an account?
            <Link to={ROUTES.SIGN_UP} className="link">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
