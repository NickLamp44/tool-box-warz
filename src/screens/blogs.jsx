// Blogs: Basic Blog sorting & filtering
// options for video blogs
// Category button filters

import React, { useState } from "react";
import { Container, Row, Col, Button, ButtonGroup } from "react-bootstrap";
import { BlogCard } from "../components/blog/blogCard";

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

const categories = ["all", "tools", "video", "maintenance"];

const Blogs = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredBlogs =
    activeCategory === "all"
      ? mockBlogs
      : mockBlogs.filter((blog) => blog.category === activeCategory);

  return (
    <Container className="my-5">
      <h2 className="mb-4">Our Blogs</h2>

      {/* Category Filters */}
      <ButtonGroup className="mb-4">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={activeCategory === cat ? "primary" : "outline-primary"}
            onClick={() => setActiveCategory(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </Button>
        ))}
      </ButtonGroup>

      {/* Blog Cards */}
      <Row>
        {filteredBlogs.map((blog) => (
          <Col key={blog.id} sm={12} md={6} lg={4} className="d-flex">
            <BlogCard blog={blog} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Blogs;
