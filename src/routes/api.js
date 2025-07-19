import express from "express";
import AuthMiddleware from "../middlewares/auth.middleware.js";
import AuthController from "../controllers/auth.controller.js";
import AdminController from "../controllers/admin.controller.js";

const router = express.Router();

// route: authentication
router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.login);
router.get("/auth/me", AuthMiddleware.verifyToken, AuthController.me);

// route: admin
router.get(
  "/admin/users",
  AuthMiddleware.verifyAdmin,
  AdminController.userList
);
router.put(
  "/admin/activation",
  AuthMiddleware.verifyAdmin,
  AdminController.userActivation
);
export default router;
