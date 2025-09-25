import { type User, type InsertUser, type GameSession, type InsertGameSession } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createGameSession(session: InsertGameSession): Promise<GameSession>;
  getHighScores(limit?: number): Promise<GameSession[]>;
  getGameStats(): Promise<{
    totalGames: number;
    averageScore: number;
    highestScore: number;
    totalRounds: number;
  }>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private gameSessions: Map<string, GameSession>;

  constructor() {
    this.users = new Map();
    this.gameSessions = new Map();
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
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createGameSession(session: InsertGameSession): Promise<GameSession> {
    const id = randomUUID();
    const gameSession: GameSession = {
      id,
      playerName: session.playerName,
      finalScore: session.finalScore,
      maxPosition: session.maxPosition ?? 4,
      roundsPlayed: session.roundsPlayed ?? 0,
      createdAt: new Date(),
    };
    this.gameSessions.set(id, gameSession);
    return gameSession;
  }

  async getHighScores(limit = 10): Promise<GameSession[]> {
    return Array.from(this.gameSessions.values())
      .sort((a, b) => b.finalScore - a.finalScore)
      .slice(0, limit);
  }

  async getGameStats(): Promise<{
    totalGames: number;
    averageScore: number;
    highestScore: number;
    totalRounds: number;
  }> {
    const sessions = Array.from(this.gameSessions.values());
    
    if (sessions.length === 0) {
      return {
        totalGames: 0,
        averageScore: 0,
        highestScore: 0,
        totalRounds: 0,
      };
    }

    const totalGames = sessions.length;
    const totalScore = sessions.reduce((sum, session) => sum + session.finalScore, 0);
    const averageScore = Math.round(totalScore / totalGames);
    const highestScore = Math.max(...sessions.map(s => s.finalScore));
    const totalRounds = sessions.reduce((sum, session) => sum + session.roundsPlayed, 0);

    return {
      totalGames,
      averageScore,
      highestScore,
      totalRounds,
    };
  }
}

export const storage = new MemStorage();
