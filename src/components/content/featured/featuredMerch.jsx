import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  ButtonGroup,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";
import MerchCard from "../../store/merchCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../services/firebase";

const categories = ["all", "Shirt", "Sweatshirt", "Headwear", "Accessories"];

export default function FeaturedMerch() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [items, setItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(true);

  useEffect(() => {
    const fetchMerch = async () => {
      try {
        const merchRef = collection(db, "merch");
        const snapshot = await getDocs(merchRef);
        const merchData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItems(merchData);
      } catch (err) {
        console.error("🔥 Error fetching merch:", err);
      } finally {
        setLoadingItems(false);
      }
    };
    fetchMerch();
  }, []);

  const filteredMerch =
    activeCategory === "all"
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <Container sx={{ my: 6 }}>
      <Typography variant="h4" gutterBottom>
        Featured Merch
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <ButtonGroup variant="text" aria-label="category button group">
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
      </Box>

      {loadingItems ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={4}>
          {filteredMerch.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4}>
              <MerchCard merch={item} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
