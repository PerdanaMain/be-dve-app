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
      fullname: "admin",
      username: "admin",
      password: encrypt("admin"),
      isActive: true,
      roleId: role.id,
    },
  });

  const categories = ["SERVER", "SWITCH", "FIREWALL", "GGSN", "DISCOVERY"];
  const groups = ["CORE", "IN", "IT"];
  const brands = ["DELLEMC", "HP", "CISCO", "HUAWEI"];
  const equipmentsData = Array.from({ length: 100 }, (_, i) => {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const group = groups[Math.floor(Math.random() * groups.length)];
    const brand = brands[Math.floor(Math.random() * brands.length)];
    return {
      hostname: `${category}-XL07-PS-${i + 1}`,
      brand: brand,
      type: `RXXX Type B ${i + 1}`,
      serialnumber: `XXX-${String(i + 1).padStart(3, "0")}`,
      function: category,
      category: category,
      group: group,
    };
  });

  await prisma.equipments.createMany({
    data: equipmentsData,
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
