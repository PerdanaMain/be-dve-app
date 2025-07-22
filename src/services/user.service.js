import { PrismaClient } from "@prisma/client";

class AuthService {
  constructor() {
    this.prisma = new PrismaClient({
      log: ["info"],
    });
  }

  createUser = async (data) => {
    const { fullname, username, password } = data;
    const role = await this.prisma.roles.findFirst({
      where: {
        name: "User",
      },
    });
    const user = await this.prisma.users.create({
      data: {
        fullname,
        username,
        password,
        roleId: role.id,
      },
    });

    return user;
  };

  getUserByUsername = async (username) => {
    const user = await this.prisma.users.findFirst({
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

  getAllUser = async () => {
    return await this.prisma.users.findMany({
      where: {
        NOT: {
          roles: {
            name: "admin",
          },
        },
      },
    });
  };

  updateUserActivation = async (id, isActive) => {
    return await this.prisma.users.update({
      where: {
        id,
      },
      data: {
        isActive,
      },
    });
  };
}

export default new AuthService();
