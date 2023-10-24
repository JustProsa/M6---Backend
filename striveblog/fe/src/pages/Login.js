import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginData, setLoginData] = useState({});
  const [login, setLogin] = useState(null);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/login`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(loginData),
        }
      );
      const data = await response.json();

      if (data.token) {
        localStorage.setItem("loggedInUser", JSON.stringify(data.token));
        navigate("/home");
      }

      setLogin(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ margin: "5px auto", color: "#0d6efd" }}>
          STRIVEBLOG - A BACKEND STORY
        </h1>
      </div>
      <Form
        style={{
          width: "30%",
          margin: "auto auto",
          backgroundColor: "#0d6efd",
          padding: "14px",
          borderRadius: "14px",
          marginTop: "10%",
        }}
        onChange={handleInputChange}
        onSubmit={onSubmit}
      >
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label style={{ color: "white" }}>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="name@example.com"
            autoFocus
            required
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label style={{ color: "white" }}>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            autoFocus
            required
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Login
        </Button>
      </Form>
    </>
  );
};

export default Login;
