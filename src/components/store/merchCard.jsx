import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import QuickShop from "./merchQuickShop";

export default function MerchCard({ merch }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader title={merch.title} subheader={merch.price} />
        <CardMedia
          component="img"
          height="194"
          image={merch.image}
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
  merch: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Creater_ID: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Price: PropTypes.string.isRequired,
    sizes: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    inStock: PropTypes.boolean.isRequired,
  }),
  userId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

// Include for merch props what sizes & colors are available
