import { PrismaClient } from "@prisma/client";

class EquipmentService {
  constructor() {
    this.prisma = new PrismaClient({
      log: ["info"],
    });
  }

  getAllEquipmentsWithPagination = async (take, skip) => {
    return this.prisma.equipments.findMany({
      take,
      skip,
      include: { maintenances: true },
    });
  };

  getTotalEquipment = async () => {
    return this.prisma.equipments.count();
  };
}

export default new EquipmentService();
