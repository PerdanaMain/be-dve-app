import Schema from "../utils/schema.js";
import AuthService from "../services/auth.service.js";
import JWT from "../utils/jwt.js";
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

  login = async (req, res) => {
    try {
      const { username, password } = req.body;
      await Schema.loginSchema().validate({
        username,
        password,
      });

      const user = await AuthService.getActiveUserByUsername(username);

      if (!user) {
        throw new Error("user not found!");
      }

      const match = encrypt(password) === user.password;
      if (!match) {
        throw new Error("user not found!");
      }

      const token = JWT.generateToken({
        id: user.id,
        fullname: user.fullname,
      });

      res.status(200).json({
        message: "Login successfully!",
        data: token,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
        data: null,
      });
    }
  };

  me = async (req, res) => {
    try {
      const { id } = req.user;
      const user = await AuthService.getUserById(id);
      res.status(200).json({
        message: "Success get profile data",
        data: user,
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
