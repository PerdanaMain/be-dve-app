import UserService from "../services/user.service.js";
import Schema from "../utils/schema.js";

class AdminController {
  userList = async (_, res) => {
    try {
      const users = await UserService.getAllUser();
      res.status(200).json({
        message: "Success get user lists!",
        data: users,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
        data: null,
      });
    }
  };

  userActivation = async (req, res) => {
    try {
      const { id, activate } = req.query;
      await Schema.userActivationSchema().validate({
        id,
        activate,
      });

      const user = await UserService.getUserById(id);
      const activateBool = activate === "true" || activate === true;

      if (!user) throw new Error("User not found!");
      await UserService.updateUserActivation(user.id, activateBool);
      res.status(200).json({
        message: activateBool
          ? "User activated successfully!"
          : "User deactivated successfully!",
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

export default new AdminController();
