// client/src/pages/Dashboard.jsx

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "./DashSidebar";
import DashProfile from "./DashProfile";
import DashPosts from "./DashPosts";
import DashUsers from "./DashUsers";
import DashComments from "./DashComments";
import DashboardComp from "./DashboardComp";
import DashProjects from "./DashProjects";
import DashTimeline from "./DashTimeline";
import "../../styles/Dashboard.css";

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
