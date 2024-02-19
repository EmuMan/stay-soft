import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import FlagIcon from "@mui/icons-material/Flag";
const MuiNavbar = () => {
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
            <FlagIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            PolyPicks
          </Typography>
        </div>
        <Box variant="h6" component="div" id="navBarPoints">
          <Typography variant="h6" component="div" id="label">
            Points:
          </Typography>
          <Typography variant="h6" compoenent="div" id="points">
            65
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export { MuiNavbar };
