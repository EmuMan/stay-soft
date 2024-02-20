import mongoose from "mongoose";
import userModel from "./models/user.js";
import betModel from "./models/bet.js";
import { config } from 'dotenv';

config();

mongoose.set("debug", true);

mongoose
  .connect(`mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@${process.env.ATLAS_CLUSTER}`)
  .catch((error) => console.log(error));

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

function addBet(bet) {
  const newBet = new betModel(bet);
  return newBet.save();
}

function getBets(filter = {}) {
    let queryFilter = {};
    if (filter.user) {
      queryFilter.user = filter.user;
    }
    return betModel.find(queryFilter).populate('user');
}  

function findBetById(id) {
  return betModel.findById(id).populate('user');
}

function deleteBetById(id) {
  return betModel.findByIdAndDelete(id);
}

export default {
  addUser,
  getUsers,
  findUserById,
  deleteUserById,
  addBet,
  getBets,
  findBetById,
  deleteBetById,
};
