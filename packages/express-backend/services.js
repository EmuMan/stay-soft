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

async function updateUserById(id, amount) {
  try {
    const oldUser = await userModel.findById(id);

    if (!oldUser) {
      console.error('User not found');
      return null;
    }

    oldUser.points = oldUser.points - Number(amount);

    const updatedUser = await oldUser.save();
    return updatedUser; 
  } catch (error) {
    console.error('Error in updateUserById:', error);
    throw error;
  }
}

function authenticateUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
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

async function addBet(reqUser, bet) {
  const existingBet = await betModel.findOne({
    user: bet.user,
    promptId: bet.promptId,
  });
  
  if (existingBet) {
    throw new Error("User already placed a bet on this prompt");
  }

  const newBet = new betModel(bet);

  const prompt = await promptModel.findById(bet.promptId);
  const user = await userModel.findById(bet.user);

  if (!prompt) {
    throw new Error("Prompt not found");
  }

  if (!user) {
    throw new Error("User not found");
  }

  if (prompt.closed) {
    throw new Error("Prompt already closed");
  }

  if (prompt.user.id === reqUser.id) {
    throw new Error("Cannot bet on own prompt");
  }

  if (user.id !== reqUser.id) {
    throw new Error("User not authorized to place bet");
  }

  if (user.points < newBet.amount) {
    throw new Error("User does not have enough points to place bet");
  }


  if (newBet.decision) {
    prompt.numYes += 1;
    prompt.yesPool += newBet.amount;
  } else {
    prompt.numNo += 1;
    prompt.noPool += newBet.amount;
  }

  user.points -= newBet.amount;

  await user.save();
  await prompt.save();
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
  const newPrompt = new promptModel(prompt);
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

async function updatePromptById(id, reqUser, closed) {
  try {
    const oldPrompt = await promptModel.findById(id);

    if (!oldPrompt) {
      console.error('Prompt not found');
      return 404;
    }

    if (reqUser.id !== oldPrompt.user.id) {
      console.error('User not authorized to update prompt');
      return 403;
    }

    if (oldPrompt.closed) {
      console.error('Prompt already closed');
      return 403;
    }

    oldPrompt.closed = closed;

    await oldPrompt.save();
    return 204;
  } catch (error) {
    console.error('Error in updatePromptById:', error);
    throw error;
  }
}


// EXPORT

export default {
  addUser,
  getUsers,
  findUserById,
  deleteUserById,
  updateUserById,
  addBet,
  getBets,
  findBetById,
  deleteBetById,
  addPrompt,
  getPrompts,
  findPromptById,
  deletePromptById,
  updatePromptById,
  signupUser,
  loginUser,
  authenticateUser,
};
