import { PrismaClient } from "@prisma/client";
import { encrypt } from "../src/utils/encryption.js";
const prisma = new PrismaClient();

async function main() {
  await prisma.roles.createMany({
    data: [
      {
        name: "Admin",
      },
      {
        name: "User",
      },
    ],
  });

  const role = await prisma.roles.findFirst({
    where: {
      name: "Admin",
    },
  });

  await prisma.users.create({
    data: {
      username: "admin",
      password: encrypt("admin"),
      roleId: role.id,
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
