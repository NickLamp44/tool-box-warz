import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { Container, Row, Col, Badge } from "react-bootstrap";
import { Typography, Divider } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
// Pages & Components
import ShowCaseViewer from "./showCaseViewer";
import Comments from "./comments";
// Styling

export default function ShowCaseArticle() {
  const { showCaseId } = useParams();
  const [showCase, setShowCase] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchShowCase = async () => {
      try {
        const showCaseRef = doc(db, "showcases", showCaseId);
        const showCaseSnap = await getDoc(showCaseRef);
        if (showCaseSnap.exists()) {
          setShowCase(showCaseSnap.data());
        } else {
          setError("ShowCase not found");
        }
      } catch (err) {
        setError("Failed to fetch ShowCase");
      }
    };
    fetchShowCase();
  }, [showCaseId]);

  if (error)
    return (
      <Container>
        <p>{error}</p>
      </Container>
    );
  if (!showCase)
    return (
      <Container>
        <p>Loading...</p>
      </Container>
    );

  return (
    <Container className="mt-5">
      {/* Hero */}
      <section className="position-relative text-center mb-4">
        <img
          src={showCase.heroImage?.src}
          alt={showCase.heroImage?.alt}
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
          <Typography variant="h3" component="h1" gutterBottom>
            {showCase.title}
          </Typography>
          <Typography variant="subtitle1">By {showCase.authorName}</Typography>
          <Typography variant="subtitle2" className="text-light">
            {showCase.publishedDate}
          </Typography>
          <div className="mt-2">
            {showCase.tags?.map((tag) => (
              <Badge key={tag} bg="light" text="dark" className="me-1">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Subtitle */}
      <Typography variant="h4" className="mt-5 mb-3">
        {showCase.subtitle}
      </Typography>

      {/* Video and Showcase Viewer */}
      <ShowCaseViewer showcase={showCase} />

      {/* ShowCase Sections */}
      {showCase.sections.map((section, index) => (
        <section key={index} className="mb-5">
          {section.heading && (
            <Typography variant={index === 0 ? "h5" : "h3"} gutterBottom>
              {section.heading}
            </Typography>
          )}
          {section.paragraphs?.map((text, i) => (
            <Typography key={i} paragraph>
              {text}
            </Typography>
          ))}
          {section.images?.length > 0 &&
            (section.images.length === 1 ? (
              <img
                src={section.images[0].src}
                alt={section.images[0].alt}
                className="img-fluid rounded my-3"
              />
            ) : (
              <Row>
                {section.images.map((img, i) => (
                  <Col md={6} key={i}>
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="img-fluid rounded my-3"
                    />
                  </Col>
                ))}
              </Row>
            ))}
          {index === 0 && <Divider className="my-4" />}
        </section>
      ))}

      <Divider className="my-4" />
      <Comments showCaseId={showCaseId} />
    </Container>
  );
}
