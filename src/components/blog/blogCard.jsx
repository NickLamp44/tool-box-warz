import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { red } from "@mui/material/colors";

export default function BlogCard({ blog }) {
  if (!blog) return null;

  const getInitials = (name) =>
    name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();

  return (
    <Link to={`/blog/${blog.id}`} style={{ textDecoration: "none" }}>
      <Card sx={{ maxWidth: 345, cursor: "pointer" }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="author">
              {getInitials(blog.author)}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={blog.title}
          subheader={blog.date}
        />
        <CardMedia
          component="img"
          height="194"
          image={blog.image}
          alt={blog.title}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {blog.previewText}
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
