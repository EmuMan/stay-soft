import "./App.css";
import { useState } from "react";
import Navigation from "./Navigation";
import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    primary: {
      main: "#154734",
    },
    secondary: {
      main: "#BD8B13",
    },
  },
});

function App() {
  const [loggedIn, setLogin] = useState(false);

  function onLogin() {
    setLogin(true);
  }
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route
            path="/"
            exact
            element={<Login loggedIn={loggedIn} onLogin={onLogin} />}
          />
          <Route
            path="/navigation"
            element={<Navigation loggedIn={loggedIn} />}
          />
          <Route path="/signup" element={<Signup onLogin={onLogin} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
