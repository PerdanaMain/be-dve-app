import EquipmentService from "../services/equipment.service.js";

class EquipmentController {
  index = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const equipments = await EquipmentService.getAllEquipmentsWithPagination(
        limit,
        skip
      );
      const totalEquipments = await EquipmentService.getTotalEquipment();
      const totalPages = Math.ceil(totalEquipments / limit);

      res.status(200).json({
        message: "Get equipment lists successfully!",
        data: equipments,
        meta: {
          total: totalEquipments,
          page: page,
          limit: limit,
          totalPages: totalPages,
          nextPage: page < totalPages ? page + 1 : null,
          prevPage: page > 1 ? page - 1 : null,
        },
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
        data: null,
      });
    }
  };
  create = async (req, res) => {
    try {
      res.status(200).json({
        message: "Equipment created successfully!",
        data: null,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
        data: null,
      });
    }
  };
}

export default new EquipmentController();
