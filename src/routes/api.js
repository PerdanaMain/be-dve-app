import express from "express";
import AuthMiddleware from "../middlewares/auth.middleware.js";
import AuthController from "../controllers/auth.controller.js";
import AdminController from "../controllers/admin.controller.js";
import EquipmentController from "../controllers/equipment.controller.js";
import MaintenanceController from "../controllers/maintenance.controller.js";

const router = express.Router();
const prefix = "/api";
// route: authentication
router.post(prefix + "/auth/register", AuthController.register);
router.post(prefix + "/auth/login", AuthController.login);
router.get(prefix + "/auth/me", AuthMiddleware.verifyToken, AuthController.me);

// route: equipment
router.get(
  prefix + "/equipments",
  AuthMiddleware.verifyToken,
  EquipmentController.index
);
router.get(
  prefix + "/equipment",
  AuthMiddleware.verifyToken,
  EquipmentController.show
);
router.post(
  prefix + "/equipment/create",
  AuthMiddleware.verifyToken,
  EquipmentController.create
);
router.put(
  prefix + "/equipment/:id",
  AuthMiddleware.verifyToken,
  EquipmentController.update
);
router.delete(
  prefix + "/equipment/:id",
  AuthMiddleware.verifyToken,
  EquipmentController.destroy
);

// route: maintenance
router.get(
  prefix + "/maintenances",
  AuthMiddleware.verifyToken,
  MaintenanceController.index
);

// route: admin
router.get(
  prefix + "/admin/users",
  AuthMiddleware.verifyAdmin,
  AdminController.userList
);
router.put(
  prefix + "/admin/activation",
  AuthMiddleware.verifyAdmin,
  AdminController.userActivation
);
export default router;
