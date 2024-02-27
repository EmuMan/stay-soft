import "./App.css";
import { Stack } from "@mui/material";

import { TopBar } from "./components/TopBar";
import { BottomNavbar } from "./components/BottomNavbar";
import { useState } from "react";
import HomePage from "./pages/HomePage.js";
import CreatePage from "./pages/CreatePage.js";
import ProfilePage from "./pages/ProfilePage.js";
import Navigation from "./Navigation";
import Login from "./pages/Login";

function App() {
  // compArray.push(<HomePage prompts={prompts} removePrompt={removeOnePrompt} />);
  // compArray.push(<CreatePage updateList={updateList} />);
  // compArray.push(<ProfilePage/>);

  return <Login />;
}

export default App;
