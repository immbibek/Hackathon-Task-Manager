// taskRoutes.js
import express from "express";
import { protect } from "../middleware/auth.js"; // ✅ CORRECT IMPORT
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  shareTask
} from "../controllers/taskController.js";

const router = express.Router();

router.use(protect); // ✅ Apply correct middleware to all routes

router.post("/", createTask);
router.get("/", getTasks);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.post("/share/:id", shareTask);

export default router;
