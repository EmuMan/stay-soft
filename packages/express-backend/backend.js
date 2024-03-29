import express from "express";
import cors from "cors";
import services from "./services.js";

// SETUP

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const { authenticateUser } = services;

// GETS

app.get("/", authenticateUser, (req, res) => {
  res.send("Backend Landing Screen");
});

app.get("/users/:id", authenticateUser, async (req, res) => {
  try {
    const user = await services.findUserById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    if (req.user.id !== user.id) {
      return res.status(403).send("Forbidden");
    }
    res.json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/bets", authenticateUser, async (req, res) => {
  const { user, promptId } = req.query;
  try {
    const bets = await services.getBets({ user, promptId });
    res.status(200).json(bets);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/bets/:id", authenticateUser, async (req, res) => {
  try {
    const bet = await services.findBetById(req.params.id);
    if (!bet) {
      return res.status(404).send("Bet not found");
    }
    res.json(bet);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/prompts", authenticateUser, async (req, res) => {
  const { user } = req.query;
  try {
    const prompts = await services.getPrompts(user);
    res.json(prompts);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/prompts/:id", authenticateUser, async (req, res) => {
  try {
    const prompt = await services.findPromptById(req.params.id);
    if (!prompt) {
      return res.status(404).send("Prompt not found");
    }
    res.json(prompt);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// POSTS

app.post("/users", authenticateUser, (req, res) => {
  const userToAdd = req.body;
  services
    .addUser(userToAdd)
    .then((addedUser) => res.status(201).send(addedUser))
    .catch((error) => res.status(500).send(error.message));
});

app.post("/bets", authenticateUser, async (req, res) => {
  const betToAdd = req.body;
  if (betToAdd.user !== req.user.id) {
    return res.status(403).send("Forbidden");
  }
  services
    .addBet(req.user, betToAdd)
    .then((addedBet) => res.status(201).send(addedBet))
    .catch((error) => res.status(500).send(error.message));
});

app.post("/prompts", authenticateUser, async (req, res) => {
  const promptToAdd = req.body;
  if (promptToAdd.user !== req.user.id) {
    return res.status(403).send("Forbidden");
  }
  services
    .addPrompt(promptToAdd)
    .then((addedPrompt) => res.status(201).send(addedPrompt))
    .catch((error) => res.status(500).send(error.message));
});

app.post("/users/signup", async (req, res) => {
  const { email, username, firstName, lastName, password } = req.body;

  try {
    const newUser = await services.signupUser(
      email,
      username,
      password,
      firstName,
      lastName
    );
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/users/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await services.loginUser(email, password);
    res.status(200).json(user);
  } catch (error) {
    if (error.message === "No email found") {
      res.status(404).json({ message: error.message });
    } else if (error.message === "Incorrect password") {
      res.status(401).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

// PUTS

app.put("/prompts/:id", authenticateUser, (req, res) => {
  const id = req.params.id;

  services
    .updatePromptById(id, req.user)
    .then((result) => {
      if (result === 204) {
        res.status(204).send();
      } else if (result === 403) {
        res.status(403).send("Forbidden.");
      } else if (result === 404) {
        res.status(404).send("Resource not found.");
      }
    })
    .catch((error) => res.status(500).send(error.message));
});

// DELETES

app.delete("/prompts/:id", authenticateUser, (req, res) => {
  const id = req.params["id"];
  const { result } = req.body;
  services
    .deletePromptById(id, req.user, result)
    .then((result) => {
      if (result) {
        res.status(204).send();
      } else {
        res.status(404).send("Resource not found.");
      }
    })
    .catch((error) => res.status(500).send(error.message));
});



app.listen(process.env.PORT || port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
