'use client';

import { CategoryFormValues, categorySchema } from '@/lib/validations/category';
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
import { useCategories } from '@/hooks/use-category';
import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import { useState } from 'react';


interface CategoryFormProps {
    initialData?: any;
    onSubmit: (data: CategoryFormValues) => void;
    isSubmitting?: boolean;
}

export function CategoryForm({ initialData, onSubmit, isSubmitting }: CategoryFormProps) {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("In 2 days")
    const [date, setDate] = useState<Date | undefined>(
        new Date(value) || undefined
    )

    const { data: session } = useSession()
    const { categoriesByUser, isLoadingByUser, errorByUser, refetchByUser } = useCategories(session?.user?.id as string);

    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(categorySchema),
        defaultValues: initialData || {
            amount: 0,
            type: 'EXPENSE',
            category: '',
            description: '',
            date: new Date(),
            userId: '',
        },
    });

    const categoryType = form.watch('type');

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter category name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

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
                </div>

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }: any) => (
                        <FormItem>
                            <FormLabel>Description (Optional)</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter description" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
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
                        initialData ? 'Update Category' : 'Add Category'
                    )}
                </Button>
            </form>
        </Form>
    );
}