import express from "express";
import cors from "cors";
import services from "./services.js";

// SETUP

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// GETS

app.get("/", (req, res) => {
    res.send("Backend Landing Screen");
});

app.get("/users", async (req, res) => {
    const { username, firstName, lastName } = req.query;
    try {
        const users = await services.getUsers({ username, firstName, lastName });
        res.json(users);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get("/users/:id", async (req, res) => {
    try {
        const user = await services.findUserById(req.params.id);
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.json(user);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get("/bets", async (req, res) => {
    const { user } = req.query;
    try {
        const bets = await services.getBets({ user });
        res.json(bets);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get("/bets/:id", async (req, res) => {
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

app.get("/prompts", async (req, res) => {
    const { creator } = req.query;
    try {
        const prompts = await services.getPrompts({ creator });
        res.json(prompts);
    } catch (err) {
        res.status(500).send(err.message);
    }
})

app.get("/prompts/:id", async (req, res) => {
    try {
        const prompt = await services.findPromptById(req.params.id);
        if (!prompt) {
            return res.status(404).send("Prompt not found");
        }
        res.json(prompt);
    } catch (err) {
        res.status(500).send(err.message);
    }
})

// POSTS

app.post("/users", (req, res) => {
    const userToAdd = req.body;
    services.addUser(userToAdd)
        .then(addedUser => res.status(201).send(addedUser))
        .catch(error => res.status(500).send(error.message));
});

app.post("/bets", async (req, res) => {
    const betToAdd = req.body;
    services.addBet(betToAdd)
        .then(addedBet => res.status(201).send(addedBet))
        .catch(error => res.status(500).send(error.message));
});

app.post("/prompts", async (req, res) => {
    const promptToAdd = req.body;
    services.addPrompt(promptToAdd)
        .then(addedPrompt => res.status(201).send(addedPrompt))
        .catch(error => res.status(500).send(error.message));
})

// DELETES

app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];
    services.deleteUserById(id)
        .then(result => {
            if (result) {
                res.status(204).send();
            } else {
                res.status(404).send("Resource not found.");
            }
        })
        .catch(error => res.status(500).send(error.message));
})

app.delete("/bets/:id", (req, res) => {
    const id = req.params["id"];
    services.deleteBetsById(id)
        .then(result => {
            if (result) {
                res.status(204).send();
            } else {
                res.status(404).send("Resource not found.");
            }
        })
        .catch(error => res.status(500).send(error.message));
})

app.delete("/prompts/:id", (req, res) => {
    const id = req.params["id"];
    services.deletePromptById(id)
        .then(result => {
            if (result) {
                res.status(204).send();
            } else {
                res.status(404).send("Resource not found.");
            }
        })
        .catch(error => res.status(500).send(error.message));
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
