import express from "express";

const router = express.Router();

router.get("/auth/login", (req, res) => {
  res.status(200).json({
    message: "Login Route!",
    data: null,
  });
});

export default router;
