const express = require("express");
const {
  getAllCategories,
  createCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const router = express.Router();

// Route to get all categories
router.get("/", getAllCategories);

// Route to add a new category
router.post("/", createCategory);

// Route to delete a category by ID
router.delete("/:id", deleteCategory); // Make sure this line is correct

module.exports = router;
