import { Stack } from "@mui/material";

import { TopBar } from "./components/TopBar";
import { BottomNavbar } from "./components/BottomNavbar";

import HomePage from "./pages/HomePage.js";
import CreatePage from "./pages/CreatePage.js";
import ProfilePage from "./pages/ProfilePage.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Navigation(props) {
  const [pageIndex, setPageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!props.loggedIn) {
      navigate("/");
    }
  }, [navigate, props.loggedIn]);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    props.setLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="navigation">
      <TopBar points={props.profile.points} onSignOut={handleSignOut} />
      <Stack padding="20px" marginBottom="60px">
        {
          [
            <HomePage profile={props.profile} />,
            <CreatePage profile={props.profile} />,
            <ProfilePage profile={props.profile} />,
          ][pageIndex]
        }
      </Stack>
      <BottomNavbar initialPageIndex={0} setPageIndex={setPageIndex} />
    </div>
  );
}

export default Navigation;
