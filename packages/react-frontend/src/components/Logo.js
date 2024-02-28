import CasinoIcon from "@mui/icons-material/Casino";
import { Stack, Typography } from "@mui/material";
function Logo() {
  return (
    <Stack
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <CasinoIcon />
      <Typography variant="h5" component="div">
        PolyPicks
      </Typography>
    </Stack>
  );
}

export default Logo;
