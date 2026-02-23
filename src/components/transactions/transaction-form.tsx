'use client';

import { TransactionFormValues, transactionSchema } from '@/lib/validations/transaction';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Field, FieldLabel } from '../ui/field';
import { InputGroup, InputGroupInput } from '../ui/input-group';

const categories = [
    'Food & Dining',
    'Shopping',
    'Transportation',
    'Entertainment',
    'Bills & Utilities',
    'Healthcare',
    'Education',
    'Travel',
    'Income',
    'Other',
];

interface TransactionFormProps {
    initialData?: any;
    onSubmit: (data: TransactionFormValues) => void;
    isSubmitting?: boolean;
}

export function TransactionForm({ initialData, onSubmit, isSubmitting }: TransactionFormProps) {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("In 2 days")
    const [date, setDate] = useState<Date | undefined>(
        new Date(value) || undefined
    )


    const form = useForm<TransactionFormValues>({
        resolver: zodResolver(transactionSchema),
        defaultValues: initialData || {
            amount: 0,
            type: 'EXPENSE',
            category: '',
            description: '',
            date: new Date(),
            userId: '',
        },
    });

    const transactionType = form.watch('type');

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className={cn(
                                            field.value === 'INCOME' && 'text-emerald-600',
                                            field.value === 'EXPENSE' && 'text-rose-600'
                                        )}>
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="INCOME" className="text-emerald-600">Income</SelectItem>
                                        <SelectItem value="EXPENSE" className="text-rose-600">Expense</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Amount</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        step="0.01"
                                        placeholder="0.00"
                                        {...field}
                                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                        className={cn(
                                            transactionType === 'INCOME' && 'border-emerald-200 focus-visible:ring-emerald-500',
                                            transactionType === 'EXPENSE' && 'border-rose-200 focus-visible:ring-rose-500'
                                        )}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category} value={category}>
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description (Optional)</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter description" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <Field className="mx-auto max-w-xs">
                            <FieldLabel htmlFor="date">Date</FieldLabel>

                            <InputGroup>
                                <InputGroupInput
                                    id="date"
                                    type="date"
                                    value={
                                        field.value
                                            ? dayjs(field.value).format("YYYY-MM-DD")
                                            : ""
                                    }
                                    onChange={(e) => {
                                        const value = e.target.value;

                                        if (value) {
                                            field.onChange(new Date(value));
                                        } else {
                                            field.onChange(null);
                                        }
                                    }}
                                />

                            </InputGroup>
                        </Field>
                    )}
                />

                <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        initialData ? 'Update Transaction' : 'Add Transaction'
                    )}
                </Button>
            </form>
        </Form>
    );
}