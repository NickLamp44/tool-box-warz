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
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { red } from "@mui/material/colors";

export default function ShowCaseCard({ showcase }) {
  const [isFavorited, setIsFavorited] = useState(false);

  if (!showcase) return null;

  const getInitials = (name) => {
    console.log("[v0] getInitials called with:", name, "type:", typeof name);
    if (!name || typeof name !== "string" || name.trim() === "") {
      console.log("[v0] Invalid name, returning TB");
      return "TB";
    }
    try {
      const initials = name
        .trim()
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase();
      console.log("[v0] Generated initials:", initials);
      return initials;
    } catch (error) {
      console.error("[v0] Error generating initials:", error);
      return "TB";
    }
  };

  const extractShowcaseData = (post) => {
    // Extract featured image
    const featuredMedia = post._embedded?.["wp:featuredmedia"]?.[0];
    let image = "/showcase-featured-image.png";

    if (featuredMedia && !featuredMedia.code) {
      image = featuredMedia.source_url;
    } else {
      // Fallback: extract first image from content
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = post.content?.rendered || "";
      const firstImg = tempDiv.querySelector("img");
      if (firstImg?.src) {
        image = firstImg.src;
      }
    }

    // Extract author
    const embeddedAuthor = post._embedded?.author?.[0];
    let author = "The Bike Bench";
    if (embeddedAuthor && !embeddedAuthor.code) {
      author =
        embeddedAuthor.display_name ||
        embeddedAuthor.name ||
        embeddedAuthor.slug ||
        "The Bike Bench";
    } else if (post.author && typeof post.author === "string") {
      author = post.author;
    } else if (post.author && typeof post.author === "number") {
      // Handle case where author is an ID - use fallback
      author = "The Bike Bench";
    }

    console.log("[v0] Extracted author:", author, "type:", typeof author);

    // Extract preview text from excerpt or content
    let previewText = "";
    if (post.excerpt?.rendered) {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = post.excerpt.rendered;
      previewText = tempDiv.textContent || tempDiv.innerText || "";
    } else if (post.content?.rendered) {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = post.content.rendered;
      previewText =
        (tempDiv.textContent || tempDiv.innerText || "").substring(0, 150) +
        "...";
    }

    return {
      id: post.id,
      title: post.title?.rendered || post.title,
      image,
      author,
      date: new Date(post.date),
      previewText,
      slug: post.slug,
    };
  };

  const showcaseData = showcase.title?.rendered
    ? extractShowcaseData(showcase)
    : {
        id: showcase.id,
        title: showcase.title,
        image: showcase.image,
        author: showcase.author,
        date: showcase.date,
        previewText: showcase.previewText,
        slug: showcase.slug || showcase.id,
      };

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
    console.log("Added to favorites:", showcaseData.title);
  };

  const handleShareClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Shared:", showcaseData.title);
  };

  return (
    <Link
      to={`/showcase/${showcaseData.slug || showcaseData.id}`}
      style={{ textDecoration: "none" }}
    >
      <Card
        sx={{
          width: { xs: "100%", sm: 300, md: 345 },
          height: 420,
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
          "&:hover .showcase-image": {
            transform: "scale(1.05)",
          },
          "&:hover .showcase-title": {
            color: "primary.main",
          },
        }}
      >
        {/* Image with Hover Effect */}
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
            image={showcaseData.image}
            alt={showcaseData.title}
            className="showcase-image"
            sx={{
              width: "100%",
              height: 160,
              objectFit: "cover",
              transition: "transform 0.3s ease",
            }}
          />

          {/* Subtle overlay on hover */}
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
              {getInitials(showcaseData.author)}
            </Avatar>
          }
          title={
            <Typography
              variant="h6"
              className="showcase-title"
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
              {showcaseData.title}
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

              {showcaseData.date?.toLocaleString?.("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              }) ||
                showcaseData.date?.toLocaleDateString?.("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}

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
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              lineHeight: 1.5,
              fontSize: "0.875rem",
            }}
          >
            {showcaseData.previewText}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
        </CardContent>

        {/* Action Buttons */}
        <CardActions
          disableSpacing
          sx={{
            paddingTop: 0,
            justifyContent: "center",
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
