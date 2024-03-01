import "./App.css";
import { useState, useEffect } from "react";
import Navigation from "./Navigation";
import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { jwtDecode } from "jwt-decode";

function App() {
  const [prompts, setPrompts] = useState([]);
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
  function fetchPrompts() {
    const promise = fetch("http://localhost:8000/prompts");
    return promise;
  }
  useEffect(() => {
    fetchPrompts()
      .then((res) => res.json())
      .then((json) => setPrompts(json))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [profile, setProfile] = useState({
    username: "",
    points: 0,
    betsWon: 0,
    betsLost: 0,
    respondents: 0,
    theme: 0,
    bets: [],
  });
  const [loggedIn, setLoggedIn] = useState(false);

  function postPrompt(prompt) {
    const promise = fetch("http://localhost:8000/prompts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prompt),
    });
    return promise;
  }

  function updatePrompts(prompt) {
    postPrompt(prompt)
      .then((response) => {
        if (response.status === 201) {
          response.json().then((responseJson) => {
            setPrompts([...prompts, responseJson]);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
      fetch(`http://localhost:8000/users/${userId}`, {
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
                profile={profile}
                prompts={prompts}
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
