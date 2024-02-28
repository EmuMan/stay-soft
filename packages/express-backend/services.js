import mongoose from "mongoose";
import userModel from "./models/user.js";
import betModel from "./models/bet.js";
import promptModel from "./models/prompt.js";
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
  deletePromptById
};
