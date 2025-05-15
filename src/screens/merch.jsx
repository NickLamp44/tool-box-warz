// Merch Screen: Filters, sort, import mock merch from db
import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  ButtonGroup,
  Grid,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import MerchCard from "../components/store/merchCard";

const mockMerch = [
  {
    id: "sku1",
    title: "TBW Logo Tshirt",
    category: "Shirt",
    image: "https://via.placeholder.com/300x200",
    price: "$19.99",
  },
  {
    id: "sku2",
    title: "TBW Logo Hoodie",
    category: "Sweatshirt",
    image: "https://via.placeholder.com/300x200",
    price: "$29.99",
  },
  {
    id: "sku3",
    title: "TBW Logo Hat",
    category: "Headwear",
    image: "https://via.placeholder.com/300x200",
    price: "$15.99",
  },
  {
    id: "sku4",
    title: "TBW Logo Sticker",
    category: "Accessories",
    image: "https://via.placeholder.com/300x200",
    price: "$1.99",
  },
];

const categories = ["all", "Shirt", "Sweatshirt", "Headwear", "Accessories"];

export default function MerchScreen() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sort, setSort] = useState("");

  const filteredMerch = mockMerch
    .filter((item) =>
      activeCategory === "all" ? true : item.category === activeCategory
    )
    .sort((a, b) => {
      const priceA = parseFloat(a.price.replace("$", ""));
      const priceB = parseFloat(b.price.replace("$", ""));
      if (sort === "asc") return priceA - priceB;
      if (sort === "desc") return priceB - priceA;
      return 0;
    });

  return (
    <Container sx={{ my: 6 }}>
      <Typography variant="h4" gutterBottom>
        Our Merch
      </Typography>

      {/* Filters */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <ButtonGroup variant="text">
          {categories.map((cat) => (
            <Button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              variant={activeCategory === cat ? "contained" : "text"}
              sx={{
                textTransform: "capitalize",
                color: activeCategory === cat ? "white" : "inherit",
                backgroundColor:
                  activeCategory === cat ? "primary.main" : "transparent",
                "&:hover": {
                  backgroundColor:
                    activeCategory === cat ? "primary.dark" : "action.hover",
                },
              }}
            >
              {cat}
            </Button>
          ))}
        </ButtonGroup>

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Sort by</InputLabel>
          <Select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            label="Sort by"
          >
            <MenuItem value="">Default</MenuItem>
            <MenuItem value="asc">Price: Low to High</MenuItem>
            <MenuItem value="desc">Price: High to Low</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={4}>
        {filteredMerch.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4}>
            <MerchCard merch={item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
