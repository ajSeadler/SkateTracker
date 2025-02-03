// ExampleTricks.js
import React, { useEffect, useState } from "react";

const ExampleTricks = () => {
  const [tricks, setTricks] = useState([]);

  useEffect(() => {
    const fetchTricks = async () => {
      try {
        const response = await fetch("/api/tricks");
        if (!response.ok) throw new Error("Failed to fetch tricks");

        const data = await response.json();
        setTricks(data.slice(0, 4));
      } catch (error) {
        console.error("Error fetching example tricks:", error);
      }
    };

    fetchTricks();
  }, []);

  return (
    <div className="example-tricks">
      <div className="trick-list-home">
        {tricks.map((trick, index) => (
          <div key={trick.id || index} className="trick-card-home">
            <h3>{trick.name}</h3>
            <p style={{ color: "#666" }}>
              Difficulty: {trick.difficulty_level}
            </p>
            <p>{trick.description}</p>
          </div>
        ))}
      </div>

      {/* <div className="tricks-extra-info">
        <h3>Skater Reviews</h3>
        <blockquote>
          “Adding these tricks gave me a whole new challenge!” – Rylan B.
        </blockquote>
        <blockquote>
          “Tracking my progress here keeps me motivated to keep pushing.” – Tay
          M.
        </blockquote>

        <h3>Top Gear Picks</h3>
        <ul>
          <li>**Decks:** 8”–8.25” for versatile flips and control.</li>
          <li>**Trucks:** Medium height for stability and smooth landings.</li>
          <li>**Wheels:** 53-55mm for mixed terrain and trick practice.</li>
        </ul>

        <h3>Advanced Tips</h3>
        <p>
          Focus on consistency – practice a trick until it feels natural. Try
          using a slow-mo video app to catch details in your technique.
        </p>
      </div> */}
    </div>
  );
};

export default ExampleTricks;
