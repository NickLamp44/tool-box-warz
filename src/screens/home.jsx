// Frameworks & Libraries
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import {
  Container,
  Grid,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { db } from "../services/firebase";

// Pages & Components
import HeroCarousel from "../components/blog/heroSlider";
import BlogCard from "../components/blog/blogCard";
import ShowCASECard from "../components/blog/showCaseCard";
import MerchCard from "../components/store/merchCard";

// Styling

// Home Screen Component
export default function Home() {
  //import Blogs
  const [heroBlogs, setHeroBlogs] = useState([]);
  const [loadingHeroBlogs, setLoadingHeroBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogRef = collection(db, "blogs");
        const snapshot = await getDocs(blogRef);
        const blogs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setHeroBlogs(blogs.slice(0, 3));
      } catch (err) {
        console.error("❌ Error loading blogs:", err);
      } finally {
        setLoadingHeroBlogs(false);
      }
    };
    fetchBlogs();
  }, []);

  // Import Merch Items
  const [merchItems, setMerchItems] = useState([]);
  const [loadingMerch, setLoadingMerch] = useState(true);

  useEffect(() => {
    const fetchMerch = async () => {
      try {
        const merchRef = collection(db, "merch");
        const snapshot = await getDocs(merchRef);
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMerchItems(items.slice(0, 3)); // just latest 3
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

      {/* Showcase Section */}
      <Container className="mb-5">
        <Typography variant="h4" gutterBottom align="center">
          Featured Projects
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <BlogCard />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ShowCASECard />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ShowCASECard />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <BlogCard />
          </Grid>
        </Grid>
      </Container>

      {/* Blog Section */}
      <Container className="mb-5">
        <Typography variant="h4" gutterBottom align="center">
          Latest Blog Posts
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <ShowCASECard />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ShowCASECard />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ShowCASECard />
          </Grid>
        </Grid>
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
