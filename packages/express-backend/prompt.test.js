import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import promptModel from "./models/prompt";
import userModel from "./models/user";
import betModel from "./models/bet";
import promptService from "./services";

describe('Prompt Service Tests', () => {
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

  let user1, user2;

  beforeEach(async () => {
    await userModel.deleteMany({});
    await promptModel.deleteMany({});
    user1 = await userModel.create({
        username: 'user1',
        email: 'user1@example.com',
        firstName: 'Aiden',
        lastName: 'Smith',
        hashedPassword: 'pass',
        points: 100,
    });
    
    user2 = await userModel.create({
        username: 'user2',
        email: 'user2@example.com',
        firstName: 'Gabe',
        lastName: 'Alonso',
        hashedPassword: 'pass',
        points: 150,
    });

    const samplePrompts = [
      {
        question: "Is technology improving our quality of life?",
        user: user1._id,
        category: "Technology",
        numYes: 10,
        numNo: 5,
        dateOpened: new Date(),
        dateClosed: new Date('01-01-2070'),
        yesPool: 100,
        noPool: 50,
        result: null,
        comments: ["Great question!", "Very thought-provoking!"],
      },
      {
        question: "Will virtual reality replace traditional travel?",
        user: user2._id,
        category: "Travel",
        numYes: 15,
        numNo: 20,
        dateOpened: new Date(),
        dateClosed: new Date('01-01-2070'),
        yesPool: 150,
        noPool: 100,
        result: null,
        comments: ["Interesting perspective.", "I prefer real travel."],
      },
    ];
  
    await promptModel.insertMany(samplePrompts);
  });
  

  afterEach(async () => {
    await promptModel.deleteMany({});
  });

  test('addPrompt should add a prompt successfully', async () => {
    const sampleUserId = new mongoose.Types.ObjectId();
    const newPrompt = { question: 'Is water wet', user: sampleUserId, category: 'Finance', dateOpened: new Date() };
    const savedPrompt = await promptService.addPrompt(newPrompt);
    expect(savedPrompt).toHaveProperty('_id');
    expect(savedPrompt.title).toEqual(newPrompt.title);
  });

  test('getPrompts should retrieve prompts correctly', async () => {
    const prompts = await promptService.getPrompts();
    expect(prompts.length).toBeGreaterThan(0);
    prompts.forEach(prompt => {
      expect(prompt).toHaveProperty('question');
      expect(prompt).toHaveProperty('user');
    });
  });

  test('should correctly retrieve prompts filtered by user', async () => {
    const filteredPrompts = await promptService.getPrompts(user1._id);
  
    expect(filteredPrompts.length).toBe(1);
    expect(filteredPrompts[0].user._id.toString()).toEqual(user1._id.toString());
    expect(filteredPrompts[0].user.username).toEqual(user1.username);
  });

  test('findPromptById should retrieve the correct prompt', async () => {
    const prompts = await promptModel.find();
    const prompt = prompts[0];
    const foundPrompt = await promptService.findPromptById(prompt._id);
    expect(foundPrompt).not.toBeNull();
    expect(foundPrompt.title).toEqual(prompt.title);
  });

  test('deletePromptById should remove the prompt successfully', async () => {
    const prompts = await promptModel.find();
    const prompt = prompts[0];
    await promptService.deletePromptById(prompt._id, true);
    const deletedPrompt = await promptModel.findById(prompt._id);
    expect(deletedPrompt).toBeNull();
  });

  test('deletePromptById should throw an error if the result is undefined', async () => {
    const prompts = await promptModel.find();
    const prompt = prompts[0];
    await expect(promptService.deletePromptById(prompt._id, undefined))
      .rejects
      .toThrow('Result not found');
  });

  test('deletePromptById should resolve bets and delete the prompt, yes resolution', async () => {
    const prompt = await new promptModel({
      question: "Sample question?",
      user: user1._id,
      category: "Sample Category",
      dateOpened: new Date(),
      dateClosed: new Date(),
      numYes: 1,
      numNo: 1,
      yesPool: 100,
      noPool: 50,
    }).save();

    const bet1 = await new betModel({
      promptId: prompt._id,
      user: user1._id,
      decision: true,
      amount: 100,
    }).save();

    const bet2 = await new betModel({
      promptId: prompt._id,
      user: user2._id,
      decision: false,
      amount: 50,
    }).save();

    console.log(user1.points, user2.points);

    await promptService.deletePromptById(prompt._id, true);
    const deletedPrompt = await promptModel.findById(prompt._id);
    expect(deletedPrompt).toBeNull();

    const user1After = await userModel.findById(user1._id);
    expect(user1After.points).toBe(250);

    const user2After = await userModel.findById(user2._id);
    expect(user2After.points).toBe(150);

    const bet1After = await betModel.findById(bet1._id);
    expect(bet1After).toBeNull();

    const bet2After = await betModel.findById(bet2._id);
    expect(bet2After).toBeNull();
  });

  test('deletePromptById should resolve bets and delete the prompt, no resolution', async () => {
    const prompt = await new promptModel({
      question: "Sample question?",
      user: user1._id,
      category: "Sample Category",
      dateOpened: new Date(),
      dateClosed: new Date(),
      numYes: 1,
      numNo: 1,
      yesPool: 100,
      noPool: 50,
    }).save();

    const bet1 = await new betModel({
      promptId: prompt._id,
      user: user1._id,
      decision: true,
      amount: 100,
    }).save();

    const bet2 = await new betModel({
      promptId: prompt._id,
      user: user2._id,
      decision: false,
      amount: 50,
    }).save();

    console.log(user1.points, user2.points);

    await promptService.deletePromptById(prompt._id, false);
    const deletedPrompt = await promptModel.findById(prompt._id);
    expect(deletedPrompt).toBeNull();

    const user1After = await userModel.findById(user1._id);
    expect(user1After.points).toBe(100);

    const user2After = await userModel.findById(user2._id);
    expect(user2After.points).toBe(300);

    const bet1After = await betModel.findById(bet1._id);
    expect(bet1After).toBeNull();

    const bet2After = await betModel.findById(bet2._id);
    expect(bet2After).toBeNull();
  });

  test('updatePromptById should throw an error if the prompt is not found', async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    const reqUser = { id: new mongoose.Types.ObjectId() };
  
    await expect(promptService.updatePromptById(nonExistentId, reqUser, true))
      .rejects
      .toThrow('Prompt not found');
  });
  
  test('updatePromptById should throw an error if unauthorized user tries to update', async () => {
    const user = await new userModel({
      username: 'testuser',
      email: 'testuser@example.com',
      hashedPassword: 'password',
      firstName: 'Aiden',
      lastName: 'Smith',
      points: 100,
    }).save();
  
    const prompt = await new promptModel({
      question: "Sample question?",
      user: new mongoose.Types.ObjectId(),
      category: "Sample Category",
      dateOpened: new Date(),
    }).save();
  
    const reqUser = { id: user._id };
  
    await expect(promptService.updatePromptById(prompt._id, reqUser, true))
      .rejects
      .toThrow('User not authorized to update prompt');
  });
  
  test('updatePromptById should throw an error if the prompt is already closed', async () => {
    const user = await new userModel({
      username: 'testuser',
      email: 'testuser@example.com',
      hashedPassword: 'password2',
      firstName: 'Aiden',
      lastName: 'Smith',
      points: 150,
    }).save();
  
    const prompt = await new promptModel({
      question: "Another sample question?",
      user: user._id,
      category: "Another Category",
      dateOpened: new Date(),
      dateClosed: new Date(),
    }).save();
  
    await expect(promptService.updatePromptById(prompt._id, { id: user._id }, true))
      .rejects
      .toThrow('Prompt already closed');
  });
  
  test('updatePromptById should update a prompt', async () => {
    const user = await new userModel({
      username: 'testuser',
      email: 'testuser@example.com',
      hashedPassword: 'password2',
      firstName: 'Aiden',
      lastName: 'Smith',
      points: 150,
    }).save();
  
    const prompt = await new promptModel({
      question: "Another sample question?",
      user: user._id,
      category: "Another Category",
      dateOpened: new Date('01-01-1970'),
      dateClosed: new Date('01-02-2070'),
    }).save();
  
    await promptService.updatePromptById(prompt._id, { id: user._id }, true);
    const updatedPrompt = await promptModel.findById(prompt._id);
    expect(updatedPrompt.dateClosed).toBeTruthy();
    expect(updatedPrompt.dateClosed).toBeInstanceOf(Date);
  });
  
});

