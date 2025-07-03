import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function Cart({ cartItems, onRemoveItem }) {
  if (cartItems.length === 0) {
    return <Typography>Your cart is empty.</Typography>;
  }

  return (
    <Box>
      {cartItems.map((item) => (
        <Box key={item.id} sx={{ mb: 2 }}>
          <Typography variant="subtitle1">{item.title}</Typography>
          <Typography variant="body2">Qty: {item.quantity}</Typography>
          <Typography variant="body2">
            ${(item.price * item.quantity).toFixed(2)}
          </Typography>
          <Button
            variant="outlined"
            size="small"
            onClick={() => onRemoveItem(item.id)}
            sx={{ mt: 1 }}
          >
            Remove
          </Button>
        </Box>
      ))}
    </Box>
  );
}
