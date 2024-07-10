// client/src/pages/Dashboard.jsx

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/Dashboard/DashSidebar";
import DashProfile from "../components/Dashboard/DashProfile";
import DashPosts from "../components/Dashboard/DashPosts";
import DashUsers from "../components/Dashboard/DashUsers";
import DashComments from "../components/Dashboard/DashComments";
import DashboardComp from "../components/Dashboard/DashboardComp";
import DashProjects from "../components/Dashboard/DashProjects";
import DashTimeline from "../components/Dashboard/DashTimeline";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    console.log("Dashboard component mounted or location.search changed");
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    console.log("Tab from URL:", tabFromUrl);
    if (tabFromUrl) {
      setTab(tabFromUrl);
      console.log("Set tab state to:", tabFromUrl);
    }
  }, [location.search]);

  useEffect(() => {
    console.log("Current tab state:", tab);
  }, [tab]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-sidebar">
        {/* Sidebar */}
        <DashSidebar />
      </div>
      <div className="dashboard-content">
        {/* profile... */}
        {tab === "profile" && <DashProfile />}
        {/* posts... */}
        {tab === "posts" && <DashPosts />}
        {/* users */}
        {tab === "users" && <DashUsers />}
        {/* comments  */}
        {tab === "comments" && <DashComments />}
        {/* projects */}
        {tab === "projects" && <DashProjects />} {/* Add the new tab */}
        {/* timeline */}
        {tab === "timeline" && <DashTimeline />}
        {/* dashboard comp */}
        {tab === "dash" && <DashboardComp />}
      </div>
    </div>
  );
}
