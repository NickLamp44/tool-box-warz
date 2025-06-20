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
        {/* Blog Card Header */}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[700] }} aria-label="author">
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

        {/* Blog Card Image */}
        <CardMedia
          component="img"
          height="194"
          image={blog.image}
          alt={blog.title}
        />
        {/* Blog Card Preview */}
        <CardContent>
          <Typography variant="body2" color="text.secondary" height={10}>
            {blog.previewText}
          </Typography>
        </CardContent>

        {/* Blog Card Actions */}
        <CardActions disableSpacing>
          {/* Favorite */}
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>

          {/* Share */}
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Link>
  );
}
