import { useHistory, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";
const Login = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const [password, setPassword] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [error, setError] = useState("");
  const isInValid = password === "" || emailAddress === "";

  useEffect(() => {
    document.title = "Instagram-login";
  }, []);

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
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-0  invisible md:visible md:w-3/5">
        <img
          className="max-w-full w-full"
          src="/images/iphone-with-profile.jpg"
          alt="iphone with instagram"
        />
      </div>
      <div className="flex flex-col w-4/5 mx-auto md:w-2/5 ">
        <div className="flex flex-col items-center bg-white border border-gray-primary p-4 mb-4">
          <h1 className="flex justify-center w-full">
            <img
              src="images/logo.png"
              alt="Instagram"
              className="mt-2 mb-4 w-1/2"
            />
          </h1>

          {error && <p className="text-red-primary text-center p-2">{error}</p>}

          <form method="post" onSubmit={handleLogin}>
            <input
              aria-label="Enter your email address"
              type="text"
              placeholder="Email address"
              className="
               small md:text-sm text-gray-base w-full py-5 px-4 mr-3 h-2 border border-gray-primary rounded mb-4"
              onChange={({ target }) => setEmailAddress(target.value)}
              value={emailAddress}
            />
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="small md:text-sm text-gray-base w-full py-5 px-4 mr-3 h-2 border border-gray-primary rounded mb-4"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />
            <button
              disabled={isInValid}
              type="submit"
              className={`small md:text-sm bg-blue-medium text-white w-full rounded  font-bold py-2 mb-4 ${
                isInValid && "opacity-50"
              }`}
            >
              Log In
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center w-full p-4 bg-white border border-gray-primary">
          <p className="md:text-sm small">
            Don't have an account?
            <Link to="/signup" className="font-bold text-blue-medium ml-1">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
