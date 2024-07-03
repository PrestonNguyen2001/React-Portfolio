// client/src/pages/Dashboard.jsx

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "./DashSidebar";
import DashProfile from "./DashProfile";
import DashPosts from "./DashPosts";
import DashUsers from "./DashUsers";
import DashComments from "./DashComments";
import DashboardComp from "./DashboardComp";
import DashProjects from "./DashProjects"; // Import the new component
import DashTimeline from "./DashTimeline";
import "../../styles/Dashboard.css"; // Import the CSS file

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
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
