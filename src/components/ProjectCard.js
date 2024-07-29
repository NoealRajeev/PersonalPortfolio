import { Col } from "react-bootstrap";
import React from 'react';

export const ProjectCard = ({ title, description, imgUrl }) => {
  const handleError = (e) => {
    e.target.src = '/notFound.svg'; // Fallback image URL from the public directory
  };

  return (
    <Col size={12} sm={6} md={4}>
      <div className="proj-imgbx">
        <img src={imgUrl} onError={handleError} alt={title} />
        <div className="proj-txtx">
          <h4>{title}</h4>
          <span>{description}</span>
        </div>
      </div>
    </Col>
  );
};
