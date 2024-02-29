import "./App.css";
import { Stack } from "@mui/material";

import { TopBar } from "./components/TopBar";
import { BottomNavbar } from "./components/BottomNavbar";
import { useState } from "react";
import HomePage from "./components/HomePage.js";
import CreatePage from "./components/CreatePage.js";
import ProfilePage from "./components/ProfilePage.js";

function App() {
  const [pageIndex, setPageIndex] = useState(0);
  const [bets, setBets] = useState([]);
  const compArray = [];
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

  compArray.push(<HomePage prompts={prompts} removePrompt={removeOnePrompt} />);
  compArray.push(<CreatePage updateList={updateList} />);
  compArray.push(ProfilePage());

  return (
    <div className="App">
      <TopBar points="17" />
      <Stack
        padding="20px"
        marginBottom="60px"
        style={{ backgroundColor: "rgb(222, 227, 232)" }}
      >
        {compArray[pageIndex]}
      </Stack>
      <BottomNavbar initialPageIndex={0} setPageIndex={setPageIndex} />
    </div>
  );
}

export default App;
