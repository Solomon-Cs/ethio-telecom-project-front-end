import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { UserFilters, userService } from '@/services/user.service';
import { UserFormValues } from '@/lib/validations/user';
import { toast } from 'sonner';

export function useUsers(id: string, filters: UserFilters = {}) {
    const queryClient = useQueryClient();

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['users', filters],
        queryFn: () => userService.getUsers(filters),
    });

    const { data: user } = useQuery({
        queryKey: ['user', id],
        queryFn: () => userService.getUserById(id),
    });

    const registerUser = useMutation({
        mutationFn: (data: UserFormValues) => userService.registerUser(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            toast.success('User created successfully', {
                description: 'Your user has been added.',
            });
        },
        onError: (error: any) => {
            toast.error('Failed to create user', {
                description: error.response?.data?.error || 'Please try again.',
            });
        },
    });

    const updateUser = useMutation({
        mutationFn: ({ id, data }: { id: string; data: UserFormValues }) =>
            userService.updateUser(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            toast.success('User updated successfully', {
                description: 'Your changes have been saved.',
            });
        },
        onError: (error: any) => {
            toast.error('Failed to update user', {
                description: error.response?.data?.error || 'Please try again.',
            });
        },
    });

    const deleteUser = useMutation({
        mutationFn: (id: string) => userService.deleteUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            toast.success('User deleted successfully', {
                description: 'The user has been removed.',
            });
        },
        onError: (error: any) => {
            toast.error('Failed to delete user', {
                description: error.response?.data?.error || 'Please try again.',
            });
        },
    });

    return {
        users: data?.data || [],
        pagination: data?.meta,
        user: user,
        isLoading,
        error,
        refetch,
        registerUser,
        updateUser,
        deleteUser,
    };
}