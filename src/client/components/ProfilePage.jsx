import React, { useState } from "react";
import useUserData from "../hooks/useUserData";
import ProfileCard from "./ProfileCard";
import TricksList from "./TricksList";
import RecoveriesList from "./RecoveriesList";
import "../styles/ProfilePage.css";

const ProfilePage = () => {
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
    updateTrickStatus
  } = useUserData();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="profile-page">
        <div className="sidebar">
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
              deleteTrick={deleteTrick}
              updateTrickStatus={updateTrickStatus} 
            />
          </div>
          {/* <div className="recoveries-list-feed">
            <RecoveriesList
              recoveries={recoveries}
              loading={recoveriesLoading}
              error={recoveriesError}
            />
          </div> */}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
