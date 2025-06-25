import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import HeroCarousel from "../components/content/featured/heroSlider";
import BlogCard from "../components/content/blog/blogCard";
import MerchCard from "../components/store/merchCard";
import FeaturedShowCase from "../components/content/featured/featuredSC";
import { db } from "../services/firebase";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [sortType, setSortType] = useState("recent");

  const [merchItems, setMerchItems] = useState([]);
  const [loadingMerch, setLoadingMerch] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoadingBlogs(true);
        const orderField = sortType === "popular" ? "views" : "publishedDate";
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

    fetchBlogs();
  }, [sortType]);

  useEffect(() => {
    const fetchMerch = async () => {
      try {
        const merchRef = collection(db, "merch");
        const snapshot = await getDocs(merchRef);
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMerchItems(items.slice(0, 3));
      } catch (err) {
        console.error("❌ Error loading merch:", err);
      } finally {
        setLoadingMerch(false);
      }
    };

    fetchMerch();
  }, []);

  return (
    <Box>
      {/* Hero Carousel Section */}
      <Box className="mb-5">
        <HeroCarousel />
      </Box>

      <FeaturedShowCase />

      {/* Featured Blogs Section */}
      <Container className="mb-5">
        <Typography variant="h4" gutterBottom align="center">
          Featured Blogs
        </Typography>
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

      {/* Latest Merch Section */}
      <Container className="mb-5">
        <Typography variant="h4" gutterBottom align="center">
          Latest Merch Releases
        </Typography>
        {loadingMerch ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {merchItems.map((item) => (
              <Grid item key={item.id} xs={12} sm={6} md={4}>
                <MerchCard merch={item} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
