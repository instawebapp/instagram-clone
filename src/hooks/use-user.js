import { useContext, useEffect, useState } from "react";
import UserContext from "../context/user";
import { GetUserById } from "../services/firebase";
export default function UseUser() {
  const [activeUser, setActiveUser] = useState({});
  const { user } = useContext(UserContext);
  useEffect(() => {
    async function getUserObjByUserId() {
      //    we need a function that we can call firebase service that gets the user data based on the id
      const response = await GetUserById(user.uid);
      console.log(user.uid, response);
      setActiveUser(response);
    }
    if (user?.uid) {
      getUserObjByUserId();
    }
  }, [user]);
  return { user: activeUser };
}
