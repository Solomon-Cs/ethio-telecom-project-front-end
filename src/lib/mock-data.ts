import { Transaction } from "@/types/finance";

export const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: "1", date: "2024-03-01", amount: 1200.00, category: "Salary", description: "Monthly Paycheck", type: "income" },
  { id: "2", date: "2024-03-05", amount: 300.00, category: "Rent", description: "Monthly Apartment Rent", type: "expense" },
  { id: "3", date: "2024-03-08", amount: 45.50, category: "Food", description: "Grocery Shopping", type: "expense" },
  { id: "4", date: "2024-03-10", amount: 15.00, category: "Entertainment", description: "Streaming Subscription", type: "expense" },
  { id: "5", date: "2024-03-12", amount: 60.00, category: "Transportation", description: "Fuel Refill", type: "expense" },
  { id: "6", date: "2024-03-15", amount: 120.00, category: "Utilities", description: "Electricity Bill", type: "expense" },
  { id: "7", date: "2024-03-18", amount: 250.00, category: "Shopping", description: "New Electronic Gadget", type: "expense" },
  { id: "8", date: "2024-03-20", amount: 55.00, category: "Food", description: "Dinner with friends", type: "expense" },
  { id: "9", date: "2024-03-22", amount: 100.00, category: "Other", description: "Gift for a friend", type: "expense" },
];