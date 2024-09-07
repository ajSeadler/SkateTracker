import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  IconButton,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import "../styles/ProfilePage.css";

const TricksList = ({ tricks, loading, error, deleteTrick }) => (
  <>
    <Typography variant="h5" className="feed-heading">
      My Tricks
    </Typography>
    <div className="tricks-cont">
      {loading ? (
        <CircularProgress className="loading-spinner" />
      ) : error ? (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      ) : tricks.length > 0 ? (
        tricks.map((trick) => (
          <Card key={trick.trick_id} className="feed-card">
            <CardContent className="trick-card-content">
              <div className="trick-card-header">
                <Typography variant="h6">{trick.name}</Typography>
              </div>
              <Typography
                variant="body2"
                style={{ fontWeight: "bold", color: "#ccc" }}
              >
                {trick.category}
              </Typography>
              <Typography variant="body2">{trick.difficulty_level}</Typography>
              {/* <Typography variant="body2" style={{ margin: "5px" }}>
                Added On:{" "}
                {new Date(trick.created_at).toLocaleDateString("en-US", {
                  month: "2-digit",
                  day: "2-digit",
                  year: "numeric",
                })}
              </Typography> */}

              <div className="trick-card-actions">
                {/* <IconButton size="small" color="primary">
                  <EditIcon />
                </IconButton> */}
                <IconButton
                  size="small"
                  style={{ color: "red", padding: "0px" }}
                  onClick={() => deleteTrick(trick.trick_id)} // Correctly reference trickId
                >
                  <DeleteOutlineIcon />
                  
                </IconButton>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="body1">
          No tricks found for this user. Add new tricks to start tracking your
          progress.
        </Typography>
      )}
    </div>
  </>
);

export default TricksList;
