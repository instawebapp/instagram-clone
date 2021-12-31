import { useHistory, Link } from "react-router-dom";
import { useState, useEffect, useContext, useRef } from "react";
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";
import { DoesUsernameExist, createNewUserDocument } from "../services/firebase";
import { LOGO, SIGNUP_POSTER } from "../constants/img_paths";
import Input from "../components/form/Input";
import Button from "../components/form/Button";
const Signup = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const componentWillUnmount = useRef(false);

  const handleUserName = (e) => {
    setUserName(e.target.value);
    console.log("username", e.target.value);
  };

  const handleFullName = (e) => {
    setFullName(e.target.value);
    console.log("full name", e.target.value);
  };

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
    handleSignup(e);
  };
  const handleSubmitKey = (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      handleSignup(e);
    }
  };

  useEffect(() => {
    if (error !== "") {
      setTimeout(() => {
        setError("");
      }, 3000);
    }
    console.log("error");

    return () => {
      clearTimeout();
      componentWillUnmount.current = true;
    };
  }, [error]);

  const handleSignup = async (e) => {
    e.preventDefault();
    let userId = "";
    if (
      userName === "" ||
      fullName === "" ||
      emailAddress === "" ||
      password === ""
    ) {
      setError("please fill all details");
      setUserName("");
      setFullName("");
      setEmailAddress("");
      setPassword("");

      return;
    }
    const UsernameExist = await DoesUsernameExist(userName);
    if (!UsernameExist.length) {
      setIsLoading(true);
      try {
        //authentication
        let createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(emailAddress, password);
        if (createdUserResult) {
          userId = createdUserResult.user.uid;
          console.log(createdUserResult.user, createdUserResult.user.uid);
          if (userId !== "") {
            console.log(userId);
            await createNewUserDocument(
              userId,
              userName,
              fullName,
              emailAddress
            );
          }

          setIsLoading(false);
          history.push(ROUTES.DASHBOARD);
        }
      } catch (err) {
        setFullName("");
        setEmailAddress("");
        setPassword("");
        setError(err.message);
        console.log(err);
      }
    } else {
      setError("username is already taken");
    }
    return () => {};
  };

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="signup_container">
          <div className="signup_poster">
            <img src={SIGNUP_POSTER} alt="signup poster" />
          </div>
          <div className="signup_form_section">
            <div className="signup_details_section">
              <div className="logo">
                <img src={LOGO} alt="Instagram" />
              </div>

              {error && <p className="error_message">{error}</p>}

              <form method="post">
                <Input
                  inputType={"text"}
                  inputClass={""}
                  inputValue={userName}
                  ariaLabel={"Enter your username"}
                  inputLabel={""}
                  labelClass={"hide"}
                  placeHolder={"Username"}
                  handleChange={handleUserName}
                />
                <Input
                  inputType={"text"}
                  inputClass={""}
                  inputValue={fullName}
                  ariaLabel={"Enter your Full Name"}
                  inputLabel={""}
                  labelClass={"hide"}
                  placeHolder={"Full Name"}
                  handleChange={handleFullName}
                />
                <Input
                  inputType={"email"}
                  inputClass={""}
                  inputValue={emailAddress}
                  ariaLabel={"Enter Email Address"}
                  inputLabel={""}
                  labelClass={"hide"}
                  placeHolder={"Email address"}
                  handleChange={handleEmail}
                />
                <Input
                  inputType={"password"}
                  inputClass={""}
                  inputValue={password}
                  ariaLabel={"Enter Password"}
                  inputLabel={""}
                  labelClass={"hide"}
                  placeHolder={"Password"}
                  handleChange={handlePassword}
                />
                <Button
                  btnType={"submit"}
                  btnClass={"btn signup_btn"}
                  btnTitle={"Sign Up"}
                  icon={""}
                  handleClick={handleSubmitClick}
                  handleKey={handleSubmitKey}
                />
              </form>
            </div>
            <div className="form_tags">
              <p className="login_form_tag">
                Have an account?
                <Link to={ROUTES.LOGIN} className="link">
                  Log In
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
