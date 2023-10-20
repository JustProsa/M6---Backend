import React from "react";
import { Card, ListGroup } from "react-bootstrap";

const PostCard = ({
  author,
  title,
  category,
  cover,
  readTime,
  readTimeUnit,
}) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={cover} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>{category}</ListGroup.Item>
        <ListGroup.Item>
          {readTime} {readTimeUnit}
        </ListGroup.Item>
        {/* <ListGroup.Item>Vestibulum at eros</ListGroup.Item> */}
      </ListGroup>
      <Card.Body className="flex gap-4 align-middle">
        <ListGroup.Item>{author}</ListGroup.Item>
        {/* <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item> */}
      </Card.Body>
    </Card>
  );
};

export default PostCard;
