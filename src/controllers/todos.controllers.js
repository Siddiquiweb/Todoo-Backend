import mongoose from "mongoose";
import Todos from "../models/todos.models.js"; // Make sure this path is correct.

// Add Todo
const addTodo = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    res.status(400).json({
      message: "Title or description required",
    });
    return;
  }

  try {
    const todo = await Todos.create({ title, description });
    res.status(201).json({
      message: "Todo added to the database successfully",
      todo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating todo",
      error: error.message,
    });
  }
};

// Get All Todos
const getAllTodos = async (req, res) => {
  try {
    const todos = await Todos.find({});
    res.status(200).json({ todos });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching todos",
      error: error.message,
    });
  }
};

// Get Single Todo
const getTodoWithId = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Not a valid ID" });
  }

  try {
    const todo = await Todos.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "No todo found!" });
    }
    res.status(200).json({
      message: "Todo Found",
      todo: todo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching todo",
      error: error.message,
    });
  }
};

// Delete Todo
const deleteTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Not a valid ID" });
  }

  try {
    const todo = await Todos.findOneAndDelete({ _id: id });
    if (!todo) {
      return res.status(404).json({ error: "No Todo found" });
    }
    res.status(200).json({
      message: "Todo deleted successfully",
      todo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting todo",
      error: error.message,
    });
  }
};

// Edit Todo
const editTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Not a valid ID" });
  }

  try {
    const updatedTodo = await Todos.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );
    if (!updatedTodo) {
      return res.status(404).json({ message: "No todo found to update" });
    }
    res.status(200).json({
      message: "Todo updated successfully",
      todo: updatedTodo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating todo",
      error: error.message,
    });
  }
};

// Export the functions
export { addTodo, getAllTodos, getTodoWithId, deleteTodo, editTodo };
