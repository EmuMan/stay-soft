import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
} from "@mui/material";
import FlagIcon from "@mui/icons-material/Flag";
import CasinoIcon from "@mui/icons-material/Casino";
import LogoutIcon from "@mui/icons-material/Logout";
import { jwtDecode } from "jwt-decode";
import Logo from "../components/Logo.js";

const TopBar = (props) => {
  const pointsContainerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "5px",
  };

  return (
    <AppBar position="sticky">
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          id="logo"
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Logo />
        </div>
        <Box
          variant="h6"
          component="div"
          id="navBarPoints"
          style={pointsContainerStyle}
        >
          <Typography variant="h5" component="div" id="label">
            Points:
          </Typography>
          <Typography variant="h5" compoenent="div" id="points">
            {props.points}
          </Typography>
          <Button color="inherit" onClick={props.onSignOut}>
            <LogoutIcon />
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export { TopBar };
