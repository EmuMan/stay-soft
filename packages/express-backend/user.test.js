import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import userModel from "./models/user";
import userService from "./services";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

describe('User Service Tests', () => {
  let mongoServer;

  beforeAll(async () => {
    if (mongoose.connection.readyState) {
      await mongoose.disconnect();
    }
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    const users = [
      { username: 'user1', email: 'user1@example.com', hashedPassword: 'password1', firstName: 'John', lastName: 'Doe', points: 100 },
      { username: 'user2', email: 'user2@example.com', hashedPassword: 'password2', firstName: 'Jane', lastName: 'Doey', points: 100 },
    ];
    await userModel.insertMany(users);
  });

  afterEach(async () => {
    await userModel.deleteMany({});
  });

  test('addUser should add a user successfully', async () => {
    const user = { username: 'testUser', email: 'test@example.com', hashedPassword: 'password', firstName: 'Carl', lastName: 'Max' };
    const savedUser = await userService.addUser(user);
    expect(savedUser).toHaveProperty('_id');
    expect(savedUser.username).toEqual(user.username);
  });

  test('getUsers should retrieve users correctly', async () => {
    const users = await userService.getUsers();
    expect(users.length).toBeGreaterThan(0);
    users.forEach(user => {
      expect(user).toHaveProperty('username');
      expect(user).toHaveProperty('email');
    });
  });

  test('should filter users by username', async () => {
    const users = await userService.getUsers({ username: 'user1' });
    expect(users.length).toBe(1);
    expect(users[0].username).toBe('user1');
  });

  test('should filter users by email', async () => {
    const users = await userService.getUsers({ email: 'user1@example.com' });
    expect(users.length).toBe(1);
    expect(users[0].email).toBe('user1@example.com');
  });

  test('should filter users by firstName', async () => {
    const users = await userService.getUsers({ firstName: 'John' });
    expect(users.length).toBe(1);
    expect(users[0].firstName).toBe('John');
  });

  test('should filter users by lastName', async () => {
    const users = await userService.getUsers({ lastName: 'Doe' });
    expect(users.length).toBe(1);
    expect(users[0].lastName).toBe('Doe');
  });
    
  test('findUserById should retrieve the correct user', async () => {
    const users = await userModel.find();
    const user = users[0];
    const foundUser = await userService.findUserById(user._id);
    expect(foundUser).not.toBeNull();
    expect(foundUser.username).toEqual(user.username);
  });

  test('deleteUserById should remove the user successfully', async () => {
    const users = await userModel.find();
    const user = users[0];
    await userService.deleteUserById(user._id);
    const deletedUser = await userModel.findById(user._id);
    expect(deletedUser).toBeNull();
  });

  test('updateUserById should update the user details correctly', async () => {
    const users = await userModel.find();
    const user = users[0];
    // 25 is the betAmount, so it should subtract 25 from 100
    const updatedUser = await userService.updateUserById(user._id, 25);
    expect(updatedUser.points).toEqual(75);
  });

  test('updateUserById should handle non-existing user', async () => {
    const nonExistingId = new mongoose.Types.ObjectId();
    const result = await userService.updateUserById(nonExistingId, 50);
    expect(result).toBeNull();
  });

  test('signupUser should create a new user', async () => {
    const newUser = {
      email: "newuser@example.com",
      username: "newuser",
      password: "password123",
      firstName: "New",
      lastName: "User"
    };
    const savedUser = await userService.signupUser(newUser.email, newUser.username, newUser.password, newUser.firstName, newUser.lastName);
    expect(savedUser).toHaveProperty('id');
    expect(savedUser.email).toEqual(newUser.email);
  });

  test('signupUser should throw an error if the user already exists', async () => {
    const users = await userModel.find();
    const user = users[0];
    await expect(userService.signupUser(user.email, user.username, 'password', user.firstName, user.lastName))
      .rejects
      .toThrow("User already exists with the given email or username");
  });
  

  test('loginUser should authenticate the user successfully', async () => {
    const password = 'password';
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
  
    const userData = {
      email: "testuser@example.com",
      hashedPassword: hashedPassword,
      username: 'testuser',
      firstName: 'Test',
      lastName: 'User'
    };
  
    const createdUser = new userModel(userData);
    await createdUser.save();
  
    const loginUser = await userService.loginUser(userData.email, password);
  
    expect(loginUser).toHaveProperty('token');
  });

  test('loginUser should throw an error if no user is found', async () => {
    await expect(userService.loginUser('nonexistent@example.com', 'password'))
      .rejects
      .toThrow("No email found");
  });
  
  test('loginUser should throw an error for incorrect password', async () => {
    const users = await userModel.find();
    const user = users[0];
    await expect(userService.loginUser(user.email, 'wrongpassword'))
      .rejects
      .toThrow("Incorrect password");
  });

  test('should respond with 401 if no token is provided', () => {
    const req = {
      headers: {
        authorization: ''
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    userService.authenticateUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "No token received" });
  });

  test('should respond with 401 if JWT is invalid', () => {
    const req = {
      headers: {
        authorization: 'Bearer invalidtoken'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();
  
    userService.authenticateUser(req, res, next);
  
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: expect.stringContaining("JWT error:") }));
  });
    
  test('should call next() for a valid token', () => {
    jwt.verify = jest.fn().mockImplementation((token, secret, callback) => {
      callback(null, { id: '123', username: 'testuser' });
    });
  
    const req = {
      headers: {
        authorization: 'Bearer validtoken'
      }
    };
    const res = {};
    const next = jest.fn();
  
    userService.authenticateUser(req, res, next);
  
    expect(next).toHaveBeenCalled();
  });  
});
