import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import AxiosClient from "../client/client";
const client = new AxiosClient();

const AddPostModal = () => {
  const [show, setShow] = useState(false);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({});

  console.log(formData);

  const onChangeSetFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //prima si caricano i file
  const uploadFile = async (cover) => {
    const fileData = new FormData();
    fileData.append("cover", cover);

    try {
      const response = await fetch("http://localhost:5050/posts/cloudUpload", {
        method: "POST",
        body: fileData,
      });

      return await response.json();
    } catch (error) {
      console.log(error, "Errore in upload file");
    }
  };

  //poi il resto dei dati

  const onSubmit = async (e) => {
    e.preventDefault();

    //si aggiunge il file a formData se esiste
    if (file) {
      try {
        const uploadCover = await uploadFile(file);
        console.log(uploadCover);
        const finalBody = {
          ...formData,
          cover: uploadCover.cover, //il nome è cover perché abbiamo usato questo nel modello
        };

        const response = await fetch("http://localhost:5050/posts/create", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(finalBody),
        });

        return response.json();

        handleClose();
        // const response = await fetch(`http://localhost:5050/posts/create`, {
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   method: "POST",
        //   body: JSON.stringify(finalBody),
        // });
      } catch (error) {
        console.log(error);
      }
    } else {
      console.error("Seleziona almeno un file");
    }
    // return await client.post("/posts/create", finalBody);
  };

  return (
    <>
      <Button variant="primary" className="mt-2" onClick={handleShow}>
        Crea Post
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crea un post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit} encType="multipart/form-data">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Img</Form.Label>
              <Form.Control
                type="file"
                placeholder="img.jpg"
                name="cover"
                autoFocus
                onChange={onChangeSetFile}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Bubi che bubu"
                name="title"
                autoFocus
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Arts"
                name="category"
                autoFocus
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Pieppiolino"
                name="author"
                autoFocus
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    author: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="50"
                autoFocus
                name="price"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price: Number(e.target.value),
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Rate</Form.Label>
              <Form.Control
                type="number"
                placeholder="4"
                autoFocus
                name="rate"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    rate: Number(e.target.value),
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={onSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddPostModal;
