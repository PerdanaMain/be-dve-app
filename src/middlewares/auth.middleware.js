import JWT from "../utils/jwt.js";
import UserService from "../services/user.service.js";

class AuthMiddleware {
  // Helper to extract and verify token with private function
  _getUserFromAuthHeader = (req) => {
    const authorization = req.headers.authorization;
    if (!authorization) throw new Error("unauthorized!");
    const [prefix, token] = authorization.split(" ");
    if (prefix !== "Bearer" || !token) throw new Error("unauthorized!");
    const user = JWT.verifyToken(token);
    if (!user) throw new Error("unauthorized!");
    return user;
  };

  verifyToken = (req, res, next) => {
    try {
      req.user = this._getUserFromAuthHeader(req);
      next();
    } catch (error) {
      res.status(403).json({ message: error.message, data: null });
    }
  };

  verifyAdmin = async (req, res, next) => {
    try {
      const user = this._getUserFromAuthHeader(req);
      const admin = await UserService.getUserById(user.id);
      if (!admin.roles || admin.roles.name !== "Admin") {
        throw new Error("unauthorized!");
      }
      req.user = admin;
      next();
    } catch (error) {
      res.status(403).json({ message: error.message, data: null });
    }
  };
}

export default new AuthMiddleware();
