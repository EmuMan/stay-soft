import mongoose from "mongoose";
import userModel from "./models/user.js";
import betModel from "./models/bet.js";
import promptModel from "./models/prompt.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

// SETUP

config();

mongoose.set("debug", true);

mongoose
  .connect(
    `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@${process.env.ATLAS_CLUSTER}`
  )
  .catch((error) => console.log(error));

// USERS

function addUser(user) {
  const newUser = new userModel(user);
  return newUser.save();
}

function getUsers(filter = {}) {
  let queryFilter = {};
  if (filter.username) {
    queryFilter.username = filter.username;
  }
  if (filter.email) {
    queryFilter.email = filter.email;
  }
  if (filter.firstName) {
    queryFilter.firstName = filter.firstName;
  }
  if (filter.lastName) {
    queryFilter.lastName = filter.lastName;
  }
  return userModel.find(queryFilter);
}

function findUserById(id) {
  return userModel.findById(id);
}

function deleteUserById(id) {
  return userModel.findByIdAndDelete(id);
}

async function signupUser(email, username, password, firstName, lastName) {
  const existingUser = await userModel.findOne({
    $or: [{ email }, { username }],
  });
  if (existingUser) {
    throw new Error("User already exists with the given email or username");
  }

  const salt = await bcrypt.genSalt(+process.env.SALT);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new userModel({
    email,
    username,
    lastName,
    firstName,
    hashedPassword,
  });

  await newUser.save();
  const token = jwt.sign(
    { id: newUser._id, username: newUser.username, email: newUser.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return {
    id: newUser._id,
    username: newUser.username,
    email: newUser.email,
    token,
  };
}

async function loginUser(email, password) {
  const user = await userModel.findOne({ email });
  if (!user) {
    throw new Error("No email found");
  }
  const isMatch = await bcrypt.compare(password, user.hashedPassword);
  if (!isMatch) {
    throw new Error("Incorrect password");
  }
  const token = jwt.sign(
    { id: user._id, username: user.username, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return {
    id: user._id,
    username: user.username,
    email: user.email,
    token,
  };
}

function authenticateUser(req, res, next) {
  if (process.env.NODE_ENV === "development") {
    return next();
  }
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(authHeader)
  console.log(token)
  if (!token) {
    return res.status(401).json({ message: "No token received" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: "JWT error: " + error.message });
    }
    req.user = decoded;
    next();
  });
}

// BETS

function addBet(bet) {
  const newBet = new betModel(bet);
  return newBet.save();
}

function getBets(filter = {}) {
  let queryFilter = {};
  if (filter.user) {
    queryFilter.user = filter.user;
  }
  return betModel.find(queryFilter).populate("user");
}

function findBetById(id) {
  return betModel.findById(id).populate("user");
}

function deleteBetById(id) {
  return betModel.findByIdAndDelete(id);
}

// PROMPTS

function addPrompt(prompt) {
  console.log(prompt);
  const newPrompt = new promptModel(prompt);
  console.log(newPrompt);
  return newPrompt.save();
}

function getPrompts(filter = {}) {
  let queryFilter = {};
  if (filter.user) {
    queryFilter.user = filter.user;
  }
  return promptModel.find(queryFilter).populate("user");
}

function findPromptById(id) {
  return promptModel.findById(id).populate("user");
}

function deletePromptById(id) {
  return promptModel.findByIdAndDelete(id);
}

// EXPORT

export default {
  addUser,
  getUsers,
  findUserById,
  deleteUserById,
  addBet,
  getBets,
  findBetById,
  deleteBetById,
  addPrompt,
  getPrompts,
  findPromptById,
  deletePromptById,
  signupUser,
  loginUser,
  authenticateUser,
};
