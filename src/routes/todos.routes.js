import express from "express";
import {
  addTodo,
  getAllTodos,
  getTodoWithId,
  deleteTodo, 
  editTodo
  
} from "../controllers/todos.controllers.js";

const router = express.Router();

router.post("/todo", addTodo);
router.get("/todo/:id", getTodoWithId);
router.get("/todo", getAllTodos);
router.put("/todo/:id", editTodo);
router.delete("/todo/:id", deleteTodo);

export default router;
