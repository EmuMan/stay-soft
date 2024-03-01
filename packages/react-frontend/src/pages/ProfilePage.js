import { useState, useEffect } from "react";
import { Box, Typography, Stack } from "@mui/material";
import { jwtDecode } from "jwt-decode";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    username: '',
    points: 0,
    betsWon: 0,
    betsLost: 0,
    respondents: 0,
    theme: 0,
    bets: []
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      fetch(`http://localhost:8000/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        setProfile(data);
      })
      .catch(error => console.error('Error:', error));
    }
  }, []);

  return (
    <Stack style={{ display: "flex", flexDirection: "column", marginLeft: "20px" }}>
      <Typography variant="h6">{profile.username}</Typography>
      <Typography variant="h6">{profile.points}</Typography>
    </Stack>
  );
};

export default ProfilePage;
