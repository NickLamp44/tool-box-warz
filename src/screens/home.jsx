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
  //import ShowCASE for HomePage Spotlight
  const [showCase, setShowCase] = useState([]);
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
        setShowCase(fetched);
      } catch (err) {
        console.error("🔥 Failed to fetch ShowCase:", err);
      } finally {
        setLoadingShowCases(false);
      }
    };

    fetchShowCases();
  }, []);

  //import Blogs for HomePage Spotlight
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
  }, []);

  // Import Merch Items for HomePage Spotlight
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
          Featured ShowCASE
        </Typography>
        {loadingShowCases ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {showCase.map((showcase) => (
              <Grid item key={showcase.id} xs={12} sm={6} md={4}>
                <ShowCASECard showcase={showcase} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Blog Section */}
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
