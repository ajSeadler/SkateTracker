// hooks/useUserData.js
import { useEffect, useState } from "react";

const useUserData = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for tricks
  const [tricks, setTricks] = useState([]);
  const [tricksLoading, setTricksLoading] = useState(true);
  const [tricksError, setTricksError] = useState(null);

  // State for recoveries
  const [recoveries, setRecoveries] = useState([]);
  const [recoveriesLoading, setRecoveriesLoading] = useState(true);
  const [recoveriesError, setRecoveriesError] = useState(null);

  // State for goals
  const [trickGoals, setTrickGoals] = useState([]);
  const [trickGoalsLoading, setTrickGoalsLoading] = useState(true);
  const [trickGoalsError, setTrickGoalsError] = useState(null);

  const [recoveryGoals, setRecoveryGoals] = useState([]);
  const [recoveryGoalsLoading, setRecoveryGoalsLoading] = useState(true);
  const [recoveryGoalsError, setRecoveryGoalsError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/api/users/me", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await response.json();
        setUserData(userData);

        if (userData?.id) {
          fetchUserTricks(userData.id);
          fetchUserRecoveries(userData.id);
          fetchUserTrickGoals(userData.id);
          fetchUserRecoveryGoals(userData.id);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserTricks = async (userId) => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:3000/api/tricks/user`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch tricks");
        }

        const tricks = await response.json();
        console.log('Fetched Tricks:', tricks);
        setTricks(tricks);
      } catch (error) {
        setTricksError(error.message);
      } finally {
        setTricksLoading(false);
      }
    };

    const fetchUserRecoveries = async (userId) => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:3000/api/recoveries/user/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch recoveries");
        }

        const recoveries = await response.json();
        setRecoveries(recoveries);
      } catch (error) {
        setRecoveriesError(error.message);
      } finally {
        setRecoveriesLoading(false);
      }
    };

    const fetchUserTrickGoals = async (userId) => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:3000/api/trickGoals/user/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch trick goals");
        }

        const trickGoals = await response.json();
        setTrickGoals(trickGoals);
      } catch (error) {
        setTrickGoalsError(error.message);
      } finally {
        setTrickGoalsLoading(false);
      }
    };

    const fetchUserRecoveryGoals = async (userId) => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:3000/api/recovery-goals/user/${userId}`, // Adjust the endpoint as needed
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch recovery goals");
        }

        const recoveryGoals = await response.json();
        setRecoveryGoals(recoveryGoals);
      } catch (error) {
        setRecoveryGoalsError(error.message);
      } finally {
        setRecoveryGoalsLoading(false);
      }
    };

    fetchUserData();
  }, []);
  const deleteTrick = async (trickId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/api/tricks/user/${trickId}`, // Ensure this endpoint is correct
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
        console.error("Error response:", errorData);
        throw new Error("Failed to delete trick");
      }
  
      // Update the tricks state to remove the deleted trick
      setTricks((prevTricks) =>
        prevTricks.filter((trick) => trick.trick_id !== trickId)
      );
  
      // Update the userData to decrement the points by 1
      setUserData((prevUserData) => ({
        ...prevUserData,
        points: prevUserData.points - 1,
      }));
    } catch (error) {
      console.error("Error deleting trick:", error.message);
    }
  };

  const updateTrickStatus = async (trickId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/api/tricks/user/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ trickId, status: newStatus }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error("Failed to update trick status");
      }
  
      // Optionally, update the tricks state to reflect the new status
      setTricks((prevTricks) =>
        prevTricks.map((trick) =>
          trick.trick_id === trickId ? { ...trick, status: newStatus } : trick
        )
      );
    } catch (error) {
      console.error("Error updating trick status:", error.message);
    }
  };
  
  
  

  return {
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
    recoveryGoals,
    recoveryGoalsLoading,
    recoveryGoalsError,
    deleteTrick,
    updateTrickStatus
  };
};

export default useUserData;
