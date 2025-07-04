import express from "express";
import { setMonthlyBudget, getBudgetStatus } from "../controllers/budgetController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, setMonthlyBudget);
router.get("/", protect, getBudgetStatus);

export default router;