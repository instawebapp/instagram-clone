import Explore from "./Explore";
import Tabs from "./Tabs";
import UserProfile from "./UserProfile";

export default function LeftPanel() {
  return (
    <div className="leftPanel_container">
      <UserProfile />
      <Tabs />
      <Explore />
    </div>
  );
}
