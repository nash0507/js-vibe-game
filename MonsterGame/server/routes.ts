import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertGameSessionSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Game session endpoints
  app.post("/api/game-sessions", async (req, res) => {
    try {
      const validatedData = insertGameSessionSchema.parse(req.body);
      const gameSession = await storage.createGameSession(validatedData);
      res.json(gameSession);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid game session data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to save game session" });
      }
    }
  });

  app.get("/api/high-scores", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const highScores = await storage.getHighScores(limit);
      res.json(highScores);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch high scores" });
    }
  });

  app.get("/api/game-stats", async (req, res) => {
    try {
      const stats = await storage.getGameStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch game statistics" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
