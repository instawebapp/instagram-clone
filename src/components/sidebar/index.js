import UseUser from "../../hooks/use-user";
import User from "./User";
import Suggestions from "./Suggestions";
const Sidebar = () => {
  // const [userDetails,setUserDetails]=useState({});

  const {
    user: { fullName, username, userId, following, docId },
  } = UseUser();
  return (
    <div className="sidebar">
      {/* <User username={username} fullName={fullName} /> */}
      <Suggestions
        userId={userId}
        following={following}
        loggedInUserDocId={docId}
      />
    </div>
  );
};

export default Sidebar;
