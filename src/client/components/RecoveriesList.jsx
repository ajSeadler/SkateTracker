import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  IconButton,
} from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import "../styles/ProfilePage.css";

const RecoveriesList = ({ recoveries, loading, error }) => (
  <>
    <Typography variant="h5" className="feed-heading">
      Warm-Ups
    </Typography>
    <div className="tricks-cont">
      {loading ? (
        <CircularProgress className="loading-spinner" />
      ) : error ? (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      ) : recoveries.length > 0 ? (
        recoveries.map((recovery) => (
          <Card key={recovery.recovery_id} className="feed-card">
            <CardContent>
              <Typography variant="h6">{recovery.name}</Typography>
              <Typography variant="body1">{recovery.description}</Typography>
              <div className="trick-card-actions">
                {/* <IconButton size="small" color="primary">
                  <EditIcon />
                </IconButton> */}
                <IconButton
                  size="small"
                  style={{ color: "red" }}
                  // Handle delete click
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </div>
              {/* Additional recovery details here */}
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="body1" style={{ fontWeight: "bold" }}>
          No warm-ups found. Don't pull a muscle :)
        </Typography>
      )}
    </div>
  </>
);

export default RecoveriesList;
