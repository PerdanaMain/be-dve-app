import JWT from "../utils/jwt.js";

class AuthMiddleware {
  verifyToken = (req, res, next) => {
    try {
      const authorization = req.headers.authorization;

      if (!authorization) {
        throw new Error("unauthorized!");
      }

      const [prefix, token] = authorization.split(" "); // split by whitespace

      if (!(prefix === "Bearer" && token)) {
        throw new Error("unauthorized!");
      }

      const user = JWT.verifyToken(token);
      if (!user) {
        throw new Error("unauthorized!");
      }
      req.user = user;
      next();
    } catch (error) {
      return res.status(403).json({
        message: error.message,
        data: null,
      });
    }
  };
}

export default new AuthMiddleware();
