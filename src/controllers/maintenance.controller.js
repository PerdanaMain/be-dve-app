class MaintenanceController {
  index = async (req, res) => {
    try {
      res.status(200).json({
        message: "maintenance data fetched successfully!",
        data: null,
      });
    } catch (error) {
      return res.status(200).json({
        message: error.message,
        data: null,
      });
    }
  };
}

export default new MaintenanceController();
