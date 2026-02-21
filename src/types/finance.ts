export type TransactionType = 'income' | 'expense';

export type TransactionCategory = 
  | 'Food' 
  | 'Rent' 
  | 'Utilities' 
  | 'Entertainment' 
  | 'Salary' 
  | 'Shopping' 
  | 'Transportation' 
  | 'Health' 
  | 'Other';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: TransactionCategory;
  description: string;
  type: TransactionType;
}

export interface UserProfile {
  username: string;
  email: string;
  currency: string;
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  categoryTotals: Record<TransactionCategory, number>;
}