import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  Avatar,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { red } from "@mui/material/colors";

export default function ShowCaseCard({ showcase }) {
  if (!showcase) return null;

  const getInitials = (name) =>
    name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();

  return (
    <Link to={`/showcase/${showcase.id}`} style={{ textDecoration: "none" }}>
      <Card sx={{ maxWidth: 345, cursor: "pointer" }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="author">
              {getInitials(showcase.author)}
            </Avatar>
          }
          title={showcase.title}
          subheader={showcase.date}
        />
        <CardMedia
          component="img"
          height="194"
          image={showcase.image}
          alt={showcase.title}
        />

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
