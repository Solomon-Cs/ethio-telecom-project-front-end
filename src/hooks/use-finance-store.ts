'use client';

import { useState, useEffect } from 'react';
import {
  Transaction,
  UserProfile,
  FinancialSummary,
  TransactionCategory,
} from '@/types/finance';
import { INITIAL_TRANSACTIONS } from '@/lib/mock-data';

const STORAGE_KEY = 'finance_tracker_v1';

export function useFinanceStore() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [profile, setProfile] = useState<UserProfile>({
    username: 'Financial Maven',
    email: 'maven@finance.com',
    currency: '$',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setTransactions(parsed.transactions || INITIAL_TRANSACTIONS);
        setProfile(
          parsed.profile || {
            username: 'Financial Maven',
            email: 'maven@finance.com',
            currency: '$',
          }
        );
      } catch (e) {
        setTransactions(INITIAL_TRANSACTIONS);
      }
    } else {
      setTransactions(INITIAL_TRANSACTIONS);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ transactions, profile })
      );
    }
  }, [transactions, profile, isLoading]);

  const addTransaction = (t: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...t,
      id: Math.random().toString(36).substr(2, 9),
    };
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const updateProfile = (newProfile: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...newProfile }));
  };

  const summary: FinancialSummary = transactions.reduce(
    (acc, t) => {
      if (t.type === 'income') {
        acc.totalIncome += t.amount;
      } else {
        acc.totalExpenses += t.amount;
        acc.categoryTotals[t.category] =
          (acc.categoryTotals[t.category] || 0) + t.amount;
      }
      acc.balance = acc.totalIncome - acc.totalExpenses;
      return acc;
    },
    {
      totalIncome: 0,
      totalExpenses: 0,
      balance: 0,
      categoryTotals: {} as Record<TransactionCategory, number>,
    }
  );

  return {
    transactions,
    profile,
    summary,
    isLoading,
    addTransaction,
    deleteTransaction,
    updateProfile,
  };
}
