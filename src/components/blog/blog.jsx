// Blogs: Basic Blog w hero at top, text & photos, gallery at bottom, comment section
// options for video blogs

// Frameworks & Libraries

// Pages & Components

// Styling
import React from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import { Typography, Divider } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";

export default function BlogArticle() {
  return (
    <Container className="mt-5">
      {/* Blog Hero */}
      <section className="mb-4 text-center">
        <img
          src="/path-to-hero.jpg"
          alt="Blog hero"
          className="img-fluid rounded mb-3"
        />
        <Typography variant="h3" component="h1" gutterBottom>
          BlogTitle
        </Typography>
        <Typography variant="subtitle1">By BlogAuthor</Typography>
        <Typography variant="subtitle2" className="text-muted">
          BlogPblshDate
        </Typography>
        <div className="mt-2">
          <Badge bg="secondary" className="me-1">
            DIY
          </Badge>
          <Badge bg="secondary" className="me-1">
            Pro
          </Badge>
          <Badge bg="secondary">Racing</Badge>
        </div>
      </section>

      {/* Secondary Title */}
      <Typography variant="h4" className="mt-5 mb-3">
        From Weekend Warrior to Pro Factory Rider. Here are the 9 tools you
        can’t live without when between the tape
      </Typography>

      {/* Intro Paragraph */}
      <Typography paragraph>
        Having the right set of tools makes getting the job done much easier and
        a lot of the time safer...
      </Typography>

      <Divider className="my-4" />

      {/* Section 1: The Case */}
      <section className="mb-5">
        <Typography variant="h5" gutterBottom>
          The Case
        </Typography>
        <Typography paragraph>
          This hard case is a Pedro’s Master Tool Kit Box...
        </Typography>
        <img
          src="/images/image-1a.jpg"
          alt="Tool Case"
          className="img-fluid rounded my-3"
        />
      </section>

      {/* Section 2: The Layers */}
      <section className="mb-5">
        <Typography variant="h5" gutterBottom>
          The Layers
        </Typography>
        <Typography paragraph>
          Just like the hex L-key set from Wera...
        </Typography>
        <Typography paragraph>
          All the pretty colors help you find the size you need...
        </Typography>
        <Row>
          <Col md={6}>
            <img
              src="/images/image-2a.jpg"
              alt="Wera Torx Set"
              className="img-fluid rounded my-3"
            />
          </Col>
          <Col md={6}>
            <img
              src="/images/image-2b.jpg"
              alt="Tool Set"
              className="img-fluid rounded my-3"
            />
          </Col>
        </Row>
      </section>

      {/* Section 3: Tools You Cannot Go Without */}
      <section className="mb-5">
        <Typography variant="h5" gutterBottom>
          Tools You Cannot Go Without
        </Typography>
        <Typography paragraph>Wera Hex Plus Allen Keys...</Typography>
        <img
          src="/images/image-3a.jpg"
          alt="Hex Keys"
          className="img-fluid rounded my-3"
        />
        <Typography paragraph>Wera Torx L-Key Set...</Typography>
        <img
          src="/images/image-3b.jpg"
          alt="Torx Set"
          className="img-fluid rounded my-3"
        />
        <Typography paragraph>Topeak SmartGauge D2...</Typography>
        <img
          src="/images/image-3c.jpg"
          alt="Pressure Gauge"
          className="img-fluid rounded my-3"
        />
      </section>

      {/* Section 4: Less Obvious Tools */}
      <section className="mb-5">
        <Typography variant="h5" gutterBottom>
          What are some of the less obvious tools?
        </Typography>
        <Typography paragraph>Metal Tape Measurer...</Typography>
        <img
          src="/images/image-4a.jpg"
          alt="Tape Measurer"
          className="img-fluid rounded my-3"
        />
        <Typography paragraph>Torque Wrench...</Typography>
        <ul>
          <li>TW-5.2 – adjustable torque range of 2–14 N·m</li>
          <li>TW-6.2 – range of 10–50 N·m</li>
        </ul>
        <img
          src="/images/image-4b.jpg"
          alt="Torque Wrench"
          className="img-fluid rounded my-3"
        />
        <Typography paragraph>Bearing Press and Removal Tools...</Typography>
        <img
          src="/images/image-4c.jpg"
          alt="Bearing Press"
          className="img-fluid rounded my-3"
        />
        <Typography paragraph>Wera Hex Head Screwdrivers...</Typography>
        <img
          src="/images/image-4d.jpg"
          alt="Hex Screwdrivers"
          className="img-fluid rounded my-3"
        />
      </section>

      {/* Section 5: More Essentials */}
      <section className="mb-5">
        <Typography variant="h5" gutterBottom>
          More Essentials
        </Typography>
        <Typography paragraph>Knipex 86 03 180 – 7” Pliers...</Typography>
        <Typography paragraph>
          Wera 1/4” Drive Zyklop Speed Ratchet...
        </Typography>
        <Row>
          <Col md={6}>
            <img
              src="/images/image-5a.jpg"
              alt="Pliers"
              className="img-fluid rounded my-3"
            />
          </Col>
          <Col md={6}>
            <img
              src="/images/image-5b.jpg"
              alt="Ratchet Tool"
              className="img-fluid rounded my-3"
            />
          </Col>
        </Row>
      </section>

      {/* Gallery & Comments come later */}
    </Container>
  );
}
