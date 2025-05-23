// src/pages/Blogs.jsx

import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  ButtonGroup,
  Grid,
  Box,
} from "@mui/material";
import BlogCard from "../components/blog/blogCard";
// import { db } from "../firebase"; // ← future Firestore setup
// import { collection, getDocs } from "firebase/firestore";

// Mock blog data
const mockBlogs = [
  {
    id: "blog",
    title: "Pro Mountain Biker’s Tool Case",
    author: "Max Morgan",
    date: "May 12, 2024",
    category: "tools",
    image: "/Img/basicShowCASE/john-hall-8.jpg",
    previewText:
      "Check out the 9 essential tools Max Morgan carries to every DH race.",
  },
  {
    id: "video-setup",
    title: "Setting Up Suspension - Video Guide",
    author: "Tech Team",
    date: "April 5, 2024",
    category: "video",
    image: "/Img/basicShowCASE/G_Sides89.jpg",
    previewText:
      "Watch our guide to setting sag, rebound, and pressure like a pro.",
  },
  {
    id: "brake-bleed-guide",
    title: "How to Bleed Disc Brakes",
    author: "Alex Wrench",
    date: "March 22, 2024",
    category: "maintenance",
    image: "/Img/basicShowCASE/M3Gravy5.jpg",
    previewText: "Step-by-step tips to get your brakes sharp again.",
  },
  {
    id: "pedal-upgrades",
    title: "Top 5 Pedals for Trail Riders",
    author: "Riley Knob",
    date: "May 1, 2024",
    category: "tools",
    image: "/Img/basicShowCASE/PeterJamisonThumbNail.jpg",
    previewText: "Looking for better grip and durability? Start here.",
  },
];

const categories = ["all", "tools", "video", "maintenance"];

export default function Blogs() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [blogs, setBlogs] = useState(mockBlogs);

  // useEffect(() => {
  //   const fetchBlogs = async () => {
  //     const querySnapshot = await getDocs(collection(db, "blogs"));
  //     const fetchedBlogs = querySnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     setBlogs(fetchedBlogs);
  //   };
  //   fetchBlogs();
  // }, []);

  const filteredBlogs =
    activeCategory === "all"
      ? blogs
      : blogs.filter((blog) => blog.category === activeCategory);

  return (
    <Container sx={{ my: 6 }}>
      <Typography variant="h4" gutterBottom>
        Our Blogs
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
        {filteredBlogs.map((blog) => (
          <Grid item key={blog.id} xs={12} sm={6} md={4}>
            <BlogCard blog={blog} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
