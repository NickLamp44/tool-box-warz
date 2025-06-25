import { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Badge from "react-bootstrap/Badge";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../services/firebase";

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [blogSlides, setBlogSlides] = useState([]);

  const handleSelect = (selectedIndex) => setIndex(selectedIndex);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const snapshot = await getDocs(collection(db, "blogs"));
        const blogs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogSlides(blogs);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <>
      <style jsx>{`
        @media (max-width: 768px) {
          .hero-title {
            font-size: 1.75rem !important;
          }
          .hero-subtitle {
            font-size: 1rem !important;
          }
          .hero-date {
            font-size: 0.9rem !important;
          }
        }

        .fade-in {
          opacity: 0;
          animation: fadeIn 1s ease-in-out forwards;
          animation-delay: 0.3s;
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }
      `}</style>
      <div style={{ maxWidth: "80%", margin: "0 auto" }}>
        <Carousel activeIndex={index} onSelect={handleSelect} fade>
          {blogSlides.map((slide, idx) => (
            <Carousel.Item key={idx}>
              <Link
                to={`/blog/${slide.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <section
                  className="position-relative text-center"
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={slide.heroImage?.src || "/fallback.jpg"}
                    alt={slide.heroImage?.alt || "Blog Image"}
                    className="img-fluid w-100 rounded"
                    style={{
                      height: "600px",
                      objectFit: "cover",
                      borderRadius: "0.375rem",
                    }}
                  />
                  <div
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      borderRadius: "0.375rem",
                    }}
                  ></div>
                  <div
                    className="position-absolute top-50 start-50 translate-middle text-white fade-in"
                    style={{ zIndex: 2 }}
                  >
                    <Typography
                      variant="h3"
                      component="h1"
                      gutterBottom
                      className="hero-title"
                    >
                      {slide.title}
                    </Typography>
                    <Typography variant="subtitle1" className="hero-subtitle">
                      By {slide.authorName || slide.author}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      className="text-light hero-date"
                    >
                      {slide.publishedDate || slide.date}
                    </Typography>
                    <div className="mt-2">
                      {slide.tags?.map((tag, i) => (
                        <Badge key={i} bg="light" text="dark" className="me-1">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </section>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </>
  );
}
