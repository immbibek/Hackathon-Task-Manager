import express from "express";
import { authenticateJWT } from "../middleware/authMiddleware.js";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  shareTask
} from "../controllers/taskController.js";

const router = express.Router();

router.use(authenticateJWT); // 👈 Protect all routes below

router.post("/", createTask);
router.get("/", getTasks);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.post("/share/:id", shareTask);

export default router;
