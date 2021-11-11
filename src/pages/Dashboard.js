import Header from "../components/Header";
import Timeline from "../components/Timeline";
import Sidebar from "../components/sidebar/index";
import { getUploadedStory } from "../services/firebase";
import { useState, useContext, useEffect } from "react";
import UserContext from "../context/user";
const Dashboard = () => {
  return (
    <div className="bg-gray-background">
      <Header />
      <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
        <Timeline />
        {/* <Sidebar /> */}
      </div>
    </div>
  );
};

export default Dashboard;
