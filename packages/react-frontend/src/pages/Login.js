import { Button, TextField, Typography } from "@mui/material";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Logo from "../components/Logo.js";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (props.loggedIn) {
      navigate("/navigation");
    }
  }, [props.loggedIn, navigate]);

  async function loginUser() {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        props.onLogin(data.token);
        navigate("/navigation");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login request failed");
    }
  }

  return (
    <div className="login-form">
      <Logo />
      <Typography variant="h5" component="div" align="center">
        PolyPicks • Login
      </Typography>
      <TextField
        label="Email"
        className="text-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        className="text-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        style={{ textTransform: "none" }}
        className="elevated-button"
        onClick={loginUser}
      >
        <Typography variant="h6" component="div">
          Login
        </Typography>
      </Button>
      <Typography variant="h6" component="div" align="center">
        Don't have an account?
      </Typography>
      <Button
        style={{ textTransform: "none" }}
        className="button"
        onClick={() => navigate("/signup")}
      >
        <Typography variant="h6" component="div">
          Signup
        </Typography>
      </Button>
    </div>
  );
}

export default Login;
