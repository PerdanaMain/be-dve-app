import jwt from "jsonwebtoken";
import { SECRET } from "./env.js";

class Jwt {
  generateToken = (user) => {
    const token = jwt.sign(user, SECRET, { expiresIn: "1h" });
    return token;
  };

  verifyToken = (token) => {
    const user = jwt.verify(token, SECRET);
    return user;
  };
}

export default new Jwt();
