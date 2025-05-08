import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export const BlogCard = ({ blog }) => {
  return (
    <Card style={{ width: "18rem" }} className="mb-4">
      {blog.image && (
        <Card.Img variant="top" src={blog.image} alt={blog.title} />
      )}
      <Card.Body>
        <Card.Title>{blog.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {blog.author} • {blog.date}
        </Card.Subtitle>
        <Card.Text>{blog.previewText}</Card.Text>
        <Button variant="primary" href={`/blog/${blog.id}`}>
          Read More
        </Button>
      </Card.Body>
    </Card>
  );
};

BlogCard.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    author: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    image: PropTypes.string,
    previewText: PropTypes.string.isRequired,
  }).isRequired,
};
