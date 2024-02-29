import mongoose from "mongoose";
import userModel from "./models/user.js";
import betModel from "./models/bet.js";
import promptModel from "./models/prompt.js";
import bcrypt from "bcrypt";
import { config } from 'dotenv';

// SETUP

config();

mongoose.set("debug", true);

mongoose
  .connect(`mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@${process.env.ATLAS_CLUSTER}`)
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
  const existingUser = await userModel.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    throw new Error('User already exists with the given email or username');
  }

  const salt = await bcrypt.genSalt(+process.env.SALT);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new userModel({
    email,
    username,
    lastName,
    firstName,
    hashedPassword
  });

  await newUser.save();

  return {
    id: newUser._id,
    username: newUser.username,
    email: newUser.email
  };
}

async function loginUser(email, password) {
  console.log(email, password);
  const user = await userModel.findOne({ email });
  if (!user) {
    throw new Error('No email found');
  }
  console.log(user.hashedPassword);
  const isMatch = await bcrypt.compare(password, user.hashedPassword);
  if (!isMatch) {
    throw new Error('Incorrect password');
  }

  return {
    id: user._id,
    username: user.username,
    email: user.email
  };
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
    return betModel.find(queryFilter).populate('username');
}  

function findBetById(id) {
  return betModel.findById(id).populate('username');
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
  return promptModel.find(queryFilter).populate('user');
}

function findPromptById(id) {
  return promptModel.findById(id).populate('user');
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
  loginUser
};
