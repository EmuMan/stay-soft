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
  const [bets, setBets] = useState([]);
  const compArray = [];
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!props.loggedIn) {
      navigate('/');
    }
  }, [navigate]);

  const [prompts, setPrompts] = useState([
    { id: 1, description: "Will Cal Poly Basketball beat Hawaii?", creator: 1 },
    { id: 2, description: "Will Cal Poly baseball beat Missouri?", creator: 2 },
    { id: 3, description: "Will Chris Caudillo win?", creator: 3, open: true },
  ]);
  function updateList(prompt) {
    setPrompts([...prompts, prompt]);
  }

  function removeOnePrompt(index) {
    const updated = prompts.filter((prompt, i) => {
      return i !== index;
    });
    setPrompts(updated);
  }



  return (
    <div className="navigation">
      <TopBar points="17" />
      <Stack
        padding="20px"
        marginBottom="60px"
      >
        {
          [
            <HomePage prompts={prompts} removePrompt={removeOnePrompt} />,
            <CreatePage updateList={updateList} />,
            <ProfilePage />,
          ][pageIndex]
        }
      </Stack>
      <BottomNavbar initialPageIndex={0} setPageIndex={setPageIndex} />
    </div>
  );
}

export default Navigation;
