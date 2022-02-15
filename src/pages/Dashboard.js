import Header from "../components/Header";
import Timeline from "../components/Timeline";
import Sidebar from "../components/sidebar/index";
import LeftPanel from "../components/leftPanel";
const Dashboard = () => {
  return (
    <div className="dashboard_container">
      <div className="dashboard">
        <Header />
        <div className="dashboard_section">
          <LeftPanel />
          <Timeline />
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
