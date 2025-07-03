import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useCart } from "../../../context/cartContext";

function Info() {
  const { cartItems } = useCart();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <React.Fragment>
      <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
        Total
      </Typography>
      <Typography variant="h4" gutterBottom>
        ${totalPrice.toFixed(2)}
      </Typography>

      <List disablePadding>
        {cartItems.map((item) => (
          <ListItem key={item.id} sx={{ py: 1, px: 0 }}>
            <ListItemText
              sx={{ mr: 2 }}
              primary={item.title}
              secondary={`Qty: ${item.quantity}`}
            />
            <Typography variant="body1" sx={{ fontWeight: "medium" }}>
              ${(item.price * item.quantity).toFixed(2)}
            </Typography>
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
}

export default Info;
