import { Button, TextField, Typography } from "@mui/material";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from 'react';

function Login(props) {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (props.loggedIn) {
      navigate('/navigation');
    }
  }, [navigate]);

  function loginUser() {
    props.onLogin();
    navigate('/navigation');
  }

  return (
    <div className="login-form">
      <Typography variant="h5" component="div" align="center">
        PolyPicks • Login
      </Typography>
      <TextField label="Email" className="text-input"></TextField>
      <TextField
        label="Password"
        type="password"
        className="text-input"
      ></TextField>
      <Button className="elevated-button" onClick={loginUser}>
        <Typography variant="h6" component="div">
          Login
        </Typography>
      </Button>
      <Typography variant="h6" component="div" align="center">
        Don't have an account?
      </Typography>
      <Button className="button" onClick={() => navigate('/signup')}>
        <Typography variant="h6" component="div">
          Signup
        </Typography>
      </Button>
    </div>
  );
}

export default Login;
