import {
  type User,
  type InsertUser,
  type UpsertUser,
  type Question,
  type InsertQuestion,
  type Answer,
  type InsertAnswer,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Question operations
  getAllQuestions(): Promise<Question[]>;
  getQuestion(id: string): Promise<Question | undefined>;
  createQuestion(question: InsertQuestion): Promise<Question>;
  deleteQuestion(id: string): Promise<void>;
  getUserQuestions(userId: string): Promise<Question[]>;
  
  // Answer operations
  getAnswer(id: string): Promise<Answer | undefined>;
  getAnswersByQuestion(questionId: string): Promise<Answer[]>;
  createAnswer(answer: InsertAnswer): Promise<Answer>;
  upvoteAnswer(id: string): Promise<Answer>;
  getUserAnswers(userId: string): Promise<Answer[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private questions: Map<string, Question>;
  private answers: Map<string, Answer>;

  constructor() {
    this.users = new Map();
    this.questions = new Map();
    this.answers = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = {
      ...insertUser,
      id,
      email: insertUser.email ?? null,
      username: insertUser.username ?? null,
      firstName: insertUser.firstName ?? null,
      lastName: insertUser.lastName ?? null,
      profileImageUrl: insertUser.profileImageUrl ?? null,
      password: insertUser.password ?? null,
      dob: insertUser.dob ?? null,
      isExpert: insertUser.isExpert ?? false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async upsertUser(upsertData: UpsertUser): Promise<User> {
    const existingUser = this.users.get(upsertData.id);
    
    if (existingUser) {
      const updatedUser: User = {
        ...existingUser,
        email: upsertData.email ?? existingUser.email,
        firstName: upsertData.firstName ?? existingUser.firstName,
        lastName: upsertData.lastName ?? existingUser.lastName,
        profileImageUrl: upsertData.profileImageUrl ?? existingUser.profileImageUrl,
        updatedAt: new Date(),
      };
      this.users.set(upsertData.id, updatedUser);
      return updatedUser;
    } else {
      const newUser: User = {
        id: upsertData.id,
        email: upsertData.email ?? null,
        username: null,
        firstName: upsertData.firstName ?? null,
        lastName: upsertData.lastName ?? null,
        profileImageUrl: upsertData.profileImageUrl ?? null,
        password: null,
        dob: null,
        isExpert: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.users.set(upsertData.id, newUser);
      return newUser;
    }
  }

  // Question operations
  async getAllQuestions(): Promise<Question[]> {
    return Array.from(this.questions.values()).sort((a, b) =>
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getQuestion(id: string): Promise<Question | undefined> {
    return this.questions.get(id);
  }

  async createQuestion(insertQuestion: InsertQuestion): Promise<Question> {
    const id = randomUUID();
    const question: Question = {
      ...insertQuestion,
      id,
      authorId: insertQuestion.authorId ?? null,
      isAnonymous: insertQuestion.isAnonymous ?? false,
      createdAt: new Date(),
    };
    this.questions.set(id, question);
    return question;
  }

  async deleteQuestion(id: string): Promise<void> {
    this.questions.delete(id);
    Array.from(this.answers.values())
      .filter(answer => answer.questionId === id)
      .forEach(answer => this.answers.delete(answer.id));
  }

  async getUserQuestions(userId: string): Promise<Question[]> {
    return Array.from(this.questions.values())
      .filter(q => q.authorId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  // Answer operations
  async getAnswer(id: string): Promise<Answer | undefined> {
    return this.answers.get(id);
  }

  async getAnswersByQuestion(questionId: string): Promise<Answer[]> {
    return Array.from(this.answers.values())
      .filter(a => a.questionId === questionId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createAnswer(insertAnswer: InsertAnswer): Promise<Answer> {
    const id = randomUUID();
    const answer: Answer = {
      ...insertAnswer,
      id,
      authorId: insertAnswer.authorId ?? null,
      parentId: insertAnswer.parentId ?? null,
      isAnonymous: insertAnswer.isAnonymous ?? false,
      upvotes: 0,
      createdAt: new Date(),
    };
    this.answers.set(id, answer);
    return answer;
  }

  async upvoteAnswer(id: string): Promise<Answer> {
    const answer = this.answers.get(id);
    if (!answer) {
      throw new Error("Answer not found");
    }
    const updatedAnswer: Answer = {
      ...answer,
      upvotes: answer.upvotes + 1,
    };
    this.answers.set(id, updatedAnswer);
    return updatedAnswer;
  }

  async getUserAnswers(userId: string): Promise<Answer[]> {
    return Array.from(this.answers.values())
      .filter(a => a.authorId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
}

export const storage = new MemStorage();
