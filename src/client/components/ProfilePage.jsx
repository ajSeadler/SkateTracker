import React, { useState } from "react";
import { FaUser, FaTimes } from "react-icons/fa"; // Import both icons
import useUserData from "../hooks/useUserData";
import ProfileCard from "./ProfileCard";
import TricksList from "./TricksList";
import RecoveriesList from "./RecoveriesList";
import "../styles/ProfilePage.css";

const ProfilePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {
    userData,
    loading,
    error,
    tricks,
    tricksLoading,
    tricksError,
    recoveries,
    recoveriesLoading,
    recoveriesError,
    trickGoals,
    trickGoalsLoading,
    trickGoalsError,
    deleteTrick,
  } = useUserData();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="mobile-header">
        <button className="mobile-header-button" onClick={toggleSidebar}>
          <FaUser size={24} /> {/* Keep the menu icon here */}
        </button>
        <button className="mobile-header-button">Tricks</button>
        <button className="mobile-header-button">Warm Ups</button>
      </div>
      <div className="profile-page">
        <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
          {sidebarOpen && (
            <button className="close-sidebar-button" onClick={toggleSidebar}>
              <FaTimes size={24} />
            </button>
          )}
          <ProfileCard
            userData={userData}
            tricks={tricks}
            recoveries={recoveries}
            trickGoals={trickGoals}
            trickGoalsLoading={trickGoalsLoading}
          />
        </div>

        <div className="feed">
          <div className="tricks-list-feed">
            <TricksList
              tricks={tricks}
              loading={tricksLoading}
              error={tricksError}
              deleteTrick={deleteTrick} // Pass the deleteTrick function correctly
            />
          </div>
          <div className="recoveries-list-feed">
            <RecoveriesList
              recoveries={recoveries}
              loading={recoveriesLoading}
              error={recoveriesError}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
