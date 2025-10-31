import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertQuestionSchema, insertAnswerSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Questions API
  app.get('/api/questions', async (req, res) => {
    try {
      const questions = await storage.getAllQuestions();
      res.json(questions);
    } catch (error) {
      console.error("Error fetching questions:", error);
      res.status(500).json({ message: "Failed to fetch questions" });
    }
  });

  app.get('/api/questions/:id', async (req, res) => {
    try {
      const question = await storage.getQuestion(req.params.id);
      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }
      res.json(question);
    } catch (error) {
      console.error("Error fetching question:", error);
      res.status(500).json({ message: "Failed to fetch question" });
    }
  });

  app.post('/api/questions', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      
      const validation = insertQuestionSchema.safeParse({
        title: req.body.title,
        description: req.body.description,
        isAnonymous: req.body.isAnonymous ?? false,
        authorId: req.body.isAnonymous ? null : userId,
      });
      
      if (!validation.success) {
        return res.status(400).json({
          message: "Invalid request data",
          errors: fromZodError(validation.error).toString(),
        });
      }
      
      const question = await storage.createQuestion(validation.data);
      res.json(question);
    } catch (error) {
      console.error("Error creating question:", error);
      res.status(500).json({ message: "Failed to create question" });
    }
  });

  app.delete('/api/questions/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const question = await storage.getQuestion(req.params.id);
      
      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }
      
      if (question.authorId !== userId) {
        return res.status(403).json({ message: "Not authorized to delete this question" });
      }
      
      await storage.deleteQuestion(req.params.id);
      res.json({ message: "Question deleted successfully" });
    } catch (error) {
      console.error("Error deleting question:", error);
      res.status(500).json({ message: "Failed to delete question" });
    }
  });

  // Answers API
  app.get('/api/questions/:questionId/answers', async (req, res) => {
    try {
      const answers = await storage.getAnswersByQuestion(req.params.questionId);
      res.json(answers);
    } catch (error) {
      console.error("Error fetching answers:", error);
      res.status(500).json({ message: "Failed to fetch answers" });
    }
  });

  app.post('/api/questions/:questionId/answers', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const questionId = req.params.questionId;
      
      const question = await storage.getQuestion(questionId);
      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }
      
      if (req.body.parentId) {
        const parentAnswer = await storage.getAnswer(req.body.parentId);
        if (!parentAnswer || parentAnswer.questionId !== questionId) {
          return res.status(400).json({ message: "Invalid parent answer" });
        }
      }
      
      const validation = insertAnswerSchema.safeParse({
        content: req.body.content,
        questionId,
        isAnonymous: req.body.isAnonymous ?? false,
        authorId: req.body.isAnonymous ? null : userId,
        parentId: req.body.parentId ?? null,
      });
      
      if (!validation.success) {
        return res.status(400).json({
          message: "Invalid request data",
          errors: fromZodError(validation.error).toString(),
        });
      }
      
      const answer = await storage.createAnswer(validation.data);
      res.json(answer);
    } catch (error) {
      console.error("Error creating answer:", error);
      res.status(500).json({ message: "Failed to create answer" });
    }
  });

  app.patch('/api/answers/:id/upvote', isAuthenticated, async (req, res) => {
    try {
      const answer = await storage.upvoteAnswer(req.params.id);
      res.json(answer);
    } catch (error) {
      console.error("Error upvoting answer:", error);
      res.status(500).json({ message: "Failed to upvote answer" });
    }
  });

  // User Profile API
  app.get('/api/users/:id/questions', async (req, res) => {
    try {
      const questions = await storage.getUserQuestions(req.params.id);
      res.json(questions);
    } catch (error) {
      console.error("Error fetching user questions:", error);
      res.status(500).json({ message: "Failed to fetch user questions" });
    }
  });

  app.get('/api/users/:id/answers', async (req, res) => {
    try {
      const answers = await storage.getUserAnswers(req.params.id);
      res.json(answers);
    } catch (error) {
      console.error("Error fetching user answers:", error);
      res.status(500).json({ message: "Failed to fetch user answers" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
