import Budget from "../models/Budget.js";
import Expense from "../models/Expense.js";

// ➕ Add or Update Budget
export const setMonthlyBudget = async (req, res) => {
  const { amount, month } = req.body;
  const userId = req.user._id;

  try {
    const existingBudget = await Budget.findOne({ user: userId, month });

    if (existingBudget) {
      existingBudget.amount = amount;
      await existingBudget.save();
      return res.status(200).json({ message: "Budget updated", budget: existingBudget });
    }

    const newBudget = new Budget({ amount, month, user: userId });
    await newBudget.save();

    res.status(201).json({ message: "Budget set", budget: newBudget });
  } catch (err) {
    res.status(500).json({ error: "Failed to set budget" });
  }
};

// 🔍 Get Budget and compare with expenses
export const getBudgetStatus = async (req, res) => {
  const userId = req.user._id;
  const { month } = req.query;

  try {
    const budget = await Budget.findOne({ user: userId, month });
    if (!budget) return res.status(404).json({ error: "Budget not set" });

    const expenses = await Expense.find({ user: userId });

    const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);

    res.status(200).json({
      budget: budget.amount,
      totalExpense,
      exceeded: totalExpense > budget.amount,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to get budget status" });
  }
};