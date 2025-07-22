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
      orderBy: {
        createdAt: "desc",
      },
    });
  };

  getTotalEquipment = async () => {
    return this.prisma.equipments.count();
  };

  getEquipmentBySerialNumber = async (serialnumber) => {
    return this.prisma.equipments.findFirst({
      where: {
        serialnumber,
      },
    });
  };

  createEquipment = async (data) => {
    return this.prisma.equipments.create({
      data: {
        hostname: data.hostname,
        brand: data.brand,
        type: data.type,
        serialnumber: data.serialnumber,
        function: data.function,
        category: data.category,
        group: data.group,
      },
    });
  };
}

export default new EquipmentService();
