import {
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useState } from "react";
import HomePage from "./HomePage.js";
import CreatePage from "./CreatePage.js";
import ProfilePage from "./ProfilePage.js";

const MuiBottomNavigation = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const compArray = [];

  compArray.push(HomePage());
  compArray.push(CreatePage());
  compArray.push(ProfilePage());

  return (
    <div>
      {compArray[pageIndex]}
      <BottomNavigation
        sx={{ width: "100%", position: "absolute", bottom: 0 }}
        value={pageIndex}
        onChange={(event, newValue) => {
          setPageIndex(newValue);
        }}
        showLabels
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Create" icon={<AddBoxIcon />} />
        <BottomNavigationAction label="Profile" icon={<AccountCircleIcon />} />
      </BottomNavigation>
    </div>
  );
};

export { MuiBottomNavigation };
