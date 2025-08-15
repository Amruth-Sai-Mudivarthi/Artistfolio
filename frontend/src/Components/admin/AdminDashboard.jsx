import React, { useState } from "react";
import ProfileSection from "./ProfileSection";
import ManageImages from "./ManageImages";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div style={styles.container}>
      <h1>Admin Dashboard</h1>
      <div style={styles.tabs}>
        <button onClick={() => setActiveTab("profile")}>Profile</button>
        <button onClick={() => setActiveTab("images")}>Manage Images</button>
      </div>
      {activeTab === "profile" ? <ProfileSection /> : <ManageImages />}
    </div>
  );
};

const styles = {
  container: { padding: "20px", fontFamily: "Arial" },
  tabs: { display: "flex", gap: "10px", marginBottom: "20px" },
};

export default AdminDashboard;