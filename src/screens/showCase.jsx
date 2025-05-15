// ShowCASE: Basic ShowCASE sorting & filtering
// Category button filters
// Blogs: Basic Blog sorting & filtering with MUI

import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  ButtonGroup,
  Grid,
  Box,
} from "@mui/material";
import BlogCard from "../components/blog/blogCard";

// Mock blog data
const mockBlogs = [
  {
    id: "pro-tool-case",
    title: "Pro Mountain Biker’s Tool Case",
    author: "Max Morgan",
    date: "May 12, 2024",
    category: "tools",
    image: "https://via.placeholder.com/300x200",
    previewText:
      "Check out the 9 essential tools Max Morgan carries to every race.",
  },
  {
    id: "video-setup",
    title: "Setting Up Suspension - Video Guide",
    author: "Tech Team",
    date: "April 5, 2024",
    category: "video",
    image: "https://via.placeholder.com/300x200",
    previewText:
      "Watch our guide to setting sag, rebound, and pressure like a pro.",
  },
  {
    id: "brake-bleed-guide",
    title: "How to Bleed Disc Brakes",
    author: "Alex Wrench",
    date: "March 22, 2024",
    category: "maintenance",
    image: "https://via.placeholder.com/300x200",
    previewText: "Step-by-step tips to get your brakes sharp again.",
  },
  {
    id: "pedal-upgrades",
    title: "Top 5 Pedals for Trail Riders",
    author: "Riley Knob",
    date: "May 1, 2024",
    category: "tools",
    image: "https://via.placeholder.com/300x200",
    previewText: "Looking for better grip and durability? Start here.",
  },
];

const categories = ["all", "Pro", "DH", "TBOY"];

export default function ShowCASE() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredBlogs =
    activeCategory === "all"
      ? mockBlogs
      : mockBlogs.filter((blog) => blog.category === activeCategory);

  return (
    <Container sx={{ my: 6 }}>
      <Typography variant="h4" gutterBottom>
        ToolBox ShowCASE
      </Typography>

      {/* Category Filter Buttons */}
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

      {/* ShowCase Cards Grid */}
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
