import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Badge from "react-bootstrap/Badge";
import Typography from "@mui/material/Typography";

const blogSlides = [
  {
    image: "/Img/basicBlog/ProToolBoxCheck_1.webp",
    title: "How to Build Like a Pro",
    author: "Jane Doe",
    date: "May 2025",
    tags: ["DIY", "Pro", "Racing"],
  },
  {
    image: "/Img/basicShowCASE/BroadKellyShowCASE1.webp",
    title: "Garage Upgrades That Matter",
    author: "John Smith",
    date: "April 2025",
    tags: ["Garage", "Tools", "Budget"],
  },
  {
    image: "/Img/basicShowCASE/G_Sides02.jpg",
    title: "Track Day Essentials",
    author: "Speed Racer",
    date: "March 2025",
    tags: ["Track", "Prep", "Performance"],
  },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => setIndex(selectedIndex);

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
      <div
        style={{
          maxWidth: "80%", // adjust width here
          margin: "0 auto", // center horizontally
        }}
      >
        <Carousel activeIndex={index} onSelect={handleSelect} fade>
          {blogSlides.map((slide, idx) => (
            <Carousel.Item key={idx}>
              <section className="position-relative text-center">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="img-fluid w-100 rounded"
                  style={{
                    height: "600px", // taller image
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
                    By {slide.author}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    className="text-light hero-date"
                  >
                    {slide.date}
                  </Typography>
                  <div className="mt-2">
                    {slide.tags.map((tag, i) => (
                      <Badge key={i} bg="light" text="dark" className="me-1">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </section>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </>
  );
}
