import { useHistory, Link } from "react-router-dom";
import { useState, useEffect, useContext, useRef } from "react";
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";
import { DoesUsernameExist, createNewUserDocument } from "../services/firebase";
const Signup = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [error, setError] = useState("");
  const [createdUser, setCreatedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const componentWillUnmount = useRef(false);
  const isInValid =
    userName === "" ||
    fullName === "" ||
    password === "" ||
    emailAddress === "";

  useEffect(() => {
    return () => {
      componentWillUnmount.current = true;
    };
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    let userId = "";
    const UsernameExist = await DoesUsernameExist(userName);
    if (!UsernameExist.length) {
      setIsLoading(true);
      try {
        //authentication
        let createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(emailAddress, password);
        if (createdUserResult) {
          setCreatedUser(createdUserResult.user);
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
        <div className="container flex mx-auto max-w-screen-md    items-center h-screen">
          <div className="flex w-0  invisible md:visible md:w-3/5">
            <img
              className="max-w-full w-full"
              src="/images/iphone-with-profile.jpg"
              alt="iphone with insta"
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

              {error && (
                <p className="text-red-primary text-center p-2 text-lg mb-2">
                  {error}
                </p>
              )}

              <form method="post" onSubmit={handleSignup}>
                <input
                  aria-label="Enter your username"
                  type="text"
                  placeholder="Username"
                  className="small md:text-sm text-gray-base w-full py-5 px-4 mr-3 h-2 border border-gray-primary rounded mb-3"
                  onChange={({ target }) => setUserName(target.value)}
                  value={userName}
                />
                <input
                  aria-label="Enter your Full Name"
                  type="text"
                  placeholder="Full Name"
                  className="small md:text-sm text-gray-base w-full py-5 px-4 mr-3 h-2 border border-gray-primary rounded mb-3"
                  onChange={({ target }) => setFullName(target.value)}
                  value={fullName}
                />
                <input
                  aria-label="Enter your email address"
                  type="email"
                  placeholder="Email address"
                  className="small md:text-sm text-gray-base w-full py-5 px-4 mr-3 h-2 border border-gray-primary rounded mb-3"
                  onChange={({ target }) => setEmailAddress(target.value)}
                />
                <input
                  aria-label="Enter your password"
                  type="password"
                  placeholder="Password"
                  className="small md:text-sm text-gray-base w-full py-5 px-4 mr-3 h-2 border border-gray-primary rounded mb-3"
                  onChange={({ target }) => setPassword(target.value)}
                  value={password}
                />
                <button
                  disabled={isInValid}
                  type="submit"
                  className={`small md:text-sm bg-blue-medium py-2 text-white w-full rounded  font-bold mb-3  ${
                    isInValid && "opacity-50"
                  }`}
                >
                  Sign Up
                </button>
              </form>
            </div>
            <div className="flex justify-center items-center w-full p-4 bg-white border border-gray-primary">
              <p className="small md:text-sm">
                Have an account?
                <Link to="/login" className="font-bold text-blue-medium ml-1">
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
