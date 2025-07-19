import { PrismaClient } from "@prisma/client";

class AuthService {
  constructor() {
    this.prisma = new PrismaClient();
  }

  createUser = async (data) => {
    const { fullname, username, password } = data;
    const user = await this.prisma.users.create({
      data: {
        fullname,
        username,
        password,
      },
    });

    return user;
  };

  getUserByUsername = async (username) => {
    const user = await this.prisma.users.findFirstOrThrow({
      where: {
        username,
      },
    });

    return user;
  };

  getActiveUserByUsername = async (username) => {
    const user = await this.prisma.users.findFirst({
      where: {
        username,
        isActive: true,
      },
    });

    return user;
  };

  getUserById = async (id) => {
    const user = await this.prisma.users.findUnique({
      where: { id },
      include: {
        roles: true,
      },
    });

    return user;
  };
}

export default new AuthService();
