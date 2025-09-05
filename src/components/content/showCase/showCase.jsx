"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Chip,
  CircularProgress,
  Alert,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
// Pages & Components
import Comments from "../comments/comments";

const WordPressContent = styled(Box)(({ theme }) => ({
  "& img": {
    maxWidth: "100%",
    height: "auto",
    borderRadius: theme.spacing(1),
    margin: theme.spacing(2, 0),
  },
  "& p": {
    marginBottom: theme.spacing(2),
    lineHeight: 1.7,
    color: theme.palette.text.primary,
  },
  "& h1, & h2, & h3, & h4, & h5, & h6": {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    color: theme.palette.text.primary,
  },
  "& blockquote": {
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    paddingLeft: theme.spacing(2),
    margin: theme.spacing(2, 0),
    fontStyle: "italic",
    backgroundColor: theme.palette.grey[50],
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
  },
  "& ul, & ol": {
    paddingLeft: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  "& li": {
    marginBottom: theme.spacing(0.5),
  },
}));

export default function ShowCaseArticle() {
  const { showCaseId } = useParams();
  const [showCase, setShowCase] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchShowCase = async () => {
      try {
        const wpUrl = process.env.REACT_APP_WORDPRESS_URL;

        if (!wpUrl) {
          console.error("[v0] WordPress URL not configured");
          setError("WordPress URL not configured");
          return;
        }

        let apiUrl;
        if (isNaN(showCaseId)) {
          // If showCaseId is not a number, treat it as a slug
          apiUrl = `${wpUrl}/posts?slug=${showCaseId}&_embed`;
        } else {
          // If showCaseId is a number, treat it as an ID
          apiUrl = `${wpUrl}/posts/${showCaseId}?_embed`;
        }

        console.log("[v0] Fetching showcase from:", apiUrl);
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`WordPress API returned ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("WordPress API returned HTML instead of JSON");
        }

        const data = await response.json();
        const post = Array.isArray(data) ? data[0] : data;

        if (!post) {
          setError("ShowCase not found");
          return;
        }

        const categories = post._embedded?.["wp:term"]?.[0] || [];
        const hasShowcaseCategory = categories.some(
          (cat) =>
            cat.name.toLowerCase().includes("showcase") ||
            cat.slug.toLowerCase().includes("showcase")
        );

        if (!hasShowcaseCategory) {
          setError("This article is not a showcase");
          return;
        }

        setShowCase(post);
      } catch (err) {
        console.error("Failed to fetch showcase:", err);
        setError("Failed to fetch ShowCase");
      } finally {
        setLoading(false);
      }
    };

    fetchShowCase();
  }, [showCaseId]);

  const extractFeaturedImage = (post) => {
    // Try embedded featured media first
    const featuredMedia = post._embedded?.["wp:featuredmedia"]?.[0];
    if (featuredMedia && !featuredMedia.code) {
      return featuredMedia.source_url;
    }

    // Fallback: extract first image from content
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = post.content?.rendered || "";
    const firstImg = tempDiv.querySelector("img");
    return firstImg?.src || "/showcase-featured-image.png";
  };

  const extractAuthorName = (post) => {
    const embeddedAuthor = post._embedded?.author?.[0];
    if (embeddedAuthor && !embeddedAuthor.code) {
      return (
        embeddedAuthor.display_name ||
        embeddedAuthor.name ||
        embeddedAuthor.slug
      );
    }
    return "The Bike Bench";
  };

  if (loading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", my: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ my: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!showCase) {
    return (
      <Container sx={{ my: 4 }}>
        <Alert severity="info">ShowCase not found</Alert>
      </Container>
    );
  }

  const featuredImage = extractFeaturedImage(showCase);
  const authorName = extractAuthorName(showCase);
  const categories = showCase._embedded?.["wp:term"]?.[0] || [];
  const publishedDate = new Date(showCase.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Container sx={{ my: 4 }}>
      <Paper
        sx={{
          position: "relative",
          backgroundImage: `url(${featuredImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: 2,
          overflow: "hidden",
          mb: 4,
          minHeight: 400,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        />
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            color: "white",
            p: 4,
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom>
            {showCase.title?.rendered}
          </Typography>
          <Typography variant="h6" sx={{ mb: 1 }}>
            By {authorName}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {publishedDate}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 1,
              flexWrap: "wrap",
            }}
          >
            {categories.map((category) => (
              <Chip
                key={category.id}
                label={category.name}
                variant="filled"
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  color: "white",
                  backdropFilter: "blur(10px)",
                }}
              />
            ))}
          </Box>
        </Box>
      </Paper>

      <WordPressContent>
        <div dangerouslySetInnerHTML={{ __html: showCase.content?.rendered }} />
      </WordPressContent>

      {/* Comments section */}
      <Box sx={{ mt: 4 }}>
        <Comments showCaseId={showCaseId} />
      </Box>
    </Container>
  );
}
