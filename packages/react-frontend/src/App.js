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

  compArray.push(HomePage());
  compArray.push(CreatePage());
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
