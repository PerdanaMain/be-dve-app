import Schema from "../utils/schema.js";
import AuthService from "../services/auth.service.js";
import { encrypt } from "../utils/encryption.js";

class AuthController {
  register = async (req, res) => {
    try {
      const { fullname, username, password, confirmPassword } = req.body;
      await Schema.registerSchema().validate({
        fullname,
        username,
        password,
        confirmPassword,
      });

      const isExist = await AuthService.getUserByUsername(username);

      if (isExist) {
        throw new Error("username already exist!");
      }

      const hashedPassword = encrypt(password);
      const data = await AuthService.createUser({
        fullname,
        username,
        password: hashedPassword,
      });

      res.status(201).json({
        message: "Register successfully, waiting for admin approve!",
        data,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
        data: null,
      });
    }
  };
}

export default new AuthController();
