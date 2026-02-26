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
  id?: string;
  date: string;
  amount: number;
  category: TransactionCategory;
  description: string;
  type: TransactionType;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserProfile {
  username: string;
  email: string;
  currency: string;
}

export interface FinancialSummary {
  summary: {
    totalIncome: number;
    totalExpense: number;
    balance: number;
  };
  groupedByCategory: Record<any, any>;
}
