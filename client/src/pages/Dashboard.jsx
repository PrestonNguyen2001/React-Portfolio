// client/src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/Dashboard/DashSidebar";
import DashProfile from "../components/Dashboard/DashProfile";
import DashPosts from "../components/Dashboard/DashPosts";
import DashUsers from "../components/Dashboard/DashUsers";
import DashComments from "../components/Dashboard/DashComments";
import DashboardComp from "../components/Dashboard/DashboardComp";
// import DashContacts from "../components/DashContacts"; // Import the new component
import DashTimeline from "../components/Dashboard/DashTimeline";
import "../styles/Dashboard.css"; // Import the CSS file

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
        {/* contacts */}
        {/* {tab === "contacts" && <DashContacts />} Add the new tab */}
        {/* timeline */}
        {tab === "timeline" && <DashTimeline />}
        {/* dashboard comp */}
        {tab === "dash" && <DashboardComp />}
      </div>
    </div>
  );
}
