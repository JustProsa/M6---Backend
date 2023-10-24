import React from "react";
import { Card } from "react-bootstrap";

const CommentCard = ({ avatar, author, text }) => {
  return (
    <Card style={{ marginTop: "1rem" }}>
      <Card.Header className="flex align-items-center">
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            overflow: "hidden",
          }}
        >
          <img src={avatar} style={{ width: "100%", borderRadius: "50%" }} />
        </div>
      </Card.Header>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p> {text} </p>
          <footer className="blockquote-footer">
            <cite title="Author">{author}</cite>
          </footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
};

export default CommentCard;
