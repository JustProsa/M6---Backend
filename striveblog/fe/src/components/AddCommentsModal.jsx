import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const AddCommentsModal = ({ postId }) => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/posts/${postId}/comments/create`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      console.log(data);

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Commenta
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Aggiungi un commento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={() => {
              handleClose();
            }}
          >
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Autore</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                autoFocus
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    author: e.target.value,
                  }));
                  console.log(formData);
                }}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Commento</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    text: e.target.value,
                  }));
                  console.log(formData);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={(e) => {
              onSubmit(e);
              handleClose();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddCommentsModal;
