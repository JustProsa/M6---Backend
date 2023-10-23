import React, { useState } from "react";
import { Button, Modal, Col, Form, Row } from "react-bootstrap";

const AddPostModal = () => {
  const [lgShow, setLgShow] = useState(false);
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);

  const onChangeSetFile = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async (cover) => {
    const fileData = new FormData();
    fileData.append("cover", cover);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/posts/upload`,
        {
          method: "POST",
          body: fileData,
        }
      );

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
        const finalBody = {
          ...formData,
          cover: uploadCover.img, //il nome è cover perché abbiamo usato questo nel modello
        };

        const response = await fetch(
          `${process.env.REACT_APP_SERVER_BASE_URL}/posts`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(finalBody),
          }
        );

        return response.json();

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
      <Button onClick={() => setLgShow(true)} className="m-2">
        Carica Post
      </Button>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Aggiungi un post
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit} encType="multipart/form-data">
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Titolo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  autoFocus
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      title: e.target.value,
                    });
                  }}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Categoria</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  autoFocus
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      category: e.target.value,
                    });
                  }}
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Autore</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                autoFocus
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    author: e.target.value,
                  });
                }}
              />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>Tempo di lettura</Form.Label>
                <Form.Control
                  type="text"
                  autoFocus
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      readTime: { value: e.target.value },
                    });
                  }}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Cover</Form.Label>
                <Form.Control
                  type="file"
                  name="cover"
                  placeholder="Cover url"
                  autoFocus
                  onChange={onChangeSetFile}
                />
              </Form.Group>
            </Row>

            <Button
              variant="primary"
              type="submit"
              onClick={() => {
                setLgShow(false);
              }}
            >
              Salva
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddPostModal;
