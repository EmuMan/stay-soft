import { Box, Typography, Stack } from "@mui/material";

const ProfilePage = () => {
  return (
    <Stack
      style={{
        display: "flex",
        flexDirection: "column",
        marginLeft: "20px"
      }}
    >
      <Typography variant="h4">Profile</Typography>
      <Typography variant="h6">@johnsmith</Typography>
      <Typography variant="h6">Your bets</Typography>
      <Typography variant="h6">Number of bets: </Typography>
      <Typography variant="h6">Accuracy: </Typography>
      <Typography variant="h6">Settings</Typography>
    </Stack>
  );
};

export default ProfilePage;
