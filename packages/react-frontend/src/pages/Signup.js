import { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Signup(props) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const navigate = useNavigate();

  function validateForm() {
    return (
      email.length > 0 &&
      username.length > 0 &&
      password.length > 0 &&
      password === repeatPassword
    );
  }

  async function signupUser() {
    if (!validateForm()) {
      alert("Please fill out all fields correctly.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          password,
          firstName,
          lastName,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        props.onLogin(data.token);
        navigate("/navigation");
      } else {
        const error = await response.text();
        throw new Error(error);
      }
    } catch (error) {
      alert(`Signup failed: ${error.message}`);
    }
  }

  return (
    <div className="login-form">
      <Typography variant="h5" component="div" align="center">
        Create an account
      </Typography>
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="text-input"
      />
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="text-input"
      />
      <TextField
        label="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="text-input"
      />
      <TextField
        label="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className="text-input"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="text-input"
      />
      <TextField
        label="Repeat password"
        type="password"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
        className="text-input"
      />
      <Button className="elevated-button" onClick={signupUser}>
        <Typography variant="h6" component="div">
          Signup
        </Typography>
      </Button>
      <Typography variant="h6" component="div" align="center">
        Already have an account?
      </Typography>
      <Button className="button" onClick={() => navigate("/")}>
        <Typography variant="h6" component="div">
          Login
        </Typography>
      </Button>
    </div>
  );
}

export default Signup;
