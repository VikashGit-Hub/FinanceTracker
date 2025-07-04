// controllers/expenseController.js

import Expense from "../models/Expense.js";
import mongoose from "mongoose";

// ➕ Add new expense
export const addExpense = async (req, res) => {
  try {
    const { amount, category, date, paymentMethod, notes } = req.body;

    const expense = new Expense({
      amount,
      category,
      date,
      paymentMethod,
      notes,
      user: req.user._id,
    });

    await expense.save();
    res.status(201).json({ message: "Expense added", expense });
  } catch (error) {
    res.status(500).json({ message: "Failed to add expense", error });
  }
};

// 📄 Get all expenses for logged-in user
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id }).sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch expenses", error });
  }
};

// ✏️ Update an expense
export const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!expense) return res.status(404).json({ message: "Expense not found" });

    res.status(200).json({ message: "Expense updated", expense });
  } catch (error) {
    res.status(500).json({ message: "Failed to update expense", error });
  }
};

// ❌ Delete an expense
export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!expense) return res.status(404).json({ message: "Expense not found" });

    res.status(200).json({ message: "Expense deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete expense", error });
  }
};

// 📊 Category-wise Expense Summary
export const getCategoryWiseExpense = async (req, res) => {
  try {
    const userId = req.user.id;

    const data = await Expense.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: "$category",
          amount: { $sum: "$amount" },
        },
      },
      {
        $project: {
          category: "$_id",
          amount: 1,
          _id: 0,
        },
      },
    ]);

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};


// 📈 Get expense trend over time (for Line Chart)
export const getSpendingTrend = async (req, res) => {
  try {
    const userId = req.user._id;

    const trendData = await Expense.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$date" },
          },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { "_id": 1 } },
      {
        $project: {
          date: "$_id",
          total: 1,
          _id: 0,
        },
      },
    ]);

    res.json(trendData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch trend data" });
  }
};

// ✅ Top 3 Payment Methods
export const getTopPaymentMethods = async (req, res) => {
  try {
    const userId = req.user._id;

    const result = await Expense.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: "$paymentMethod",
          total: { $sum: "$amount" },
        },
      },
      { $sort: { total: -1 } },
      { $limit: 3 },
      {
        $project: {
          method: "$_id",
          total: 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to get payment methods" });
  }
};



// ✅ Top Spending Category
export const getTopCategory = async (req, res) => {
  try {
    const userId = req.user._id;

    const result = await Expense.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
        },
      },
      { $sort: { total: -1 } },
      { $limit: 1 },
      {
        $project: {
          category: "$_id",
          total: 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json(result[0]); // return top 1
  } catch (err) {
    res.status(500).json({ error: "Failed to get top category" });
  }
};