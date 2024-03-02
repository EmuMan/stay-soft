import { Typography, Stack } from "@mui/material";

const ProfilePage = (props) => {
  return (
    <Stack
      style={{
        display: "flex",
        flexDirection: "column",
        marginLeft: "20px",
        alignItems: "center",
      }}
    >
      {/* User Icon */}
      <Typography variant="h6">{props.profile.username}</Typography>
      <Typography variant="h6">Points: {props.profile.points}</Typography>
      <Typography variant="h6">Bets Won: {props.profile.betsWon}</Typography>
      <Typography variant="h6">Bets Lost: {props.profile.betsLost}</Typography>
      <Typography variant="h6">
        Respondents: {props.profile.respondents}
      </Typography>
    </Stack>
  );
};

export default ProfilePage;
