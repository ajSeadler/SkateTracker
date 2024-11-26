import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  IconButton,
  Button,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import "../styles/ProfilePage.css";

const TricksList = ({
  tricks,
  loading,
  error,
  deleteTrick,
  updateTrickStatus,
}) => {
  const [filter, setFilter] = useState("all"); // State to track which filter is active

  // Function to handle filter changes
  const handleFilterChange = (status) => {
    setFilter(status);
  };

  // Function to filter tricks based on status
  const filteredTricks = tricks.filter((trick) => {
    if (filter === "all") return true;
    return trick.status === filter;
  });

  // Function to handle the status change dropdown
  const handleStatusChange = (trickId, newStatus) => {
    updateTrickStatus(trickId, newStatus); // Update status in the database
  };

  return (
    <>
      <Typography variant="h5" className="feed-heading">
        My Tricks
      </Typography>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        <Button
          variant={filter === "all" ? "contained" : "outlined"}
          onClick={() => handleFilterChange("all")}
          className="filter-btn"
        >
          All Tricks
        </Button>
        <Button
          variant={filter === "learning" ? "contained" : "outlined"}
          onClick={() => handleFilterChange("learning")}
          className="filter-btn"
        >
          Learning
        </Button>
        <Button
          variant={filter === "mastered" ? "contained" : "outlined"}
          onClick={() => handleFilterChange("mastered")}
          className="filter-btn"
        >
          Mastered
        </Button>
      </div>

      <div className="tricks-cont">
        {loading ? (
          <CircularProgress className="loading-spinner" />
        ) : error ? (
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        ) : filteredTricks.length > 0 ? (
          filteredTricks.map((trick) => (
            <Card key={trick.trick_id} className="feed-card">
              <CardContent className="trick-card-content">
                <div className="trick-card-header">
                  <Typography variant="h6" style={{ fontWeight: "bolder" }}>
                    {trick.name}
                  </Typography>
                </div>
                <Typography
                  variant="body2"
                  style={{ fontWeight: "bold", color: "#ccc" }}
                >
                  {trick.category}
                </Typography>
                <Typography variant="body2">
                  {trick.difficulty_level}
                </Typography>

                {/* Status Dropdown */}
                <FormControl fullWidth className="custom-select">
                  <Select
                    value={trick.status}
                    onChange={(e) =>
                      handleStatusChange(trick.trick_id, e.target.value)
                    }
                    className={`status-${trick.status}`}
                  >
                    <MenuItem value="learning">Learning</MenuItem>
                    <MenuItem value="mastered">Mastered</MenuItem>
                  </Select>
                </FormControl>

                <div className="trick-card-actions">
                  <IconButton
                    size="small"
                    style={{ color: "red", padding: "0px" }}
                    onClick={() => deleteTrick(trick.trick_id)}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="body1">
            No tricks found for this filter.
          </Typography>
        )}
      </div>
    </>
  );
};

export default TricksList;
