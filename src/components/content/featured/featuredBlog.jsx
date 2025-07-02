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
import BlogCard from "../blog/blogCard";
import { db } from "../../../services/firebase";
import { collection, getDocs } from "firebase/firestore";

const categories = ["All", "Most Recent", "Most Popular"];

export default function FeaturedBlogs() {
  const [allMerch, setAllMerch] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [blogs, setBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState([true]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const snapshot = await getDocs(collection(db, "blogs"));
        const fetched = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title,
            author: data.authorName,
            date: data.publishedDate,
            category: data.tags?.[0] || "Blog",
            image: data.heroImage?.src,
            previewText: data.subtitle,
          };
        });
        setBlogs(fetched);
      } catch (err) {
        console.error("🔥 Failed to fetch ShowCase:", err);
      } finally {
        setLoadingBlogs(false);
      }
    };

    fetchBlogs();
  }, []);

  const filteredBlogs =
    activeCategory === "all"
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
