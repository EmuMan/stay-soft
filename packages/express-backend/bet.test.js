import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import betModel from "./models/bet.js";
import promptModel from "./models/prompt.js";
import userModel from "./models/user.js";
import betService from "./services"; 

describe('Bet Service Tests', () => {
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

  let user, user2, user3, prompt, prompt2;

  beforeEach(async () => {
    user = new userModel({
      username: 'testUser',
      email: 'test@example.com',
      hashedPassword: 'password',
      points: 500,
      firstName: 'John',
      lastName: 'Doe'
    });
    await user.save();

    user2 = new userModel({
    username: 'testUser2',
      email: 'test2@example.com',
      hashedPassword: 'password',
      points: 500,
      firstName: 'Jane',
      lastName: 'Doe'
    })
    await user2.save();

    user3 = new userModel({
        username: 'testUser3',
        email: 'test3@example.com',
        hashedPassword: 'password',
        points: 500,
        firstName: 'Jane',
        lastName: 'Doe'
    })
    await user3.save();

    prompt = new promptModel({
        question: "Will it rain tomorrow?",
        user: user._id,
        category: "Weather",
        dateOpened: new Date(),
    });
    await prompt.save();

    prompt2 = new promptModel({
        question: "What is love?",
        user: user2._id,
        category: "Finance",
        dateOpened: new Date(),
    })
    await prompt2.save();

    const bet1 = new betModel({
        promptId: prompt._id,
        user: user._id,
        decision: true,
        amount: 50
    });
    await bet1.save();

    const bet2 = new betModel({
        promptId: prompt._id,
        user: user2._id,
        decision: true,
        amount: 20
    })
    await bet2.save();

  });

  afterEach(async () => {
    await betModel.deleteMany({});
    await promptModel.deleteMany({});
    await userModel.deleteMany({});
  });

  test('addBet should add a positive bet successfully', async () => {
    await betModel.deleteMany({});
  
    const betDetails = {
      promptId: prompt2._id,
      user: user._id,
      decision: true,
      amount: 100
    };
  
    const reqUser = { id: user._id.toString() };
    const savedBet = await betService.addBet(reqUser, betDetails);
  
    expect(savedBet).toHaveProperty('_id');
    expect(savedBet.user.toString()).toEqual(user._id.toString());
    expect(savedBet.amount).toEqual(betDetails.amount);
    expect(savedBet.decision).toBe(true);
  });

  test('addBet should add a negative bet successfully', async () => {
    await betModel.deleteMany({});
  
    const betDetails = {
      promptId: prompt2._id,
      user: user._id,
      decision: false,
      amount: 100
    };
  
    const reqUser = { id: user._id.toString() };
    const savedBet = await betService.addBet(reqUser, betDetails);
  
    expect(savedBet).toHaveProperty('_id');
    expect(savedBet.user.toString()).toEqual(user._id.toString());
    expect(savedBet.amount).toEqual(betDetails.amount);
    expect(savedBet.decision).toBe(false);
  });

  test('should throw an error if the user has already placed a bet on the prompt', async () => {
    await betModel.create({
      promptId: prompt._id,
      user: user._id,
      decision: true,
      amount: 50,
    });
  
    const betDetails = {
      promptId: prompt._id,
      user: user._id,
      decision: true,
      amount: 100,
    };
  
    await expect(betService.addBet({ id: user._id }, betDetails)).rejects.toThrow("User already placed a bet on this prompt");
  });
  
  test('should throw an error if the prompt is not found', async () => {
    const betDetails = {
      promptId: new mongoose.Types.ObjectId(),
      user: user._id,
      decision: true,
      amount: 100,
    };
  
    await expect(betService.addBet({ id: user._id }, betDetails)).rejects.toThrow("Prompt not found");
  });

  test('should throw an error if the user is not found', async () => {
    const betDetails = {
      promptId: prompt._id,
      user: new mongoose.Types.ObjectId(),
      decision: true,
      amount: 100,
    };
  
    await expect(betService.addBet({ id: user._id }, betDetails)).rejects.toThrow("User not found");
  });

  test('should throw an error if the prompt is already closed', async () => {
    prompt2.dateClosed = new Date();
    await prompt2.save();
    await betModel.deleteMany({});
  
    const betDetails = {
      promptId: prompt2._id,
      user: user._id,
      decision: false,
      amount: 50
    };
  
    const reqUser = { id: user._id };
    await expect(betService.addBet(reqUser, betDetails))
      .rejects
      .toThrow("Prompt already closed");
  });
  
  
  test('should throw an error if the user tries to bet on their own prompt', async () => {
    prompt.user = user._id;
    await prompt.save();
    await betModel.deleteMany({});
  
    const betDetails = {
      promptId: prompt._id,
      user: user._id,
      decision: true,
      amount: 50
    };
  
    await expect(betService.addBet({ id: user._id }, betDetails))
      .rejects
      .toThrow("Cannot bet on own prompt");
  });
  

  test('should throw an error if the user does not have enough points', async () => {
    await betModel.deleteMany({});
    const betDetails = {
      promptId: prompt2._id,
      user: user._id,
      decision: true,
      amount: 600,
    };
  
    await expect(betService.addBet({ id: user._id }, betDetails)).rejects.toThrow("User does not have enough points to place bet");
  });

  test('should throw an error if the user is not authorized to place bet', async () => {
    const betDetails = {
      promptId: prompt2._id,
      user: user3._id,
      decision: true,
      amount: 50
    };

    const reqUser = { id: user._id };

    await expect(betService.addBet(reqUser, betDetails))
      .rejects
      .toThrow("User not authorized to place bet");
  });

  test('getBets should retrieve bets correctly', async () => {
    const bets = await betService.getBets({});
    expect(bets.length).toBeGreaterThan(0);
    bets.forEach(bet => {
      expect(bet).toHaveProperty('amount');
      expect(bet).toHaveProperty('decision');
    });
  });

  test('should correctly retrieve bets filtered by user', async () => {
    const filteredBets = await betService.getBets({ user: user._id });

    expect(filteredBets.length).toBe(1);
    expect(filteredBets[0].user._id.toString()).toEqual(user._id.toString());
    expect(filteredBets[0].user.username).toEqual(user.username);
  });

  test('findBetById should retrieve the correct bet', async () => {
    const bet = new betModel({
      promptId: prompt._id,
      user: user._id,
      decision: true,
      amount: 50
    });
    await bet.save();

    const foundBet = await betService.findBetById(bet._id);
    expect(foundBet).not.toBeNull();
    expect(foundBet._id.toString()).toEqual(bet._id.toString());
  });

  test('deleteBetById should remove the bet successfully', async () => {
    const bet = new betModel({
      promptId: prompt._id,
      user: user._id,
      decision: false,
      amount: 150
    });
    await bet.save();

    await betService.deleteBetById(bet._id);
    const deletedBet = await betModel.findById(bet._id);
    expect(deletedBet).toBeNull();
  });
});
