import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import "../styles/ProfilePage.css";

const TipsCard = () => (
  <Card className="side-info-card">
    <CardContent>
      <Typography variant="h6" className="side-info-title">
        Tips
      </Typography>
      <Typography variant="body2" className="side-info-text">
        Always keep your balance centered to improve your control on the board.
      </Typography>
      <Typography variant="body2" className="side-info-text">
        Practice your ollies daily to build up muscle memory.
      </Typography>
      <Typography variant="body2" className="side-info-text">
        Remember to warm up with basic tricks before attempting more complex
        ones.
      </Typography>
      <Typography variant="h6" className="side-info-title">
        Latest Updates
      </Typography>
      <Typography variant="body2" className="side-info-text">
        New tricks and tutorials added every week. Check out the latest
        additions in the Trick Progress Tracker.
      </Typography>
      <Typography variant="body2" className="side-info-text">
        Recovery exercises have been updated for better results. Make sure to
        track your progress.
      </Typography>
    </CardContent>
  </Card>
);

export default TipsCard;
