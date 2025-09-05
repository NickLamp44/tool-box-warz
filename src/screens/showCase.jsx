"use client";

import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  ButtonGroup,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";
import ArticleCard from "../components/content/article/articleCard";

export default function ShowCase() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [showCase, setShowCase] = useState([]);
  const [categories, setCategories] = useState(["all"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoriesAndShowCases = async () => {
      try {
        const wpUrl = process.env.REACT_APP_WORDPRESS_URL;

        if (!wpUrl) {
          throw new Error(
            "WordPress URL not configured. Please set REACT_APP_WORDPRESS_URL in your environment variables."
          );
        }

        console.log("[v0] Fetching categories from:", `${wpUrl}/categories`);
        const categoriesResponse = await fetch(`${wpUrl}/categories`);

        if (!categoriesResponse.ok) {
          console.log(
            "[v0] Categories response not OK:",
            categoriesResponse.status,
            categoriesResponse.statusText
          );
          throw new Error(
            `Categories API returned ${categoriesResponse.status}`
          );
        }

        const contentType = categoriesResponse.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const responseText = await categoriesResponse.text();
          console.log(
            "[v0] Categories response is not JSON:",
            responseText.substring(0, 200)
          );
          throw new Error(
            "Categories API returned HTML instead of JSON - check your WordPress URL"
          );
        }

        const categoriesData = await categoriesResponse.json();
        const categoryNames = [
          "all",
          ...categoriesData.map((cat) => cat.name.toLowerCase()),
        ];
        setCategories(categoryNames);

        console.log(
          "[v0] Fetching posts from:",
          `${wpUrl}/posts?per_page=50&_embed`
        );
        const response = await fetch(`${wpUrl}/posts?per_page=50&_embed`);

        if (!response.ok) {
          console.log(
            "[v0] Posts response not OK:",
            response.status,
            response.statusText
          );
          throw new Error(`Posts API returned ${response.status}`);
        }

        const postsContentType = response.headers.get("content-type");
        if (
          !postsContentType ||
          !postsContentType.includes("application/json")
        ) {
          const responseText = await response.text();
          console.log(
            "[v0] Posts response is not JSON:",
            responseText.substring(0, 200)
          );
          throw new Error(
            "Posts API returned HTML instead of JSON - check your WordPress URL and REST API"
          );
        }

        const posts = await response.json();

        const fetched = posts.map((post) => ({
          ...post, // Pass the entire WordPress post object
          category:
            post._embedded?.["wp:term"]?.[0]?.[0]?.name?.toLowerCase() ||
            "tools",
        }));

        setShowCase(fetched);
      } catch (err) {
        console.error("🔥 Failed to fetch WordPress showcases:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesAndShowCases();
  }, []);

  const filteredShowCases =
    activeCategory === "all"
      ? showCase
      : showCase.filter((showCase) => showCase.category === activeCategory);

  if (loading) {
    return (
      <Container sx={{ my: 6 }}>
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container sx={{ my: 6 }}>
      <Typography variant="h4" gutterBottom>
        Our ShowCases
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

      <Grid container spacing={4}>
        {filteredShowCases.map((showCase) => (
          <Grid item key={showCase.id} xs={12} sm={6} md={4}>
            <ArticleCard article={showCase} type="showCase" />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
