// ShowCASE: Basic ShowCASE sorting & filtering
// Category button filters
// Blogs: Basic Blog sorting & filtering with MUI
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
import ShowCASECard from "../components/content/showCase/showCaseCard";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";

const categories = ["All", "TBoY", "ShowCASE", "Pro DH", "DIY"];

export default function ShowCase() {
  const [activeCategory, setActiveCategory] = useState("all");

  const [showCases, setShowCases] = useState([]);
  const [loadingShowCases, setLoadingShowCases] = useState([true]);

  useEffect(() => {
    const fetchShowCases = async () => {
      try {
        const snapshot = await getDocs(collection(db, "showcases"));
        const fetched = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title,
            author: data.authorName,
            date: data.publishedDate,
            category: data.tags?.[0] || "tools",
            image: data.heroImage?.src,
            previewText: data.subtitle,
          };
        });
        setShowCases(fetched);
      } catch (err) {
        console.error("🔥 Failed to fetch ShowCase:", err);
      } finally {
        setLoadingShowCases(false);
      }
    };

    fetchShowCases();
  }, []);

  const filteredShowCases =
    activeCategory === "all"
      ? showCases
      : showCases.filter((showcase) => showcase.category === activeCategory);

  return (
    <Container sx={{ my: 6 }}>
      <Typography variant="h4" gutterBottom>
        ShowCASE
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

      {loadingShowCases ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredShowCases.map((showcase) => (
            <Grid item key={showcase.id} xs={12} sm={6} md={4}>
              <ShowCASECard showcase={showcase} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
