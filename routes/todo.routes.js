import express from "express";
import { createTask,getTask,deleteTask,updateTask } from "../controllers/todo.controller.js";
import { authenticator } from "../middleware/Authenticator.js";
const router = express.Router();

router.post("/create",authenticator,createTask);
router.get("/get",authenticator,getTask);
router.delete("/delete/:id",authenticator,deleteTask);
router.put("/update/:id",authenticator,updateTask)

export default router;