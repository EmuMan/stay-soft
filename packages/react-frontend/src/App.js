import "./App.css";
import { useState, useEffect } from "react";
import Navigation from "./Navigation";
import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";


function App() {
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

  
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  const onLogin = (token) => {
    localStorage.setItem("token", token);
    setLoggedIn(true);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      fetch(`${process.env.REACT_APP_API_ENDPOINT}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setProfile(data);
        })
        .catch((error) => console.error("Error:", error));
    }
  }, []);

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
            element={
              <Navigation
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
              />
            }
          />
          <Route path="/signup" element={<Signup onLogin={onLogin} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
