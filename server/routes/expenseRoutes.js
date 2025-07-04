import express from "express";
import {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
} from "../controllers/expenseController.js";
import { getCategoryWiseExpense } from "../controllers/expenseController.js";
import { getTopPaymentMethods } from "../controllers/expenseController.js";

import protect  from "../middleware/authMiddleware.js";

import { getSpendingTrend } from "../controllers/expenseController.js";
import {
  getTopPaymentMethods,
  getTopCategory,
} from "../controllers/expenseController.js";




const router = express.Router();
// Existing routes...
router.get("/trend",protect, getSpendingTrend);
router.get("/top-payment-methods", protect, getTopPaymentMethods);
router.get("/top-category", protect, getTopCategory);

// Protected Routes
router.post("/", protect, addExpense);            // Add new expense
router.get("/", protect, getExpenses);            // Get all expenses


router.put("/:id", protect, updateExpense);       // Update expense
router.delete("/:id", protect, deleteExpense);    // Delete expense


router.get("/category-wise", protect, getCategoryWiseExpense);

export default router;

