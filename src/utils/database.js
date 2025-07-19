import { PrismaClient } from "@prisma/client";

class Database {
  constructor() {
    this.prisma = new PrismaClient({
      log: ["info"],
    });
  }

  async connect() {
    try {
      await this.prisma.$connect();

      return Promise.resolve("Database Connected!");
    } catch (error) {
      return Promise.reject("Database Disconnected!");
    }
  }
}

export default new Database();
