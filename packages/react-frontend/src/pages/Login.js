import { Stack, Button, TextField, Typography } from "@mui/material";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import Logo from "../components/Logo.js";

function Login(props) {
  const navigate = useNavigate();

  useEffect(() => {
    if (props.loggedIn) {
      navigate("/navigation");
    }
  }, [navigate]);

  function loginUser() {
    props.onLogin();
    navigate("/navigation");
  }

  return (
    <div className="login-form">
      <Logo />

      <TextField label="Email" className="text-input"></TextField>
      <TextField
        label="Password"
        type="password"
        className="text-input"
      ></TextField>
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
