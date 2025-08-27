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
import BlogCard from "../blog/blogCard";

const categories = ["All", "Most Recent", "Most Popular"];

export default function FeaturedBlogs() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [blogs, setBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const wpUrl = process.env.REACT_APP_WORDPRESS_URL;

        if (!wpUrl) {
          console.error("[v0] WordPress URL not configured");
          return;
        }

        console.log(
          "[v0] Fetching featured blogs from:",
          `${wpUrl}/posts?per_page=3&_embed`
        );
        const response = await fetch(`${wpUrl}/posts?per_page=3&_embed`);

        if (!response.ok) {
          console.log(
            "[v0] Featured blogs response not OK:",
            response.status,
            response.statusText
          );
          throw new Error(`Featured blogs API returned ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const responseText = await response.text();
          console.log(
            "[v0] Featured blogs response is not JSON:",
            responseText.substring(0, 200)
          );
          throw new Error("Featured blogs API returned HTML instead of JSON");
        }

        const posts = await response.json();

        const fetched = posts.map((post) => ({
          id: post.id,
          title: post.title.rendered,
          author: post._embedded?.author?.[0]?.name || "Unknown Author",
          date: new Date(post.date),
          category: post._embedded?.["wp:term"]?.[0]?.[0]?.name || "Blog",
          image:
            post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
            post.featured_media_url ||
            "/blog-featured-image.png",
          previewText:
            post.excerpt.rendered.replace(/<[^>]*>/g, "").substring(0, 150) +
            "...",
          slug: post.slug,
        }));

        setBlogs(fetched);
      } catch (err) {
        console.error("🔥 Failed to fetch WordPress blogs:", err);
      } finally {
        setLoadingBlogs(false);
      }
    };

    fetchBlogs();
  }, []);

  const filteredBlogs =
    activeCategory === "All"
      ? blogs
      : blogs.filter((blog) => blog.category === activeCategory);

  return (
    <Container sx={{ my: 6 }}>
      <Typography variant="h4" gutterBottom>
        Featured Blogs
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

      {loadingBlogs ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredBlogs.map((blog) => (
            <Grid item key={blog.id} xs={12} sm={6} md={4}>
              <BlogCard blog={blog} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
