// Blogs: Basic Blog w hero at top, text & photos, gallery at bottom, comment section
// options for video blogs

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";

const Blog = ({ blogData }) => {
  const { title, subtitle, author, date, sections, contact } = blogData;

  return (
    <div className="container my-5">
      {/* Header */}
      <header className="mb-4 text-center">
        <h1 className="display-4">{title}</h1>
        <p className="lead">{subtitle}</p>
        <p className="text-muted">
          By {author} • {date}
        </p>
      </header>

      {/* Main layout */}
      <div className="row">
        <div className="col-lg-9">
          {sections.map((section, index) => (
            <section key={index} className="mb-5">
              {section.image && (
                <figure>
                  <img
                    src={section.image}
                    className="img-fluid rounded"
                    alt={section.heading || `figure-${index}`}
                  />
                  {section.caption && (
                    <figcaption className="text-muted mt-2">
                      {section.caption}
                    </figcaption>
                  )}
                </figure>
              )}
              {section.heading && <h3>{section.heading}</h3>}
              <p>{section.text}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blogData: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    author: PropTypes.string,
    date: PropTypes.string,
    sections: PropTypes.arrayOf(
      PropTypes.shape({
        heading: PropTypes.string,
        image: PropTypes.string,
        caption: PropTypes.string,
        text: PropTypes.string.isRequired,
      })
    ),
    contact: PropTypes.shape({
      address: PropTypes.string,
      email: PropTypes.string,
      phone: PropTypes.string,
    }),
  }).isRequired,
};

export default Blog;
