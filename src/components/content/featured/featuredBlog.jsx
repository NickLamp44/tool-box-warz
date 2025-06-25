import {
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Grid,
  Box,
  CircularProgress,
  Container,
} from "@mui/material";
import { useState, useEffect } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // adjust path as needed
import BlogCard from "./BlogCard";

const FeaturedBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [sortType, setSortType] = useState("recent");

  const fetchBlogs = async (type) => {
    try {
      setLoadingBlogs(true);
      const orderField = type === "popular" ? "views" : "publishedDate";
      const blogQuery = query(
        collection(db, "blogs"),
        orderBy(orderField, "desc"),
        limit(3)
      );
      const snapshot = await getDocs(blogQuery);
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
      setBlogs(fetched);
    } catch (err) {
      console.error("🔥 Failed to fetch blogs:", err);
    } finally {
      setLoadingBlogs(false);
    }
  };

  useEffect(() => {
    fetchBlogs(sortType);
  }, [sortType]);

  return (
    <Container className="mb-5">
      <Typography variant="h4" gutterBottom align="center">
        Featured Blogs
      </Typography>

      <Box display="flex" justifyContent="center" mb={2}>
        <ToggleButtonGroup
          value={sortType}
          exclusive
          onChange={(e, newSort) => {
            if (newSort) setSortType(newSort);
          }}
          size="small"
        >
          <ToggleButton value="recent">Recent</ToggleButton>
          <ToggleButton value="popular">Popular</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {loadingBlogs ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {blogs.map((blog) => (
            <Grid item key={blog.id} xs={12} sm={6} md={4}>
              <BlogCard blog={blog} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default FeaturedBlogs;
