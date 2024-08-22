// components/Goals.js
import React from "react";

const Goals = ({ trickGoals = [], trickGoalsLoading }) => {
  console.log("Trick goals props:", trickGoals); // Debugging line

  if (trickGoalsLoading) {
    return <p>Loading trick goals...</p>;
  }

  if (trickGoals.length === 0) {
    return <p style={{ color: "#ccc" }}>No trick goals to display.</p>;
  }

  return (
    <div className="goals-container">
      <h3>Goals</h3>
      <div className="goal-section">
        <ul>
          {trickGoals.map((goal) => (
            <li
              key={goal.goal_id}
              className={`goal-item ${goal.achieved ? "achieved" : ""}`}
              style={{ listStyle: "none" }}
            >
              <p>
                <strong>Trick:</strong> {goal.trick_name}
              </p>
              <p>
                <strong>Description:</strong> {goal.goal_description}
              </p>
              <p>
                <strong>Target Date:</strong>{" "}
                {new Date(goal.target_date).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Goals;
