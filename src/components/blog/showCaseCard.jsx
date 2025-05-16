import * as React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function ShowCASECard() {
  return (
    <Link to="/showcase" style={{ textDecoration: "none" }}>
      <Card sx={{ maxWidth: 345, cursor: "pointer" }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="Author Avatar">
              NL
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title="Essential Mountain Biker Tool Case"
          subheader="September 14, 2025"
        />
        <CardMedia
          component="img"
          height="194"
          image="/path-to-img.jpg"
          alt="Toolbox Hero"
        />
        <CardContent>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Having the right set of tools makes getting the job done much easier
            and a lot of the time safer. In this article, we are going to be
            taking a close look at Max Morgan’s tool box...
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Link>
  );
}
