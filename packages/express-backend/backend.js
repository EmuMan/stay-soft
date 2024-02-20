import express from "express";
import cors from "cors";
import services from "./services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

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

app.post("/users", async (req, res) => {
    // POST user
});

app.post("/bets", async (req, res) => {
    // POST bet
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
