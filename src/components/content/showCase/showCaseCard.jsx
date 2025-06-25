import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
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

import { red } from "@mui/material/colors";

export default function ShowCASECard({ showcase }) {
  if (!showcase) return null;

  const getInitials = (name) =>
    name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();

  return (
    <Link to={`/showcase/${showcase.id}`} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          width: { xs: "100%", sm: 300, md: 345 },
          height: 420,
          display: "flex",
          flexDirection: "column",
          padding: 2,
          boxSizing: "border-box",
          cursor: "pointer",
        }}
      >
        <CardMedia
          component="img"
          image={showcase.image}
          alt={showcase.title}
          sx={{
            borderRadius: 1,
            width: "100%",
            height: 160,
            objectFit: "cover",
          }}
        />

        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[700] }} aria-label="author">
              {getInitials(showcase.author)}
            </Avatar>
          }
          title={showcase.title}
          subheader={showcase.date}
          sx={{ paddingBottom: 0 }}
        />

        <CardContent
          sx={{
            flexGrow: 1,
            paddingTop: 1,
            paddingBottom: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {showcase.previewText}
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
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
