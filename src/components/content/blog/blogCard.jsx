"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Chip,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { red } from "@mui/material/colors";

export default function BlogCard({ blog }) {
  const [isFavorited, setIsFavorited] = useState(false);

  if (!blog) return null;

  const getInitials = (name) =>
    name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "??";

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
    console.log("Added to favorites:", blog.title);
  };

  const handleShareClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Shared:", blog.title);
  };

  // Format date properly
  const formatDate = (date) => {
    if (!date) return "";

    // Handle different date formats
    if (date.toDate && typeof date.toDate === "function") {
      return date.toDate().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }

    if (date instanceof Date) {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }

    // Handle string dates
    if (typeof date === "string") {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }

    return date;
  };

  // Get preview text from subtitle or first content section
  const getPreviewText = () => {
    if (blog.subtitle) return blog.subtitle;
    if (blog.content && blog.content.length > 0) {
      const firstSection = blog.content[0];
      if (firstSection.content) {
        return firstSection.content.substring(0, 150) + "...";
      }
    }
    return "Read more about this article...";
  };

  return (
    <Link to={`/blog/${blog.id}`} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          width: { xs: "100%", sm: 300, md: 345 },
          height: 480,
          display: "flex",
          flexDirection: "column",
          padding: 2,
          boxSizing: "border-box",
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: 8,
            transform: "translateY(-4px)",
          },
          "&:hover .blog-image": {
            transform: "scale(1.05)",
          },
          "&:hover .blog-title": {
            color: "primary.main",
          },
        }}
      >
        {/* Hero Image */}
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 1,
            mb: 1,
          }}
        >
          <CardMedia
            component="img"
            image={
              blog.heroImage?.src || "/placeholder.svg?height=160&width=345"
            }
            alt={blog.heroImage?.alt || blog.title}
            className="blog-image"
            sx={{
              width: "100%",
              height: 160,
              objectFit: "cover",
              transition: "transform 0.3s ease",
            }}
          />

          {/* Overlay on hover */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 100%)",
              opacity: 0,
              transition: "opacity 0.3s ease",
              ".MuiCard-root:hover &": {
                opacity: 1,
              },
            }}
          />
        </Box>

        {/* Header with Author Info */}
        <CardHeader
          avatar={
            <Avatar
              sx={{
                bgcolor: red[700],
                width: { xs: 36, sm: 40 },
                height: { xs: 36, sm: 40 },
                fontSize: { xs: "0.875rem", sm: "1rem" },
                transition: "transform 0.2s ease",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
              aria-label="author"
            >
              {getInitials(blog.authorName)}
            </Avatar>
          }
          title={
            <Typography
              variant="h6"
              className="blog-title"
              sx={{
                fontWeight: 600,
                fontSize: {
                  xs: "clamp(0.875rem, 3vw, 1rem)",
                  sm: "clamp(1rem, 2.5vw, 1.125rem)",
                  md: "clamp(1.125rem, 2vw, 1.25rem)",
                },
                lineHeight: 1.3,
                transition: "color 0.2s ease",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                wordBreak: "break-word",
                hyphens: "auto",
              }}
            >
              {blog.title}
            </Typography>
          }
          subheader={
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                fontWeight: 500,
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                mt: 0.5,
              }}
            >
              {formatDate(blog.publishedDate)}
            </Typography>
          }
          sx={{
            paddingBottom: 1,
            paddingTop: 0,
            alignItems: "flex-start",
            "& .MuiCardHeader-content": {
              overflow: "hidden",
              minWidth: 0,
            },
          }}
        />

        {/* Content */}
        <CardContent
          sx={{
            flexGrow: 1,
            paddingTop: 0,
            paddingBottom: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 1 }}>
              {blog.tags.slice(0, 3).map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  variant="outlined"
                  sx={{
                    fontSize: "0.75rem",
                    height: "24px",
                  }}
                />
              ))}
              {blog.tags.length > 3 && (
                <Chip
                  label={`+${blog.tags.length - 3}`}
                  size="small"
                  variant="outlined"
                  sx={{
                    fontSize: "0.75rem",
                    height: "24px",
                  }}
                />
              )}
            </Box>
          )}

          <Box sx={{ flexGrow: 1 }} />
        </CardContent>

        {/* Action Buttons */}
        <CardActions
          disableSpacing
          sx={{
            paddingTop: 0,
            justifyContent: "flex-start",
          }}
        >
          <IconButton
            aria-label="add to favorites"
            onClick={handleFavoriteClick}
            sx={{
              color: isFavorited ? "error.main" : "text.secondary",
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "error.light",
                color: "error.main",
                transform: "scale(1.1)",
              },
            }}
          >
            <FavoriteIcon />
          </IconButton>

          <IconButton
            aria-label="share"
            onClick={handleShareClick}
            sx={{
              color: "text.secondary",
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "primary.light",
                color: "primary.main",
                transform: "scale(1.1)",
              },
            }}
          >
            <ShareIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />

          <Typography
            variant="caption"
            sx={{
              color: "text.disabled",
              fontStyle: "italic",
              opacity: 0.7,
            }}
          >
            Read more →
          </Typography>
        </CardActions>
      </Card>
    </Link>
  );
}
