import React, { useState, useEffect } from "react";
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
  CircularProgress,
} from "@mui/material";
import MerchCard from "../components/store/merchCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";

const categories = ["all", "Shirt", "Sweatshirt", "Headwear", "Accessories"];

export default function MerchScreen() {
  const [allMerch, setAllMerch] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMerch = async () => {
      try {
        const merchRef = collection(db, "merch");
        const snapshot = await getDocs(merchRef);
        const merchData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllMerch(merchData);
      } catch (err) {
        console.error("🔥 Error fetching merch:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMerch();
  }, []);

  const filteredMerch = allMerch
    .filter((item) =>
      activeCategory === "all" ? true : item.category === activeCategory
    )
    .sort((a, b) => {
      if (sort === "asc") return a.price - b.price;
      if (sort === "desc") return b.price - a.price;
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

      {loading ? (
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
