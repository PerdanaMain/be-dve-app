import EquipmentService from "../services/equipment.service.js";
import Schema from "../utils/schema.js";

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
      const {
        hostname,
        brand,
        type,
        serialnumber,
        function_name,
        category,
        group,
      } = req.body;

      await Schema.createEquipmentSchema().validate({
        hostname,
        brand,
        type,
        serialnumber,
        function: function_name,
        category,
        category,
        group,
      });

      const exist = await EquipmentService.getEquipmentBySerialNumber(
        serialnumber
      );
      if (exist) {
        throw new Error(
          `Equipment with serial number ${serialnumber} is already exist!`
        );
      }

      await EquipmentService.createEquipment({
        hostname,
        brand,
        type,
        serialnumber,
        function: function_name,
        category,
        category,
        group,
      });

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
  show = async (req, res) => {
    try {
      const { identifier } = req.query;
      const equipment = await EquipmentService.getEquipmentByIdentifier(
        identifier
      );
      res.status(200).json({
        message: "Get equipment  successfully!",
        data: equipment,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
        data: null,
      });
    }
  };

  update = async (req, res) => {
    try {
      const { id } = req.params;
      const {
        hostname,
        brand,
        type,
        serialnumber,
        function_name,
        category,
        group,
      } = req.body;

      await Schema.createEquipmentSchema().validate({
        hostname,
        brand,
        type,
        serialnumber,
        function: function_name,
        category,
        category,
        group,
      });

      const exist = await EquipmentService.getEquipmentByIdentifier(id);
      if (!exist) {
        throw new Error(`Equipment not found!`);
      }

      const equipment = await EquipmentService.updateEquipment(id, {
        hostname,
        brand,
        type,
        serialnumber,
        function: function_name,
        category,
        category,
        group,
      });

      res.status(200).json({
        message: "Update equipment  successfully!",
        data: equipment,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
        data: null,
      });
    }
  };

  destroy = async (req, res) => {
    try {
      const { id } = req.params;
      await EquipmentService.deleteEquipmentById(id);
      res.status(200).json({
        message: "Equipment deleted  successfully!",
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
