'use server';
/**
 * @fileOverview A Genkit flow for an AI-powered financial assistant that answers questions about spending habits.
 *
 * - financialAssistantQuery - A function that handles natural language queries about financial data.
 * - FinancialAssistantQueryInput - The input type for the financialAssistantQuery function.
 * - FinancialAssistantQueryOutput - The return type for the financialAssistantQuery function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// --- Schemas ---

const TransactionSchema = z.object({
  id: z.string().describe('Unique identifier for the transaction.'),
  date: z.string().describe('Date of the transaction in YYYY-MM-DD format.'),
  amount: z.number().describe('Amount of the transaction.'),
  category: z
    .string()
    .describe('Category of the transaction (e.g., Food, Utilities, Salary).'),
  description: z.string().describe('Brief description of the transaction.'),
  type: z
    .enum(['income', 'expense'])
    .describe('Type of the transaction (income or expense).'),
});

const FinancialAssistantQueryInputSchema = z.object({
  query: z
    .string()
    .describe('The natural language question about spending habits.'),
});
export type FinancialAssistantQueryInput = z.infer<
  typeof FinancialAssistantQueryInputSchema
>;

const FinancialAssistantQueryOutputSchema = z.object({
  answer: z
    .string()
    .describe("The AI assistant's answer to the financial query."),
});
export type FinancialAssistantQueryOutput = z.infer<
  typeof FinancialAssistantQueryOutputSchema
>;

// --- Mock Financial Data (for the tool) ---
const mockTransactions = [
  {
    id: 't1',
    date: '2023-11-20',
    amount: 150.0,
    category: 'Entertainment',
    description: 'Movie tickets',
    type: 'expense',
  },
  {
    id: 't2',
    date: '2023-11-25',
    amount: 80.0,
    category: 'Food',
    description: 'Restaurant bill',
    type: 'expense',
  },
  {
    id: 't3',
    date: '2023-12-05',
    amount: 50.0,
    category: 'Food',
    description: 'Groceries',
    type: 'expense',
  },
  {
    id: 't4',
    date: '2023-12-10',
    amount: 200.0,
    category: 'Utilities',
    description: 'Electricity Bill',
    type: 'expense',
  },
  {
    id: 't5',
    date: '2023-12-15',
    amount: 120.0,
    category: 'Shopping',
    description: 'New shirt',
    type: 'expense',
  },
  {
    id: 't6',
    date: '2024-01-01',
    amount: 1200.0,
    category: 'Salary',
    description: 'Monthly Paycheck',
    type: 'income',
  },
  {
    id: 't7',
    date: '2024-01-05',
    amount: 75.5,
    category: 'Food',
    description: 'Restaurant dinner',
    type: 'expense',
  },
  {
    id: 't8',
    date: '2024-01-10',
    amount: 60.0,
    category: 'Transportation',
    description: 'Gasoline',
    type: 'expense',
  },
  {
    id: 't9',
    date: '2024-01-20',
    amount: 40.0,
    category: 'Food',
    description: 'Coffee shop',
    type: 'expense',
  },
  {
    id: 't10',
    date: '2024-02-01',
    amount: 1200.0,
    category: 'Salary',
    description: 'Monthly Paycheck',
    type: 'income',
  },
  {
    id: 't11',
    date: '2024-02-05',
    amount: 150.0,
    category: 'Entertainment',
    description: 'Concert tickets',
    type: 'expense',
  },
  {
    id: 't12',
    date: '2024-02-15',
    amount: 300.0,
    category: 'Rent',
    description: 'Room rent',
    type: 'expense',
  },
  {
    id: 't13',
    date: '2024-02-20',
    amount: 90.0,
    category: 'Food',
    description: 'Groceries',
    type: 'expense',
  },
  {
    id: 't14',
    date: '2024-03-01',
    amount: 1200.0,
    category: 'Salary',
    description: 'Monthly Paycheck',
    type: 'income',
  },
  {
    id: 't15',
    date: '2024-03-05',
    amount: 45.0,
    category: 'Food',
    description: 'Coffee shop',
    type: 'expense',
  },
  {
    id: 't16',
    date: '2024-03-10',
    amount: 250.0,
    category: 'Shopping',
    description: 'New shoes',
    type: 'expense',
  },
  {
    id: 't17',
    date: '2024-03-20',
    amount: 180.0,
    category: 'Travel',
    description: 'Bus fare',
    type: 'expense',
  },
  {
    id: 't18',
    date: '2024-04-01',
    amount: 1200.0,
    category: 'Salary',
    description: 'Monthly Paycheck',
    type: 'income',
  },
  {
    id: 't19',
    date: '2024-04-05',
    amount: 90.0,
    category: 'Food',
    description: 'Restaurant lunch',
    type: 'expense',
  },
  {
    id: 't20',
    date: '2024-04-10',
    amount: 100.0,
    category: 'Utilities',
    description: 'Internet bill',
    type: 'expense',
  },
];

// --- Tool Definition ---

const getFinancialDataTool = ai.defineTool(
  {
    name: 'getFinancialData',
    description:
      'Retrieves financial transaction data based on specified criteria.',
    inputSchema: z.object({
      startDate: z
        .string()
        .optional()
        .describe(
          'Start date for filtering transactions in YYYY-MM-DD format.'
        ),
      endDate: z
        .string()
        .optional()
        .describe('End date for filtering transactions in YYYY-MM-DD format.'),
      category: z
        .string()
        .optional()
        .describe(
          'Specific category to filter transactions by (e.g., "Food", "Utilities", "Entertainment").'
        ),
      transactionType: z
        .enum(['income', 'expense', 'all'])
        .optional()
        .describe(
          'Type of transaction to filter (income, expense, or all). Defaults to "all".'
        ),
    }),
    outputSchema: z
      .array(TransactionSchema)
      .describe('A list of financial transactions matching the criteria.'),
  },
  async (input: any) => {
    let filteredTransactions = mockTransactions;

    if (input.startDate) {
      filteredTransactions = filteredTransactions.filter(
        (t) => t.date >= input.startDate!
      );
    }
    if (input.endDate) {
      filteredTransactions = filteredTransactions.filter(
        (t) => t.date <= input.endDate!
      );
    }
    if (input.category) {
      filteredTransactions = filteredTransactions.filter(
        (t) => t.category.toLowerCase() === input.category!.toLowerCase()
      );
    }
    if (input.transactionType && input.transactionType !== 'all') {
      filteredTransactions = filteredTransactions.filter(
        (t) => t.type === input.transactionType
      );
    }

    // Sort by date for consistent output
    filteredTransactions.sort((a, b) => a.date.localeCompare(b.date));

    return filteredTransactions;
  }
);

// --- Prompt Definition ---

const financialAssistantPrompt = ai.definePrompt({
  name: 'financialAssistantPrompt',
  tools: [getFinancialDataTool],
  input: { schema: FinancialAssistantQueryInputSchema },
  output: { schema: FinancialAssistantQueryOutputSchema },
  system: `You are a helpful financial assistant. Your goal is to provide insights into user's spending habits based on their financial transaction data.
  
  Use the 'getFinancialData' tool to retrieve relevant transaction data when asked about expenses, income, or spending patterns.
  When providing an answer, summarize the data clearly and concisely.
  
  Examples of user questions you can answer using the tool:
  - "What were my biggest expenses last month?"
  - "How much did I spend on food in Q1?"
  - "Am I over budget in any category?" (You can identify categories with high spending or suggest categories that might need attention based on the provided transactions.)
  - "What was my total income in January?"
  - "Show me all transactions in March."
  - "How much did I spend on entertainment this year?"

  When you summarize spending, categorize the expenses and provide totals where appropriate.
  If the user asks for a specific period (e.g., "last month", "Q1", "January"), accurately determine the start and end dates to pass to the tool.
  Always answer in a friendly and informative tone. If you cannot find relevant data, politely inform the user.
  `,
  prompt: `User query: {{{query}}} প্রশিক্ষণ:`,
});

// --- Flow Definition ---

const financialAssistantQueryFlow = ai.defineFlow(
  {
    name: 'financialAssistantQueryFlow',
    inputSchema: FinancialAssistantQueryInputSchema,
    outputSchema: FinancialAssistantQueryOutputSchema,
  },
  async (input) => {
    const { output } = await financialAssistantPrompt(input);
    return output!;
  }
);

// --- Exported Wrapper Function ---

export async function financialAssistantQuery(
  input: FinancialAssistantQueryInput
): Promise<FinancialAssistantQueryOutput> {
  return financialAssistantQueryFlow(input);
}
