import React from "react";
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
    // Destructure the setTricks function to update the state
    setTricks,
  } = useUserData();

  const deleteTrick = async (trickId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/api/tricks/user/${trickId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete trick");
      }

      // Reload the page to reflect changes
      window.location.reload();
    } catch (error) {
      console.error("Error deleting trick:", error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="profile-page">
      <div className="sidebar">
        <ProfileCard
          userData={userData}
          tricks={tricks}
          recoveries={recoveries}
          trickGoals={trickGoals}
          trickGoalsLoading={trickGoalsLoading}
        />
        {/* <TipsCard /> */}
      </div>
      <div className="feed">
        <div className="tricks-list-feed">
          <TricksList
            tricks={tricks}
            loading={tricksLoading}
            error={tricksError}
            deleteTrick={deleteTrick} // Use deleteTrick prop
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
  );
};

export default ProfilePage;
