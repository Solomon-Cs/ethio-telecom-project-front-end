import * as z from 'zod';

export const transactionSchema = z.object({
    amount: z.coerce.number().positive('Amount must be positive'),
    type: z.enum(['INCOME', 'EXPENSE']),
    category: z.string().min(1, 'Category is required'),
    description: z.string().optional(),
    date: z.date(),
    userId: z.string().optional(),
});

export type TransactionFormValues = z.infer<typeof transactionSchema>;