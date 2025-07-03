import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useCart } from "../../context/cartContext";

export default function QuickShop({ open, onClose, merch }) {
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { addToCart } = useCart();

  if (!merch) return null;

  // Extract images from merch data - handle different possible structures
  const images = merch.images || [merch.image].filter(Boolean) || [];
  const mainImage = images[selectedImageIndex] || merch.image || "";

  // Extract available sizes from merch data
  const availableSizes = merch.sizes || merch.availableSizes || [];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{merch.title}</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 2,
          }}
        >
          {/* Main Product Image */}
          {mainImage && (
            <img
              src={mainImage || "/placeholder.svg"}
              alt={merch.title}
              style={{
                width: "100%",
                maxHeight: "400px",
                objectFit: "contain",
              }}
            />
          )}

          {/* Image Thumbnails (if multiple images) */}
          {images.length > 1 && (
            <Box display="flex" gap={1} flexWrap="wrap" justifyContent="center">
              {images.map((image, index) => (
                <Box
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  sx={{
                    cursor: "pointer",
                    border:
                      selectedImageIndex === index
                        ? "2px solid #1976d2"
                        : "1px solid #ccc",
                    borderRadius: 1,
                    overflow: "hidden",
                    width: 60,
                    height: 60,
                  }}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${merch.title} view ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              ))}
            </Box>
          )}

          <Typography variant="h6">${merch.price}</Typography>

          {/* Choose Size */}
          {availableSizes.length > 0 && (
            <>
              <Typography variant="subtitle1">Select Size:</Typography>
              <Box display="flex" gap={1} flexWrap="wrap">
                {availableSizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "contained" : "outlined"}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </Box>
            </>
          )}

          {/* Choose Quantity */}
          <Typography variant="subtitle1" mt={2}>
            Quantity:
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <Button
              variant="outlined"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            >
              -
            </Button>
            <Typography>{quantity}</Typography>
            <Button
              variant="outlined"
              onClick={() => setQuantity((prev) => prev + 1)}
            >
              +
            </Button>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "space-between", px: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            // Only require size selection if sizes are available
            if (availableSizes.length > 0 && !selectedSize) {
              alert("Please select a size before adding to cart.");
              return;
            }

            const cartItem = {
              id: `${merch.id}${selectedSize ? `-${selectedSize}` : ""}`,
              title: merch.title,
              size: selectedSize || "One Size",
              quantity: quantity,
              price: merch.price,
              image: mainImage,
            };

            addToCart(cartItem);
            onClose();

            // Reset state for next use
            setSelectedSize("");
            setQuantity(1);
            setSelectedImageIndex(0);
          }}
        >
          Add to Cart
        </Button>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
