import { CategoryFormValues } from '@/lib/validations/category';
import { categoryService } from '@/services/category.service';
import { TransactionFilters } from '@/services/transaction.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useCategories(
  userId?: string,
  filters: TransactionFilters = {},
) {
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['categories', filters],
    queryFn: () => categoryService.getCategories(filters),
  });

  const {
    data: categoriesByUser,
    isLoading: isLoadingByUser,
    error: errorByUser,
    refetch: refetchByUser,
  } = useQuery({
    queryKey: ['categoriesByUser', filters],
    queryFn: () =>
      categoryService.getCategoryByUserId(userId as string, filters),
  });

  const createCategory = useMutation({
    mutationFn: (data: CategoryFormValues) =>
      categoryService.createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categoriesByUser'] });
      toast.success('Category created successfully', {
        description: 'Your category has been added.',
      });
    },
    onError: (error: any) => {
      toast.error('Failed to create category', {
        description: error.response?.data?.error || 'Please try again.',
      });
    },
  });

  const updateCategory = useMutation({
    mutationFn: ({ id, data }: { id: string; data: CategoryFormValues }) =>
      categoryService.updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categoriesByUser'] });
      toast.success('Category updated successfully', {
        description: 'Your changes have been saved.',
      });
    },
    onError: (error: any) => {
      toast.error('Failed to update category', {
        description: error.response?.data?.error || 'Please try again.',
      });
    },
  });

  const deleteCategory = useMutation({
    mutationFn: (id: string) => categoryService.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categoriesByUser'] });
      toast.success('Category deleted successfully', {
        description: 'The category has been removed.',
      });
    },
    onError: (error: any) => {
      toast.error('Failed to delete category', {
        description: error.response?.data?.error || 'Please try again.',
      });
    },
  });

  return {
    categories: data?.data || [],
    isLoading,
    error,
    refetch,
    createCategory,
    updateCategory,
    deleteCategory,
    pagination: categoriesByUser?.meta,
    categoriesByUser: categoriesByUser?.data || [],
    isLoadingByUser,
    errorByUser,
    refetchByUser,
  };
}
