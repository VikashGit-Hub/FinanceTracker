import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  month: {
    type: String, // e.g., "July 2025"
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("Budget", budgetSchema);
