import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import AddBoxIcon from "@mui/icons-material/AddBox";

const BottomNavbar = (props) => {
  return (
    <div>
      <BottomNavigation
        sx={{
          width: "100%",
          position: "absolute",
          bottom: 0,
          position: "fixed",
        }}
        value={props.initialPageIndex}
        onChange={(event, newValue) => {
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
