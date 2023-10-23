import React, { useState } from "react";
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
    <div className="p-3 flex justify-center align-items-center h-screen">
      <form
        style={{ width: "30%", margin: "0 auto" }}
        className="flex flex-col gap-2 m-3 bg-slate-900 text-white rounded p-3"
        onChange={handleInputChange}
        onSubmit={onSubmit}
      >
        <h2>LOGIN</h2>
        <input
          className="p-2 bg-zinc-100 text-black rounded"
          placeholder="email@email.com"
          type="text"
          name="email"
          required
          autoFocus
          onChange={handleInputChange}
        />
        <input
          className="p-2 bg-zinc-100 text-black rounded"
          type="password"
          name="password"
          placeholder="password"
          required
          autoFocus
        />
        <button type="submit">LOGIN</button>
      </form>
    </div>
  );
};

export default Login;
