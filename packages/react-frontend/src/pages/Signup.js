import { Button, TextField, Typography } from "@mui/material";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Signup(props) {
  const navigate = useNavigate();

  function signupUser() {
    props.onLogin();
    navigate('/navigation');
  }

  return (
    <div className="login-form">
      <Typography variant="h5" component="div" align="center">
        Create an account
      </Typography>
      <TextField label="Email" className="text-input"></TextField>
      <TextField label="Username" className="text-input"></TextField>
      <TextField
        label="Password"
        type="password"
        className="text-input"
      ></TextField>
      <TextField
        label="Repeat password"
        type="password"
        className="text-input"
      ></TextField>
      <Button className="elevated-button" onClick={signupUser}>
        <Typography variant="h6" component="div">
          Signup
        </Typography>
      </Button>
      <Typography variant="h6" component="div" align="center">
        Already have an account?
      </Typography>
      <Button className="button" onClick={() => navigate('/')}>
        <Typography variant="h6" component="div">
          Login
        </Typography>
      </Button>
    </div>
  );
}

export default Signup;
