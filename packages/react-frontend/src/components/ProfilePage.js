import { Box, Typography } from "@mui/material";

const ProfilePage = () => {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4">Profile</Typography>
      <Typography variant="h6">@johnsmith</Typography>
    </Box>
  );
};

export default ProfilePage;
