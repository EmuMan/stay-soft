import { Stack } from "@mui/material";

import { TopBar } from "./components/TopBar";
import { BottomNavbar } from "./components/BottomNavbar";

import HomePage from "./pages/HomePage.js";
import CreatePage from "./pages/CreatePage.js";
import ProfilePage from "./pages/ProfilePage.js";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Navigation(props) {
  const [pageIndex, setPageIndex] = useState(0);
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    username: "",
    points: 0,
    betsWon: 0,
    betsLost: 0,
    respondents: 0,
    theme: 0,
    bets: [],
  });
  const setLoggedIn = props.setLoggedIn;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
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
  }, [setLoggedIn]);

  useEffect(() => {
    if (!props.loggedIn) {
      navigate("/");
    }
  }, [navigate, props.loggedIn]);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    props.setLoggedIn(false);
    navigate("/");
  };

  const handleBetPlacement = useCallback((betAmount) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      points: prevProfile.points - betAmount,
    }));
  }, []);

  return (
    <div className="navigation">
      <TopBar points={Math.round(profile.points)} onSignOut={handleSignOut} />
      <Stack padding="20px" marginBottom="60px">
        {
          [
            <HomePage profile={profile} onBetPlacement={handleBetPlacement} />,
            <CreatePage profile={profile} />,
            <ProfilePage profile={profile} />,
          ][pageIndex]
        }
      </Stack>
      <BottomNavbar initialPageIndex={0} setPageIndex={setPageIndex} />
    </div>
  );
}

export default Navigation;
