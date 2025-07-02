"use client";

import { useState } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Link,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import QuickShop from "./merchQuickShop";

export default function MerchCard({ merch }) {
  const [open, setOpen] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const handleButtonClick = (e, action) => {
    e.preventDefault();
    e.stopPropagation();
    action();
  };

  const formatPrice = (price) => `$${Number.parseFloat(price).toFixed(2)}`;

  const imagePath = merch.image || "/placeholder.svg";

  return (
    <>
      <Link
        href={`/shop/${merch.id}`}
        sx={{
          textDecoration: "none",
          display: "block",
          "&:hover": {
            textDecoration: "none",
          },
        }}
      >
        <Card
          sx={{
            width: { xs: "100%", sm: 300, md: 345 },
            height: 420,
            display: "flex",
            flexDirection: "column",
            boxSizing: "border-box",
            position: "relative",
            overflow: "hidden",
            cursor: "pointer",
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: 6,
              transform: "translateY(-2px)",
            },
          }}
        >
          {/* Image Container with Hover Overlay */}
          <Box
            sx={{
              position: "relative",
              height: 300,
              padding: 2,
              overflow: "hidden",
              "&:hover .hover-overlay": {
                opacity: 1,
                backgroundColor: "rgba(0, 0, 0, 0.3)",
              },
              "&:hover .product-image": {
                transform: "scale(1.05)",
              },
            }}
          >
            <CardMedia
              component="img"
              image={imagePath}
              alt={merch.title}
              className="product-image"
              sx={{
                width: "100%",
                height: "100%",

                objectFit: "cover",
                transition: "transform 0.3s ease",
              }}
            />

            {/* Hover Overlay with Quick Shop Button */}
            <Box
              className="hover-overlay"
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0,
                transition: "all 0.3s ease",
                backgroundColor: "transparent",
              }}
            >
              <Button
                variant="contained"
                size="small"
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  fontWeight: 600,
                  px: 3,
                  py: 1,
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                    transform: "scale(1.05)",
                  },
                }}
                onClick={(e) => handleButtonClick(e, () => setOpen(true))}
              >
                Quick Shop
              </Button>
            </Box>
          </Box>

          <CardContent
            sx={{
              padding: "12px 16px",
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
            }}
          >
            {/* Product Title */}
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                lineHeight: 1.3,
                color: "text.primary",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                transition: "color 0.2s ease",
                "&:hover": {
                  color: "primary.main",
                },
              }}
            >
              {merch.title}
            </Typography>

            {/* Price Section */}
            <Box sx={{ mt: 1 }}>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 500,
                  color: "text.primary",
                  display: "inline",
                }}
              >
                {formatPrice(merch.price)}
              </Typography>
              {merch.originalPrice && merch.isOnSale && (
                <Typography
                  variant="body2"
                  sx={{
                    ml: 1,
                    color: "text.secondary",
                    textDecoration: "line-through",
                    display: "inline",
                  }}
                >
                  {formatPrice(merch.originalPrice)}
                </Typography>
              )}
            </Box>

            {/* Action Buttons */}
            <Box
              sx={{
                display: "flex",
                gap: 0.5,
                justifyContent: "center",
                mt: "auto",
                pt: 2,
              }}
            >
              <IconButton
                size="small"
                sx={{
                  width: 32,
                  height: 32,
                  color: "text.secondary",
                  "&:hover": {
                    backgroundColor: "success.light",
                    color: "success.main",
                  },
                }}
                onClick={(e) => handleButtonClick(e, () => setOpen(true))}
              >
                <AddShoppingCartIcon sx={{ fontSize: 16 }} />
              </IconButton>

              <IconButton
                size="small"
                sx={{
                  width: 32,
                  height: 32,
                  color: isFavorited ? "error.main" : "text.secondary",
                  "&:hover": {
                    backgroundColor: "error.light",
                    color: "error.main",
                  },
                }}
                onClick={(e) =>
                  handleButtonClick(e, () => {
                    setIsFavorited(!isFavorited);
                    console.log("Added to favorites");
                  })
                }
              >
                <FavoriteIcon sx={{ fontSize: 16 }} />
              </IconButton>

              <IconButton
                size="small"
                sx={{
                  width: 32,
                  height: 32,
                  color: "text.secondary",
                  "&:hover": {
                    backgroundColor: "primary.light",
                    color: "primary.main",
                  },
                }}
                onClick={(e) =>
                  handleButtonClick(e, () => console.log("Shared"))
                }
              >
                <ShareIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      </Link>

      <QuickShop open={open} onClose={() => setOpen(false)} merch={merch} />
    </>
  );
}

MerchCard.propTypes = {
  merch: PropTypes.shape({
    id: PropTypes.string.isRequired,
    image: PropTypes.string,
    title: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    originalPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isOnSale: PropTypes.bool,
  }).isRequired,
};
