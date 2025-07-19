"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../services/firebase";
import { Container, Row, Col } from "react-bootstrap";
import { Typography, Divider, Chip, Box } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import Comments from "../comments/comments";
import { convertMultipleGsUrls } from "../../../util/firebasestorage"; // This converts gs:// to https://
import {
  parseFrontmatter,
  parseContent,
  processFirebaseImages,
} from "../../../util/parseContent"; // Import for potential client-side parsing/processing if needed

const formatDate = (timestamp) => {
  if (!timestamp) return "";

  if (timestamp instanceof Date) {
    return timestamp.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  if (timestamp.seconds) {
    return new Date(timestamp.seconds * 1000).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  if (typeof timestamp === "string") {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return timestamp;
};

export default function BlogArticle() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogRef = doc(db, "blogs", blogId);
        const blogSnap = await getDoc(blogRef);

        if (blogSnap.exists()) {
          let blogData = blogSnap.data();
          console.log("Raw blog data from Firestore:", blogData); // Debug log

          // IMPORTANT: This block assumes your Firestore document *might* still contain raw markdown.
          // Ideally, you should parse and process the markdown *before* saving to Firestore.
          // If your upload process is already saving fully parsed data, you can remove this `if` block.
          if (blogData.rawContent) {
            console.log("Found rawContent, parsing on client-side...");
            const { frontmatter, body } = parseFrontmatter(blogData.rawContent);
            const parsedContent = parseContent(body);
            blogData = {
              ...blogData,
              ...frontmatter,
              content: parsedContent,
            };
            // Process relative Firebase paths to gs:// URLs if not already done
            blogData = processFirebaseImages(blogData);
          } else {
            // If rawContent is NOT present, assume the data is already parsed.
            // However, we still need to ensure image paths are gs:// and then convert to https://
            // The `processFirebaseImages` function ensures relative paths are converted to gs://
            // This is a safety net if the upload process didn't fully convert paths.
            blogData = processFirebaseImages(blogData);
          }

          // Final conversion from gs:// URLs to https:// URLs for display
          const convertedBlog = await convertMultipleGsUrls(blogData);
          setBlog(convertedBlog);
          console.log("Final blog state after all processing:", convertedBlog); // Debug log
        } else {
          setError("Blog not found");
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError("Failed to fetch blog");
      }
    };

    fetchBlog();
  }, [blogId]);

  if (error) {
    return (
      <Container>
        <Typography variant="h4" color="error" className="text-center mt-5">
          {error}
        </Typography>
      </Container>
    );
  }

  if (!blog) {
    return (
      <Container>
        <Typography variant="h4" className="text-center mt-5">
          Loading...
        </Typography>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      {/* Hero Section */}
      <section className="position-relative text-center mb-5">
        <img
          src={
            blog.heroImage?.src ||
            blog.heroImage ||
            "/placeholder.svg?height=400&width=1200"
          }
          alt={blog.heroImage?.alt || blog.heroImageAlt || blog.title}
          className="img-fluid w-100 rounded"
          style={{ height: "400px", objectFit: "cover" }}
        />
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            borderRadius: "0.375rem",
          }}
        />
        <div
          className="position-absolute top-50 start-50 translate-middle text-white"
          style={{ zIndex: 2 }}
        >
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            className="fw-bold"
          >
            {blog.title}
          </Typography>
          <Typography variant="h6" className="mb-2">
            By {blog.authorName || blog.author}
          </Typography>
          <Typography variant="subtitle1" className="text-light mb-3">
            {formatDate(blog.publishedDate)}
          </Typography>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              {blog.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  variant="filled"
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.2)",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.3)",
                    },
                  }}
                />
              ))}
            </Box>
          )}
        </div>
      </section>

      {/* Subtitle */}
      {blog.subtitle && (
        <Typography
          variant="h4"
          className="text-center mb-4 text-muted"
          style={{ fontStyle: "italic" }}
        >
          {blog.subtitle}
        </Typography>
      )}

      {/* Blog Content */}
      {blog.content && blog.content.length > 0 && (
        <article>
          {blog.content.map((section, index) => {
            if (!section || typeof section !== "object") {
              console.warn(`Invalid section at index ${index}:`, section);
              return null;
            }

            return (
              <section key={index} className="mb-5">
                {section.title && typeof section.title === "string" && (
                  <Typography variant="h3" gutterBottom className="mt-5 mb-4">
                    {section.title}
                  </Typography>
                )}

                {section.content && typeof section.content === "string" && (
                  <Typography
                    paragraph
                    style={{
                      whiteSpace: "pre-line",
                      fontSize: "1.1rem",
                      lineHeight: 1.7,
                      marginBottom: "2rem",
                    }}
                  >
                    {section.content}
                  </Typography>
                )}

                {/* Main section images */}
                {section.images &&
                  Array.isArray(section.images) &&
                  section.images.length > 0 && (
                    <div className="my-4">
                      {section.type === "doubleSection" &&
                      section.images.length === 2 ? (
                        <Row>
                          {section.images.map((img, i) => (
                            <Col md={6} key={i} className="mb-3">
                              <img
                                src={
                                  img.src ||
                                  "/placeholder.svg?height=300&width=400"
                                }
                                alt={img.alt || ""}
                                className="img-fluid rounded shadow-sm"
                                style={{
                                  width: "100%",
                                  height: "300px",
                                  objectFit: "cover",
                                }}
                              />
                            </Col>
                          ))}
                        </Row>
                      ) : (
                        section.images.map((img, i) => (
                          <div key={i} className="text-center my-4">
                            <img
                              src={
                                img.src ||
                                "/placeholder.svg?height=400&width=600"
                              }
                              alt={img.alt || ""}
                              className="img-fluid rounded shadow-sm"
                              style={{
                                maxHeight: "500px",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                        ))
                      )}
                    </div>
                  )}

                {/* Subsections */}
                {section.subsections &&
                  Array.isArray(section.subsections) &&
                  section.subsections.length > 0 && (
                    <div className="mt-4">
                      {section.subsections.map((subsection, subIndex) => {
                        if (!subsection || typeof subsection !== "object") {
                          console.warn(
                            `Invalid subsection at ${index}.${subIndex}:`,
                            subsection
                          );
                          return null;
                        }

                        return (
                          <div key={subIndex} className="mb-5">
                            {subsection.title &&
                              typeof subsection.title === "string" && (
                                <Typography
                                  variant="h4"
                                  gutterBottom
                                  className="mt-4 mb-3"
                                  style={{ color: "#2c3e50" }}
                                >
                                  {subsection.title}
                                </Typography>
                              )}

                            {subsection.images &&
                              Array.isArray(subsection.images) &&
                              subsection.images.length > 0 && (
                                <div className="text-center my-4">
                                  {subsection.images.map((img, imgIndex) => (
                                    <img
                                      key={imgIndex}
                                      src={
                                        img.src ||
                                        "/placeholder.svg?height=400&width=600"
                                      }
                                      alt={img.alt || subsection.title || ""}
                                      className="img-fluid rounded shadow-sm mb-3"
                                      style={{
                                        maxHeight: "400px",
                                        objectFit: "cover",
                                        display: "block",
                                        margin: "0 auto 1rem auto",
                                      }}
                                    />
                                  ))}
                                </div>
                              )}

                            {subsection.content &&
                              typeof subsection.content === "string" && (
                                <Typography
                                  paragraph
                                  style={{
                                    whiteSpace: "pre-line",
                                    fontSize: "1rem",
                                    lineHeight: 1.6,
                                  }}
                                >
                                  {subsection.content}
                                </Typography>
                              )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                {index < blog.content.length - 1 && (
                  <Divider className="my-5" />
                )}
              </section>
            );
          })}
        </article>
      )}

      <Divider className="my-5" />
      <Comments blogId={blogId} />
    </Container>
  );
}
