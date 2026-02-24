import * as z from 'zod';

export const userSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    firstName: z.string().min(1, 'First name is required'),
    middleName: z.string().optional(),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email'),
    password: z.string().min(4, 'Password must be at least 4 characters long'),
});

export type UserFormValues = z.infer<typeof userSchema>;