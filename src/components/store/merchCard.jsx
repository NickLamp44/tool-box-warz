import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  IconButton,
  CircularProgress,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import QuickShop from "./merchQuickShop";

export default function MerchCard({ merch }) {
  const [open, setOpen] = useState(false);

  if (!merch) return <CircularProgress />;

  const imagePath = merch.image.startsWith("/")
    ? merch.image
    : `/${merch.image}`;

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          title={merch.title}
          subheader={`$${parseFloat(merch.price).toFixed(2)}`}
        />
        <CardMedia
          component="img"
          height="194"
          image={imagePath}
          alt={merch.title}
        />
        <CardActions disableSpacing>
          <IconButton aria-label="QuickShop" onClick={() => setOpen(true)}>
            🛍️
          </IconButton>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
      <QuickShop open={open} onClose={() => setOpen(false)} merch={merch} />
    </>
  );
}

MerchCard.propTypes = {
  merch: PropTypes.object.isRequired,
};
