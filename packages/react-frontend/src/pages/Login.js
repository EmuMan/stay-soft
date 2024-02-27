import { Stack, TextField } from "@mui/material";
function Login() {
  return (
    <Stack
      spacing="20px"
      style={{
        margin: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <TextField label="Email" className="text-input"></TextField>
      <TextField
        label="Password"
        type="password"
        className="text-input"
      ></TextField>
    </Stack>
  );
}

export default Login;
