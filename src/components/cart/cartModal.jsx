import React from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

export default function CartModal({
  open,
  onClose,
  cartItems,
  onRemoveItem,
  total,
}) {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          width: 350,
          p: 2,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
        role="presentation"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Your Cart</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
          {cartItems.length === 0 ? (
            <Typography variant="body1">Your cart is empty.</Typography>
          ) : (
            cartItems.map((item, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="subtitle1">{item.name}</Typography>
                <Typography variant="body2">Qty: {item.quantity}</Typography>
                <Typography variant="body2">
                  ${item.price * item.quantity}
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
            ))
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mt: "auto" }}>
          <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
          <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
            Checkout
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
