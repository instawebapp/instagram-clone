import Header from "../components/Header";
import Timeline from "../components/Timeline";
import Sidebar from "../components/sidebar/index";
const Dashboard = () => {
  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard_section">
        <Timeline />
        <Sidebar />
      </div>
    </div>
  );
};

export default Dashboard;
