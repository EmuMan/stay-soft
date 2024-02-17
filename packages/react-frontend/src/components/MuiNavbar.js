import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import FlagIcon from "@mui/icons-material/Flag";
const MuiNavbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="logo">
          <FlagIcon />
        </IconButton>
        <Typography variant="h6" component="div">
          PolyPicks
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export { MuiNavbar };
