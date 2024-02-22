import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";
import FlagIcon from "@mui/icons-material/Flag";
import CasinoIcon from "@mui/icons-material/Casino";

const TopBar = (props) => {
  const pointsContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  return (
    <AppBar position="static">
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <div id="logo">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
          >
            <CasinoIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            PolyPicks
          </Typography>
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
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export { TopBar };
