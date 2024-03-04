import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useState } from "react";

const BottomNavbar = (props) => {
  const [value, setValue] = useState(0);
  return (
    <div>
      <BottomNavigation
        sx={{
          width: "100%",
          bottom: 0,
          position: "fixed",
          "& .Mui-selected, .Mui-selected > svg": {
            color: "#primary",
          },
        }}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          props.setPageIndex(newValue);
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

export { BottomNavbar };
