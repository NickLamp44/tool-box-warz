// Frameworks & Libraries
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
// Pages & Components

// Styling

export default function QuickShop({ open, onClose, merch }) {
  const [selectedSize, setSelectedSize] = useState("");
  const sizes = ["X-Small", "Small", "Medium", "Large", "X-Large"];

  const [quantity, setQuantity] = useState(1);

  if (!merch) return null;

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
          <img src={merch.image} alt={merch.title} width="100%" />
          <Typography variant="h6">${merch.price}</Typography>

          {/* Choose Size  */}
          <Typography variant="subtitle1">Select Size:</Typography>
          <Box display="flex" gap={1} flexWrap="wrap">
            {sizes.map((size) => (
              <Button
                key={size}
                variant={selectedSize === size ? "contained" : "outlined"}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </Button>
            ))}
          </Box>

          {/* Choose Quantity  */}
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
        {/* NEEDS UPDATING */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            if (!selectedSize) {
              alert("Please select a size before adding to cart.");
              return;
            }

            const cartItem = {
              id: merch.id,
              title: merch.title,
              size: selectedSize,
              quantity: quantity,
              price: merch.price,
              image: merch.image,
            };

            console.log("Add to cart:", cartItem);
            onClose();
          }}
        >
          Add to Cart
        </Button>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
