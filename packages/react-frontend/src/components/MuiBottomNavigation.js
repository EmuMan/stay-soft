import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useState } from "react";
import { Home } from "./home.js";

const MuiBottomNavigation = () => {
  const [value, setValue] = useState(0);
  const compArray = [];
  const createNavComponent = (text) => {
    return (
      <Box display="flex" justifyContent="center" key={text}>
        <Typography variant="H5">{text}</Typography>
      </Box>
    );
  };
  compArray.push({ Home });
  compArray.push(createNavComponent("Create"));
  compArray.push(createNavComponent("Profile"));
  return (
    <div>
      {compArray[value]}
      <BottomNavigation
        sx={{ width: "100%", position: "absolute", bottom: 0 }}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
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
