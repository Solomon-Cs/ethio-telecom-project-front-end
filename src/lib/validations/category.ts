import * as z from 'zod';

export const categorySchema = z.object({
    name: z.string().min(1, 'Name is required'),
    type: z.enum(['INCOME', 'EXPENSE']),
    description: z.string().optional().nullable(),
    userId: z.string().optional().nullable(),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;