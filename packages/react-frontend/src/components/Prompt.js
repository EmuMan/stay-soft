import { Box, Typography, Button, Stack, LinearProgress, Divider, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const Prompt = ({ 
  _id,
  question,
  user,
  category,
  numYes: initialNumYes,
  numNo: initialNumNo,
  dateOpened,
  dateClosed,
  yesPool: initialYesPool,
  noPool: initialNoPool,
  resolution,
  comments,
}) => {
  const [numYes, setNumYes] = useState(initialNumYes);
  const [numNo, setNumNo] = useState(initialNumNo);
  const [yesPool, setYesPool] = useState(initialYesPool);
  const [noPool, setNoPool] = useState(initialNoPool);
  const [yesPercentage, setYesPercentage] = useState(0);
  const [betAmount, setBetAmount] = useState('');
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [hasBet, setHasBet] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setLoggedInUser(decoded.id); 
    }
  }, []);

  useEffect(() => {
    const totalPool = yesPool + noPool;
    setYesPercentage(totalPool > 0 ? (yesPool / totalPool) * 100 : 0);
  }, [yesPool, noPool]);

  const handleBetSubmission = (decision) => {
    if (!betAmount || isNaN(betAmount) || betAmount <= 0) {
      alert("Please enter a valid bet amount.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      fetch(`${process.env.REACT_APP_API_ENDPOINT}/bets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          promptId: _id,
          user: loggedInUser,
          decision: decision,
          amount: Number(betAmount),
        }),
      });

      //if (!response.ok) {
      //  throw new Error(`HTTP error! Status: ${response.status}`);
      //}
    } catch (error) {
      console.error("Error adding bet:", error);
    }

    if (decision) {
      setNumYes(numYes+1);
      setYesPool(yesPool+Number(betAmount));
    } else {
      setNumNo(numNo+1);
      setNoPool(noPool+Number(betAmount));
    }

    setShouldUpdate(true);
    setHasBet(true);
  };

  useEffect(() => {
    if (shouldUpdate) {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        setShouldUpdate(false);
        return;
      }

      const updatePrompt = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/prompts/${_id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
              numYes: numYes,
              numNo: numNo,
              yesPool: yesPool,
              noPool: noPool,
            }),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        } catch (error) {
          console.error("Error updating prompt:", error);
        }
      };

      updatePrompt().then(() => setShouldUpdate(false)); 
    }
  }, [numYes, numNo, yesPool, noPool, shouldUpdate, _id]);


  const containerStyle = {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
    width: "300px"
  };

  const progressBarStyle = {
    height: "20px",
    borderRadius: "10px",
    marginTop: "10px",
    marginBottom: "10px",
    backgroundColor: "#BA8C2A"
  };

  const progressValueStyle = (value) => ({
    color: "white",
    fontWeight: "bold",
    marginLeft: value > 10 ? "10px" : "0",
    fontSize: "0.9rem",
  });

  return (
    <Box style={containerStyle}>
      <Typography variant="h5" gutterBottom>
        {question}
      </Typography>
      <Typography variant="body2" gutterBottom>
        Category: {category} by user
      </Typography>
      <Divider />
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
        <Typography variant="body2">Yes! {numYes.toLocaleString()}</Typography>
        <Typography variant="body2">No! {numNo.toLocaleString()}</Typography>
      </Stack>
      {(numYes > 0 || numNo > 0) ? (
      <Box position="relative" display="flex" alignItems="center">
        <LinearProgress 
          variant="determinate" 
          value={yesPercentage} 
          style={{ ...progressBarStyle, width: '100%' }} 
        />
        <Box position="absolute" width="100%" display="flex" justifyContent="space-between">
          <Typography style={progressValueStyle(yesPercentage)}>{yesPercentage.toFixed(0)}%</Typography>
          <Typography style={progressValueStyle(100 - yesPercentage)}>{(100 - yesPercentage).toFixed(0)}%</Typography>
        </Box>
      </Box>
      ) : (
        <Typography variant="body1" style={{ textAlign: 'center', marginTop: '10px' }}>
          No votes yet
        </Typography>
      )}
      {
        loggedInUser && user && loggedInUser === user ?
        <Typography variant="body1" style={{ textAlign: 'center', marginTop: '10px' }}>
          You cannot vote on your own prompt.
        </Typography>
        : !hasBet ?
        <>
          <TextField 
            label="Bet Amount" 
            type="number"
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
            variant="outlined" 
            size="small" 
            fullWidth 
          />
          <Stack direction="row" spacing={2} justifyContent="space-between" marginTop="10px">
            <Button variant="contained" color="primary" onClick={() => handleBetSubmission(true)}>Yes!</Button>
            <Button variant="contained" color="secondary" onClick={() => handleBetSubmission(false)}>No!</Button>
          </Stack>
        </>
        :
        <Typography variant="body1" style={{ textAlign: 'center', marginTop: '10px' }}>
          You've already bet on this prompt.
        </Typography>
      }
      <Divider />
      <Typography variant="body2">
        Recent comments: {comments.join(', ')}
      </Typography>
    </Box>
  );

};

export default Prompt;
