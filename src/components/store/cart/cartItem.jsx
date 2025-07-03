import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { styled } from "@mui/system";

const ItemContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: theme.spacing(2),
}));

const ItemDetails = styled(Box)(({ theme }) => ({
  flex: 1,
  marginLeft: theme.spacing(2),
}));

const CartItem = ({ item, onAdd, onRemove }) => {
  return (
    <ItemContainer>
      <img src={item.image} alt={item.title} width="60" height="60" />
      <ItemDetails>
        <Typography variant="subtitle1">{item.title}</Typography>
        <Typography variant="body2">
          ${item.price.toFixed(2)} × {item.quantity}
        </Typography>
        <Typography variant="body2">
          = ${(item.price * item.quantity).toFixed(2)}
        </Typography>
      </ItemDetails>
      <Box>
        <IconButton onClick={onAdd}>
          <Add />
        </IconButton>
        <IconButton onClick={onRemove}>
          <Remove />
        </IconButton>
        <IconButton onClick={onRemove}>
          <Delete />
        </IconButton>
      </Box>
    </ItemContainer>
  );
};

export default CartItem;
